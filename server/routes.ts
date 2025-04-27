import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatGPT, analyzeDocument } from "./deepseek";
import { chatWithHuggingFace, analyzeDocumentWithHuggingFace } from "./huggingface";
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
    // Allow only specific file types
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT are allowed.') as any);
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
        // For NammaSarkara, continue using the Perplexity API
        console.log("Using Perplexity API for NammaSarkara");
        aiResponse = await chatGPT(message, language);
      } else {
        // For NammaSahayak, use the Hugging Face API
        console.log("Using Hugging Face API for NammaSahayak");
        try {
          aiResponse = await chatWithHuggingFace(message, language);
        } catch (huggingFaceError) {
          console.error("Error with Hugging Face API, falling back to Perplexity:", huggingFaceError);
          // Fallback to Perplexity if Hugging Face API fails
          aiResponse = await chatGPT(message, language);
        }
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
      const pageType = req.body.pageType || 'sahayak'; // Default to sahayak
      
      // Read file content
      const filePath = req.file.path;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      let analysisResult;
      
      // Use different API based on the pageType (no need to analyze documents for sarkara,
      // but we'll include the check for consistency and future-proofing)
      if (pageType === 'sarkara') {
        // For NammaSarkara, use the Perplexity API
        console.log("Using Perplexity API for document analysis (NammaSarkara)");
        analysisResult = await analyzeDocument(fileContent, language);
      } else {
        // For NammaSahayak, use the Hugging Face API
        console.log("Using Hugging Face API for document analysis (NammaSahayak)");
        try {
          analysisResult = await analyzeDocumentWithHuggingFace(fileContent, language);
        } catch (huggingFaceError) {
          console.error("Error with Hugging Face API for document analysis, falling back to Perplexity:", huggingFaceError);
          // Fallback to Perplexity if Hugging Face API fails
          analysisResult = await analyzeDocument(fileContent, language);
        }
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
