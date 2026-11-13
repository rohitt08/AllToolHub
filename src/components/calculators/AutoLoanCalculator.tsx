import React, { useState, useMemo } from 'react';
import { Car, Calendar, Percent, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const AutoLoanCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [tradeInValue, setTradeInValue] = useState<string>('');
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<string>('');
  const [salesTaxRate, setSalesTaxRate] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const vp = parseFloat(vehiclePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const ti = parseFloat(tradeInValue) || 0;
    const ir = parseFloat(interestRate) || 0;
    const str = parseFloat(salesTaxRate) || 0;

    const taxablePrice = Math.max(0, vp - ti);
    const salesTaxAmount = taxablePrice * (str / 100);
    const loanAmount = Math.max(0, vp + salesTaxAmount - dp - ti);

    const monthlyRate = ir > 0 ? ir / 100 / 12 : 0;
    let monthlyPayment = 0;
    if (monthlyRate > 0 && termMonths > 0 && loanAmount > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else if (termMonths > 0 && loanAmount > 0) {
      monthlyPayment = loanAmount / termMonths;
    }

    const totalCost = monthlyPayment * termMonths;
    const totalInterest = Math.max(0, totalCost - loanAmount);

    return {
      vp,
      dp,
      ti,
      loanAmount: Math.round(loanAmount),
      salesTaxAmount: Math.round(salesTaxAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalCost: Math.round(totalCost),
      totalInterest: Math.round(totalInterest),
    };
  }, [vehiclePrice, downPayment, tradeInValue, termMonths, interestRate, salesTaxRate]);

  const copySummary = () => {
    const text = `Auto / Vehicle Loan Summary (${currency.code}):
Vehicle Price: ${formatCurrency(stats.vp)}
Net Financed Loan: ${formatCurrency(stats.loanAmount)}
Term: ${termMonths} months @ ${interestRate || '0'}% APR
Monthly Payment: ${formatCurrency(stats.monthlyPayment)}/mo
Total Interest Paid: ${formatCurrency(stats.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Vehicle Loan Inputs
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              Active: {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Sticker / Purchase Price ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={vehiclePrice}
                  placeholder={currency.code === 'INR' ? 'e.g. 1000000' : 'e.g. 35000'}
                  onChange={(e) => setVehiclePrice(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Cash Down Payment ({currency.symbol})
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
                    placeholder={currency.code === 'INR' ? 'e.g. 200000' : 'e.g. 5000'}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Trade-In Value ({currency.symbol})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={tradeInValue}
                    placeholder={currency.code === 'INR' ? 'e.g. 100000' : 'e.g. 2000'}
                    onChange={(e) => setTradeInValue(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Loan Term
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value={36}>36 Months (3 yrs)</option>
                    <option value={48}>48 Months (4 yrs)</option>
                    <option value={60}>60 Months (5 yrs)</option>
                    <option value={72}>72 Months (6 yrs)</option>
                    <option value={84}>84 Months (7 yrs)</option>
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
                    min="0"
                    value={interestRate}
                    placeholder={currency.code === 'INR' ? '8.5' : '5.9'}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Sales Tax / GST (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={salesTaxRate}
                    placeholder={currency.code === 'INR' ? '18.0' : '6.5'}
                    onChange={(e) => setSalesTaxRate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                Estimated Monthly Payment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 break-words">
                {formatCurrency(stats.monthlyPayment, { decimals: 0 })}
                <span className="text-sm font-normal text-slate-300 ml-1">/mo</span>
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

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Net Amount Financed:</span>
              <span className="font-semibold text-white">{formatCurrency(stats.loanAmount, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Sales Tax / GST:</span>
              <span className="font-semibold">{formatCurrency(stats.salesTaxAmount, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Interest Paid:</span>
              <span className="font-semibold text-indigo-300">{formatCurrency(stats.totalInterest, { decimals: 0 })}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-slate-300">Total Vehicle Cost:</span>
              <span className="font-bold text-white text-base">{formatCurrency(stats.totalCost, { decimals: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
