import React, { useState, useMemo } from 'react';
import { BarChart3, Copy, Check } from 'lucide-react';

export const StatisticsCalculator: React.FC = () => {
  const [dataInput, setDataInput] = useState<string>('12, 15, 18, 22, 25, 28, 30, 35, 42');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const numbers = dataInput
      .split(/[,\s]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return null;

    const count = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;

    // Median
    const mid = Math.floor(count / 2);
    const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    numbers.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const modes = Object.keys(freq)
      .filter((k) => freq[Number(k)] === maxFreq && maxFreq > 1)
      .map(Number);

    // Variance & Standard Deviation
    const sqDiffs = numbers.map((n) => Math.pow(n - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);
    const popVariance = sumSqDiffs / count;
    const sampleVariance = count > 1 ? sumSqDiffs / (count - 1) : 0;
    const popSD = Math.sqrt(popVariance);
    const sampleSD = Math.sqrt(sampleVariance);

    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;

    return {
      count,
      sum,
      mean: Number(mean.toFixed(4)),
      median: Number(median.toFixed(4)),
      mode: modes.length > 0 ? modes.join(', ') : 'No unique mode',
      min,
      max,
      range,
      sampleSD: Number(sampleSD.toFixed(4)),
      popSD: Number(popSD.toFixed(4)),
      sampleVariance: Number(sampleVariance.toFixed(4)),
    };
  }, [dataInput]);

  const copySummary = () => {
    if (!stats) return;
    const text = `Descriptive Statistics:
Data Count (n): ${stats.count}
Mean (Average): ${stats.mean}
Median: ${stats.median}
Mode: ${stats.mode}
Range: ${stats.range} (Min: ${stats.min}, Max: ${stats.max})
Sample Standard Deviation (s): ${stats.sampleSD}
Population Standard Deviation (σ): ${stats.popSD}
Sum: ${stats.sum}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" /> Enter Numbers Dataset
          </h2>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Numbers separated by commas or spaces:
            </label>
            <textarea
              rows={4}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. 10, 20, 25, 30, 45"
            />
            <div className="text-xs text-slate-400">
              Paste raw data or numbers directly. Calculations update in real time.
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                Sample Standard Deviation (s)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                {stats ? stats.sampleSD : '0'}
              </div>
            </div>
            {stats && (
              <button
                onClick={copySummary}
                title="Copy Summary"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>

          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Mean (Average)</span>
                <span className="text-base font-bold text-white">{stats.mean}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Median</span>
                <span className="text-base font-bold text-white">{stats.median}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Count (n)</span>
                <span className="text-base font-bold text-white">{stats.count}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Minimum</span>
                <span className="text-base font-bold text-emerald-400">{stats.min}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Maximum</span>
                <span className="text-base font-bold text-rose-400">{stats.max}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Range</span>
                <span className="text-base font-bold text-white">{stats.range}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-3">
                <span className="text-slate-400 block text-[11px]">Population Standard Deviation (σ)</span>
                <span className="text-sm font-bold text-indigo-300">{stats.popSD}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

