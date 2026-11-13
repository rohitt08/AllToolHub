import React, { useState, useMemo } from 'react';
import { Home, Calendar, Percent, Printer, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const MortgageCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [homePrice, setHomePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<string>('');
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>('');
  const [homeInsurance, setHomeInsurance] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insurance = parseFloat(homeInsurance) || 0;

    const principal = Math.max(0, price - down);
    const monthlyRate = rate > 0 ? rate / 100 / 12 : 0;
    const totalPayments = loanTermYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0 && totalPayments > 0 && principal > 0) {
      monthlyPI =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (totalPayments > 0 && principal > 0) {
      monthlyPI = principal / totalPayments;
    }

    const monthlyTax = (price * (taxRate / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    // PMI if down payment is less than 20%
    const downPct = price > 0 ? (down / price) * 100 : 0;
    const monthlyPMI = price > 0 && downPct < 20 ? (principal * 0.007) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalLoanCost = monthlyPI * totalPayments;
    const totalInterestPaid = Math.max(0, totalLoanCost - principal);

    return {
      price,
      down,
      downPct,
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      totalLoanCost,
      totalInterestPaid,
    };
  }, [homePrice, downPayment, loanTermYears, interestRate, propertyTaxRate, homeInsurance]);

  const copyResults = () => {
    const text = `Mortgage & EMI Breakdown (${currency.code}):
Home Price: ${formatCurrency(calculations.price)}
Down Payment: ${formatCurrency(calculations.down)} (${calculations.downPct.toFixed(1)}%)
Loan Amount: ${formatCurrency(calculations.principal)}
Interest Rate: ${interestRate || '0'}% | Term: ${loanTermYears} Years
Estimated Monthly Payment: ${formatCurrency(calculations.totalMonthly)}/mo
- Principal & Interest: ${formatCurrency(calculations.monthlyPI)}/mo
- Property Taxes: ${formatCurrency(calculations.monthlyTax)}/mo
- Home Insurance: ${formatCurrency(calculations.monthlyInsurance)}/mo
- PMI: ${formatCurrency(calculations.monthlyPMI)}/mo
Total Interest Paid: ${formatCurrency(calculations.totalInterestPaid)}
Total Loan Cost: ${formatCurrency(calculations.totalLoanCost)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const piPct = calculations.totalMonthly > 0 ? Math.round((calculations.monthlyPI / calculations.totalMonthly) * 100) : 0;
  const taxPct = calculations.totalMonthly > 0 ? Math.round((calculations.monthlyTax / calculations.totalMonthly) * 100) : 0;
  const insPct = calculations.totalMonthly > 0 ? Math.round((calculations.monthlyInsurance / calculations.totalMonthly) * 100) : 0;
  const pmiPct = calculations.totalMonthly > 0 ? Math.max(0, 100 - (piPct + taxPct + insPct)) : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" /> Loan Parameters
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              Active: {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Home / Property Purchase Price ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={homePrice}
                  placeholder={currency.code === 'INR' ? 'e.g. 5000000' : 'e.g. 400000'}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Down Payment ({currency.symbol})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={downPayment}
                    placeholder={currency.code === 'INR' ? 'e.g. 1000000' : 'e.g. 80000'}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Loan Term (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={interestRate}
                    placeholder={currency.code === 'INR' ? '8.5' : '6.5'}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Annual Property Tax (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={propertyTaxRate}
                    placeholder="1.2"
                    onChange={(e) => setPropertyTaxRate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Yearly Insurance ({currency.symbol})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-400 select-none">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={homeInsurance}
                    placeholder={currency.code === 'INR' ? '15000' : '1200'}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                Estimated Monthly Payment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 break-words">
                {formatCurrency(calculations.totalMonthly, { decimals: 0 })}
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

          {/* Breakdown progress bar */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 block">Payment Composition</span>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${piPct}%` }} className="bg-blue-500" title={`Principal & Interest: ${piPct}%`} />
              <div style={{ width: `${taxPct}%` }} className="bg-emerald-400" title={`Taxes: ${taxPct}%`} />
              <div style={{ width: `${insPct}%` }} className="bg-amber-400" title={`Insurance: ${insPct}%`} />
              {calculations.monthlyPMI > 0 && (
                <div style={{ width: `${pmiPct}%` }} className="bg-rose-400" title={`PMI: ${pmiPct}%`} />
              )}
            </div>
          </div>

          {/* Detailed numbers */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Principal & Interest
              </span>
              <span className="font-semibold">{formatCurrency(calculations.monthlyPI, { decimals: 0 })}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Property Taxes
              </span>
              <span className="font-semibold">{formatCurrency(calculations.monthlyTax, { decimals: 0 })}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Home Insurance
              </span>
              <span className="font-semibold">{formatCurrency(calculations.monthlyInsurance, { decimals: 0 })}</span>
            </div>

            {calculations.monthlyPMI > 0 && (
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> PMI (Down &lt; 20%)
                </span>
                <span className="font-semibold">{formatCurrency(calculations.monthlyPMI, { decimals: 0 })}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Loan Principal</span>
              <span className="font-bold text-white">{formatCurrency(calculations.principal, { decimals: 0 })}</span>
            </div>

            <div className="flex justify-between items-center pt-1.5">
              <span className="text-slate-300">Total Interest Over {loanTermYears} Yrs</span>
              <span className="font-bold text-blue-300">{formatCurrency(calculations.totalInterestPaid, { decimals: 0 })}</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Loan Summary
          </button>
        </div>
      </div>
    </div>
  );
};
