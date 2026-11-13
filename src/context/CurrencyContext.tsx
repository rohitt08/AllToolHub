import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', locale: 'en-IE' },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatCurrency: (amount: number, options?: { decimals?: number }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('alltoolhub_currency') as CurrencyCode | null;
      if (saved && (saved === 'INR' || saved === 'USD' || saved === 'EUR')) {
        return saved;
      }
    } catch {
      // Ignore localStorage failure in restricted contexts
    }
    return 'INR'; // Indian Rupee is DEFAULT everywhere
  });

  useEffect(() => {
    try {
      localStorage.setItem('alltoolhub_currency', currencyCode);
    } catch {
      // Ignore localStorage failure
    }
  }, [currencyCode]);

  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  const formatCurrency = (amount: number, options?: { decimals?: number }) => {
    if (isNaN(amount) || !isFinite(amount)) return `${currency.symbol}0`;
    const decimals = options?.decimals ?? 0;
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(amount);
    } catch {
      return `${currency.symbol}${amount.toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setCurrencyCode, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
