"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewChat?: () => void;
  onChatSelect?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  currentChatId?: string;
  chats?: Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    isActive: boolean;
  }>;
}

export default function ArdiSidebar({ 
  isOpen, 
  onClose, 
  isCollapsed, 
  onToggleCollapse,
  onNewChat,
  onChatSelect,
  onDeleteChat,
  currentChatId,
  chats
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeChat, setActiveChat] = useState<string>('1');
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    isActive: boolean;
  }>>([]);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

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

  // Update local chatHistory when chats prop changes
  useEffect(() => {
    if (chats) {
      setChatHistory(chats);
    }
  }, [chats]);

  // Close delete dialog when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && chatToDelete !== null) {
        setChatToDelete(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (chatToDelete !== null && !(event.target as Element).closest('.delete-dialog')) {
        setChatToDelete(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatToDelete]);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const deleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent chat selection when clicking delete
    setChatToDelete(chatId);
  };

  const confirmDeleteChat = () => {
    if (chatToDelete === null) return;
    
    // Call the parent's delete function if provided
    if (onDeleteChat) {
      onDeleteChat(chatToDelete);
    }
    
    // If the deleted chat was active, set the first remaining chat as active
    if (activeChat === chatToDelete) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatToDelete);
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id);
      }
    }
    
    setChatToDelete(null);
  };

  const cancelDeleteChat = () => {
    setChatToDelete(null);
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
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/5 backdrop-blur-xs z-40 lg:hidden transition-all duration-300" 
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 border-r border-gray-200 dark:border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isCollapsed ? 'w-14 sm:w-16 bg-white' : 'w-64 sm:w-80 bg-white dark:bg-gray-900'} lg:translate-x-0 lg:static flex flex-col`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
        {/* Header */}
        <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            {isCollapsed ? (
              // Collapsed header - only logo and collapse toggle
              <div className="flex flex-col items-center space-y-2 w-full">
                <div className="relative">
                  <Image
                    src="/img/LogoArdi.svg"
                    alt="Ardi Logo"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">MENU</div>
                <div className="flex flex-col items-center space-y-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 active:scale-95 touch-manipulation shadow-sm hover:shadow-md" 
                    aria-label="Toggle theme"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Collapse button clicked (collapsed header), current state:', isCollapsed, 'Button pressed!');
                      onToggleCollapse();
                    }}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 active:scale-95 touch-manipulation shadow-sm hover:shadow-md" 
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <svg className="w-3 h-3 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // Expanded header
              <>
                <div className="flex items-center space-x-2">
                                  <div className="relative">
                  <Image
                    src="/img/LogoArdi.svg"
                    alt="Ardi Logo"
                    width={28}
                    height={28}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full border border-white"></div>
                </div>
                  <h1 className="text-base sm:text-lg font-normal text-gray-900 dark:text-gray-100">
                    Ardi
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 active:scale-95 touch-manipulation shadow-sm hover:shadow-md" 
                    aria-label="Toggle theme"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Collapse button clicked (expanded header), current state:', isCollapsed, 'Button pressed!');
                      onToggleCollapse();
                    }}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 active:scale-95 touch-manipulation shadow-sm hover:shadow-md" 
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <svg className="w-3 h-3 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleClose} 
                    className="lg:hidden p-2 rounded-lg bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 active:bg-gray-600 dark:active:bg-gray-500 border border-gray-700 dark:border-gray-600 transition-all duration-200 active:scale-95 touch-manipulation shadow-sm hover:shadow-md" 
                    aria-label="Close sidebar"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* New Chat Button */}
        <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'} flex-shrink-0`}>
          {isCollapsed ? (
            <button 
              onClick={() => {
                if (onNewChat) {
                  onNewChat();
                }
                handleClose();
              }}
              className="w-full p-2.5 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-700 transition-all duration-200 active:scale-[0.98] touch-manipulation shadow-sm hover:shadow-md flex items-center justify-center"
              title="New Chat"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={() => {
                if (onNewChat) {
                  onNewChat();
                }
                handleClose();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 active:scale-[0.98] touch-manipulation shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">New Chat</span>
            </button>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'} flex-shrink-0`}>
          {isCollapsed ? (
            // Collapsed view - only icons
            <div className="space-y-1">
              <button 
                onClick={() => {
                  // Handle starred chats
                  handleClose();
                }}
                className="w-full p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-all duration-200 active:scale-[0.98] touch-manipulation flex items-center justify-center"
                title="Starred Chats"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
              
              <button 
                onClick={() => {
                  // Handle search chats
                  handleClose();
                }}
                className="w-full p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-all duration-200 active:scale-[0.98] touch-manipulation flex items-center justify-center"
                title="Search Chats"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          ) : (
            // Expanded view - Buttons with labels
            <div className="space-y-1">
              <button 
                onClick={() => {
                  // Handle starred chats
                  handleClose();
                }}
                className="w-full flex items-center space-x-2.5 py-2 px-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-lg transition-all duration-200 active:scale-[0.98] touch-manipulation"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Starred Chats</span>
              </button>
              
              <button 
                onClick={() => {
                  // Handle search chats
                  handleClose();
                }}
                className="w-full flex items-center space-x-2.5 py-2 px-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-lg transition-all duration-200 active:scale-[0.98] touch-manipulation"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Search Chats</span>
              </button>
            </div>
          )}
        </div>

        {/* Chat History - Takes remaining space */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-3 sm:px-4'}`}>
          <div className={`${isCollapsed ? 'space-y-1' : 'space-y-1'} pb-3`}>
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Recent Chats
                </h2>
                <span className="text-xs text-gray-400 dark:text-gray-500">{chatHistory.length}</span>
              </div>
            )}
            
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
                                  className={`group relative ${isCollapsed ? 'p-2' : 'px-2.5 py-2'} rounded-lg cursor-pointer transition-all duration-200 active:scale-[0.98] touch-manipulation mb-1 ${
                    (currentChatId || activeChat) === chat.id
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 shadow-sm'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 border border-transparent'
                  }`}
                title={isCollapsed ? chat.title : undefined}
              >
                <div
                  onClick={() => {
                    if (onChatSelect) {
                      onChatSelect(chat.id);
                    }
                    setActiveChat(chat.id);
                    handleClose();
                  }}
                  className="w-full"
                >
                  {isCollapsed ? (
                    // Collapsed view - only dot indicator
                    <div className="flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        (currentChatId || activeChat) === chat.id 
                          ? 'bg-red-500 scale-125' 
                          : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400'
                      }`}></div>
                    </div>
                  ) : (
                    // Expanded view - full content
                    <>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-medium text-sm leading-4 pr-8 ${
                          (currentChatId || activeChat) === chat.id ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {chat.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {/* Removed red dot indicator for active chat */}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mb-1.5 overflow-hidden pr-6" style={{ lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: () => null,
                            h2: () => null,
                            h3: () => null,
                            h4: () => null,
                            h5: () => null,
                            h6: () => null,
                            p: ({children}) => <span className="text-xs text-gray-500 dark:text-gray-400">{children}</span>,
                            strong: ({children}) => <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{children}</span>,
                            em: ({children}) => <span className="text-xs text-gray-500 dark:text-gray-400 italic">{children}</span>,
                            ul: () => null,
                            ol: () => null,
                            li: () => null,
                            blockquote: () => null,
                            code: ({children}) => <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{children}</span>,
                            hr: () => null,
                            a: ({children}) => <span className="text-xs text-gray-500 dark:text-gray-400">{children}</span>,
                            table: () => null,
                            thead: () => null,
                            tbody: () => null,
                            tr: () => null,
                            th: () => null,
                            td: () => null,
                          }}
                        >
                          {chat.preview}
                        </ReactMarkdown>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                          {chat.timestamp}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Delete Button - Only show in expanded view */}
                {!isCollapsed && (hoveredChatId === chat.id || chatHistory.length > 1) && (
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="absolute top-2 right-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 active:scale-95 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm"
                    title="Delete chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Profile Section */}
        <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'} relative profile-dropdown-container flex-shrink-0 border-t border-gray-200 dark:border-gray-700`}>
          {isCollapsed ? (
            // Collapsed profile section
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-full flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-all duration-200 active:scale-[0.98] touch-manipulation"
              title="Profile Menu"
            >
              <div className="w-6 h-6 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
                <span className="text-white text-xs font-medium">JD</span>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
              </div>
            </button>
          ) : (
            // Expanded profile section
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-full flex items-center space-x-2.5 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-all duration-200 active:scale-[0.98] touch-manipulation"
            >
              <div className="w-6 h-6 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
                <span className="text-white text-xs font-medium">JD</span>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-gray-900 dark:text-gray-100 font-medium text-sm">John Doe</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-normal truncate">john@company.com</p>
              </div>
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          
          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className={`absolute ${isCollapsed ? 'bottom-full left-0 right-0 mb-2' : 'bottom-full left-0 right-0 mb-2'} bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 ${isCollapsed ? 'min-w-[200px] -left-[92px]' : 'min-w-[200px]'}`}>
              <Link href="/profile" passHref>
                <button 
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    if (typeof onClose === 'function') {
                      onClose();
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </button>
              </Link>
              <Link href="/settings" passHref>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </button>
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile indicator */}
        {!isCollapsed && (
          <div className="lg:hidden flex justify-center pt-1">
            <div className="w-6 h-0.5 bg-gray-300 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {chatToDelete !== null && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="delete-dialog bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Delete Chat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={cancelDeleteChat}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteChat}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
