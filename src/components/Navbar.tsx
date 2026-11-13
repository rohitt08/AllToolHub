import React, { useState } from 'react';
import { Search } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface Props {
  onOpenSearch: () => void;
  onGoHome: () => void;
  onSearchQuery?: (q: string) => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenSearch,
  onGoHome,
}) => {
  const [inlineQuery, setInlineQuery] = useState('');

  const handleInputClick = () => {
    onOpenSearch();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Aligned gradient lockup like YouTube */}
        <button
          onClick={onGoHome}
          className="flex items-center text-left group focus:outline-none cursor-pointer"
        >
          <img
            src={logoImg}
            alt="AllHubTool Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/Logo.png';
            }}
          />
        </button>

        {/* Search Bar on the Right */}
        <div className="flex items-center">
          <div
            onClick={handleInputClick}
            className="flex items-center gap-2.5 px-3.5 py-2 w-52 sm:w-72 lg:w-80 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-all shadow-xs"
          >
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={inlineQuery}
              onChange={(e) => setInlineQuery(e.target.value)}
              placeholder="Search calculators..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
