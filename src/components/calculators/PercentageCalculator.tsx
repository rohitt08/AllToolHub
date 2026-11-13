import React, { useState } from 'react';
import { Percent, ArrowRight, Copy, Check } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Case 1: What is X% of Y?
  const [c1X, setC1X] = useState<string>('');
  const [c1Y, setC1Y] = useState<string>('');
  const c1NumX = parseFloat(c1X);
  const c1NumY = parseFloat(c1Y);
  const c1Result = !isNaN(c1NumX) && !isNaN(c1NumY) ? ((c1NumX / 100) * c1NumY).toFixed(2) : '—';

  // Case 2: X is what percent of Y?
  const [c2X, setC2X] = useState<string>('');
  const [c2Y, setC2Y] = useState<string>('');
  const c2NumX = parseFloat(c2X);
  const c2NumY = parseFloat(c2Y);
  const c2Result =
    !isNaN(c2NumX) && !isNaN(c2NumY) && c2NumY !== 0
      ? ((c2NumX / c2NumY) * 100).toFixed(2) + '%'
      : '—';

  // Case 3: Percentage increase / decrease from X to Y?
  const [c3X, setC3X] = useState<string>('');
  const [c3Y, setC3Y] = useState<string>('');
  const c3NumX = parseFloat(c3X);
  const c3NumY = parseFloat(c3Y);
  const c3Diff = !isNaN(c3NumX) && !isNaN(c3NumY) ? c3NumY - c3NumX : 0;
  const c3Pct =
    !isNaN(c3NumX) && !isNaN(c3NumY) && c3NumX !== 0
      ? ((Math.abs(c3Diff) / c3NumX) * 100).toFixed(2)
      : '—';
  const isC3Increase = c3Diff >= 0;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (val: string, idx: number) => {
    if (val === '—') return;
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
            step="any"
            value={c1X}
            placeholder="15"
            onChange={(e) => setC1X(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">% of</span>
          <input
            type="number"
            step="any"
            value={c1Y}
            placeholder="200"
            onChange={(e) => setC1Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{c1Result}</span>
            {c1Result !== '—' && (
              <button
                onClick={() => copy(c1Result, 1)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
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
            step="any"
            value={c2X}
            placeholder="30"
            onChange={(e) => setC2X(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">is what % of</span>
          <input
            type="number"
            step="any"
            value={c2Y}
            placeholder="150"
            onChange={(e) => setC2Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{c2Result}</span>
            {c2Result !== '—' && (
              <button
                onClick={() => copy(c2Result, 2)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
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
            step="any"
            value={c3X}
            placeholder="80"
            onChange={(e) => setC3X(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">to</span>
          <input
            type="number"
            step="any"
            value={c3Y}
            placeholder="100"
            onChange={(e) => setC3Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-extrabold ${
                c3Pct === '—'
                  ? 'text-slate-400'
                  : isC3Increase
                  ? 'text-emerald-500'
                  : 'text-rose-500'
              }`}
            >
              {c3Pct === '—' ? '—' : isC3Increase ? `+${c3Pct}%` : `-${c3Pct}%`}
            </span>
            {c3Pct !== '—' && (
              <span className="text-xs text-slate-400">
                ({isC3Increase ? 'Increase' : 'Decrease'})
              </span>
            )}
            {c3Pct !== '—' && (
              <button
                onClick={() => copy(`${isC3Increase ? '+' : '-'}${c3Pct}%`, 3)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                {copiedIndex === 3 ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
