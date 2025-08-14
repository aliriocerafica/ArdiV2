// Enhanced AI Thinking Engine for Knowledge Generation and Learning
import { KnowledgeResult, findKnowledge } from './knowledgeIndex';

export interface ThinkingQuery {
  userMessage: string;
  context?: string[];
  timestamp: Date;
  sessionId?: string;
}

export interface InformationSource {
  type: 'knowledge_base' | 'web_search' | 'pattern_match' | 'synthesis';
  content: string;
  confidence: number;
  source: string;
  relevance: number;
}

export interface ThinkingProcess {
  id: string;
  query: ThinkingQuery;
  analysisSteps: string[];
  informationGathered: InformationSource[];
  knowledgeGaps: string[];
  synthesizedResponse: string;
  confidence: number;
  learningOpportunities: string[];
  generatedKnowledge?: GeneratedKnowledge;
}

export interface GeneratedKnowledge {
  id: string;
  content: string;
  tableContent?: string;
  category: string;
  source: string;
  confidence: number;
  keywords: string[];
  triggers: string[];
  basedOnSources: string[];
  createdAt: Date;
  validatedBy?: string;
  usageCount: number;
  successRate: number;
}

export interface QueryAnalysis {
  intent: string;
  keywords: string[];
  entities: string[];
  domain: string;
  complexity: 'simple' | 'moderate' | 'complex';
  requiresRealtimeData: boolean;
  informationNeeds: string[];
}

export interface LearningMetrics {
  queryPattern: string;
  responseSuccessRate: number;
  userSatisfactionScore: number;
  improvementSuggestions: string[];
  commonFollowUps: string[];
  usageCount?: number;
}

export class ThinkingEngine {
  private learningData: Map<string, LearningMetrics> = new Map();
  private generatedKnowledgeStore: Map<string, GeneratedKnowledge> = new Map();
  private queryHistory: ThinkingProcess[] = [];
  private readonly MAX_HISTORY = 1000;

  constructor() {
    this.loadPersistedData();
  }

  /**
   * Main entry point for enhanced query processing
   */
  async processQuery(userMessage: string, context?: string[]): Promise<{
    response: string;
    thinkingProcess: ThinkingProcess;
    isEnhanced: boolean;
  }> {
    const thinkingProcess = await this.think(userMessage, context);
    
    // Try existing knowledge base first (maintaining backward compatibility)
    const existingKnowledge = findKnowledge(userMessage);
    
    if (existingKnowledge && this.isKnowledgeAdequate(existingKnowledge, thinkingProcess.query)) {
      // Enhance existing response with thinking insights
      const enhancedResponse = await this.enhanceExistingResponse(existingKnowledge, thinkingProcess);
      return {
        response: enhancedResponse,
        thinkingProcess,
        isEnhanced: true
      };
    }

    // Generate new knowledge-based response
    const generatedResponse = await this.generateIntelligentResponse(thinkingProcess);
    
    // Learn from this interaction
    this.recordLearning(thinkingProcess, generatedResponse);
    
    return {
      response: generatedResponse,
      thinkingProcess,
      isEnhanced: true
    };
  }

  /**
   * Analyze user query to understand intent and information needs
   */
  private analyzeQuery(userMessage: string): QueryAnalysis {
    const message = userMessage.toLowerCase();
    
    // Extract keywords using enhanced NLP techniques
    const keywords = this.extractKeywords(message);
    
    // Identify entities (names, dates, numbers, etc.)
    const entities = this.extractEntities(message);
    
    // Determine intent categories
    const intent = this.classifyIntent(message);
    
    // Identify domain
    const domain = this.identifyDomain(message, keywords);
    
    // Assess complexity
    const complexity = this.assessComplexity(message, keywords, entities);
    
    // Check if real-time data is needed
    const requiresRealtimeData = this.requiresRealtimeData(message, intent);
    
    // Identify specific information needs
    const informationNeeds = this.identifyInformationNeeds(message, intent, domain);

    return {
      intent,
      keywords,
      entities,
      domain,
      complexity,
      requiresRealtimeData,
      informationNeeds
    };
  }

  /**
   * Core thinking process that analyzes and gathers information
   */
  private async think(userMessage: string, context?: string[]): Promise<ThinkingProcess> {
    const id = `thinking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const query: ThinkingQuery = {
      userMessage,
      context,
      timestamp: new Date()
    };

    const analysisSteps: string[] = [];
    const informationGathered: InformationSource[] = [];
    const knowledgeGaps: string[] = [];
    const learningOpportunities: string[] = [];

    // Step 1: Analyze the query
    analysisSteps.push("Analyzing user query intent and information needs");
    const queryAnalysis = this.analyzeQuery(userMessage);

    // Step 2: Search existing knowledge base
    analysisSteps.push("Searching existing knowledge base");
    const existingKnowledge = findKnowledge(userMessage);
    if (existingKnowledge) {
      informationGathered.push({
        type: 'knowledge_base',
        content: existingKnowledge.content,
        confidence: 0.8,
        source: existingKnowledge.source,
        relevance: this.calculateRelevance(userMessage, existingKnowledge.content)
      });
    }

    // Step 3: Check for similar patterns in learning data
    analysisSteps.push("Analyzing patterns from previous interactions");
    const similarPatterns = this.findSimilarPatterns(userMessage);
    for (const pattern of similarPatterns) {
      informationGathered.push({
        type: 'pattern_match',
        content: `Similar query pattern found with ${pattern.responseSuccessRate}% success rate`,
        confidence: pattern.responseSuccessRate / 100,
        source: 'Pattern Analysis',
        relevance: 0.7
      });
    }

    // Step 4: Search generated knowledge store
    analysisSteps.push("Searching generated knowledge store");
    const generatedKnowledge = this.searchGeneratedKnowledge(userMessage);
    for (const gk of generatedKnowledge) {
      informationGathered.push({
        type: 'knowledge_base',
        content: gk.content,
        confidence: gk.confidence,
        source: `Generated Knowledge (${gk.source})`,
        relevance: this.calculateRelevance(userMessage, gk.content)
      });
    }

    // Step 5: Identify knowledge gaps
    analysisSteps.push("Identifying knowledge gaps");
    if (informationGathered.length === 0) {
      knowledgeGaps.push("No existing knowledge found for this query");
      learningOpportunities.push("Opportunity to create new knowledge entry");
    }

    if (queryAnalysis.requiresRealtimeData) {
      knowledgeGaps.push("Query requires real-time information");
      learningOpportunities.push("Consider web search integration");
    }

    // Step 6: Synthesize response
    analysisSteps.push("Synthesizing intelligent response");
    const synthesizedResponse = await this.synthesizeResponse(
      userMessage,
      queryAnalysis,
      informationGathered,
      knowledgeGaps
    );

    const confidence = this.calculateOverallConfidence(informationGathered);

    const thinkingProcess: ThinkingProcess = {
      id,
      query,
      analysisSteps,
      informationGathered,
      knowledgeGaps,
      synthesizedResponse,
      confidence,
      learningOpportunities
    };

    // Store in history
    this.queryHistory.push(thinkingProcess);
    if (this.queryHistory.length > this.MAX_HISTORY) {
      this.queryHistory.shift();
    }

    return thinkingProcess;
  }

  /**
   * Generate intelligent response based on thinking process
   */
  private async generateIntelligentResponse(thinkingProcess: ThinkingProcess): Promise<string> {
    const { query, informationGathered, knowledgeGaps, synthesizedResponse } = thinkingProcess;

    if (synthesizedResponse && thinkingProcess.confidence > 0.6) {
      return synthesizedResponse;
    }

    // If no good information was found, generate a helpful response
    if (informationGathered.length === 0) {
      const queryAnalysis = this.analyzeQuery(query.userMessage);
      return this.generateHelpfulResponse(queryAnalysis, knowledgeGaps);
    }

    // Synthesize from available information
    return this.synthesizeFromMultipleSources(informationGathered, query.userMessage);
  }

  /**
   * Enhance existing knowledge base response with thinking insights
   */
  private async enhanceExistingResponse(
    existingKnowledge: KnowledgeResult,
    thinkingProcess: ThinkingProcess
  ): Promise<string> {
    // For now, return the existing response
    // Future enhancements could add contextual information, related topics, etc.
    return existingKnowledge.tableContent || existingKnowledge.content;
  }

  /**
   * Extract keywords from user message using enhanced techniques
   */
  private extractKeywords(message: string): string[] {
    // Remove common stop words and extract meaningful terms
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can',
      'what', 'when', 'where', 'why', 'how', 'who', 'which', 'this', 'that', 'these',
      'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ]);

    const words = message
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    // Extract multi-word phrases that might be important
    const phrases: string[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      const twoWord = `${words[i]} ${words[i + 1]}`;
      const threeWord = i < words.length - 2 ? `${words[i]} ${words[i + 1]} ${words[i + 2]}` : '';
      
      if (this.isImportantPhrase(twoWord)) phrases.push(twoWord);
      if (threeWord && this.isImportantPhrase(threeWord)) phrases.push(threeWord);
    }

    return [...words, ...phrases];
  }

  /**
   * Extract entities like names, dates, numbers
   */
  private extractEntities(message: string): string[] {
    const entities: string[] = [];
    
    // Extract dates
    const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b/g;
    const dates = message.match(datePattern);
    if (dates) entities.push(...dates);

    // Extract numbers
    const numberPattern = /\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g;
    const numbers = message.match(numberPattern);
    if (numbers) entities.push(...numbers);

    // Extract potential names (capitalized words)
    const namePattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
    const names = message.match(namePattern);
    if (names) entities.push(...names.filter(name => !this.isCommonWord(name)));

    return entities;
  }

  /**
   * Classify user intent
   */
  private classifyIntent(message: string): string {
    const intentPatterns: Record<string, RegExp[]> = {
      'question': [/\b(what|how|when|where|why|who|which)\b/i, /\?/],
      'request_help': [/\b(help|assist|support|guide)\b/i],
      'request_information': [/\b(tell me|explain|describe|show)\b/i],
      'complaint': [/\b(problem|issue|wrong|error|broken|not working)\b/i],
      'greeting': [/\b(hello|hi|hey|good morning|good afternoon)\b/i],
      'procedure': [/\b(how to|steps|process|procedure)\b/i],
      'definition': [/\b(what is|define|meaning of)\b/i],
      'comparison': [/\b(compare|difference|versus|vs|better)\b/i],
      'status': [/\b(status|progress|update|current)\b/i]
    };

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      if (patterns.some(pattern => pattern.test(message))) {
        return intent;
      }
    }

    return 'general_query';
  }

  /**
   * Identify domain/category of the query
   */
  private identifyDomain(message: string, keywords: string[]): string {
    const domainKeywords: Record<string, string[]> = {
      'legal': ['case', 'law', 'legal', 'court', 'attorney', 'lawsuit', 'claim', 'injury', 'insurance'],
      'medical': ['medical', 'doctor', 'treatment', 'health', 'hospital', 'injury', 'diagnosis'],
      'insurance': ['insurance', 'claim', 'coverage', 'policy', 'deductible', 'premium'],
      'hr': ['hr', 'human resources', 'employee', 'benefits', 'leave', 'vacation', 'policy'],
      'it': ['computer', 'software', 'email', 'password', 'system', 'tech', 'dropbox', 'outlook'],
      'company': ['company', 'business', 'organization', 'team', 'management', 'ardent'],
      'process': ['process', 'procedure', 'workflow', 'steps', 'intake', 'management']
    };

    const messageLower = message.toLowerCase();
    const allTerms = [...keywords, ...messageLower.split(' ')];

    let bestMatch = 'general';
    let bestScore = 0;

    for (const [domain, domainWords] of Object.entries(domainKeywords)) {
      const matches = domainWords.filter(word => 
        allTerms.some(term => term.includes(word) || word.includes(term))
      );
      
      if (matches.length > bestScore) {
        bestScore = matches.length;
        bestMatch = domain;
      }
    }

    return bestMatch;
  }

  /**
   * Assess query complexity
   */
  private assessComplexity(message: string, keywords: string[], entities: string[]): 'simple' | 'moderate' | 'complex' {
    const factors = {
      length: message.length,
      keywordCount: keywords.length,
      entityCount: entities.length,
      questionWords: (message.match(/\b(what|how|when|where|why|who|which)\b/gi) || []).length,
      conjunctions: (message.match(/\b(and|or|but|however|therefore|because)\b/gi) || []).length
    };

    const complexityScore = 
      (factors.length > 100 ? 2 : factors.length > 50 ? 1 : 0) +
      (factors.keywordCount > 10 ? 2 : factors.keywordCount > 5 ? 1 : 0) +
      (factors.entityCount > 3 ? 2 : factors.entityCount > 1 ? 1 : 0) +
      (factors.questionWords > 2 ? 2 : factors.questionWords > 1 ? 1 : 0) +
      (factors.conjunctions > 2 ? 2 : factors.conjunctions > 0 ? 1 : 0);

    if (complexityScore >= 6) return 'complex';
    if (complexityScore >= 3) return 'moderate';
    return 'simple';
  }

  /**
   * Check if query requires real-time data
   */
  private requiresRealtimeData(message: string, intent: string): boolean {
    const realtimeIndicators = [
      'current', 'now', 'today', 'latest', 'recent', 'update', 'status',
      'live', 'real-time', 'active', 'ongoing', 'present'
    ];

    const messageLower = message.toLowerCase();
    return realtimeIndicators.some(indicator => messageLower.includes(indicator)) ||
           intent === 'status';
  }

  /**
   * Identify specific information needs
   */
  private identifyInformationNeeds(message: string, intent: string, domain: string): string[] {
    const needs: string[] = [];

    if (intent === 'question') {
      needs.push('factual_information');
    }
    
    if (intent === 'procedure') {
      needs.push('step_by_step_instructions');
    }

    if (intent === 'definition') {
      needs.push('clear_explanation');
    }

    if (domain === 'legal') {
      needs.push('legal_context', 'compliance_information');
    }

    if (domain === 'medical') {
      needs.push('medical_context', 'safety_information');
    }

    return needs;
  }

  /**
   * Helper methods
   */
  private isImportantPhrase(phrase: string): boolean {
    const importantPhrases = [
      'personal injury', 'case management', 'insurance claim', 'medical records',
      'legal treatment', 'statute of limitations', 'uninsured motorist',
      'property damage', 'traffic collision', 'letters of representation'
    ];
    
    return importantPhrases.some(important => 
      phrase.includes(important) || important.includes(phrase)
    );
  }

  private isCommonWord(word: string): boolean {
    const commonWords = ['This', 'That', 'The', 'And', 'But', 'For', 'How', 'What', 'When', 'Where'];
    return commonWords.includes(word);
  }

  private calculateRelevance(query: string, content: string): number {
    const queryTerms = this.extractKeywords(query);
    const contentLower = content.toLowerCase();
    
    const matches = queryTerms.filter(term => contentLower.includes(term.toLowerCase()));
    return matches.length / Math.max(queryTerms.length, 1);
  }

  private findSimilarPatterns(userMessage: string): LearningMetrics[] {
    // Find patterns based on keyword similarity
    const queryKeywords = this.extractKeywords(userMessage);
    const patterns: LearningMetrics[] = [];

    for (const [pattern, metrics] of this.learningData.entries()) {
      const patternKeywords = this.extractKeywords(pattern);
      const similarity = this.calculateSimilarity(queryKeywords, patternKeywords);
      
      if (similarity > 0.3) {
        patterns.push(metrics);
      }
    }

    return patterns.sort((a, b) => b.responseSuccessRate - a.responseSuccessRate);
  }

  private calculateSimilarity(keywords1: string[], keywords2: string[]): number {
    const set1 = new Set(keywords1.map(k => k.toLowerCase()));
    const set2 = new Set(keywords2.map(k => k.toLowerCase()));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  private searchGeneratedKnowledge(userMessage: string): GeneratedKnowledge[] {
    const queryKeywords = this.extractKeywords(userMessage);
    const results: { knowledge: GeneratedKnowledge; score: number }[] = [];

    for (const knowledge of this.generatedKnowledgeStore.values()) {
      let score = 0;
      
      // Check keyword matches
      for (const keyword of knowledge.keywords) {
        if (queryKeywords.some(qk => qk.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 1;
        }
      }
      
      // Check trigger matches
      for (const trigger of knowledge.triggers) {
        if (userMessage.toLowerCase().includes(trigger.toLowerCase())) {
          score += 2;
        }
      }
      
      if (score > 0) {
        results.push({ knowledge, score });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(r => r.knowledge);
  }

  private calculateOverallConfidence(sources: InformationSource[]): number {
    if (sources.length === 0) return 0;
    
    const weightedSum = sources.reduce((sum, source) => 
      sum + (source.confidence * source.relevance), 0
    );
    const totalWeight = sources.reduce((sum, source) => sum + source.relevance, 0);
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  private async synthesizeResponse(
    userMessage: string,
    analysis: QueryAnalysis,
    sources: InformationSource[],
    gaps: string[]
  ): Promise<string> {
    if (sources.length === 0) {
      return '';
    }

    // Use the highest confidence source as base
    const bestSource = sources.reduce((best, current) => 
      (current.confidence * current.relevance) > (best.confidence * best.relevance) ? current : best
    );

    return bestSource.content;
  }

  private generateHelpfulResponse(analysis: QueryAnalysis, gaps: string[]): string {
    const domain = analysis.domain;
    const intent = analysis.intent;

    let response = "I understand you're asking about ";
    
    if (domain !== 'general') {
      response += `${domain} `;
    }
    
    response += "topics. ";

    if (intent === 'question') {
      response += "While I don't have specific information about this in my current knowledge base, ";
    }

    response += `I'd be happy to help you find the information you need. 

📚 **What I can help with:**
- Questions about legal case management
- Personal injury processes and procedures  
- Insurance coverage information
- IT troubleshooting for common systems
- HR policies and company information

🔧 **For immediate assistance:**
- Try rephrasing your question with specific keywords
- Contact our support team for specialized help
- Check our knowledge base categories for related topics

💡 **Tip:** The more specific your question, the better I can assist you!`;

    return response;
  }

  private synthesizeFromMultipleSources(sources: InformationSource[], query: string): string {
    // Sort sources by relevance and confidence
    const sortedSources = sources.sort((a, b) => 
      (b.confidence * b.relevance) - (a.confidence * a.relevance)
    );

    const primarySource = sortedSources[0];
    let response = primarySource.content;

    // Add supplementary information if available
    if (sortedSources.length > 1) {
      const supplementarySources = sortedSources.slice(1, 3).filter(s => s.confidence > 0.5);
      
      if (supplementarySources.length > 0) {
        response += "\n\n**Additional Information:**\n";
        for (const source of supplementarySources) {
          response += `\n• ${source.content.substring(0, 200)}${source.content.length > 200 ? '...' : ''}`;
        }
      }
    }

    return response;
  }

  private isKnowledgeAdequate(knowledge: KnowledgeResult, query: ThinkingQuery): boolean {
    // Simple check - could be enhanced with more sophisticated analysis
    const contentLength = (knowledge.content || '').length;
    const hasTableContent = !!knowledge.tableContent;
    
    return contentLength > 50 || hasTableContent;
  }

  private recordLearning(thinkingProcess: ThinkingProcess, response: string): void {
    const pattern = this.extractPattern(thinkingProcess.query.userMessage);
    
    const existing = this.learningData.get(pattern);
    if (existing) {
      existing.usageCount = existing.usageCount ? existing.usageCount + 1 : 1;
    } else {
      this.learningData.set(pattern, {
        queryPattern: pattern,
        responseSuccessRate: 0.8, // Initial assumption
        userSatisfactionScore: 0.7, // Initial assumption
        improvementSuggestions: [],
        commonFollowUps: [],
        usageCount: 1
      });
    }

    this.persistLearningData();
  }

  private extractPattern(message: string): string {
    // Extract general pattern from specific message
    const keywords = this.extractKeywords(message);
    return keywords.slice(0, 3).join(' '); // Use top 3 keywords as pattern
  }

  private loadPersistedData(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const learningDataStr = localStorage.getItem('ardi_learning_data');
        if (learningDataStr) {
          const data = JSON.parse(learningDataStr);
          this.learningData = new Map(Object.entries(data));
        }

        const generatedKnowledgeStr = localStorage.getItem('ardi_generated_knowledge');
        if (generatedKnowledgeStr) {
          const data = JSON.parse(generatedKnowledgeStr);
          this.generatedKnowledgeStore = new Map(Object.entries(data));
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted thinking engine data:', error);
    }
  }

  private persistLearningData(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const learningDataObj = Object.fromEntries(this.learningData.entries());
        localStorage.setItem('ardi_learning_data', JSON.stringify(learningDataObj));

        const generatedKnowledgeObj = Object.fromEntries(this.generatedKnowledgeStore.entries());
        localStorage.setItem('ardi_generated_knowledge', JSON.stringify(generatedKnowledgeObj));
      }
    } catch (error) {
      console.warn('Failed to persist thinking engine data:', error);
    }
  }

  /**
   * Public methods for external integration
   */
  
  public recordUserFeedback(processId: string, isPositive: boolean): void {
    const process = this.queryHistory.find(p => p.id === processId);
    if (process) {
      const pattern = this.extractPattern(process.query.userMessage);
      const metrics = this.learningData.get(pattern);
      
      if (metrics) {
        // Update success rate based on feedback
        const currentSuccess = metrics.responseSuccessRate;
        const newSuccess = isPositive 
          ? Math.min(1, currentSuccess + 0.1)
          : Math.max(0, currentSuccess - 0.1);
        
        metrics.responseSuccessRate = newSuccess;
        this.learningData.set(pattern, metrics);
        this.persistLearningData();
      }
    }
  }

  public generateKnowledge(
    content: string,
    category: string,
    keywords: string[],
    triggers: string[],
    basedOnSources: string[]
  ): GeneratedKnowledge {
    const knowledge: GeneratedKnowledge = {
      id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      category,
      source: 'AI Generated',
      confidence: 0.7,
      keywords,
      triggers,
      basedOnSources,
      createdAt: new Date(),
      usageCount: 0,
      successRate: 0.7
    };

    this.generatedKnowledgeStore.set(knowledge.id, knowledge);
    this.persistLearningData();
    
    return knowledge;
  }

  public getThinkingHistory(): ThinkingProcess[] {
    return [...this.queryHistory];
  }

  public getLearningMetrics(): LearningMetrics[] {
    return Array.from(this.learningData.values());
  }
}

// Singleton instance
export const thinkingEngine = new ThinkingEngine();
