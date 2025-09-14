import React from 'react';

const PROMPTS = [
  'What is the groundwater level in Punjab?',
  'Summarize the latest CGWB report',
  'Explain sustainable irrigation practices',
  'Data on arsenic contamination in West Bengal',
  'What is the National Aquifer Mapping Program?',
  'Rainwater harvesting in Tamil Nadu',
  'Groundwater policies in Maharashtra vs Gujarat',
  'List water-stressed districts in India',
];

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 animate-fade-in">
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="text-left p-3 bg-white hover:bg-slate-100/80 transition-colors rounded-xl border border-slate-200/80 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-700">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
