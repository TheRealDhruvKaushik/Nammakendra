import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development" 
});

// Check if API key is a dummy value
const isDummyKey = !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-dummy-key-for-development";

/**
 * Process a user's legal question and return a simple explanation
 * @param message User's question
 * @returns AI response
 */
export async function chatGPT(message: string): Promise<string> {
  // Return dummy response if no valid API key
  if (isDummyKey) {
    console.log("Using dummy response for chatGPT (no API key provided)");
    return generateDummyChatResponse(message);
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are NammaSahayak, a helpful AI legal assistant designed to help ordinary citizens in India understand legal concepts. 
          
          Follow these guidelines:
          1. Explain legal concepts in simple, everyday language
          2. Avoid technical jargon or define it when necessary
          3. Be concise but thorough in your explanations
          4. Focus on Indian legal context
          5. When explaining procedures, break them down into clear steps
          6. Acknowledge when something may require professional legal advice
          
          Your goal is to make legal information accessible to everyone, especially elderly users or those with limited legal knowledge.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to get response from AI assistant. Please try again later.");
  }
}

/**
 * Analyzes a legal document and returns a simplified version with key points
 * @param documentText Original document text
 * @returns Simplified text and key points
 */
export async function analyzeDocument(documentText: string): Promise<{
  simplifiedText: string;
  keyPoints: string[];
}> {
  // Return dummy response if no valid API key
  if (isDummyKey) {
    console.log("Using dummy response for document analysis (no API key provided)");
    return generateDummyDocumentAnalysis(documentText);
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a legal document analyzer that simplifies complex legal text for ordinary citizens. 
          
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
          
          Make your explanation accessible to elderly users or those with limited legal knowledge.`
        },
        {
          role: "user",
          content: documentText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1500
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      simplifiedText: result.simplifiedText || "Could not simplify the document.",
      keyPoints: result.keyPoints || []
    };
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Failed to analyze document. Please try again later.");
  }
}

/**
 * Generate a dummy response for the chat interface when no API key is available
 * @param message User's question
 * @returns Dummy AI response
 */
function generateDummyChatResponse(message: string): string {
  // Use a basic set of responses for development purposes
  const dummyResponses = [
    "This is a placeholder response for development. In the actual application, this would provide a legal explanation from the AI.",
    "Thank you for your question. Currently running in development mode without an OpenAI API key. The real app would provide detailed legal guidance here.",
    "I understand your legal question. This is a development placeholder - the fully integrated app would provide a helpful answer based on Indian law.",
    "Your question about legal matters would normally be answered by our AI. Please add an OpenAI API key to enable the full functionality.",
  ];
  
  // Return a random response
  const randomIndex = Math.floor(Math.random() * dummyResponses.length);
  return dummyResponses[randomIndex];
}

/**
 * Generate a dummy document analysis when no API key is available
 * @param documentText The original document text
 * @returns Dummy analysis with simplified text and key points
 */
function generateDummyDocumentAnalysis(documentText: string): {
  simplifiedText: string;
  keyPoints: string[];
} {
  // Create a simple summary based on document length
  const wordCount = documentText.split(/\s+/).length;
  
  return {
    simplifiedText: `This is a placeholder simplified text for development purposes. The actual application would provide a detailed simplification of your ${wordCount}-word document using OpenAI. Please add an OpenAI API key to enable the full functionality.`,
    keyPoints: [
      "This is a development placeholder - key point 1",
      "This is a development placeholder - key point 2",
      "This is a development placeholder - key point 3",
      "Add an OpenAI API key to get actual document analysis"
    ]
  };
}
