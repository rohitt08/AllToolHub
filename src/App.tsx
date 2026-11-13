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

  const currentTool = CALCULATORS.find((t) => t.id === currentToolId);
  const relatedTools = currentTool
    ? CALCULATORS.filter(
        (t) => t.category === currentTool.category && t.id !== currentTool.id
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Clean Navbar: Logo on Left, Search Bar on Right */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onGoHome={() => handleSelectTool('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTool ? (
          <CalculatorDetail
            tool={currentTool}
            onSelectTool={handleSelectTool}
            relatedTools={relatedTools}
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
