// ── Car Affordability Historical Data ────────────────────────────────────────
//
// This is the single source of truth for the affordability chart on /auto-loans.
// Update this file when new annual data becomes available (typically Q1 of the
// following year once full-year averages are published).
//
// ── How to update each series ────────────────────────────────────────────────
//
// CAR PRICE (carPrice)
//   Source: Kelley Blue Book / Cox Automotive average transaction price
//   Where:  https://mediaroom.kbb.com (search "average transaction price")
//   When:   Full-year average published each January
//
// MONTHLY PAYMENT (payment)
//   Source: Experian State of the Automotive Finance Market
//   Where:  https://www.experian.com/automotive/automotive-credit-reports
//           (Q4 report, released ~February, contains full-year average)
//   When:   Q4 report published each February
//
// AVERAGE APR (apr)
//   Source: Experian (same report as above, "new vehicle finance rates" table)
//
// MEDIAN HOUSEHOLD INCOME (income)
//   Source: U.S. Census Bureau via FRED
//   FRED series ID: MEHOINUSA672N
//   Where:  https://fred.stlouisfed.org/series/MEHOINUSA672N
//   When:   Annual data released each September for the prior year
//           (e.g., Sept 2025 releases 2024 income data)
//
// ── Update checklist (run each February after Experian Q4 report) ─────────────
//   [ ] New year row added to RAW array below
//   [ ] carPrice  — from KBB January market report
//   [ ] payment   — from Experian Q4 report (avg new car monthly payment)
//   [ ] apr       — from Experian Q4 report (avg new car APR)
//   [ ] income    — from FRED MEHOINUSA672N (may be prior year's data until Sept)
//   [ ] Commit + push → Vercel redeploys automatically

export interface AffordabilityRow {
  year: string;
  carPrice: number;   // avg new vehicle transaction price, USD
  payment: number;    // avg monthly new car loan payment, USD
  apr: number;        // avg new car loan APR, percent
  income: number;     // median US household income, USD/year
}

export const AFFORDABILITY_DATA: AffordabilityRow[] = [
  { year: '2015', carPrice: 33730, payment: 482, apr: 4.1, income: 56516 },
  { year: '2016', carPrice: 34500, payment: 499, apr: 4.0, income: 59039 },
  { year: '2017', carPrice: 35500, payment: 515, apr: 4.2, income: 61372 },
  { year: '2018', carPrice: 36270, payment: 530, apr: 4.6, income: 63179 },
  { year: '2019', carPrice: 37183, payment: 554, apr: 5.0, income: 68703 },
  { year: '2020', carPrice: 38900, payment: 563, apr: 3.8, income: 67521 },
  { year: '2021', carPrice: 43500, payment: 609, apr: 3.9, income: 70784 },
  { year: '2022', carPrice: 48100, payment: 700, apr: 4.6, income: 74580 },
  { year: '2023', carPrice: 47010, payment: 733, apr: 6.8, income: 80610 },
  { year: '2024', carPrice: 48400, payment: 734, apr: 6.4, income: 83730 },
  // ← Add new year here each February. Format:
  // { year: '2025', carPrice: ???, payment: ???, apr: ???, income: ??? },
];
