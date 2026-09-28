import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onToggle,
  className = ''
}) => {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 bg-stone-200/80 rounded-xl border border-stone-300/80 text-xs font-semibold shadow-2xs select-none transition-all ${className}`}
    >
      <div className="flex items-center px-1.5 text-stone-500 hidden sm:flex">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => onToggle('bn')}
        aria-pressed={currentLang === 'bn'}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currentLang === 'bn'
            ? 'bg-emerald-900 text-white shadow-xs font-bold'
            : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/50'
        }`}
      >
        <span>বাংলা</span>
      </button>

      <button
        type="button"
        onClick={() => onToggle('en')}
        aria-pressed={currentLang === 'en'}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currentLang === 'en'
            ? 'bg-emerald-900 text-white shadow-xs font-bold'
            : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/50'
        }`}
      >
        <span>ENG</span>
      </button>
    </div>
  );
};
