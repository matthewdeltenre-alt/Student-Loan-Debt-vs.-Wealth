export interface CalcInputs {
  loanAmount: number;
  annualInterestRate: number; // e.g. 6.5
  repaymentYears: number; // e.g. 10
  collegeYears: number; // e.g. 4
  currentAge: number; // e.g. 18
  expectedSalary: number; // college grad salary from major
  investmentReturnRate: number; // e.g. 10
  noDegreeSalary: number; // default 38000
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  payoffAge: number;
  payoffYear: number;
  debtToIncomeRatio: number; // monthly payment / monthly gross income
}

export interface OpportunityCost {
  loanPaymentsAtRetirement: number; // if loan payments were invested instead
  rothIRAStartAt18: number; // max Roth IRA from age 18 to 65
  rothIRAStartAfterDebt: number; // max Roth IRA starting after debt paid off
  rothIRADifference: number;
  totalWealth65College: number;
  totalWealth65Invest: number;
  wealthGap: number;
}

export interface NetWorthPoint {
  age: number;
  label: string;
  collegePath: number;
  investPath: number;
}

// Standard loan amortization: monthly payment
export function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Remaining loan balance after m months
function loanBalanceAfterMonths(
  principal: number,
  annualRate: number,
  totalYears: number,
  monthsPaid: number
): number {
  const r = annualRate / 100 / 12;
  const n = totalYears * 12;
  if (r === 0) return principal - (principal / n) * monthsPaid;
  const payment = calcMonthlyPayment(principal, annualRate, totalYears);
  return (
    principal * Math.pow(1 + r, monthsPaid) -
    payment * ((Math.pow(1 + r, monthsPaid) - 1) / r)
  );
}

// Future value of equal monthly contributions (ordinary annuity)
export function fvMonthly(
  monthlyAmount: number,
  annualRate: number,
  years: number
): number {
  if (years <= 0 || monthlyAmount <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyAmount * n;
  return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r);
}

// Future value of a lump sum
export function fvLump(pv: number, annualRate: number, years: number): number {
  if (years <= 0 || pv <= 0) return 0;
  return pv * Math.pow(1 + annualRate / 100, years);
}

export function calcLoanSummary(inputs: CalcInputs): LoanSummary {
  const { loanAmount, annualInterestRate, repaymentYears, collegeYears, currentAge, expectedSalary } = inputs;
  const monthlyPayment = calcMonthlyPayment(loanAmount, annualInterestRate, repaymentYears);
  const totalPaid = monthlyPayment * repaymentYears * 12;
  const totalInterest = totalPaid - loanAmount;
  const payoffAge = currentAge + collegeYears + repaymentYears;
  const payoffYear = new Date().getFullYear() + collegeYears + repaymentYears;
  const debtToIncomeRatio = (monthlyPayment / (expectedSalary / 12)) * 100;
  return { monthlyPayment, totalPaid, totalInterest, payoffAge, payoffYear, debtToIncomeRatio };
}

export function calcOpportunityCost(inputs: CalcInputs): OpportunityCost {
  const {
    loanAmount,
    annualInterestRate,
    repaymentYears,
    collegeYears,
    currentAge,
    investmentReturnRate,
  } = inputs;

  const monthlyPayment = calcMonthlyPayment(loanAmount, annualInterestRate, repaymentYears);
  const payoffAge = currentAge + collegeYears + repaymentYears;
  const yearsUntil65FromPayoff = Math.max(0, 65 - payoffAge);
  const yearsUntil65From18 = Math.max(0, 65 - currentAge);

  // If you invested loan payments during repayment, then let that compound to 65
  const investedDuringRepayment = fvMonthly(monthlyPayment, investmentReturnRate, repaymentYears);
  const loanPaymentsAtRetirement = fvLump(investedDuringRepayment, investmentReturnRate, yearsUntil65FromPayoff);

  // Roth IRA: $7,000/year max ($583/month)
  const rothMonthly = 583;
  const rothIRAStartAt18 = fvMonthly(rothMonthly, investmentReturnRate, yearsUntil65From18);
  const rothIRAStartAfterDebt = fvMonthly(rothMonthly, investmentReturnRate, yearsUntil65FromPayoff);
  const rothIRADifference = rothIRAStartAt18 - rothIRAStartAfterDebt;

  // Total wealth at 65 — college path (investing 15% of salary after debt free)
  const collegeMonthlyInvest = (inputs.expectedSalary / 12) * 0.15;
  const totalWealth65College = fvMonthly(collegeMonthlyInvest, investmentReturnRate, yearsUntil65FromPayoff);

  // Total wealth at 65 — invest path (investing loan payment + 15% of no-degree salary from day 1)
  const noDegreeMonthlySavings = (inputs.noDegreeSalary / 12) * 0.15;
  const totalMonthlyInvest65 = monthlyPayment + noDegreeMonthlySavings;
  const totalWealth65Invest = fvMonthly(totalMonthlyInvest65, investmentReturnRate, yearsUntil65From18);

  const wealthGap = totalWealth65Invest - totalWealth65College;

  return {
    loanPaymentsAtRetirement,
    rothIRAStartAt18,
    rothIRAStartAfterDebt,
    rothIRADifference,
    totalWealth65College,
    totalWealth65Invest,
    wealthGap,
  };
}

export function calcNetWorthOverTime(inputs: CalcInputs): NetWorthPoint[] {
  const {
    loanAmount,
    annualInterestRate,
    repaymentYears,
    collegeYears,
    currentAge,
    expectedSalary,
    noDegreeSalary,
    investmentReturnRate,
  } = inputs;

  const monthlyPayment = calcMonthlyPayment(loanAmount, annualInterestRate, repaymentYears);
  const taxRate = 0.22;
  const savingsRateWhileRepaying = 0.10;
  const savingsRateAfterDebt = 0.20;
  const noDegreeSavingsRate = 0.15;

  const collegeMonthlyTakeHome = (expectedSalary / 12) * (1 - taxRate);
  const nodegreeMonthlyTakeHome = (noDegreeSalary / 12) * (1 - taxRate);

  const data: NetWorthPoint[] = [];

  for (let year = 0; year <= 42; year++) {
    const age = currentAge + year;

    // ── COLLEGE PATH ──
    let collegeNW: number;

    if (year <= collegeYears) {
      // Accumulating debt during school
      collegeNW = -(loanAmount / collegeYears) * year;
    } else {
      const yearsWorking = year - collegeYears;

      if (yearsWorking <= repaymentYears) {
        // Repaying loans + small investments
        const remainingDebt = Math.max(
          0,
          loanBalanceAfterMonths(loanAmount, annualInterestRate, repaymentYears, yearsWorking * 12)
        );
        const monthlyInvest = Math.max(0, collegeMonthlyTakeHome - monthlyPayment) * savingsRateWhileRepaying;
        const investments = fvMonthly(monthlyInvest, investmentReturnRate, yearsWorking);
        collegeNW = investments - remainingDebt;
      } else {
        // Debt free — investing aggressively
        const yearsRepaying = repaymentYears;
        const yearsFree = yearsWorking - repaymentYears;

        const monthlyInvestWhileRepaying = Math.max(0, collegeMonthlyTakeHome - monthlyPayment) * savingsRateWhileRepaying;
        const portfolioAtPayoff = fvMonthly(monthlyInvestWhileRepaying, investmentReturnRate, yearsRepaying);

        // After payoff: invest savings rate of income + freed-up loan payment
        const monthlyInvestAfterDebt = collegeMonthlyTakeHome * savingsRateAfterDebt + monthlyPayment * 0.75;
        const portfolioGrowth = fvLump(portfolioAtPayoff, investmentReturnRate, yearsFree) +
          fvMonthly(monthlyInvestAfterDebt, investmentReturnRate, yearsFree);

        collegeNW = portfolioGrowth;
      }
    }

    // ── INVEST PATH ──
    // Work from day 1, invest loan-payment equivalent + regular savings
    const monthlyInvestNoDebt = monthlyPayment + nodegreeMonthlyTakeHome * noDegreeSavingsRate;
    const investNW = fvMonthly(monthlyInvestNoDebt, investmentReturnRate, year);

    data.push({
      age,
      label: `Age ${age}`,
      collegePath: Math.round(collegeNW),
      investPath: Math.round(investNW),
    });
  }

  return data;
}

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  }
  return `${sign}$${Math.round(abs).toLocaleString()}`;
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
