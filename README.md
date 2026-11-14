<div align="center">

# AllToolHub

**The Fast, Privacy-First Suite of 200+ Free Online Calculators**  
*Engineered for daily life, finance, health, math, and technical workflows.*

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://alltoolhub.com)

</div>

---

## 🌟 Overview

**AllToolHub** is a production-ready, client-side web application offering **200+ accurate, instant calculators** across personal finance, fitness, mathematics, date/time, unit conversions, and computing.

Built with modern web standards, AllToolHub delivers sub-millisecond computations, zero server logging, adaptive multi-currency support (defaulting to Indian Rupees `₹`), and a clean, responsive UI with glassmorphic accents.

---

## 🚀 Key Highlights & Features

### 1. 200+ Calculators Across Core Categories
* **Money & Finance**: Home Mortgage EMI, Auto Vehicle Loans, Compound Interest & SIP Projections, Salary & Take-Home Paycheck (including the Indian New Tax Regime FY 2024–25 / 2025–26 with 87A rebate & EPF), Tip Splitters, and Retirement Planning.
* **Health & Fitness**: Body Mass Index (BMI) with WHO classification gauges, Calorie Deficit & TDEE Macro Planners (Mifflin-St Jeor), Body Fat Percentage, and BMR Basal Rate.
* **Math & Statistics**: Scientific engineering calculators, Percentage calculations (What is X% of Y, Percentage Change), Descriptive Statistics (Mean, Median, Mode, Variance, Sample/Population SD).
* **Everyday & Utilities**: Precise Age & Date difference countdowns, Universal Unit Converters (Length, Weight, Temperature, Speed), IPv4 CIDR Subnet Calculator, Secure Password Generator, and interactive widget embeds.

### 2. Multi-Currency Engine (Default: Indian Rupee `₹`)
* **Default Currency**: **Indian Rupee (INR — `₹`)** with standard South Asian number grouping (`en-IN`, e.g. `₹50,00,000`).
* **Instant Switching**: Seamless toggle between **`₹ INR`**, **`$ USD`**, and **`€ EUR`** directly from the navigation bar.
* **Smart Persistence**: Persists user selection in `localStorage` across all sessions without layout shifts.

### 3. Human-Centric UI & Responsive Design
* **Empty by Default**: All calculator inputs initialize clean and empty (`''`) with contextual placeholders—preventing stuck `0`s and leading-zero typing glitches.
* **Progressive Discovery**: Each category presents its top 9 tools with an intuitive **"View More"** button that expands 9 additional calculators per click.
* **Instant Search Modal**: Real-time fuzzy search across all tool names, descriptions, and tags.
* **Dark / Light Harmony**: Fully responsive dark mode with glassmorphic navbar and balanced color contrast.

### 4. High-Performance Typography
* **Body & Metrics**: [Inter](https://fonts.google.com/specimen/Inter) with `font-variant-numeric: tabular-nums` ensuring currency figures, tables, and numeric outputs lock into clean vertical alignment without horizontal jitter.
* **Headings**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for sharp, modern typography.

### 5. Enterprise-Grade SEO & Structured Data
* **Comprehensive Meta**: Dynamic `title`, `description`, canonical links, and social card previews (`OpenGraph` & `Twitter Cards`).
* **Rich Snippets (JSON-LD)**: Injects `WebApplication`, `BreadcrumbList`, `FAQPage`, `HowTo`, and `SoftwareApplication` schemas (with 4.9⭐ aggregate ratings) for prominent Google SERP presence.
* **Sitemap & Robots**: Full XML sitemap indexing all tools with search engine directives (`max-image-preview:large`, `max-snippet:-1`).

### 6. Privacy & Security
* **100% Client-Side**: All mathematical logic runs in the user's browser via Web APIs. No financial or health data is ever transmitted or logged to a remote server.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) with automated code-splitting |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Hosting & Edge** | [Cloudflare Pages](https://pages.cloudflare.com/) / Edge CDN |

---

## 📂 Project Structure

```text
AllToolHub/
├── public/
│   ├── _headers             # Cloudflare security headers & immutable asset caching
│   ├── favicon.png          # High-resolution favicon
│   ├── Logo.png             # Brand logo asset
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # Complete XML sitemap for 200+ tools
├── src/
│   ├── assets/              # Component image imports (Logo.png, Favicon.png)
│   ├── components/
│   │   ├── calculators/     # Dedicated calculator components:
│   │   │   ├── AgeCalculator.tsx
│   │   │   ├── AutoLoanCalculator.tsx
│   │   │   ├── BmiCalculator.tsx
│   │   │   ├── CalorieCalculator.tsx
│   │   │   ├── CompoundInterestCalculator.tsx
│   │   │   ├── GenericFallbackCalculator.tsx
│   │   │   ├── IpSubnetCalculator.tsx
│   │   │   ├── MortgageCalculator.tsx
│   │   │   ├── PasswordGenCalculator.tsx
│   │   │   ├── PercentageCalculator.tsx
│   │   │   ├── SalaryTaxCalculator.tsx
│   │   │   ├── ScientificCalculator.tsx
│   │   │   ├── StatisticsCalculator.tsx
│   │   │   ├── TipCalculator.tsx
│   │   │   └── UnitConverter.tsx
│   │   ├── CalculatorDetail.tsx # Deep-dive view with SEO schemas & related tools
│   │   ├── CurrencySelector.tsx # Dropdown currency switcher (INR / USD / EUR)
│   │   ├── DirectoryView.tsx    # Categorized grid with 9-item pagination
│   │   ├── Footer.tsx           # Brand footer with gradient lockup
│   │   ├── Navbar.tsx           # Sticky header with search & currency switcher
│   │   └── SearchModal.tsx      # Modal search with instant query filtering
│   ├── context/
│   │   └── CurrencyContext.tsx  # Global currency state & Intl.NumberFormat engine
│   ├── data/
│   │   └── tools.ts             # Registry of 200+ calculator definitions
│   ├── App.tsx                  # Root application state & URL sync
│   ├── index.css                # Tailwind imports, Inter typography & custom scrollbars
│   └── main.tsx                 # Entrypoint wrapped with CurrencyProvider
├── index.html                   # HTML entry with OpenGraph, Twitter & JSON-LD schemas
├── package.json                 # Project dependencies & build scripts
├── tsconfig.json                # TypeScript project configuration
└── vite.config.ts               # Vite configuration with chunk splitting
```

---

## 💻 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version `18.x` or `20.x` recommended)
* `npm` (version `9.x` or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohitt08/AllToolHub.git
   cd AllToolHub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This compiles TypeScript definitions (`tsc -p tsconfig.app.json`) and runs Vite to generate an optimized distribution bundle in `dist/`.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## ☁️ Deployment

AllToolHub is optimized for zero-configuration hosting on **Cloudflare Pages** or any static hosting platform (Vercel, Netlify, GitHub Pages).

### Cloudflare Pages Deployment
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Select **Create Application** > **Pages** > **Connect to Git**.
3. Choose the `rohitt08/AllToolHub` repository.
4. Set the build configuration:
   * **Framework preset**: `Vite`
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
   * **Environment Variable**: `NODE_VERSION: 20`
5. Click **Save and Deploy**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Engineered with precision ❤️ for AllToolHub.</sub>
</div>
