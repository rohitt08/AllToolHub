import React, { useState } from 'react';
import { Delete, RotateCcw, Copy, Check } from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleNum = (char: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(char);
    } else {
      setDisplay(display + char);
    }
  };

  const handleOp = (op: string) => {
    setExpression((expression ? expression + ' ' : '') + display + ' ' + op);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleScientificFunction = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    try {
      switch (fn) {
        case 'sin':
          res = isRad ? Math.sin(val) : Math.sin((val * Math.PI) / 180);
          break;
        case 'cos':
          res = isRad ? Math.cos(val) : Math.cos((val * Math.PI) / 180);
          break;
        case 'tan':
          res = isRad ? Math.tan(val) : Math.tan((val * Math.PI) / 180);
          break;
        case 'log':
          res = Math.log10(val);
          break;
        case 'ln':
          res = Math.log(val);
          break;
        case 'sqrt':
          res = Math.sqrt(val);
          break;
        case 'sq':
          res = Math.pow(val, 2);
          break;
        case 'reciprocal':
          res = 1 / val;
          break;
        case 'factorial':
          res = factorial(Math.round(val));
          break;
        default:
          return;
      }
      setDisplay(Number(res.toFixed(8)).toString());
    } catch {
      setDisplay('Error');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= Math.min(n, 100); i++) r *= i;
    return r;
  };

  const handleEqual = () => {
    try {
      const fullExp = expression + ' ' + display;
      // Sanitize input to only allowed characters
      const sanitized = fullExp.replace(/×/g, '*').replace(/÷/g, '/');
      // Simple safe evaluation
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      setDisplay(Number(result.toFixed(8)).toString());
      setExpression('');
    } catch {
      setDisplay('Error');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
      {/* Display Screen */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-right space-y-2">
        <div className="text-xs text-slate-400 h-5 font-mono overflow-x-auto whitespace-nowrap">
          {expression || ' '}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsRad(!isRad)}
            className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-800 text-blue-400 hover:bg-slate-700"
          >
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white overflow-x-auto">
            {display}
          </div>
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-5 gap-2.5 text-sm font-semibold">
        {/* Scientific Row 1 */}
        <button
          onClick={() => handleScientificFunction('sin')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          sin
        </button>
        <button
          onClick={() => handleScientificFunction('cos')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          cos
        </button>
        <button
          onClick={() => handleScientificFunction('tan')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          tan
        </button>
        <button
          onClick={handleClear}
          className="p-3 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-rose-300 transition-colors flex items-center justify-center gap-1"
        >
          <RotateCcw className="w-4 h-4" /> C
        </button>
        <button
          onClick={handleDelete}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center"
        >
          <Delete className="w-4 h-4" />
        </button>

        {/* Scientific Row 2 */}
        <button
          onClick={() => handleScientificFunction('log')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          log
        </button>
        <button
          onClick={() => handleScientificFunction('ln')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          ln
        </button>
        <button
          onClick={() => handleScientificFunction('sqrt')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          √
        </button>
        <button
          onClick={() => handleScientificFunction('sq')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          x²
        </button>
        <button
          onClick={() => handleOp('/')}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          ÷
        </button>

        {/* Number Row 1 */}
        <button
          onClick={() => handleScientificFunction('factorial')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          n!
        </button>
        <button
          onClick={() => handleNum('7')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          7
        </button>
        <button
          onClick={() => handleNum('8')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          8
        </button>
        <button
          onClick={() => handleNum('9')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          9
        </button>
        <button
          onClick={() => handleOp('*')}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          ×
        </button>

        {/* Number Row 2 */}
        <button
          onClick={() => setDisplay(Math.PI.toString())}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          π
        </button>
        <button
          onClick={() => handleNum('4')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          4
        </button>
        <button
          onClick={() => handleNum('5')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          5
        </button>
        <button
          onClick={() => handleNum('6')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          6
        </button>
        <button
          onClick={() => handleOp('-')}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          −
        </button>

        {/* Number Row 3 */}
        <button
          onClick={() => setDisplay(Math.E.toString())}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          e
        </button>
        <button
          onClick={() => handleNum('1')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          1
        </button>
        <button
          onClick={() => handleNum('2')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          2
        </button>
        <button
          onClick={() => handleNum('3')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          3
        </button>
        <button
          onClick={() => handleOp('+')}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          +
        </button>

        {/* Number Row 4 */}
        <button
          onClick={() => handleScientificFunction('reciprocal')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors"
        >
          1/x
        </button>
        <button
          onClick={() => handleNum('0')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          0
        </button>
        <button
          onClick={() => handleNum('.')}
          className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-white transition-colors"
        >
          .
        </button>
        <button
          onClick={copyResult}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center gap-1"
          title="Copy result"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <button
          onClick={handleEqual}
          className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
};

