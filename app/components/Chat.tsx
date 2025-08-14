"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { IoMdAttach, IoMdSend } from 'react-icons/io';
import { IoStop } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import { FiStar, FiShare2, FiTrash2 } from 'react-icons/fi';
import ChatMessages from './ChatMessages';
// Content filtering and knowledge lookup now handled by API routes

interface Message {
  id: number;
  sender: 'user' | 'ardi';
  content: string;
  timestamp: string;
}

interface ChatData {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  isStarred: boolean;
}

interface ChatProps {
  onNewChat?: () => void;
  onChatSelect?: (chatId: string) => void;
  currentChatId?: string;
}

export default function Chat({ onNewChat, onChatSelect, currentChatId }: ChatProps) {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [internalCurrentChatId, setInternalCurrentChatId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState<{ [key: number]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [stopTyping, setStopTyping] = useState<null | (() => void)>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Predefined questions that users can ask
  const suggestedQuestions = [
    // Training and Employment Questions
    "How long is the training period for CMA?",
    "What is the training period for Case Manager Assistants?",
    "How long does training last for different roles?",
    "What is the training duration for Medical Records?",
    "How long is training for Speak Easy Account?",
    "What is the BDJ account training period?",
    "What training do Case Manager Assistants receive?",
    "How long does it take to train new employees?",
    "How long is HR training?",
    "What is the Human Resources training period?",
    "How long does HR training last?",
    "What is the training duration for HR roles?",
    "How long is Case Management training?",
    "What is the Case Management training period?",
    "How long does Case Management training last?",
    
    // Role and Position Questions
    "What is a case manager?",
    "What is a Case Manager Assistant (CMA)?",
    "What is CMA?",
    "What is a CMA?",
    "What does a CMA do?",
    "What does Case Manager Assistant do?",
    "CMA job responsibilities",
    "Case Manager Assistant responsibilities",
    "CMA role",
    "Case Manager Assistant role",
    "What is a medical records clerk?",
    "What are the responsibilities of a Case Manager Assistant?",
    "What roles are available at Ardent?",
    "What positions does Ardent hire for?",
    "What is the difference between CM and CMA?",
    "What is HR?",
    "What does Human Resources do?",
    "What are HR responsibilities?",
    "What is an HR role at Ardent?",
    
    // Company Information Questions
    "How many accounts does Ardent have?",
    "What accounts does Ardent manage?",
    "Who are Ardent's clients?",
    "What is Ardent Paralegal Business Solutions?",
    "Tell me about Ardent company",
    "What services does Ardent provide?",
    "How big is Ardent?",
    "Where is Ardent located?",
    
    // Legal Process Questions
    "How do I file a personal injury claim?",
    "What documents do I need for my case?",
    "How long does a personal injury case take?",
    "What is the statute of limitations for personal injury?",
    "How is pain and suffering calculated?",
    "What should I do immediately after an accident?",
    "When should I contact a personal injury lawyer?",
    "What is the difference between a settlement and a trial?",
    "How do I deal with insurance companies?",
    "What medical records are important for my case?",
    "Can I still file a claim if I was partially at fault?",
    "What is workers' compensation?",
    "How do I prepare for a deposition?",
    "What is mediation in a personal injury case?",
    "How do I calculate my medical expenses?",
    "What is the role of expert witnesses?",
    "How do I document my injuries properly?",
    "What should I expect during the legal process?",
    
    // ARDI and Technology Questions
    "What is ARDI?",
    "What does ARDI stand for?",
    "How can ARDI help me?",
    "What can you assist with?",
    "What version of ARDI are you?",
    "How does ARDI work?",
    "What features does ARDI have?",
    
    // Case Management Questions
    "How does case management work?",
    "What are case management features?",
    "How to organize legal cases?",
    "What is the intake process?",
    "How do you handle client intake?",
    "What is the case workflow?",
    "How do you track deadlines?",
    "What is document management?",
    
    // Account Specific Questions
    "What is Speak Easy Account?",
    "What is BDJ Account?",
    "Tell me about different client accounts",
    "What type of cases does each account handle?",
    "How are accounts assigned?"
  ];

  const createNewChat = useCallback(() => {
    const newChat: ChatData = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      isStarred: false
    };
    
    setChats(prev => [...prev, newChat]);
    setInternalCurrentChatId(newChat.id);
    setMessages([]);
    setIsStarred(false);
    setInputMessage('');
    setDisplayedText({});
    
    // Reset response states for new chat
    setIsTyping(false);
    setIsResponding(false);
    setStopTyping(null);
    setCanSendMessage(true);
    
    // Dispatch event to notify sidebar of new chat creation
    window.dispatchEvent(new CustomEvent('new-chat-created', { detail: { chatId: newChat.id } }));
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('ardi-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      
      // Set current chat to the most recent one or create a new one
      if (parsedChats.length > 0) {
        const mostRecentChat = parsedChats[parsedChats.length - 1];
        setInternalCurrentChatId(mostRecentChat.id);
        setMessages(mostRecentChat.messages);
        setIsStarred(mostRecentChat.isStarred);
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, [createNewChat]);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('ardi-chats', JSON.stringify(chats));
      // Dispatch event to notify sidebar of chat updates
      window.dispatchEvent(new CustomEvent('chat-updated'));
    }
  }, [chats]);

  // Update current chat messages when internalCurrentChatId changes
  useEffect(() => {
    const currentChat = chats.find(chat => chat.id === internalCurrentChatId);
    if (currentChat) {
      setMessages(currentChat.messages);
      setIsStarred(currentChat.isStarred);
      // Reset response states when loading a chat
      setIsTyping(false);
      setIsResponding(false);
      setStopTyping(null);
      setCanSendMessage(true);
    }
  }, [internalCurrentChatId, chats]);

  // Handle currentChatId prop changes from parent
  useEffect(() => {
    if (currentChatId && currentChatId !== internalCurrentChatId) {
      const targetChat = chats.find(chat => chat.id === currentChatId);
      if (targetChat) {
        setInternalCurrentChatId(currentChatId);
        setMessages(targetChat.messages);
        setIsStarred(targetChat.isStarred);
        // Reset response states when switching to a different chat
        setIsTyping(false);
        setIsResponding(false);
        setStopTyping(null);
        setCanSendMessage(true);
      }
    }
  }, [currentChatId, chats, internalCurrentChatId]);

  // Handle new chat creation from sidebar
  useEffect(() => {
    const handleNewChatRequest = () => {
      createNewChat();
    };
    
    window.addEventListener('new-chat-requested', handleNewChatRequest);
    return () => {
      window.removeEventListener('new-chat-requested', handleNewChatRequest);
    };
  }, [createNewChat]);



  const switchToChat = (chatId: string) => {
    setInternalCurrentChatId(chatId);
    // Reset response states when switching chats
    setIsTyping(false);
    setIsResponding(false);
    setStopTyping(null);
    setCanSendMessage(true);
  };

  const updateCurrentChat = (updatedMessages: Message[]) => {
    setChats(prev => prev.map(chat => 
      chat.id === internalCurrentChatId 
        ? { ...chat, messages: updatedMessages }
        : chat
    ));
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title }
        : chat
    ));
  };

  const toggleChatStar = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, isStarred: !chat.isStarred }
        : chat
    ));
  };

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're deleting the current chat, switch to the most recent one
    if (chatId === internalCurrentChatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        const mostRecentChat = remainingChats[remainingChats.length - 1];
        setInternalCurrentChatId(mostRecentChat.id);
        setMessages(mostRecentChat.messages);
        setIsStarred(mostRecentChat.isStarred);
      } else {
        createNewChat();
      }
    }
  }, [chats, internalCurrentChatId, createNewChat]);

  // Handle chat deletion from sidebar
  useEffect(() => {
    const handleChatDeleted = (event: CustomEvent) => {
      const { chatId } = event.detail;
      deleteChat(chatId);
    };
    
    window.addEventListener('chat-deleted', handleChatDeleted as EventListener);
    return () => {
      window.removeEventListener('chat-deleted', handleChatDeleted as EventListener);
    };
  }, [deleteChat]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleStarChat = () => {
    if (internalCurrentChatId) {
      toggleChatStar(internalCurrentChatId);
    }
    setIsDropdownOpen(false);
  };

  const handleShareChat = () => {
    // TODO: Implement share chat functionality
    console.log('Share this chat');
    setIsDropdownOpen(false);
  };

  const handleDeleteChat = () => {
    if (internalCurrentChatId) {
      deleteChat(internalCurrentChatId);
    }
    setIsDropdownOpen(false);
  };

  const handleRetryMessage = (messageId: number) => {
    // Find the ARDI message to retry
    const ardiMessageIndex = messages.findIndex(msg => msg.id === messageId && msg.sender === 'ardi');
    if (ardiMessageIndex === -1) return;

    // Find the user message that prompted this ARDI response
    const userMessageIndex = ardiMessageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex].sender !== 'user') return;

    const userMessage = messages[userMessageIndex];
    
    // Remove the current ARDI response
    const updatedMessages = messages.filter((_, index) => index !== ardiMessageIndex);
    setMessages(updatedMessages);
    updateCurrentChat(updatedMessages);
    
    // Clear any displayed text for this message
    setDisplayedText(prev => {
      const newDisplayedText = { ...prev };
      delete newDisplayedText[messageId];
      return newDisplayedText;
    });

            // Generate a new response
        setIsTyping(true);
        setIsResponding(true);
        setCanSendMessage(false); // Disable sending new messages while responding
        
        const getNewResponse = async () => {
          try {
            const newArdiResponseText = await getArdiResponse(userMessage.content);
            if (typeof newArdiResponseText === 'string' && newArdiResponseText.length > 0) {
              const newArdiMessage: Message = {
                id: Date.now() + Math.random(), // Ensure unique ID
                sender: 'ardi',
                content: newArdiResponseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              
              const newMessages = [...updatedMessages, newArdiMessage];
              setMessages(newMessages);
              updateCurrentChat(newMessages);
              
              // Start typing effect for the new response
              setTimeout(() => {
                typeWriterEffect(newArdiMessage.id, newArdiResponseText);
              }, 50);
            } else {
              setIsTyping(false);
              setIsResponding(false);
              setCanSendMessage(true); // Re-enable sending messages if no response
            }
          } catch (error) {
            console.error('Error getting Ardi response:', error);
            setIsTyping(false);
            setIsResponding(false);
            setCanSendMessage(true);
          }
        };
        
        setTimeout(getNewResponse, 100);
  };

  const handleEditMessage = (messageId: number, newContent: string) => {
    if (newContent.trim() === '') return;

    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent.trim() }
        : msg
    );
    setMessages(updatedMessages);
    updateCurrentChat(updatedMessages);

    // If this was a user message and there's an ARDI response after it, regenerate the response
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex !== -1 && messages[messageIndex].sender === 'user') {
      const nextMessage = messages[messageIndex + 1];
      if (nextMessage && nextMessage.sender === 'ardi') {
        // Remove the current ARDI response
        const messagesWithoutArdi = updatedMessages.filter((_, index) => index !== messageIndex + 1);
        setMessages(messagesWithoutArdi);
        updateCurrentChat(messagesWithoutArdi);
        
        // Clear any displayed text for the ARDI message
        setDisplayedText(prev => {
          const newDisplayedText = { ...prev };
          delete newDisplayedText[nextMessage.id];
          return newDisplayedText;
        });

        // Generate a new response based on the edited user message
        setIsTyping(true);
        setIsResponding(true);
        setCanSendMessage(false); // Disable sending new messages while responding
        
        const getNewResponse = async () => {
          try {
            const newArdiResponseText = await getArdiResponse(newContent.trim());
            if (typeof newArdiResponseText === 'string' && newArdiResponseText.length > 0) {
              const newArdiMessage: Message = {
                id: Date.now() + Math.random(), // Ensure unique ID
                sender: 'ardi',
                content: newArdiResponseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              
              const newMessages = [...messagesWithoutArdi, newArdiMessage];
              setMessages(newMessages);
              updateCurrentChat(newMessages);
              
              // Start typing effect for the new response
              setTimeout(() => {
                typeWriterEffect(newArdiMessage.id, newArdiResponseText);
              }, 50);
            } else {
              setIsTyping(false);
              setIsResponding(false);
              setCanSendMessage(true); // Re-enable sending messages if no response
            }
          } catch (error) {
            console.error('Error getting Ardi response:', error);
            setIsTyping(false);
            setIsResponding(false);
            setCanSendMessage(true);
          }
        };
        
        setTimeout(getNewResponse, 100);
      }
    }
  };

  const getArdiResponse = async (userMessage: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response types
      if (data.shouldIgnore) {
        return null;
      }
      
      if (data.isInappropriate) {
        return data.response;
      }
      
      return data.response;
    } catch (error) {
      console.error('Error getting Ardi response:', error);
      // Fallback to client-side processing if API fails
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userMessage: string) => {
    // First, check for inappropriate content using the comprehensive filter
    const filterResult = filterContent(userMessage);
    
    // If content is inappropriate, return appropriate professional response
    if (filterResult.isInappropriate) {
      return filterResult.suggestedResponse || getAppropriateResponse(filterResult.severity);
    }
    
    // If message should be ignored entirely (high severity), return null
    if (shouldIgnoreMessage(userMessage)) {
      return null;
    }
    
    // Handle priority queries FIRST before knowledge base lookup
    const message = userMessage.toLowerCase();
    
    // Handle Case Manager Assistant (CMA) definition questions (NOT training)
    if ((message.includes('what is') && (message.includes('cma') || message.includes('case manager assistant'))) ||
        (message.includes('cma') && (message.includes('job') || message.includes('role') || message.includes('responsibilities'))) ||
        (message.includes('case manager assistant') && (message.includes('job') || message.includes('role') || message.includes('responsibilities'))) ||
        (message.includes('what does') && (message.includes('cma do') || message.includes('case manager assistant do'))) ||
        message.includes('cma job') || message.includes('case manager assistant job')) {
      
      // Exclude training-related queries from this handler
      if (message.includes('training') || message.includes('how long') || message.includes('duration')) {
        // Let training handler take priority - fall through
      } else {
        return "👥 **Case Manager Assistant (CMA)**\n\nCase Manager Assistant jobs involve providing administrative and technical support to case managers, assisting with client communication, and maintaining case files and records. These roles are found in various settings like healthcare, social services, and legal fields.\n\n📋 **Key Responsibilities:**\n• **Administrative Support** - Providing comprehensive support to case managers\n• **Technical Assistance** - Helping with case management systems and processes\n• **Client Communication** - Facilitating communication between clients and case managers\n• **File Management** - Maintaining accurate case files and records\n• **Documentation** - Ensuring proper documentation of case activities\n\n🏢 **Work Settings:**\n• **Healthcare** - Hospitals, clinics, and medical facilities\n• **Social Services** - Community organizations and government agencies\n• **Legal Fields** - Law firms and legal service providers\n• **Insurance** - Claims processing and client support\n• **Non-profit Organizations** - Various client support services\n\n💼 **Skills Required:**\n• Strong organizational and communication skills\n• Attention to detail and accuracy\n• Proficiency with case management software\n• Understanding of confidentiality requirements\n• Ability to work with diverse client populations\n\n⏰ **Training Period at Ardent:** 1-3 weeks\n\nCMAs play a vital role in ensuring smooth case management operations and excellent client service across various industries.";
      }
    }
    
    // Handle training-related queries with improved pattern matching
    if (message.includes('training period') || 
        (message.includes('how long') && message.includes('training')) || 
        message.includes('training duration') || 
        message.includes('training last') ||
        (message.includes('training') && (message.includes('cma') || message.includes('case manager assistant') || 
         message.includes('hr') || message.includes('human resources') || 
         message.includes('case management') || message.includes('case manager') ||
         message.includes('medical records') || message.includes('manager') ||
         message.includes('cm'))) ||
        message.trim() === 'training') {
      return "⏰ **Training Periods by Role**\n\nTraining duration varies based on the position and client account requirements:\n\n👥 **Case Manager Assistants (CMA)**\n• **Duration**: 1-3 weeks\n• **Coverage**: Comprehensive training on case management workflows and legal procedures\n• **Focus**: Client communication, document organization, deadline tracking\n\n👤 **Human Resources (HR)**\n• **Duration**: 1-2 weeks\n• **Coverage**: HR policies, employee relations, compliance requirements\n• **Focus**: Employment law, benefits administration, conflict resolution\n\n🏥 **Medical Records**\n• **Duration**: 1-3 weeks\n• **Coverage**: HIPAA compliance, medical documentation handling, record management systems\n• **Focus**: Privacy protocols, medical terminology, documentation accuracy\n\n🗣️ **Speak Easy Account**\n• **Duration**: 1 day\n• **Coverage**: Account-specific procedures and communication protocols\n• **Focus**: Quick onboarding for streamlined processes\n\n⚖️ **BDJ Account**\n• **Duration**: Depends on the specific role\n• **Coverage**: Role-specific training tailored to position requirements\n• **Focus**: Customized based on job responsibilities\n\n📚 **Training Components Include:**\n• Role-specific procedures and protocols\n• Software and system training\n• Client communication standards\n• Quality assurance requirements\n• Account-specific workflows\n• Ongoing support and mentorship\n\nAll training programs include hands-on practice, assessment, and ongoing support to ensure success in your role.";
    }

    // Check for knowledge base responses second
    const knowledgeResult = findKnowledge(userMessage);
    if (knowledgeResult) {
      // Prioritize table content if available, otherwise use regular content
      return knowledgeResult.tableContent || knowledgeResult.content;
    }
    
    // Handle specific "Hello Ardi" greetings
    if (message.toLowerCase().includes('hello ardi') || message.toLowerCase().includes('hello ard') || 
        message.toLowerCase().includes('hi ardi') || message.toLowerCase().includes('hey ardi')) {
      return "👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\nWhat can I assist you with today? 😊";
    }
    
    // Handle general greetings with varied responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
        message.includes('good morning') || message.includes('good afternoon') || 
        message.includes('good evening') || message.includes('howdy') || message.includes('greetings')) {
      const greetingResponses = [
        "## 👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\n### What can I assist you with today? 😊",
        "## 🌟 Hi, I'm Ardi!\n\nI'm ARDI - Ardent Knowledge Database Intelligence. I'm your AI companion for legal excellence, created to help legal professionals streamline their case management processes. My role is to provide intelligent support for document organization, deadline tracking, client communications, and workflow optimization. I combine advanced AI capabilities with deep knowledge of legal processes to help you manage cases more effectively. Whether you need help with case organization, legal research, or client communication, I'm here to support your legal operations.\n\n### How can I support your legal operations today?",
        "## ✨ Hi, I'm Ardi!\n\nI'm ARDI, which means Ardent Knowledge Database Intelligence. I'm an AI assistant built specifically for legal professionals who need help with case management and paralegal services. My job is to make your legal workflows more efficient by helping with document organization, deadline tracking, client communication, and overall case management. I work with Ardent Paralegal Business Solutions Inc to provide you with the tools and knowledge you need to excel in your legal practice. I'm always ready to help with any legal operations questions you might have.\n\n### What's on your mind?",
        "## 🚀 Hi, I'm Ardi!\n\nI'm ARDI - Ardent Knowledge Database Intelligence. I'm your intelligent legal operations assistant, designed to help legal professionals manage cases more effectively. My purpose is to provide comprehensive support for case management, document organization, deadline tracking, and client communication. I work with Ardent Paralegal Business Solutions Inc to offer you AI-powered solutions that streamline your legal workflows and improve your practice efficiency. I'm here to help you navigate the complexities of legal case management with confidence.\n\n### What would you like to explore?"
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // Handle questions about ARDI/company with detailed responses
    if (message.includes('what are you') || message.includes('who are you') || 
        message.includes('about ardi') || message.includes('what is ardi') || 
        message.includes('tell me about yourself') || message.includes('introduce yourself')) {
      const aboutResponses = [
        "## 🤖 I'm ARDI\n\n**Ardent Knowledge Database Intelligence** - a sophisticated AI assistant specifically designed for legal professionals and case management excellence. Developed for Ardent Paralegal Business Solutions Inc, I combine cutting-edge artificial intelligence with deep knowledge of legal workflows.\n\n### 📋 My capabilities include:\n\n* **Advanced case management** and organization\n* **Legal document analysis** and categorization\n* **Deadline tracking** and calendar management\n* **Client communication** optimization\n* **Workflow automation** recommendations\n* **Legal research support** and guidance\n\n⚖️ I'm here to transform how you handle legal operations, making them more efficient, organized, and professional.",
        "## ✨ I'm ARDI Version 2\n\nYour intelligent legal operations companion! Think of me as your digital paralegal assistant with enhanced AI capabilities, specifically engineered for Ardent Paralegal Business Solutions Inc.\n\n### 🎯 I specialize in:\n\n* **Comprehensive case management** solutions\n* **Document organization** and retrieval systems\n* **Legal workflow optimization**\n* **Client relationship management**\n* **Deadline and appointment tracking**\n* **Legal research and analysis support**\n\n💼 My mission is to empower legal professionals with AI-driven tools that streamline operations, reduce administrative burden, and enhance client service delivery."
      ];
      return aboutResponses[Math.floor(Math.random() * aboutResponses.length)];
    }
    
    // Handle ARDI acronym questions
    if (message.includes('what does ardi stand for') || message.includes('what is ardi stands for') || 
        message.includes('ardi stands for') || message.includes('what does ardi mean') || 
        message.includes('ardi acronym') || message.includes('ardi abbreviation') || 
        message.includes('meaning of ardi')) {
      return "🤖 **ARDI** represents **Ardent Knowledge Database Intelligence** - a sophisticated second-generation AI assistant specifically engineered for legal professionals and case management excellence. As the embodiment of passionate dedication to legal excellence, I combine comprehensive knowledge mastery with advanced information management capabilities to provide AI-powered decision support and automated workflow optimization. My architecture focuses on legal operations optimization through seamless workflow automation, offering advanced document analysis, deadline tracking, and client communication capabilities. I excel in case lifecycle management, document categorization and retrieval, deadline tracking with automated alerts, and client communication optimization, all while maintaining attorney-client privilege protection, HIPAA compliance for healthcare matters, state bar requirement adherence, and enterprise-grade data security. My mission is to transform legal practice through intelligent automation, comprehensive knowledge management, and unwavering commitment to operational excellence. As Version 2, I represent months of development focused on real-world legal professional feedback and am designed to be your indispensable partner in achieving legal operational excellence!";
    }
    
    // Handle version questions with detailed information
    if (message.includes('what version') || message.includes('version of ardi') || 
        message.includes('ardi version') || message.includes('which version') || 
        message.includes('latest version') || message.includes('current version')) {
      return "🚀 I'm ARDI Version 2 - the latest evolution in legal AI assistance!\n\n🆕 **What's New in Version 2:**\n• Enhanced conversational AI with improved context understanding\n• Advanced case management algorithms\n• Better document analysis and categorization\n• Improved deadline tracking with smart notifications\n• Enhanced client communication templates\n• More intuitive workflow automation suggestions\n• Expanded legal research capabilities\n• Better integration with existing legal software systems\n\n⚡ Version 2 represents months of development focused on real-world legal professional feedback. I'm faster, smarter, and more helpful than ever before - designed to be your indispensable legal operations partner!";
    }
    
    // Handle case management queries with comprehensive responses
    if (message.includes('case management') || message.includes('manage cases') || 
        message.includes('case organization') || message.includes('legal case') || 
        message.includes('case workflow')) {
      const caseManagementResponses = [
        "🎯 Excellent question! Case management is at the heart of what I do. At Ardent Paralegal Business Solutions Inc, we've revolutionized how legal professionals handle cases through intelligent automation and organization.\n\n📂 **Our Case Management Solutions Include:**\n• **Document Organization** - Smart filing systems with AI-powered categorization\n• **Deadline Tracking** - Automated calendar management with critical date alerts\n• **Client Communications** - Streamlined messaging and update systems\n• **Task Management** - Priority-based workflow organization\n• **Progress Monitoring** - Real-time case status tracking\n• **Research Integration** - Connected legal research and case strategy tools\n\n💡 What specific aspect of case management would you like to explore further? I can provide detailed guidance on implementation, best practices, or specific features.",
        "🏛️ Case management excellence is what sets successful legal practices apart! I'm designed to transform how you handle every aspect of legal case workflows.\n\n⚖️ **Core Case Management Features:**\n• **Intelligent File Organization** - AI-powered document sorting and retrieval\n• **Critical Date Management** - Never miss important deadlines again\n• **Client Portal Integration** - Seamless client communication and updates\n• **Workflow Automation** - Streamline repetitive tasks and processes\n• **Collaboration Tools** - Enhanced team coordination and task delegation\n• **Reporting & Analytics** - Comprehensive case performance insights\n\n🤔 Are you looking to implement a new case management system, or would you like to optimize your current processes? I can provide tailored recommendations based on your specific needs."
      ];
      return caseManagementResponses[Math.floor(Math.random() * caseManagementResponses.length)];
    }
    
    // Handle document management questions
    if (message.includes('document') || message.includes('file') || message.includes('paperwork') || 
        message.includes('filing') || message.includes('organize documents') || 
        message.includes('document management')) {
      return "📋 Document management is crucial for legal efficiency! I excel at helping organize, categorize, and manage legal documents with AI-powered precision.\n\n📁 **Advanced Document Management Features:**\n• **Smart Categorization** - Automatically sort documents by type, case, client, or custom criteria\n• **OCR Integration** - Convert scanned documents to searchable text\n• **Version Control** - Track document revisions with detailed change logs\n• **Security Protocols** - Bank-level encryption and access controls\n• **Quick Retrieval** - Instant search across all documents using keywords or metadata\n• **Template Library** - Pre-built legal document templates for common procedures\n• **Compliance Tracking** - Ensure documents meet regulatory requirements\n\n🔍 **Search Capabilities:**\nFind any document in seconds using natural language queries, date ranges, client names, case numbers, or document types.\n\nWhat specific document management challenges are you facing? I can provide targeted solutions for your workflow!";
    }
    
    // Handle medical records handling questions
    if (message.includes('medical records') || message.includes('medical documentation') || 
        message.includes('medical records handling') || message.includes('medical records management') ||
        message.includes('medical records clark') || message.includes('medical records collection') ||
        message.includes('medical records organization') || message.includes('medical records analysis')) {
      const medicalRecordsResponse = "🏥 Medical records handling is a critical component of personal injury case management! I provide comprehensive guidance on medical documentation processes.\n\n📋 **Medical Records Management Features:**\n• **Systematic Collection** - Comprehensive gathering of all medical documentation\n• **HIPAA Compliance** - Secure handling with proper authorizations and privacy protection\n• **Chronological Organization** - Timeline-based filing from injury to present\n• **Provider Categorization** - Grouping by healthcare provider type and specialty\n• **Digital Organization** - Electronic filing with searchable metadata\n• **Analysis Tools** - Injury documentation, treatment analysis, and damage assessment\n• **Clark Process** - Specialized methodology for comprehensive medical record handling\n\n🔍 **Key Processes:**\n• **Collection Protocol** - Systematic gathering of hospital, physician, diagnostic, and treatment records\n• **Organization System** - Chronological and provider-based filing with digital integration\n• **Analysis Framework** - Injury documentation, treatment evaluation, and prognosis assessment\n• **Compliance Management** - HIPAA, state, and federal regulatory compliance\n• **Technology Solutions** - Document management systems and digital imaging solutions\n\nWhat specific aspect of medical records handling would you like to explore? I can provide detailed guidance on collection, organization, analysis, or compliance requirements!";
      return medicalRecordsResponse;
    }
    
    // Handle Medical Records Clerk questions
    if (message.includes('medical records clerk')) {
      const medicalRecordsClerkResponse = "👩‍⚕️ **Medical Records Clerk** is a healthcare professional job title! This is different from the legal case management process.\n\n**Medical Records Clerk Profession:**\n• **Healthcare Role** - Works in hospitals, clinics, and medical facilities\n• **Patient Records** - Organizes and maintains patient medical records\n• **Administrative Tasks** - Handles admissions, discharges, and patient registration\n• **HIPAA Compliance** - Ensures patient privacy and confidentiality\n• **Technology Management** - Works with Electronic Health Records (EHR) systems\n• **Professional Certification** - May require Certified Medical Records Clerk (CMRC) credentials\n\n**Key Responsibilities:**\n• Filing and organizing patient medical records\n• Processing medical record requests and releases\n• Supporting patient admissions and discharges\n• Ensuring HIPAA compliance and data security\n• Managing electronic health record systems\n• Assisting with healthcare facility administration\n\n**Work Environment:**\n• Hospitals, clinics, medical offices, nursing homes\n• Medical record departments and administrative offices\n• Digital systems and electronic health records\n\n**Career Path:**\n• Medical Records Technician (advanced role)\n• Health Information Manager (management position)\n• Medical Coding Specialist (specialized role)\n• Compliance Officer (regulatory focus)\n\n**Important Distinction:**\n• **Medical Records Clerk** = Healthcare professional job title in medical facilities\n• **Medical Records Clark** = Legal case management methodology for personal injury cases\n\nWould you like to learn more about the Medical Records Clerk profession or the Medical Records Clark process for legal cases?";
            return medicalRecordsClerkResponse;
    }

    // Handle HR (Human Resources) questions
    if (message.includes('hr ') || message.includes('human resources') || message.includes('what is hr') || 
        message.includes('hr role') || message.includes('hr responsibilities') || message.includes('hr department')) {
      return "👤 **Human Resources (HR) at Ardent**\n\nOur HR department plays a crucial role in supporting our team and maintaining a positive work environment.\n\n🎯 **HR Responsibilities:**\n• **Employee Relations** - Managing workplace relationships and conflict resolution\n• **Recruitment & Hiring** - Finding and onboarding talented legal professionals\n• **Training & Development** - Coordinating role-specific training programs\n• **Benefits Administration** - Managing employee benefits and compensation\n• **Policy Development** - Creating and maintaining workplace policies\n• **Compliance Management** - Ensuring adherence to employment laws\n• **Performance Management** - Supporting employee growth and development\n\n⏰ **HR Training Period:**\n• **Duration**: 1-2 weeks\n• **Coverage**: HR policies, employee relations, compliance requirements\n• **Focus**: Employment law, benefits administration, conflict resolution\n\n📋 **Key HR Functions at Ardent:**\n• **Onboarding Support** - New employee orientation and setup\n• **Training Coordination** - Managing training programs for all roles\n• **Employee Support** - Addressing workplace concerns and questions\n• **Legal Compliance** - Ensuring HR practices meet legal standards\n• **Culture Development** - Fostering Ardent's positive work environment\n• **Documentation Management** - Maintaining employee records and files\n\n💼 **HR Skills & Qualifications:**\n• Knowledge of employment law and regulations\n• Strong communication and interpersonal skills\n• Experience with HR software and systems\n• Conflict resolution and problem-solving abilities\n• Understanding of benefits and compensation structures\n\nOur HR team ensures that every employee at Ardent has the support they need to succeed in their role!";
    }

    // Handle deadline and scheduling questions
    if (message.includes('deadline') || message.includes('schedule') || message.includes('calendar') || 
        message.includes('appointment') || message.includes('date') || message.includes('reminder') || 
        message.includes('court date')) {
      return "⏰ Deadline management is absolutely critical in legal practice! Missing important dates can have serious consequences, which is why I've been designed with sophisticated scheduling and reminder systems.\n\n📅 **Comprehensive Deadline Management:**\n• **Smart Calendar Integration** - Syncs with all major calendar platforms\n• **Critical Date Alerts** - Multiple reminder notifications (email, SMS, in-app)\n• **Court Rules Integration** - Automatically calculates filing deadlines based on jurisdiction\n• **Buffer Time Scheduling** - Built-in cushions for document preparation\n• **Team Coordination** - Shared calendars with role-based access\n• **Conflict Detection** - Identifies scheduling conflicts across cases\n• **Mobile Notifications** - Never miss deadlines even when away from your desk\n\n🚨 **Priority Levels:**\n• **Critical** - Court dates, filing deadlines, statute of limitations\n• **Important** - Client meetings, deposition schedules, discovery deadlines\n• **Routine** - Follow-ups, administrative tasks, case reviews\n\nWould you like me to explain how to set up automated deadline tracking for your specific practice area?";
    }
    
    // Handle client communication questions
    if (message.includes('client') || message.includes('communication') || message.includes('contact') || 
        message.includes('email') || message.includes('phone') || message.includes('update') || 
        message.includes('client relations')) {
      return "💬 Client communication excellence is fundamental to successful legal practice! I'm equipped with advanced tools to help you maintain professional, timely, and effective client relationships.\n\n🤝 **Client Communication Solutions:**\n• **Automated Updates** - Regular case progress notifications\n• **Secure Client Portal** - Protected document sharing and messaging\n• **Template Library** - Professional email and letter templates\n• **Communication Logs** - Complete history of all client interactions\n• **Multi-Channel Support** - Email, phone, SMS, and video conferencing integration\n• **Language Translation** - Support for multilingual clients\n• **Response Time Tracking** - Monitor and improve response times\n\n📧 **Smart Features:**\n• **Auto-draft responses** based on case context\n• **Sentiment analysis** to gauge client satisfaction\n• **Follow-up reminders** for pending communications\n• **Bulk communication** for case updates across multiple clients\n\n🎯 **Best Practices I Can Help Implement:**\n• Regular update schedules\n• Clear communication protocols\n• Professional tone consistency\n• Confidentiality compliance\n\nWhat aspect of client communication would you like to improve first?";
    }
    
    // Handle legal research questions
    if (message.includes('research') || message.includes('legal research') || message.includes('case law') || 
        message.includes('statute') || message.includes('precedent') || message.includes('law') || 
        message.includes('legal database')) {
      return "🔍 Legal research is the foundation of strong legal arguments! While I can't replace specialized legal databases, I can significantly enhance your research workflow and organization.\n\n📚 **Research Support Capabilities:**\n• **Research Organization** - Structure and categorize your findings\n• **Citation Management** - Proper legal citation formatting\n• **Research Templates** - Standardized research memo formats\n• **Source Tracking** - Maintain detailed records of research sources\n• **Collaboration Tools** - Share research findings with team members\n• **Research Checklists** - Ensure comprehensive topic coverage\n• **Time Tracking** - Monitor research efficiency and billing\n\n⚖️ **Research Workflow Optimization:**\n• Create research plans and strategies\n• Organize findings by relevance and jurisdiction\n• Generate research summaries and briefs\n• Track research progress across multiple cases\n• Identify gaps in research coverage\n\n💡 **Integration Possibilities:**\nI can help you integrate findings from Westlaw, LexisNexis, Bloomberg Law, and other legal databases into organized, actionable research documents.\n\nWhat type of legal research project are you working on? I can suggest specific organizational strategies!";
    }
    
    // Handle technology and software questions
    if (message.includes('software') || message.includes('technology') || message.includes('integration') || 
        message.includes('system') || message.includes('platform') || message.includes('database') || 
        message.includes('automation')) {
      return "💻 Legal technology integration is my specialty! I'm designed to work seamlessly with existing legal software and help you leverage technology for maximum efficiency.\n\n🔗 **Integration Capabilities:**\n• **Practice Management Software** - Clio, MyCase, PracticePanther, Smokeball\n• **Document Management** - NetDocuments, iManage, SharePoint\n• **Accounting Software** - QuickBooks, LexisNexis PCLaw, TimeSolv\n• **Communication Platforms** - Outlook, Gmail, Zoom, Microsoft Teams\n• **Legal Research** - Westlaw, LexisNexis, Bloomberg Law\n• **E-Discovery Tools** - Relativity, Concordance, Everlaw\n\n🤖 **Automation Opportunities:**\n• **Document Generation** - Auto-populate templates with case data\n• **Time Tracking** - Automated billing and timesheet management\n• **Workflow Triggers** - Set up if-then automation rules\n• **Data Synchronization** - Keep information current across platforms\n• **Report Generation** - Automated case status and billing reports\n\n⚡ **Benefits of Integration:**\n• Reduced manual data entry\n• Improved accuracy and consistency\n• Better collaboration across teams\n• Enhanced client service delivery\n• Increased profitability through efficiency\n\nWhat software systems are you currently using? I can help identify integration opportunities!";
    }
    
    // Handle billing and financial questions
    if (message.includes('billing') || message.includes('invoice') || message.includes('payment') || 
        message.includes('financial') || message.includes('accounting') || message.includes('time tracking') || 
        message.includes('fee') || message.includes('cost')) {
      return "💰 Efficient billing and financial management are crucial for law firm profitability! I can help streamline your financial processes and improve revenue collection.\n\n💳 **Billing Management Features:**\n• **Automated Time Tracking** - Capture billable hours with precision\n• **Expense Management** - Track and categorize case-related expenses\n• **Invoice Generation** - Professional, detailed billing statements\n• **Payment Processing** - Multiple payment method integration\n• **Trust Account Management** - IOLTA compliance and tracking\n• **Fee Agreement Tracking** - Monitor different billing arrangements\n• **Collections Management** - Automated follow-up for overdue accounts\n\n📊 **Financial Analytics:**\n• **Profitability Analysis** - Per case and per client metrics\n• **Cash Flow Projections** - Predict future revenue streams\n• **Billing Efficiency Reports** - Identify areas for improvement\n• **Rate Optimization** - Analyze billing rates vs. market standards\n• **Write-off Tracking** - Monitor uncollectable time and expenses\n\n⏱️ **Time Management:**\n• Real-time time capture with mobile apps\n• Project-based time allocation\n• Billable vs. non-billable hour analysis\n• Automated timer reminders\n• Bulk time entry for efficiency\n\nWhat specific billing challenges are you experiencing? I can provide targeted solutions!";
    }
    
    // Handle company and services questions
    if (message.includes('ardent') || message.includes('paralegal') || message.includes('services') || 
        message.includes('company') || message.includes('business solutions') || 
        message.includes('about the company') || message.includes('your company')) {
      return "🏢 Ardent Paralegal Business Solutions Inc is a premier legal services company dedicated to revolutionizing how law firms operate through intelligent case management and comprehensive paralegal support.\n\n🎯 **Our Mission:**\nTo empower legal professionals with cutting-edge technology and expert paralegal services that enhance efficiency, improve client satisfaction, and drive business growth.\n\n⭐ **Core Services:**\n• **Case Management Excellence** - End-to-end case lifecycle management\n• **Document Management** - Advanced organization and retrieval systems\n• **Paralegal Support** - Certified paralegal professionals\n• **Workflow Optimization** - Process improvement and automation\n• **Client Communication** - Professional client relationship management\n• **Legal Research Support** - Comprehensive research assistance\n• **Compliance Management** - Regulatory and ethical compliance monitoring\n\n🚀 **What Sets Us Apart:**\n• AI-powered solutions (like me!) that learn and adapt\n• Experienced paralegal professionals with diverse expertise\n• Customizable solutions for firms of all sizes\n• 24/7 support and system monitoring\n• Proven track record of improving firm efficiency by 40%+\n• HIPAA and attorney-client privilege compliant systems\n\n💼 **Industries We Serve:**\n• Personal Injury Law\n• Corporate Law\n• Family Law\n• Criminal Defense\n• Real Estate Law\n• Employment Law\n• Immigration Law\n\nWould you like to learn more about how we can specifically help your practice area?";
    }
    
    // Handle help and support questions
    if (message.includes('help') || message.includes('support') || message.includes('assistance') || 
        message.includes('how can you help') || message.includes('what can you do') || 
        message.includes('capabilities') || message.includes('features')) {
      return "🤝 I'm here to provide comprehensive support for all your legal operations needs! As ARDI Version 2, I offer extensive capabilities designed to transform your legal practice.\n\n🛠️ **How I Can Help You:**\n\n**📋 Case Management:**\n• Organize and track cases from intake to resolution\n• Automate workflow processes and task assignments\n• Monitor case progress and generate reports\n\n**📄 Document Management:**\n• Intelligent document organization and categorization\n• Template creation and management\n• Version control and collaboration tools\n\n**⏰ Schedule & Deadline Management:**\n• Critical date tracking with automated reminders\n• Court calendar integration\n• Conflict checking and resolution\n\n**👥 Client Relations:**\n• Communication templates and automation\n• Client portal management\n• Satisfaction tracking and improvement\n\n**💡 Strategic Guidance:**\n• Workflow optimization recommendations\n• Best practice implementation\n• Technology integration planning\n• Efficiency improvement strategies\n\n**📊 Analytics & Reporting:**\n• Performance metrics and insights\n• Financial analysis and projections\n• Productivity measurements\n\n🎯 **Getting Started:**\nSimply tell me about your specific challenges or goals, and I'll provide tailored recommendations and step-by-step guidance. Whether you're looking to implement new systems or optimize existing processes, I'm here to help!\n\nWhat area would you like to focus on first?";
    }
    
    // Handle pricing and cost questions
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || 
        message.includes('expensive') || message.includes('affordable') || message.includes('budget') || 
        message.includes('fee structure') || message.includes('how much')) {
      return "💼 I understand that cost is an important consideration for any legal technology investment. At Ardent Paralegal Business Solutions Inc, we believe in transparent, value-based pricing that delivers measurable ROI.\n\n💰 **Our Pricing Philosophy:**\n• **Value-Based** - You pay for results, not just features\n• **Scalable** - Solutions that grow with your practice\n• **Transparent** - No hidden fees or surprise charges\n• **ROI-Focused** - Designed to pay for itself through efficiency gains\n\n📊 **Typical ROI Metrics Our Clients See:**\n• 40-60% reduction in administrative time\n• 25-35% improvement in billing accuracy\n• 50-70% faster document retrieval\n• 30-45% better deadline compliance\n• 20-30% increase in client satisfaction scores\n\n🎯 **Flexible Options:**\n• **Per-user licensing** for growing firms\n• **Enterprise packages** for large organizations\n• **Module-based pricing** - pay only for what you need\n• **Trial periods** - test before you commit\n• **Implementation support** included in all packages\n\n💡 **Cost Considerations:**\nMost firms find that our solutions pay for themselves within 3-6 months through improved efficiency and reduced overhead. We'd be happy to provide a customized quote based on your specific needs and firm size.\n\nWould you like me to connect you with our pricing specialists for a detailed consultation?";
    }
    
    // Handle security and compliance questions
    if (message.includes('security') || message.includes('privacy') || message.includes('compliance') || 
        message.includes('confidential') || message.includes('secure') || message.includes('hipaa') || 
        message.includes('data protection') || message.includes('encryption')) {
      return "🔐 Security and compliance are absolutely paramount in legal practice! At Ardent Paralegal Business Solutions Inc, we've implemented enterprise-grade security measures to protect your sensitive legal data.\n\n🛡️ **Security Infrastructure:**\n• **End-to-End Encryption** - Military-grade AES-256 encryption\n• **Zero-Trust Architecture** - Verify every access request\n• **Multi-Factor Authentication** - Advanced access controls\n• **Regular Security Audits** - Third-party penetration testing\n• **SOC 2 Type II Compliance** - Rigorous security standards\n• **24/7 Security Monitoring** - Real-time threat detection\n• **Secure Data Centers** - Tier IV certified facilities\n\n⚖️ **Legal Compliance:**\n• **Attorney-Client Privilege** - Fully compliant systems\n• **HIPAA Compliance** - For healthcare-related legal matters\n• **State Bar Requirements** - Meets all jurisdictional standards\n• **International Standards** - GDPR and other privacy regulations\n• **Ethical Rules Compliance** - Model Rules of Professional Conduct\n\n🔒 **Data Protection Measures:**\n• **Regular Backups** - Multiple redundant backup systems\n• **Disaster Recovery** - Comprehensive business continuity plans\n• **Access Controls** - Role-based permissions and audit trails\n• **Data Retention Policies** - Compliant data lifecycle management\n• **Incident Response** - Rapid response to any security events\n\n📋 **Compliance Certifications:**\n• ISO 27001 Information Security Management\n• SOC 2 Type II for Service Organizations\n• SSAE 18 Attestation Standards\n• State Bar Technology Requirements\n\nYour data security is our top priority. Would you like more details about any specific security aspect?";
    }
    
    // Handle training and implementation questions
    if (message.includes('training') || message.includes('implementation') || message.includes('setup') || 
        message.includes('getting started') || message.includes('onboarding') || message.includes('learn') || 
        message.includes('tutorial') || message.includes('guide')) {
      return "🎓 Successful implementation and training are crucial for maximizing your investment in legal technology! We provide comprehensive support to ensure your team achieves proficiency quickly and confidently.\n\n📚 **Training Programs:**\n• **Initial Implementation Training** - Comprehensive system setup and configuration\n• **User Role-Specific Training** - Tailored to attorneys, paralegals, and staff\n• **Advanced Feature Workshops** - Deep dives into specialized capabilities\n• **Ongoing Education** - Regular updates and new feature training\n• **Custom Training Materials** - Personalized guides for your workflows\n• **Certification Programs** - Validate user competency levels\n\n🚀 **Implementation Process:**\n**Week 1-2: Planning & Setup**\n• System configuration and customization\n• Data migration and integration\n• Security setup and user provisioning\n\n**Week 3-4: Training & Testing**\n• Comprehensive user training sessions\n• Workflow testing and refinement\n• Parallel system operation\n\n**Week 5-6: Go-Live & Support**\n• Full system deployment\n• Intensive support during transition\n• Performance monitoring and optimization\n\n💡 **Training Formats:**\n• **Live Virtual Sessions** - Interactive group training\n• **On-Site Training** - In-person intensive workshops\n• **Self-Paced Modules** - Online learning at your convenience\n• **One-on-One Coaching** - Personalized skill development\n• **Video Tutorials** - Step-by-step visual guides\n• **Documentation Library** - Comprehensive reference materials\n\n🎯 **Success Metrics:**\n• 95% user adoption rate within 30 days\n• 80% efficiency improvement within 60 days\n• 24/7 support availability during implementation\n• Dedicated implementation specialist assigned\n\nWhat specific training needs does your team have?";
    }

    // Handle account-related questions
    if (message.includes('accounts') || message.includes('clients') || message.includes('account') || 
        message.includes('how many accounts') || message.includes('what accounts') || 
        message.includes('speak easy') || message.includes('bdj') || message.includes('client accounts')) {
      return "🏦 **Ardent Client Accounts**\n\nArdent Paralegal Business Solutions manages multiple specialized client accounts, each with tailored legal services and case management support.\n\n📋 **Key Client Accounts:**\n\n🗣️ **Speak Easy Account**\n• Specialized communication and client relations\n• Streamlined case management processes\n• Training Period: 1 day\n\n⚖️ **BDJ Account**\n• Comprehensive legal support services\n• Role-specific training and procedures\n• Training Period: Depends on the specific role\n\n🏥 **Medical Records Account**\n• Specialized medical documentation handling\n• HIPAA-compliant record management\n• Training Period: 1-3 weeks\n\n📊 **Account Management:**\n• Each account has customized workflows\n• Specialized training programs for different roles\n• Dedicated support teams per account\n• Account-specific quality assurance protocols\n\n💼 **Services Across All Accounts:**\n• Case Manager Assistant (CMA) support\n• Document organization and management\n• Client communication coordination\n• Deadline tracking and compliance monitoring\n• Legal research and paralegal services\n\nEach account receives personalized attention with services tailored to their specific legal practice needs and client requirements.";
    }
    
    // Handle competitive comparison questions
    if (message.includes('compare') || message.includes('competition') || message.includes('alternative') || 
        message.includes('vs') || message.includes('versus') || message.includes('better than') || 
        message.includes('different from') || message.includes('why choose')) {
      return "🏆 Great question! Understanding your options is important for making the right technology decision. Here's what sets Ardent Paralegal Business Solutions Inc apart from other legal technology providers:\n\n⭐ **Our Unique Advantages:**\n\n**🤖 AI-Powered Intelligence:**\n• Advanced AI like me (ARDI) that learns your workflows\n• Predictive analytics for case outcomes and scheduling\n• Intelligent document analysis and categorization\n\n**🎯 Paralegal Expertise:**\n• Built by experienced paralegals for legal professionals\n• Deep understanding of real-world legal workflows\n• Industry-specific solutions, not generic business software\n\n**🔗 Seamless Integration:**\n• Works with your existing software investments\n• No disruptive migrations or system replacements\n• Enhances rather than replaces your current tools\n\n**📞 Superior Support:**\n• 24/7 support with legal industry expertise\n• Dedicated account management\n• Free ongoing training and updates\n\n**💰 Proven ROI:**\n• Average 40-60% efficiency improvement\n• Faster implementation (weeks, not months)\n• Lower total cost of ownership\n\n**🔒 Security Leadership:**\n• Purpose-built for legal confidentiality requirements\n• Exceeds industry security standards\n• Compliance with all major legal regulations\n\n**📊 Key Differentiators vs. Competitors:**\n• **More Legal-Specific** than generic business tools\n• **Faster Implementation** than enterprise solutions\n• **Better Support** than self-service platforms\n• **Higher ROI** than traditional practice management\n• **More Intelligent** than static document management\n\nWhat specific capabilities are most important for your evaluation?";
    }
    
    // Handle troubleshooting and technical support
    if (message.includes('problem') || message.includes('issue') || message.includes('error') || 
        message.includes('not working') || message.includes('bug') || message.includes('trouble') || 
        message.includes('fix') || message.includes('support ticket')) {
      return "🛠️ I'm here to help resolve any technical issues you're experiencing! Our support team is equipped to handle everything from simple questions to complex technical challenges.\n\n🚨 **Immediate Support Options:**\n• **Live Chat** - Instant support with technical specialists\n• **Phone Support** - Direct line to our expert team\n• **Screen Sharing** - Real-time problem resolution\n• **Emergency Support** - 24/7 critical issue response\n\n🔧 **Common Issue Resolution:**\n\n**Login/Access Problems:**\n• Password reset and account recovery\n• Multi-factor authentication setup\n• User permission adjustments\n\n**Performance Issues:**\n• System optimization recommendations\n• Cache clearing and browser troubleshooting\n• Network connectivity diagnostics\n\n**Integration Challenges:**\n• Third-party software connectivity\n• Data synchronization problems\n• API configuration support\n\n**Feature Questions:**\n• Workflow setup assistance\n• Advanced feature training\n• Custom configuration guidance\n\n📋 **Support Ticket Process:**\n1. **Report Issue** - Detailed problem description\n2. **Priority Assignment** - Critical, high, medium, or low\n3. **Expert Assignment** - Specialized technician assigned\n4. **Resolution & Follow-up** - Complete solution with prevention tips\n\n⏱️ **Response Times:**\n• **Critical Issues**: 15 minutes\n• **High Priority**: 2 hours\n• **Medium Priority**: 8 hours\n• **General Questions**: 24 hours\n\n🎯 **Pro Tips for Faster Resolution:**\n• Provide specific error messages\n• Include screenshots when possible\n• Describe steps that led to the issue\n• Mention your browser and operating system\n\nWhat specific issue are you experiencing? I can help troubleshoot or connect you with the right specialist!";
    }
    
    // Handle general questions and expressions of interest
    if (message.includes('interesting') || message.includes('tell me more') || 
        message.includes('sounds good') || message.includes('impressive') || 
        message.includes('learn more') || message.includes('more information')) {
      const engagementResponses = [
        "🌟 I'm delighted you're interested! Legal technology is evolving rapidly, and AI-powered solutions like our ARDI system are transforming how law firms operate. The integration of intelligent automation with human expertise creates unprecedented opportunities for efficiency and client service excellence.\n\nWhat specific aspect would you like to explore deeper? Whether it's case management workflows, document automation, client communication systems, or financial management - I can provide detailed insights tailored to your interests and needs.",
        "✨ Wonderful! The future of legal practice lies in the thoughtful integration of AI and human expertise. At Ardent Paralegal Business Solutions Inc, we're pioneering this integration to create solutions that don't just digitize existing processes, but fundamentally improve how legal work gets done.\n\nI'd love to share more about how our approach differs from traditional legal software. We focus on understanding the nuances of legal workflows and building intelligence that truly supports legal professionals rather than just storing data.\n\nWhat area of legal practice would you like to see revolutionized through better technology?"
      ];
      return engagementResponses[Math.floor(Math.random() * engagementResponses.length)];
    }
    
    // Handle acknowledgment and follow-up responses
    if (message.includes('okay') || message.includes('ok') || message.includes('alright') || message.includes('got it') || 
        message.includes('thank you') || message.includes('thanks') || message.includes('appreciate') ||
        message.includes('thats nice') || message.includes('that\'s nice') || message.includes('sounds good') || 
        message.includes('perfect') || message.includes('great') || message.includes('awesome') || 
        message.includes('cool') || message.includes('nice') || message.includes('good to know') ||
        message === 'yes' || message === 'no' || message.includes('i see') || message.includes('understood')) {
      
      const followUpResponses = [
        "😊 You're very welcome! Is there anything else I can help you with today? Whether it's case management strategies, document organization best practices, client communication optimization, or any other aspect of legal operations, I'm here to provide detailed guidance and support! 🤝",
        "✨ Glad I could provide helpful information! Feel free to ask me anything else about our AI-powered case management solutions, workflow automation, legal technology integration, or how ARDI can transform your daily legal operations at Ardent Paralegal Business Solutions Inc. 💼",
        "🎉 Happy to assist! If you have any other questions about advanced case management features, deadline tracking systems, client portal functionality, document automation, or legal research support, just let me know! I'm always ready to dive deep into any topic. 📋",
        "👍 Perfect! Is there anything else you'd like to explore about ARDI's AI capabilities, our comprehensive paralegal services, workflow optimization strategies, or how we can help streamline your specific legal practice area? I'm equipped with extensive knowledge to help! 🚀",
        "😄 Excellent! Don't hesitate to reach out if you need guidance on legal technology implementation, best practices for law firm efficiency, client relationship management, financial tracking, or any other operational challenges. That's exactly what I'm designed for! ⚖️",
        "🌟 Wonderful! If you think of any other questions about case management innovations, legal workflow automation, paralegal support services, technology integration, or strategic practice development, feel free to ask anytime! I love discussing legal technology solutions. 💡",
        "🤗 You're most welcome! Remember, I'm always available to help with complex case management challenges, legal process optimization questions, technology implementation planning, or anything related to modern legal practice management. What else can I explore with you? 📚"
      ];
      
      return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
    }
    
    // Handle very brief responses with shorter follow-ups
    if (message.trim().length <= 10 && (message.includes('yep') || message.includes('yeah') || 
        message.includes('sure') || message.includes('right') || message.includes('indeed') ||
        message === 'ok' || message === 'okay' || message === 'yes' || message === 'no')) {
      
      const briefFollowUps = [
        "👍 Anything else I can help with today? 😊",
        "✨ Got another legal technology question for me? 🤔",
        "🚀 What other aspects of case management can ARDI assist you with? 💼",
        "😄 Is there something else about our services you'd like to explore? 📚",
        "🌟 Feel free to ask me anything about legal workflow optimization! 💡",
        "🎯 Any other questions about our AI-powered solutions? ⚖️"
      ];
      
      return briefFollowUps[Math.floor(Math.random() * briefFollowUps.length)];
    }
    
    // Handle lien negotiation questions
    if (message.includes('lien negotiation') || message.includes('medical lien') || message.includes('lien resolution') || 
        message.includes('negotiate lien') || message.includes('lien settlement') || message.includes('medical bill lien')) {
      return "💰 Lien negotiation is a critical component of personal injury case resolution that can significantly impact client recovery! ARDI provides specialized tools to streamline this complex process.\n\n🏥 **Lien Negotiation Management:**\n• **Lien Holder Tracking** - Comprehensive database of medical providers, insurance companies, and government agencies\n• **Lien Analysis Tools** - Automated calculation of lien amounts and priority rankings\n• **Negotiation History** - Complete record of all communication and settlement attempts\n• **Settlement Tracking** - Monitor payment schedules and lien reductions\n• **Document Management** - Organize lien letters, medical bills, and correspondence\n• **Deadline Monitoring** - Critical dates for lien resolution and payment\n• **Client Communication** - Automated updates on lien negotiation progress\n\n📋 **Advanced Features:**\n• **Lien Priority Analysis** - Determine which liens take precedence\n• **Reduction Calculations** - Built-in tools for lien reduction percentages\n• **Payment Distribution** - Automated settlement allocation worksheets\n• **Compliance Monitoring** - Ensure all lien requirements are met\n• **Reporting Tools** - Generate lien status reports for clients\n\n⚖️ **Negotiation Strategies:**\n• Template letters for lien holder communication\n• Settlement offer tracking and comparison\n• Evidence organization for lien disputes\n• Expert witness coordination for complex liens\n• Court filing assistance for lien litigation\n\n💡 **Best Practices:**\n• Early lien identification and investigation\n• Regular communication with lien holders\n• Documentation of all negotiation attempts\n• Client education on lien implications\n• Strategic timing of lien resolution\n\nLien negotiation requires precision, persistence, and strategic thinking. How can I help optimize your lien management process?";
    }

    // Handle intake process questions
    if (message.includes('welcome letter') || message.includes('welcome letters') || 
        message.includes('letter of representation') || message.includes('lor') || 
        message.includes('preservation letter') || message.includes('preservation letters') ||
        message.includes('traffic collision report') || message.includes('traffic collision reports') ||
        message.includes('animal control report') || message.includes('animal control reports') ||
        message.includes('health insurance provider') || message.includes('health insurance providers') ||
        message.includes('intake process') || message.includes('intake procedures')) {
      return "📋 The intake process is the foundation of successful personal injury case management! ARDI provides comprehensive tools to streamline these critical initial steps.\n\n📬 **Welcome Letters & Initial Communications:**\n• **Welcome Letter Templates** - Professional, personalized welcome letters for new clients\n• **Automated Scheduling** - Send welcome packets with case information and next steps\n• **Client Portal Access** - Provide secure login credentials and case access\n• **Expectation Setting** - Clear communication about case timeline and process\n\n📄 **Letters of Representation (LOR):**\n• **Insurance Carrier Database** - Comprehensive list of all major insurance companies\n• **LOR Templates** - Professional templates for different types of cases\n• **Automated Sending** - Track delivery and receipt confirmations\n• **Follow-up System** - Automated reminders for non-responsive carriers\n• **Compliance Tracking** - Ensure all required notifications are sent\n\n🔒 **Preservation Letters:**\n• **Evidence Preservation** - Templates for preserving critical evidence\n• **Third-party Notifications** - Notify relevant parties about evidence preservation\n• **Compliance Monitoring** - Track preservation letter delivery and responses\n• **Legal Requirements** - Ensure all preservation requirements are met\n\n📊 **Report Requests:**\n• **Traffic Collision Reports** - Automated request system for police reports\n• **Animal Control Reports** - Specialized requests for animal-related incidents\n• **Report Tracking** - Monitor report delivery and processing status\n• **Document Management** - Organize and categorize all received reports\n\n🏥 **Health Insurance Notifications:**\n• **Provider Database** - Comprehensive health insurance provider information\n• **Notification Templates** - Professional notices to health insurance companies\n• **Lien Prevention** - Early communication to prevent surprise liens\n• **Compliance Tracking** - Ensure all required notifications are sent\n\n⚡ **ARDI Automation Features:**\n• **Batch Processing** - Send multiple letters simultaneously\n• **Template Customization** - Adapt templates for specific case types\n• **Delivery Tracking** - Confirm receipt and track responses\n• **Compliance Alerts** - Reminders for required notifications\n• **Document Organization** - Automatic filing and categorization\n\n💡 **Best Practices:**\n• Send welcome letters within 24 hours of case acceptance\n• Submit LORs to all identified insurance carriers immediately\n• Request reports as soon as case is opened\n• Maintain detailed records of all communications\n• Follow up on non-responsive parties\n\nWhat specific aspect of the intake process would you like to optimize?";
    }

    // Handle case type questions
    if (message.includes('what are the type o case') || message.includes('types of cases') || message.includes('case types') || 
        message.includes('what cases') || message.includes('kinds of cases') || message.includes('practice areas')) {
      return "📋 At Ardent Paralegal Business Solutions Inc, we provide comprehensive support across diverse legal practice areas! Here are the primary case types we specialize in:\n\n⚖️ **Personal Injury Cases:**\n• **Motor Vehicle Accidents** - Car, truck, motorcycle, and pedestrian accidents\n• **Medical Malpractice** - Surgical errors, misdiagnosis, and medical negligence\n• **Slip and Fall** - Premises liability and dangerous property conditions\n• **Product Liability** - Defective products and manufacturer negligence\n• **Workplace Accidents** - Construction injuries and workers' compensation\n• **Wrongful Death** - Fatal accident cases and family compensation\n\n👨‍👩‍👧‍👦 **Family Law Cases:**\n• **Divorce Proceedings** - Contested and uncontested divorces\n• **Child Custody** - Parenting time and decision-making authority\n• **Child Support** - Calculation and modification of support orders\n• **Spousal Support** - Alimony and maintenance agreements\n• **Property Division** - Asset and debt distribution\n• **Domestic Violence** - Protective orders and safety planning\n\n🏢 **Business & Corporate Law:**\n• **Contract Disputes** - Breach of contract and enforcement\n• **Business Formation** - LLC, corporation, and partnership setup\n• **Employment Law** - Discrimination, harassment, and wage disputes\n• **Intellectual Property** - Trademarks, copyrights, and patents\n• **Mergers & Acquisitions** - Business transactions and due diligence\n• **Regulatory Compliance** - Industry-specific legal requirements\n\n🛡️ **Criminal Defense:**\n• **DUI/DWI Cases** - Driving under the influence defense\n• **Assault & Battery** - Violent crime defense\n• **Drug Offenses** - Possession and distribution charges\n• **White Collar Crime** - Fraud, embezzlement, and financial crimes\n• **Juvenile Defense** - Minor criminal cases and rehabilitation\n• **Appeals** - Post-conviction relief and appellate work\n\n🏠 **Real Estate Law:**\n• **Residential Transactions** - Home buying and selling\n• **Commercial Real Estate** - Office buildings and retail properties\n• **Landlord-Tenant Disputes** - Eviction and lease violations\n• **Property Development** - Zoning and land use issues\n• **Title Disputes** - Ownership and boundary conflicts\n• **Foreclosure Defense** - Homeowner rights and loan modifications\n\n💼 **Other Specialized Areas:**\n• **Immigration Law** - Visas, citizenship, and deportation defense\n• **Estate Planning** - Wills, trusts, and probate administration\n• **Bankruptcy** - Chapter 7, 11, and 13 filings\n• **Employment Law** - Workplace discrimination and labor disputes\n• **Tax Law** - Tax planning and IRS dispute resolution\n\n🎯 **Our Approach:**\nEach practice area requires specialized knowledge and tailored case management strategies. ARDI adapts to your specific practice area, providing relevant templates, deadlines, and workflow optimizations.\n\nWhat specific practice area would you like to explore further? I can provide detailed insights into case management strategies for your specialty!";
    }

    // Handle abbreviation questions
    if (message.includes('abbreviations') || message.includes('abbreviation') || message.includes('acronyms') || 
        message.includes('what does') || message.includes('what is') || 
        message.includes('lor') || message.includes('nai') || message.includes('sol') || 
        message.includes('um') || message.includes('uim') || message.includes('cm') || 
        message.includes('pl') || message.includes('emc') || message.includes('emc2') || 
        message.includes('emc²') || message.includes('policy limits')) {
      return "📚 **Common Legal Abbreviations & Acronyms:**\n\n**📋 Case Management:**\n• **LOR** - Letters of Representation (formal notification to insurance carriers)\n• **NAI** - Next Action Items (essential tasks during treatment phase)\n• **CM** - Case Manager (professional who facilitates client care)\n\n**⏰ Legal Deadlines:**\n• **SOL** - Statute of Limitations (time limit for filing cases)\n\n**🛡️ Insurance Coverage:**\n• **UM** - Uninsured Motorist (coverage for uninsured drivers)\n• **UIM** - Underinsured Motorist (coverage for underinsured drivers)\n• **PL** - Policy Limits (maximum insurance coverage amounts)\n\n**📊 Case Evaluation:**\n• **EMC²** - E=MC² (case evaluation formula: Evidence × Medical × Coverage²)\n\n**💡 How to Use:**\nSimply type any of these abbreviations (like 'LOR', 'NAI', 'SOL', etc.) and I'll provide detailed information about that specific term!\n\n**Examples:**\n• Type 'LOR' for Letters of Representation details\n• Type 'NAI' for Next Action Items information\n• Type 'SOL' for Statute of Limitations guidance\n• Type 'UM' or 'UIM' for insurance coverage explanations\n• Type 'EMC²' for case evaluation formula details\n\nWhat abbreviation would you like to learn more about?";
    }

    // Handle questions about specific legal practice areas
    if (message.includes('personal injury') || message.includes('pi law') || message.includes('accident') || 
        message.includes('medical malpractice') || message.includes('slip and fall')) {
      return "⚖️ Personal injury law requires meticulous case management and documentation! ARDI is specifically designed to excel in PI practice management.\n\n🏥 **Personal Injury Case Management Features:**\n• **Medical Records Organization** - Intelligent categorization of medical documents\n• **Timeline Construction** - Automated incident and treatment timelines\n• **Damage Calculations** - Built-in tools for economic and non-economic damages\n• **Settlement Tracking** - Monitor negotiations and settlement offers\n• **Statute of Limitations Alerts** - Critical deadline management\n• **Expert Witness Management** - Contact database and scheduling\n• **Insurance Communication** - Template letters and documentation\n\n📋 **Documentation Excellence:**\n• Automated intake questionnaires\n• Medical record request templates\n• Police report integration\n• Photograph and evidence organization\n• Witness statement management\n\n💰 **Financial Management:**\n• Contingency fee calculations\n• Medical lien tracking\n• Expense monitoring and recovery\n• Settlement distribution worksheets\n\nPersonal injury cases often involve complex documentation and tight deadlines. How can I help optimize your PI practice workflows?";
    }
    
    if (message.includes('family law') || message.includes('divorce') || message.includes('custody') || 
        message.includes('child support') || message.includes('alimony') || message.includes('domestic')) {
      return "👨‍👩‍👧‍👦 Family law requires sensitive handling and comprehensive case management. ARDI provides specialized tools for family law practitioners to manage emotionally complex cases with professionalism and efficiency.\n\n💖 **Family Law Case Management:**\n• **Confidential Client Portals** - Secure communication for sensitive matters\n• **Financial Disclosure Tracking** - Asset and income documentation\n• **Custody Schedule Management** - Detailed parenting time tracking\n• **Support Calculation Tools** - Child and spousal support worksheets\n• **Court Calendar Integration** - Hearing and mediation scheduling\n• **Document Templates** - Pleadings, agreements, and motions\n• **Mediation Management** - Session scheduling and outcome tracking\n\n⚖️ **Specialized Features:**\n• Domestic violence case flagging and security protocols\n• Child welfare documentation and reporting\n• Property division worksheets and tracking\n• Temporary order management\n• Guardian ad litem coordination\n\n🤝 **Client Communication:**\n• Empathetic communication templates\n• Regular case status updates\n• Educational resources for clients\n• Crisis communication protocols\n\nFamily law cases require both technical precision and emotional intelligence. How can I help you provide better service to families in transition?";
    }
    
    if (message.includes('criminal law') || message.includes('criminal defense') || message.includes('dui') || 
        message.includes('assault') || message.includes('theft') || message.includes('felony')) {
      return "🛡️ Criminal defense requires rapid response, meticulous preparation, and strict deadline compliance. ARDI provides specialized tools for criminal defense attorneys to protect their clients' rights effectively.\n\n⚡ **Criminal Defense Case Management:**\n• **Arrest Timeline Tracking** - Critical timeframes from arrest to trial\n• **Discovery Management** - Police reports, evidence, and witness statements\n• **Plea Negotiation Tracking** - Offer history and decision documentation\n• **Bail and Bond Management** - Conditions monitoring and compliance\n• **Court Appearance Scheduling** - Never miss critical hearings\n• **Expert Witness Coordination** - Forensic and character witnesses\n• **Appeal Preparation Tools** - Issue identification and brief preparation\n\n🔍 **Evidence Management:**\n• Digital evidence organization and analysis\n• Witness interview documentation\n• Police report analysis and cross-referencing\n• Chain of custody tracking\n• Constitutional issue identification\n\n⏰ **Critical Deadline Management:**\n• Speedy trial calculations\n• Statute of limitations tracking\n• Appeal deadline monitoring\n• Motion filing deadlines\n• Discovery request timelines\n\n🛡️ **Client Protection:**\n• Jail communication logging\n• Bond violation alerts\n• Sentence calculation tools\n• Post-conviction relief tracking\n\nCriminal cases move quickly and stakes are high. How can I help you provide the strongest possible defense for your clients?";
    }
    
    if (message.includes('corporate law') || message.includes('business law') || message.includes('contract') || 
        message.includes('merger') || message.includes('acquisition') || message.includes('compliance')) {
      return "🏢 Corporate law demands precision, comprehensive documentation, and strategic oversight. ARDI provides enterprise-level tools for corporate legal departments and business law firms.\n\n📊 **Corporate Legal Management:**\n• **Contract Lifecycle Management** - From drafting to renewal tracking\n• **Corporate Governance** - Board resolutions and meeting minutes\n• **Compliance Monitoring** - Regulatory requirement tracking\n• **M&A Transaction Management** - Due diligence and closing coordination\n• **Intellectual Property Tracking** - Patents, trademarks, and copyrights\n• **Employment Law Compliance** - Policy updates and training tracking\n• **Risk Assessment Tools** - Legal risk identification and mitigation\n\n💼 **Business Operations Support:**\n• Entity formation and maintenance\n• Securities law compliance\n• Commercial transaction documentation\n• Vendor and supplier contract management\n• Real estate transaction coordination\n• Tax law compliance tracking\n\n📋 **Document Management:**\n• Corporate records organization\n• Contract template libraries\n• Version control for legal documents\n• Electronic signature integration\n• Regulatory filing automation\n\n🔍 **Strategic Analysis:**\n• Legal spend analysis and budgeting\n• Outside counsel management\n• Litigation hold and e-discovery\n• Regulatory change impact assessment\n\nCorporate law requires both detail orientation and strategic thinking. How can I help optimize your business legal operations?";
    }
    
    // Handle story requests
    if (message.includes('story') || message.includes('tell me a story') || message.includes('how ardent started') || 
        message.includes('ardent story') || message.includes('company story') || message.includes('how it began') ||
        message.includes('origin story') || message.includes('how we started') || message.includes('our story')) {
      
      const ardentStories = [
        "🌟 **The Ardent Story: A Journey of Friendship and Vision**\n\n**The Humble Beginning**\nArdent Paralegal Business Solutions began as a small team of 5-10 people, a tight-knit group of friends who decided to take their own path and start their own company. The founders, **Iran Salvado and Dominic Narag**, shared not just professional goals but a common vision of creating a workplace that valued both excellent service and employee well-being.\n\n**The First Client**\nWhen Ardent first launched, the company had only **one client** - a testament to the founders' belief in their mission and their confidence in the quality of their work. From a small office with minimal resources, the founding team worked tirelessly to establish a reputation for reliability, accuracy, and professionalism in the legal support industry.\n\n**What Set Us Apart**\nWhat set Ardent apart from the beginning was the **personal relationships** between team members. The founders fostered an environment where everyone feels like part of a family rather than just employees. This culture of mutual support and collaboration became the foundation for the company's growth and success.\n\n**The Early Days**\n- **Small Team** - Started with 5-10 close friends\n- **Single Client** - Began with just one client\n- **Minimal Resources** - Started from a small office\n- **Family Culture** - Built on personal relationships and mutual support\n\n**Key Principles Established**\n- **Quality First** - Commitment to excellence from day one\n- **Personal Touch** - Treating team members like family\n- **Client Focus** - Dedication to exceeding expectations\n- **Collaboration** - Working together for shared success\n\n**The Growth Journey**\nFrom its modest start, Ardent began to expand its client base through **word-of-mouth recommendations** and the growing reputation for excellence. Each new client brought new challenges and opportunities for the team to develop additional skills and services.\n\n**Today's Success**\nToday, Ardent has grown to **over 100 employees**, serving multiple clients across various legal specialties. Despite its growth, the company maintains the close-knit culture established by its founders. Team members continue to support each other professionally and personally, creating a work environment that promotes both individual development and collective success.\n\n**The Leadership**\nThe leadership of **Iran Salvado and Dominic Narag** continues to guide the company, with their vision and values embedded in every aspect of the operation. Their hands-on approach and accessibility to both clients and employees ensure that Ardent remains responsive to needs and opportunities.\n\n**The Legacy**\n'We started with a simple belief: that legal support should be both professional and personal,' Iran reflects. 'That's still what drives us every day.'",
        
        "🚀 **Ardent's Origin: From Vision to Reality**\n\n**The Problem That Started It All**\nIn the early days, the legal support industry was often impersonal and transactional. **Iran Salvado and Dominic Narag** saw an opportunity to create something different - a company that would combine professional excellence with genuine care for both clients and employees.\n\n**The Lightbulb Moment**\n'We wanted to build a company where people felt valued, not just employed,' Dominic recalls. 'We believed that happy employees would provide better service to clients, and that personal relationships would lead to better outcomes.'\n\n**The Garage Startup**\nWith minimal resources and maximum determination, the founding team of 5-10 friends started working from a small office. 'We had one client and a lot of confidence in our ability to deliver quality work,' Iran remembers. 'That was enough to get started.'\n\n**The First Client**\nTheir first client was a testament to their approach. 'We treated that first client like they were our only client,' Dominic explains. 'We gave them our full attention, our best work, and our personal commitment to their success.'\n\n**The Name 'Ardent'**\n'We chose 'Ardent' because it means passionate and enthusiastic,' Iran explains. 'We wanted to convey that we're not just another service company - we're passionate about helping legal professionals succeed while creating a positive environment for our team.'\n\n**The Growth Strategy**\nAs word spread about their quality work and personal approach, Ardent began to grow through **word-of-mouth recommendations**. Each new client brought new opportunities to expand services and develop additional skills.\n\n**The Technology Investment**\nThe company invested in **technology and processes** to improve efficiency without sacrificing the personal touch that clients had come to expect. This balance of technological advancement and human expertise has remained a key component of Ardent's approach to service delivery.\n\n**The Impact Today**\nToday, Ardent helps manage thousands of cases across the country. 'Every time I see our team working together, supporting each other, and delivering excellent results for our clients, it reminds me why we started this journey,' Dominic says.\n\n**The Future Vision**\n'We're not just building a company,' Iran reflects. 'We're building a community of professionals who care about each other and about serving our clients with excellence. That's the Ardent way.'",
        
        "💼 **The Ardent Journey: Where Friendship Meets Excellence**\n\n**The Early Days**\nIt all began with a simple idea: what if we could create a legal support company that treated its employees like family while delivering exceptional service to clients? **Iran Salvado and Dominic Narag** believed this was possible, and they set out to prove it.\n\n**The Vision**\nThe duo envisioned a future where legal professionals could focus on what they do best: helping clients. 'We wanted to create an environment where people felt supported, valued, and motivated to do their best work,' Dominic explains.\n\n**The First Steps**\nWorking with a small team of 5-10 close friends, they started with just **one client**. 'We treated that client like they were our only client,' Iran remembers. 'We gave them our full attention, our best work, and our personal commitment to their success.'\n\n**The Breakthrough**\nTheir approach worked. The first client was so impressed with the quality of work and personal attention that they began referring other clients. 'Word-of-mouth became our best marketing tool,' Dominic recalls.\n\n**The Growth**\nAs the workload increased, so did the Ardent family. **Careful recruitment** ensured that new team members shared the company's values and commitment to quality. Training programs were developed to maintain consistent standards across the growing organization.\n\n**The Culture**\nDespite growth, Ardent maintains the **close-knit culture** established by its founders. Team members continue to support each other professionally and personally, creating a work environment that promotes both individual development and collective success.\n\n**The Services**\nToday, Ardent offers comprehensive legal support services including:\n- **Legal Document Preparation** - Drafting and formatting legal documents\n- **Case Management** - Litigation support and organization\n- **Legal Research** - Analysis and research support\n- **E-Discovery** - Document management and discovery\n- **Corporate Services** - Business legal support\n- **Real Estate** - Transaction assistance\n\n**The Mission Today**\nNow serving multiple clients across various legal specialties, Ardent continues to innovate while maintaining the quality and personal attention that have been the hallmarks of its success.\n\n**The Future**\n'We're just getting started,' Iran reflects. 'The future of legal support is about combining human compassion with professional excellence. That's the Ardent way.'"
      ];
      
      return ardentStories[Math.floor(Math.random() * ardentStories.length)];
    }

    // Handle general inquiries and complex questions
    if (message.includes('how') || message.includes('what') || message.includes('why') || 
        message.includes('when') || message.includes('where') || message.includes('can you')) {
      const detailedResponses = [
        "🤔 That's an excellent question that deserves a thoughtful response! As ARDI (Ardent Knowledge Database Intelligence), I'm designed to provide comprehensive guidance on legal technology and case management solutions.\n\nTo give you the most helpful and specific answer, could you tell me a bit more about your particular situation or what specific aspect you're most interested in? Whether it's:\n\n• Implementation strategies and timelines\n• Integration with existing systems\n• Best practices for your practice area\n• Cost-benefit analysis and ROI projections\n• Training and change management\n• Technical specifications and requirements\n\nI have extensive knowledge across all these areas and can provide detailed, actionable insights tailored to your needs. What would be most valuable to discuss first?",
        "💡 I appreciate your inquiry! The world of legal technology and case management is quite extensive, and I want to make sure I provide you with the most relevant and useful information.\n\nAs your AI legal operations consultant, I can dive deep into topics like:\n\n• Advanced workflow automation strategies\n• Document management best practices\n• Client communication optimization\n• Financial management and billing efficiency\n• Compliance and security protocols\n• Integration planning and execution\n• Performance metrics and analytics\n\nTo ensure I give you the most valuable insights, could you share what specific challenge or opportunity you're focusing on? I'm equipped to provide detailed analysis and step-by-step guidance for virtually any legal operations question."
      ];
      return detailedResponses[Math.floor(Math.random() * detailedResponses.length)];
    }
    
    // Handle negative or skeptical responses
    if (message.includes('not sure') || message.includes('skeptical') || message.includes('doubt') || 
        message.includes('concerned') || message.includes('worried') || message.includes('hesitant')) {
      return "🤝 I completely understand your hesitation - adopting new legal technology is a significant decision that affects your entire practice and client relationships. Your skepticism shows good judgment!\n\n✅ **Common Concerns I Can Address:**\n• **Data Security** - How do we protect sensitive client information?\n• **Learning Curve** - Will this disrupt our current operations?\n• **Cost Justification** - Will the benefits outweigh the investment?\n• **Integration Challenges** - How does this work with our existing systems?\n• **Client Impact** - How will this affect client service?\n• **Compliance Issues** - Does this meet all regulatory requirements?\n\n🛡️ **Our Risk-Mitigation Approach:**\n• **Pilot Programs** - Test with a limited scope before full implementation\n• **Gradual Rollouts** - Phase implementation to minimize disruption\n• **Comprehensive Training** - Ensure team confidence before go-live\n• **24/7 Support** - Always available during transition periods\n• **Money-Back Guarantees** - Stand behind our solutions\n• **Reference Clients** - Speak with firms similar to yours\n\n📊 **Proven Track Record:**\n• 95% client satisfaction rating\n• Average 40% efficiency improvement\n• Zero data security incidents\n• 30-day average time to full adoption\n\nWhat specific concerns can I help address? I'd rather have an honest conversation about potential challenges than gloss over them.";
    }
    
    // Handle /Questions command to show all available questions
    if (message.includes('/questions') || message.includes('/Questions')) {
      return "📋 **All Available Questions for ARDI:**\n\n**🏢 Company Information:**\n• Who is Ardent? / What is Ardent?\n• Tell me about Ardent's founders (Iran Salvado and Dominic Narag)\n• How did Ardent start? / Ardent story\n• What is Ardent's company culture?\n• How big is Ardent today? (Over 100 employees)\n• What services does Ardent provide?\n• What is Ardent's vision for the future?\n\n**🤖 ARDI Information:**\n• What is ARDI? / Who are you?\n• What does ARDI stand for? (Ardent Knowledge Database Intelligence)\n• What version of ARDI are you? (Version 2)\n• What can ARDI help with?\n• How can ARDI assist me?\n\n**📋 Case Management:**\n• How does case management work?\n• What are case management features?\n• How to organize legal cases?\n\n**📄 Document Management:**\n• How to manage legal documents?\n• What is document organization?\n• How to organize legal files?\n\n**⏰ Deadline Management:**\n• How to track legal deadlines?\n• What is deadline management?\n• How to manage court dates?\n\n**💬 Client Communication:**\n• How to communicate with clients?\n• What is client relationship management?\n• How to improve client communication?\n\n**💰 Billing & Financial:**\n• How to manage legal billing?\n• What is time tracking?\n• How to handle legal accounting?\n\n**🔒 Security & Compliance:**\n• How secure is the system?\n• What about data privacy?\n• How to ensure compliance?\n\n**📚 Legal Research:**\n• How to conduct legal research?\n• What research tools are available?\n• How to organize research findings?\n\n**💻 Technology Integration:**\n• How to integrate with existing software?\n• What technology features are available?\n• How to implement new systems?\n\n**🎓 Training & Implementation:**\n• How to get started?\n• What training is available?\n• How long does implementation take?\n\n**📊 Pricing & ROI:**\n• What are the costs?\n• How to calculate ROI?\n• What is the pricing structure?\n\n**🏆 Competitive Analysis:**\n• How does Ardent compare to others?\n• What makes Ardent different?\n• Why choose Ardent?\n\n**🛠️ Technical Support:**\n• How to get technical help?\n• What if something doesn't work?\n• How to report issues?\n\n**📋 Intake Process:**\n• How to send welcome letters?\n• What are LOR templates?\n• How to request traffic collision reports?\n• How to handle preservation letters?\n• How to notify health insurance providers?\n• What is the intake process?\n\n**💰 Lien Negotiation:**\n• How to negotiate medical liens?\n• What is lien management?\n• How to handle lien resolution?\n\n**📖 Story Requests:**\n• Tell me a story\n• How did Ardent start?\n• What's the company story?\n• Tell me about Ardent's origin\n\n**💡 General Questions:**\n• How can you help me?\n• What are your capabilities?\n• What can you do?\n\nSimply ask any of these questions, and I'll provide detailed, helpful responses!";
    }

    // Default responses for unrecognized inputs - more comprehensive and helpful
    const advancedDefaultResponses = [
      "🌟 Thank you for reaching out! As ARDI (Ardent Knowledge Database Intelligence), I'm here to help you navigate the complex world of legal case management and workflow optimization.\n\nI notice your question touches on an area where I can provide substantial value. Let me offer some context that might be helpful:\n\n**📋 Case Management Excellence:**\nModern legal practice demands sophisticated organization, and I specialize in helping firms implement AI-powered solutions that dramatically improve efficiency while maintaining the highest standards of client service.\n\n**🎯 Areas Where I Excel:**\n• Workflow analysis and optimization recommendations\n• Technology integration planning and execution\n• Best practice implementation across practice areas\n• Performance measurement and improvement strategies\n\nCould you share more details about your specific situation or goals? I'd love to provide targeted insights that address your unique needs and challenges.",
      
      "💡 I appreciate you bringing this question to me! As your AI legal operations consultant, I'm designed to help solve complex challenges in legal practice management.\n\nWhile I want to make sure I understand your specific needs correctly, let me share some relevant insights that might be valuable:\n\n**⚡ Modern Legal Challenges:**\nToday's legal professionals face unprecedented pressure to deliver exceptional client service while managing increased caseloads, complex regulations, and evolving technology landscape.\n\n**🚀 How ARDI Helps:**\n• **Intelligent Automation** - Reduce time spent on routine tasks\n• **Strategic Insights** - Data-driven decision making\n• **Workflow Optimization** - Streamline complex processes\n• **Client Experience Enhancement** - Improve satisfaction and retention\n\nWhat specific aspect of your legal operations would you like to explore or improve? I can provide detailed guidance tailored to your practice area and current challenges.",
      
      "🤖 Excellent question! I'm ARDI Version 2, and I'm passionate about helping legal professionals leverage technology to achieve better outcomes for their clients and their practices.\n\nBased on your inquiry, I sense there's an opportunity to explore how modern AI and intelligent automation can transform legal workflows. Here's what I'd like you to consider:\n\n**📊 The Current Legal Landscape:**\n• Increasing client expectations for responsiveness and transparency\n• Growing complexity in legal regulations and compliance requirements\n• Pressure to improve efficiency without compromising quality\n• Need for better work-life balance for legal professionals\n\n**🎯 Strategic Solutions:**\nAt Ardent Paralegal Business Solutions Inc, we've developed comprehensive approaches that address these challenges through intelligent technology integration and expert paralegal support.\n\nTo provide the most valuable assistance, could you help me understand:\n• What's your current biggest operational challenge?\n• Which aspects of your practice feel most time-consuming?\n• What would success look like for your firm?\n\nLet's work together to identify specific solutions that can make a real difference!",
      
      "✨ Thank you for that question! I'm always excited to discuss how innovative legal technology can transform traditional practice management approaches.\n\nYour inquiry touches on something I'm particularly passionate about - the intersection of artificial intelligence and legal expertise. As ARDI, I represent the next generation of legal technology that doesn't just store information, but actively helps legal professionals make better decisions and serve clients more effectively.\n\n**🏛️ The Evolution of Legal Practice:**\nWe're in an exciting time where technology can finally match the sophistication and nuance required for legal work. This isn't about replacing human judgment - it's about amplifying human capabilities.\n\n**🔍 Key Areas of Innovation:**\n• **Predictive Analytics** - Anticipate case outcomes and timeline challenges\n• **Intelligent Document Analysis** - Extract insights from complex legal documents\n• **Automated Workflow Management** - Ensure nothing falls through the cracks\n• **Enhanced Client Communication** - Maintain transparency and trust\n\n**💼 Practical Implementation:**\nThe key is thoughtful integration that respects the unique requirements of legal practice while delivering measurable improvements in efficiency and client satisfaction.\n\nWhat aspects of legal innovation are you most curious about? I'd love to explore specific applications that could benefit your practice!"
    ];
    
    // Check if the message is not recognized by any existing patterns
    const hasRecognizedPattern = 
      message.includes('hello') || message.includes('hi') || message.includes('hey') ||
      message.includes('what are you') || message.includes('who are you') ||
      message.includes('what does ardi stand for') || message.includes('ardi acronym') ||
      message.includes('what version') || message.includes('version of ardi') ||
      message.includes('case management') || message.includes('manage cases') ||
      message.includes('document') || message.includes('file') ||
      message.includes('deadline') || message.includes('schedule') ||
      message.includes('client') || message.includes('communication') ||
      message.includes('billing') || message.includes('invoice') ||
      message.includes('ardent') || message.includes('paralegal') ||
      message.includes('help') || message.includes('support') ||
      message.includes('price') || message.includes('cost') ||
      message.includes('security') || message.includes('privacy') ||
      message.includes('training') || message.includes('implementation') ||
      message.includes('compare') || message.includes('competition') ||
      message.includes('problem') || message.includes('issue') ||
      message.includes('interesting') || message.includes('tell me more') ||
      message.includes('okay') || message.includes('ok') ||
      message.includes('lien negotiation') || message.includes('medical lien') ||
      message.includes('welcome letter') || message.includes('lor') ||
      message.includes('story') || message.includes('tell me a story') ||
      message.includes('how') || message.includes('what') || message.includes('why');

    // Handle unknown questions with better response
    if (!hasRecognizedPattern) {
      return "📚 **Knowledge Base Update Request**\n\nI apologize, but I don't currently have information about that specific topic in my knowledge base. As of now, that is not on our knowledge base.\n\n**🔧 How to Get Help:**\nPlease message our IT team for that so they can add it to my knowledge base. This will help me provide you with accurate and helpful information in the future.\n\n**📞 Contact Information:**\n• **IT Support**: Please reach out to our technical team\n• **Subject**: Knowledge Base Addition Request\n• **Include**: Your specific question or topic\n\n**💡 In the meantime, you can:**\n• Try asking a different question from my available topics\n• Type `/Questions` to see all available questions I can answer\n• Contact our support team for immediate assistance\n\nI'm constantly learning and expanding my knowledge base to better serve you!";
    }
    
    return advancedDefaultResponses[Math.floor(Math.random() * advancedDefaultResponses.length)];
  };

  // Auto-scroll to show newest conversation at the top
  const scrollToNewest = useCallback(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      const container = messagesContainerRef.current;
      const allMessageElements = container.querySelectorAll('.message-item');
      
      if (allMessageElements.length >= 2) {
        // Find the newest conversation (last user message and ARDI response)
        const newestConversationStart = allMessageElements.length - 2;
        const targetElement = allMessageElements[newestConversationStart];
        const lastElement = allMessageElements[allMessageElements.length - 1];
        
        if (targetElement && lastElement) {
          const lastElementHeight = (lastElement as HTMLElement).offsetHeight;
          const containerHeight = container.clientHeight;
          const scrollHeight = container.scrollHeight;
          
          // For very long responses, always scroll to bottom to show the latest content
          if (lastElementHeight > containerHeight * 0.6) {
            // Scroll to bottom for long responses
            container.scrollTo({
              top: scrollHeight,
              behavior: 'smooth'
            });
          } else {
            // For normal responses, scroll to show the conversation at the top
            const targetOffsetTop = (targetElement as HTMLElement).offsetTop;
            const idealScrollTop = Math.max(0, targetOffsetTop - 200);
            container.scrollTo({
              top: idealScrollTop,
              behavior: 'smooth'
            });
          }
        }
      } else if (allMessageElements.length === 1) {
        // For first message, scroll to top
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [messages.length]);
 

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'user') {
        // New user message - scroll to show it at the top
        setTimeout(() => scrollToNewest(), 100);
      } else if (lastMessage.sender === 'ardi' && !typingMessageId) {
        // ARDI response completed - scroll to show complete conversation at top
        setTimeout(() => scrollToNewest(), 200);
      }
    }
  }, [messages, scrollToNewest, typingMessageId]);

  // Auto-scroll during typing to keep conversation visible
  useEffect(() => {
    if (typingMessageId !== null) {
      const scrollInterval = setInterval(() => {
        scrollToNewest();
      }, 100); // Very frequent scrolling for long responses
      
      return () => clearInterval(scrollInterval);
    }
  }, [typingMessageId, scrollToNewest]);

  const typeWriterEffect = (messageId: number, fullText: string) => {
    setTypingMessageId(messageId);
    setDisplayedText(prev => ({ ...prev, [messageId]: '' }));
    setCanSendMessage(false); // Disable sending new messages while responding
    let currentIndex = 0;
    let stopped = false;
    let isThinking = false;
    
    // Provide a stop function
    setStopTyping(() => () => {
      stopped = true;
      setDisplayedText(prev => ({ ...prev, [messageId]: fullText }));
      setTypingMessageId(null);
      setIsTyping(false);
      setIsResponding(false);
      setCanSendMessage(true); // Re-enable sending messages
      setStopTyping(null);
      // Final scroll to ensure optimal position when typing is stopped
      setTimeout(() => scrollToNewest(), 50);
    });
    
    // Function to get the next letter or small chunk for realistic typing
    const getNextChunk = (text: string, currentPos: number) => {
      if (currentPos >= text.length) return '';
      
      const remainingText = text.slice(currentPos);
      
      // For very realistic typing, we'll type letter by letter most of the time
      // But occasionally type small words or punctuation for natural flow
      
      // Check for complete words (3-5 letters) occasionally
      if (Math.random() < 0.3) { // 30% chance to type a small word
        const wordMatch = remainingText.match(/^([a-zA-Z]{2,4})\b/);
        if (wordMatch) return wordMatch[0];
      }
      
      // Check for punctuation marks
      const punctuationMatch = remainingText.match(/^([.,!?;:])/);
      if (punctuationMatch) return punctuationMatch[0];
      
      // Check for spaces
      if (remainingText[0] === ' ') return ' ';
      
      // Check for newlines
      if (remainingText[0] === '\n') return '\n';
      
      // Otherwise, type one letter at a time
      return remainingText[0] || '';
    };
    
    const typeNextChunk = () => {
      if (stopped) return;
      if (currentIndex < fullText.length) {
        const nextChunk = getNextChunk(fullText, currentIndex);
        const newText = fullText.slice(0, currentIndex) + nextChunk;
        
        setDisplayedText(prev => ({
          ...prev,
          [messageId]: newText
        }));
        
        currentIndex += nextChunk.length;
        
        // Maximum fast typing speed - varies based on what we're typing
        let delay: number;
        
        if (nextChunk.length === 1) {
          // Single letter - ultra fast typing speed
          if (nextChunk === ' ') {
            delay = Math.random() * 2 + 1; // 1-3ms for spaces
          } else if (nextChunk === '\n') {
            delay = Math.random() * 5 + 3; // 3-8ms for line breaks
          } else {
            delay = Math.random() * 3 + 2; // 2-5ms for letters
          }
        } else {
          // Small words - ultra quick pause
          delay = Math.random() * 4 + 2; // 2-6ms for words
        }
        
        // Add occasional minimal pauses to simulate thinking
        if (Math.random() < 0.005) { // 0.5% chance
          delay += Math.random() * 20 + 10; // Add 10-30ms pause
          isThinking = true;
          
          // Show thinking indicator
          setTimeout(() => {
            if (!stopped) {
              setDisplayedText(prev => ({
                ...prev,
                [messageId]: prev[messageId] + '...'
              }));
              setTimeout(() => {
                if (!stopped) {
                  setDisplayedText(prev => ({
                    ...prev,
                    [messageId]: prev[messageId].slice(0, -3) // Remove the "..."
                  }));
                  isThinking = false;
                }
              }, 30);
            }
          }, delay - 30);
        }
        
        // Occasionally simulate a typo and correction (very rare)
        if (Math.random() < 0.02 && nextChunk.length === 1 && /[a-zA-Z]/.test(nextChunk)) { // 2% chance
          const typoChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random letter
          setTimeout(() => {
            if (!stopped) {
              setDisplayedText(prev => ({
                ...prev,
                [messageId]: prev[messageId] + typoChar
              }));
              setTimeout(() => {
                if (!stopped) {
                  setDisplayedText(prev => ({
                    ...prev,
                    [messageId]: prev[messageId].slice(0, -1) + nextChunk
                  }));
                }
              }, 15);
            }
          }, delay - 10);
        }
        
        setTimeout(typeNextChunk, delay);
      } else {
        setTypingMessageId(null);
        setIsTyping(false);
        setIsResponding(false);
        setCanSendMessage(true); // Re-enable sending messages
        setStopTyping(null);
        // Final scroll to ensure optimal position after typing completes
        setTimeout(() => scrollToNewest(), 100);
      }
    };
    
    // Show animated thinking indicator first
    let thinkingDots = '';
    const showThinkingDots = () => {
      if (stopped) return;
      if (thinkingDots.length < 3) {
        thinkingDots += '.';
        setDisplayedText(prev => ({ ...prev, [messageId]: thinkingDots }));
        setTimeout(showThinkingDots, 100);
      } else {
        // Start typing after showing thinking indicator
        setTimeout(() => {
          setDisplayedText(prev => ({ ...prev, [messageId]: '' }));
          setTimeout(() => {
            typeNextChunk();
          }, 100); // Small pause after clearing thinking indicator
        }, 200); // Show thinking dots for 200ms
      }
    };
    
    // Start showing thinking dots
    setTimeout(showThinkingDots, 50);
  };

  // Ensure responses complete if user leaves tab/page or component unmounts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && stopTyping) {
        stopTyping();
      }
    };

    const handleBeforeUnload = () => {
      if (stopTyping) {
        stopTyping();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Stop response with Ctrl+C or Esc
      if ((e.ctrlKey && e.key === 'c') || e.key === 'Escape') {
        if (stopTyping) {
          e.preventDefault();
          stopTyping();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
      if (stopTyping) {
        stopTyping();
      }
    };
  }, [stopTyping]);

  const sendMessage = () => {
    if (inputMessage.trim() === '' || !canSendMessage || isTyping || typingMessageId !== null || isResponding) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateCurrentChat(newMessages);
    
    // Update chat title if this is the first message
    if (messages.length === 0) {
      const title = inputMessage.length > 30 ? inputMessage.substring(0, 30) + '...' : inputMessage;
      updateChatTitle(internalCurrentChatId, title);
    }
    
    setInputMessage('');
    setIsTyping(true);
    setIsResponding(true);
    setCanSendMessage(false); // Disable sending new messages while responding

    // Auto-scroll will be triggered by useEffect when message is added

    // Get Ardi response asynchronously
    const getResponse = async () => {
      try {
        const ardiResponseText = await getArdiResponse(inputMessage);
        
        // Handle case where response is null (high severity inappropriate content)
        if (ardiResponseText === null) {
          setIsTyping(false);
          setIsResponding(false);
          setCanSendMessage(true);
          return;
        }
        
        if (typeof ardiResponseText === 'string' && ardiResponseText.length > 0) {
          const responseText: string = ardiResponseText;
          const ardiMessage: Message = {
            id: Date.now() + 1,
            sender: 'ardi',
            content: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          
          const finalMessages = [...newMessages, ardiMessage];
          setMessages(finalMessages);
          updateCurrentChat(finalMessages);
          
          // Start typing effect for Ardi's response
          setTimeout(() => {
            typeWriterEffect(ardiMessage.id, responseText);
          }, 50);
        } else {
          setIsTyping(false);
          setIsResponding(false);
          setCanSendMessage(true);
        }
      } catch (error) {
        console.error('Error getting Ardi response:', error);
        setIsTyping(false);
        setIsResponding(false);
        setCanSendMessage(true);
      }
    };

    // Start the response process after a short delay
    setTimeout(getResponse, 100);
  };

  // Initialize displayed text for existing Ardi messages
  useEffect(() => {
    messages.forEach(message => {
      if (message.sender === 'ardi') {
        setDisplayedText(prev => {
          if (prev[message.id] === undefined) {
            return {
              ...prev,
              [message.id]: message.content
            };
          }
          return prev;
        });
      }
    });
  }, [messages]);

  // Initialize scroll position to show only current conversation
  useEffect(() => {
    if (messages.length > 0) {
      // Removed auto-scrolling initialization
    }
  }, [messages.length]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSendMessage && !isTyping && typingMessageId === null && !isResponding) {
      if (showQuestions) {
        setShowQuestions(false);
        return;
      }
      sendMessage();
    }
    if (e.key === 'Escape') {
      setShowQuestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);
    
    // Check if user typed /Questions (case insensitive)
    if (value.toLowerCase() === '/questions') {
      setShowQuestions(true);
    } else if (showQuestions && !value.toLowerCase().startsWith('/questions')) {
      setShowQuestions(false);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setInputMessage(question);
    setShowQuestions(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 h-screen relative">
      
      {/* Floating Controls - Always visible */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 flex items-center space-x-1 sm:space-x-2 md:space-x-3">
        <div className="relative dropdown-container">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1.5 sm:p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-200"
            title="More options"
          >
            <HiDotsVertical className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-600 dark:text-gray-300" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
              <button
                onClick={handleStarChat}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200"
              >
                <FiStar className={`w-4 h-4 ${isStarred ? 'text-yellow-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
                <span>{isStarred ? 'Unstar this chat' : 'Starred'}</span>
              </button>
              <button
                onClick={handleShareChat}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200"
              >
                <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>Share this</span>
              </button>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <button
                onClick={handleDeleteChat}
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition-colors duration-200"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {messages.length === 0 ? (
        // Empty state - Enhanced with better spacing and design
        <div className="flex-1 flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-20 lg:pt-28 px-2 sm:px-4 md:px-6">
          <div className="max-w-4xl w-full text-center">
            {/* Ardi Logo with glow effect */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Image
                  src="/img/LogoArdi.svg"
                  alt="Ardi Logo"
                  width={80}
                  height={80}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 md:mb-6"
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              What can I help with?
            </h1>
            
            {/* AI Disclaimer */}
            <div className="mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                <strong className="text-gray-800 dark:text-gray-200">Ardi</strong> is an AI assistant. I can make mistakes and have limitations.
              </p>
            </div>

            {/* Enhanced Input with better visibility */}
            <div className="max-w-4xl mx-auto px-2 sm:px-4">
              <div className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <button 
                  className="absolute left-3 sm:left-5 md:left-6 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                  title="Attach file"
                >
                  <IoMdAttach className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-600 dark:text-gray-400" />
                </button>
                                  <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={!canSendMessage ? "Ardi is responding... (you can type but not send)" : isMobile ? "Message Ardi..." : "Message Ardi... (Type /Questions for suggestions)"}
                    className="w-full pl-12 sm:pl-16 md:pl-20 pr-12 sm:pr-16 md:pr-20 py-5 sm:py-7 md:py-8 bg-transparent border-0 rounded-xl outline-none font-normal text-base sm:text-lg md:text-xl placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                  />
                                  <button 
                    onClick={sendMessage}
                    disabled={inputMessage.trim() === '' || !canSendMessage || isTyping || typingMessageId !== null || isResponding}
                    className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-2.5 md:p-3 rounded-xl text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                    style={{ display: (!canSendMessage || isTyping || typingMessageId !== null || isResponding) ? 'none' : 'block' }}
                  >
                    <IoMdSend className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </button>
                  {/* Stop Button */}
                  {!canSendMessage && stopTyping && (
                    <button
                      onClick={stopTyping}
                      className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-2.5 md:p-3 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{ zIndex: 10 }}
                      title="Stop response (Ctrl+C or Esc)"
                    >
                      <IoStop className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Chat mode - Enhanced with conversation-focused scrolling
        <>
          {/* Messages Container - Enhanced with better conversation management */}
          <div 
            ref={messagesContainerRef} 
            className="flex-1 overflow-y-auto pb-24 sm:pb-32 px-2 sm:px-4 md:px-6 scroll-smooth" 
          >
            <div className="max-w-5xl mx-auto w-full pt-4 sm:pt-8 pb-4 space-y-4 sm:space-y-8">
              <ChatMessages
                messages={messages}
                displayedText={displayedText}
                typingMessageId={typingMessageId}
                isTyping={isTyping || isResponding}
                onRetryMessage={handleRetryMessage}
                onEditMessage={handleEditMessage}
              />
              {/* Scroll target */}
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </div>
          </div>

          {/* Enhanced Floating Input Area */}
          <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-6 z-20">
            <div className="max-w-4xl mx-auto">
              {/* Questions Dropdown */}
              {showQuestions && (
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-2 sm:mb-4 max-h-60 sm:max-h-80 overflow-y-auto">
                  <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Suggested Questions</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Click on any question to ask Ardi</p>
                  </div>
                  <div className="p-1 sm:p-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionSelect(question)}
                        className="w-full text-left p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-900 dark:text-white text-xs sm:text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center px-3 py-3 sm:px-6 sm:py-6">
                  <button 
                    className="flex-shrink-0 p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    title="Attach file"
                  >
                    <IoMdAttach className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={!canSendMessage ? "Ardi is responding..." : isMobile ? "Message Ardi..." : "Message Ardi... (Type /Questions for suggestions)"}
                    className="flex-1 mx-2 sm:mx-4 py-2 sm:py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base sm:text-lg"
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={inputMessage.trim() === '' || !canSendMessage || isTyping || typingMessageId !== null || isResponding}
                    className="flex-shrink-0 p-2 sm:p-3 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    style={{ display: (!canSendMessage || isTyping || typingMessageId !== null || isResponding) ? 'none' : 'flex' }}
                  >
                    <IoMdSend className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                  {/* Stop Button */}
                  {!canSendMessage && stopTyping && (
                    <button
                      onClick={stopTyping}
                      className="flex-shrink-0 p-2 sm:p-3 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Stop response (Ctrl+C or Esc)"
                    >
                      <IoStop className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}