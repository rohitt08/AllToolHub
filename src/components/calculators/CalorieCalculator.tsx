import React, { useState, useMemo } from 'react';
import { Flame, Copy, Check } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Light exercise
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const numAge = parseFloat(age) || 0;
    const numH = parseFloat(heightCm) || 0;
    const numW = parseFloat(weightKg) || 0;

    if (numAge <= 0 || numH <= 0 || numW <= 0) {
      return null;
    }

    // Mifflin-St Jeor Equation
    let bmr = 10 * numW + 6.25 * numH - 5 * numAge;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activityLevel;
    const mildLoss = Math.max(1000, tdee - 250); // -0.5 lb/week
    const weightLoss = Math.max(1000, tdee - 500); // -1.0 lb/week
    const extremeLoss = Math.max(1000, tdee - 1000); // -2.0 lb/week
    const mildGain = tdee + 250; // +0.5 lb/week
    const weightGain = tdee + 500; // +1.0 lb/week

    // Standard Macro Split (40% Carb / 30% Protein / 30% Fat) on Weight Loss
    const targetCalories = Math.round(weightLoss);
    const proteinGrams = Math.round((targetCalories * 0.3) / 4);
    const carbGrams = Math.round((targetCalories * 0.4) / 4);
    const fatGrams = Math.round((targetCalories * 0.3) / 9);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      mildLoss: Math.round(mildLoss),
      weightLoss: Math.round(weightLoss),
      extremeLoss: Math.round(extremeLoss),
      mildGain: Math.round(mildGain),
      weightGain: Math.round(weightGain),
      macros: {
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams,
      },
    };
  }, [gender, age, heightCm, weightKg, activityLevel]);

  const copyResults = () => {
    if (!stats) return;
    const text = `Daily Calorie & TDEE Plan:
Maintenance (TDEE): ${stats.tdee.toLocaleString()} kcal/day
Weight Loss (1 lb/week): ${stats.weightLoss.toLocaleString()} kcal/day
Mild Weight Loss: ${stats.mildLoss.toLocaleString()} kcal/day
Lean Bulk: ${stats.mildGain.toLocaleString()} kcal/day
Recommended Macros (Weight Loss): ${stats.macros.protein}g Protein | ${stats.macros.carbs}g Carbs | ${stats.macros.fat}g Fats`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" /> Metabolic & Lifestyle Profile
          </h2>

          <div className="space-y-4">
            {/* Gender Toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  value={age}
                  placeholder="e.g. 28"
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={heightCm}
                  placeholder="e.g. 175"
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={weightKg}
                  placeholder="e.g. 72"
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Weekly Physical Activity
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
              >
                <option value={1.2}>Sedentary (Little or no exercise, desk job)</option>
                <option value={1.375}>Lightly active (Light exercise or sports 1-3 days/week)</option>
                <option value={1.55}>Moderately active (Moderate exercise 3-5 days/week)</option>
                <option value={1.725}>Very active (Hard exercise 6-7 days/week)</option>
                <option value={1.9}>Extra active (Intense training, athlete or physical job)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Daily Maintenance Calories (TDEE)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                {stats ? stats.tdee.toLocaleString() : '—'}
                <span className="text-sm font-normal text-slate-300 ml-1.5">kcal/day</span>
              </div>
            </div>
            {stats && (
              <button
                onClick={copyResults}
                title="Copy Results"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>

          {stats ? (
            <>
              {/* Goals Targets */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Basal Metabolic Rate (BMR):</span>
                  <span className="font-semibold">{stats.bmr.toLocaleString()} kcal</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Weight Loss (1 lb/week):</span>
                  <span className="font-bold text-emerald-400">{stats.weightLoss.toLocaleString()} kcal</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Mild Weight Loss (0.5 lb/week):</span>
                  <span className="font-semibold text-teal-300">{stats.mildLoss.toLocaleString()} kcal</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Lean Muscle Gain (+0.5 lb/week):</span>
                  <span className="font-semibold text-amber-300">{stats.mildGain.toLocaleString()} kcal</span>
                </div>
              </div>

              {/* Recommended Macros for Weight Loss */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                  Weight Loss Macro Target (40/30/30)
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Protein</span>
                    <span className="font-bold text-white text-sm">{stats.macros.protein}g</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Carbs</span>
                    <span className="font-bold text-white text-sm">{stats.macros.carbs}g</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Fats</span>
                    <span className="font-bold text-white text-sm">{stats.macros.fat}g</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center text-slate-300 text-sm">
              Enter your age, height, and body weight above to instantly compute your exact BMR, daily maintenance calories, and target weight loss macros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
