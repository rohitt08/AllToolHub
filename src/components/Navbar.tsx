import React from 'react';
import { Calculator, Search, Sun, Moon, Bookmark } from 'lucide-react';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  bookmarkedCount: number;
  onShowBookmarks: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<Props> = ({
  isDark,
  onToggleTheme,
  onOpenSearch,
  onSelectCategory,
  selectedCategory,
  bookmarkedCount,
  onShowBookmarks,
  onGoHome,
}) => {
  const categories = ['All', 'Financial', 'Fitness', 'Math', 'Other'];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white block leading-none">
                AllTool<span className="text-blue-600">Hub</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mt-0.5">
                100+ Free Online Tools
              </span>
            </div>
          </button>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'Other' ? 'Utilities' : cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:border-slate-300 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search calculators...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Bookmarks Pill */}
          <button
            onClick={onShowBookmarks}
            title="Saved Tools"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-[9px] font-bold text-white flex items-center justify-center">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
