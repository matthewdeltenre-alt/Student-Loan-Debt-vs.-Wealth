export interface FaqItem {
  id: string;
  question: string;
  answer: string; // supports newlines for paragraph breaks
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'compound-interest',
    question: 'What is compound interest?',
    answer: `Compound interest means you earn interest on your interest — not just your original money. It's the most powerful force in personal finance, and it works both for you and against you.\n\nHere's a simple example: You invest $1,000 at 10% per year. After year 1, you have $1,100. In year 2, you earn 10% on the full $1,100 — not just the original $1,000 — giving you $1,210. Each year, your gains grow.\n\nAfter 30 years, that single $1,000 turns into $17,449. You contributed $1,000 and earned $16,449 in pure interest — from doing nothing except leaving it alone.\n\nWhen you're in debt, compound interest works against you the same way. The longer you owe, the more you owe.`,
  },
  {
    id: 'sp500',
    question: 'What is the S&P 500?',
    answer: `The S&P 500 is a list of the 500 biggest publicly traded companies in the U.S. — think Apple, Amazon, Google, Walmart, and 496 others. When you "invest in the S&P 500," you're buying a tiny slice of all of them at once.\n\nYou don't pick individual stocks. You just own a piece of the entire U.S. economy. When those companies collectively grow, your money grows.\n\nSince 1957, the S&P 500 has averaged about 10% growth per year — including crashes, recessions, and every other crisis. No single year is guaranteed, but over long periods, it has consistently gone up.\n\nThe easiest way to invest in it: open a Roth IRA or 401(k) and buy an S&P 500 index fund like VOO, SPY, or FXAIX. Set it and forget it.`,
  },
  {
    id: 'opportunity-cost',
    question: 'What is opportunity cost?',
    answer: `Opportunity cost is what you give up when you choose one thing over another. Every dollar you spend on debt payments is a dollar that isn't growing in the market.\n\nExample: You take out a $30,000 auto loan and pay $500/month for 60 months. That's $6,000/year going to a car payment. If instead that $500/month went into an S&P 500 index fund earning 10% annually, after 5 years you'd have about $38,700 — and after 30 years, $1.1 million.\n\nThe car is worth a fraction of what you paid. The investment keeps growing.\n\nThis doesn't mean debt is always wrong — sometimes loans make sense. But most people never see the full picture of what borrowing actually costs them. That's what this site is for.`,
  },
  {
    id: 'roth-ira',
    question: 'What is a Roth IRA and why does it matter when you\'re young?',
    answer: `A Roth IRA is a special retirement account where your money grows completely tax-free. You pay taxes on the money when you put it in, but every dollar of growth — including decades of compound interest — is yours to keep with zero taxes owed.\n\nIn 2024, you can contribute up to $7,000/year ($583/month). The catch: you can only contribute from earned income (wages, tips, self-employment), and you can't take money out before age 59½ without a penalty (though you can always withdraw your original contributions).\n\nWhy it matters when you're young: time is everything. $583/month starting at 18 vs. starting at 28 is the difference between roughly $3.7M and $1.4M at retirement — assuming 10% annual returns. Starting 10 years late costs you $2.3M.\n\nYou can open one at Fidelity, Schwab, or Vanguard in about 10 minutes. If your employer offers a 401(k) match, contribute enough to get the full match first — that's free money.`,
  },
  {
    id: 'debt-to-income',
    question: 'What is a good debt-to-income ratio?',
    answer: `Your debt-to-income ratio (DTI) is your total monthly debt payments divided by your gross monthly income. It's one of the most important numbers lenders look at — and it directly affects your quality of life.\n\nExample: You earn $4,000/month and pay $800/month in loan payments. Your DTI is 20% ($800 / $4,000).\n\nGeneral guidelines:\n• Under 15%: Healthy. You have breathing room.\n• 15–28%: Manageable. Still okay, but watch it.\n• 29–36%: Tight. You may struggle to save.\n• 37–43%: Banks get nervous here. Hard to qualify for mortgages.\n• Over 43%: Danger zone. You're working primarily to pay debt.\n\nThe 28/36 rule: housing costs shouldn't exceed 28% of income, and total debt shouldn't exceed 36%. If your student or auto loans already eat up 25% of your income, you may not be able to afford a home for years.`,
  },
  {
    id: 'start-early',
    question: 'Why does starting to invest early matter so much?',
    answer: `Time is the most valuable ingredient in building wealth. The longer your money compounds, the more dramatic the results.\n\nCompare two people who both invest $100/month at 10% annual returns:\n\n• Alex starts at 18 and stops at 28 (invests for 10 years, then stops — total invested: $12,000)\n• Jordan starts at 28 and invests until 65 (invests for 37 years — total invested: $44,400)\n\nAt 65: Alex has about $676,000. Jordan has about $379,000.\n\nAlex invested less than a third of what Jordan invested — but ends up with nearly twice as much, purely because of time. Those first 10 years of compounding in your late teens and early 20s are irreplaceable.\n\nDebt delays this. Every year you spend paying off loans is a year your money isn't compounding for you. Starting at 28 instead of 18 doesn't just cost you 10 years of contributions — it costs you 10 years of compounding on everything that follows.`,
  },
  {
    id: 'inflation',
    question: 'What is inflation and how does it affect debt vs. investing?',
    answer: `Inflation is the gradual rise in prices over time. Something that costs $100 today might cost $109 in 10 years. The dollar in your pocket slowly buys less over time.\n\nInflation affects debt and investing in opposite ways:\n\nFor debt: Inflation actually helps borrowers. If you borrowed $20,000 today, the real value of that $20,000 decreases over time as prices rise. You're paying back with dollars that are worth slightly less than when you borrowed them. This is why fixed-rate loans can be a better deal than variable-rate loans — your rate stays the same while your dollars shrink.\n\nFor investing: Inflation hurts if your returns don't outpace it. Cash in a savings account at 0.5% during 3% inflation is actually losing real value. The S&P 500 historically returns ~10% nominal (before inflation) and ~7% real (after inflation) — still a strong positive return.\n\nThe takeaway: holding cash is slowly losing to inflation. Investing in assets that grow faster than inflation (like stocks, real estate) is how you preserve and grow wealth.`,
  },
  {
    id: 'subsidized-vs-unsubsidized',
    question: 'Subsidized vs. unsubsidized student loans — what\'s the difference?',
    answer: `Both are federal student loans, but they behave differently while you're in school:\n\nSubsidized loans: The U.S. government pays your interest while you're enrolled at least half-time, during the grace period after graduation, and during deferment. You only borrow what you borrow — it doesn't grow while you're in school. Available only to undergrads with financial need.\n\nUnsubsidized loans: Interest starts accruing from the day the loan is disbursed — even while you're sitting in freshman orientation. Most students don't pay it during school, so it gets "capitalized" (added to your principal balance) at graduation. A $50,000 unsubsidized loan at 6.54% grows to about $64,600 by the time you graduate — and now you're paying interest on $64,600.\n\nAlways take subsidized loans first. Exhaust your subsidized eligibility before touching unsubsidized. And if you can afford to pay interest on unsubsidized loans while in school, do it — every dollar of unpaid interest you prevent from capitalizing saves you years of compounding interest later.`,
  },
];
