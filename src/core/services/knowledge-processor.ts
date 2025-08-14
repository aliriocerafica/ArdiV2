// Enhanced knowledge processing with parallel search and optimization

import { KnowledgeResult, KnowledgeSearchOptions, CombinedEntry } from '../../types';
import { responseCache } from '../utils/cache';
import { performanceMonitor } from '../utils/performance';
import { globalErrorHandler } from './error-handler';

export interface KnowledgeDomain {
  name: string;
  findKnowledge: (query: string) => KnowledgeResult | null;
  weight: number; // Priority weight for this domain
  categories: string[];
}

export class ParallelKnowledgeProcessor {
  private domains: Map<string, KnowledgeDomain> = new Map();
  private domainLoadPromises: Map<string, Promise<any>> = new Map();

  constructor() {
    this.initializeDomains();
  }

  /**
   * Process query with parallel domain search
   */
  async processQuery(
    query: string, 
    options: KnowledgeSearchOptions = {}
  ): Promise<KnowledgeResult | null> {
    const {
      maxResults = 1,
      minConfidence = 0.1,
      domains = [],
      useCache = true,
      parallel = true
    } = options;

    // Check cache first
    if (useCache) {
      const cached = responseCache.getCachedResponse(query);
      if (cached) {
        return cached;
      }
    }

    // Start performance monitoring
    const stopTimer = performanceMonitor.startTimer('knowledge-search');
    
    try {
      let results: KnowledgeResult[];
      
      if (parallel) {
        results = await this.parallelSearch(query, domains);
      } else {
        results = await this.sequentialSearch(query, domains);
      }

      // Filter and rank results
      const filteredResults = results
        .filter(result => (result.confidence || 1) >= minConfidence)
        .sort((a, b) => (b.confidence || 1) - (a.confidence || 1))
        .slice(0, maxResults);

      const finalResult = filteredResults.length > 0 ? filteredResults[0] : null;

      // Cache the result
      if (finalResult && useCache) {
        responseCache.cacheResponse(query, finalResult);
      }

      // Record performance metrics
      stopTimer();

      return finalResult;
    } catch (error) {
      return globalErrorHandler.handleError(
        error as Error,
        globalErrorHandler.createContext('knowledge-search', { userMessage: query })
      );
    }
  }

  /**
   * Parallel search across all domains
   */
  private async parallelSearch(query: string, targetDomains: string[] = []): Promise<KnowledgeResult[]> {
    const searchPromises: Promise<KnowledgeResult | null>[] = [];
    const domainsToSearch = targetDomains.length > 0 
      ? targetDomains.filter(d => this.domains.has(d))
      : Array.from(this.domains.keys());

    for (const domainName of domainsToSearch) {
      searchPromises.push(this.searchDomain(domainName, query));
    }

    const results = await Promise.allSettled(searchPromises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<KnowledgeResult> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }

  /**
   * Sequential search (fallback for parallel failures)
   */
  private async sequentialSearch(query: string, targetDomains: string[] = []): Promise<KnowledgeResult[]> {
    const results: KnowledgeResult[] = [];
    const domainsToSearch = targetDomains.length > 0 
      ? targetDomains.filter(d => this.domains.has(d))
      : Array.from(this.domains.keys());

    for (const domainName of domainsToSearch) {
      try {
        const result = await this.searchDomain(domainName, query);
        if (result) {
          results.push(result);
        }
      } catch (error) {
        console.warn(`Domain ${domainName} search failed:`, error);
        continue;
      }
    }

    return results;
  }

  /**
   * Search specific domain
   */
  private async searchDomain(domainName: string, query: string): Promise<KnowledgeResult | null> {
    const domain = this.domains.get(domainName);
    if (!domain) {
      return null;
    }

    try {
      // Ensure domain is loaded
      await this.ensureDomainLoaded(domainName);
      
      const result = domain.findKnowledge(query);
      if (result) {
        // Add domain-specific metadata
        return {
          ...result,
          metadata: {
            ...result.metadata
          }
        };
      }
      return null;
    } catch (error) {
      console.warn(`Error searching domain ${domainName}:`, error);
      return null;
    }
  }

  /**
   * Initialize domain registry
   */
  private initializeDomains(): void {
    // Register all knowledge domains with their weights
    const domainConfigs = [
      { name: 'ardi-identity', weight: 10, path: '../../../lib/ardiIdentity' },
      { name: 'granular', weight: 9, path: '../../../lib/granularKnowledge' },
      { name: 'comprehensive-case-management', weight: 8, path: '../../../lib/comprehensiveCaseManagementKnowledge' },
      { name: 'personal-injury', weight: 7, path: '../../../lib/personalInjuryKnowledge' },
      { name: 'case-management', weight: 7, path: '../../../lib/caseManagementKnowledge' },
      { name: 'medical-records', weight: 6, path: '../../../lib/medicalRecordsKnowledge' },
      { name: 'legal-treatment', weight: 6, path: '../../../lib/legalTreatmentKnowledge' },
      { name: 'intake-process', weight: 5, path: '../../../lib/intakeProcessKnowledge' },
      { name: 'insurance', weight: 5, path: '../../../lib/insuranceKnowledge' },
      { name: 'hr', weight: 4, path: '../../../lib/hrKnowledge' },
      { name: 'ardent-company', weight: 4, path: '../../../lib/ardentCompanyKnowledge' },
      { name: 'it-troubleshooting', weight: 3, path: '../../../lib/itTroubleshootingKnowledge' }
    ];

    for (const config of domainConfigs) {
      this.domains.set(config.name, {
        name: config.name,
        findKnowledge: () => null, // Will be loaded lazily
        weight: config.weight,
        categories: []
      });
    }
  }

  /**
   * Lazy load domain if not already loaded
   */
  private async ensureDomainLoaded(domainName: string): Promise<void> {
    const domain = this.domains.get(domainName);
    if (!domain) {
      return; // Domain doesn't exist
    }
    
    // Check if already loaded (findKnowledge should be a proper function, not a placeholder)
    if (domain.findKnowledge && typeof domain.findKnowledge === 'function' && domain.findKnowledge.toString() !== '() => null') {
      return; // Already loaded
    }

    // Check if loading is in progress
    if (this.domainLoadPromises.has(domainName)) {
      await this.domainLoadPromises.get(domainName);
      return;
    }

    // Start loading
    const loadPromise = this.loadDomain(domainName);
    this.domainLoadPromises.set(domainName, loadPromise);
    
    try {
      await loadPromise;
    } finally {
      this.domainLoadPromises.delete(domainName);
    }
  }

  /**
   * Load domain dynamically
   */
  private async loadDomain(domainName: string): Promise<void> {
    const domainMap: Record<string, () => Promise<any>> = {
      'ardi-identity': () => import('../../../lib/ardiIdentity'),
      'granular': () => import('../../../lib/granularKnowledge'),
      'comprehensive-case-management': () => import('../../../lib/comprehensiveCaseManagementKnowledge'),
      'personal-injury': () => import('../../../lib/personalInjuryKnowledge'),
      'case-management': () => import('../../../lib/caseManagementKnowledge'),
      'medical-records': () => import('../../../lib/medicalRecordsKnowledge'),
      'legal-treatment': () => import('../../../lib/legalTreatmentKnowledge'),
      'intake-process': () => import('../../../lib/intakeProcessKnowledge'),
      'insurance': () => import('../../../lib/insuranceKnowledge'),
      'hr': () => import('../../../lib/hrKnowledge'),
      'ardent-company': () => import('../../../lib/ardentCompanyKnowledge'),
      'it-troubleshooting': () => import('../../../lib/itTroubleshootingKnowledge')
    };

    const loader = domainMap[domainName];
    if (!loader) {
      throw new Error(`Unknown domain: ${domainName}`);
    }

    try {
      const module = await loader();
      const domain = this.domains.get(domainName)!;
      
      // Update domain with loaded functions
      domain.findKnowledge = module.findKnowledge || module[`find${this.capitalize(domainName)}Knowledge`];
      
      if (typeof domain.findKnowledge !== 'function') {
        throw new Error(`Domain ${domainName} does not export a findKnowledge function`);
      }
      
      this.domains.set(domainName, domain);
    } catch (error) {
      console.error(`Failed to load domain ${domainName}:`, error);
      throw error;
    }
  }

  /**
   * Get domain statistics
   */
  getDomainStats(): {
    totalDomains: number;
    loadedDomains: number;
    domainWeights: Record<string, number>;
  } {
    const domainWeights: Record<string, number> = {};
    let loadedCount = 0;
    
    for (const [name, domain] of this.domains.entries()) {
      domainWeights[name] = domain.weight;
      if (domain.findKnowledge && typeof domain.findKnowledge === 'function' && domain.findKnowledge.toString() !== '() => null') {
        loadedCount++;
      }
    }
    
    return {
      totalDomains: this.domains.size,
      loadedDomains: loadedCount,
      domainWeights
    };
  }

  /**
   * Preload high-priority domains
   */
  async preloadHighPriorityDomains(): Promise<void> {
    const highPriorityDomains = Array.from(this.domains.entries())
      .filter(([, domain]) => domain.weight >= 7)
      .map(([name]) => name);
    
    const loadPromises = highPriorityDomains.map(domain => 
      this.ensureDomainLoaded(domain).catch(error => 
        console.warn(`Failed to preload domain ${domain}:`, error)
      )
    );
    
    await Promise.allSettled(loadPromises);
  }

  /**
   * Utility function to capitalize string
   */
  private capitalize(str: string): string {
    return str.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

// Singleton instance
export const knowledgeProcessor = new ParallelKnowledgeProcessor();
