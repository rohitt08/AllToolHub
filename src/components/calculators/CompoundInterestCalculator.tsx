import React, { useState, useMemo } from 'react';
import { TrendingUp, Calendar, Percent, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const CompoundInterestCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [initialDeposit, setInitialDeposit] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [annualReturnRate, setAnnualReturnRate] = useState<string>('');
  const [years, setYears] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const p = parseFloat(initialDeposit) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(annualReturnRate) || 0;

    let balance = p;
    let totalDeposited = p;
    const monthlyRate = r / 100 / 12;
    const totalMonths = years * 12;

    const yearlyData: Array<{ year: number; balance: number; totalContributions: number; interest: number }> = [];

    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + monthlyRate) + pmt;
      totalDeposited += pmt;

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
      p,
      pmt,
      finalBalance: Math.round(balance),
      totalDeposited: Math.round(totalDeposited),
      totalInterestEarned: Math.round(totalInterestEarned),
      yearlyData,
    };
  }, [initialDeposit, monthlyContribution, annualReturnRate, years]);

  const copyResults = () => {
    const text = `Compound Interest / SIP Projection (${currency.code}):
Initial Deposit: ${formatCurrency(stats.p)}
Monthly Deposit: ${formatCurrency(stats.pmt)}/mo
Time Horizon: ${years} years @ ${annualReturnRate || '0'}% annual return
Final Estimated Wealth: ${formatCurrency(stats.finalBalance)}
Total Contributions: ${formatCurrency(stats.totalDeposited)}
Total Wealth Generated: ${formatCurrency(stats.totalInterestEarned)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const depositPct =
    stats.finalBalance > 0 ? Math.round((stats.totalDeposited / stats.finalBalance) * 100) : 0;
  const interestPct = Math.max(0, 100 - depositPct);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Investment / SIP Plan
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              Active: {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Initial Principal / Lumpsum ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={initialDeposit}
                  placeholder={currency.code === 'INR' ? 'e.g. 100000' : 'e.g. 10000'}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Monthly Contribution / SIP ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={monthlyContribution}
                  placeholder={currency.code === 'INR' ? 'e.g. 10000' : 'e.g. 500'}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Expected Return / Interest Rate (% p.a.)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={annualReturnRate}
                    placeholder={currency.code === 'INR' ? '12.0' : '8.0'}
                    onChange={(e) => setAnnualReturnRate(e.target.value)}
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
                  <select
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Year</option>
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years</option>
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Projected Future Wealth
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 break-words">
                {formatCurrency(stats.finalBalance, { decimals: 0 })}
              </div>
            </div>
            <button
              onClick={copyResults}
              title="Copy Summary"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 block">Growth Distribution</span>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${depositPct}%` }} className="bg-slate-400" title={`Deposits: ${depositPct}%`} />
              <div style={{ width: `${interestPct}%` }} className="bg-emerald-400" title={`Interest: ${interestPct}%`} />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Total Out-of-Pocket Deposits:
              </span>
              <span className="font-semibold text-white">{formatCurrency(stats.totalDeposited, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Total Wealth Generated:
              </span>
              <span className="font-bold text-emerald-300">+{formatCurrency(stats.totalInterestEarned, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-slate-300">Time Horizon:</span>
              <span className="font-bold text-white">{years} Years ({years * 12} Monthly Cycles)</span>
            </div>
          </div>

          {/* Quick milestone preview */}
          {stats.yearlyData.length > 0 && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
              <span className="text-slate-300 font-semibold block mb-2">Milestone Preview:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400">Halfway ({Math.floor(years / 2)} yrs): </span>
                  <span className="font-bold text-white">
                    {formatCurrency(
                      stats.yearlyData[Math.max(0, Math.floor(years / 2) - 1)]?.balance || 0,
                      { decimals: 0 }
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Final Target: </span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(stats.finalBalance, { decimals: 0 })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
