"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 relative">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-6 z-30 group p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex-1 pt-6 lg:pt-8 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  System Logs
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-medium">
                  Monitor system activity and events
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Log Filters */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Log Filters</h3>
                
                <div className="flex flex-wrap items-center space-x-4">
                  <select className="px-4 py-2 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm">
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">All Levels</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Error</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Warning</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Info</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Debug</option>
                  </select>
                  
                  <select className="px-4 py-2 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm">
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Last 24 Hours</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Last 7 Days</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Last 30 Days</option>
                    <option className="py-2 px-3 hover:bg-blue-500 hover:text-white">Custom Range</option>
                  </select>
                  
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Log Entries */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recent Log Entries</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-red-900 dark:text-red-100">Database Connection Error</h4>
                      <span className="text-xs text-red-600 dark:text-red-400">2 minutes ago</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">Failed to establish database connection. Retrying in 30 seconds.</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-red-600 dark:text-red-400">
                      <span>Level: ERROR</span>
                      <span>Source: Database</span>
                      <span>ID: #12345</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100">High Memory Usage</h4>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">15 minutes ago</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Memory usage exceeded 80%. Consider optimizing application performance.</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                      <span>Level: WARNING</span>
                      <span>Source: System</span>
                      <span>ID: #12344</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">User Login</h4>
                      <span className="text-xs text-blue-600 dark:text-blue-400">1 hour ago</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">User admin@ardi.com successfully logged in from IP 192.168.1.100</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600 dark:text-blue-400">
                      <span>Level: INFO</span>
                      <span>Source: Auth</span>
                      <span>ID: #12343</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-green-900 dark:text-green-100">Backup Completed</h4>
                      <span className="text-xs text-green-600 dark:text-green-400">3 hours ago</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">System backup completed successfully. 2.3GB of data backed up.</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-green-600 dark:text-green-400">
                      <span>Level: INFO</span>
                      <span>Source: Backup</span>
                      <span>ID: #12342</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Cache Refresh</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">6 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Application cache refreshed. 1,247 items updated.</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>Level: DEBUG</span>
                      <span>Source: Cache</span>
                      <span>ID: #12341</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="lg:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60 px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Logs</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 