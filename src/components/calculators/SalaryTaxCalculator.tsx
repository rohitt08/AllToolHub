import React, { useState, useMemo } from 'react';
import { Briefcase, DollarSign, Copy, Check } from 'lucide-react';

export const SalaryTaxCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<number>(75000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    // Estimated 2024/2025 federal effective brackets
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, grossSalary - standardDeduction);

    // Approximate progressive tax
    let federalTax = 0;
    if (taxableIncome <= 11600) {
      federalTax = taxableIncome * 0.1;
    } else if (taxableIncome <= 47150) {
      federalTax = 1160 + (taxableIncome - 11600) * 0.12;
    } else if (taxableIncome <= 100525) {
      federalTax = 5426 + (taxableIncome - 47150) * 0.22;
    } else {
      federalTax = 17168 + (taxableIncome - 100525) * 0.24;
    }

    // FICA: 6.2% Social Security + 1.45% Medicare = 7.65%
    const ficaTax = grossSalary * 0.0765;
    // Estimated average state tax (approx 4%)
    const stateTax = grossSalary * 0.04;

    const totalTaxes = federalTax + ficaTax + stateTax;
    const netAnnual = Math.max(0, grossSalary - totalTaxes);
    const netMonthly = netAnnual / 12;
    const netBiweekly = netAnnual / 26;
    const netHourly = netAnnual / 2080; // 40 hrs/wk * 52 wks

    return {
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      stateTax: Math.round(stateTax),
      totalTaxes: Math.round(totalTaxes),
      netAnnual: Math.round(netAnnual),
      netMonthly: Math.round(netMonthly),
      netBiweekly: Math.round(netBiweekly),
      netHourly: Number(netHourly.toFixed(2)),
      effectiveRate: ((totalTaxes / (grossSalary || 1)) * 100).toFixed(1),
    };
  }, [grossSalary, filingStatus]);

  const copySummary = () => {
    const text = `Take-Home Paycheck Breakdown:
Gross Annual Salary: $${grossSalary.toLocaleString()}
Estimated Total Taxes: $${stats.totalTaxes.toLocaleString()} (${stats.effectiveRate}%)
- Federal Tax: $${stats.federalTax.toLocaleString()}
- FICA (Social Security & Medicare): $${stats.ficaTax.toLocaleString()}
- State Tax: $${stats.stateTax.toLocaleString()}
Net Take-Home Pay:
- Annual: $${stats.netAnnual.toLocaleString()}
- Monthly: $${stats.netMonthly.toLocaleString()}
- Bi-Weekly: $${stats.netBiweekly.toLocaleString()}
- Hourly: $${stats.netHourly}/hr`;
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
            <Briefcase className="w-5 h-5 text-emerald-600" /> Income & Tax Filing Status
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gross Annual Salary ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Filing Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFilingStatus('single')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                    filingStatus === 'single'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Single
                </button>
                <button
                  type="button"
                  onClick={() => setFilingStatus('married')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                    filingStatus === 'married'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Married Filing Jointly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Estimated Net Paycheck
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                ${stats.netMonthly.toLocaleString()}
                <span className="text-base font-normal text-emerald-300">/mo</span>
              </div>
            </div>
            <button
              onClick={copySummary}
              title="Copy Summary"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Bi-Weekly Paycheck</span>
              <span className="text-base font-bold text-white">${stats.netBiweekly.toLocaleString()}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Equivalent Hourly</span>
              <span className="text-base font-bold text-emerald-400">${stats.netHourly}/hr</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">Federal Income Tax:</span>
              <span className="font-semibold text-rose-300">-${stats.federalTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">FICA (Social Security & Medicare):</span>
              <span className="font-semibold text-rose-300">-${stats.ficaTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">Estimated State Tax (~4%):</span>
              <span className="font-semibold text-rose-300">-${stats.stateTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-sm">
              <span className="text-slate-200">Total Effective Tax Rate:</span>
              <span className="text-amber-300">{stats.effectiveRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

