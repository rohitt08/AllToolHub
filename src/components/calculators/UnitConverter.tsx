import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

type UnitType = 'length' | 'weight' | 'temp' | 'speed';

export const UnitConverter: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [val1, setVal1] = useState<string>('');
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

  const num1 = parseFloat(val1);
  const hasValue = !isNaN(num1);

  const convertedValue = useMemo(() => {
    if (!hasValue) return null;
    if (unitType === 'temp') {
      if (u1 === u2) return num1;
      if (u1 === 'celsius' && u2 === 'fahrenheit') return (num1 * 9) / 5 + 32;
      if (u1 === 'celsius' && u2 === 'kelvin') return num1 + 273.15;
      if (u1 === 'fahrenheit' && u2 === 'celsius') return ((num1 - 32) * 5) / 9;
      if (u1 === 'fahrenheit' && u2 === 'kelvin') return ((num1 - 32) * 5) / 9 + 273.15;
      if (u1 === 'kelvin' && u2 === 'celsius') return num1 - 273.15;
      if (u1 === 'kelvin' && u2 === 'fahrenheit') return ((num1 - 273.15) * 9) / 5 + 32;
      return num1;
    }

    const dict = rates[unitType];
    const r1 = (dict as Record<string, number>)[u1] || 1;
    const r2 = (dict as Record<string, number>)[u2] || 1;
    const base = num1 * r1;
    return base / r2;
  }, [unitType, num1, hasValue, u1, u2, rates]);

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
    if (convertedValue === null) return;
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
            className={`flex-1 py-2 text-xs sm:text-sm font-bold capitalize rounded-xl transition-all cursor-pointer ${
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
              step="any"
              value={val1}
              placeholder="1"
              onChange={(e) => setVal1(e.target.value)}
              className="w-full text-2xl font-bold px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={u1}
              onChange={(e) => setU1(e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white capitalize focus:outline-none cursor-pointer"
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
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
              title="Swap Units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Destination Output */}
          <div className="sm:col-span-2 space-y-2">
            <div className="w-full text-2xl font-bold px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-slate-900 dark:text-white overflow-x-auto whitespace-nowrap min-h-[58px] flex items-center">
              {convertedValue !== null ? Number(convertedValue.toFixed(4)).toLocaleString() : '—'}
            </div>
            <select
              value={u2}
              onChange={(e) => setU2(e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white capitalize focus:outline-none cursor-pointer"
            >
              {unitOptions[unitType].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Copy snippet button */}
        {convertedValue !== null && (
          <div className="flex justify-end pt-2">
            <button
              onClick={copyResult}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy result'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
