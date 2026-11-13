import React from 'react';
import type { CalculatorDefinition } from '../data/tools';
import {
  TrendingUp,
  Activity,
  Calculator as CalcIcon,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Search,
} from 'lucide-react';

interface Props {
  tools: CalculatorDefinition[];
  onSelectTool: (id: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
}

export const DirectoryView: React.FC<Props> = ({
  tools,
  onSelectTool,
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
}) => {
  const categories = [
    { name: 'All', icon: Sparkles, count: tools.length },
    { name: 'Financial', icon: TrendingUp, count: tools.filter((t) => t.category === 'Financial').length },
    { name: 'Fitness', icon: Activity, count: tools.filter((t) => t.category === 'Fitness').length },
    { name: 'Math', icon: CalcIcon, count: tools.filter((t) => t.category === 'Math').length },
    { name: 'Other', icon: Wrench, count: tools.filter((t) => t.category === 'Other').length },
  ];

  const filteredTools =
    selectedCategory === 'All'
      ? tools
      : tools.filter((t) => t.category === selectedCategory);

  const popularTools = tools.filter((t) => t.popular);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/10">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast, Free, & 100% Private Client-Side Calculation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Accurate Online Calculators for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              Finance, Health & Math
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Instant answers, dynamic visual breakdowns, and step-by-step formulas. From mortgages and compound interest to BMI, macros, and scientific math.
          </p>

          {/* Hero Quick Search Box */}
          <div
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-5 py-4 rounded-2xl cursor-pointer max-w-xl transition-all shadow-lg"
          >
            <Search className="w-5 h-5 text-blue-300 shrink-0" />
            <span className="text-sm font-medium text-slate-300 flex-1">
              Search by name, metric, or formula...
            </span>
            <kbd className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white font-semibold">
              Ctrl+K
            </kbd>
          </div>

          {/* Quick Trending Links */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-medium">Trending Tools:</span>
            {popularTools.slice(0, 5).map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>{tool.name}</span>
                <ArrowRight className="w-3 h-3 text-blue-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Grid Background Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
      </section>

      {/* Feature Value Props for SEO & Trust */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300 text-sm">
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white mb-1">Instant Real-Time Math</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every slider and field recalculates instantly without server roundtrips or page reload delays.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white mb-1">100% Privacy Protected</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Zero telemetry on your financial figures, salary data, or medical metrics. Kept inside your browser.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white mb-1">Formulas & Step-by-Step</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Transparent algorithms, clinical formulas, and mathematical explanations beneath every calculator.
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Explore All Calculators
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredTools.length} tools
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = selectedCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelectCategory(c.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.name === 'Other' ? 'Everyday Utilities' : c.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg">
                    {tool.subCategory}
                  </span>
                  {tool.popular && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
