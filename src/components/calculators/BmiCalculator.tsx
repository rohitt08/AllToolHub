import React, { useState, useMemo } from 'react';
import { Activity, Copy, Check } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    let bmi = 0;
    let minHealthyWeight = 0;
    let maxHealthyWeight = 0;

    if (unit === 'metric') {
      const heightM = heightCm / 100;
      if (heightM > 0) {
        bmi = weightKg / (heightM * heightM);
        minHealthyWeight = 18.5 * (heightM * heightM);
        maxHealthyWeight = 24.9 * (heightM * heightM);
      }
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      if (totalInches > 0) {
        bmi = (weightLbs * 703) / (totalInches * totalInches);
        minHealthyWeight = (18.5 * (totalInches * totalInches)) / 703;
        maxHealthyWeight = (24.9 * (totalInches * totalInches)) / 703;
      }
    }

    let category = 'Normal weight';
    let categoryColor = 'text-emerald-500';
    let bgColor = 'bg-emerald-500';

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-500';
      bgColor = 'bg-blue-500';
    } else if (bmi < 25) {
      category = 'Normal weight';
      categoryColor = 'text-emerald-500';
      bgColor = 'bg-emerald-500';
    } else if (bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-amber-500';
      bgColor = 'bg-amber-500';
    } else {
      category = 'Obesity';
      categoryColor = 'text-rose-500';
      bgColor = 'bg-rose-500';
    }

    return {
      bmi: Number(bmi.toFixed(1)),
      category,
      categoryColor,
      bgColor,
      minHealthyWeight: Math.round(minHealthyWeight),
      maxHealthyWeight: Math.round(maxHealthyWeight),
    };
  }, [unit, heightCm, weightKg, heightFeet, heightInches, weightLbs]);

  const copySummary = () => {
    const text = `BMI Assessment:
BMI: ${result.bmi} (${result.category})
Optimal Healthy Weight Range: ${result.minHealthyWeight} - ${result.maxHealthyWeight} ${unit === 'metric' ? 'kg' : 'lbs'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // BMI Gauge needle position percentage (from 10 to 40)
  const needlePos = Math.min(100, Math.max(0, ((result.bmi - 10) / 30) * 100));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Body Metrics
            </h2>

            {/* Metric / Imperial Unit Toggle */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
              <button
                onClick={() => setUnit('metric')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  unit === 'metric'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Metric (cm, kg)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  unit === 'imperial'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                US / Imperial (ft, lbs)
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {unit === 'metric' ? (
              <>
                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Height</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{heightCm} cm</span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Weight</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{weightKg} kg</span>
                  </div>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="40"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600 cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Feet
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Inches
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Weight (lbs)</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{weightLbs} lbs</span>
                  </div>
                  <input
                    type="number"
                    min="50"
                    max="600"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                Your Body Mass Index (BMI)
              </span>
              <div className="text-5xl font-extrabold tracking-tight text-white mt-1">
                {result.bmi}
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

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">Category:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${result.categoryColor} bg-white/10`}
            >
              {result.category}
            </span>
          </div>

          {/* BMI Gauge Bar */}
          <div>
            <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner">
              <div className="w-[28%] bg-blue-400" title="Underweight (< 18.5)" />
              <div className="w-[22%] bg-emerald-400" title="Normal (18.5 - 24.9)" />
              <div className="w-[17%] bg-amber-400" title="Overweight (25 - 29.9)" />
              <div className="w-[33%] bg-rose-500" title="Obese (>= 30)" />
            </div>

            {/* Needle indicator */}
            <div className="relative w-full h-4 mt-1">
              <div
                style={{ left: `${needlePos}%` }}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              >
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white" />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          {/* Healthy Weight Recommendation */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm">
            <div className="text-slate-300 text-xs font-semibold mb-1">Recommended Healthy Weight Range:</div>
            <div className="text-lg font-bold text-emerald-400">
              {result.minHealthyWeight} — {result.maxHealthyWeight} {unit === 'metric' ? 'kg' : 'lbs'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Based on World Health Organization (WHO) healthy BMI bounds (18.5 – 24.9).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

