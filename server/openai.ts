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
 * @param language Language preference ('english' or 'kannada')
 * @returns AI response
 */
export async function chatGPT(message: string, language: string = 'english'): Promise<string> {
  // Return dummy response if no valid API key
  if (isDummyKey) {
    console.log("Using dummy response for chatGPT (no API key provided)");
    return generateDummyChatResponse(message, language);
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
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to get response from AI assistant. Please try again later.");
  }
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
  // Return dummy response if no valid API key
  if (isDummyKey) {
    console.log("Using dummy response for document analysis (no API key provided)");
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
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
 * @param language Language preference ('english' or 'kannada')
 * @returns Dummy AI response
 */
function generateDummyChatResponse(message: string, language: string = 'english'): string {
  // Use language-specific responses
  if (language === 'kannada') {
    // Kannada dummy responses
    const kannadaDummyResponses = [
      "ಇದು ಅಭಿವೃದ್ಧಿಗಾಗಿ ಒಂದು ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ ಪ್ರತಿಕ್ರಿಯೆ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ, ಇದು AI ನಿಂದ ಕಾನೂನು ವಿವರಣೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು. ಪ್ರಸ್ತುತ OpenAI API ಕೀ ಇಲ್ಲದೆ ಡೆವಲಪ್‌ಮೆಂಟ್ ಮೋಡ್‌ನಲ್ಲಿ ಚಾಲನೆಯಲ್ಲಿದೆ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್ ಇಲ್ಲಿ ವಿವರವಾದ ಕಾನೂನು ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಯನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತೇನೆ. ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪೂರ್ಣ ಅಪ್ಲಿಕೇಶನ್ ಭಾರತೀಯ ಕಾನೂನಿನ ಆಧಾರದಲ್ಲಿ ಸಹಾಯಕ ಉತ್ತರವನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      "ಕಾನೂನು ವಿಷಯಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಾಮಾನ್ಯವಾಗಿ ನಮ್ಮ AI ಉತ್ತರಿಸುತ್ತದೆ. ಪೂರ್ಣ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ದಯವಿಟ್ಟು OpenAI API ಕೀ ಅನ್ನು ಸೇರಿಸಿ.",
    ];
    
    // Return a random Kannada response
    const randomIndex = Math.floor(Math.random() * kannadaDummyResponses.length);
    return kannadaDummyResponses[randomIndex];
  } else {
    // English dummy responses
    const englishDummyResponses = [
      "This is a placeholder response for development. In the actual application, this would provide a legal explanation from the AI.",
      "Thank you for your question. Currently running in development mode without an OpenAI API key. The real app would provide detailed legal guidance here.",
      "I understand your legal question. This is a development placeholder - the fully integrated app would provide a helpful answer based on Indian law.",
      "Your question about legal matters would normally be answered by our AI. Please add an OpenAI API key to enable the full functionality.",
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
      simplifiedText: `ಅಭಿವೃದ್ಧಿ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಇದು ಒಂದು ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ ಸರಳೀಕರಿಸಿದ ಪಠ್ಯ. ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್ OpenAI ಬಳಸಿ ನಿಮ್ಮ ${wordCount}-ಪದ ದಾಖಲೆಯ ವಿವರವಾದ ಸರಳೀಕರಣವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಪೂರ್ಣ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ದಯವಿಟ್ಟು OpenAI API ಕೀ ಅನ್ನು ಸೇರಿಸಿ.`,
      keyPoints: [
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 1",
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 2",
        "ಇದು ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್ - ಪ್ರಮುಖ ಅಂಶ 3",
        "ನಿಜವಾದ ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪಡೆಯಲು OpenAI API ಕೀ ಅನ್ನು ಸೇರಿಸಿ"
      ]
    };
  } else {
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
}
