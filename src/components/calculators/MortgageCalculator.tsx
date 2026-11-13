import React, { useState, useMemo } from 'react';
import { Home, DollarSign, Calendar, Percent, Printer, Copy, Check } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const principal = Math.max(0, homePrice - downPaymentAmount);
    const monthlyRate = interestRate > 0 ? interestRate / 100 / 12 : 0;
    const totalPayments = loanTermYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0 && totalPayments > 0) {
      monthlyPI =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (totalPayments > 0) {
      monthlyPI = principal / totalPayments;
    }

    const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;
    // PMI if down payment is less than 20%
    const monthlyPMI = downPaymentPercent < 20 ? (principal * 0.007) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalLoanCost = monthlyPI * totalPayments;
    const totalInterestPaid = Math.max(0, totalLoanCost - principal);

    return {
      downPaymentAmount,
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      totalLoanCost,
      totalInterestPaid,
    };
  }, [homePrice, downPaymentPercent, loanTermYears, interestRate, propertyTaxRate, homeInsurance]);

  const copySummary = () => {
    const text = `Mortgage Calculation:
Home Price: $${homePrice.toLocaleString()}
Down Payment: $${calculations.downPaymentAmount.toLocaleString()} (${downPaymentPercent}%)
Loan Term: ${loanTermYears} years @ ${interestRate}%
Estimated Monthly Payment: $${Math.round(calculations.totalMonthly).toLocaleString()}
- Principal & Interest: $${Math.round(calculations.monthlyPI).toLocaleString()}
- Property Taxes: $${Math.round(calculations.monthlyTax).toLocaleString()}
- Homeowners Insurance: $${Math.round(calculations.monthlyInsurance).toLocaleString()}
${calculations.monthlyPMI > 0 ? `- PMI: $${Math.round(calculations.monthlyPMI).toLocaleString()}\n` : ''}Total Interest Paid: $${Math.round(calculations.totalInterestPaid).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const piPct = Math.round((calculations.monthlyPI / calculations.totalMonthly) * 100) || 0;
  const taxPct = Math.round((calculations.monthlyTax / calculations.totalMonthly) * 100) || 0;
  const insPct = Math.round((calculations.monthlyInsurance / calculations.totalMonthly) * 100) || 0;
  const pmiPct = Math.round((calculations.monthlyPMI / calculations.totalMonthly) * 100) || 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" /> Loan Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Home Purchase Price</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  ${homePrice.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="10000"
                  max="10000000"
                  step="5000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full mt-2 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={Math.round(calculations.downPaymentAmount)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setDownPaymentPercent(homePrice > 0 ? (val / homePrice) * 100 : 0);
                    }}
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
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
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
                    min="0.1"
                    max="20"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Property Tax (%/yr)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Home Insurance ($/yr)
                </label>
                <input
                  type="number"
                  step="100"
                  min="0"
                  max="10000"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                Estimated Monthly Payment
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                ${Math.round(calculations.totalMonthly).toLocaleString()}
                <span className="text-lg font-normal text-blue-200">/mo</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copySummary}
                title="Copy Calculation Summary"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
              <button
                onClick={() => window.print()}
                title="Print Calculation"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Payment Visualizer Bar */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-2">
              Payment Breakdown
            </div>
            <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${piPct}%` }} className="bg-blue-500" title={`P&I: ${piPct}%`} />
              <div style={{ width: `${taxPct}%` }} className="bg-emerald-400" title={`Taxes: ${taxPct}%`} />
              <div style={{ width: `${insPct}%` }} className="bg-amber-400" title={`Insurance: ${insPct}%`} />
              {pmiPct > 0 && (
                <div style={{ width: `${pmiPct}%` }} className="bg-rose-400" title={`PMI: ${pmiPct}%`} />
              )}
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Principal & Interest
              </span>
              <span className="font-semibold">${Math.round(calculations.monthlyPI).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                Property Taxes
              </span>
              <span className="font-semibold">${Math.round(calculations.monthlyTax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                Home Insurance
              </span>
              <span className="font-semibold">${Math.round(calculations.monthlyInsurance).toLocaleString()}</span>
            </div>

            {calculations.monthlyPMI > 0 && (
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  PMI (Down &lt; 20%)
                </span>
                <span className="font-semibold text-rose-300">
                  ${Math.round(calculations.monthlyPMI).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Total Loan Principal:</span>
              <div className="font-bold text-sm text-white">${calculations.principal.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-slate-400">Total Lifetime Interest:</span>
              <div className="font-bold text-sm text-emerald-400">
                ${Math.round(calculations.totalInterestPaid).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

