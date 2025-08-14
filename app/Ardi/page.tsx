"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function ArdiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chats, setChats] = useState<Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    isActive: boolean;
  }>>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    console.log('toggleSidebarCollapse called, current state:', sidebarCollapsed);
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Debug sidebar collapse state
  useEffect(() => {
    console.log('Sidebar collapsed state changed to:', sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Load chats from localStorage on component mount and when localStorage changes
  useEffect(() => {
    const loadChats = () => {
      const savedChats = localStorage.getItem('ardi-chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        // Convert ChatData format to sidebar format and sort by most recent first
        const sidebarChats = parsedChats
          .map((chat: any) => {
            let preview = 'New chat';
            if (chat.messages.length > 0) {
              const lastMessage = chat.messages[chat.messages.length - 1];
              // Clean up markdown for preview
              let cleanContent = lastMessage.content
                .replace(/\|/g, ' ') // Remove table pipes
                .replace(/\*\*/g, '') // Remove bold markers
                .replace(/#{1,6}\s+/g, '') // Remove headers
                .replace(/\n+/g, ' ') // Replace newlines with spaces
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim();
              
              // Take first 50 characters and add ellipsis if longer
              preview = cleanContent.length > 50 ? cleanContent.substring(0, 50) + '...' : cleanContent;
            }
            
            return {
              id: chat.id,
              title: chat.title,
              preview: preview,
              timestamp: new Date(chat.createdAt).toLocaleDateString(),
              isActive: chat.id === currentChatId
            };
          })
          .sort((a: any, b: any) => {
            // Sort by creation date, most recent first
            const dateA = new Date(parsedChats.find((c: any) => c.id === a.id)?.createdAt || 0);
            const dateB = new Date(parsedChats.find((c: any) => c.id === b.id)?.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        setChats(sidebarChats);
        
        if (parsedChats.length > 0 && !currentChatId) {
          // Set the most recent chat as current only if no current chat is selected
          setCurrentChatId(sidebarChats[0].id);
        }
      }
    };

    // Load chats immediately
    loadChats();

    // Listen for storage events to update when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ardi-chats') {
        loadChats();
      }
    };

    // Listen for custom events from Chat component
    const handleChatUpdate = () => {
      loadChats();
    };

    const handleNewChatCreated = (e: Event) => {
      const event = e as CustomEvent<any>;
      const newChatId = event?.detail?.chatId as string | undefined;
      if (newChatId) {
        setCurrentChatId(newChatId);
      }
      loadChats();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('chat-updated', handleChatUpdate);
    window.addEventListener('new-chat-created', handleNewChatCreated as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('chat-updated', handleChatUpdate);
      window.removeEventListener('new-chat-created', handleNewChatCreated as EventListener);
    };
  }, [currentChatId]); // Include currentChatId to fix ESLint warning

  const handleNewChat = () => {
    // Dispatch a custom event to trigger new chat creation
    window.dispatchEvent(new CustomEvent('new-chat-requested'));
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    // Remove the chat from localStorage
    const savedChats = localStorage.getItem('ardi-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      const updatedChats = parsedChats.filter((chat: any) => chat.id !== chatId);
      localStorage.setItem('ardi-chats', JSON.stringify(updatedChats));
      
      // Update the chats state
      setChats(prev => {
        const remainingChats = prev.filter(chat => chat.id !== chatId);
        
        // If the deleted chat was the current one, set the first remaining chat as current
        if (currentChatId === chatId) {
          if (remainingChats.length > 0) {
            setCurrentChatId(remainingChats[0].id);
          } else {
            setCurrentChatId('');
          }
        }
        
        return remainingChats;
      });
      
      // Dispatch a custom event to notify the Chat component
      window.dispatchEvent(new CustomEvent('chat-deleted', { detail: { chatId } }));
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        onNewChat={handleNewChat}
        onChatSelect={handleChatSelect}
        currentChatId={currentChatId}
        chats={chats}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 relative">
        {/* Floating Sidebar Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-95 touch-manipulation"
          aria-label="Toggle sidebar"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>


        
        <div className="flex-1 relative">
          <Chat 
            onNewChat={handleNewChat}
            onChatSelect={handleChatSelect}
            currentChatId={currentChatId}
          />
        </div>
        {/* Mobile-only status bar */}
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <span>Ardi AI Assistant</span>
          <span>Online</span>
        </div>
      </div>
      

    </div>
  );
}