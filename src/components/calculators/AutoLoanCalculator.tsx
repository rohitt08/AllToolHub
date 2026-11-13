import React, { useState, useMemo } from 'react';
import { Car, DollarSign, Calendar, Percent, Copy, Check } from 'lucide-react';

export const AutoLoanCalculator: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(2000);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6.5);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const taxablePrice = Math.max(0, vehiclePrice - tradeInValue);
    const salesTaxAmount = taxablePrice * (salesTaxRate / 100);
    const loanAmount = Math.max(0, vehiclePrice + salesTaxAmount - downPayment - tradeInValue);

    const monthlyRate = interestRate > 0 ? interestRate / 100 / 12 : 0;
    let monthlyPayment = 0;
    if (monthlyRate > 0 && termMonths > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else if (termMonths > 0) {
      monthlyPayment = loanAmount / termMonths;
    }

    const totalCost = monthlyPayment * termMonths;
    const totalInterest = Math.max(0, totalCost - loanAmount);

    return {
      loanAmount: Math.round(loanAmount),
      salesTaxAmount: Math.round(salesTaxAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalCost: Math.round(totalCost),
      totalInterest: Math.round(totalInterest),
    };
  }, [vehiclePrice, downPayment, tradeInValue, termMonths, interestRate, salesTaxRate]);

  const copySummary = () => {
    const text = `Auto Loan Summary:
Vehicle Price: $${vehiclePrice.toLocaleString()}
Net Financed Loan: $${stats.loanAmount.toLocaleString()}
Term: ${termMonths} months @ ${interestRate}% APR
Monthly Payment: $${stats.monthlyPayment.toLocaleString()}/mo
Total Interest Paid: $${stats.totalInterest.toLocaleString()}`;
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
            <Car className="w-5 h-5 text-blue-600" /> Vehicle & Financing Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Cash Down Payment ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Trade-In Value ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Term (Months)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value={36}>36 mos (3 yrs)</option>
                    <option value={48}>48 mos (4 yrs)</option>
                    <option value={60}>60 mos (5 yrs)</option>
                    <option value={72}>72 mos (6 yrs)</option>
                    <option value={84}>84 mos (7 yrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Sales Tax (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                Estimated Monthly Payment
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                ${stats.monthlyPayment.toLocaleString()}
                <span className="text-base font-normal text-blue-300">/mo</span>
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

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Financed Amount:</span>
              <span className="font-semibold">${stats.loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Sales Tax:</span>
              <span className="font-semibold">${stats.salesTaxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Interest:</span>
              <span className="font-semibold text-emerald-400">+${stats.totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Loan Cost:</span>
              <span className="font-bold text-white">${stats.totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
