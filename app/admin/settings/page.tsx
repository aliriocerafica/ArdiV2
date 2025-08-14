"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminSettingsPage() {
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
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  System Settings
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-medium">
                  Configure system preferences and security settings
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* General Settings */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">General Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Ardi Admin"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Default Language
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm">
                      <option value="en" className="py-2 px-3 hover:bg-blue-500 hover:text-white">English</option>
                      <option value="es" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Spanish</option>
                      <option value="fr" className="py-2 px-3 hover:bg-blue-500 hover:text-white">French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm">
                      <option value="UTC" className="py-2 px-3 hover:bg-blue-500 hover:text-white">UTC</option>
                      <option value="EST" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Eastern Time</option>
                      <option value="PST" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Require 2FA for all users</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Session Timeout</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Auto-logout after inactivity</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">IP Whitelist</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Restrict access by IP address</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Email Notifications</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Receive alerts via email</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">SMS Notifications</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Receive alerts via SMS</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Push Notifications</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Browser push notifications</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Backup Settings */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Backup & Recovery</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Backup Frequency
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm">
                      <option value="daily" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Daily</option>
                      <option value="weekly" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Weekly</option>
                      <option value="monthly" className="py-2 px-3 hover:bg-blue-500 hover:text-white">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Auto Backup</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Automatically backup data</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  
                  <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                    Create Manual Backup
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Save All Settings
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="lg:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60 px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Settings</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 