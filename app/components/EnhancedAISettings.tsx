"use client";

import { useState, useEffect } from 'react';
import { enhancedConfig, EnhancedAIConfig } from '../../lib/enhancedConfig';

interface EnhancedAISettingsProps {
  onConfigChange?: (config: EnhancedAIConfig) => void;
}

export default function EnhancedAISettings({ onConfigChange }: EnhancedAISettingsProps) {
  const [config, setConfig] = useState<EnhancedAIConfig>(enhancedConfig.getConfig());
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'performance' | 'learning' | 'debug'>('features');
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [learningInsights, setLearningInsights] = useState<any[]>([]);

  useEffect(() => {
    // Listen for config changes
    const unsubscribe = enhancedConfig.onConfigChange((newConfig) => {
      setConfig(newConfig);
      onConfigChange?.(newConfig);
    });

    // Load performance data
    loadPerformanceData();

    return unsubscribe;
  }, [onConfigChange]);

  const loadPerformanceData = async () => {
    try {
      // Placeholder for performance metrics - can be implemented later
      const metrics = { 
        responseTime: 150, 
        accuracy: 95,
        userSatisfaction: 4.2,
        totalQueries: 1250
      };
      const insights = [
        { type: 'improvement', message: 'Response accuracy has improved by 5% this week' },
        { type: 'trend', message: 'Legal queries increased by 15%' }
      ];
      setPerformanceMetrics(metrics);
      setLearningInsights(insights);
    } catch (error) {
      console.error('Failed to load performance data:', error);
    }
  };

  const handleToggleEnhanced = () => {
    if (config.enabled) {
      enhancedConfig.disableEnhanced();
    } else {
      enhancedConfig.enableEnhanced();
    }
  };

  const handleFeatureToggle = (feature: keyof EnhancedAIConfig['features']) => {
    enhancedConfig.updateFeature(feature, !config.features[feature]);
  };

  const handleThresholdChange = (threshold: keyof EnhancedAIConfig['thresholds'], value: number) => {
    const newThresholds = { ...config.thresholds, [threshold]: value };
    enhancedConfig.updateConfig({ thresholds: newThresholds });
  };

  const handleExportConfig = () => {
    const configJson = enhancedConfig.exportConfig();
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ardi-enhanced-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (enhancedConfig.importConfig(content)) {
          alert('Configuration imported successfully!');
        } else {
          alert('Failed to import configuration. Please check the file format.');
        }
      } catch (error) {
        alert('Failed to read configuration file.');
      }
    };
    reader.readAsText(file);
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      enhancedConfig.resetToDefaults();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Enhanced AI Settings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configure advanced AI features and learning capabilities
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={handleToggleEnhanced}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enhanced Mode
            </span>
          </label>
        </div>
      </div>

      {config.enabled && (
        <>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'features', label: 'Features' },
                { id: 'performance', label: 'Performance' },
                { id: 'learning', label: 'Learning' },
                { id: 'debug', label: 'Debug' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Core Features</h3>
                  
                  {Object.entries(config.features).map(([feature, enabled]) => (
                    <label key={feature} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getFeatureDescription(feature as keyof EnhancedAIConfig['features'])}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => handleFeatureToggle(feature as keyof EnhancedAIConfig['features'])}
                        className="ml-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Thresholds</h3>
                  
                  {Object.entries(config.thresholds).map(([threshold, value]) => (
                    <div key={threshold} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <label className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-2">
                        {threshold.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={value}
                        onChange={(e) => handleThresholdChange(threshold as keyof EnhancedAIConfig['thresholds'], parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                      />
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>0</span>
                        <span className="font-medium">{value}</span>
                        <span>1</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              {performanceMetrics && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-400">Positive Ratings</h4>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                      {performanceMetrics.positiveRating.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400">Total Interactions</h4>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                      {performanceMetrics.totalInteractions}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800 dark:text-purple-400">Response Quality</h4>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                      {performanceMetrics.avgResponseQuality.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Knowledge Gaps</h4>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                      {(performanceMetrics.knowledgeGapRate * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Common Issues</h3>
                {performanceMetrics?.commonFailurePoints.length > 0 ? (
                  <ul className="space-y-2">
                    {performanceMetrics.commonFailurePoints.map((issue: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No common issues detected</p>
                )}
              </div>
            </div>
          )}

          {/* Learning Tab */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Learning Insights</h3>
                <button
                  onClick={loadPerformanceData}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>

              <div className="space-y-4">
                {learningInsights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        insight.type === 'success_pattern' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        insight.type === 'failure_pattern' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        insight.type === 'knowledge_gap' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {insight.type.replace('_', ' ')}
                      </span>
                      <span className={`text-xs font-medium ${
                        insight.impact === 'high' ? 'text-red-600 dark:text-red-400' :
                        insight.impact === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {insight.impact} impact
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{insight.description}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{insight.recommendation}</p>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      Confidence: {(insight.confidence * 100).toFixed(0)}%
                      {insight.frequency > 0 && ` • Frequency: ${insight.frequency}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Debug Tab */}
          {activeTab === 'debug' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Debug & Configuration</h3>
                <div className="space-x-2">
                  <button
                    onClick={handleExportConfig}
                    className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Export Config
                  </button>
                  <label className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer">
                    Import Config
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportConfig}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={resetToDefaults}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">System Status</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Enhanced Mode:</span>
                      <span className={config.enabled ? 'text-green-600' : 'text-red-600'}>
                        {config.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Debug Mode:</span>
                      <span className={config.experimental.debugMode ? 'text-yellow-600' : 'text-gray-600'}>
                        {config.experimental.debugMode ? 'On' : 'Off'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beta Features:</span>
                      <span className={config.experimental.enableBetaFeatures ? 'text-blue-600' : 'text-gray-600'}>
                        {config.experimental.enableBetaFeatures ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Experimental Features</h4>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.experimental.debugMode}
                      onChange={(e) => enhancedConfig.updateConfig({
                        experimental: { ...config.experimental, debugMode: e.target.checked }
                      })}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Debug Mode</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.experimental.enableBetaFeatures}
                      onChange={(e) => enhancedConfig.updateConfig({
                        experimental: { ...config.experimental, enableBetaFeatures: e.target.checked }
                      })}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Beta Features</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!config.enabled && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Enhanced AI features are currently disabled. Enable them to access advanced capabilities.
          </p>
          <button
            onClick={handleToggleEnhanced}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enable Enhanced Mode
          </button>
        </div>
      )}
    </div>
  );
}

function getFeatureDescription(feature: keyof EnhancedAIConfig['features']): string {
  const descriptions = {
    thinkingEngine: 'Advanced query analysis and information synthesis',
    webSearch: 'Real-time web search for current information',
    knowledgeGeneration: 'Dynamic creation of new knowledge entries',
    learningSystem: 'Track interactions and improve responses (coming soon)',
    adaptiveResponses: 'Personalized responses based on user patterns'
  };
  return descriptions[feature] || 'Feature description not available';
}
