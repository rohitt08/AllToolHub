import fs from 'fs';
import path from 'path';

// All calculators requested by user
const RAW_CATEGORIES = [
  {
    category: 'Financial',
    subCategoryDefault: 'Money & Investment',
    tools: [
      { name: 'Mortgage Calculator', id: 'mortgage', sub: 'Mortgage & Real Estate', pop: true },
      { name: 'Loan Calculator', id: 'loan', sub: 'Loans & Debt', pop: true },
      { name: 'Auto Loan Calculator', id: 'auto-loan', sub: 'Auto Loans', pop: true },
      { name: 'Interest Calculator', id: 'interest', sub: 'Banking & Savings' },
      { name: 'Payment Calculator', id: 'payment', sub: 'Loans & Debt' },
      { name: 'Retirement Calculator', id: 'retirement', sub: 'Retirement Planning', pop: true },
      { name: 'Amortization Calculator', id: 'amortization', sub: 'Mortgage & Real Estate' },
      { name: 'Investment Calculator', id: 'investment', sub: 'Investment' },
      { name: 'Currency Calculator', id: 'currency', sub: 'Forex & Currency' },
      { name: 'Inflation Calculator', id: 'inflation', sub: 'Economics & Investment' },
      { name: 'Finance Calculator', id: 'finance', sub: 'General Finance' },
      { name: 'Mortgage Payoff Calculator', id: 'mortgage-payoff', sub: 'Mortgage & Real Estate' },
      { name: 'Income Tax Calculator', id: 'income-tax', sub: 'Taxes' },
      { name: 'Compound Interest Calculator', id: 'compound-interest', sub: 'Investment', pop: true },
      { name: 'Salary Calculator', id: 'salary-tax', sub: 'Taxes & Payroll', pop: true },
      { name: '401K Calculator', id: '401k', sub: 'Retirement Planning' },
      { name: 'Interest Rate Calculator', id: 'interest-rate', sub: 'Banking' },
      { name: 'Sales Tax Calculator', id: 'sales-tax', sub: 'Taxes' },
      { name: 'House Affordability Calculator', id: 'house-affordability', sub: 'Mortgage & Real Estate' },
      { name: 'Savings Calculator', id: 'savings', sub: 'Banking & Savings' },
      { name: 'Rent Calculator', id: 'rent', sub: 'Real Estate & Budget' },
      { name: 'Marriage Tax Calculator', id: 'marriage-tax', sub: 'Taxes' },
      { name: 'Estate Tax Calculator', id: 'estate-tax', sub: 'Taxes' },
      { name: 'Pension Calculator', id: 'pension', sub: 'Retirement Planning' },
      { name: 'Social Security Calculator', id: 'social-security', sub: 'Retirement Planning' },
      { name: 'Annuity Calculator', id: 'annuity', sub: 'Investment' },
      { name: 'Annuity Payout Calculator', id: 'annuity-payout', sub: 'Investment' },
      { name: 'Credit Card Calculator', id: 'credit-card', sub: 'Debt Payoff' },
      { name: 'Credit Cards Payoff Calculator', id: 'credit-cards-payoff', sub: 'Debt Payoff' },
      { name: 'Debt Payoff Calculator', id: 'debt-payoff', sub: 'Debt Payoff' },
      { name: 'Debt Consolidation Calculator', id: 'debt-consolidation', sub: 'Debt Payoff' },
      { name: 'Repayment Calculator', id: 'repayment', sub: 'Loans & Debt' },
      { name: 'Student Loan Calculator', id: 'student-loan', sub: 'Education Financing' },
      { name: 'College Cost Calculator', id: 'college-cost', sub: 'Education Financing' },
      { name: 'Simple Interest Calculator', id: 'simple-interest', sub: 'Banking & Savings' },
      { name: 'CD Calculator', id: 'cd', sub: 'Banking & Savings' },
      { name: 'Bond Calculator', id: 'bond', sub: 'Investment' },
      { name: 'Mutual Fund Calculator', id: 'mutual-fund', sub: 'Investment' },
      { name: 'Roth IRA Calculator', id: 'roth-ira', sub: 'Retirement Planning' },
      { name: 'IRA Calculator', id: 'ira', sub: 'Retirement Planning' },
      { name: 'RMD Calculator', id: 'rmd', sub: 'Retirement Planning' },
      { name: 'VAT Calculator', id: 'vat', sub: 'Taxes' },
      { name: 'Cash Back or Low Interest Calculator', id: 'cash-back-low-interest', sub: 'Auto Loans' },
      { name: 'Auto Lease Calculator', id: 'auto-lease', sub: 'Auto Loans' },
      { name: 'Depreciation Calculator', id: 'depreciation', sub: 'Business & Accounting' },
      { name: 'Average Return Calculator', id: 'average-return', sub: 'Investment' },
      { name: 'Margin Calculator', id: 'margin', sub: 'Business & Retail' },
      { name: 'Discount Calculator', id: 'discount-margin', sub: 'Shopping & Retail' },
      { name: 'Business Loan Calculator', id: 'business-loan', sub: 'Commercial Loans' },
      { name: 'Debt-to-Income Ratio Calculator', id: 'dti-ratio', sub: 'Mortgage & Real Estate' },
      { name: 'Real Estate Calculator', id: 'real-estate', sub: 'Real Estate' },
      { name: 'Take-Home-Paycheck Calculator', id: 'take-home-paycheck', sub: 'Taxes & Payroll' },
      { name: 'Personal Loan Calculator', id: 'personal-loan', sub: 'Loans & Debt' },
      { name: 'Boat Loan Calculator', id: 'boat-loan', sub: 'Vehicle Financing' },
      { name: 'Lease Calculator', id: 'lease', sub: 'Commercial & Property' },
      { name: 'Refinance Calculator', id: 'refinance', sub: 'Mortgage & Real Estate' },
      { name: 'Budget Calculator', id: 'budget', sub: 'Personal Budget' },
      { name: 'Rental Property Calculator', id: 'rental-property', sub: 'Real Estate' },
      { name: 'IRR Calculator', id: 'irr', sub: 'Investment' },
      { name: 'ROI Calculator', id: 'roi', sub: 'Investment' },
      { name: 'APR Calculator', id: 'apr', sub: 'Loans & Interest' },
      { name: 'FHA Loan Calculator', id: 'fha-loan', sub: 'Mortgage & Real Estate' },
      { name: 'VA Mortgage Calculator', id: 'va-mortgage', sub: 'Mortgage & Real Estate' },
      { name: 'Home Equity Loan Calculator', id: 'home-equity-loan', sub: 'Mortgage & Real Estate' },
      { name: 'HELOC Calculator', id: 'heloc', sub: 'Mortgage & Real Estate' },
      { name: 'Down Payment Calculator', id: 'down-payment', sub: 'Mortgage & Real Estate' },
      { name: 'Rent vs. Buy Calculator', id: 'rent-vs-buy', sub: 'Real Estate' },
      { name: 'Payback Period Calculator', id: 'payback-period', sub: 'Investment' },
      { name: 'Present Value Calculator', id: 'present-value', sub: 'Financial Math' },
      { name: 'Future Value Calculator', id: 'future-value', sub: 'Financial Math' },
      { name: 'Commission Calculator', id: 'commission', sub: 'Sales & Real Estate' },
      { name: 'Mortgage Calculator UK', id: 'mortgage-uk', sub: 'International Mortgages' },
      { name: 'Canadian Mortgage Calculator', id: 'canadian-mortgage', sub: 'International Mortgages' },
      { name: 'Mortgage Amortization Calculator', id: 'mortgage-amortization', sub: 'Mortgage & Real Estate' },
      { name: 'Percent Off Calculator', id: 'percent-off', sub: 'Shopping & Retail' }
    ]
  },
  {
    category: 'Fitness',
    subCategoryDefault: 'Health & Nutrition',
    tools: [
      { name: 'BMI Calculator', id: 'bmi', sub: 'Body Composition', pop: true },
      { name: 'Calorie Calculator', id: 'calorie', sub: 'Diet & Nutrition', pop: true },
      { name: 'Body Fat Calculator', id: 'body-fat', sub: 'Body Composition', pop: true },
      { name: 'BMR Calculator', id: 'bmr', sub: 'Metabolism' },
      { name: 'Macro Calculator', id: 'macro', sub: 'Diet & Nutrition' },
      { name: 'Ideal Weight Calculator', id: 'ideal-weight', sub: 'Body Composition' },
      { name: 'Pregnancy Calculator', id: 'pregnancy', sub: 'Pregnancy & Birth' },
      { name: 'Pregnancy Weight Gain Calculator', id: 'pregnancy-weight-gain', sub: 'Pregnancy & Birth' },
      { name: 'Pregnancy Conception Calculator', id: 'pregnancy-conception', sub: 'Pregnancy & Birth' },
      { name: 'Due Date Calculator', id: 'pregnancy-due-date', sub: 'Pregnancy & Birth' },
      { name: 'Pace Calculator', id: 'pace', sub: 'Running & Athletics' },
      { name: 'Army Body Fat Calculator', id: 'army-body-fat', sub: 'Body Composition' },
      { name: 'Carbohydrate Calculator', id: 'carbohydrate', sub: 'Diet & Nutrition' },
      { name: 'Lean Body Mass Calculator', id: 'lean-body-mass', sub: 'Body Composition' },
      { name: 'Healthy Weight Calculator', id: 'healthy-weight', sub: 'Body Composition' },
      { name: 'Calories Burned Calculator', id: 'calories-burned', sub: 'Activity & Exercise' },
      { name: 'One Rep Max Calculator', id: 'one-rep-max', sub: 'Strength & Fitness' },
      { name: 'Target Heart Rate Calculator', id: 'target-heart-rate', sub: 'Cardio & Heart Health' },
      { name: 'Protein Calculator', id: 'protein', sub: 'Diet & Nutrition' },
      { name: 'Fat Intake Calculator', id: 'fat-intake', sub: 'Diet & Nutrition' },
      { name: 'TDEE Calculator', id: 'tdee', sub: 'Metabolism & Diet' },
      { name: 'Ovulation Calculator', id: 'ovulation', sub: 'Fertility & Health' },
      { name: 'Conception Calculator', id: 'conception', sub: 'Fertility & Health' },
      { name: 'Period Calculator', id: 'period', sub: 'Fertility & Health' },
      { name: 'GFR Calculator', id: 'gfr', sub: 'Medical & Kidney Health' },
      { name: 'Body Type Calculator', id: 'body-type', sub: 'Body Composition' },
      { name: 'Body Surface Area Calculator', id: 'body-surface-area', sub: 'Medical Standards' },
      { name: 'BAC Calculator', id: 'bac', sub: 'Blood Alcohol Content' },
      { name: 'Anorexic BMI Calculator', id: 'anorexic-bmi', sub: 'Clinical Health' },
      { name: 'Weight Watcher Points Calculator', id: 'weight-watcher-points', sub: 'Diet & Nutrition' },
      { name: 'Overweight Calculator', id: 'overweight', sub: 'Body Composition' }
    ]
  },
  {
    category: 'Math',
    subCategoryDefault: 'Mathematics & Algebra',
    tools: [
      { name: 'Scientific Calculator', id: 'scientific', sub: 'General Math', pop: true },
      { name: 'Fraction Calculator', id: 'fraction', sub: 'General Math' },
      { name: 'Percentage Calculator', id: 'percentage', sub: 'General Math', pop: true },
      { name: 'Triangle Calculator', id: 'triangle', sub: 'Geometry' },
      { name: 'Volume Calculator', id: 'volume', sub: 'Geometry' },
      { name: 'Standard Deviation Calculator', id: 'statistics', sub: 'Statistics', pop: true },
      { name: 'Random Number Generator', id: 'random-number', sub: 'General Math' },
      { name: 'Number Sequence Calculator', id: 'number-sequence', sub: 'Algebra' },
      { name: 'Percent Error Calculator', id: 'percent-error', sub: 'General Math' },
      { name: 'Exponent Calculator', id: 'exponent', sub: 'Algebra' },
      { name: 'Binary Calculator', id: 'binary', sub: 'Computer Science' },
      { name: 'Hex Calculator', id: 'hex', sub: 'Computer Science' },
      { name: 'Half-Life Calculator', id: 'half-life', sub: 'Physics & Chemistry' },
      { name: 'Quadratic Formula Calculator', id: 'quadratic', sub: 'Algebra' },
      { name: 'Slope Calculator', id: 'slope', sub: 'Geometry & Algebra' },
      { name: 'Log Calculator', id: 'log', sub: 'Algebra' },
      { name: 'Area Calculator', id: 'area', sub: 'Geometry' },
      { name: 'Sample Size Calculator', id: 'sample-size', sub: 'Statistics' },
      { name: 'Probability Calculator', id: 'probability', sub: 'Statistics' },
      { name: 'Statistics Calculator', id: 'statistics-full', sub: 'Statistics' },
      { name: 'Mean, Median, Mode, Range Calculator', id: 'mean-median-mode', sub: 'Statistics' },
      { name: 'Permutation and Combination Calculator', id: 'permutation-combination', sub: 'Discrete Math' },
      { name: 'Z-score Calculator', id: 'z-score', sub: 'Statistics' },
      { name: 'Confidence Interval Calculator', id: 'confidence-interval', sub: 'Statistics' },
      { name: 'Ratio Calculator', id: 'ratio', sub: 'General Math' },
      { name: 'Distance Calculator', id: 'distance', sub: 'Geometry' },
      { name: 'Circle Calculator', id: 'circle', sub: 'Geometry' },
      { name: 'Surface Area Calculator', id: 'surface-area', sub: 'Geometry' },
      { name: 'Pythagorean Theorem Calculator', id: 'pythagorean-theorem', sub: 'Geometry' },
      { name: 'Right Triangle Calculator', id: 'right-triangle', sub: 'Geometry' },
      { name: 'Root Calculator', id: 'root', sub: 'Algebra' },
      { name: 'Least Common Multiple Calculator', id: 'lcm', sub: 'Arithmetic' },
      { name: 'Greatest Common Factor Calculator', id: 'gcf', sub: 'Arithmetic' },
      { name: 'Factor Calculator', id: 'factor', sub: 'Arithmetic' },
      { name: 'Rounding Calculator', id: 'rounding', sub: 'Arithmetic' },
      { name: 'Matrix Calculator', id: 'matrix', sub: 'Linear Algebra' },
      { name: 'Scientific Notation Calculator', id: 'scientific-notation', sub: 'General Math' },
      { name: 'Big Number Calculator', id: 'big-number', sub: 'General Math' },
      { name: 'Prime Factorization Calculator', id: 'prime-factorization', sub: 'Number Theory' },
      { name: 'Common Factor Calculator', id: 'common-factor', sub: 'Arithmetic' },
      { name: 'Basic Calculator', id: 'basic-calculator', sub: 'General Math' },
      { name: 'Long Division Calculator', id: 'long-division', sub: 'Arithmetic' },
      { name: 'Average Calculator', id: 'average', sub: 'Statistics' },
      { name: 'P-value Calculator', id: 'p-value', sub: 'Statistics' }
    ]
  },
  {
    category: 'Other',
    subCategoryDefault: 'Everyday & Engineering',
    tools: [
      { name: 'Age Calculator', id: 'age-date', sub: 'Date and Time', pop: true },
      { name: 'Date Calculator', id: 'date', sub: 'Date and Time' },
      { name: 'Time Calculator', id: 'time', sub: 'Date and Time' },
      { name: 'Hours Calculator', id: 'hours-time', sub: 'Date and Time', pop: true },
      { name: 'GPA Calculator', id: 'gpa', sub: 'Education' },
      { name: 'Grade Calculator', id: 'grade', sub: 'Education' },
      { name: 'Height Calculator', id: 'height', sub: 'Health & Genetics' },
      { name: 'Concrete Calculator', id: 'concrete', sub: 'Construction & DIY' },
      { name: 'IP Subnet Calculator', id: 'ip-subnet', sub: 'Networking & IT' },
      { name: 'Bra Size Calculator', id: 'bra-size', sub: 'Clothing & Apparel' },
      { name: 'Password Generator', id: 'password-gen', sub: 'Security & Tech' },
      { name: 'Dice Roller', id: 'dice-roller', sub: 'Gaming & Fun' },
      { name: 'Conversion Calculator', id: 'unit-converter', sub: 'Measurements & Units', pop: true },
      { name: 'Fuel Cost Calculator', id: 'fuel-cost', sub: 'Transportation' },
      { name: 'Voltage Drop Calculator', id: 'voltage-drop', sub: 'Electrical Engineering' },
      { name: 'BTU Calculator', id: 'btu', sub: 'Heating & Cooling' },
      { name: 'Square Footage Calculator', id: 'square-footage', sub: 'Construction & Real Estate' },
      { name: 'Time Card Calculator', id: 'time-card', sub: 'Work & Payroll' },
      { name: 'Time Zone Calculator', id: 'time-zone', sub: 'Date and Time' },
      { name: 'Love Calculator', id: 'love-calculator', sub: 'Entertainment & Fun' },
      { name: 'GDP Calculator', id: 'gdp', sub: 'Economics' },
      { name: 'Gas Mileage Calculator', id: 'gas-mileage', sub: 'Transportation' },
      { name: 'Horsepower Calculator', id: 'horsepower', sub: 'Automotive & Physics' },
      { name: 'Engine Horsepower Calculator', id: 'engine-horsepower', sub: 'Automotive & Physics' },
      { name: 'Stair Calculator', id: 'stair', sub: 'Construction & Carpentry' },
      { name: 'Resistor Calculator', id: 'resistor', sub: 'Electronics' },
      { name: 'Ohms Law Calculator', id: 'ohms-law', sub: 'Physics & Electrical' },
      { name: 'Electricity Calculator', id: 'electricity', sub: 'Utility Bills & Energy' },
      { name: 'Shoe Size Conversion', id: 'shoe-size', sub: 'Clothing & Apparel' },
      { name: 'Tip Calculator', id: 'tip', sub: 'Everyday Utility', pop: true },
      { name: 'Mileage Calculator', id: 'mileage', sub: 'Transportation' },
      { name: 'Density Calculator', id: 'density', sub: 'Physics & Chemistry' },
      { name: 'Mass Calculator', id: 'mass', sub: 'Physics' },
      { name: 'Weight Calculator', id: 'weight', sub: 'Measurements & Units' },
      { name: 'Speed Calculator', id: 'speed', sub: 'Physics & Motion' },
      { name: 'Molarity Calculator', id: 'molarity', sub: 'Chemistry' },
      { name: 'Molecular Weight Calculator', id: 'molecular-weight', sub: 'Chemistry' },
      { name: 'Roman Numeral Converter', id: 'roman-numeral', sub: 'Conversion' },
      { name: 'Golf Handicap Calculator', id: 'golf-handicap', sub: 'Sports & Golf' },
      { name: 'Sleep Calculator', id: 'sleep', sub: 'Health & Wellness' },
      { name: 'Tire Size Calculator', id: 'tire-size', sub: 'Automotive' },
      { name: 'Roofing Calculator', id: 'roofing', sub: 'Construction & Roofing' },
      { name: 'Tile Calculator', id: 'tile', sub: 'Home Improvement' },
      { name: 'Mulch Calculator', id: 'mulch', sub: 'Landscaping & Garden' },
      { name: 'Gravel Calculator', id: 'gravel', sub: 'Landscaping & Construction' },
      { name: 'Wind Chill Calculator', id: 'wind-chill', sub: 'Weather & Meteorology' },
      { name: 'Heat Index Calculator', id: 'heat-index', sub: 'Weather & Meteorology' },
      { name: 'Dew Point Calculator', id: 'dew-point', sub: 'Weather & Meteorology' },
      { name: 'Bandwidth Calculator', id: 'bandwidth', sub: 'Internet & Networking' },
      { name: 'Base64 Encode / Decode', id: 'base64', sub: 'Developer Tools' },
      { name: 'URL Encode / Decode', id: 'url-encode', sub: 'Developer Tools' },
      { name: 'Time Duration Calculator', id: 'time-duration', sub: 'Date and Time' },
      { name: 'Day Counter', id: 'day-counter', sub: 'Date and Time' },
      { name: 'Day of the Week Calculator', id: 'day-of-week', sub: 'Date and Time' },
      // Embeddable Widgets for your site
      { name: 'Mortgage Calculator for Your Site', id: 'mortgage-widget', sub: 'Webmaster Tools' },
      { name: 'Math Calculator for Your Site', id: 'math-widget', sub: 'Webmaster Tools' },
      { name: 'Scientific Calculator for Your Site', id: 'scientific-widget', sub: 'Webmaster Tools' },
      { name: 'Love Calculator for Your Site', id: 'love-widget', sub: 'Webmaster Tools' },
      { name: 'Concrete Calculator for Your Site', id: 'concrete-widget', sub: 'Webmaster Tools' }
    ]
  }
];

// Helper to generate formula and steps
function getFormula(name, cat) {
  if (name.includes('Mortgage') || name.includes('Loan')) return 'M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]';
  if (name.includes('Interest') || name.includes('Investment')) return 'A = P(1 + r/n)^(nt)';
  if (name.includes('BMI')) return 'BMI = weight (kg) / [height (m)]^2';
  if (name.includes('Calorie') || name.includes('BMR')) return 'BMR = 10W + 6.25H - 5A + S';
  if (name.includes('Tax')) return 'Tax = Taxable Income * Marginal Tax Rate';
  if (name.includes('Square Footage') || name.includes('Area')) return 'Area = Length × Width';
  if (name.includes('Concrete') || name.includes('Volume')) return 'Volume = Length × Width × Depth / 27 (cubic yards)';
  if (name.includes('Pace')) return 'Pace = Time / Distance';
  if (name.includes('Percent')) return 'Percentage = (Part / Whole) × 100%';
  if (name.includes('Ohm')) return 'V = I × R (Voltage = Current × Resistance)';
  if (name.includes('Fuel') || name.includes('Gas')) return 'Total Cost = (Distance / MPG) × Fuel Price';
  return 'Calculated in real-time according to official mathematical and industry standards.';
}

const allCalculators = [];

for (const group of RAW_CATEGORIES) {
  for (const t of group.tools) {
    const slug = t.id;
    const name = t.name;
    const category = group.category;
    const subCategory = t.sub || group.subCategoryDefault;

    const keywords = [
      name.toLowerCase(),
      slug.replace(/-/g, ' '),
      category.toLowerCase(),
      subCategory.toLowerCase(),
      'calculator',
      'online tool',
      'free calculation'
    ];

    const seoTitle = `${name} — Free Online Calculator & Formula`;
    const seoDescription = `Free online ${name}. Fast, accurate calculation with step-by-step formula breakdown, FAQs, and instant results.`;
    const formula = getFormula(name, category);

    const howToSteps = [
      `Enter your primary input values for ${name}.`,
      `Adjust any optional parameters or variables as needed.`,
      `Review instant real-time results, visualizations, and summary breakdowns.`
    ];

    const faqs = [
      {
        question: `How does the ${name} work?`,
        answer: `The ${name} executes validated clinical, mathematical, or financial equations instantly within your web browser with zero server latency.`
      },
      {
        question: `Is this ${name} free to use?`,
        answer: `Yes, AllToolHub provides 100% free, unlimited calculations with zero login or personal data registration required.`
      }
    ];

    allCalculators.push({
      id: slug,
      name,
      category,
      subCategory,
      description: `Accurate, instant calculation for ${name.toLowerCase()} with formula breakdowns and step-by-step guidance.`,
      popular: !!t.pop,
      keywords,
      seoTitle,
      seoDescription,
      formula,
      faqs,
      howToSteps
    });
  }
}

const fileContent = `export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface CalculatorDefinition {
  id: string;
  name: string;
  category: 'Financial' | 'Fitness' | 'Math' | 'Other';
  subCategory: string;
  description: string;
  popular?: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  formula?: string;
  faqs: ToolFAQ[];
  howToSteps: string[];
}

export const CALCULATORS: CalculatorDefinition[] = ${JSON.stringify(allCalculators, null, 2)};
`;

const outPath = path.join('C:\\Users\\bicky\\.gemini\\antigravity\\brain\\952e14b1-debf-4a31-b67b-0e3b2a4b8535\\scratch\\tools.ts');
fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Generated ${allCalculators.length} calculators into ${outPath}`);
