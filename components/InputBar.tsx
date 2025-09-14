import React, { useState } from 'react';
import { MicIcon } from './icons/MicIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SendIcon } from './icons/SendIcon';
import { LanguageSelector } from './LanguageSelector';
import type { Language } from '../types';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, selectedLanguage, onLanguageChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setInputValue('');
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSendOrRecord = () => {
      if(inputValue) {
        handleSend();
        return;
      }
      setIsRecording(prev => !prev);
      console.log(isRecording ? "Stopping recording..." : "Starting recording...");
  }


  return (
    <footer className="w-full px-4 sm:px-8 pb-4 pt-2 bg-[#F9F9F9]">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-2 p-2 pr-3 rounded-2xl bg-white shadow-lg border border-slate-200/60">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          
          <input 
            type="text" 
            placeholder="Message Ingres AI"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent focus:outline-none text-slate-800 placeholder-slate-500 text-base"
          />
          
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <PlusIcon className="w-6 h-6" />
          </button>
          <button onClick={handleSendOrRecord} className={`p-2 rounded-full transition-colors ${isRecording && !inputValue ? 'bg-red-500 text-white animate-pulse' : 'text-slate-600 hover:bg-slate-100'}`}>
            {inputValue ? <SendIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </footer>
  );
};
