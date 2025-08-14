// Learning and Feedback System for Continuous Improvement
import { ThinkingProcess, LearningMetrics, GeneratedKnowledge } from './thinkingEngine';

export interface UserFeedback {
  id: string;
  processId: string;
  userMessage: string;
  response: string;
  rating: 'positive' | 'negative' | 'neutral';
  specificFeedback?: string;
  categories: string[];
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export interface InteractionPattern {
  id: string;
  pattern: string;
  frequency: number;
  successRate: number;
  avgResponseTime: number;
  commonKeywords: string[];
  userSatisfaction: number;
  improvementAreas: string[];
  lastUpdated: Date;
}

export interface LearningInsight {
  type: 'success_pattern' | 'failure_pattern' | 'knowledge_gap' | 'improvement_opportunity';
  description: string;
  confidence: number;
  frequency: number;
  recommendation: string;
  impact: 'low' | 'medium' | 'high';
  evidence: string[];
}

export interface PerformanceMetrics {
  totalInteractions: number;
  positiveRating: number;
  negativeRating: number;
  neutralRating: number;
  avgResponseQuality: number;
  knowledgeGapRate: number;
  commonFailurePoints: string[];
  improvementTrends: { date: string; score: number }[];
}

export class LearningSystem {
  private feedbackHistory: Map<string, UserFeedback> = new Map();
  private interactionPatterns: Map<string, InteractionPattern> = new Map();
  private knowledgePerformance: Map<string, number> = new Map();
  private learningInsights: LearningInsight[] = [];
  private performanceHistory: PerformanceMetrics[] = [];

  constructor() {
    this.loadPersistedData();
    this.startPeriodicAnalysis();
  }

  /**
   * Record user feedback for a specific interaction
   */
  recordFeedback(feedback: UserFeedback): void {
    this.feedbackHistory.set(feedback.id, feedback);
    this.updateInteractionPattern(feedback);
    this.updateKnowledgePerformance(feedback);
    this.persistData();
  }

  /**
   * Record interaction completion (successful response)
   */
  recordInteraction(
    thinkingProcess: ThinkingProcess,
    response: string,
    responseTime: number,
    wasSuccessful: boolean
  ): void {
    const pattern = this.extractInteractionPattern(thinkingProcess.query.userMessage);
    const existing = this.interactionPatterns.get(pattern);

    if (existing) {
      existing.frequency += 1;
      existing.avgResponseTime = (existing.avgResponseTime + responseTime) / 2;
      existing.successRate = (existing.successRate * (existing.frequency - 1) + (wasSuccessful ? 1 : 0)) / existing.frequency;
      existing.lastUpdated = new Date();
    } else {
      this.interactionPatterns.set(pattern, {
        id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        pattern,
        frequency: 1,
        successRate: wasSuccessful ? 1 : 0,
        avgResponseTime: responseTime,
        commonKeywords: this.extractKeywords(thinkingProcess.query.userMessage),
        userSatisfaction: 0.7, // Default assumption
        improvementAreas: [],
        lastUpdated: new Date()
      });
    }

    this.persistData();
  }

  /**
   * Analyze patterns and generate learning insights
   */
  async generateLearningInsights(): Promise<LearningInsight[]> {
    const insights: LearningInsight[] = [];

    // Analyze success patterns
    insights.push(...this.analyzeSuccessPatterns());
    
    // Analyze failure patterns
    insights.push(...this.analyzeFailurePatterns());
    
    // Identify knowledge gaps
    insights.push(...this.identifyKnowledgeGaps());
    
    // Find improvement opportunities
    insights.push(...this.findImprovementOpportunities());

    this.learningInsights = insights;
    return insights;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    const feedbacks = Array.from(this.feedbackHistory.values());
    const totalInteractions = feedbacks.length;

    if (totalInteractions === 0) {
      return {
        totalInteractions: 0,
        positiveRating: 0,
        negativeRating: 0,
        neutralRating: 0,
        avgResponseQuality: 0,
        knowledgeGapRate: 0,
        commonFailurePoints: [],
        improvementTrends: []
      };
    }

    const positive = feedbacks.filter(f => f.rating === 'positive').length;
    const negative = feedbacks.filter(f => f.rating === 'negative').length;
    const neutral = feedbacks.filter(f => f.rating === 'neutral').length;

    const avgResponseQuality = (positive / totalInteractions) * 100;
    const knowledgeGapRate = this.calculateKnowledgeGapRate();
    const commonFailurePoints = this.getCommonFailurePoints();
    const improvementTrends = this.calculateImprovementTrends();

    return {
      totalInteractions,
      positiveRating: (positive / totalInteractions) * 100,
      negativeRating: (negative / totalInteractions) * 100,
      neutralRating: (neutral / totalInteractions) * 100,
      avgResponseQuality,
      knowledgeGapRate,
      commonFailurePoints,
      improvementTrends
    };
  }

  /**
   * Get recommendations for knowledge improvement
   */
  getKnowledgeRecommendations(): string[] {
    const recommendations: string[] = [];
    const insights = this.learningInsights;

    // High-impact improvement opportunities
    const highImpactInsights = insights.filter(i => i.impact === 'high');
    for (const insight of highImpactInsights) {
      recommendations.push(insight.recommendation);
    }

    // Common failure patterns
    const failurePatterns = insights.filter(i => i.type === 'failure_pattern');
    for (const pattern of failurePatterns.slice(0, 3)) {
      recommendations.push(`Address failure pattern: ${pattern.description}`);
    }

    // Knowledge gaps
    const knowledgeGaps = insights.filter(i => i.type === 'knowledge_gap');
    for (const gap of knowledgeGaps.slice(0, 3)) {
      recommendations.push(`Fill knowledge gap: ${gap.description}`);
    }

    return recommendations.slice(0, 10); // Limit to top 10 recommendations
  }

  /**
   * Predict query success likelihood
   */
  predictQuerySuccess(userMessage: string): { probability: number; confidence: number; reasoning: string } {
    const pattern = this.extractInteractionPattern(userMessage);
    const matchingPattern = this.interactionPatterns.get(pattern);

    if (matchingPattern) {
      return {
        probability: matchingPattern.successRate,
        confidence: Math.min(matchingPattern.frequency / 10, 1), // Higher confidence with more data
        reasoning: `Based on ${matchingPattern.frequency} similar interactions with ${(matchingPattern.successRate * 100).toFixed(1)}% success rate`
      };
    }

    // Look for similar patterns
    const similarPatterns = this.findSimilarPatterns(userMessage);
    if (similarPatterns.length > 0) {
      const avgSuccess = similarPatterns.reduce((sum, p) => sum + p.successRate, 0) / similarPatterns.length;
      const totalFreq = similarPatterns.reduce((sum, p) => sum + p.frequency, 0);
      
      return {
        probability: avgSuccess,
        confidence: Math.min(totalFreq / 20, 0.8), // Lower confidence for similar patterns
        reasoning: `Based on ${similarPatterns.length} similar patterns with average ${(avgSuccess * 100).toFixed(1)}% success rate`
      };
    }

    // Default prediction for new patterns
    return {
      probability: 0.7, // Optimistic default
      confidence: 0.3,  // Low confidence for unknown patterns
      reasoning: 'No historical data available - using default prediction'
    };
  }

  /**
   * Get adaptive response suggestions
   */
  getAdaptiveResponseSuggestions(userMessage: string): string[] {
    const suggestions: string[] = [];
    const keywords = this.extractKeywords(userMessage);
    
    // Find successful patterns with similar keywords
    const successfulPatterns = Array.from(this.interactionPatterns.values())
      .filter(p => p.successRate > 0.8)
      .filter(p => this.hasKeywordOverlap(keywords, p.commonKeywords));

    // Extract successful response characteristics
    for (const pattern of successfulPatterns.slice(0, 3)) {
      if (pattern.improvementAreas.length === 0) {
        suggestions.push(`Use structured approach similar to successful "${pattern.pattern}" pattern`);
      }
    }

    // General suggestions based on performance data
    const metrics = this.getPerformanceMetrics();
    if (metrics.knowledgeGapRate > 0.3) {
      suggestions.push('Consider providing alternative resources or contact information');
    }

    if (metrics.avgResponseQuality < 70) {
      suggestions.push('Focus on clarity and specific, actionable information');
    }

    return suggestions;
  }

  /**
   * Private helper methods
   */
  private updateInteractionPattern(feedback: UserFeedback): void {
    const pattern = this.extractInteractionPattern(feedback.userMessage);
    const existing = this.interactionPatterns.get(pattern);

    if (existing) {
      // Update satisfaction score
      const ratingValue = feedback.rating === 'positive' ? 1 : feedback.rating === 'negative' ? 0 : 0.5;
      existing.userSatisfaction = (existing.userSatisfaction + ratingValue) / 2;
      
      // Add improvement areas from negative feedback
      if (feedback.rating === 'negative' && feedback.specificFeedback) {
        existing.improvementAreas.push(feedback.specificFeedback);
      }
      
      existing.lastUpdated = new Date();
    }
  }

  private updateKnowledgePerformance(feedback: UserFeedback): void {
    // Track performance of knowledge categories
    for (const category of feedback.categories) {
      const currentPerf = this.knowledgePerformance.get(category) || 0.5;
      const feedbackValue = feedback.rating === 'positive' ? 1 : feedback.rating === 'negative' ? 0 : 0.5;
      const newPerf = (currentPerf + feedbackValue) / 2;
      this.knowledgePerformance.set(category, newPerf);
    }
  }

  private extractInteractionPattern(userMessage: string): string {
    // Extract a general pattern from the specific message
    const keywords = this.extractKeywords(userMessage);
    const intent = this.classifyIntent(userMessage);
    return `${intent}_${keywords.slice(0, 2).join('_')}`;
  }

  private extractKeywords(message: string): string[] {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return message.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10);
  }

  private classifyIntent(message: string): string {
    const msg = message.toLowerCase();
    if (/\b(what|how|when|where|why|who)\b/.test(msg)) return 'question';
    if (/\b(help|assist|support)\b/.test(msg)) return 'help_request';
    if (/\b(problem|issue|error)\b/.test(msg)) return 'problem_report';
    if (/\b(explain|describe|tell)\b/.test(msg)) return 'explanation_request';
    return 'general_query';
  }

  private analyzeSuccessPatterns(): LearningInsight[] {
    const insights: LearningInsight[] = [];
    const successfulPatterns = Array.from(this.interactionPatterns.values())
      .filter(p => p.successRate > 0.8 && p.frequency > 5);

    for (const pattern of successfulPatterns.slice(0, 5)) {
      insights.push({
        type: 'success_pattern',
        description: `High success rate for "${pattern.pattern}" type queries`,
        confidence: Math.min(pattern.frequency / 10, 1),
        frequency: pattern.frequency,
        recommendation: `Continue using successful approaches for ${pattern.pattern} queries`,
        impact: 'medium',
        evidence: [`Success rate: ${(pattern.successRate * 100).toFixed(1)}%`, `Frequency: ${pattern.frequency} interactions`]
      });
    }

    return insights;
  }

  private analyzeFailurePatterns(): LearningInsight[] {
    const insights: LearningInsight[] = [];
    const failurePatterns = Array.from(this.interactionPatterns.values())
      .filter(p => p.successRate < 0.5 && p.frequency > 3);

    for (const pattern of failurePatterns.slice(0, 5)) {
      insights.push({
        type: 'failure_pattern',
        description: `Low success rate for "${pattern.pattern}" type queries`,
        confidence: Math.min(pattern.frequency / 10, 1),
        frequency: pattern.frequency,
        recommendation: `Improve knowledge base coverage for ${pattern.pattern} topics`,
        impact: 'high',
        evidence: [`Success rate: ${(pattern.successRate * 100).toFixed(1)}%`, `Common improvements needed: ${pattern.improvementAreas.join(', ')}`]
      });
    }

    return insights;
  }

  private identifyKnowledgeGaps(): LearningInsight[] {
    const insights: LearningInsight[] = [];
    const lowPerformanceCategories = Array.from(this.knowledgePerformance.entries())
      .filter(([, performance]) => performance < 0.6);

    for (const [category, performance] of lowPerformanceCategories) {
      insights.push({
        type: 'knowledge_gap',
        description: `Low performance in ${category} category`,
        confidence: 0.8,
        frequency: 0,
        recommendation: `Expand knowledge base content for ${category}`,
        impact: 'high',
        evidence: [`Performance score: ${(performance * 100).toFixed(1)}%`]
      });
    }

    return insights;
  }

  private findImprovementOpportunities(): LearningInsight[] {
    const insights: LearningInsight[] = [];
    const metrics = this.getPerformanceMetrics();

    if (metrics.knowledgeGapRate > 0.3) {
      insights.push({
        type: 'improvement_opportunity',
        description: 'High rate of knowledge gaps in user queries',
        confidence: 0.9,
        frequency: Math.round(metrics.totalInteractions * metrics.knowledgeGapRate),
        recommendation: 'Focus on expanding knowledge base in commonly requested areas',
        impact: 'high',
        evidence: [`Knowledge gap rate: ${metrics.knowledgeGapRate.toFixed(1)}%`]
      });
    }

    if (metrics.avgResponseQuality < 70) {
      insights.push({
        type: 'improvement_opportunity',
        description: 'Below-average response quality scores',
        confidence: 0.8,
        frequency: metrics.totalInteractions,
        recommendation: 'Improve response clarity and provide more specific information',
        impact: 'medium',
        evidence: [`Average quality: ${metrics.avgResponseQuality.toFixed(1)}%`]
      });
    }

    return insights;
  }

  private calculateKnowledgeGapRate(): number {
    const feedbacks = Array.from(this.feedbackHistory.values());
    const gapFeedbacks = feedbacks.filter(f => 
      f.specificFeedback?.toLowerCase().includes('knowledge') || 
      f.specificFeedback?.toLowerCase().includes('information') ||
      f.rating === 'negative'
    );
    
    return feedbacks.length > 0 ? gapFeedbacks.length / feedbacks.length : 0;
  }

  private getCommonFailurePoints(): string[] {
    const failureReasons: string[] = [];
    const negativeFeeback = Array.from(this.feedbackHistory.values())
      .filter(f => f.rating === 'negative' && f.specificFeedback);

    for (const feedback of negativeFeeback) {
      if (feedback.specificFeedback) {
        failureReasons.push(feedback.specificFeedback);
      }
    }

    // Count frequency and return most common
    const reasonCounts: Record<string, number> = {};
    for (const reason of failureReasons) {
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    }

    return Object.entries(reasonCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([reason]) => reason);
  }

  private calculateImprovementTrends(): { date: string; score: number }[] {
    const trends: { date: string; score: number }[] = [];
    const feedbacks = Array.from(this.feedbackHistory.values())
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // Group by week
    const weeklyScores: Record<string, number[]> = {};
    for (const feedback of feedbacks) {
      const week = this.getWeekKey(feedback.timestamp);
      if (!weeklyScores[week]) weeklyScores[week] = [];
      
      const score = feedback.rating === 'positive' ? 1 : feedback.rating === 'negative' ? 0 : 0.5;
      weeklyScores[week].push(score);
    }

    // Calculate average scores
    for (const [week, scores] of Object.entries(weeklyScores)) {
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      trends.push({ date: week, score: avgScore * 100 });
    }

    return trends.slice(-12); // Last 12 weeks
  }

  private getWeekKey(date: Date): string {
    const year = date.getFullYear();
    const week = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-W${week}`;
  }

  private findSimilarPatterns(userMessage: string): InteractionPattern[] {
    const keywords = this.extractKeywords(userMessage);
    const patterns = Array.from(this.interactionPatterns.values());
    
    return patterns.filter(pattern => 
      this.hasKeywordOverlap(keywords, pattern.commonKeywords)
    ).sort((a, b) => b.successRate - a.successRate);
  }

  private hasKeywordOverlap(keywords1: string[], keywords2: string[]): boolean {
    const set1 = new Set(keywords1.map(k => k.toLowerCase()));
    const set2 = new Set(keywords2.map(k => k.toLowerCase()));
    
    for (const keyword of set1) {
      if (set2.has(keyword)) return true;
    }
    return false;
  }

  private startPeriodicAnalysis(): void {
    // Run analysis every hour
    setInterval(() => {
      this.generateLearningInsights();
    }, 60 * 60 * 1000);
  }

  private loadPersistedData(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const feedbackData = localStorage.getItem('ardi_feedback_history');
        if (feedbackData) {
          const feedback = JSON.parse(feedbackData);
          this.feedbackHistory = new Map(Object.entries(feedback));
        }

        const patternsData = localStorage.getItem('ardi_interaction_patterns');
        if (patternsData) {
          const patterns = JSON.parse(patternsData);
          this.interactionPatterns = new Map(Object.entries(patterns));
        }

        const performanceData = localStorage.getItem('ardi_knowledge_performance');
        if (performanceData) {
          const performance = JSON.parse(performanceData);
          this.knowledgePerformance = new Map(Object.entries(performance));
        }
      }
    } catch (error) {
      console.warn('Failed to load learning system data:', error);
    }
  }

  private persistData(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const feedbackObj = Object.fromEntries(this.feedbackHistory.entries());
        localStorage.setItem('ardi_feedback_history', JSON.stringify(feedbackObj));

        const patternsObj = Object.fromEntries(this.interactionPatterns.entries());
        localStorage.setItem('ardi_interaction_patterns', JSON.stringify(patternsObj));

        const performanceObj = Object.fromEntries(this.knowledgePerformance.entries());
        localStorage.setItem('ardi_knowledge_performance', JSON.stringify(performanceObj));
      }
    } catch (error) {
      console.warn('Failed to persist learning system data:', error);
    }
  }

  /**
   * Public methods for external integration
   */
  public createFeedback(
    processId: string,
    userMessage: string,
    response: string,
    rating: 'positive' | 'negative' | 'neutral',
    specificFeedback?: string,
    categories: string[] = ['general']
  ): UserFeedback {
    const feedback: UserFeedback = {
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      processId,
      userMessage,
      response,
      rating,
      specificFeedback,
      categories,
      timestamp: new Date()
    };

    this.recordFeedback(feedback);
    return feedback;
  }

  public getInteractionPatterns(): InteractionPattern[] {
    return Array.from(this.interactionPatterns.values());
  }

  public getLearningInsights(): LearningInsight[] {
    return [...this.learningInsights];
  }
}

// Singleton instance
export const learningSystem = new LearningSystem();
