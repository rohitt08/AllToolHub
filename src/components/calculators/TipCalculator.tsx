import React, { useState, useEffect } from 'react';
import { Users, Copy, Check, Receipt } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const TipCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();

  const [bill, setBill] = useState<number>(() => (currency.code === 'INR' ? 1800 : 85));
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [splitCount, setSplitCount] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-adjust default sensible bill when switching currency if user hasn't set custom
  useEffect(() => {
    if (currency.code === 'INR' && bill === 85) {
      setBill(1800);
      setTipPercent(10);
    } else if (currency.code !== 'INR' && bill === 1800) {
      setBill(85);
      setTipPercent(18);
    }
  }, [currency.code]);

  const tipAmount = (bill * tipPercent) / 100;
  const totalBill = bill + tipAmount;
  const tipPerPerson = splitCount > 0 ? tipAmount / splitCount : 0;
  const totalPerPerson = splitCount > 0 ? totalBill / splitCount : 0;

  const copySummary = () => {
    const text = `Bill Split & Tip (${currency.code}):
Bill: ${formatCurrency(bill)}
Tip (${tipPercent}%): ${formatCurrency(tipAmount)}
Total: ${formatCurrency(totalBill)}
Split between ${splitCount} people:
- Tip per person: ${formatCurrency(tipPerPerson)}
- Total per person: ${formatCurrency(totalPerPerson)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Bill & Gratuity Splitter
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Total Bill Amount ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={bill === 0 ? '' : bill}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setBill(isNaN(v) ? 0 : v);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tip Presets */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tip Percentage
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[5, 10, 15, 20].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTipPercent(preset)}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      tipPercent === preset
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={tipPercent === 0 ? '' : tipPercent}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setTipPercent(isNaN(v) ? 0 : v);
                  }}
                  placeholder="Custom Tip %"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3.5 top-2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>

            {/* Split */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Number of People Splitting
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={splitCount}
                  onChange={(e) => setSplitCount(Math.max(1, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Total Per Person
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 break-words">
                {formatCurrency(totalPerPerson, { decimals: 2 })}
              </div>
            </div>
            <button
              onClick={copySummary}
              title="Copy Summary"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Tip Per Person:</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(tipPerPerson, { decimals: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Tip ({tipPercent}%):</span>
              <span className="font-semibold text-white">{formatCurrency(tipAmount, { decimals: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Combined Bill:</span>
              <span className="font-bold text-white text-base">{formatCurrency(totalBill, { decimals: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
