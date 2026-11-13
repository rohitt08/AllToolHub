import React from 'react';
import type { CalculatorDefinition } from '../data/tools';
import {
  TrendingUp,
  Activity,
  Calculator as CalcIcon,
  Wrench,
  Sparkles,
  ArrowRight,
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
}) => {
  const categories = [
    { name: 'All', icon: Sparkles, label: 'All Tools', count: tools.length },
    { name: 'Financial', icon: TrendingUp, label: 'Financial', count: tools.filter((t) => t.category === 'Financial').length },
    { name: 'Fitness', icon: Activity, label: 'Fitness & Health', count: tools.filter((t) => t.category === 'Fitness').length },
    { name: 'Math', icon: CalcIcon, label: 'Math & Science', count: tools.filter((t) => t.category === 'Math').length },
    { name: 'Other', icon: Wrench, label: 'Utilities', count: tools.filter((t) => t.category === 'Other').length },
  ];

  const filteredTools =
    selectedCategory === 'All'
      ? tools
      : tools.filter((t) => t.category === selectedCategory);

  const popularTools = tools.filter((t) => t.popular);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Short, User-Friendly Compact Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>100+ Free Online Calculators</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fast, Free & Accurate Calculators for Every Need
          </h1>

          {/* Quick Popular Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium">Quick Access:</span>
            {popularTools.slice(0, 6).map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>{tool.name}</span>
                <ArrowRight className="w-3 h-3 text-blue-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedCategory === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => onSelectCategory(c.name)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {filteredTools.length} tools available
          </span>
        </div>

        {/* User-Friendly Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide block">
                  {tool.subCategory}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
