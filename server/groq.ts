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
      systemContent = `You are NammaSahayak, a helpful AI legal assistant designed to help underprivileged citizens in India understand legal concepts.
      
      Follow these guidelines:
      1. VERY IMPORTANT: Always respond in Kannada language only. Do not use English.
      2. Explain legal concepts in simple, everyday Kannada language
      3. Avoid technical jargon or define it when necessary in Kannada
      4. Be concise but thorough in your explanations
      5. Focus on Indian legal context, especially Karnataka state laws when relevant
      6. When explaining procedures, break them down into clear steps
      7. Do not acknowledge when something may require professional legal advice unless you are absolutely unsure. In such cases, politely inform the user to consult a legal professional.
      8. Do not answer a non-legal question. If a question on the government scheme/services/updates, etc. is asked, politely inform the user to visit NammaSarkara for such information.
      9. Assume the user is from Bengaluru, Karnataka, India, unless specified otherwise.
      Your goal is to make legal information accessible to everyone in Kannada, especially elderly and underprivileged users or those with limited legal knowledge.`;
    } else {
      systemContent = `You are NammaSahayak, a helpful AI legal assistant designed to help underprivileged citizens in India understand legal concepts. 
      
      Follow these guidelines:
      1. Explain legal concepts in simple, everyday language
      2. Avoid technical jargon or define it when necessary
      3. Be concise but thorough in your explanations
      4. Focus on Indian legal context
      5. When explaining procedures, break them down into clear steps
      6. Do not acknowledge when something may require professional legal advice unless you are absolutely unsure. In such cases, politely inform the user to consult a legal professional.
      7. Do not answer a non-legal question. If a question on the government scheme/services/updates, etc. is asked, politely inform the user to visit NammaSarkara for such information.
      8. Assume the user is from Bengaluru, Karnataka, India, unless specified otherwise.
      Your goal is to make legal information accessible to everyone, especially elderly and underprivileged users or those with limited legal knowledge.`;
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
  } catch (error: any) {
    console.error("Error calling Groq API:", error);
    if (error.response) {
      console.error("Groq API error response:", JSON.stringify(error.response.data, null, 2));
      console.error("Groq API status:", error.response.status);
    }
    throw new Error("Failed to get response from AI assistant. Please try again later.");
  }
}

/**
 * Truncate or chunk text to fit within API limits
 * @param text The text to process
 * @param maxLength Maximum character length (default 10000)
 * @returns Processed text that fits within the limit
 */
function truncateText(text: string, maxLength: number = 10000): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  // If text is too long, take first 70% and last 30% of allowed length to preserve context
  const firstPart = Math.floor(maxLength * 0.7);
  const lastPart = maxLength - firstPart;
  
  return text.substring(0, firstPart) + 
    "\n\n[...Content truncated due to length...]\n\n" + 
    text.substring(text.length - lastPart);
}

/**
 * Analyzes a legal document using Groq and returns a simplified version with key points
 * @param documentText Original document text or custom prompt
 * @param language Language preference ('english' or 'kannada')
 * @param isCustomPrompt Whether the documentText is a custom prompt (true) or raw text (false)
 * @returns Simplified text and key points
 */
export async function analyzeDocumentWithGroq(
  documentText: string, 
  language: string = 'english',
  isCustomPrompt: boolean = false
): Promise<{
  simplifiedText: string;
  keyPoints: string[];
}> {
  // If no valid API key, return error message
  if (isDummyKey) {
    console.log("Missing Groq API key for analyzeDocumentWithGroq call");
    throw new Error("Failed to analyze document. API key not configured.");
  }
  
  try {
    let processedText: string;
    
    if (isCustomPrompt) {
      // If using a custom prompt, use it directly (already formatted with the custom prompt)
      processedText = documentText;
      console.log("Using custom prompt for document analysis");
    } else {
      // Otherwise, truncate the text as usual
      processedText = truncateText(documentText, 8000);
      console.log(`Original text length: ${documentText.length}, Processed text length: ${processedText.length}`);
    }
    
    // Define language-specific system instructions
    let systemContent = '';
    
    if (isCustomPrompt) {
      // For custom prompts, use a minimal system prompt
      if (language === 'kannada') {
        systemContent = `You are a legal document analyzer that simplifies complex legal text for ordinary citizens. 
        VERY IMPORTANT: Always respond in Kannada language only.
        Format your response as JSON with the following structure:
        {
          "simplifiedText": "A comprehensive simplified version of the document in Kannada language",
          "keyPoints": ["Key point 1 in Kannada", "Key point 2 in Kannada", ...]
        }`;
      } else {
        systemContent = `You are a legal document analyzer that simplifies complex legal text for ordinary citizens.
        Format your response as JSON with the following structure:
        {
          "simplifiedText": "A comprehensive simplified version of the document in plain language",
          "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5", "Key point 6"]
        }
        IMPORTANT: Always include at least 5-6 key points in the keyPoints array, even if the document is in a different language or has been translated.`;
      }
    } else {
      // For regular document analysis, use the full system prompt
      if (language === 'kannada') {
        systemContent = `You are a legal document analyzer that simplifies complex legal text for ordinary citizens.
        
        VERY IMPORTANT: Always respond in Kannada language only. Do not use English.
        
        Your task is to:
        1. Analyze the legal document (note: if the document is truncated, focus on analyzing the visible parts)
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
        1. Analyze the legal document (note: if the document is truncated, focus on analyzing the visible parts)
        2. Create a simplified summary in plain English
        3. Extract key points, deadlines, requirements, and actions needed
        4. Explain legal jargon in simple terms
        5. If the document appears to be in a non-English language or contains OCR text, do your best to comprehend it
        
        Format your response as JSON with the following structure:
        {
          "simplifiedText": "A comprehensive simplified version of the document in plain language",
          "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5", "Key point 6"]
        }
        
        IMPORTANT: Always include at least 5-6 key points in the keyPoints array.
        
        Make your explanation accessible to elderly users or those with limited legal knowledge.`;
      }
    }
    
    try {
      // Call Groq API with OpenAI-compatible endpoint
      console.log("Sending request to Groq API for document analysis");
      const response = await groqClient.post('/chat/completions', {
        model: DOCUMENT_MODEL,
        messages: [
          {
            role: "system",
            content: systemContent
          },
          {
            role: "user",
            content: processedText
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });

      // Try to parse JSON from the response
      const responseText = response.data.choices[0].message.content.trim();
      console.log("Received response from Groq API, length:", responseText.length);
      
      // Find JSON in the response
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonString = responseText.substring(jsonStart, jsonEnd);
        try {
          const result = JSON.parse(jsonString);
          
          return {
            simplifiedText: result.simplifiedText || "Could not simplify the document.",
            keyPoints: result.keyPoints || []
          };
        } catch (jsonError) {
          console.error("Error parsing JSON from Groq response:", jsonError);
          // If JSON parsing fails, return the raw text response
          return {
            simplifiedText: responseText || "Could not simplify the document.",
            keyPoints: ["Error extracting key points from the document"]
          };
        }
      } else {
        // Fallback in case response isn't properly formatted JSON
        console.log("Response is not valid JSON, using raw text");
        return {
          simplifiedText: responseText || "Could not simplify the document.",
          keyPoints: ["Could not extract key points from the document"]
        };
      }
    } catch (apiError: any) {
      console.error("Error calling Groq API:", apiError.message);
      
      // If the error is related to payload size (413), try with an even shorter text
      if (apiError.response && apiError.response.status === 413) {
        console.log("Payload too large (413), retrying with shorter text");
        
        // Reduce text to 4000 chars for a much smaller payload
        const shorterText = truncateText(documentText, 4000);
        
        // Call Groq API with shorter text
        const retryResponse = await groqClient.post('/chat/completions', {
          model: DOCUMENT_MODEL,
          messages: [
            {
              role: "system",
              content: systemContent
            },
            {
              role: "user",
              content: shorterText
            }
          ],
          temperature: 0.3,
          max_tokens: 1500
        });
        
        // Process response
        const retryResponseText = retryResponse.data.choices[0].message.content.trim();
        const jsonStart = retryResponseText.indexOf('{');
        const jsonEnd = retryResponseText.lastIndexOf('}') + 1;
        
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          const jsonString = retryResponseText.substring(jsonStart, jsonEnd);
          try {
            const result = JSON.parse(jsonString);
            return {
              simplifiedText: result.simplifiedText || "Could not simplify the document.",
              keyPoints: result.keyPoints || []
            };
          } catch (parseError) {
            return {
              simplifiedText: retryResponseText || "Could not simplify the document.",
              keyPoints: ["Could not extract key points from the document"]
            };
          }
        } else {
          return {
            simplifiedText: retryResponseText || "Could not simplify the document.",
            keyPoints: ["Could not extract key points from the document"]
          };
        }
      }
      
      // For other errors, rethrow
      throw apiError;
    }
  } catch (error) {
    console.error("Error with Groq API for document analysis, falling back to alternatives:", error);
    throw new Error("Failed to analyze document. Please try again later.");
  }
}