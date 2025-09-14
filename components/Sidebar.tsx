import React from 'react';
import type { ChatHistoryItem } from '../types';
import { MessageIcon } from './icons/MessageIcon';
import { MenuIcon } from './icons/MenuIcon';

interface SidebarProps {
  isOpen: boolean;
  history: ChatHistoryItem[];
  onNewChat: () => void;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, history, onNewChat, onToggle }) => {
  return (
    <aside
      className={`absolute top-0 left-0 h-full w-72 bg-white text-slate-800 p-4 transform transition-transform duration-300 ease-in-out z-20 flex flex-col border-r border-slate-200/80
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-jordy-blue to-aquamarine mr-3 flex-shrink-0"></div>
          <h1 className="text-xl font-bold text-slate-800">Ingres AI</h1>
        </div>
         <button onClick={onToggle} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700">
            <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto -mr-2 pr-2">
        <h2 className="text-sm font-semibold text-slate-500 mb-2 px-2">Conversations</h2>
        <ul className="space-y-1">
          {history.map((item) => (
            <li key={item.id}>
              <button className="w-full text-left flex items-center gap-3 p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors truncate">
                <MessageIcon className="w-5 h-5 flex-shrink-0 text-slate-400" />
                <span className="truncate text-sm font-medium">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200/80 text-xs text-center text-slate-500">
        <p>&copy; 2024 INGRES</p>
      </div>
    </aside>
  );
};
