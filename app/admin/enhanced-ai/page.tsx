import EnhancedAISettings from '../../components/EnhancedAISettings';

export default function EnhancedAIPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Enhanced AI Configuration
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Configure and monitor advanced AI features, learning capabilities, and performance metrics.
            </p>
          </div>

          <EnhancedAISettings />

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enhanced AI Features Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2">
                  🧠 Thinking Engine
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Advanced query analysis that understands user intent, identifies information needs, 
                  and synthesizes responses from multiple knowledge sources.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-900 dark:text-green-400 mb-2">
                  🌐 Web Search Integration
                </h3>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Real-time information gathering from web sources to supplement knowledge base 
                  with current data and recent developments.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium text-purple-900 dark:text-purple-400 mb-2">
                  📚 Knowledge Generation
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  Dynamic creation of new knowledge entries based on information synthesis, 
                  user interactions, and identified knowledge gaps.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-medium text-yellow-900 dark:text-yellow-400 mb-2">
                  📊 Learning System
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Continuous learning from user interactions, feedback tracking, and pattern 
                  recognition to improve response quality over time.
                </p>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h3 className="font-medium text-indigo-900 dark:text-indigo-400 mb-2">
                  🎯 Adaptive Responses
                </h3>
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  Personalized response generation based on user patterns, successful 
                  interaction history, and contextual understanding.
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-medium text-red-900 dark:text-red-400 mb-2">
                  🔧 Quality Monitoring
                </h3>
                <p className="text-sm text-red-800 dark:text-red-300">
                  Real-time monitoring of response quality, user satisfaction metrics, 
                  and system performance with detailed analytics.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Important Notes
            </h2>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">⚠️ Compatibility</h4>
                <p>
                  Enhanced AI features are designed to work seamlessly with the existing chat system. 
                  All original functionality is preserved when enhanced mode is disabled.
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">🔒 Data Privacy</h4>
                <p>
                  Learning data and user interactions are stored locally in the browser. 
                  No sensitive information is transmitted to external services without explicit configuration.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">🚀 Performance</h4>
                <p>
                  Enhanced features may increase response time slightly due to additional processing. 
                  Confidence thresholds can be adjusted to balance between quality and speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
