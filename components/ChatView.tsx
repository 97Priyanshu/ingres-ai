
import React, { useEffect, useRef, useState } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';

// Icon for the scroll-to-bottom button
const ArrowDownIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

// Component for a single chat message bubble
const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-end gap-2 max-w-xl">
        <div 
          className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-[#FDE4CF] text-slate-800 rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/80'}`}
        >
          <p className="whitespace-pre-wrap text-base">{message.text}</p>
        </div>
      </div>
    </div>
  );
};


interface ChatViewProps {
  messages: ChatMessageType[];
}

// Main component to display the chat conversation
export const ChatView: React.FC<ChatViewProps> = ({ messages }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    // A slight delay to allow the DOM to update before scrolling
    setTimeout(() => scrollToBottom('auto'), 50);
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 200;
        setShowScrollButton(isScrolledUp);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex-grow w-full h-full">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} className="h-2"/>
        </div>
      </div>
       {showScrollButton && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <button 
            onClick={() => scrollToBottom('smooth')}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
            aria-label="Scroll to bottom"
          >
            <ArrowDownIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
