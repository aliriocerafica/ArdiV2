import React, { useState } from 'react';
import Image from 'next/image';
import { TbCopy } from 'react-icons/tb';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FiEdit3, FiRotateCcw } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: number;
  sender: 'user' | 'ardi';
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
  displayedText: { [key: number]: string };
  typingMessageId: number | null;
  isTyping: boolean;
  onRetryMessage?: (messageId: number) => void;
  onEditMessage?: (messageId: number, newContent: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  displayedText, 
  typingMessageId, 
  isTyping,
  onRetryMessage,
  onEditMessage
}) => {
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const [dislikedMessages, setDislikedMessages] = useState<Set<number>>(new Set());
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setShowCopyModal(true);
      setTimeout(() => setShowCopyModal(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleLikeMessage = (messageId: number) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
        // Remove from disliked if it was there
        setDislikedMessages(prevDisliked => {
          const newDislikedSet = new Set(prevDisliked);
          newDislikedSet.delete(messageId);
          return newDislikedSet;
        });
      }
      return newSet;
    });
  };

  const handleDislikeMessage = (messageId: number) => {
    setDislikedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
        // Remove from liked if it was there
        setLikedMessages(prevLiked => {
          const newLikedSet = new Set(prevLiked);
          newLikedSet.delete(messageId);
          return newLikedSet;
        });
      }
      return newSet;
    });
  };

  const handleRetryMessage = (messageId: number) => {
    if (onRetryMessage) {
      onRetryMessage(messageId);
    }
  };

  const handleEditMessage = (messageId: number, content: string) => {
    setEditingMessageId(messageId);
    setEditContent(content);
  };

  const handleSaveEdit = () => {
    if (editingMessageId && onEditMessage) {
      onEditMessage(editingMessageId, editContent);
      setEditingMessageId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <>
      {/* Copy Modal */}
      {showCopyModal && (
        <div className="fixed top-4 right-4 z-50 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-2 animate-in slide-in-from-right duration-300">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Text copied!</span>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className={`message-item flex items-start space-x-2 sm:space-x-4 px-2 sm:px-0 ${message.sender === 'user' ? 'justify-end' : ''}`}>
          {message.sender === 'ardi' && (
            <div className="flex-shrink-0 mt-1 sm:mt-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white dark:bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-100" style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Image
                  src="/img/Chat.svg"
                  alt="Ardi Chat"
                  width={20}
                  height={20}
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                />
              </div>
            </div>
          )}
          <div className={`${message.sender === 'user' ? 'flex justify-end' : ''} flex-1 max-w-full sm:max-w-4xl`}>
            <div className={`message-bubble px-3 py-3 sm:px-6 sm:py-4 transition-all duration-300 hover:translate-y-[-1px] ${
              message.sender === 'ardi' 
                ? 'text-gray-900 dark:text-gray-100' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white max-w-full sm:max-w-2xl rounded-lg shadow-sm'
            }`}>
              {message.sender === 'ardi' ? (
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm sm:text-base">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 mt-4 sm:mt-6 first:mt-0">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 mt-3 sm:mt-5 first:mt-0">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-3 sm:mt-4 first:mt-0">{children}</h3>,
                      h4: ({children}) => <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-2 mt-2 sm:mt-3 first:mt-0">{children}</h4>,
                      p: ({children}) => <p className="text-sm sm:text-base leading-relaxed mb-2 sm:mb-3 last:mb-0">{children}</p>,
                      strong: ({children}) => <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                      ul: ({children}) => <ul className="list-disc list-inside mb-2 sm:mb-3 space-y-0.5 sm:space-y-1 text-sm sm:text-base">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside mb-2 sm:mb-3 space-y-0.5 sm:space-y-1 text-sm sm:text-base">{children}</ol>,
                      li: ({children}) => <li className="text-sm sm:text-base leading-relaxed">{children}</li>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 sm:pl-4 italic text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">{children}</blockquote>,
                      code: ({children, className}) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs sm:text-sm font-mono">{children}</code>
                        ) : (
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto mb-2 sm:mb-3">
                            <code className="text-xs sm:text-sm font-mono">{children}</code>
                          </pre>
                        );
                      },
                      hr: () => <hr className="border-gray-300 dark:border-gray-600 my-3 sm:my-4" />,
                      a: ({children, href}) => (
                        <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                      table: ({children}) => (
                        <div className="overflow-x-auto mb-3 sm:mb-4">
                          <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({children}) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
                      tbody: ({children}) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>,
                      tr: ({children}) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">{children}</tr>,
                      th: ({children}) => (
                        <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                          {children}
                        </th>
                      ),
                      td: ({children}) => (
                        <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {displayedText[message.id] !== undefined 
                      ? displayedText[message.id] 
                      : message.content}
                  </ReactMarkdown>
                  {typingMessageId === message.id && (
                    <span className="inline-block w-0.5 h-5 bg-gray-600 dark:bg-gray-400 ml-1 animate-pulse" style={{ animation: 'blink 1s infinite' }}></span>
                  )}
                </div>
              ) : (
                <div>
                  {editingMessageId === message.id ? (
                    <div className="space-y-2 w-5/6 relative">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none"
                        rows={2}
                        autoFocus
                      />
                      <div className="absolute bottom-0 right-0 flex space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 bg-gray-500 dark:bg-gray-700 text-white text-xs rounded hover:bg-gray-600 dark:hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1.5 bg-gray-700 dark:bg-white text-white dark:text-gray-900 text-xs rounded hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative">
                      <p className="font-normal text-base leading-relaxed whitespace-pre-wrap text-gray-900 dark:text-white">
                        {message.content}
                      </p>
                      {/* Hover buttons for user messages */}
                      <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <button
                          onClick={() => handleCopyMessage(message.content)}
                          className="p-2 rounded-lg bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
                          title="Copy message"
                        >
                          <TbCopy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditMessage(message.id, message.content)}
                          className="p-2 rounded-lg bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
                          title="Edit message"
                        >
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Enhanced action buttons for Ardi messages */}
            {message.sender === 'ardi' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 sm:mt-3 ml-0 sm:ml-2 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button 
                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-all duration-200 hover:scale-105"
                    title="Copy message"
                    onClick={() => handleCopyMessage(message.content)}
                  >
                    <TbCopy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 dark:text-gray-400" />
                  </button>
                  <button 
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                      likedMessages.has(message.id)
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'hover:bg-green-50 dark:hover:bg-green-900/20 active:bg-green-100 dark:active:bg-green-800/30'
                    }`}
                    title="Good response"
                    onClick={() => handleLikeMessage(message.id)}
                  >
                    <FiThumbsUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      likedMessages.has(message.id)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                    }`} />
                  </button>
                  <button 
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                      dislikedMessages.has(message.id)
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700'
                    }`}
                    title="Bad response"
                    onClick={() => handleDislikeMessage(message.id)}
                  >
                    <FiThumbsDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      dislikedMessages.has(message.id)
                        ? 'text-gray-700 dark:text-gray-400'
                        : 'text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                    }`} />
                  </button>
                </div>
                
                {/* Disclaimer and Retry Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Desktop: Full disclaimer */}
                  <div className="hidden sm:block">
                    <span className="text-xs text-gray-600 dark:text-gray-400">ARDI can make mistakes. Please double-check responses.</span>
                  </div>
                  
                  {/* Mobile: Expandable disclaimer */}
                  <div className="sm:hidden">
                    <button 
                      onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                      className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <span>Disclaimer</span>
                      <svg 
                        className={`w-3 h-3 transition-transform duration-200 ${isDisclaimerExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isDisclaimerExpanded && (
                      <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
                          ARDI can make mistakes. Please double-check responses for accuracy and completeness.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    title="Retry response"
                    onClick={() => handleRetryMessage(message.id)}
                  >
                    <FiRotateCcw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {message.sender === 'user' && (
            <div className="flex-shrink-0 mt-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Enhanced Typing Indicator */}
      {isTyping && typingMessageId === null && (
        <div className="message-item flex items-start space-x-4">
          <div className="flex-shrink-0 mt-2">
            <div className="w-10 h-10 bg-white dark:bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-100" style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Image
                src="/img/Chat.svg"
                alt="Ardi Chat"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="px-6 py-4 max-w-24">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessages; 