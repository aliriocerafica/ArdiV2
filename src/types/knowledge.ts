// Centralized TypeScript interfaces for Knowledge System
// This consolidates all knowledge-related types for better maintainability

export interface BaseKnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  tableContent?: string;
  keywords: string[];
  triggers: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export interface KnowledgeResult {
  content: string;
  tableContent?: string;
  source: string;
  category: string;
  confidence?: number;
  metadata?: {
    processingTime?: number;
    searchMethod?: string;
    cacheHit?: boolean;
  };
}

export interface KnowledgeSearchOptions {
  maxResults?: number;
  minConfidence?: number;
  domains?: string[];
  useCache?: boolean;
  parallel?: boolean;
}

export interface CombinedEntry {
  content: string;
  tableContent?: string;
  category: string;
  source: string;
  triggers: string[];
  keywords: string[];
  priority?: 'high' | 'medium' | 'low';
}

export interface KnowledgeDomain {
  name: string;
  entries: BaseKnowledgeEntry[];
  findKnowledge: (query: string) => KnowledgeResult | null;
  getCategories: () => string[];
  getKeywords: () => string[];
}

export interface KnowledgeRegistry {
  domains: Map<string, KnowledgeDomain>;
  cache: Map<string, KnowledgeResult>;
  metrics: {
    totalQueries: number;
    cacheHits: number;
    avgResponseTime: number;
    domainUsage: Map<string, number>;
  };
}

// Performance tracking interfaces
export interface PerformanceMetrics {
  queryTime: number;
  cacheHit: boolean;
  domainSearched: string[];
  resultsFound: number;
  confidence: number;
}

// Cache interfaces
export interface CachedResponse {
  result: KnowledgeResult;
  timestamp: number;
  expiresAt: number;
  hitCount: number;
}

// Search optimization interfaces
export interface SearchContext {
  originalQuery: string;
  normalizedQuery: string;
  keywords: string[];
  intent: string;
  domain?: string;
}
