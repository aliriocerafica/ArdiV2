"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function AdminSidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const adminMenuItems = useMemo(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      href: '/admin',
      badge: '12'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      href: '/admin/users',
      badge: '1.2k'
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: '/admin/analytics',
      trending: true
    },
    {
      id: 'content',
      label: 'Content Manager',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      href: '/admin/content'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/admin/settings'
    },
    {
      id: 'logs',
      label: 'System Logs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/admin/logs'
    }
  ], []);

  // Set active section based on current pathname
  useEffect(() => {
    const currentPath = pathname;
    const matchingItem = adminMenuItems.find(item => item.href === currentPath);
    if (matchingItem) {
      setActiveSection(matchingItem.id);
    }
  }, [pathname, adminMenuItems]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof onClose === 'function' && window.innerWidth < 1024 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileDropdownOpen && !(event.target as Element).closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    
    if (isLeftSwipe && isOpen) {
      handleClose();
    }
  };

  return (
    <>
      {/* Enhanced Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/5 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ease-out" 
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isCollapsed ? 'w-16 lg:w-20' : 'w-72 sm:w-80 lg:w-72'
      } lg:translate-x-0 lg:static flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200/60 dark:border-slate-700/60 shadow-2xl lg:shadow-xl backdrop-blur-xl`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
        
        {/* Enhanced Header */}
        <div className={`${isCollapsed ? 'p-3 lg:p-4' : 'p-4 lg:p-6'} flex-shrink-0 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            {isCollapsed ? (
              // Enhanced Collapsed header
              <div className="flex flex-col items-center space-y-3 w-full">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl shadow-lg">
                    <Image
                      src="/img/LogoArdi.svg"
                      alt="Ardi Logo"
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6 filter brightness-0 invert"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">ADMIN</div>
                <div className="flex flex-col items-center space-y-2">
                  <button 
                    onClick={toggleTheme}
                    className="group p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600/50 dark:border-slate-500/50" 
                    aria-label="Toggle theme"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Collapse button clicked (collapsed header), current state:', isCollapsed, 'Button pressed!');
                      onToggleCollapse();
                    }}
                    className="group p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600/50 dark:border-slate-500/50" 
                    aria-label="Expand sidebar"
                  >
                    <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // Enhanced Expanded header
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2.5 rounded-xl shadow-lg">
                      <Image
                        src="/img/LogoArdi.svg"
                        alt="Ardi Logo"
                        width={28}
                        height={28}
                        className="w-6 h-6 sm:w-7 sm:h-7 filter brightness-0 invert"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      Admin Panel
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Control Center</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleTheme}
                    className="group p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600/50 dark:border-slate-500/50" 
                    aria-label="Toggle theme"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => {
                      console.log('Collapse button clicked (expanded header), current state:', isCollapsed, 'Button pressed!');
                      onToggleCollapse();
                    }}
                    className="group p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600/50 dark:border-slate-500/50" 
                    aria-label="Collapse sidebar"
                  >
                    <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleClose} 
                    className="lg:hidden group p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600/50 dark:border-slate-500/50" 
                    aria-label="Close sidebar"
                  >
                    <svg className="w-3.5 h-3.5 text-white group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Navigation Menu */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-3 lg:px-4' : 'px-4 lg:px-6'} py-4 lg:py-6 space-y-8`}>
          {/* Quick Stats (collapsed view) */}
          {isCollapsed && (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">42</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Active</div>
            </div>
          )}

          {/* Main Menu Section */}
          <div className="space-y-2">
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                  <span>Navigation</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600"></div>
                </h2>
              </div>
            )}
            
            {adminMenuItems.map((item) => (
              <div
                key={item.id}
                className={`group relative ${isCollapsed ? 'p-0' : 'p-0'} transition-all duration-200`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link 
                  href={item.href} 
                  className="block"
                  onClick={(e) => {
                    // Prevent any interference with navigation
                    e.stopPropagation();
                    setActiveSection(item.id);
                    // Close mobile sidebar if open
                    if (isOpen && window.innerWidth < 1024) {
                      handleClose();
                    }
                  }}
                >
                  <div
                    className={`relative overflow-hidden ${isCollapsed ? 'p-3 lg:p-3.5' : 'p-3.5 lg:p-4'} rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                      activeSection === item.id
                        ? 'bg-gradient-to-br from-red-50 to-orange-50/50 dark:from-red-900/30 dark:to-orange-900/20 border border-red-200/60 dark:border-red-700/40 shadow-lg shadow-red-100/50 dark:shadow-red-900/20'
                        : 'hover:bg-gradient-to-br hover:from-slate-100/70 hover:to-slate-50/70 dark:hover:from-slate-800/50 dark:hover:to-slate-700/30 hover:border hover:border-slate-200/60 dark:hover:border-slate-600/40 hover:shadow-lg active:bg-slate-200/50 dark:active:bg-slate-700/50'
                    }`}
                  >
                    {/* Animated background gradient */}
                    {activeSection === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {isCollapsed ? (
                      // Enhanced Collapsed view
                      <div className="flex flex-col items-center space-y-2 relative z-10">
                        <div className={`p-2 rounded-xl transition-all duration-200 ${
                          activeSection === item.id 
                            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg' 
                            : 'text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}>
                          {item.icon}
                        </div>
                        {item.badge && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white dark:border-slate-800">
                            {item.badge}
                          </div>
                        )}
                        {item.trending && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm animate-pulse"></div>
                        )}
                      </div>
                    ) : (
                      // Enhanced Expanded view
                      <div className="flex items-center space-x-4 relative z-10">
                        <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                          activeSection === item.id 
                            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg' 
                            : 'text-slate-600 dark:text-slate-400 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold text-sm transition-colors ${
                              activeSection === item.id 
                                ? 'text-red-700 dark:text-red-400' 
                                : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                            }`}>
                              {item.label}
                            </span>
                            <div className="flex items-center space-x-2">
                              {item.trending && (
                                <div className="flex items-center space-x-1">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Trend</span>
                                </div>
                              )}
                              {item.badge && (
                                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                  {item.badge}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover indicator */}
                    {hoveredItem === item.id && !isCollapsed && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-r-full transition-all duration-200"></div>
                    )}
                  </div>
                </Link>

                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item.id && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 z-50 bg-slate-900 dark:bg-slate-800 text-white px-3 py-2 rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 text-sm font-medium whitespace-nowrap opacity-0 animate-in fade-in duration-200">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 border-l border-b border-slate-700 dark:border-slate-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions (expanded view only) */}
          {!isCollapsed && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                <span>Quick Actions</span>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600"></div>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200/60 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-400 hover:shadow-lg transition-all duration-200 active:scale-95">
                  <div className="text-xs font-semibold">Add User</div>
                </button>
                <button className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/60 dark:border-blue-700/40 text-blue-700 dark:text-blue-400 hover:shadow-lg transition-all duration-200 active:scale-95">
                  <div className="text-xs font-semibold">Export</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer - Profile Section */}
        <div className={`${isCollapsed ? 'p-3 lg:p-4' : 'p-4 lg:p-6'} relative profile-dropdown-container flex-shrink-0 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm`}>
          {isCollapsed ? (
            // Enhanced Collapsed profile section
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-full flex items-center justify-center p-3 rounded-2xl hover:bg-gradient-to-br hover:from-slate-100/70 hover:to-slate-50/70 dark:hover:from-slate-800/50 dark:hover:to-slate-700/30 active:scale-95 transition-all duration-200 group"
              title="Admin Profile Menu"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <span className="text-white text-sm font-bold">A</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
              </div>
            </button>
          ) : (
            // Enhanced Expanded profile section
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-full flex items-center space-x-3 p-3.5 rounded-2xl hover:bg-gradient-to-br hover:from-slate-100/70 hover:to-slate-50/70 dark:hover:from-slate-800/50 dark:hover:to-slate-700/30 active:scale-[0.98] transition-all duration-200 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <span className="text-white text-lg font-bold">A</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-slate-900 dark:text-slate-100 font-bold text-sm">Admin User</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">admin@ardi.com</p>
                <div className="flex items-center space-x-1 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wide">Online</span>
                </div>
              </div>
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Enhanced Mobile indicator */}
        {!isCollapsed && (
          <div className="lg:hidden flex justify-center py-2 bg-gradient-to-r from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
            <div className="w-8 h-1 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 rounded-full opacity-60"></div>
          </div>
        )}
      </div>

      {/* Profile Dropdown Portal - Rendered outside sidebar to prevent overlapping */}
      {isProfileDropdownOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className={`absolute ${
            isCollapsed 
              ? 'bottom-4 left-24' 
              : 'bottom-4 left-4'
          } pointer-events-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-xl min-w-[280px] max-w-sm`}>
            
            {/* Dropdown Header */}
            <div className="p-4 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <div>
                  <div className="text-slate-900 dark:text-slate-100 font-bold text-sm">Admin User</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">admin@ardi.com</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Active now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Menu Items */}
            <div className="py-2">
              <Link href="/admin/profile" passHref>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(false);
                    if (typeof onClose === 'function') {
                      onClose();
                    }
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/30 flex items-center space-x-3 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Admin Profile</span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Manage your account</div>
                  </div>
                </button>
              </Link>

              <Link href="/admin/settings" passHref>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(false);
                    if (typeof onClose === 'function') {
                      onClose();
                    }
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/30 flex items-center space-x-3 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Admin Settings</span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">System preferences</div>
                  </div>
                </button>
              </Link>

              <button 
                onClick={toggleTheme}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/30 flex items-center space-x-3 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  {theme === 'light' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="font-medium">Appearance</span>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Switch to {theme === 'light' ? 'dark' : 'light'} mode</div>
                </div>
              </button>

              <div className="border-t border-slate-200/60 dark:border-slate-600/60 my-2"></div>

              <Link href="/" passHref>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(false);
                    if (typeof onClose === 'function') {
                      onClose();
                    }
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 dark:hover:from-blue-900/20 dark:hover:to-blue-800/10 flex items-center space-x-3 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700 dark:text-blue-400">Back to App</span>
                    <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Return to main site</div>
                  </div>
                </button>
              </Link>

              <div className="border-t border-slate-200/60 dark:border-slate-600/60 my-2"></div>

              <button className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 dark:hover:from-red-900/20 dark:hover:to-red-800/10 flex items-center space-x-3 transition-all duration-200 group">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Sign Out</span>
                  <div className="text-xs text-red-500/70 dark:text-red-400/70">End admin session</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}