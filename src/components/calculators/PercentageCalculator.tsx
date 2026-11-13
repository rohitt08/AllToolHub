import React, { useState } from 'react';
import { Percent, ArrowRight, Copy, Check } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Case 1: What is X% of Y?
  const [c1X, setC1X] = useState<number>(15);
  const [c1Y, setC1Y] = useState<number>(200);
  const c1Result = ((c1X / 100) * c1Y).toFixed(2);

  // Case 2: X is what percent of Y?
  const [c2X, setC2X] = useState<number>(30);
  const [c2Y, setC2Y] = useState<number>(150);
  const c2Result = c2Y !== 0 ? (((c2X / c2Y) * 100).toFixed(2) + '%') : '0%';

  // Case 3: Percentage increase / decrease from X to Y?
  const [c3X, setC3X] = useState<number>(80);
  const [c3Y, setC3Y] = useState<number>(100);
  const c3Diff = c3Y - c3X;
  const c3Pct = c3X !== 0 ? ((c3Diff / c3X) * 100).toFixed(2) : '0';
  const isC3Increase = c3Diff >= 0;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Case 1 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Percent className="w-4 h-4 text-blue-600" /> What is X% of Y?
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">What is</span>
          <input
            type="number"
            value={c1X}
            onChange={(e) => setC1X(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">% of</span>
          <input
            type="number"
            value={c1Y}
            onChange={(e) => setC1Y(Number(e.target.value))}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{c1Result}</span>
            <button
              onClick={() => copy(c1Result, 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Case 2 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Percent className="w-4 h-4 text-emerald-600" /> X is what % of Y?
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={c2X}
            onChange={(e) => setC2X(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">is what % of</span>
          <input
            type="number"
            value={c2Y}
            onChange={(e) => setC2Y(Number(e.target.value))}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{c2Result}</span>
            <button
              onClick={() => copy(c2Result, 2)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Case 3 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Percent className="w-4 h-4 text-purple-600" /> Percentage Change (Increase / Decrease)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">From</span>
          <input
            type="number"
            value={c3X}
            onChange={(e) => setC3X(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">to</span>
          <input
            type="number"
            value={c3Y}
            onChange={(e) => setC3Y(Number(e.target.value))}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-extrabold ${isC3Increase ? 'text-emerald-500' : 'text-rose-500'}`}
            >
              {isC3Increase ? `+${c3Pct}%` : `${c3Pct}%`}
            </span>
            <span className="text-xs text-slate-400">
              ({isC3Increase ? 'Increase' : 'Decrease'})
            </span>
            <button
              onClick={() => copy(`${c3Pct}%`, 3)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              {copiedIndex === 3 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

