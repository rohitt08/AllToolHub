import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, Copy, Check } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(20);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    let balance = initialDeposit;
    let totalDeposited = initialDeposit;
    const monthlyRate = annualReturnRate / 100 / 12;
    const totalMonths = years * 12;

    const yearlyData: Array<{ year: number; balance: number; totalContributions: number; interest: number }> = [];

    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalDeposited += monthlyContribution;

      if (m % 12 === 0) {
        yearlyData.push({
          year: m / 12,
          balance: Math.round(balance),
          totalContributions: Math.round(totalDeposited),
          interest: Math.round(balance - totalDeposited),
        });
      }
    }

    const totalInterestEarned = Math.max(0, balance - totalDeposited);

    return {
      finalBalance: Math.round(balance),
      totalDeposited: Math.round(totalDeposited),
      totalInterestEarned: Math.round(totalInterestEarned),
      yearlyData,
    };
  }, [initialDeposit, monthlyContribution, annualReturnRate, years]);

  const copyData = () => {
    const text = `Compound Interest Projection:
Initial Deposit: $${initialDeposit.toLocaleString()}
Monthly Deposit: $${monthlyContribution.toLocaleString()}
Time Horizon: ${years} years @ ${annualReturnRate}% annual return
Final Estimated Balance: $${stats.finalBalance.toLocaleString()}
Total Contributions: $${stats.totalDeposited.toLocaleString()}
Total Interest Earned: $${stats.totalInterestEarned.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const depositPct = Math.round((stats.totalDeposited / stats.finalBalance) * 100) || 0;
  const interestPct = Math.round((stats.totalInterestEarned / stats.finalBalance) * 100) || 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Investment Growth Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Initial Starting Deposit</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${initialDeposit.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  step="1000"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Monthly Recurring Contribution</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${monthlyContribution.toLocaleString()}/mo
                </span>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  max="100000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Annual Return (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="40"
                    value={annualReturnRate}
                    onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Investment Horizon (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Projected Future Wealth
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                ${stats.finalBalance.toLocaleString()}
              </div>
            </div>
            <button
              onClick={copyData}
              title="Copy Summary"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Visualizer Bar */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
              Principal vs Compound Interest
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${depositPct}%` }} className="bg-slate-400" title={`Deposits: ${depositPct}%`} />
              <div style={{ width: `${interestPct}%` }} className="bg-emerald-400" title={`Interest: ${interestPct}%`} />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                Total Contributions
              </span>
              <span className="font-semibold">${stats.totalDeposited.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                Total Interest Earned
              </span>
              <span className="font-semibold text-emerald-400">
                +${stats.totalInterestEarned.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Milestone Preview */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-xs text-slate-300 font-medium mb-2">5-Year Growth Milestones:</div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {stats.yearlyData
                .filter((d) => d.year % 5 === 0 || d.year === years)
                .slice(-4)
                .map((d) => (
                  <div key={d.year} className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <span className="text-slate-400 block text-[11px]">Yr {d.year}</span>
                    <span className="font-bold text-white text-xs">${(d.balance / 1000).toFixed(0)}k</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
