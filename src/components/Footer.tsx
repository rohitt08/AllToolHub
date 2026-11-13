import React from 'react';
import { Heart, Shield } from 'lucide-react';
import logoImg from '../assets/Logo.png';

interface Props {
  onSelectCategory: (category: string) => void;
  onSelectTool: (id: string) => void;
}

export const Footer: React.FC<Props> = ({ onSelectCategory, onSelectTool }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 sm:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={logoImg}
                alt="AllHubTool Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Fast, free, and accurate online calculators engineered with modern web standards, interactive visualizations, and complete privacy.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero server logging • 100% Client-Side Evaluation</span>
            </div>
          </div>

          {/* Financial Links */}
          <div className="space-y-2.5">
            <h4
              onClick={() => onSelectCategory('Financial')}
              className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-600"
            >
              Financial Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTool('mortgage')} className="hover:text-blue-600">
                  Mortgage Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('compound-interest')} className="hover:text-blue-600">
                  Compound Interest
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('auto-loan')} className="hover:text-blue-600">
                  Auto Loan Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('salary-tax')} className="hover:text-blue-600">
                  Salary & Paycheck
                </button>
              </li>
            </ul>
          </div>

          {/* Fitness Links */}
          <div className="space-y-2.5">
            <h4
              onClick={() => onSelectCategory('Fitness')}
              className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-600"
            >
              Fitness & Health
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTool('bmi')} className="hover:text-blue-600">
                  BMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('calorie')} className="hover:text-blue-600">
                  Calorie & TDEE
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('body-fat')} className="hover:text-blue-600">
                  Body Fat %
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('bmr')} className="hover:text-blue-600">
                  BMR Basal Rate
                </button>
              </li>
            </ul>
          </div>

          {/* Math & Utilities */}
          <div className="space-y-2.5">
            <h4
              onClick={() => onSelectCategory('Math')}
              className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-600"
            >
              Math & Utility
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTool('scientific')} className="hover:text-blue-600">
                  Scientific Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('percentage')} className="hover:text-blue-600">
                  Percentage Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('age-date')} className="hover:text-blue-600">
                  Age & Date Difference
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTool('unit-converter')} className="hover:text-blue-600">
                  Unit Converter
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} AllToolHub. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with precision</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

