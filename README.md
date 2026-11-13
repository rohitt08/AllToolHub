# AllToolHub — Next-Gen High-Reach Calculator & Utility Platform

A high-performance, modern replica and evolution of **[Calculator.net](https://www.calculator.net/)**, engineered for **superior SEO reach, modern SaaS UI/UX, and instant client-side calculation**.

---

## 🚀 Key Advantages Over Calculator.net

| Dimension | Calculator.net (Legacy) | AllToolHub (Modern Replica) |
| :--- | :--- | :--- |
| **Tech Stack** | Server-side PHP 8 + Apache + Rocky Linux + Legacy Vanilla JS + 2005 CSS tables | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide Icons |
| **Speed & TTFB** | Requires server trips for complex requests | 100% Instant Client-Side Math; Zero server latency, sub-50ms interaction |
| **UI / Design** | Dated grey boxes, basic HTML inputs, static tables, non-fluid mobile layout | Modern SaaS design, Dark/Light mode, interactive sliders, fluid SVG charts, clean typography |
| **SEO Rich Snippets** | Basic meta description and text tables | Full **Schema.org JSON-LD** (`WebApplication`, `FAQPage`, `HowToStep`, `BreadcrumbList`) |
| **Interactive Visuals** | Static GIF/PNG or basic table charts | Real-time dynamic visualizers (amortization bars, BMI gauge needle, compound growth bars, macro splits) |
| **User Productivity** | Manual copy/pasting | One-click **Copy Summary** with toast, **Print Calculation**, and **URL-shareable links** |
| **Search Experience** | Basic page search | Global **Instant Fuzzy Search Modal (`Ctrl+K`)** across all 100+ calculators and keywords |
| **Privacy** | Data submitted over HTTP/server | **100% Client-Side Privacy** — no financial or health inputs ever leave the browser |

---

## 🧮 Comprehensive Catalog of Tools & Categories

### 1. Financial Calculators
* **Mortgage Calculator**: Monthly P&I, property taxes, homeowners insurance, PMI, and loan payoff metrics.
* **Auto Loan Calculator**: Vehicle sticker price, trade-in equity, dealer sales taxes, and monthly loan schedules.
* **Compound Interest Calculator**: Initial principal, recurring monthly deposits, annual returns, and 20-year wealth visualizer.
* **Retirement & 401(k) Planner**: Target nest egg calculation using the 4% Safe Withdrawal Rule.
* **Salary & Take-Home Tax Calculator**: Federal income tax, FICA (Social Security & Medicare), state tax deductions, and bi-weekly/hourly net rates.
* **Personal Loan Calculator**: Fixed EMI installment calculator with interest-to-principal payoff ratios.
* **Inflation & Purchasing Power**: Historical and future cash purchasing power degradation.
* **Discount & Profit Margin**: Retail markdown savings and gross margin percentages.

### 2. Fitness & Health Calculators
* **BMI Calculator**: Metric and Imperial WHO classifications with interactive visual gauge needle and healthy weight bounds.
* **Calorie & TDEE Deficit Calculator**: Mifflin-St Jeor equation, weekly exercise multiplier, mild/standard deficit targets, and macro distribution (Protein, Carbs, Fats).
* **Body Fat Calculator**: US Navy tape measurement method (neck, waist, hip circumferences).
* **BMR Calculator**: Baseline survival metabolic burn at rest.
* **Ideal Body Weight Calculator**: Devine, Robinson, Hamwi, and Miller clinical formulas.
* **Running Pace Calculator**: 5K, 10K, half-marathon, and marathon split estimator.
* **Pregnancy Due Date Calculator**: Naegele rule calculation based on LMP and conception date.

### 3. Math & Science Calculators
* **Scientific Calculator**: Full trigonometry (sin, cos, tan with RAD/DEG toggle), logarithms (log, ln), roots, factorials ($n!$), powers, constants ($\pi, e$).
* **Percentage Calculator**: 4 dedicated formulas (What is $X\%$ of $Y$, $X$ is what $\%$ of $Y$, percentage increase/decrease change).
* **Fraction Calculator**: Step-by-step reduction, LCD simplification, mixed fraction conversion.
* **Statistics & Standard Deviation**: Mean, Median, Mode, Range, Sample Standard Deviation ($s$), Population SD ($\sigma$), and Variance.
* **Quadratic Formula Calculator**: Solves $ax^2 + bx + c = 0$ with discriminant analysis and complex roots.
* **Random Number Generator**: Range-bounded integer generator with duplicate exclusion.

### 4. Everyday Utilities & Tech Tools
* **Age & Date Difference Calculator**: Exact age down to years, months, days, minutes, and countdown to next birthday.
* **Work Hours & Timesheet Calculator**: Clock-in to clock-out with unpaid break deductions and gross payroll converter.
* **Tip & Bill Splitter**: Instant 10%, 15%, 18%, 20% gratuity buttons and per-person check division.
* **Universal Unit Converter**: Length, Weight/Mass, Temperature (Celsius, Fahrenheit, Kelvin), and Speed.
* **IPv4 Subnet & CIDR Calculator**: Subnet mask, network ID, broadcast IP, and usable host count for all prefixes ($/0$ to $/32$).
* **Secure Password Generator**: Cryptographically secure PRNG (`crypto.getRandomValues`) with custom entropy rules.

---

## 🔍 SEO Strategy for Maximum Organic Reach

To outrank Calculator.net on Google, Bing, and AI search engines (like Perplexity and ChatGPT Search), AllToolHub implements:

1. **Rich JSON-LD Structured Data Schema**:
   * `@type: WebApplication` with `applicationCategory: UtilitiesApplication`.
   * `@type: FAQPage` dynamically populated on every tool page to win Google FAQ rich snippet cards.
   * `@type: HowTo` with numbered step-by-step instructions.
   * `@type: BreadcrumbList` for enhanced search result breadcrumbs.
2. **Deep-Dive Educational Content**:
   * Google ranks calculator pages highest when accompanied by clear mathematical formulas, worked examples, and practical FAQs. Each tool includes educational breakdowns.
3. **Core Web Vitals Perfection**:
   * Built with Vite 6 and React 19 for instantaneous First Contentful Paint (FCP) and zero Cumulative Layout Shift (CLS).
4. **Complete Crawling Assets**:
   * Clean `public/robots.txt` and comprehensive `public/sitemap.xml` listing all calculator endpoints with weekly crawl priority.
5. **Dynamic Document Meta**:
   * Dynamic `<title>`, `<meta name="description">`, OpenGraph cards, and Twitter Cards updated on navigation.

---

## 🛠️ How to Run Locally

### Start Development Server
```bash
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

