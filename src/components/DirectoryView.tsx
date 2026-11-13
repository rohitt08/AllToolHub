import React, { useState, useEffect } from 'react';
import type { CalculatorDefinition } from '../data/tools';
import {
  TrendingUp,
  Activity,
  Calculator as CalcIcon,
  Wrench,
  Sparkles,
  ArrowRight,
  ChevronDown,
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
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Reset to 9 cards whenever user switches category
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory]);
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

  const displayedTools = filteredTools.slice(0, visibleCount);

  // Daily life calculators most frequently used by everyday users for maximum utility & SEO
  const dailyLifeTools = [
    { name: 'Percentage Calculator', id: 'percentage' },
    { name: 'Age Calculator', id: 'age-date' },
    { name: 'BMI Calculator', id: 'bmi' },
    { name: 'Calorie Calculator', id: 'calorie' },
    { name: 'Unit Converter', id: 'unit-converter' },
    { name: 'Tip Calculator', id: 'tip' },
    { name: 'Work Hours Calculator', id: 'hours-time' },
    { name: 'Salary Paycheck', id: 'salary-tax' },
    { name: 'Scientific Calculator', id: 'scientific' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Short, User-Friendly Compact Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>200+ Free Online Calculators</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fast, Free & Accurate Calculators for Every Need
          </h1>

          {/* Daily Life Quick Access Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium">Daily Quick Access:</span>
            {dailyLifeTools.map((tool) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-500/60 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 shadow-2xs">
                    {tool.subCategory}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* 3D Spanning Button with Arrow */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_2px_0_0_#1d4ed8] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all group-hover:from-blue-500 group-hover:to-indigo-500">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 9-Card Pagination / View More Button */}
        {visibleCount < filteredTools.length && (
          <div className="pt-8 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_2px_0_0_#1d4ed8] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all cursor-pointer"
            >
              <span>View More Calculators</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing {displayedTools.length} of {filteredTools.length} calculators
            </span>
          </div>
        )}
      </section>
    </div>
  );
};
