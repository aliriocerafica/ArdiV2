// Configuration for Enhanced AI Features
export interface EnhancedAIConfig {
  enabled: boolean;
  features: {
    thinkingEngine: boolean;
    webSearch: boolean;
    knowledgeGeneration: boolean;
    learningSystem: boolean;
    adaptiveResponses: boolean;
  };
  thresholds: {
    confidenceThreshold: number;
    knowledgeGenerationThreshold: number;
    webSearchTrigger: number;
  };
  limits: {
    maxWebSearchResults: number;
    maxThinkingTime: number;
    maxGeneratedKnowledge: number;
  };
  experimental: {
    enableBetaFeatures: boolean;
    debugMode: boolean;
  };
}

const DEFAULT_CONFIG: EnhancedAIConfig = {
  enabled: false, // Disabled by default to preserve existing functionality
  features: {
    thinkingEngine: true,
    webSearch: false, // Disabled by default since it's mock
    knowledgeGeneration: true,
    learningSystem: true,
    adaptiveResponses: true
  },
  thresholds: {
    confidenceThreshold: 0.7,
    knowledgeGenerationThreshold: 0.6,
    webSearchTrigger: 0.4
  },
  limits: {
    maxWebSearchResults: 10,
    maxThinkingTime: 5000, // 5 seconds
    maxGeneratedKnowledge: 1000
  },
  experimental: {
    enableBetaFeatures: false,
    debugMode: false
  }
};

class EnhancedConfigManager {
  private config: EnhancedAIConfig;
  private listeners: Array<(config: EnhancedAIConfig) => void> = [];

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnhancedAIConfig {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('ardi_enhanced_config');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_CONFIG, ...parsed };
        }
      }
    } catch (error) {
      console.warn('Failed to load enhanced config:', error);
    }
    return { ...DEFAULT_CONFIG };
  }

  private saveConfig(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ardi_enhanced_config', JSON.stringify(this.config));
        this.notifyListeners();
      }
    } catch (error) {
      console.warn('Failed to save enhanced config:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.config));
  }

  public getConfig(): EnhancedAIConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<EnhancedAIConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  public updateFeature(feature: keyof EnhancedAIConfig['features'], enabled: boolean): void {
    this.config.features[feature] = enabled;
    this.saveConfig();
  }

  public enableEnhanced(): void {
    this.config.enabled = true;
    this.saveConfig();
  }

  public disableEnhanced(): void {
    this.config.enabled = false;
    this.saveConfig();
  }

  public isEnabled(): boolean {
    return this.config.enabled;
  }

  public isFeatureEnabled(feature: keyof EnhancedAIConfig['features']): boolean {
    return this.config.enabled && this.config.features[feature];
  }

  public getThreshold(threshold: keyof EnhancedAIConfig['thresholds']): number {
    return this.config.thresholds[threshold];
  }

  public getLimit(limit: keyof EnhancedAIConfig['limits']): number {
    return this.config.limits[limit];
  }

  public isDebugMode(): boolean {
    return this.config.experimental.debugMode;
  }

  public areBetaFeaturesEnabled(): boolean {
    return this.config.experimental.enableBetaFeatures;
  }

  public onConfigChange(listener: (config: EnhancedAIConfig) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public resetToDefaults(): void {
    this.config = { ...DEFAULT_CONFIG };
    this.saveConfig();
  }

  public exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  public importConfig(configJson: string): boolean {
    try {
      const parsed = JSON.parse(configJson);
      // Validate structure
      if (parsed && typeof parsed === 'object' && 'enabled' in parsed) {
        this.config = { ...DEFAULT_CONFIG, ...parsed };
        this.saveConfig();
        return true;
      }
    } catch (error) {
      console.error('Failed to import config:', error);
    }
    return false;
  }
}

// Singleton instance
export const enhancedConfig = new EnhancedConfigManager();

// Utility functions for common config checks
export const isEnhancedModeEnabled = () => enhancedConfig.isEnabled();
export const shouldUseThinkingEngine = () => enhancedConfig.isFeatureEnabled('thinkingEngine');
export const shouldUseWebSearch = () => enhancedConfig.isFeatureEnabled('webSearch');
export const shouldGenerateKnowledge = () => enhancedConfig.isFeatureEnabled('knowledgeGeneration');
export const shouldUseLearningSystem = () => enhancedConfig.isFeatureEnabled('learningSystem');
export const shouldUseAdaptiveResponses = () => enhancedConfig.isFeatureEnabled('adaptiveResponses');
