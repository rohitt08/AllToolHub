import { useState, useEffect } from 'react';
import { CALCULATORS } from './data/tools';
import { Navbar } from './components/Navbar';
import { DirectoryView } from './components/DirectoryView';
import { CalculatorDetail } from './components/CalculatorDetail';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export function App() {
  const [currentToolId, setCurrentToolId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('ath_theme') === 'dark' ||
      (!localStorage.getItem('ath_theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ath_bookmarks');
      return saved ? JSON.parse(saved) : ['mortgage', 'bmi', 'compound-interest', 'percentage'];
    } catch {
      return ['mortgage', 'bmi'];
    }
  });

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ath_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ath_theme', 'light');
    }
  }, [isDark]);

  // URL Query Sync for Direct Links & SEO Crawlers
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool');
      if (toolParam && CALCULATORS.some((t) => t.id === toolParam)) {
        setCurrentToolId(toolParam);
      } else {
        setCurrentToolId(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleSelectTool = (toolId: string) => {
    if (toolId === 'home') {
      setCurrentToolId(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('tool');
      window.history.pushState({}, '', url.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentToolId(toolId);
      const url = new URL(window.location.href);
      url.searchParams.set('tool', toolId);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBookmark = (id: string) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('ath_bookmarks', JSON.stringify(next));
  };

  const currentTool = CALCULATORS.find((t) => t.id === currentToolId);
  const relatedTools = currentTool
    ? CALCULATORS.filter(
        (t) => t.category === currentTool.category && t.id !== currentTool.id
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentToolId) handleSelectTool('home');
        }}
        bookmarkedCount={bookmarks.length}
        onShowBookmarks={() => {
          setSelectedCategory('All');
          handleSelectTool('home');
        }}
        onGoHome={() => handleSelectTool('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTool ? (
          <CalculatorDetail
            tool={currentTool}
            onSelectTool={handleSelectTool}
            relatedTools={relatedTools}
            isBookmarked={bookmarks.includes(currentTool.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <DirectoryView
            tools={CALCULATORS}
            onSelectTool={handleSelectTool}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}
      </main>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={CALCULATORS}
        onSelectTool={handleSelectTool}
      />

      {/* Footer with Directory Sitemaps */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleSelectTool('home');
        }}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
export default App;
