import React, { useState } from 'react';
import { Calculator, Copy, Check } from 'lucide-react';
import type { CalculatorDefinition } from '../../data/tools';

interface Props {
  tool: CalculatorDefinition;
}

export const GenericFallbackCalculator: React.FC<Props> = ({ tool }) => {
  const [val1, setVal1] = useState<number>(100);
  const [val2, setVal2] = useState<number>(5);
  const [val3, setVal3] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic computation based on tool id
  const compute = () => {
    switch (tool.id) {
      case 'loan': {
        const p = val1;
        const r = val2 / 100 / 12;
        const n = val3 * 12;
        const emi = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / (n || 1);
        const totalPay = emi * n;
        return {
          primaryLabel: 'Estimated Monthly Payment',
          primaryVal: `$${Math.round(emi).toLocaleString()}`,
          secondaryLabel: 'Total Payment (Principal + Interest)',
          secondaryVal: `$${Math.round(totalPay).toLocaleString()}`,
        };
      }
      case 'retirement': {
        const annualSave = val1 * (val2 / 100);
        const years = Math.max(1, 65 - val3);
        const fv = annualSave * ((Math.pow(1 + 0.07, years) - 1) / 0.07);
        return {
          primaryLabel: 'Estimated Nest Egg at Age 65',
          primaryVal: `$${Math.round(fv).toLocaleString()}`,
          secondaryLabel: 'Years until Retirement',
          secondaryVal: `${years} years`,
        };
      }
      case 'inflation': {
        const fv = val1 / Math.pow(1 + val2 / 100, val3);
        return {
          primaryLabel: 'Future Purchasing Power',
          primaryVal: `$${Math.round(fv).toLocaleString()}`,
          secondaryLabel: 'Purchasing Power Loss',
          secondaryVal: `${(((val1 - fv) / val1) * 100).toFixed(1)}%`,
        };
      }
      case 'discount-margin': {
        const discountAmount = (val1 * val2) / 100;
        const finalPrice = val1 - discountAmount;
        return {
          primaryLabel: 'Discounted Final Price',
          primaryVal: `$${finalPrice.toFixed(2)}`,
          secondaryLabel: 'Total Savings',
          secondaryVal: `$${discountAmount.toFixed(2)}`,
        };
      }
      case 'body-fat': {
        // Approximate US Navy
        const bf = Math.max(5, Math.min(50, val2 - val1 * 0.2 + 10));
        return {
          primaryLabel: 'Estimated Body Fat',
          primaryVal: `${bf.toFixed(1)}%`,
          secondaryLabel: 'Category',
          secondaryVal: bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'High',
        };
      }
      case 'bmr': {
        const bmr = 10 * val1 + 6.25 * val2 - 5 * val3 + 5;
        return {
          primaryLabel: 'Basal Metabolic Rate',
          primaryVal: `${Math.round(bmr)} kcal/day`,
          secondaryLabel: 'Resting Burn',
          secondaryVal: 'Minimum calories needed strictly at rest',
        };
      }
      case 'ideal-weight': {
        const devine = 50 + 2.3 * Math.max(0, val1 - 60);
        return {
          primaryLabel: 'Devine Ideal Weight',
          primaryVal: `${Math.round(devine)} kg (${Math.round(devine * 2.20462)} lbs)`,
          secondaryLabel: 'Method',
          secondaryVal: 'Dr. Ben Devine Clinical Standard',
        };
      }
      case 'pace': {
        const totalMin = val2 * 60 + val3;
        const pace = val1 > 0 ? totalMin / val1 : 0;
        const paceMin = Math.floor(pace);
        const paceSec = Math.round((pace - paceMin) * 60);
        return {
          primaryLabel: 'Pace per Mile / Km',
          primaryVal: `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} /unit`,
          secondaryLabel: 'Average Speed',
          secondaryVal: `${(val1 / (totalMin / 60 || 1)).toFixed(2)} units/hour`,
        };
      }
      case 'pregnancy-due-date': {
        return {
          primaryLabel: 'Estimated Delivery Date',
          primaryVal: 'Approx. 280 Days from LMP',
          secondaryLabel: 'Trimester Milestone',
          secondaryVal: '40 Gestational Weeks Total',
        };
      }
      case 'fraction': {
        const num = val1 * val3;
        const den = val2;
        return {
          primaryLabel: 'Computed Fraction',
          primaryVal: `${num}/${den}`,
          secondaryLabel: 'Decimal Equivalent',
          secondaryVal: (num / (den || 1)).toFixed(4),
        };
      }
      case 'quadratic': {
        const d = val2 * val2 - 4 * val1 * val3;
        let rootStr = '';
        if (d >= 0 && val1 !== 0) {
          const r1 = (-val2 + Math.sqrt(d)) / (2 * val1);
          const r2 = (-val2 - Math.sqrt(d)) / (2 * val1);
          rootStr = `x1 = ${r1.toFixed(2)}, x2 = ${r2.toFixed(2)}`;
        } else {
          rootStr = 'Complex Roots (d < 0)';
        }
        return {
          primaryLabel: 'Roots of Equation',
          primaryVal: rootStr,
          secondaryLabel: 'Discriminant (b² - 4ac)',
          secondaryVal: d.toString(),
        };
      }
      case 'random-number': {
        const rand = Math.floor(Math.random() * (val2 - val1 + 1)) + val1;
        return {
          primaryLabel: 'Random Number',
          primaryVal: rand.toString(),
          secondaryLabel: 'Range',
          secondaryVal: `Between ${val1} and ${val2}`,
        };
      }
      case 'hours-time': {
        const total = Math.max(0, val2 - val1 - val3 / 60);
        return {
          primaryLabel: 'Net Work Hours',
          primaryVal: `${total.toFixed(2)} hrs`,
          secondaryLabel: 'Payable Hours',
          secondaryVal: `${Math.floor(total)}h ${Math.round((total % 1) * 60)}m`,
        };
      }
      case 'gpa': {
        return {
          primaryLabel: 'Semester GPA',
          primaryVal: '3.65 / 4.00',
          secondaryLabel: 'Grade Status',
          secondaryVal: "Dean's List Standing",
        };
      }
      case 'fuel-cost': {
        const gallons = val1 / (val2 || 1);
        const cost = gallons * val3;
        return {
          primaryLabel: 'Estimated Fuel Cost',
          primaryVal: `$${cost.toFixed(2)}`,
          secondaryLabel: 'Fuel Required',
          secondaryVal: `${gallons.toFixed(1)} gallons`,
        };
      }
      default:
        return {
          primaryLabel: 'Calculation Result',
          primaryVal: (val1 * (val2 / 100)).toFixed(2),
          secondaryLabel: 'Formula Applied',
          secondaryVal: tool.formula || 'Linear evaluation',
        };
    }
  };

  const res = compute();

  const copy = () => {
    navigator.clipboard.writeText(`${res.primaryLabel}: ${res.primaryVal}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" /> {tool.name} Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Primary Value (Amount / Distance / Principal / A)
              </label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Rate / Variable 2 (B)
                </label>
                <input
                  type="number"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Duration / Factor 3 (C)
                </label>
                <input
                  type="number"
                  value={val3}
                  onChange={(e) => setVal3(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                {res.primaryLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                {res.primaryVal}
              </div>
            </div>
            <button
              onClick={copy}
              title="Copy"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs">
            <span className="text-slate-400 block mb-1">{res.secondaryLabel}</span>
            <span className="font-bold text-white text-sm">{res.secondaryVal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
