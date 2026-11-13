import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

type UnitType = 'length' | 'weight' | 'temp' | 'speed';

export const UnitConverter: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [val1, setVal1] = useState<number>(1);
  const [u1, setU1] = useState<string>('meter');
  const [u2, setU2] = useState<string>('foot');
  const [copied, setCopied] = useState<boolean>(false);

  // Conversion rates relative to base unit
  const rates = useMemo(() => {
    return {
      length: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344,
      },
      weight: {
        kilogram: 1,
        gram: 0.001,
        milligram: 0.000001,
        pound: 0.45359237,
        ounce: 0.0283495,
        ton: 907.185,
      },
      speed: {
        'm/s': 1,
        'km/h': 0.277778,
        mph: 0.44704,
        knot: 0.514444,
      },
    };
  }, []);

  const convertedValue = useMemo(() => {
    if (unitType === 'temp') {
      if (u1 === u2) return val1;
      if (u1 === 'celsius' && u2 === 'fahrenheit') return (val1 * 9) / 5 + 32;
      if (u1 === 'celsius' && u2 === 'kelvin') return val1 + 273.15;
      if (u1 === 'fahrenheit' && u2 === 'celsius') return ((val1 - 32) * 5) / 9;
      if (u1 === 'fahrenheit' && u2 === 'kelvin') return ((val1 - 32) * 5) / 9 + 273.15;
      if (u1 === 'kelvin' && u2 === 'celsius') return val1 - 273.15;
      if (u1 === 'kelvin' && u2 === 'fahrenheit') return ((val1 - 273.15) * 9) / 5 + 32;
      return val1;
    }

    const dict = rates[unitType];
    const r1 = (dict as Record<string, number>)[u1] || 1;
    const r2 = (dict as Record<string, number>)[u2] || 1;
    const base = val1 * r1;
    return base / r2;
  }, [unitType, val1, u1, u2, rates]);

  const handleTypeChange = (type: UnitType) => {
    setUnitType(type);
    if (type === 'length') {
      setU1('meter');
      setU2('foot');
    } else if (type === 'weight') {
      setU1('kilogram');
      setU2('pound');
    } else if (type === 'temp') {
      setU1('celsius');
      setU2('fahrenheit');
    } else if (type === 'speed') {
      setU1('km/h');
      setU2('mph');
    }
  };

  const swapUnits = () => {
    const temp = u1;
    setU1(u2);
    setU2(temp);
  };

  const copyResult = () => {
    const text = `${val1} ${u1} = ${Number(convertedValue.toFixed(4))} ${u2}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const unitOptions = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'],
    weight: ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton'],
    temp: ['celsius', 'fahrenheit', 'kelvin'],
    speed: ['km/h', 'mph', 'm/s', 'knot'],
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Type Selector */}
      <div className="flex justify-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
        {(['length', 'weight', 'temp', 'speed'] as UnitType[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTypeChange(t)}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold capitalize rounded-xl transition-all ${
              unitType === t
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Converter Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
          {/* Source */}
          <div className="sm:col-span-2 space-y-2">
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full text-2xl font-bold px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={u1}
              onChange={(e) => setU1(e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white capitalize focus:outline-none"
            >
              {unitOptions[unitType].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center sm:col-span-1">
            <button
              onClick={swapUnits}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
              title="Swap Units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Target */}
          <div className="sm:col-span-2 space-y-2">
            <div className="w-full text-2xl font-bold px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 overflow-x-auto whitespace-nowrap">
              {Number(convertedValue.toFixed(4))}
            </div>
            <select
              value={u2}
              onChange={(e) => setU2(e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white capitalize focus:outline-none"
            >
              {unitOptions[unitType].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Copy Result Bar */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500">
          <span>
            1 {u1} = {Number(((convertedValue / (val1 || 1)) || 0).toFixed(4))} {u2}
          </span>
          <button
            onClick={copyResult}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

