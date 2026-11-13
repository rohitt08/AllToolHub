import React, { useState } from 'react';
import { Search } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import { CurrencySelector } from './CurrencySelector';

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
    <header className="sticky top-0 z-40 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo - Small, sleek modern gradient lockup */}
        <button
          onClick={onGoHome}
          className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg shrink-0 cursor-pointer p-0.5"
          aria-label="AllHubTool Home"
        >
          <img
            src={logoImg}
            alt="AllHubTool Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/Logo.png';
            }}
          />
        </button>

        {/* Right Controls: Search Pill + Currency Selector (INR / USD / EUR) */}
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <div
            onClick={handleInputClick}
            role="searchbox"
            aria-label="Search calculators"
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 w-32 xs:w-44 sm:w-56 md:w-64 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-800/70 backdrop-blur-md hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs text-slate-500 dark:text-slate-400 cursor-pointer transition-all duration-150"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={inlineQuery}
              onChange={(e) => setInlineQuery(e.target.value)}
              placeholder="Search Calculators...."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 cursor-pointer focus:outline-none"
              aria-label="Search"
            />
          </div>

          <CurrencySelector />
        </div>
      </div>
    </header>
  );
};
