export interface ToolFAQ {
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

export const CALCULATORS: CalculatorDefinition[] = [
  // --- FINANCIAL CALCULATORS ---
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: 'Financial',
    subCategory: 'Mortgage & Real Estate',
    description: 'Calculate monthly mortgage payments including principal, interest, taxes, and PMI with full amortization schedule.',
    popular: true,
    keywords: ['mortgage', 'home loan', 'house payment', 'amortization', 'pmi', 'property tax'],
    seoTitle: 'Free Mortgage Calculator — Estimate Monthly House Payments & Amortization',
    seoDescription: 'Accurately calculate your monthly mortgage payment, interest rates, property taxes, PMI, and see an interactive amortization schedule.',
    formula: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]',
    howToSteps: [
      'Enter the purchase price of the home.',
      'Specify your down payment amount (dollar amount or percentage).',
      'Select the loan term (typically 15 or 30 years).',
      'Input the fixed interest rate offered by your lender.',
      'Optionally include annual property taxes and homeowners insurance.'
    ],
    faqs: [
      {
        question: 'What is included in a monthly mortgage payment?',
        answer: 'A standard mortgage payment is comprised of PITI: Principal, Interest, Taxes (local property taxes), and Insurance (homeowners hazard insurance and PMI if down payment is below 20%).'
      },
      {
        question: 'How does loan term affect total interest?',
        answer: 'A 15-year mortgage has higher monthly payments than a 30-year loan, but significantly lowers the total interest paid over the life of the loan due to faster principal paydown.'
      },
      {
        question: 'What is Private Mortgage Insurance (PMI)?',
        answer: 'PMI is required by conventional lenders if your down payment is less than 20% of the home purchase price. It protects the lender in case of default.'
      }
    ]
  },
  {
    id: 'loan',
    name: 'Personal Loan Calculator',
    category: 'Financial',
    subCategory: 'Loans & Debt',
    description: 'Calculate monthly payments, total repayment, and overall interest on personal, business, or student loans.',
    popular: true,
    keywords: ['loan', 'personal loan', 'emi', 'debt', 'interest rate', 'installment'],
    seoTitle: 'Personal Loan Calculator — Estimate Monthly EMI & Total Interest',
    seoDescription: 'Calculate fixed monthly loan payments, total interest paid, and payoff schedules for personal, education, or unsecured loans.',
    formula: 'EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]',
    howToSteps: [
      'Enter the loan amount requested.',
      'Input the annual interest rate (APR).',
      'Choose the loan repayment term in years or months.',
      'Review your exact monthly payment and total interest cost.'
    ],
    faqs: [
      {
        question: 'What is APR vs Interest Rate?',
        answer: 'The interest rate reflects the cost of borrowing principal, whereas APR (Annual Percentage Rate) incorporates upfront origination fees and closing costs into the annualized borrowing percentage.'
      },
      {
        question: 'Can I pay off my loan early to save on interest?',
        answer: 'Yes! Most modern personal loans do not have prepayment penalties. Paying extra towards the principal reduces compounding interest and shortens the payoff duration.'
      }
    ]
  },
  {
    id: 'auto-loan',
    name: 'Auto Loan Calculator',
    category: 'Financial',
    subCategory: 'Auto Loans',
    description: 'Determine your exact monthly car payment considering vehicle price, down payment, trade-in, and sales tax.',
    popular: true,
    keywords: ['car loan', 'auto loan', 'vehicle finance', 'car payment', 'trade in'],
    seoTitle: 'Auto Loan Calculator — Monthly Car Payment & Trade-In Estimator',
    seoDescription: 'Calculate monthly auto financing payments, total cost with dealer fees, trade-in equity, and state sales taxes.',
    formula: 'Monthly Payment = [Net Loan x Monthly Rate x (1 + Monthly Rate)^Months] / [(1 + Monthly Rate)^Months - 1]',
    howToSteps: [
      'Enter vehicle sticker or purchase price.',
      'Enter cash down payment and trade-in value.',
      'Specify sales tax rate and loan duration (typically 36 to 72 months).',
      'Calculate monthly installment and total financing cost.'
    ],
    faqs: [
      {
        question: 'What is a good auto loan term length?',
        answer: 'Financial experts generally recommend terms of 48 to 60 months. Longer terms (72-84 months) lower monthly payments but increase total interest significantly.'
      }
    ]
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'Financial',
    subCategory: 'Investment',
    description: 'Simulate the exponential growth of your wealth with compound interest and recurring deposits over time.',
    popular: true,
    keywords: ['compound interest', 'investing', 'savings', 'wealth', 'exponential growth', 'apy'],
    seoTitle: 'Compound Interest Calculator — Watch Your Savings & Investments Multiply',
    seoDescription: 'Calculate compound interest on investments with monthly contributions. Visualize future wealth with annual compounding tables and charts.',
    formula: 'A = P (1 + r/n)^(nt) + PMT * [ ((1 + r/n)^(nt) - 1) / (r/n) ]',
    howToSteps: [
      'Enter your initial starting principal.',
      'Set an optional monthly or annual deposit.',
      'Input the estimated annual rate of return (e.g. 7% to 10% for index funds).',
      'Select the investment horizon in years.'
    ],
    faqs: [
      {
        question: 'Why is compound interest called the 8th wonder of the world?',
        answer: 'Compound interest generates return on both your initial principal and previous accumulated interest, causing exponential wealth acceleration in later years.'
      },
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 estimates how many years it takes for your money to double: Divide 72 by the annual rate of return (e.g., at 8% return, 72 / 8 = 9 years to double).'
      }
    ]
  },
  {
    id: 'retirement',
    name: 'Retirement & 401(k) Planner',
    category: 'Financial',
    subCategory: 'Retirement',
    description: 'Plan your retirement target nest egg, required annual savings, and estimated monthly retirement income.',
    popular: true,
    keywords: ['retirement', '401k', 'pension', 'ira', 'nest egg', 'financial independence'],
    seoTitle: 'Retirement Calculator — 401(k), IRA & Financial Independence Planner',
    seoDescription: 'Calculate how much you need to save for retirement. Forecast your 401(k) balance, monthly retirement payouts, and safe withdrawal rates.',
    formula: 'Retirement Target = Annual Expenses / Safe Withdrawal Rate (typically 4%)',
    howToSteps: [
      'Enter your current age and planned retirement age.',
      'Enter current retirement savings balance and annual income.',
      'Select your annual savings rate percentage.',
      'See total nest egg projection and monthly spending capacity.'
    ],
    faqs: [
      {
        question: 'What is the 4% Safe Withdrawal Rule?',
        answer: 'The Trinity Study established that withdrawing 4% of your diversified retirement portfolio in year one, adjusted for inflation annually, has historically lasted 30+ years with over 95% certainty.'
      }
    ]
  },
  {
    id: 'salary-tax',
    name: 'Salary & Take-Home Tax Calculator',
    category: 'Financial',
    subCategory: 'Tax and Salary',
    description: 'Convert annual salary to hourly rate and calculate estimated take-home paycheck after federal, FICA, and state taxes.',
    popular: true,
    keywords: ['salary', 'paycheck', 'take home pay', 'income tax', 'hourly wage', 'net pay'],
    seoTitle: 'Salary & Paycheck Calculator — Estimate After-Tax Take Home Pay',
    seoDescription: 'Calculate net take-home salary after federal income tax, Social Security, Medicare, and deductions.',
    formula: 'Net Pay = Gross Income - (Federal Tax + FICA 7.65% + State Tax + Deductions)',
    howToSteps: [
      'Enter your gross annual salary or hourly rate.',
      'Choose payment frequency (Weekly, Bi-weekly, Monthly, Annually).',
      'Review estimated taxes and net deposit amount.'
    ],
    faqs: [
      {
        question: 'What is FICA tax?',
        answer: 'FICA consists of 6.2% Social Security tax and 1.45% Medicare tax deducted from employee wages, matched by the employer (total 15.3%).'
      }
    ]
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    category: 'Financial',
    subCategory: 'Investment',
    description: 'Calculate the purchasing power of money over time and observe the real value erosion caused by inflation.',
    popular: false,
    keywords: ['inflation', 'purchasing power', 'cpi', 'cost of living', 'real value'],
    seoTitle: 'Inflation Calculator — Calculate Purchasing Power Loss Over Time',
    seoDescription: 'Determine how future inflation affects your money purchasing power and compute historical equivalent values.',
    formula: 'Future Value = Present Value / (1 + inflation_rate)^years',
    howToSteps: [
      'Enter the starting dollar amount.',
      'Select historical or projected annual inflation rate (e.g. 3.0%).',
      'Select number of years to forecast.'
    ],
    faqs: [
      {
        question: 'How does inflation affect cash savings?',
        answer: 'Cash sitting in zero-interest accounts loses purchasing power each year. At 3% annual inflation, prices double roughly every 24 years.'
      }
    ]
  },
  {
    id: 'discount-margin',
    name: 'Discount & Profit Margin Calculator',
    category: 'Financial',
    subCategory: 'Business & Shopping',
    description: 'Compute markdown sale prices, sales discounts, cost markup, gross profit margin, and operating margins.',
    popular: false,
    keywords: ['discount', 'sale price', 'margin', 'markup', 'profit', 'gross margin'],
    seoTitle: 'Discount & Profit Margin Calculator — Calculate Markup & Sale Prices',
    seoDescription: 'Quickly calculate sale discounts, savings, gross margin percentages, and retail markup on goods.',
    formula: 'Margin = (Revenue - COGS) / Revenue * 100%',
    howToSteps: [
      'Select calculation mode: Discount / Sale or Profit Margin / Markup.',
      'Enter original price and discount percentage or cost and revenue.',
      'View immediate savings, final price, or profit margin.'
    ],
    faqs: [
      {
        question: 'What is the difference between Margin and Markup?',
        answer: 'Markup is the percentage added to cost to reach selling price. Margin is the percentage of selling price that represents profit.'
      }
    ]
  },

  // --- FITNESS & HEALTH CALCULATORS ---
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'Fitness',
    subCategory: 'Body Composition',
    description: 'Calculate Body Mass Index (BMI) according to WHO guidelines for adults, with healthy weight ranges for your height.',
    popular: true,
    keywords: ['bmi', 'body mass index', 'healthy weight', 'obesity', 'underweight', 'overweight'],
    seoTitle: 'Accurate BMI Calculator — Body Mass Index Chart & Healthy Weight Range',
    seoDescription: 'Calculate Body Mass Index (BMI) using standard metric or imperial units. Includes WHO classification ranges and optimal weight suggestions.',
    formula: 'BMI = weight (kg) / [height (m)]^2  OR  [weight (lbs) x 703] / [height (in)]^2',
    howToSteps: [
      'Choose metric (cm, kg) or imperial (ft, in, lbs) measurement.',
      'Enter your height and current body weight.',
      'Enter age and sex for contextual demographic reference.',
      'See your exact BMI score, visual classification needle, and healthy range.'
    ],
    faqs: [
      {
        question: 'What are the official BMI categories?',
        answer: 'Underweight: BMI < 18.5; Normal weight: 18.5 - 24.9; Overweight: 25 - 29.9; Obesity: BMI 30 or greater.'
      },
      {
        question: 'Does BMI distinguish between muscle and fat?',
        answer: 'BMI measures total body mass relative to height. Athletes with high muscle mass may be classified as overweight despite having low body fat.'
      }
    ]
  },
  {
    id: 'calorie',
    name: 'Calorie & TDEE Deficit Calculator',
    category: 'Fitness',
    subCategory: 'Diet & Nutrition',
    description: 'Calculate your daily energy expenditure (TDEE) and exact calories needed for weight loss, maintenance, or muscle gain.',
    popular: true,
    keywords: ['calorie', 'tdee', 'weight loss', 'calorie deficit', 'macros', 'maintenance calories'],
    seoTitle: 'Calorie Deficit Calculator — TDEE & Macro Nutrition Planner',
    seoDescription: 'Determine your Total Daily Energy Expenditure (TDEE) and calorie target to lose, maintain, or gain weight with recommended protein and carb splits.',
    formula: 'Mifflin-St Jeor: BMR = (10 x weight) + (6.25 x height) - (5 x age) [+5 for men / -161 for women]; TDEE = BMR x Activity Multiplier',
    howToSteps: [
      'Enter gender, age, height, and body weight.',
      'Select your average weekly exercise/activity level.',
      'Choose your fitness goal: Mild weight loss (0.5 lb/wk), Moderate weight loss (1 lb/wk), Maintenance, or Lean bulk.',
      'Get daily target calories and macronutrient breakdown.'
    ],
    faqs: [
      {
        question: 'How large should a weight loss calorie deficit be?',
        answer: 'A sustainable deficit is 300 to 500 kcal per day below TDEE, leading to approximately 0.5 to 1.0 lb of healthy fat loss per week without sacrificing muscle mass.'
      }
    ]
  },
  {
    id: 'body-fat',
    name: 'Body Fat Percentage Calculator',
    category: 'Fitness',
    subCategory: 'Body Composition',
    description: 'Estimate your body fat percentage, fat mass, and lean body mass using the US Navy tape measurement method.',
    popular: true,
    keywords: ['body fat', 'navy method', 'lean mass', 'fat percentage', 'tape measure'],
    seoTitle: 'US Navy Body Fat Calculator — Accurate Tape Measure Method',
    seoDescription: 'Estimate your body fat percentage and lean muscle mass using neck, waist, and hip tape measurements with the US Navy algorithm.',
    formula: 'US Navy Formula based on waist, neck, hip circumferences and height logarithm.',
    howToSteps: [
      'Select gender and enter height.',
      'Measure neck circumference just below larynx.',
      'Measure waist circumference at the navel.',
      'For women, also measure hip circumference at the widest point.'
    ],
    faqs: [
      {
        question: 'What is a healthy body fat percentage?',
        answer: 'For men: Essential fat is 2-5%, Athletes 6-13%, Fitness 14-17%, Acceptable 18-24%. For women: Essential 10-13%, Athletes 14-20%, Fitness 21-24%, Acceptable 25-31%.'
      }
    ]
  },
  {
    id: 'bmr',
    name: 'BMR (Basal Metabolic Rate) Calculator',
    category: 'Fitness',
    subCategory: 'Diet & Nutrition',
    description: 'Calculate calories burned strictly at rest to sustain vital organ function like breathing and blood circulation.',
    popular: false,
    keywords: ['bmr', 'basal metabolic rate', 'metabolism', 'calories at rest', 'resting burn'],
    seoTitle: 'BMR Calculator — Basal Metabolic Rate Estimator (Mifflin-St Jeor)',
    seoDescription: 'Calculate the minimum calories your body requires at complete rest using the validated Mifflin-St Jeor equation.',
    formula: 'BMR = 10 x weight(kg) + 6.25 x height(cm) - 5 x age(y) + s (s=+5 for men, -161 for women)',
    howToSteps: [
      'Enter biological sex, age, height, and weight.',
      'View your Basal Metabolic Rate and baseline daily survival energy requirement.'
    ],
    faqs: [
      {
        question: 'Can you eat below your BMR?',
        answer: 'Eating substantially below BMR for prolonged periods can lower metabolic rate, trigger muscle loss, cause lethargy, and disrupt hormone regulation.'
      }
    ]
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Body Weight Calculator',
    category: 'Fitness',
    subCategory: 'Body Composition',
    description: 'Find your medically ideal body weight across Devine, Robinson, Miller, and Hamwi clinical formulas.',
    popular: false,
    keywords: ['ideal weight', 'ibw', 'healthy weight', 'devine formula', 'hamwi'],
    seoTitle: 'Ideal Weight Calculator — 4 Medical Formulas (Devine, Robinson, Hamwi)',
    seoDescription: 'Compare your healthy target weight across 4 top clinical medical formulas and WHO BMI standards.',
    formula: 'Devine Formula (Men: 50kg + 2.3kg per inch over 5ft; Women: 45.5kg + 2.3kg per inch over 5ft)',
    howToSteps: [
      'Enter gender and height.',
      'Compare target weights according to Devine, Robinson, and Miller equations.'
    ],
    faqs: [
      {
        question: 'What is the Devine formula?',
        answer: 'Developed in 1974 by Dr. Ben Devine, it is the most widely utilized formula in medical and pharmacology settings to calculate medication dosages based on ideal weight.'
      }
    ]
  },
  {
    id: 'pace',
    name: 'Running & Walking Pace Calculator',
    category: 'Fitness',
    subCategory: 'Sports & Cardio',
    description: 'Calculate running pace per mile or kilometer, total elapsed finish time, or distance for 5K, 10K, half, and full marathons.',
    popular: false,
    keywords: ['pace', 'running pace', 'marathon pace', '5k pace', 'running time', 'speed'],
    seoTitle: 'Running Pace Calculator — 5K, 10K, Half & Full Marathon Time Estimator',
    seoDescription: 'Calculate target running splits, finish times, and pace per mile or kilometer for any running race distance.',
    formula: 'Pace = Time / Distance; Speed = Distance / Time',
    howToSteps: [
      'Select preset race distance (5K, 10K, Half Marathon 13.1 mi, Marathon 26.2 mi, or Custom).',
      'Enter your target finish time or desired pace per km/mile.',
      'Review pace splits and required average speed.'
    ],
    faqs: [
      {
        question: 'What is the distance of a marathon?',
        answer: 'An official marathon is exactly 26.2188 miles (42.195 kilometers). A half marathon is 13.109 miles (21.0975 kilometers).'
      }
    ]
  },
  {
    id: 'pregnancy-due-date',
    name: 'Pregnancy Due Date Calculator',
    category: 'Fitness',
    subCategory: 'Health & Family',
    description: 'Estimate your estimated date of delivery (EDD), current gestational week, and developmental trimester milestones.',
    popular: false,
    keywords: ['pregnancy', 'due date', 'conception date', 'gestation', 'trimester', 'baby due date'],
    seoTitle: 'Pregnancy Due Date Calculator — Estimate Delivery Date & Trimester Milestones',
    seoDescription: 'Calculate your baby estimated due date based on last menstrual period (LMP) or conception date using Naegele rule.',
    formula: 'Naegele Rule: Due Date = First day of LMP + 1 year - 3 months + 7 days (approx 280 days)',
    howToSteps: [
      'Select calculation method: First day of Last Menstrual Period (LMP) or Conception Date.',
      'Enter the date.',
      'View your estimated delivery date, current gestational week, and trimester breakdown.'
    ],
    faqs: [
      {
        question: 'How accurate is the estimated due date?',
        answer: 'Only about 4% to 5% of babies are born on their exact due date; however, approximately 90% arrive within two weeks before or after.'
      }
    ]
  },

  // --- MATH & SCIENCE CALCULATORS ---
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    category: 'Math',
    subCategory: 'General Math',
    description: 'Full scientific calculator supporting trigonometry (sin, cos, tan), logarithms, powers, roots, factorials, and constants (pi, e).',
    popular: true,
    keywords: ['scientific calculator', 'trig', 'sine', 'cosine', 'log', 'exponent', 'square root', 'math'],
    seoTitle: 'Online Scientific Calculator — Trig, Logarithms, Powers & Roots',
    seoDescription: 'Free full-featured web scientific calculator. Compute trigonometric functions in radians/degrees, log, ln, square roots, and advanced math expressions.',
    formula: 'Evaluates standard algebraic expressions with operator precedence (PEMDAS).',
    howToSteps: [
      'Click or type numbers, operations (+, -, *, /), and math functions.',
      'Toggle DEG (degrees) or RAD (radians) for trigonometry.',
      'Hit = or Enter to view the precise numerical result.'
    ],
    faqs: [
      {
        question: 'Does this calculator obey PEMDAS order of operations?',
        answer: 'Yes, Parentheses, Exponents, Multiplication & Division (left-to-right), Addition & Subtraction (left-to-right) are strictly evaluated.'
      }
    ]
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'Math',
    subCategory: 'General Math',
    description: 'Instant answers for all percentage formulas: percent of a number, percentage increase/decrease, and relative percentage.',
    popular: true,
    keywords: ['percentage', 'percent increase', 'percent decrease', 'percent change', 'discount percentage'],
    seoTitle: 'Percentage Calculator — 4 Quick Percentage Formulas & Percent Change',
    seoDescription: 'Calculate what is X% of Y, percentage increase or decrease between two numbers, and fraction to percentage conversions instantly.',
    formula: 'Percent = (Part / Whole) x 100% | Percent Change = [(New - Old) / Old] x 100%',
    howToSteps: [
      'Select the percentage formula type.',
      'Enter the two input values.',
      'Read instant calculated percentage and difference.'
    ],
    faqs: [
      {
        question: 'How do you calculate percentage change?',
        answer: 'Subtract the old value from the new value, divide the result by the absolute value of the old value, and multiply by 100.'
      }
    ]
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    category: 'Math',
    subCategory: 'General Math',
    description: 'Add, subtract, multiply, and divide fractions. Supports mixed numbers with step-by-step simplification to lowest terms.',
    popular: false,
    keywords: ['fraction', 'add fractions', 'simplify fraction', 'mixed fraction', 'common denominator'],
    seoTitle: 'Fraction Calculator — Add, Subtract, Multiply & Divide Fractions',
    seoDescription: 'Calculate fractions with step-by-step reduction, finding least common denominators (LCD), and converting between improper and mixed fractions.',
    formula: 'a/b + c/d = (ad + bc) / bd; Simplified by Greatest Common Divisor (GCD).',
    howToSteps: [
      'Enter numerator and denominator for Fraction 1.',
      'Select operator (+, -, *, /).',
      'Enter numerator and denominator for Fraction 2.',
      'View reduced fraction, mixed number, and decimal representation.'
    ],
    faqs: [
      {
        question: 'What is a common denominator?',
        answer: 'A common denominator is a shared multiple of the denominators of several fractions, required to perform addition or subtraction.'
      }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics & Standard Deviation Calculator',
    category: 'Math',
    subCategory: 'Statistics',
    description: 'Compute Mean, Median, Mode, Range, Variance, Sample Standard Deviation, and Population Standard Deviation from data series.',
    popular: true,
    keywords: ['statistics', 'standard deviation', 'mean', 'median', 'mode', 'variance', 'sample', 'population'],
    seoTitle: 'Standard Deviation & Statistics Calculator — Mean, Median, Variance',
    seoDescription: 'Calculate sample and population standard deviation, mean, median, mode, variance, and sum of squares for any dataset.',
    formula: 'Sample SD (s) = sqrt[ sum((x_i - mean)^2) / (n - 1) ]',
    howToSteps: [
      'Paste or type comma or space-separated numbers into the data field.',
      'Click Calculate.',
      'View all descriptive statistics formatted in a clean summary table.'
    ],
    faqs: [
      {
        question: 'When do I use sample vs population standard deviation?',
        answer: 'Use sample standard deviation (divided by n-1) when your data represents a sample drawn from a larger group. Use population standard deviation (divided by n) when you have measured every single member of the population.'
      }
    ]
  },
  {
    id: 'quadratic',
    name: 'Quadratic Formula Calculator',
    category: 'Math',
    subCategory: 'Algebra',
    description: 'Solve any quadratic equation ax^2 + bx + c = 0 with real and complex roots, discriminant, and vertex coordinates.',
    popular: false,
    keywords: ['quadratic', 'quadratic formula', 'parabola', 'roots', 'algebra', 'discriminant'],
    seoTitle: 'Quadratic Formula Calculator — Solve ax^2 + bx + c = 0 with Steps',
    seoDescription: 'Solve quadratic equations step-by-step. Finds real roots, imaginary complex roots, discriminant, and parabola vertex.',
    formula: 'x = [ -b ± sqrt(b^2 - 4ac) ] / (2a)',
    howToSteps: [
      'Enter coefficient a (non-zero), coefficient b, and constant c.',
      'View discriminant value and root solutions (real or imaginary).'
    ],
    faqs: [
      {
        question: 'What does the discriminant tell you?',
        answer: 'If b^2 - 4ac > 0, there are two distinct real roots. If b^2 - 4ac = 0, there is one repeated real root. If b^2 - 4ac < 0, there are two complex conjugate roots.'
      }
    ]
  },
  {
    id: 'random-number',
    name: 'Random Number Generator',
    category: 'Math',
    subCategory: 'General Math',
    description: 'Generate truly random numbers or sequences within custom ranges, with options for no duplicates or sorted lists.',
    popular: false,
    keywords: ['random number', 'rng', 'random picker', 'dice', 'lottery', 'randomizer'],
    seoTitle: 'Random Number Generator — Pick Random Integers & Sequences',
    seoDescription: 'Generate custom pseudo-random integers and sequences within any minimum and maximum boundary. Fast and ad-free.',
    formula: 'Math.floor(Math.random() * (max - min + 1)) + min',
    howToSteps: [
      'Set minimum and maximum integer values.',
      'Choose quantity of numbers to generate.',
      'Select whether duplicates are allowed and click Generate.'
    ],
    faqs: [
      {
        question: 'Is this random number generator suitable for cryptography?',
        answer: 'This generator uses standard cryptographic or Mersenne-Twister PRNG suitable for simulations, drawings, games, and sampling.'
      }
    ]
  },

  // --- OTHER / UTILITY CALCULATORS ---
  {
    id: 'age-date',
    name: 'Age & Date Difference Calculator',
    category: 'Other',
    subCategory: 'Date and Time',
    description: 'Calculate your exact age in years, months, days, total hours, minutes, and days until your next birthday.',
    popular: true,
    keywords: ['age calculator', 'date difference', 'birthday', 'how old am i', 'days between dates'],
    seoTitle: 'Age Calculator — Exact Age in Years, Months, Days & Minutes',
    seoDescription: 'Determine your exact age down to the day and minute, find elapsed time between two dates, and countdown to your next birthday.',
    formula: 'Elapsed calendar difference taking leap years and variable month lengths into account.',
    howToSteps: [
      'Select your birth date (day, month, year).',
      'Select comparison date (defaults to today).',
      'View age in years/months/days as well as total days and hours lived.'
    ],
    faqs: [
      {
        question: 'Does this calculator account for leap years?',
        answer: 'Yes, our algorithm correctly calculates every leap year (February 29th) during the elapsed period.'
      }
    ]
  },
  {
    id: 'hours-time',
    name: 'Hours & Timesheet Calculator',
    category: 'Other',
    subCategory: 'Date and Time',
    description: 'Calculate total work hours, lunch break deductions, decimal hours, and overtime pay for payroll and timesheets.',
    popular: true,
    keywords: ['hours calculator', 'time card', 'timesheet', 'work hours', 'payroll', 'overtime'],
    seoTitle: 'Work Hours & Timesheet Calculator — Calculate Pay & Decimal Hours',
    seoDescription: 'Calculate work hours from clock-in to clock-out with unpaid break deductions, decimal conversions, and total earnings estimator.',
    formula: 'Total Hours = (Clock Out - Clock In) - Break Duration',
    howToSteps: [
      'Enter daily start time (clock in) and end time (clock out).',
      'Enter unpaid break duration in minutes (e.g. 30 or 60 min).',
      'Optionally input hourly wage to estimate total gross pay.'
    ],
    faqs: [
      {
        question: 'How do you convert minutes to decimal hours?',
        answer: 'Divide the number of minutes by 60 (for example, 45 minutes = 45 / 60 = 0.75 decimal hours).'
      }
    ]
  },
  {
    id: 'gpa',
    name: 'GPA Calculator',
    category: 'Other',
    subCategory: 'Everyday Utility',
    description: 'Calculate high school or college semester and cumulative Grade Point Average (GPA) on a 4.0 scale with credit weights.',
    popular: false,
    keywords: ['gpa', 'grade point average', 'college gpa', 'high school gpa', '4.0 scale', 'grades'],
    seoTitle: 'GPA Calculator — Calculate Semester & Cumulative 4.0 GPA',
    seoDescription: 'Calculate your high school or college GPA weighted by course credits on standard 4.0 grade scale.',
    formula: 'GPA = Sum of (Course Grade Points x Credit Hours) / Total Credit Hours',
    howToSteps: [
      'Add each course with its letter grade (A+, A, B, etc.) and credit hours.',
      'Click Add Course for more classes.',
      'Read instant weighted GPA and credit sum.'
    ],
    faqs: [
      {
        question: 'What point value does an A or B have?',
        answer: 'Standard 4.0 scale: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0, F=0.0.'
      }
    ]
  },
  {
    id: 'tip',
    name: 'Tip & Bill Splitter Calculator',
    category: 'Other',
    subCategory: 'Everyday Utility',
    description: 'Calculate restaurant tips, total bill with tax, and split amounts evenly among friends or group members.',
    popular: true,
    keywords: ['tip', 'restaurant tip', 'bill split', 'gratuity', 'split bill'],
    seoTitle: 'Tip & Bill Splitter Calculator — Split Gratuity Evenly Among Friends',
    seoDescription: 'Quickly calculate restaurant gratuity with 10%, 15%, 18%, 20% presets and split the final check per person.',
    formula: 'Tip Amount = Bill x Tip% | Per Person = (Bill + Tip) / Number of People',
    howToSteps: [
      'Enter total check amount before tip.',
      'Select a tip percentage button (15%, 18%, 20%) or type custom %.',
      'Select the number of people splitting the tab.'
    ],
    faqs: [
      {
        question: 'What is standard dining tipping etiquette in the US?',
        answer: 'Standard casual to fine dining gratuity is typically 15% to 20% of pre-tax food and beverage total for good service.'
      }
    ]
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter (Length, Weight, Temp)',
    category: 'Other',
    subCategory: 'Measurements & Units',
    description: 'Convert between metric and imperial units for Length, Mass/Weight, Temperature, Speed, and Area with instant precision.',
    popular: true,
    keywords: ['unit converter', 'metric to imperial', 'length converter', 'kg to lbs', 'celsius to fahrenheit'],
    seoTitle: 'Universal Unit Converter — Length, Weight, Temperature & Speed',
    seoDescription: 'Fast, accurate conversions between metric and imperial systems for distance, weight, temperature, area, and speed.',
    formula: 'Direct linear and affine standard conversion constants.',
    howToSteps: [
      'Select measurement category (Length, Weight, Temperature, Speed).',
      'Choose source unit and target unit.',
      'Type value to see simultaneous two-way calculation.'
    ],
    faqs: [
      {
        question: 'How do you convert Celsius to Fahrenheit?',
        answer: 'Multiply Celsius by 9/5 (1.8) and add 32: F = (C * 1.8) + 32.'
      }
    ]
  },
  {
    id: 'fuel-cost',
    name: 'Fuel Cost & Gas Mileage Calculator',
    category: 'Other',
    subCategory: 'Transportation',
    description: 'Estimate trip gasoline cost, fuel consumption, and vehicle MPG (miles per gallon) or L/100km fuel economy.',
    popular: false,
    keywords: ['fuel cost', 'gas calculator', 'gas mileage', 'trip cost', 'mpg', 'road trip'],
    seoTitle: 'Gas & Fuel Cost Calculator — Road Trip Gasoline Price Estimator',
    seoDescription: 'Calculate total fuel cost and gallons required for road trips based on distance, gas price, and vehicle MPG.',
    formula: 'Cost = (Trip Distance / MPG) x Gas Price per Gallon',
    howToSteps: [
      'Enter total trip distance in miles or kilometers.',
      'Enter your vehicle fuel economy (MPG or L/100km).',
      'Enter current price of fuel per gallon or liter.'
    ],
    faqs: [
      {
        question: 'How can I improve my vehicle gas mileage?',
        answer: 'Maintain proper tire pressure, avoid rapid acceleration and excessive idling, remove unnecessary heavy cargo, and utilize cruise control on highways.'
      }
    ]
  },
  {
    id: 'ip-subnet',
    name: 'IP Subnet & CIDR Calculator',
    category: 'Other',
    subCategory: 'Internet & Tech',
    description: 'Calculate IPv4 subnet masks, network address, broadcast address, CIDR prefix, and usable host IP ranges.',
    popular: false,
    keywords: ['ip subnet', 'cidr', 'subnet mask', 'network address', 'ip calculator', 'ipv4'],
    seoTitle: 'IPv4 Subnet & CIDR Calculator — Network & Usable Host Range',
    seoDescription: 'Determine subnet mask, wildcard mask, broadcast IP, network IP, and maximum usable hosts for any IPv4 CIDR notation.',
    formula: 'Bitwise AND of IP Address and Subnet Mask gives Network ID.',
    howToSteps: [
      'Enter an IPv4 address (e.g. 192.168.1.50).',
      'Select CIDR subnet prefix (/24, /25, /26, /16, etc.).',
      'View usable host range, broadcast address, and total usable host count.'
    ],
    faqs: [
      {
        question: 'How many usable hosts are in a /24 subnet?',
        answer: 'A /24 subnet contains 256 total IP addresses. Subtracting the network address (.0) and broadcast address (.255) leaves 254 usable host addresses.'
      }
    ]
  },
  {
    id: 'password-gen',
    name: 'Secure Password Generator & Dev Utilities',
    category: 'Other',
    subCategory: 'Internet & Tech',
    description: 'Generate high-entropy cryptographically secure random passwords and encode/decode Base64 and URLs.',
    popular: false,
    keywords: ['password generator', 'secure password', 'base64', 'url encode', 'entropy', 'developer tools'],
    seoTitle: 'Strong Password Generator & Base64 Encoder — Dev Tools',
    seoDescription: 'Generate custom secure random passwords with symbols, numbers, and uppercase letters. Includes instant Base64 and URL encoding tools.',
    formula: 'Cryptographically secure pseudorandom number generator (crypto.getRandomValues).',
    howToSteps: [
      'Choose desired password length (e.g. 16 to 32 characters).',
      'Check or uncheck uppercase, lowercase, numbers, and symbols.',
      'Click Generate or Copy to clipboard.'
    ],
    faqs: [
      {
        question: 'What makes a password strong against brute-force attacks?',
        answer: 'Length is the most critical factor (at least 16+ characters), combined with high entropy across uppercase, lowercase, numerical digits, and special characters.'
      }
    ]
  }
];

