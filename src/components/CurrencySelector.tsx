import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES, type CurrencyCode } from '../context/CurrencyContext';
import { ChevronDown, Check } from 'lucide-react';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currencyList = Object.values(CURRENCIES);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Currency"
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200/90 dark:border-slate-700/90 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-500/50 backdrop-blur-md text-slate-800 dark:text-slate-100 transition-all duration-150 cursor-pointer shadow-xs"
      >
        <span className="text-sm">{currency.flag}</span>
        <span className="font-extrabold text-blue-600 dark:text-blue-400">{currency.symbol}</span>
        <span className="hidden xs:inline text-xs uppercase tracking-wider">{currency.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 animate-fade-in p-1.5 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
            Select Currency
          </div>

          {currencyList.map((c) => {
            const isSelected = c.code === currency.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code as CurrencyCode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{c.flag}</span>
                  <div className="text-left">
                    <span className="font-extrabold text-slate-900 dark:text-white mr-1.5">
                      {c.symbol} {c.code}
                    </span>
                    <span className="text-[11px] text-slate-400 block sm:inline">
                      {c.code === 'INR' ? 'Rupee (Default)' : c.name}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
