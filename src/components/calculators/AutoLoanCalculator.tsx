import React, { useState, useMemo, useEffect } from 'react';
import { Car, Calendar, Percent, Copy, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const AutoLoanCalculator: React.FC = () => {
  const { currency, formatCurrency } = useCurrency();
  const [vehiclePrice, setVehiclePrice] = useState<number>(() => (currency.code === 'INR' ? 1000000 : 35000));
  const [downPayment, setDownPayment] = useState<number>(() => (currency.code === 'INR' ? 200000 : 5000));
  const [tradeInValue, setTradeInValue] = useState<number>(() => (currency.code === 'INR' ? 100000 : 2000));
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(() => (currency.code === 'INR' ? 8.5 : 5.9));
  const [salesTaxRate, setSalesTaxRate] = useState<number>(() => (currency.code === 'INR' ? 18.0 : 6.5));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currency.code === 'INR') {
      setVehiclePrice(1000000);
      setDownPayment(200000);
      setTradeInValue(100000);
      setInterestRate(8.5);
      setSalesTaxRate(18.0);
    } else {
      setVehiclePrice(35000);
      setDownPayment(5000);
      setTradeInValue(2000);
      setInterestRate(5.9);
      setSalesTaxRate(6.5);
    }
  }, [currency.code]);

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
    const text = `Auto / Vehicle Loan Summary (${currency.code}):
Vehicle Price: ${formatCurrency(vehiclePrice)}
Net Financed Loan: ${formatCurrency(stats.loanAmount)}
Term: ${termMonths} months @ ${interestRate}% APR
Monthly Payment: ${formatCurrency(stats.monthlyPayment)}/mo
Total Interest Paid: ${formatCurrency(stats.totalInterest)}`;
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
              <Car className="w-5 h-5 text-blue-600" /> Vehicle & Financing Details
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {currency.flag} {currency.code} ({currency.symbol})
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Price ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400 select-none">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min="1000"
                  step={currency.code === 'INR' ? '25000' : '500'}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
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
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tax / GST (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                Estimated Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1">
                {formatCurrency(stats.monthlyPayment)}
                <span className="text-base font-normal text-blue-300">/mo</span>
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
              <span className="text-slate-300">Total Financed Amount:</span>
              <span className="font-semibold">{formatCurrency(stats.loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Sales Tax / GST:</span>
              <span className="font-semibold">{formatCurrency(stats.salesTaxAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Lifetime Interest:</span>
              <span className="font-semibold text-emerald-400">+{formatCurrency(stats.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-slate-300">Total Loan Cost:</span>
              <span className="font-bold text-white">{formatCurrency(stats.totalCost)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
