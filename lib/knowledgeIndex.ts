// Main Knowledge Index - Simplified for Custom AI Model Integration
import { findIdentityKnowledge, ardiIdentityKnowledge } from './ardiIdentity';
import { filterContent } from './contentFilter';

export interface KnowledgeResult {
  content: string;
  tableContent?: string;
  source: string;
  category: string;
}

/**
 * Simplified knowledge lookup that only handles basic Ardi identity and content filtering.
 * All other queries should be handled by your custom AI model.
 */
export function findKnowledge(userMessage: string): KnowledgeResult | null {
  // Check for inappropriate content first
  const contentCheck = filterContent(userMessage);
  if (contentCheck.isInappropriate && contentCheck.suggestedResponse) {
    return {
      content: contentCheck.suggestedResponse,
      source: 'Content Filter',
      category: 'Safety'
    };
  }

  // Check for Ardi identity questions (who are you, what is your name, etc.)
  const identityResult = findIdentityKnowledge(userMessage);
  if (identityResult) {
    return {
      content: identityResult.content,
      tableContent: (identityResult as any).tableContent,
      source: 'Ardi Identity',
      category: 'Core Knowledge'
    };
  }

  // For all other questions, return null to indicate custom AI model should handle
  return null;
}

/**
 * Get available knowledge categories (simplified)
 */
export function getKnowledgeCategories(): string[] {
  return [
    'Ardi Identity',
    'Content Safety',
    'Custom AI Model' // Your AI model will handle everything else
  ];
}

/**
 * Fallback response for when no knowledge is found.
 * This can be used as a signal to invoke your custom AI model.
 */
export function getFallbackResponse(userMessage: string): KnowledgeResult {
  return {
    content: "I'll help you with that using my comprehensive knowledge. Let me process your question...",
    source: 'Fallback',
    category: 'General'
  };
}

/**
 * Utility function to check if a message should be handled by basic knowledge vs custom AI
 */
export function shouldUseBasicKnowledge(userMessage: string): boolean {
  const message = userMessage.toLowerCase();
  
  // Basic identity questions and greetings
  const identityTriggers = [
    'who are you', 'what is your name', 'what does ardi stand for',
    'when were you created', 'who created you', 'what is your purpose',
    'are you a human', 'tell me about yourself', 'who is ardi',
    'what is ardi', 'ardi trivia', 'fun facts about ardi',
    'ardi personality', 'tell me something interesting about ardi',
    'ardi background', 'ardi story', 'what makes ardi unique',
    'hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon',
    'hi ardi', 'hello ardi', 'hey ardi', 'ardi capabilities',
    'what can ardi do', 'what can you do', 'ardi help'
  ];
  
  return identityTriggers.some(trigger => message.includes(trigger));
}

/**
 * Export identity knowledge for potential use by custom AI model
 */
export { ardiIdentityKnowledge };