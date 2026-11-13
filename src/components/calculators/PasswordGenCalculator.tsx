import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Copy, Check, ShieldCheck } from 'lucide-react';

export const PasswordGenCalculator: React.FC = () => {
  const [length, setLength] = useState<number>(18);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) {
      setPassword('Select at least one character type');
      return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += charset[array[i] % charset.length];
    }
    setPassword(pwd);
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyPwd = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Generated Display */}
      <div className="relative flex items-center">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full text-lg sm:text-xl font-mono font-bold px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 pr-24 focus:outline-none"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          <button
            onClick={generate}
            title="Regenerate"
            className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={copyPwd}
            title="Copy Password"
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Length Slider */}
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Password Length</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{length} characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            Uppercase (A-Z)
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            Lowercase (a-z)
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            Numbers (0-9)
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            Symbols (!@#$%)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Generated client-side via Cryptographically Secure PRNG (window.crypto). Never sent to any server.</span>
      </div>
    </div>
  );
};

