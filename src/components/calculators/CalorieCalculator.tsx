import React, { useState, useMemo } from 'react';
import { Flame, Copy, Check } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Light exercise
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activityLevel;
    const mildLoss = tdee - 250; // -0.5 lb/week
    const weightLoss = tdee - 500; // -1.0 lb/week
    const extremeLoss = tdee - 1000; // -2.0 lb/week
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
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Biological Sex</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                    gender === 'male'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                    gender === 'female'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  min="15"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  min="100"
                  max="240"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                {stats.tdee.toLocaleString()}
                <span className="text-base font-normal text-amber-200"> kcal/day</span>
              </div>
            </div>
            <button
              onClick={copyResults}
              title="Copy Calorie Plan"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-300 font-medium">Mild Weight Loss (-0.5 lb/wk)</span>
              <span className="font-bold text-emerald-400">{stats.mildLoss.toLocaleString()} kcal</span>
            </div>
            <div className="flex justify-between items-center bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30">
              <span className="text-amber-200 font-semibold">Standard Weight Loss (-1.0 lb/wk)</span>
              <span className="font-bold text-white text-sm">{stats.weightLoss.toLocaleString()} kcal</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-300 font-medium">Lean Muscle Gain (+0.5 lb/wk)</span>
              <span className="font-bold text-blue-300">{stats.mildGain.toLocaleString()} kcal</span>
            </div>
          </div>

          {/* Macronutrient breakdown */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-xs font-semibold text-amber-300 mb-2">Weight Loss Target Daily Macros:</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-400 block">Protein</span>
                <span className="text-sm font-bold text-rose-400">{stats.macros.protein}g</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-400 block">Carbs</span>
                <span className="text-sm font-bold text-blue-400">{stats.macros.carbs}g</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-400 block">Healthy Fat</span>
                <span className="text-sm font-bold text-amber-400">{stats.macros.fat}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

