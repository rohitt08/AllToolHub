import React, { useState, useMemo } from 'react';
import { Briefcase, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const SalaryTaxCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const gross = parseFloat(grossSalary) || 0;

    if (currency.code === 'INR') {
      // Indian New Tax Regime (FY 2024-25 / 2025-26)
      const standardDeduction = gross > 0 ? 75000 : 0;
      const taxable = Math.max(0, gross - standardDeduction);
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
      const pfDeduction = gross > 0 ? Math.min(gross * 0.12, 180000) : 0; // EPF Employee Contribution approx
      const netAnnual = Math.max(0, gross - totalTax - pfDeduction);

      return {
        gross,
        federalTax: Math.round(incomeTax),
        taxLabel1: 'Income Tax (New Regime)',
        ficaTax: Math.round(cess),
        taxLabel2: 'Health & Edu Cess (4%)',
        stateTax: Math.round(pfDeduction),
        taxLabel3: 'EPF / PF Contribution',
        totalTaxes: Math.round(totalTax + pfDeduction),
        netAnnual: Math.round(netAnnual),
        netMonthly: Math.round(netAnnual / 12),
        netBiweekly: Math.round(netAnnual / 26),
        netHourly: netAnnual / (52 * 40),
        effectiveRate: gross > 0 ? ((totalTax + pfDeduction) / gross) * 100 : 0,
      };
    }

    if (currency.code === 'EUR') {
      // European standard progressive average brackets
      const incomeTax = gross * 0.24;
      const socialSecurity = gross * 0.11;
      const pensionHealth = gross * 0.06;
      const totalTaxes = incomeTax + socialSecurity + pensionHealth;
      const netAnnual = Math.max(0, gross - totalTaxes);

      return {
        gross,
        federalTax: Math.round(incomeTax),
        taxLabel1: 'National Income Tax',
        ficaTax: Math.round(socialSecurity),
        taxLabel2: 'Social Security',
        stateTax: Math.round(pensionHealth),
        taxLabel3: 'Health & Pension Insurance',
        totalTaxes: Math.round(totalTaxes),
        netAnnual: Math.round(netAnnual),
        netMonthly: Math.round(netAnnual / 12),
        netBiweekly: Math.round(netAnnual / 26),
        netHourly: netAnnual / (52 * 40),
        effectiveRate: gross > 0 ? (totalTaxes / gross) * 100 : 0,
      };
    }

    // Default US Model (Federal + FICA + State)
    const stdDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxable = Math.max(0, gross - stdDeduction);

    let fedTax = 0;
    if (taxable > 0) {
      if (taxable <= 11600) fedTax += taxable * 0.1;
      else if (taxable <= 47150) fedTax += 1160 + (taxable - 11600) * 0.12;
      else if (taxable <= 100525) fedTax += 5426 + (taxable - 47150) * 0.22;
      else fedTax += 17168 + (taxable - 100525) * 0.24;
    }

    const ficaSS = Math.min(gross, 168600) * 0.062;
    const ficaMed = gross * 0.0145;
    const fica = ficaSS + ficaMed;
    const stateTax = gross * 0.045; // ~4.5% flat estimate
    const totalTaxes = fedTax + fica + stateTax;
    const netAnnual = Math.max(0, gross - totalTaxes);

    return {
      gross,
      federalTax: Math.round(fedTax),
      taxLabel1: 'Federal Income Tax',
      ficaTax: Math.round(fica),
      taxLabel2: 'FICA (Social Security & Medicare)',
      stateTax: Math.round(stateTax),
      taxLabel3: 'Estimated State Tax',
      totalTaxes: Math.round(totalTaxes),
      netAnnual: Math.round(netAnnual),
      netMonthly: Math.round(netAnnual / 12),
      netBiweekly: Math.round(netAnnual / 26),
      netHourly: netAnnual / (52 * 40),
      effectiveRate: gross > 0 ? (totalTaxes / gross) * 100 : 0,
    };
  }, [grossSalary, filingStatus, currency.code]);

  const copyResults = () => {
    const text = `Salary & Take-Home Paycheck (${currency.code}):
Gross Annual Salary: ${formatCurrency(stats.gross)}
Estimated Total Deductions: ${formatCurrency(stats.totalTaxes)} (${stats.effectiveRate.toFixed(1)}%)
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
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Income & Paycheck Details
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              Active: {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gross Annual Base Salary ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={grossSalary}
                  placeholder={
                    currency.code === 'INR'
                      ? 'e.g. 1200000 (12 LPA)'
                      : currency.code === 'EUR'
                      ? 'e.g. 50000'
                      : 'e.g. 75000'
                  }
                  onChange={(e) => setGrossSalary(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {currency.code !== 'INR' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tax Filing Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFilingStatus('single')}
                    className={`py-2.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                      filingStatus === 'single'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
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
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
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
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Estimated Net Take-Home Pay
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 break-words">
                {formatCurrency(stats.netMonthly, { decimals: 0 })}
                <span className="text-sm font-normal text-slate-300 ml-1">/mo</span>
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

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Net Annual Paycheck:</span>
              <span className="font-bold text-white">{formatCurrency(stats.netAnnual, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Bi-Weekly Paycheck:</span>
              <span className="font-semibold text-emerald-300">{formatCurrency(stats.netBiweekly, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Equivalent Hourly Rate:</span>
              <span className="font-semibold text-white">
                {formatCurrency(stats.netHourly, { decimals: 2 })}/hr
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel1}:</span>
              <span className="font-semibold">{formatCurrency(stats.federalTax, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel2}:</span>
              <span className="font-semibold">{formatCurrency(stats.ficaTax, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">{stats.taxLabel3}:</span>
              <span className="font-semibold">{formatCurrency(stats.stateTax, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-slate-300">Total Deductions & Taxes:</span>
              <span className="font-bold text-rose-300">
                {formatCurrency(stats.totalTaxes, { decimals: 0 })} ({stats.effectiveRate.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
