import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatGPT, analyzeDocument, hasHuggingFaceToken } from "./deepseek";
import { chatWithHuggingFace, analyzeDocumentWithHuggingFace } from "./huggingface";
import Tesseract from 'tesseract.js';
import { 
  insertContactSchema, 
  insertChatMessageSchema 
} from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import { promisify } from "util";

// Python script execution
const execPromise = promisify(exec);

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadsDir = path.join(process.cwd(), "uploads");
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow document and image file types
    const allowedDocTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    
    if (allowedDocTypes.includes(file.mimetype) || allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, TXT, JPEG, PNG and WEBP are allowed.') as any);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handler middleware
  const handleError = (err: any, res: any) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ 
        message: validationError.message 
      });
    }
    
    console.error(err);
    res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  };

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json({ 
        message: "Contact submission received successfully" 
      });
    } catch (err) {
      handleError(err, res);
    }
  });

  // Chat with AI
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language, pageType } = z.object({
        message: z.string().min(1, "Message cannot be empty"),
        language: z.string().optional().default('english'),
        pageType: z.enum(['sahayak', 'sarkara']).optional().default('sahayak')
      }).parse(req.body);
      
      // Generate a session ID if not provided
      const sessionId = req.body.sessionId || uuidv4();
      
      // Store user message
      await storage.createChatMessage({
        sessionId,
        role: "user",
        content: message
      });
      
      let aiResponse: string;
      
      // Use different API based on the pageType
      if (pageType === 'sarkara') {
        // For NammaSarkara, use the same AI stack but with government-specific prompts
        console.log("Using AI for NammaSarkara");
        aiResponse = await chatGPT(message, language);
      } else {
        // For NammaSahayak, use the AI stack (Groq -> Hugging Face -> Perplexity fallback)
        console.log("Using AI for NammaSahayak");
        aiResponse = await chatGPT(message, language);
      }
      
      // Store AI response
      await storage.createChatMessage({
        sessionId,
        role: "assistant",
        content: aiResponse
      });
      
      res.json({ 
        message: aiResponse,
        sessionId 
      });
    } catch (err) {
      handleError(err, res);
    }
  });

  // Document analysis
  app.post("/api/documents/analyze", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Get language preference and page type
      const language = req.body.language || 'english';
      const pageType = req.body.pageType || 'vidhana'; // Default to vidhana
      
      // Get file information
      const filePath = req.file.path;
      const fileType = req.file.mimetype;
      let fileContent = '';
      
      // Check if file is an image type
      const isImage = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(fileType);
      
      if (isImage) {
        // Use Tesseract.js to extract text from images
        console.log("Using Tesseract OCR for image document");
        try {
          // Configure Tesseract with more options for better accuracy
          const { data } = await Tesseract.recognize(
            filePath,
            'eng', // Use English for OCR
            { 
              logger: m => {
                if (m.status === 'recognizing text') {
                  // Only log progress updates at 25% increments to reduce noise
                  if (m.progress === 0 || m.progress === 0.25 || m.progress === 0.5 || m.progress === 0.75 || m.progress === 1) {
                    console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
                  }
                } else {
                  console.log(`OCR Status: ${m.status}`);
                }
              }
            } as any // Cast to any to avoid TypeScript errors with Tesseract options
          );
          
          fileContent = data.text;
          console.log("OCR completed, extracted text length:", fileContent.length);
          
          // If the extracted text is very short, it might be an OCR failure
          if (fileContent.length < 50) {
            console.warn("OCR extracted very little text, might be a low-quality image or an error");
          }
        } catch (ocrError) {
          console.error("Tesseract OCR Error:", ocrError);
          throw new Error("Failed to extract text from the image. Please try a clearer image or a different format.");
        }
      } else {
        // Read file content for text-based formats
        try {
          // For PDF files, we should use a PDF parser, but for now we'll read as text
          // Note: This will only work for text-based PDFs, not scanned PDFs
          fileContent = fs.readFileSync(filePath, 'utf8');
          console.log(`Read text file with ${fileContent.length} characters`);
        } catch (readError) {
          console.error("File reading error:", readError);
          throw new Error("Failed to read file. The file may be corrupted or in an unsupported format.");
        }
      }
      
      if (!fileContent || fileContent.trim().length === 0) {
        throw new Error("No text content found in the document. Please try a different file.");
      }
      
      let analysisResult;
      
      // Try to directly import Groq and use it for document analysis
      const groqAvailable = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "dummy-key";
      const hfAvailable = process.env.HUGGING_FACE_TOKEN && process.env.HUGGING_FACE_TOKEN !== "dummy-key";
      
      if (groqAvailable) {
        try {
          // Import directly from groq.ts instead of using require
          const { analyzeDocumentWithGroq } = await import('./groq');
          console.log("Using Groq API for document analysis");
          analysisResult = await analyzeDocumentWithGroq(fileContent, language);
        } catch (groqError: any) {
          console.log("Groq API error, falling back to alternatives:", groqError.message);
          
          // Try using the Hugging Face stack next if available
          if (hfAvailable) {
            try {
              console.log("Falling back to Hugging Face for document analysis");
              analysisResult = await analyzeDocumentWithHuggingFace(fileContent, language);
            } catch (hfError: any) {
              console.log("Hugging Face API error, using DeepSeek fallback:", hfError.message);
              // Final fallback to our built-in solution
              analysisResult = await analyzeDocument(fileContent, language);
            }
          } else {
            // Fallback directly to our built-in solution if Hugging Face is not available
            analysisResult = await analyzeDocument(fileContent, language);
          }
        }
      } else if (hfAvailable) {
        // Try Hugging Face if Groq is not available
        try {
          console.log("Groq not available, using Hugging Face for document analysis");
          analysisResult = await analyzeDocumentWithHuggingFace(fileContent, language);
        } catch (hfError: any) {
          console.log("Hugging Face API error, using DeepSeek fallback:", hfError.message);
          // Fallback to our built-in solution
          analysisResult = await analyzeDocument(fileContent, language);
        }
      } else {
        // If neither API is available, use our built-in solution
        console.log("No AI services available, using DeepSeek fallback for document analysis");
        analysisResult = await analyzeDocument(fileContent, language);
      }
      
      // Store document analysis
      const document = await storage.createDocument({
        originalText: fileContent,
        simplifiedText: analysisResult.simplifiedText,
        keyPoints: analysisResult.keyPoints
      });
      
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      
      res.json({ 
        simplifiedText: analysisResult.simplifiedText,
        keyPoints: analysisResult.keyPoints
      });
    } catch (err) {
      handleError(err, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
