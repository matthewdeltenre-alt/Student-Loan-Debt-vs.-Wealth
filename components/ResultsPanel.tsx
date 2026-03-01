'use client';

import { CalcInputs, LoanSummary, OpportunityCost, formatCurrencyFull, formatCurrency } from '@/lib/calculations';

interface Props {
  inputs: CalcInputs;
  loan: LoanSummary;
  opportunity: OpportunityCost;
}

function StatCard({
  label,
  value,
  sub,
  variant = 'neutral',
  large = false,
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: 'debt' | 'invest' | 'neutral' | 'warning';
  large?: boolean;
}) {
  const colors = {
    debt: 'text-red-600',
    invest: 'text-emerald-600',
    neutral: 'text-gray-900',
    warning: 'text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`font-bold ${large ? 'text-2xl md:text-3xl' : 'text-xl'} ${colors[variant]}`}>
        {value}
      </span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

export default function ResultsPanel({ inputs, loan, opportunity }: Props) {
  const { monthlyPayment, totalPaid, totalInterest, payoffAge, payoffYear, debtToIncomeRatio } = loan;
  const { loanPaymentsAtRetirement, rothIRAStartAt18, rothIRAStartAfterDebt, rothIRADifference, wealthGap } = opportunity;

  const dtiColor: 'invest' | 'warning' | 'debt' =
    debtToIncomeRatio < 10 ? 'invest' : debtToIncomeRatio < 20 ? 'warning' : 'debt';

  return (
    <div className="space-y-6">

      {/* The big number */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">
          True Cost of This Debt
        </p>
        <p className="text-4xl md:text-5xl font-black text-red-600">
          {formatCurrencyFull(totalPaid)}
        </p>
        <p className="text-sm text-red-500 mt-2">
          {formatCurrencyFull(inputs.loanAmount)} borrowed + {formatCurrencyFull(totalInterest)} in interest
        </p>
      </div>

      {/* Loan facts grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Monthly Payment"
          value={formatCurrencyFull(monthlyPayment)}
          sub="for the next 10 years"
          variant="neutral"
        />
        <StatCard
          label="Total Interest Paid"
          value={formatCurrencyFull(totalInterest)}
          sub="money you'll never get back"
          variant="neutral"
        />
        <StatCard
          label="Debt-Free Age"
          value={`${payoffAge}`}
          sub={`Year ${payoffYear}`}
          variant="neutral"
        />
        <StatCard
          label="Debt-to-Income"
          value={`${debtToIncomeRatio.toFixed(1)}%`}
          sub={debtToIncomeRatio > 20 ? 'Above recommended 20%' : 'of monthly income'}
          variant="neutral"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200" />

      {/* Opportunity cost section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3">
          What This Debt Is Really Costing You
        </h3>
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
              If you invested your loan payments instead (by age 65)
            </p>
            <p className="text-3xl font-black text-emerald-700">
              {formatCurrency(loanPaymentsAtRetirement)}
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              {formatCurrencyFull(monthlyPayment)}/mo × {inputs.repaymentYears} yrs, then compounded to 65
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              Retirement wealth comparison
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Invest from age {inputs.currentAge}</p>
                <p className="text-xl font-black text-emerald-600">{formatCurrency(opportunity.totalWealth65Invest)}</p>
              </div>
              <div className="text-gray-300 font-light text-2xl">vs</div>
              <div className="text-right">
                <p className="text-xs text-gray-500">College path</p>
                <p className="text-xl font-black text-red-500">{formatCurrency(opportunity.totalWealth65College)}</p>
              </div>
            </div>
            <div className="border-t border-amber-200 pt-2">
              <p className="text-xs text-amber-800 font-semibold">
                Taking on this debt means arriving at retirement with{' '}
                <span className="text-red-600">{formatCurrency(Math.abs(wealthGap))} less</span> than if you had invested that money starting at age {inputs.currentAge}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200" />

      {/* Roth IRA section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-bold text-gray-900">Roth IRA: Starting Now vs. After Debt</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Key Insight</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-600 font-medium">Start at age {inputs.currentAge}</p>
              <p className="text-xl font-black text-blue-800">{formatCurrency(rothIRAStartAt18)}</p>
              <p className="text-xs text-blue-500">Max $7,000/yr to age 65</p>
            </div>
            <div className="text-3xl text-blue-300 font-thin">vs</div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Start at age {payoffAge}</p>
              <p className="text-xl font-black text-gray-700">{formatCurrency(rothIRAStartAfterDebt)}</p>
              <p className="text-xs text-gray-400">After debt is gone</p>
            </div>
          </div>
          <div className="border-t border-blue-200 pt-3 flex items-center justify-between">
            <span className="text-sm text-blue-700 font-semibold">Compounding years lost to debt:</span>
            <span className="text-lg font-black text-red-600">-{formatCurrency(rothIRADifference)}</span>
          </div>
          <p className="text-xs text-blue-600 italic">
            Roth IRA growth is tax-free. Every year you delay costs you exponentially more at retirement.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <div className="text-xs text-gray-400 space-y-1 border-t pt-4">
        <p className="font-medium text-gray-500">Assumptions</p>
        <p>S&amp;P 500 historical avg: {inputs.investmentReturnRate}% annual return</p>
        <p>Effective tax rate: 22% | Salary growth: 2%/yr</p>
        <p>This is educational, not financial advice. Consult a licensed advisor.</p>
      </div>
    </div>
  );
}
