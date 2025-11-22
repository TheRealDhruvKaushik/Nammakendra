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
 * Truncate text to fit within token limits
 * @param text Text to truncate
 * @param maxChars Maximum characters (default 2000)
 * @returns Truncated text
 */
function truncateText(text: string, maxChars: number = 2000): string {
  if (text.length <= maxChars) {
    return text;
  }
  return text.substring(0, maxChars) + '\n\n[...Content truncated for length...]';
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
  
  // Limit to just the top 1 most relevant document to avoid overwhelming the API
  const limitedDocs = sortedDocs.slice(0, 1);
  
  // Format each document with truncation
  return limitedDocs.map(doc => {
    const truncatedContent = truncateText(doc.content, 1500);
    return `DOCUMENT: ${doc.title}\n${truncatedContent}\n---\n`;
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
  
  // Create a much more concise prompt to stay within token limits
  const userMessage = `Question: ${query}

Reference: ${referenceContent}

Please answer based on the reference information above.`;
  
  // Use the AI to generate a response
  try {
    return await chatWithGroq(userMessage, language);
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
  
  // Create a concise message for general government service questions
  const userMessage = `I need information about this government service in Karnataka: ${query}

Please provide helpful general guidance including:
1. Which department handles this
2. Common documents typically required
3. Where to get more information (Karnataka One, Seva Sindhu, etc.)`;
  
  // Use the AI to generate a general response
  try {
    return await chatWithGroq(userMessage, language);
  } catch (error) {
    console.error('Error generating general government service answer:', error);
    throw new Error('Failed to generate information about government services. Please try again.');
  }
}