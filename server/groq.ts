import axios from 'axios';

// Initialize axios instance for Groq API
const groqClient = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GROQ_API_KEY || "dummy-key"}`
  }
});

// Groq models
const CHAT_MODEL = "llama3-8b-8192"; // Llama 3 8B model for chat
const DOCUMENT_MODEL = "llama3-8b-8192"; // Same model for document analysis

// Check if API key is a dummy value
const isDummyKey = !process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "dummy-key";

/**
 * Process a user's legal question and return a simple explanation using Groq
 * @param message User's question
 * @param language Language preference ('english' or 'kannada')
 * @returns AI response
 */
export async function chatWithGroq(message: string, language: string = 'english'): Promise<string> {
  // If no valid API key, return error message
  if (isDummyKey) {
    console.log("Missing Groq API key for chatWithGroq call");
    throw new Error("Failed to get response from AI assistant. API key not configured.");
  }
  
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
    
    // Call Groq API (with OpenAI-compatible endpoint)
    const response = await groqClient.post('/chat/completions', {
      model: CHAT_MODEL,
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
      max_tokens: 800
    });

    // Extract response text
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    } else {
      return "I'm sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw new Error("Failed to get response from AI assistant. Please try again later.");
  }
}

/**
 * Analyzes a legal document using Groq and returns a simplified version with key points
 * @param documentText Original document text
 * @param language Language preference ('english' or 'kannada')
 * @returns Simplified text and key points
 */
export async function analyzeDocumentWithGroq(documentText: string, language: string = 'english'): Promise<{
  simplifiedText: string;
  keyPoints: string[];
}> {
  // If no valid API key, return error message
  if (isDummyKey) {
    console.log("Missing Groq API key for analyzeDocumentWithGroq call");
    throw new Error("Failed to analyze document. API key not configured.");
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
      1. Analyze the legal document
      2. Create a simplified summary in plain language
      3. Extract key points, deadlines, requirements, and actions needed
      4. Explain legal jargon in simple terms
      
      Format your response as JSON with the following structure:
      {
        "simplifiedText": "A comprehensive simplified version of the document in plain language",
        "keyPoints": ["Key point 1", "Key point 2", ...]
      }
      
      Make your explanation accessible to elderly users or those with limited legal knowledge.`;
    }
    
    // Call Groq API with OpenAI-compatible endpoint
    const response = await groqClient.post('/chat/completions', {
      model: DOCUMENT_MODEL,
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
      max_tokens: 1500
    });

    // Try to parse JSON from the response
    try {
      const responseText = response.data.choices[0].message.content.trim();
      
      // Find JSON in the response
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonString = responseText.substring(jsonStart, jsonEnd);
        const result = JSON.parse(jsonString);
        
        return {
          simplifiedText: result.simplifiedText || "Could not simplify the document.",
          keyPoints: result.keyPoints || []
        };
      } else {
        // Fallback in case response isn't properly formatted JSON
        return {
          simplifiedText: responseText || "Could not simplify the document.",
          keyPoints: ["Could not extract key points from the document"]
        };
      }
    } catch (parseError) {
      console.error("Error parsing JSON from Groq response:", parseError);
      const responseText = response.data.choices[0].message.content.trim();
      
      return {
        simplifiedText: responseText || "Could not simplify the document.",
        keyPoints: ["Error extracting key points from the document"]
      };
    }
  } catch (error) {
    console.error("Error analyzing document with Groq:", error);
    throw new Error("Failed to analyze document. Please try again later.");
  }
}