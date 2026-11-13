import React, { useState, useMemo, useEffect } from 'react';
import { Briefcase, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const SalaryTaxCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [grossSalary, setGrossSalary] = useState<number>(() => (currency.code === 'INR' ? 1200000 : 75000));
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currency.code === 'INR') {
      setGrossSalary(1200000); // 12 LPA
    } else if (currency.code === 'EUR') {
      setGrossSalary(50000);
    } else {
      setGrossSalary(75000);
    }
  }, [currency.code]);

  const stats = useMemo(() => {
    if (currency.code === 'INR') {
      // Indian New Tax Regime (FY 2024-25 / 2025-26)
      const standardDeduction = 75000;
      const taxable = Math.max(0, grossSalary - standardDeduction);
      let incomeTax = 0;

      if (taxable > 300000) {
        if (taxable <= 700000) {
          incomeTax += (taxable - 300000) * 0.05;
        } else if (taxable <= 1000000) {
          incomeTax += 400000 * 0.05 + (taxable - 700000) * 0.1;
        } else if (taxable <= 1200000) {
          incomeTax += 400000 * 0.05 + 300000 * 0.1 + (taxable - 1000000) * 0.15;
        } else if (taxable <= 1500000) {
          incomeTax += 400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + (taxable - 1200000) * 0.2;
        } else {
          incomeTax += 400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + 300000 * 0.2 + (taxable - 1500000) * 0.3;
        }
      }

      // Section 87A rebate for taxable income up to 7 Lakhs (Tax = 0)
      if (taxable <= 700000) {
        incomeTax = 0;
      }

      const cess = incomeTax * 0.04; // 4% Health & Education Cess
      const totalTax = incomeTax + cess;
      const pfDeduction = Math.min(grossSalary * 0.12, 180000); // EPF Employee Contribution approx
      const netAnnual = Math.max(0, grossSalary - totalTax - pfDeduction);
      const netMonthly = netAnnual / 12;
      const netBiweekly = netAnnual / 26;
      const netHourly = netAnnual / 2080;

      return {
        federalTax: Math.round(incomeTax),
        ficaTax: Math.round(cess),
        stateTax: Math.round(pfDeduction),
        taxLabel1: 'Income Tax',
        taxLabel2: 'Health & Edu Cess (4%)',
        taxLabel3: 'Provident Fund (EPF)',
        totalTaxes: Math.round(totalTax + pfDeduction),
        netAnnual: Math.round(netAnnual),
        netMonthly: Math.round(netMonthly),
        netBiweekly: Math.round(netBiweekly),
        netHourly: Number(netHourly.toFixed(2)),
        effectiveRate: (((totalTax + pfDeduction) / (grossSalary || 1)) * 100).toFixed(1),
      };
    }

    // US & EUR standard taxation models
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, grossSalary - standardDeduction);

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

    const ficaTax = grossSalary * 0.0765;
    const stateTax = grossSalary * 0.04;

    const totalTaxes = federalTax + ficaTax + stateTax;
    const netAnnual = Math.max(0, grossSalary - totalTaxes);
    const netMonthly = netAnnual / 12;
    const netBiweekly = netAnnual / 26;
    const netHourly = netAnnual / 2080;

    return {
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      stateTax: Math.round(stateTax),
      taxLabel1: 'Federal Income Tax',
      taxLabel2: 'Social Security / FICA',
      taxLabel3: 'State / Local Tax (~4%)',
      totalTaxes: Math.round(totalTaxes),
      netAnnual: Math.round(netAnnual),
      netMonthly: Math.round(netMonthly),
      netBiweekly: Math.round(netBiweekly),
      netHourly: Number(netHourly.toFixed(2)),
      effectiveRate: ((totalTaxes / (grossSalary || 1)) * 100).toFixed(1),
    };
  }, [grossSalary, filingStatus, currency.code]);

  const copySummary = () => {
    const text = `Salary & Take-Home Paycheck (${currency.code}):
Gross Annual Salary: ${formatCurrency(grossSalary)}
Estimated Total Deductions: ${formatCurrency(stats.totalTaxes)} (${stats.effectiveRate}%)
- ${stats.taxLabel1}: ${formatCurrency(stats.federalTax)}
- ${stats.taxLabel2}: ${formatCurrency(stats.ficaTax)}
- ${stats.taxLabel3}: ${formatCurrency(stats.stateTax)}
Net Take-Home Pay:
- Annual: ${formatCurrency(stats.netAnnual)}
- Monthly: ${formatCurrency(stats.netMonthly)}/mo
- Bi-Weekly: ${formatCurrency(stats.netBiweekly)}
- Hourly: ${formatCurrency(stats.netHourly, { decimals: 2 })}/hr`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Income & Tax Details
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {currency.flag} {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gross Annual CTC / Salary ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step={currency.code === 'INR' ? '50000' : '1000'}
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {currency.code !== 'INR' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Filing Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFilingStatus('single')}
                    className={`py-2.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
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
                    className={`py-2.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                      filingStatus === 'married'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Married Filing Jointly
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Estimated In-Hand Paycheck
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1">
                {formatCurrency(stats.netMonthly)}
                <span className="text-base font-normal text-emerald-300">/mo</span>
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

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Annual Net Take-Home</span>
              <span className="text-sm sm:text-base font-bold text-white">{formatCurrency(stats.netAnnual)}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Bi-Weekly Paycheck</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">{formatCurrency(stats.netBiweekly)}</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel1}:</span>
              <span className="font-semibold text-rose-300">-{formatCurrency(stats.federalTax)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel2}:</span>
              <span className="font-semibold text-rose-300">-{formatCurrency(stats.ficaTax)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel3}:</span>
              <span className="font-semibold text-rose-300">-{formatCurrency(stats.stateTax)}</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-sm">
              <span className="text-slate-200">Total Effective Deduction:</span>
              <span className="text-amber-300">{stats.effectiveRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
