/**
 * NammaSarkara - Government Services Information Module
 * 
 * This module handles processing of government service related questions
 * by using a combination of:
 * 1. Curated reference documents with authentic government information
 * 2. AI processing for questions that don't match reference material directly
 */

import { searchReferenceDocuments, getReferenceDocumentById, ReferenceDocument } from './reference/documents';
import { chatWithGroq } from './groq';

// Minimum relevance score for a reference document to be considered a match
const RELEVANCE_THRESHOLD = 0.6;

/**
 * Process a user's government service question using reference documents when available
 * @param message User's question
 * @param language Language preference ('english' or 'kannada')
 * @returns AI response
 */
export async function processGovernmentServiceQuestion(message: string, language: string = 'english'): Promise<string> {
  try {
    // First, try to find relevant reference documents based on the question
    const relevantDocuments = searchReferenceDocuments(message);
    
    console.log(`Found ${relevantDocuments.length} relevant documents for government service query`);
    
    if (relevantDocuments.length > 0) {
      // We have reference documents, use them to formulate the response
      const referenceContent = formatReferenceDocumentsForGroq(relevantDocuments);
      
      // Use Groq to answer with reference to the authentic information
      return await generateAnswerWithReferences(message, referenceContent, language);
    } else {
      // No specific reference documents found, use a general approach
      return await generateGeneralGovernmentServiceAnswer(message, language);
    }
  } catch (error) {
    console.error('Error processing government service question:', error);
    throw new Error('Failed to process your question about government services. Please try again later.');
  }
}

/**
 * Format multiple reference documents for inclusion in the prompt
 * @param documents Array of reference documents
 * @returns Formatted content for inclusion in the prompt
 */
function formatReferenceDocumentsForGroq(documents: ReferenceDocument[]): string {
  // Sort by most likely relevant documents first
  const sortedDocs = [...documents].sort((a, b) => {
    // Prioritize identity and certificate documents that are most frequently asked about
    if (a.category === 'identity' && b.category !== 'identity') return -1;
    if (a.category !== 'identity' && b.category === 'identity') return 1;
    if (a.category === 'certificate' && b.category !== 'certificate') return -1;
    if (a.category !== 'certificate' && b.category === 'certificate') return 1;
    return 0;
  });
  
  // If we have too many documents, limit to the top 2 to stay within token limits
  const limitedDocs = sortedDocs.slice(0, 2);
  
  // Format each document
  return limitedDocs.map(doc => {
    return `DOCUMENT: ${doc.title}\n${doc.content}\n---\n`;
  }).join('\n');
}

/**
 * Generate an answer using authentic reference documents
 * @param query User's question
 * @param referenceContent Formatted reference content
 * @param language User's language preference
 * @returns AI-generated response
 */
async function generateAnswerWithReferences(query: string, referenceContent: string, language: string): Promise<string> {
  const isKannada = language === 'kannada';
  
  // Create a prompt that instructs the AI to base its response on the reference material
  const customPrompt = `
You are NammaSarkara, a government services assistant for citizens in Karnataka, India.
${isKannada ? 'IMPORTANT: Always respond in Kannada language only. Respond to all queries in Kannada, not English.' : ''}

QUESTION FROM USER:
${query}

AUTHENTIC REFERENCE INFORMATION:
${referenceContent}

Please provide an accurate, helpful response based exclusively on the reference information above. 
If the reference information doesn't fully address the question, say so clearly and provide as much accurate information as you can from what is available.

${isKannada ? 'Remember to reply only in Kannada language. Do not use English.' : ''}

Focus on providing specific, practical information like:
1. Required documents
2. Application procedures (both online and offline options)
3. Where to go and who to contact
4. Fees and timelines
5. Common problems and their solutions

Structure your response for clarity with simple language, avoiding complex jargon.
Be helpful and polite, but only provide information that's grounded in the authentic reference material above.
`;

  // Use the AI to generate a response based on our specific prompt
  // This uses the same Groq endpoint but with our custom prompt instead
  try {
    return await chatWithGroq(customPrompt, language);
  } catch (error) {
    console.error('Error generating answer with references:', error);
    throw new Error('Failed to process reference information. Please try again.');
  }
}

/**
 * Generate a general response for government service questions without matching references
 * @param query User's question
 * @param language User's language preference 
 * @returns AI-generated response
 */
async function generateGeneralGovernmentServiceAnswer(query: string, language: string): Promise<string> {
  const isKannada = language === 'kannada';
  
  // Create a prompt that guides the AI to give a helpful but general response
  const systemPrompt = `
You are NammaSarkara, a government services assistant for Karnataka, India.
${isKannada ? 'IMPORTANT: Always respond in Kannada language only. Respond to all queries in Kannada, not English.' : ''}

USER QUESTION:
${query}

Please provide a helpful response about this government service or procedure. Since I don't have specific reference information about this particular service, I'll provide:

1. General information about how such government services typically work in Karnataka
2. Suggestions on which department or office to visit for more information
3. Common documents that might be required
4. General online resources like Karnataka One, Seva Sindhu, or relevant department websites
5. Contact numbers for government helplines where available

${isKannada ? 'Remember to reply only in Kannada language. Do not use English.' : ''}

Keep your response conversational, simple to understand, and honest about limitations. Don't make up specific procedures, fees, or timelines when you're not certain.
`;

  // Use the AI to generate a general response
  try {
    return await chatWithGroq(systemPrompt, language);
  } catch (error) {
    console.error('Error generating general government service answer:', error);
    throw new Error('Failed to generate information about government services. Please try again.');
  }
}