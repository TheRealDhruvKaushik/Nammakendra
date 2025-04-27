import axios from "axios";

// Initialize axios instance for Hugging Face API
const huggingFaceClient = axios.create({
  baseURL: "https://api-inference.huggingface.co/models",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.HUGGING_FACE_TOKEN || "dummy-key"}`
  }
});

// Use models that should be accessible with most Hugging Face tokens
// Standard Hugging Face-hosted models that are generally accessible
const LEGAL_ASSISTANT_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

// Use a suitable model for document analysis
const DOCUMENT_ANALYSIS_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

// Check if API key is a dummy value
const isDummyKey = !process.env.HUGGING_FACE_TOKEN || process.env.HUGGING_FACE_TOKEN === "dummy-key";

/**
 * Process a user's legal question and return a simple explanation using Hugging Face
 * @param message User's question
 * @param language Language preference ('english' or 'kannada')
 * @returns AI response
 */
export async function chatWithHuggingFace(message: string, language: string = 'english'): Promise<string> {
  // If no valid API key, return error message
  if (isDummyKey) {
    console.log("Missing Hugging Face token for chatWithHuggingFace call");
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
    
    // Call Hugging Face API with proper format for Mistral models
    const response = await huggingFaceClient.post(`/${LEGAL_ASSISTANT_MODEL}`, {
      inputs: `<s>[INST] ${systemContent} [/INST]

[INST] ${message} [/INST]</s>`,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
        return_full_text: false
      }
    });

    // Extract response text
    if (response.data && response.data.length > 0) {
      return response.data[0].generated_text.trim();
    } else {
      return "I'm sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw new Error("Failed to get response from AI assistant. Please try again later.");
  }
}

/**
 * Analyzes a legal document using Hugging Face and returns a simplified version with key points
 * @param documentText Original document text
 * @param language Language preference ('english' or 'kannada')
 * @returns Simplified text and key points
 */
export async function analyzeDocumentWithHuggingFace(documentText: string, language: string = 'english'): Promise<{
  simplifiedText: string;
  keyPoints: string[];
}> {
  // If no valid API key, return error message
  if (isDummyKey) {
    console.log("Missing Hugging Face token for analyzeDocumentWithHuggingFace call");
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
    
    // Call Hugging Face API with proper format for Mistral models
    const response = await huggingFaceClient.post(`/${DOCUMENT_ANALYSIS_MODEL}`, {
      inputs: `<s>[INST] ${systemContent} [/INST]

[INST] ${documentText} [/INST]</s>`,
      parameters: {
        max_new_tokens: 1500,
        temperature: 0.3,
        top_p: 0.95,
        do_sample: true,
        return_full_text: false
      }
    });

    // Try to parse JSON from the response
    try {
      let responseText = "";
      if (response.data && response.data.length > 0) {
        responseText = response.data[0].generated_text.trim();
      }
      
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
      console.error("Error parsing JSON from Hugging Face response:", parseError);
      let responseText = "";
      if (response.data && response.data.length > 0) {
        responseText = response.data[0].generated_text.trim();
      }
      
      return {
        simplifiedText: responseText || "Could not simplify the document.",
        keyPoints: ["Error extracting key points from the document"]
      };
    }
  } catch (error) {
    console.error("Error analyzing document with Hugging Face:", error);
    throw new Error("Failed to analyze document. Please try again later.");
  }
}