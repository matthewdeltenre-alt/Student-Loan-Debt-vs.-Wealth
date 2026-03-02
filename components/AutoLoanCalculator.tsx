'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { calcMonthlyPayment, fvMonthly, formatCurrency, formatCurrencyFull } from '@/lib/calculations';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AutoInputs {
  vehiclePrice: number;
  downPayment: number;
  interestRate: number;
  termMonths: number;
  currentAge: number;
  monthlyIncome: number;
}

interface FredRate {
  rate: number;
  date: string;
  sourceUrl: string;
}

interface ChartPoint {
  label: string;
  investInstead: number;
  carValue: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];
const DEPRECIATION_RATE = 0.15;

const DEFAULT_INPUTS: AutoInputs = {
  vehiclePrice: 32000,
  downPayment: 4000,
  interestRate: 7.5,
  termMonths: 60,
  currentAge: 22,
  monthlyIncome: 4500,
};

// ── Chart data ────────────────────────────────────────────────────────────────

function calcChartData(inputs: AutoInputs, monthlyPayment: number, investRate: number): ChartPoint[] {
  const { vehiclePrice } = inputs;
  const termYears = inputs.termMonths / 12;
  const data: ChartPoint[] = [];

  for (let year = 0; year <= 10; year++) {
    const carValue = vehiclePrice * Math.pow(1 - DEPRECIATION_RATE, year);

    let investInstead: number;
    if (year <= termYears) {
      investInstead = fvMonthly(monthlyPayment, investRate, year);
    } else {
      const portfolioAtPayoff = fvMonthly(monthlyPayment, investRate, termYears);
      const yearsAfterPayoff = year - termYears;
      investInstead =
        portfolioAtPayoff * Math.pow(1 + investRate / 100, yearsAfterPayoff) +
        fvMonthly(monthlyPayment, investRate, yearsAfterPayoff);
    }

    data.push({
      label: year === 0 ? 'Today' : `Yr ${year}`,
      investInstead: Math.round(investInstead),
      carValue: Math.round(carValue),
    });
  }

  return data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatYAxis(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-bold text-gray-800 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-600">{p.name}</span>
          </div>
          <span className="font-semibold text-gray-900">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-100" />;
}

function InputRow({
  label,
  id,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: React.ReactNode;
}) {
  const [textValue, setTextValue] = useState(String(value));
  const [focused, setFocused] = useState(false);

  if (!focused && String(value) !== textValue && !textValue.endsWith('.')) {
    setTextValue(String(value));
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setTextValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange({
        target: { value: String(Math.min(max, Math.max(min, num))) },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }

  function handleBlur() {
    setFocused(false);
    const num = parseFloat(textValue);
    const clamped = isNaN(num) ? min : Math.min(max, Math.max(min, num));
    setTextValue(String(clamped));
    onChange({ target: { value: String(clamped) } } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-sm text-gray-500">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={focused ? textValue : Number(value).toLocaleString()}
            onChange={handleTextChange}
            onFocus={() => { setFocused(true); setTextValue(String(value)); }}
            onBlur={handleBlur}
            className="w-24 text-right text-sm font-bold text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
      {hint && <div className="mt-1">{hint}</div>}
    </div>
  );
}

function ResultCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-xl font-bold text-gray-900">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AutoLoanCalculator() {
  const [inputs, setInputs] = useState<AutoInputs>(DEFAULT_INPUTS);
  const [investRate, setInvestRate] = useState(7);
  const [fredRate, setFredRate] = useState<FredRate | null>(null);

  // Fetch current market rate from FRED on mount
  useEffect(() => {
    fetch('/api/auto-rate')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.rate) setFredRate(data);
      })
      .catch(() => {}); // silently fail — FRED rate is informational only
  }, []);

  function set(field: keyof AutoInputs) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInputs((prev) => ({ ...prev, [field]: Number(e.target.value) }));
    };
  }

  const loanAmount = Math.max(0, inputs.vehiclePrice - inputs.downPayment);
  const termYears = inputs.termMonths / 12;

  const monthlyPayment = useMemo(
    () => calcMonthlyPayment(loanAmount, inputs.interestRate, termYears),
    [loanAmount, inputs.interestRate, termYears]
  );

  const totalPaid = monthlyPayment * inputs.termMonths;
  const totalInterest = totalPaid - loanAmount;
  const totalCostOfVehicle = inputs.downPayment + totalPaid;
  const dtiPercent = inputs.monthlyIncome > 0 ? (monthlyPayment / inputs.monthlyIncome) * 100 : 0;

  const carValueAtPayoff = inputs.vehiclePrice * Math.pow(1 - DEPRECIATION_RATE, termYears);
  const depreciationLoss = inputs.vehiclePrice - carValueAtPayoff;

  // Opportunity cost (driven by user-adjustable investRate)
  const yearsToRetirement = Math.max(0, 65 - inputs.currentAge);
  const portfolioAtPayoff = fvMonthly(monthlyPayment, investRate, termYears);
  const yearsAfterPayoff = Math.max(0, yearsToRetirement - termYears);
  const investedAtRetirement =
    portfolioAtPayoff * Math.pow(1 + investRate / 100, yearsAfterPayoff) +
    fvMonthly(monthlyPayment, investRate, yearsAfterPayoff);

  const chartData = useMemo(
    () => calcChartData(inputs, monthlyPayment, investRate),
    [inputs, monthlyPayment, investRate]
  );

  // FRED rate hint shown below the interest rate slider
  const fredHint = fredRate ? (
    <p className="text-xs text-blue-600">
      Current avg (60-mo new car loan):{' '}
      <strong>{fredRate.rate.toFixed(2)}%</strong>
      {' · '}
      <a
        href={fredRate.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-800"
      >
        Federal Reserve via FRED
      </a>
      {' · '}{fredRate.date}
    </p>
  ) : null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ── LEFT: INPUTS ── */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

            {/* Vehicle */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Vehicle Details</h2>
              <div className="space-y-4">
                <InputRow
                  label="Vehicle Price"
                  id="vehicle-price"
                  prefix="$"
                  value={inputs.vehiclePrice}
                  onChange={set('vehiclePrice')}
                  min={5000}
                  max={150000}
                  step={500}
                />
                <InputRow
                  label="Down Payment"
                  id="down-payment"
                  prefix="$"
                  value={inputs.downPayment}
                  onChange={set('downPayment')}
                  min={0}
                  max={inputs.vehiclePrice}
                  step={500}
                />
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Loan Amount</span>
                  <span className="text-base font-black text-gray-900">{formatCurrencyFull(loanAmount)}</span>
                </div>
              </div>
            </div>

            <Divider />

            {/* Loan terms */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Loan Terms</h2>
              <div className="space-y-4">
                <InputRow
                  label="Interest Rate (%)"
                  id="interest-rate"
                  suffix="%"
                  value={inputs.interestRate}
                  onChange={set('interestRate')}
                  min={0}
                  max={25}
                  step={0.1}
                  hint={fredHint}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TERM_OPTIONS.map((months) => (
                      <button
                        key={months}
                        onClick={() => setInputs((prev) => ({ ...prev, termMonths: months }))}
                        className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                          inputs.termMonths === months
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {months} mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── OPPORTUNITY COST: separate card below inputs ── */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900">The Alternative: Investing Instead</h2>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">What if?</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Instead of making car payments, what if that money went into the market? Set your expected annual return below.
            </p>

            {/* Your Situation — drives opportunity cost and DTI */}
            <div className="space-y-4 mb-6">
              <InputRow
                label="Your Age Today"
                id="current-age"
                value={inputs.currentAge}
                onChange={set('currentAge')}
                min={16}
                max={60}
                step={1}
              />
              <InputRow
                label="Monthly Take-Home Income"
                id="monthly-income"
                prefix="$"
                value={inputs.monthlyIncome}
                onChange={set('monthlyIncome')}
                min={1000}
                max={30000}
                step={100}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">Expected Annual Return</label>
                <span className="text-sm font-bold text-emerald-700">{investRate}%</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={investRate}
                onChange={(e) => setInvestRate(Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3% (conservative)</span>
                <span className="relative group cursor-help inline-flex items-center gap-1">
                  10% (S&amp;P 500 avg)
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-400 text-white font-bold leading-none" style={{ fontSize: '8px' }}>i</span>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center leading-relaxed">
                    The S&P 500 has averaged ~10% growth per year since 1957. Not guaranteed.
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </span>
                </span>
                <span>12%</span>
              </div>
              <p className="text-xs text-emerald-700 mt-2 font-medium">
                {investRate <= 7
                  ? `${investRate}% is inflation-adjusted — a conservative, realistic estimate.`
                  : `${investRate}% reflects the S&P 500 nominal historical average. Not guaranteed.`}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-emerald-200 p-4">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                If invested instead, by age 65
              </p>
              <p className="text-3xl font-black text-emerald-700">{formatCurrency(investedAtRetirement)}</p>
              <p className="text-xs text-emerald-600 mt-1">
                {formatCurrencyFull(monthlyPayment)}/mo for {inputs.termMonths} months, then compounded to age 65
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="lg:sticky lg:top-8 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Your Loan Summary</h2>

            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                label="Monthly Payment"
                value={formatCurrencyFull(monthlyPayment)}
                sub={`${dtiPercent.toFixed(0)}% of monthly income`}
              />
              <ResultCard
                label="Total Interest"
                value={formatCurrency(totalInterest)}
                sub={`Over ${inputs.termMonths} months`}
              />
              <ResultCard
                label="Total Cost of Vehicle"
                value={formatCurrency(totalCostOfVehicle)}
                sub="Price + interest + down payment"
              />
              <ResultCard
                label="Car Value at Payoff"
                value={formatCurrency(carValueAtPayoff)}
                sub={`After ${termYears.toFixed(1)} yrs of depreciation`}
              />
            </div>

            {/* Depreciation reality check */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
              <div className="font-bold text-orange-900 text-sm">Depreciation Reality Check</div>
              <p className="text-xs text-orange-700 leading-relaxed">
                You&apos;re paying <strong>{formatCurrencyFull(totalCostOfVehicle)}</strong> for a vehicle
                that will be worth approximately <strong>{formatCurrency(carValueAtPayoff)}</strong> when
                you finish paying for it — a loss of{' '}
                <strong>{formatCurrency(depreciationLoss + totalInterest)}</strong> between
                depreciation and interest.
              </p>
              <p className="text-xs text-orange-600">
                Cars lose ~15% of value per year. After 5 years, most are worth about half of what you paid.
              </p>
            </div>

            {/* DTI warning */}
            {dtiPercent > 15 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="font-bold text-red-900 text-sm mb-1">High Debt-to-Income Warning</div>
                <p className="text-xs text-red-700 leading-relaxed">
                  This payment is <strong>{dtiPercent.toFixed(0)}%</strong> of your monthly income.
                  Financial advisors recommend keeping total debt payments under 15% of take-home pay.
                  Consider a larger down payment, shorter loan, or less expensive vehicle.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CHART: full width below ── */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Car Value vs. What You Could Have Built</h3>
          <p className="text-sm text-gray-500 mt-1">
            Your car depreciates while your monthly payment, invested instead, would compound. Same money, very different outcomes.
          </p>
        </div>

        <div className="h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="investGradAuto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="carGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }}
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="investInstead"
                name="If Invested Instead"
                stroke="#16a34a"
                strokeWidth={2.5}
                fill="url(#investGradAuto)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="carValue"
                name="Car Value"
                stroke="#dc2626"
                strokeWidth={2.5}
                fill="url(#carGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Investment return rate set above. Car depreciation assumes ~{(DEPRECIATION_RATE * 100).toFixed(0)}%/year.
          This is illustrative, not financial advice.
        </p>
      </div>
    </div>
  );
}
