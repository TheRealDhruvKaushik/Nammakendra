import axios from "axios";
import { chatWithHuggingFace, analyzeDocumentWithHuggingFace } from "./huggingface";
import { chatWithGroq, analyzeDocumentWithGroq } from "./groq";

// DeepSeek's free API endpoint for the Llama-3.1-Sonar-Small model
const DEEPSEEK_API_URL = "https://api.perplexity.ai/chat/completions";
const DEEPSEEK_MODEL = "llama-3.1-sonar-small-128k-online";

// Initialize axios instance for DeepSeek API
const deepseekClient = axios.create({
  baseURL: "https://api.perplexity.ai",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY || "dummy-key"}`
  }
});

// Check if API keys are dummy values
const isPerplexityDummy = !process.env.PERPLEXITY_API_KEY || process.env.PERPLEXITY_API_KEY === "dummy-key";
const isGroqDummy = !process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "dummy-key";

// Check if we have a Hugging Face token
export const hasHuggingFaceToken = process.env.HUGGING_FACE_TOKEN && process.env.HUGGING_FACE_TOKEN !== "dummy-key";

/**
 * Process a user's legal question and return a simple explanation
 * @param message User's question
 * @param language Language preference ('english' or 'kannada')
 * @returns AI response
 */

export async function chatGPT(message: string, language: string = 'english'): Promise<string> {
  // Try Groq first if API key is available
  if (!isGroqDummy) {
    console.log("Using Groq for chat response");
    try {
      return await chatWithGroq(message, language);
    } catch (error) {
      console.error("Error with Groq API, falling back to alternatives:", error);
      // Fall through to other options
    }
  }

  // Try Hugging Face next if token is available
  if (hasHuggingFaceToken) {
    console.log("Falling back to Hugging Face for chat");
    try {
      return await chatWithHuggingFace(message, language);
    } catch (error) {
      console.error("Error with Hugging Face API, falling back to Perplexity:", error);
      // Fall through to Perplexity
    }
  }
  
  // Try Perplexity if API key is available
  if (!isPerplexityDummy) {
    console.log("Using Perplexity for chat response");
    try {
      // Define language-specific system instructions
      let systemContent = '';
      
      if (language === 'kannada') {
        systemContent = `You are NammaSahayak, a helpful AI legal assistant designed to help ordinary citizens in India understand legal concepts.
        
        Follow these guidelines:
        1. VERY IMPORTANT: Always respond in Kannada language only. Do not use English.
        2. Explain legal concepts in simple, everyday Kannada language
        3. Avoid technical jargon or define it when necessary in Kannada
        4. Be concise but thorough in your explanations
        5. Focus on Indian legal context, especially Karnataka state laws when relevant
        6. When explaining procedures, break them down into clear steps
        7. Acknowledge when something may require professional legal advice
        
        Your goal is to make legal information accessible to everyone in Kannada, especially elderly users or those with limited legal knowledge.`;
      } else {
        systemContent = `You are NammaSahayak, a helpful AI legal assistant designed to help ordinary citizens in India understand legal concepts. 
        
        Follow these guidelines:
        1. Explain legal concepts in simple, everyday language
        2. Avoid technical jargon or define it when necessary
        3. Be concise but thorough in your explanations
        4. Focus on Indian legal context
        5. When explaining procedures, break them down into clear steps
        6. Acknowledge when something may require professional legal advice
        
        Your goal is to make legal information accessible to everyone, especially elderly users or those with limited legal knowledge.`;
      }
      
      // Call Perplexity API
      const response = await deepseekClient.post('/chat/completions', {
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: "system",
            content: systemContent
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        stream: false
      });

      return response.data.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error calling Perplexity API:", error);
      // Fall through to default response
    }
  }
  
  // Return default message if all options fail
  console.log("All API options failed, returning default message");
  return generateDummyChatResponse(message, language);
}

/**
 * Analyzes a legal document and returns a simplified version with key points
 * @param documentText Original document text
 * @param language Language preference ('english' or 'kannada')
 * @returns Simplified text and key points
 */
export async function analyzeDocument(documentText: string, language: string = 'english'): Promise<{
  simplifiedText: string;
  keyPoints: string[];
}> {
  // Try Groq first if API key is available
  if (!isGroqDummy) {
    console.log("Using Groq for document analysis");
    try {
      return await analyzeDocumentWithGroq(documentText, language);
    } catch (error) {
      console.error("Error with Groq API for document analysis, falling back to alternatives:", error);
      // Fall through to other options
    }
  }

  // Try Hugging Face next if token is available
  if (hasHuggingFaceToken) {
    console.log("Falling back to Hugging Face for document analysis");
    try {
      return await analyzeDocumentWithHuggingFace(documentText, language);
    } catch (error) {
      console.error("Error with Hugging Face API for document analysis, falling back to Perplexity:", error);
      // Fall through to Perplexity
    }
  }
  
  // Return dummy response if no APIs are available or working
  if (isPerplexityDummy) {
    console.log("Using dummy response for document analysis (no API keys provided or all APIs failed)");
    return generateDummyDocumentAnalysis(documentText, language);
  }
  
  try {
    // Define language-specific system instructions
    let systemContent = '';
    
    if (language === 'kannada') {
      systemContent = `You are a legal document analyzer that simplifies complex legal text for ordinary citizens.
      
      VERY IMPORTANT: Always respond in Kannada language only. Do not use English.
      
      Your task is to:
      1. Analyze the legal document
      2. Create a simplified summary in plain Kannada language
      3. Extract key points, deadlines, requirements, and actions needed
      4. Explain legal jargon in simple Kannada terms
      
      Format your response as JSON with the following structure:
      {
        "simplifiedText": "A comprehensive simplified version of the document in Kannada language",
        "keyPoints": ["Key point 1 in Kannada", "Key point 2 in Kannada", ...]
      }
      
      Make your explanation accessible to elderly users or those with limited legal knowledge.`;
    } else {
      systemContent = `You are a legal document analyzer that simplifies complex legal text for ordinary citizens. 
      
      Your task is to:
      1. Analyze the legal document (even if it appears to be OCR text with errors, try to make sense of it)
      2. Create a simplified summary in plain language that anyone can understand
      3. Extract at least 5 key points, deadlines, requirements, and actions needed
      4. Explain legal jargon in simple terms
      5. If the document appears to be from an image with OCR, try to intelligently reconstruct meaning
      
      Format your response as JSON with the following structure:
      {
        "simplifiedText": "A comprehensive simplified version of the document in plain language with thorough explanation of what this document is about and what the reader should know",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5", ...]
      }
      
      Make your explanation accessible to elderly users or those with limited legal knowledge. Be thorough and clear.`;
    }
    
    // Call DeepSeek API with instruction to return JSON
    const response = await deepseekClient.post('/chat/completions', {
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: documentText
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      stream: false
    });

    // Since DeepSeek might not have a built-in JSON response format, we need to parse the text
    // The model should be instructed to return a JSON structure
    try {
      // Try to parse the response as JSON
      const jsonStart = response.data.choices[0].message.content.indexOf('{');
      const jsonEnd = response.data.choices[0].message.content.lastIndexOf('}') + 1;
      
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonString = response.data.choices[0].message.content.substring(jsonStart, jsonEnd);
        const result = JSON.parse(jsonString);
        
        return {
          simplifiedText: result.simplifiedText || "Could not simplify the document.",
          keyPoints: result.keyPoints || []
        };
      } else {
        // Fallback in case response isn't properly formatted JSON
        return {
          simplifiedText: response.data.choices[0].message.content || "Could not simplify the document.",
          keyPoints: ["Could not extract key points from the document"]
        };
      }
    } catch (parseError) {
      console.error("Error parsing JSON from DeepSeek response:", parseError);
      return {
        simplifiedText: response.data.choices[0].message.content || "Could not simplify the document.",
        keyPoints: ["Error extracting key points from the document"]
      };
    }
  } catch (error) {
    console.error("Error analyzing document with DeepSeek:", error);
    throw new Error("Failed to analyze document. Please try again later.");
  }
}

/**
 * Generate a dummy response for the chat interface when no API key is available
 * @param message User's question
 * @param language Language preference ('english' or 'kannada')
 * @returns Dummy AI response
 */
function generateDummyChatResponse(message: string, language: string = 'english'): string {
  // Use language-specific responses
  if (language === 'kannada') {
    // Kannada dummy responses
    const kannadaDummyResponses = [
      "ಇದು ಅಭಿವೃದ್ಧಿಗಾಗಿ ಒಂದು ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ ಪ್ರತಿಕ್ರಿಯೆ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ, ಇದು AI ನಿಂದ ಕಾನೂನು ವಿವರಣೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು. ಪ್ರಸ್ತುತ Perplexity API ಕೀ ಇಲ್ಲದೆ ಡೆವಲಪ್‌ಮೆಂಟ್ ಮೋಡ್‌ನಲ್ಲಿ ಚಾಲನೆಯಲ್ಲಿದೆ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್ ಇಲ್ಲಿ ವಿವರವಾದ ಕಾನೂನು ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಯನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತೇನೆ. ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪೂರ್ಣ ಅಪ್ಲಿಕೇಶನ್ ಭಾರತೀಯ ಕಾನೂನಿನ ಆಧಾರದಲ್ಲಿ ಸಹಾಯಕ ಉತ್ತರವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ಕಾನೂನು ವಿಷಯಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಾಮಾನ್ಯವಾಗಿ ನಮ್ಮ AI ಉತ್ತರಿಸುತ್ತದೆ. ಪೂರ್ಣ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ದಯವಿಟ್ಟು Perplexity API ಕೀ ಅನ್ನು ಸೇರಿಸಿ.",
    ];
    
    // Return a random Kannada response
    const randomIndex = Math.floor(Math.random() * kannadaDummyResponses.length);
    return kannadaDummyResponses[randomIndex];
  } else {
    // English dummy responses
    const englishDummyResponses = [
      "This is a placeholder response for development. In the actual application, this would provide a legal explanation from the AI.",
      "Thank you for your question. Currently running in development mode without a Perplexity API key. The real app would provide detailed legal guidance here.",
      "I understand your legal question. This is a development placeholder - the fully integrated app would provide a helpful answer based on Indian law.",
      "Your question about legal matters would normally be answered by our AI. Please add a Perplexity API key to enable the full functionality.",
    ];
    
    // Return a random English response
    const randomIndex = Math.floor(Math.random() * englishDummyResponses.length);
    return englishDummyResponses[randomIndex];
  }
}

/**
 * Generate a dummy document analysis when no API key is available
 * @param documentText The original document text
 * @param language Language preference ('english' or 'kannada')
 * @returns Dummy analysis with simplified text and key points
 */
function generateDummyDocumentAnalysis(documentText: string, language: string = 'english'): {
  simplifiedText: string;
  keyPoints: string[];
} {
  // Create a simple summary based on document length
  const wordCount = documentText.split(/\s+/).length;
  
  if (language === 'kannada') {
    return {
      simplifiedText: `ಅಭಿವೃದ್ಧಿ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಇದು ಒಂದು ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ ಸರಳೀಕರಿಸಿದ ಪಠ್ಯ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್ DeepSeek ಬಳಸಿ ನಿಮ್ಮ ${wordCount}-ಪದ ದಾಖಲೆಯ ವಿವರವಾದ ಸರಳೀಕರಣವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಪೂರ್ಣ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ದಯವಿಟ್ಟು Perplexity API ಕೀ ಅನ್ನು ಸೇರಿಸಿ.`,
      keyPoints: [
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 1",
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 2",
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 3",
        "ನಿಜವಾದ ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪಡೆಯಲು Perplexity API ಕೀ ಅನ್ನು ಸೇರಿಸಿ"
      ]
    };
  } else {
    return {
      simplifiedText: `This is a placeholder simplified text for development purposes. The actual application would provide a detailed simplification of your ${wordCount}-word document using DeepSeek. Please add a Perplexity API key to enable the full functionality.`,
      keyPoints: [
        "This is a development placeholder - key point 1",
        "This is a development placeholder - key point 2",
        "This is a development placeholder - key point 3",
        "Add a Perplexity API key to get actual document analysis"
      ]
    };
  }
}
