import React, { useEffect, useState } from 'react';
import type { CalculatorDefinition } from '../data/tools';
import { MortgageCalculator } from './calculators/MortgageCalculator';
import { CompoundInterestCalculator } from './calculators/CompoundInterestCalculator';
import { BmiCalculator } from './calculators/BmiCalculator';
import { CalorieCalculator } from './calculators/CalorieCalculator';
import { ScientificCalculator } from './calculators/ScientificCalculator';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { AgeCalculator } from './calculators/AgeCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { AutoLoanCalculator } from './calculators/AutoLoanCalculator';
import { SalaryTaxCalculator } from './calculators/SalaryTaxCalculator';
import { StatisticsCalculator } from './calculators/StatisticsCalculator';
import { IpSubnetCalculator } from './calculators/IpSubnetCalculator';
import { PasswordGenCalculator } from './calculators/PasswordGenCalculator';
import { GenericFallbackCalculator } from './calculators/GenericFallbackCalculator';
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Share2,
  Check,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  tool: CalculatorDefinition;
  onSelectTool: (toolId: string) => void;
  relatedTools: CalculatorDefinition[];
}

export const CalculatorDetail: React.FC<Props> = ({
  tool,
  onSelectTool,
  relatedTools,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic SEO title, OpenGraph, Canonical & Rich JSON-LD injection
  useEffect(() => {
    const pageTitle = `${tool.seoTitle} | AllToolHub`;
    const toolUrl = `https://alltoolhub.com/?tool=${tool.id}`;
    document.title = pageTitle;

    // Helper to safely set meta tags
    const setMeta = (nameOrProp: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${nameOrProp}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameOrProp, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary Meta
    setMeta('name', 'description', tool.seoDescription);
    setMeta('name', 'title', pageTitle);

    // Open Graph
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', tool.seoDescription);
    setMeta('property', 'og:url', toolUrl);

    // Twitter Card
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', tool.seoDescription);
    setMeta('name', 'twitter:url', toolUrl);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.setAttribute('href', toolUrl);
    }

    // Dynamic JSON-LD FAQ, HowTo, Breadcrumb & WebApplication Schema for Google Rich Snippets
    const schemaScriptId = 'calculator-json-ld';
    let script = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${toolUrl}#app`,
          name: tool.name,
          url: toolUrl,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All',
          description: tool.seoDescription,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${toolUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://alltoolhub.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `${tool.category} Calculators`,
              item: `https://alltoolhub.com/?category=${encodeURIComponent(tool.category)}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: tool.name,
              item: toolUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${toolUrl}#faq`,
          mainEntity: tool.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        },
        {
          '@type': 'HowTo',
          '@id': `${toolUrl}#howto`,
          name: `How to use the ${tool.name}`,
          description: tool.description,
          step: tool.howToSteps.map((step, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            text: step,
          })),
        },
      ],
    };

    script.textContent = JSON.stringify(jsonLdData);

    return () => {
      document.title = 'AllToolHub — 200+ Free Online Calculators for Daily Life, Finance, Health & Math';
      if (canonical) {
        canonical.setAttribute('href', 'https://alltoolhub.com/');
      }
      setMeta(
        'name',
        'description',
        'Free, instant online calculators for daily life: percentage, age, BMI, calorie deficit, tip, unit converter, salary paycheck, work hours, mortgage, loans, and scientific math. 100% accurate with step-by-step formulas.'
      );
      setMeta('property', 'og:url', 'https://alltoolhub.com/');
      setMeta('property', 'og:title', 'AllToolHub — 200+ Free Online Calculators');
      const s = document.getElementById(schemaScriptId);
      if (s) s.remove();
    };
  }, [tool]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderActiveCalculator = () => {
    switch (tool.id) {
      case 'mortgage':
        return <MortgageCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'bmi':
        return <BmiCalculator />;
      case 'calorie':
        return <CalorieCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'age-date':
        return <AgeCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'auto-loan':
        return <AutoLoanCalculator />;
      case 'salary-tax':
        return <SalaryTaxCalculator />;
      case 'statistics':
        return <StatisticsCalculator />;
      case 'ip-subnet':
        return <IpSubnetCalculator />;
      case 'password-gen':
        return <PasswordGenCalculator />;
      default:
        return <GenericFallbackCalculator tool={tool} />;
    }
  };

  return (
    <article className="space-y-8 animate-fade-in pb-16">
      {/* Breadcrumb Navigation (High SEO Value) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap py-0.5">
        <button
          onClick={() => onSelectTool('home')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium shrink-0 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span className="font-medium text-slate-600 dark:text-slate-300 shrink-0">{tool.category}</span>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0">{tool.name}</span>
      </nav>

      {/* Header & Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-2">
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 shadow-2xs">
              {tool.subCategory}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Tool Implementation */}
      <section aria-label="Interactive Calculator Tool">
        {renderActiveCalculator()}
      </section>

      {/* SEO Deep-Dive Content: Mathematical Formula & Steps */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Step-by-Step Instructions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" /> How to Use This Calculator
          </h2>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-decimal pl-5">
            {tool.howToSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Mathematical Formula Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Calculation Formula & Logic
          </h2>
          {tool.formula ? (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <code className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold block overflow-x-auto whitespace-pre-wrap">
                {tool.formula}
              </code>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Standard mathematical definitions applied.</p>
          )}
          <p className="text-xs text-slate-500 leading-relaxed">
            AllToolHub computes every metric in real-time within your browser. Values are never uploaded or retained on external servers, ensuring maximum privacy and instant calculation.
          </p>
        </div>
      </section>

      {/* SEO Frequently Asked Questions (FAQ Accordion with Rich Snippets) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {tool.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-3">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Calculators in the same category */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Related {tool.category} Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectTool(rel.id)}
                className="group cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
                      {rel.subCategory}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_3px_0_0_#1d4ed8] hover:shadow-[0_1px_0_0_#1d4ed8] hover:translate-y-[2px] transition-all">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
