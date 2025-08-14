// Knowledge Generation System for Dynamic Knowledge Creation
import { GeneratedKnowledge, InformationSource } from './thinkingEngine';
import { WebSearchResult } from './webSearchService';

export interface KnowledgeTemplate {
  id: string;
  name: string;
  pattern: RegExp;
  category: string;
  contentStructure: string;
  requiredFields: string[];
  examples: string[];
}

export interface KnowledgeSynthesis {
  sources: InformationSource[];
  webResults: WebSearchResult[];
  confidence: number;
  quality: number;
  gaps: string[];
  synthesizedContent: string;
  suggestedKeywords: string[];
  suggestedTriggers: string[];
}

export interface ValidationCriteria {
  minContentLength: number;
  requiredKeywords: string[];
  factualAccuracy: boolean;
  sourceCredibility: number;
  userFeedbackRequired: boolean;
}

export class KnowledgeGenerator {
  private templates: Map<string, KnowledgeTemplate> = new Map();
  private validationRules: Map<string, ValidationCriteria> = new Map();
  private generationHistory: GeneratedKnowledge[] = [];

  constructor() {
    this.initializeTemplates();
    this.initializeValidationRules();
  }

  /**
   * Generate new knowledge based on information sources
   */
  async generateKnowledge(
    userQuery: string,
    domain: string,
    sources: InformationSource[],
    webResults: WebSearchResult[] = []
  ): Promise<GeneratedKnowledge | null> {
    
    // Step 1: Analyze if knowledge generation is worthwhile
    if (!this.shouldGenerateKnowledge(sources, webResults)) {
      return null;
    }

    // Step 2: Synthesize information from multiple sources
    const synthesis = await this.synthesizeInformation(userQuery, domain, sources, webResults);
    
    // Step 3: Select appropriate template
    const template = this.selectTemplate(userQuery, domain, synthesis);
    
    // Step 4: Generate structured content
    const content = await this.generateStructuredContent(template, synthesis, userQuery);
    
    // Step 5: Extract keywords and triggers
    const keywords = this.extractKeywords(userQuery, content.main);
    const triggers = this.generateTriggers(userQuery, keywords);
    
    // Step 6: Create knowledge entry
    const knowledge: GeneratedKnowledge = {
      id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content.main,
      tableContent: content.table,
      category: template.category,
      source: 'AI Generated',
      confidence: synthesis.confidence,
      keywords,
      triggers,
      basedOnSources: this.getSourceNames(sources, webResults),
      createdAt: new Date(),
      usageCount: 0,
      successRate: 0.7 // Initial assumption
    };

    // Step 7: Validate generated knowledge
    if (await this.validateKnowledge(knowledge, template)) {
      this.generationHistory.push(knowledge);
      return knowledge;
    }

    return null;
  }

  /**
   * Synthesize information from multiple sources
   */
  private async synthesizeInformation(
    userQuery: string,
    domain: string,
    sources: InformationSource[],
    webResults: WebSearchResult[]
  ): Promise<KnowledgeSynthesis> {
    
    const allContent = [
      ...sources.map(s => s.content),
      ...webResults.map(r => `${r.title}: ${r.snippet}`)
    ];

    // Analyze content quality and relevance
    const confidence = this.calculateSynthesisConfidence(sources, webResults, userQuery);
    const quality = this.assessContentQuality(allContent);
    
    // Identify information gaps
    const gaps = this.identifyInformationGaps(userQuery, domain, allContent);
    
    // Create synthesized content
    const synthesizedContent = await this.synthesizeContent(allContent, userQuery, domain);
    
    // Extract keywords and triggers
    const suggestedKeywords = this.extractSuggestedKeywords(userQuery, synthesizedContent);
    const suggestedTriggers = this.generateSuggestedTriggers(userQuery, suggestedKeywords);

    return {
      sources,
      webResults,
      confidence,
      quality,
      gaps,
      synthesizedContent,
      suggestedKeywords,
      suggestedTriggers
    };
  }

  /**
   * Select appropriate knowledge template
   */
  private selectTemplate(userQuery: string, domain: string, synthesis: KnowledgeSynthesis): KnowledgeTemplate {
    const query = userQuery.toLowerCase();
    
    // Try to match specific patterns first
    for (const template of this.templates.values()) {
      if (template.pattern.test(query)) {
        return template;
      }
    }

    // Fall back to domain-based template
    const domainTemplate = this.templates.get(domain);
    if (domainTemplate) {
      return domainTemplate;
    }

    // Use general template as last resort
    return this.templates.get('general') || this.createDefaultTemplate(domain);
  }

  /**
   * Generate structured content using template
   */
  private async generateStructuredContent(
    template: KnowledgeTemplate,
    synthesis: KnowledgeSynthesis,
    userQuery: string
  ): Promise<{ main: string; table?: string }> {
    
    const content = synthesis.synthesizedContent;
    
    // Apply template structure
    let structuredContent = template.contentStructure
      .replace('{TITLE}', this.generateTitle(userQuery))
      .replace('{CONTENT}', content)
      .replace('{DOMAIN}', template.category);

    // Add additional sections based on available information
    if (synthesis.webResults.length > 0) {
      structuredContent += '\n\n**Additional Resources:**\n';
      synthesis.webResults.slice(0, 3).forEach(result => {
        structuredContent += `• [${result.title}](${result.url})\n`;
      });
    }

    if (synthesis.gaps.length > 0) {
      structuredContent += '\n\n**For more specific information:**\n';
      structuredContent += synthesis.gaps.map(gap => `• ${gap}`).join('\n');
    }

    // Generate table content if applicable
    let tableContent: string | undefined;
    if (this.shouldGenerateTable(userQuery, content)) {
      tableContent = this.generateTableContent(userQuery, content, template);
    }

    return {
      main: structuredContent,
      table: tableContent
    };
  }

  /**
   * Initialize knowledge templates
   */
  private initializeTemplates(): void {
    const templates: KnowledgeTemplate[] = [
      {
        id: 'legal-procedure',
        name: 'Legal Procedure',
        pattern: /\b(how to|process|procedure|steps)\b.*\b(legal|law|court|case)\b/i,
        category: 'Legal Process',
        contentStructure: `## {TITLE}

**Overview:**
{CONTENT}

**Key Steps:**
This information is based on current legal practices and should be used for general guidance only.

**Important Note:**
Please consult with a qualified attorney for specific legal advice regarding your situation.`,
        requiredFields: ['title', 'content'],
        examples: ['How to file a legal motion', 'Court filing procedures']
      },
      {
        id: 'insurance-claim',
        name: 'Insurance Claim Process',
        pattern: /\b(insurance|claim|coverage|policy)\b/i,
        category: 'Insurance',
        contentStructure: `## {TITLE}

**Insurance Information:**
{CONTENT}

**Coverage Details:**
This information covers general insurance practices and may vary by policy and provider.

**Next Steps:**
Contact your insurance provider directly for specific policy details and claim procedures.`,
        requiredFields: ['title', 'content'],
        examples: ['Filing an auto insurance claim', 'Understanding coverage limits']
      },
      {
        id: 'medical-process',
        name: 'Medical Process',
        pattern: /\b(medical|treatment|doctor|health)\b/i,
        category: 'Medical',
        contentStructure: `## {TITLE}

**Medical Information:**
{CONTENT}

**Important Disclaimer:**
This information is for educational purposes only and should not replace professional medical advice.

**Recommendation:**
Always consult with qualified healthcare professionals for medical decisions.`,
        requiredFields: ['title', 'content'],
        examples: ['Medical record documentation', 'Treatment authorization process']
      },
      {
        id: 'general-info',
        name: 'General Information',
        pattern: /.*/,
        category: 'General',
        contentStructure: `## {TITLE}

{CONTENT}

**Additional Notes:**
This information is compiled from available sources and is intended for general guidance.`,
        requiredFields: ['title', 'content'],
        examples: ['General procedural information', 'Company policies']
      }
    ];

    templates.forEach(template => {
      this.templates.set(template.id, template);
    });

    // Also add domain-based templates
    this.templates.set('legal', templates[0]);
    this.templates.set('insurance', templates[1]);
    this.templates.set('medical', templates[2]);
    this.templates.set('general', templates[3]);
  }

  /**
   * Initialize validation rules
   */
  private initializeValidationRules(): void {
    const rules: ValidationCriteria[] = [
      {
        minContentLength: 100,
        requiredKeywords: [],
        factualAccuracy: true,
        sourceCredibility: 0.6,
        userFeedbackRequired: false
      }
    ];

    this.validationRules.set('default', rules[0]);
  }

  /**
   * Determine if knowledge generation is worthwhile
   */
  private shouldGenerateKnowledge(sources: InformationSource[], webResults: WebSearchResult[]): boolean {
    // Generate knowledge if we have multiple sources or high-quality web results
    const totalSources = sources.length + webResults.length;
    const hasHighQualitySources = sources.some(s => s.confidence > 0.7) || 
                                  webResults.some(r => r.relevance > 0.8);
    
    return totalSources >= 2 || hasHighQualitySources;
  }

  /**
   * Calculate synthesis confidence
   */
  private calculateSynthesisConfidence(
    sources: InformationSource[],
    webResults: WebSearchResult[],
    userQuery: string
  ): number {
    if (sources.length === 0 && webResults.length === 0) {
      return 0;
    }

    let totalConfidence = 0;
    let totalWeight = 0;

    // Weight knowledge base sources higher
    for (const source of sources) {
      const weight = source.type === 'knowledge_base' ? 1.5 : 1.0;
      totalConfidence += source.confidence * weight;
      totalWeight += weight;
    }

    // Add web results with lower weight
    for (const result of webResults) {
      const weight = 0.7; // Web results have lower confidence
      totalConfidence += result.relevance * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? Math.min(1, totalConfidence / totalWeight) : 0;
  }

  /**
   * Assess content quality
   */
  private assessContentQuality(content: string[]): number {
    if (content.length === 0) return 0;

    let qualityScore = 0;
    const totalContent = content.join(' ');

    // Check length
    if (totalContent.length > 200) qualityScore += 0.3;
    if (totalContent.length > 500) qualityScore += 0.2;

    // Check for structured content
    if (/\d+\.|•|\*|-/.test(totalContent)) qualityScore += 0.2; // Has bullet points or numbers
    if (/\b(step|process|procedure|how to)\b/i.test(totalContent)) qualityScore += 0.2; // Procedural content

    // Check for professional language
    if (/\b(according|therefore|however|furthermore|additionally)\b/i.test(totalContent)) {
      qualityScore += 0.1;
    }

    return Math.min(1, qualityScore);
  }

  /**
   * Identify information gaps
   */
  private identifyInformationGaps(userQuery: string, domain: string, content: string[]): string[] {
    const gaps: string[] = [];
    const combinedContent = content.join(' ').toLowerCase();
    const query = userQuery.toLowerCase();

    // Domain-specific gap analysis
    if (domain === 'legal') {
      if (!combinedContent.includes('law') && !combinedContent.includes('legal')) {
        gaps.push('Specific legal requirements or regulations');
      }
      if (query.includes('deadline') && !combinedContent.includes('time')) {
        gaps.push('Specific timeframes or deadlines');
      }
    }

    if (domain === 'insurance') {
      if (!combinedContent.includes('coverage') && !combinedContent.includes('policy')) {
        gaps.push('Specific coverage details or policy information');
      }
    }

    // General gaps
    if (query.includes('how') && !combinedContent.includes('step')) {
      gaps.push('Step-by-step instructions');
    }

    if (query.includes('cost') && !combinedContent.includes('fee') && !combinedContent.includes('cost')) {
      gaps.push('Cost or fee information');
    }

    return gaps;
  }

  /**
   * Synthesize content from multiple sources
   */
  private async synthesizeContent(content: string[], userQuery: string, domain: string): Promise<string> {
    if (content.length === 0) {
      return `I don't have specific information about "${userQuery}" in my current knowledge base.`;
    }

    if (content.length === 1) {
      return content[0];
    }

    // Combine multiple sources intelligently
    const uniquePoints = this.extractUniquePoints(content);
    const synthesized = uniquePoints.join('\n\n');

    // Add domain-specific context
    let contextualContent = synthesized;
    if (domain === 'legal') {
      contextualContent = `Based on available legal information:\n\n${synthesized}`;
    } else if (domain === 'insurance') {
      contextualContent = `Insurance Information:\n\n${synthesized}`;
    } else if (domain === 'medical') {
      contextualContent = `Medical Process Information:\n\n${synthesized}`;
    }

    return contextualContent;
  }

  /**
   * Extract unique points from multiple content sources
   */
  private extractUniquePoints(content: string[]): string[] {
    const points: string[] = [];
    const seen = new Set<string>();

    for (const item of content) {
      // Split content into sentences or bullet points
      const sentences = item.split(/[.!?]\s+/).filter(s => s.trim().length > 20);
      
      for (const sentence of sentences) {
        const normalized = sentence.trim().toLowerCase();
        const key = normalized.substring(0, 50); // Use first 50 chars as key
        
        if (!seen.has(key) && sentence.trim().length > 30) {
          seen.add(key);
          points.push(sentence.trim());
        }
      }
    }

    return points.slice(0, 10); // Limit to top 10 points
  }

  /**
   * Extract keywords from query and content
   */
  private extractKeywords(userQuery: string, content: string): string[] {
    const combinedText = `${userQuery} ${content}`.toLowerCase();
    const words = combinedText.match(/\b\w{3,}\b/g) || [];
    
    // Count word frequency
    const wordFreq: Record<string, number> = {};
    for (const word of words) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }

    // Get top keywords, excluding common words
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'way', 'she', 'use', 'say', 'each', 'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could', 'other', 'after', 'first', 'well', 'many', 'some', 'work', 'very', 'where', 'much', 'before', 'right', 'too', 'any', 'same', 'tell', 'most', 'good']);

    return Object.entries(wordFreq)
      .filter(([word, freq]) => freq > 1 && !stopWords.has(word) && word.length > 3)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([word]) => word);
  }

  /**
   * Generate trigger phrases
   */
  private generateTriggers(userQuery: string, keywords: string[]): string[] {
    const triggers: string[] = [];
    const query = userQuery.toLowerCase();

    // Add the original query as a trigger
    triggers.push(query);

    // Generate variations
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'who'];
    for (const qw of questionWords) {
      if (query.includes(qw)) {
        // Create variations without question words
        const withoutQuestion = query.replace(new RegExp(`\\b${qw}\\s+`, 'g'), '').trim();
        if (withoutQuestion && withoutQuestion !== query) {
          triggers.push(withoutQuestion);
        }
      }
    }

    // Add keyword combinations
    if (keywords.length >= 2) {
      triggers.push(keywords.slice(0, 2).join(' '));
    }
    if (keywords.length >= 3) {
      triggers.push(keywords.slice(0, 3).join(' '));
    }

    return [...new Set(triggers)].slice(0, 10); // Remove duplicates and limit
  }

  /**
   * Validate generated knowledge
   */
  private async validateKnowledge(knowledge: GeneratedKnowledge, template: KnowledgeTemplate): Promise<boolean> {
    const rules = this.validationRules.get('default')!;

    // Check minimum content length
    if (knowledge.content.length < rules.minContentLength) {
      return false;
    }

    // Check confidence threshold
    if (knowledge.confidence < 0.5) {
      return false;
    }

    // Check for required keywords if specified
    if (rules.requiredKeywords.length > 0) {
      const contentLower = knowledge.content.toLowerCase();
      const hasRequiredKeywords = rules.requiredKeywords.some(keyword => 
        contentLower.includes(keyword.toLowerCase())
      );
      if (!hasRequiredKeywords) {
        return false;
      }
    }

    return true;
  }

  /**
   * Helper methods
   */
  private getSourceNames(sources: InformationSource[], webResults: WebSearchResult[]): string[] {
    const names: string[] = [];
    names.push(...sources.map(s => s.source));
    names.push(...webResults.map(r => r.source));
    return [...new Set(names)]; // Remove duplicates
  }

  private generateTitle(userQuery: string): string {
    // Clean up query to create a proper title
    let title = userQuery.replace(/[?!.]/g, '').trim();
    
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    // Add "How to" for procedural queries
    if (/^(create|make|do|setup|configure|install)/i.test(title)) {
      title = `How to ${title.charAt(0).toLowerCase() + title.slice(1)}`;
    }
    
    return title;
  }

  private shouldGenerateTable(userQuery: string, content: string): boolean {
    // Generate table for structured information
    const hasStructuredData = /\d+\.|•|\*|-/.test(content);
    const isComparison = /\b(compare|versus|vs|difference)\b/i.test(userQuery);
    const isList = /\b(list|types|kinds|examples)\b/i.test(userQuery);
    
    return hasStructuredData || isComparison || isList;
  }

  private generateTableContent(userQuery: string, content: string, template: KnowledgeTemplate): string {
    // Simple table generation - could be enhanced
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const structuredLines = lines.filter(line => 
      /^\d+\.|^•|^\*|^-/.test(line.trim())
    );

    if (structuredLines.length < 2) {
      return undefined as any;
    }

    let table = '| Item | Description |\n|------|-------------|\n';
    
    for (const line of structuredLines.slice(0, 10)) {
      const cleaned = line.replace(/^\d+\.|^•|^\*|^-/, '').trim();
      const parts = cleaned.split(':');
      
      if (parts.length >= 2) {
        table += `| ${parts[0].trim()} | ${parts.slice(1).join(':').trim()} |\n`;
      } else {
        table += `| ${cleaned} | Additional information available |\n`;
      }
    }

    return table;
  }

  private createDefaultTemplate(domain: string): KnowledgeTemplate {
    return {
      id: `default-${domain}`,
      name: `Default ${domain} Template`,
      pattern: /.*/,
      category: domain,
      contentStructure: `## {TITLE}\n\n{CONTENT}\n\n**Domain:** {DOMAIN}`,
      requiredFields: ['title', 'content'],
      examples: []
    };
  }

  private extractSuggestedKeywords(userQuery: string, content: string): string[] {
    return this.extractKeywords(userQuery, content);
  }

  private generateSuggestedTriggers(userQuery: string, keywords: string[]): string[] {
    return this.generateTriggers(userQuery, keywords);
  }

  /**
   * Public methods for external use
   */
  public getGenerationHistory(): GeneratedKnowledge[] {
    return [...this.generationHistory];
  }

  public addTemplate(template: KnowledgeTemplate): void {
    this.templates.set(template.id, template);
  }

  public getTemplates(): KnowledgeTemplate[] {
    return Array.from(this.templates.values());
  }
}

// Singleton instance
export const knowledgeGenerator = new KnowledgeGenerator();
