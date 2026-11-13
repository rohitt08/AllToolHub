import React, { useState, useMemo } from 'react';
import { Calendar, Gift, Clock, Copy, Check } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Next birthday calculation
    const currentYear = end.getFullYear();
    let nextBday = new Date(currentYear, start.getMonth(), start.getDate());
    if (nextBday < end) {
      nextBday = new Date(currentYear + 1, start.getMonth(), start.getDate());
    }
    const daysToNextBday = Math.ceil(
      (nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      daysToNextBday,
    };
  }, [birthDate, targetDate]);

  const copyResults = () => {
    if (!stats) return;
    const text = `Age Calculation:
Exact Age: ${stats.years} years, ${stats.months} months, ${stats.days} days
Total Days Lived: ${stats.totalDays.toLocaleString()} days
Total Hours: ${stats.totalHours.toLocaleString()} hours
Days Until Next Birthday: ${stats.daysToNextBday} days`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Date Inputs */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> Date Selection
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Age as of Date (Defaults to Today)
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                Your Exact Age
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                {stats ? (
                  <>
                    <span>{stats.years}</span> <span className="text-lg font-normal text-indigo-300">yrs</span>{' '}
                    <span>{stats.months}</span> <span className="text-lg font-normal text-indigo-300">mos</span>{' '}
                    <span>{stats.days}</span> <span className="text-lg font-normal text-indigo-300">days</span>
                  </>
                ) : (
                  <span className="text-sm font-normal text-rose-400">Invalid Date Selection</span>
                )}
              </div>
            </div>
            {stats && (
              <button
                onClick={copyResults}
                title="Copy Age Summary"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>

          {stats && (
            <>
              {/* Birthday Countdown */}
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <Gift className="w-6 h-6 text-pink-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-300 block">Next Birthday in:</span>
                  <span className="text-base font-bold text-white">
                    {stats.daysToNextBday} {stats.daysToNextBday === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>

              {/* Total Units */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                  <span className="text-slate-400 block text-[11px]">Total Days</span>
                  <span className="font-bold text-white text-sm">{stats.totalDays.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-slate-400 block text-[11px]">Total Hours</span>
                  <span className="font-bold text-white text-sm">{stats.totalHours.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                  <span className="text-slate-400 block text-[11px]">Total Minutes</span>
                  <span className="font-bold text-white text-sm">{stats.totalMinutes.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
