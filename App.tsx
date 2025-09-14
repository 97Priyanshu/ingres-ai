import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { InputBar } from './components/InputBar';
import { MenuIcon } from './components/icons/MenuIcon';
import { PlusIcon } from './components/icons/PlusIcon';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import type { ChatHistoryItem, ChatMessage, Language } from './types';

const MOCK_HISTORY: ChatHistoryItem[] = [
    { id: '1', title: 'Groundwater levels in Punjab' },
    { id: '2', title: 'Aquifer mapping in Rajasthan' },
    { id: '3', title: 'Rainwater harvesting techniques' },
    { id: '4', title: 'Contamination sources in Ganga basin' },
    { id: '5', title: 'Water quality standards for drinking' },
    { id: '6', title: 'Impact of climate change on...' },
];


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory] = useState<ChatHistoryItem[]>(MOCK_HISTORY);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [language, setLanguage] = useState<Language>('English');

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);
  
  const handleNewChat = useCallback(() => {
    setMessages([]);
    setIsSidebarOpen(false);
  }, []);
  
  const addBotMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      text,
      sender: 'bot'
    };
    setMessages(prev => [...prev, newMessage]);
  }

  const handleSendMessage = useCallback((messageText: string) => {
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: 'user'
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate bot response
    setTimeout(() => {
        const lowerCaseMessage = messageText.toLowerCase().trim();
        if (lowerCaseMessage === 'hii' || lowerCaseMessage === 'hi') {
            addBotMessage("Hey Priyanshu! 👋 How's your Saturday going so far? Anything fun planned for the evening, or just chilling?");
        } else if (lowerCaseMessage === 'how are you') {
            addBotMessage("I'm feeling sharp and ready to dive into whatever you've got for me today 😀 What's on your mind, Priyanshu? Want to chat, create something cool, or explore a new topic together?");
        } else {
             addBotMessage("I'm a demo bot. I can only provide specific answers to 'hi' and 'how are you'. Please try one of those!");
        }
    }, 1200);

  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
      setLanguage(lang);
      // In a real app, you might want to inform the bot of the language change.
      console.log(`Language changed to: ${lang}`);
  }, []);


  return (
    <div className="h-screen w-screen bg-[#F9F9F9] text-slate-800 font-sans flex overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          history={chatHistory} 
          onNewChat={handleNewChat}
          onToggle={toggleSidebar}
        />
        
        {isSidebarOpen && (
          <div 
            onClick={toggleSidebar} 
            className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 md:hidden"
            aria-hidden="true"
          ></div>
        )}

        <main className={`relative flex-grow flex flex-col transition-all duration-300 ease-in-out w-full ${isSidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
          <header className="flex items-center p-4 border-b border-slate-200/80">
            <div className="w-10 h-10 flex items-center justify-center">
              {!isSidebarOpen && (
                <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-slate-200/60 transition-colors text-slate-700 z-30">
                  <MenuIcon className="w-6 h-6" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
                <button onClick={handleNewChat} className="p-2 rounded-full hover:bg-slate-200/60 transition-colors text-slate-700">
                    <PlusIcon className="w-6 h-6" />
                </button>
                <div className="w-9 h-9 rounded-full bg-mauve">
                    {/* Placeholder for profile icon */}
                </div>
            </div>
          </header>

          <div className="flex-grow flex flex-col justify-center overflow-hidden">
            {messages.length === 0 ? (
                 <div className="w-full max-w-4xl mx-auto flex flex-col items-center flex-grow justify-center px-4 pb-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Namaste 🙏</h1>
                    </div>
                    <SuggestedPrompts onPromptClick={handleSendMessage} />
                 </div>
            ) : (
                <ChatView messages={messages} />
            )}
          </div>
          
          <InputBar 
            onSendMessage={handleSendMessage}
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange} 
          />
        </main>
    </div>
  );
}