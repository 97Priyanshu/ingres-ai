import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { LanguageIcon } from './icons/LanguageIcon';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LANGUAGES: Language[] = ['English', 'Hindi', 'Tamil', 'Telugu'];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-800 font-medium text-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <LanguageIcon className="w-5 h-5 text-slate-600" />
        {selectedLanguage}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={`absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg border border-slate-200/80 z-20 transition-all duration-200 ease-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <ul className="py-1">
            {LANGUAGES.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleSelect(lang)}
                  className={`w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ${selectedLanguage === lang ? 'font-semibold text-jordy-blue' : ''}`}
                >
                  {lang}
                </button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};
