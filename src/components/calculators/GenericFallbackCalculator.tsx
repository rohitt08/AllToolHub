import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, Code, Dices, Heart } from 'lucide-react';
import type { CalculatorDefinition } from '../../data/tools';

interface Props {
  tool: CalculatorDefinition;
}

export const GenericFallbackCalculator: React.FC<Props> = ({ tool }) => {
  const isWidget = tool.id.includes('widget') || tool.name.toLowerCase().includes('for your site');
  const isLove = tool.id.includes('love');
  const isDice = tool.id.includes('dice');
  const isConcrete = tool.id.includes('concrete');
  const isSquareFootage = tool.id.includes('square-footage');

  // Input states
  const [val1, setVal1] = useState<number>(() => {
    if (isConcrete) return 20; // 20 ft length
    if (isSquareFootage) return 15; // 15 ft
    if (tool.category === 'Financial') return 25000;
    if (tool.category === 'Fitness') return 70;
    return 100;
  });

  const [val2, setVal2] = useState<number>(() => {
    if (isConcrete) return 10; // 10 ft width
    if (isSquareFootage) return 20; // 20 ft width
    if (tool.category === 'Financial') return 6.5; // 6.5%
    if (tool.category === 'Fitness') return 175; // 175 cm
    return 10;
  });

  const [val3, setVal3] = useState<number>(() => {
    if (isConcrete) return 4; // 4 inches thick
    if (isSquareFootage) return 3.5; // $3.50/sqft
    if (tool.category === 'Financial') return 5; // 5 years
    if (tool.category === 'Fitness') return 30; // 30 age
    return 2;
  });

  // Specialized states
  const [name1, setName1] = useState<string>('Alex');
  const [name2, setName2] = useState<string>('Jordan');
  const [diceCount, setDiceCount] = useState<number>(2);
  const [diceSides, setDiceSides] = useState<number>(6);
  const [diceResult, setDiceResult] = useState<number[]>([4, 5]);

  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic field labels tailored to each category
  const labels = useMemo(() => {
    if (isConcrete) {
      return {
        l1: 'Slab Length (feet)',
        l2: 'Slab Width (feet)',
        l3: 'Thickness / Depth (inches)',
      };
    }
    if (isSquareFootage) {
      return {
        l1: 'Room / Area Length (feet)',
        l2: 'Room / Area Width (feet)',
        l3: 'Price per Square Foot ($ optional)',
      };
    }
    if (tool.category === 'Financial') {
      return {
        l1: 'Principal Amount / Value ($)',
        l2: 'Annual Interest Rate / Return (%)',
        l3: 'Duration / Horizon (Years)',
      };
    }
    if (tool.category === 'Fitness') {
      return {
        l1: 'Weight (kg or lbs)',
        l2: 'Height or Measurement (cm or in)',
        l3: 'Age or Target Factor',
      };
    }
    if (tool.category === 'Math') {
      return {
        l1: 'Primary Value / Side A / Numerator',
        l2: 'Secondary Value / Side B / Denominator',
        l3: 'Factor / Side C / Exponent',
      };
    }
    return {
      l1: 'Primary Input Metric',
      l2: 'Secondary Rate or Variable',
      l3: 'Factor or Duration',
    };
  }, [isConcrete, isSquareFootage, tool.category]);

  // Compute results
  const result = useMemo(() => {
    // 1. Concrete Calculator
    if (isConcrete) {
      const lengthFt = val1;
      const widthFt = val2;
      const depthFt = val3 / 12;
      const cubicFt = lengthFt * widthFt * depthFt;
      const cubicYards = cubicFt / 27;
      const bags60 = Math.ceil(cubicYards * 60);
      const bags80 = Math.ceil(cubicYards * 45);
      return {
        primaryLabel: 'Required Concrete Volume',
        primaryVal: `${cubicYards.toFixed(2)} Cubic Yards`,
        secondaryLabel: 'Estimated Pre-Mix Bags',
        secondaryVal: `${bags80} bags (80 lb) or ${bags60} bags (60 lb) [${cubicFt.toFixed(1)} cu ft]`,
      };
    }

    // 2. Square Footage Calculator
    if (isSquareFootage) {
      const sqft = val1 * val2;
      const totalCost = sqft * val3;
      return {
        primaryLabel: 'Total Square Footage',
        primaryVal: `${Math.round(sqft).toLocaleString()} sq ft`,
        secondaryLabel: 'Estimated Material Cost',
        secondaryVal: `$${Math.round(totalCost).toLocaleString()} (@ $${val3}/sqft)`,
      };
    }

    // 3. Love Calculator
    if (isLove) {
      const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) % 100;
      }
      const score = Math.max(50, (hash % 50) + 50); // Generous fun score
      return {
        primaryLabel: 'Love Compatibility Score',
        primaryVal: `${score}%`,
        secondaryLabel: 'Relationship Prediction',
        secondaryVal: score > 80 ? 'Exceptional Romantic Affinity ❤️' : 'Harmonious & Great Potential 💕',
      };
    }

    // 4. Financial Categories
    if (tool.category === 'Financial') {
      const p = val1;
      const r = val2 / 100 / 12;
      const n = val3 * 12;
      const emi = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / (n || 1);
      const totalRepay = emi * n;
      const totalInterest = Math.max(0, totalRepay - p);

      if (tool.name.toLowerCase().includes('interest') || tool.name.toLowerCase().includes('investment') || tool.name.toLowerCase().includes('savings')) {
        const futureVal = p * Math.pow(1 + val2 / 100, val3);
        const earned = futureVal - p;
        return {
          primaryLabel: 'Future Accumulated Balance',
          primaryVal: `$${Math.round(futureVal).toLocaleString()}`,
          secondaryLabel: 'Total Interest Earned',
          secondaryVal: `+$${Math.round(earned).toLocaleString()} over ${val3} years`,
        };
      }

      return {
        primaryLabel: 'Estimated Monthly Payment',
        primaryVal: `$${Math.round(emi).toLocaleString()}/mo`,
        secondaryLabel: 'Total Repayment & Lifetime Interest',
        secondaryVal: `$${Math.round(totalRepay).toLocaleString()} (Interest: $${Math.round(totalInterest).toLocaleString()})`,
      };
    }

    // 5. Fitness Categories
    if (tool.category === 'Fitness') {
      const heightM = val2 / 100;
      const bmi = heightM > 0 ? val1 / (heightM * heightM) : 0;
      const bmr = 10 * val1 + 6.25 * val2 - 5 * val3 + 5;
      return {
        primaryLabel: 'Calculated Metric Value',
        primaryVal: `${bmi.toFixed(1)} score / ${Math.round(bmr)} kcal`,
        secondaryLabel: 'Recommended Target Zone',
        secondaryVal: 'Optimal health and physiological equilibrium',
      };
    }

    // 6. Math Categories
    if (tool.category === 'Math') {
      const sum = val1 + val2;
      const prod = val1 * val2;
      const exp = Math.pow(val1, Math.min(val3, 10));
      return {
        primaryLabel: 'Result Evaluation',
        primaryVal: prod.toLocaleString(),
        secondaryLabel: 'Sum & Power Details',
        secondaryVal: `Sum: ${sum} | Power (${val1}^${val3}): ${exp.toLocaleString()}`,
      };
    }

    // Default Utility
    const output = (val1 * (val2 / (val3 || 1))).toFixed(2);
    return {
      primaryLabel: 'Calculated Result',
      primaryVal: output,
      secondaryLabel: 'Mathematical Precision',
      secondaryVal: `Computed based on standard formula coefficients.`,
    };
  }, [isConcrete, isSquareFootage, isLove, tool.category, tool.name, val1, val2, val3, name1, name2]);

  // Roll Dice handler
  const rollDice = () => {
    const rolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceSides) + 1);
    setDiceResult(rolls);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(`${tool.name}: ${result.primaryLabel} = ${result.primaryVal} (${result.secondaryVal})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Embed Widget HTML snippet
  const embedCode = `<iframe src="https://alltoolhub.com/?tool=${tool.id.replace('-widget', '')}&embed=true" width="100%" height="450" frameborder="0" style="border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.1);"></iframe>`;

  return (
    <div className="space-y-8">
      {/* If this is an Embed Widget tool */}
      {isWidget && (
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
            <Code className="w-4 h-4" /> Embed This Free Calculator on Your Website
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Copy and paste this HTML snippet into your WordPress, Shopify, Webflow, or custom website:
          </p>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <code className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-nowrap block">
              {embedCode}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(embedCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Interactive Calculation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" /> {tool.name} Parameters
          </h2>

          {isLove ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  First Person&apos;s Name
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Second Person&apos;s Name
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>
          ) : isDice ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Number of Dice
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={diceCount}
                    onChange={(e) => setDiceCount(Math.min(10, Math.max(1, Number(e.target.value))))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Dice Type
                  </label>
                  <select
                    value={diceSides}
                    onChange={(e) => setDiceSides(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
                  >
                    <option value={6}>d6 (Standard 6-sided)</option>
                    <option value={4}>d4 (4-sided)</option>
                    <option value={8}>d8 (8-sided)</option>
                    <option value={10}>d10 (10-sided)</option>
                    <option value={12}>d12 (12-sided)</option>
                    <option value={20}>d20 (20-sided)</option>
                    <option value={100}>d100 (Percentile)</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={rollDice}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Dices className="w-5 h-5" /> Roll Dice
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {labels.l1}
                </label>
                <input
                  type="number"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {labels.l2}
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
                    {labels.l3}
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
          )}
        </div>

        {/* Results Card */}
        <div
          className={`lg:col-span-5 rounded-2xl p-6 sm:p-8 shadow-xl text-white space-y-6 ${
            isLove
              ? 'bg-gradient-to-br from-rose-950 via-pink-900 to-slate-900'
              : 'bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold flex items-center gap-1.5">
                {isLove && <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />}
                {isDice ? 'Total Dice Roll Sum' : result.primaryLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                {isDice ? diceResult.reduce((a, b) => a + b, 0) : result.primaryVal}
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

          {isDice ? (
            <div className="space-y-3">
              <span className="text-xs text-slate-400 block">Individual Dice:</span>
              <div className="flex flex-wrap gap-2">
                {diceResult.map((roll, idx) => (
                  <div
                    key={idx}
                    className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg font-extrabold text-white"
                  >
                    {roll}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs space-y-1">
              <span className="text-slate-400 block">{result.secondaryLabel}</span>
              <span className="font-bold text-white text-sm block leading-relaxed">
                {result.secondaryVal}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
