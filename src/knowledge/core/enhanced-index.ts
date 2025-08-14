// Enhanced Knowledge Index with optimizations
// This replaces the original knowledgeIndex.ts with better performance

import { KnowledgeResult, KnowledgeSearchOptions } from '../../types';
import { responseCache } from '../../core/utils/cache';
import { performanceMonitor } from '../../core/utils/performance';
import { knowledgeProcessor } from '../../core/services/knowledge-processor';

/**
 * Enhanced knowledge search with caching and parallel processing
 */
export async function findKnowledge(
  userMessage: string,
  options: KnowledgeSearchOptions = {}
): Promise<KnowledgeResult | null> {
  // Use the enhanced knowledge processor
  return knowledgeProcessor.processQuery(userMessage, {
    useCache: true,
    parallel: true,
    maxResults: 1,
    minConfidence: 0.1,
    ...options
  });
}

/**
 * Search multiple domains in parallel
 */
export async function findKnowledgeMultiple(
  userMessage: string,
  options: KnowledgeSearchOptions = {}
): Promise<KnowledgeResult[]> {
  const results = await knowledgeProcessor.processQuery(userMessage, {
    useCache: true,
    parallel: true,
    maxResults: 10,
    minConfidence: 0.1,
    ...options
  });

  return results ? [results] : [];
}

/**
 * Search with domain filtering
 */
export async function findKnowledgeByDomain(
  userMessage: string,
  domains: string[],
  options: Omit<KnowledgeSearchOptions, 'domains'> = {}
): Promise<KnowledgeResult | null> {
  return knowledgeProcessor.processQuery(userMessage, {
    useCache: true,
    parallel: true,
    maxResults: 1,
    minConfidence: 0.1,
    domains,
    ...options
  });
}

/**
 * Preload high-priority knowledge domains
 */
export async function preloadKnowledge(): Promise<void> {
  await knowledgeProcessor.preloadHighPriorityDomains();
}

/**
 * Get knowledge system statistics
 */
export function getKnowledgeStats() {
  return {
    domains: knowledgeProcessor.getDomainStats(),
    cache: responseCache.getStats(),
    performance: performanceMonitor.getOverallStats()
  };
}

/**
 * Clear knowledge cache
 */
export function clearKnowledgeCache(): void {
  responseCache.clear();
}

/**
 * Invalidate cache entries by pattern
 */
export function invalidateKnowledgeCache(pattern: string): number {
  return responseCache.invalidateByPattern(pattern);
}

/**
 * Backward compatibility - export the original function name
 */
export { findKnowledge as findKnowledgeOriginal };

// Enhanced query expansion for better matching
export function expandQuery(userMessage: string): {
  expandedPhrases: string[];
  expandedTokens: string[];
  synonyms: string[];
  keywords: string[];
} {
  const message = userMessage.toLowerCase();
  const tokens = message.split(/\s+/);
  
  // Legal domain expansions
  const legalSynonyms: Record<string, string[]> = {
    'lawyer': ['attorney', 'counsel', 'legal representative'],
    'case': ['matter', 'claim', 'lawsuit', 'litigation'],
    'injury': ['harm', 'damage', 'hurt', 'trauma'],
    'accident': ['incident', 'collision', 'crash', 'mishap'],
    'settlement': ['agreement', 'resolution', 'compensation'],
    'medical': ['healthcare', 'health', 'clinical', 'medical treatment']
  };
  
  // Medical domain expansions
  const medicalSynonyms: Record<string, string[]> = {
    'doctor': ['physician', 'medical doctor', 'practitioner', 'healthcare provider'],
    'records': ['documentation', 'files', 'charts', 'history'],
    'treatment': ['care', 'therapy', 'intervention', 'procedure'],
    'diagnosis': ['condition', 'finding', 'assessment', 'evaluation']
  };
  
  const allSynonyms = { ...legalSynonyms, ...medicalSynonyms };
  
  // Generate synonyms
  const synonyms: string[] = [];
  for (const token of tokens) {
    if (allSynonyms[token]) {
      synonyms.push(...allSynonyms[token]);
    }
  }
  
  // Extract keywords (important terms)
  const keywords = tokens.filter(token => 
    token.length > 3 && 
    !['what', 'when', 'where', 'how', 'why', 'the', 'and', 'or', 'but'].includes(token)
  );
  
  // Generate expanded phrases
  const expandedPhrases = [
    userMessage,
    ...synonyms.map(synonym => message.replace(tokens.find(t => allSynonyms[t]?.includes(synonym)) || '', synonym))
  ];
  
  return {
    expandedPhrases: [...new Set(expandedPhrases)],
    expandedTokens: [...new Set([...tokens, ...synonyms])],
    synonyms: [...new Set(synonyms)],
    keywords: [...new Set(keywords)]
  };
}

/**
 * Calculate relevance score for content
 */
export function calculateRelevanceScore(
  content: string,
  query: string,
  keywords: string[]
): number {
  const contentLower = content.toLowerCase();
  const queryLower = query.toLowerCase();
  
  let score = 0;
  
  // Exact phrase match (highest weight)
  if (contentLower.includes(queryLower)) {
    score += 100;
  }
  
  // Keyword matches
  for (const keyword of keywords) {
    if (contentLower.includes(keyword.toLowerCase())) {
      score += 10;
    }
  }
  
  // Word count bonus (more comprehensive content)
  const wordCount = content.split(/\s+/).length;
  score += Math.min(wordCount / 100, 10);
  
  // Normalize score to 0-1 range
  return Math.min(score / 150, 1);
}

/**
 * Content similarity calculation using simple text analysis
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size; // Jaccard similarity
}
