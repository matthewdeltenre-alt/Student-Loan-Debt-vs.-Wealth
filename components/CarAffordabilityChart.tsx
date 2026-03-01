'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

// ── Data ─────────────────────────────────────────────────────────────────────
// All values indexed to 2015 = 100 for apples-to-apples comparison.
//
// Sources:
//   Car price:       Kelley Blue Book / Cox Automotive avg transaction price reports
//   Monthly payment: Experian State of the Automotive Finance Market (annual avg)
//   Household income: U.S. Census Bureau, Real Median Household Income (MEHOINUSA672N)

const RAW = [
  { year: '2015', carPrice: 33730, payment: 482,  income: 56516 },
  { year: '2016', carPrice: 34500, payment: 499,  income: 59039 },
  { year: '2017', carPrice: 35500, payment: 515,  income: 61372 },
  { year: '2018', carPrice: 36270, payment: 530,  income: 63179 },
  { year: '2019', carPrice: 37183, payment: 554,  income: 68703 },
  { year: '2020', carPrice: 38900, payment: 563,  income: 67521 },
  { year: '2021', carPrice: 43500, payment: 609,  income: 70784 },
  { year: '2022', carPrice: 48100, payment: 700,  income: 74580 },
  { year: '2023', carPrice: 47010, payment: 733,  income: 80610 },
  { year: '2024', carPrice: 48400, payment: 734,  income: 83730 },
];

const BASE = RAW[0];
const DATA = RAW.map((d) => ({
  year: d.year,
  'Avg New Car Price':   Math.round((d.carPrice / BASE.carPrice)  * 100),
  'Monthly Payment':     Math.round((d.payment  / BASE.payment)   * 100),
  'Median HH Income':    Math.round((d.income   / BASE.income)    * 100),
  // raw values for tooltip
  _carPrice: d.carPrice,
  _payment:  d.payment,
  _income:   d.income,
}));

// ── Tooltip ───────────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; payload: typeof DATA[0] }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const raw = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm min-w-[200px]">
      <p className="font-bold text-gray-800 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-gray-600 text-xs">{p.name}</span>
          </div>
          <span className="font-semibold text-gray-900 text-xs">
            {p.value} <span className="text-gray-400 font-normal">(index)</span>
          </span>
        </div>
      ))}
      <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
        <p className="text-xs text-gray-400">Actual values:</p>
        <p className="text-xs text-gray-600">Car price: <strong>${raw._carPrice.toLocaleString()}</strong></p>
        <p className="text-xs text-gray-600">Avg payment: <strong>${raw._payment}/mo</strong></p>
        <p className="text-xs text-gray-600">Median income: <strong>${raw._income.toLocaleString()}/yr</strong></p>
      </div>
    </div>
  );
}

// ── Then vs. Now cards ────────────────────────────────────────────────────────

const THEN = RAW[0];   // 2015
const NOW  = RAW[RAW.length - 1]; // 2024

function pct(a: number, b: number) {
  return `+${Math.round(((b - a) / a) * 100)}%`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CarAffordabilityChart() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          Cars have never been this expensive to finance
        </h2>
        <p className="text-gray-500 leading-relaxed">
          New car prices surged 44% since 2015. But monthly payments jumped even faster — because
          interest rates nearly doubled. Even as prices eased from their 2022 peak,
          payments have barely budged.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-700">Growth since 2015 (indexed, 2015 = 100)</p>
          <p className="text-xs text-gray-400 mt-0.5">Higher = grown more relative to 2015 baseline</p>
        </div>

        <div className="h-72 md:h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
              />
              <YAxis
                domain={[90, 165]}
                tickFormatter={(v) => `${v}`}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }}
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />
              {/* Mark the chip-shortage spike */}
              <ReferenceLine
                x="2021"
                stroke="#f97316"
                strokeDasharray="4 4"
                label={{ value: 'Chip shortage', fill: '#f97316', fontSize: 10, position: 'top' }}
              />
              <Line
                type="monotone"
                dataKey="Avg New Car Price"
                stroke="#dc2626"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#dc2626' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Monthly Payment"
                stroke="#f97316"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#f97316' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Median HH Income"
                stroke="#2563eb"
                strokeWidth={2.5}
                strokeDasharray="5 3"
                dot={{ r: 3, fill: '#2563eb' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key callout */}
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <p className="text-sm text-orange-800 leading-relaxed">
            <strong>Why payments outpaced prices:</strong> The Fed raised interest rates from ~3.8% (2021) to ~6.4% (2024).
            A car that got cheaper from its 2022 peak still costs more to <em>finance</em> each month.
          </p>
        </div>

        {/* Source attribution */}
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          Sources: <a href="https://mediaroom.kbb.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Kelley Blue Book / Cox Automotive</a> (avg transaction price);{' '}
          <a href="https://www.experian.com/automotive/automotive-credit-reports" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Experian State of the Automotive Finance Market</a> (avg monthly payment);{' '}
          <a href="https://fred.stlouisfed.org/series/MEHOINUSA672N" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">U.S. Census Bureau via FRED</a> (median household income).
          All figures are approximate annual averages. Index: 2015 = 100.
        </p>
      </div>

      {/* Then vs. Now */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">2015 vs. 2024: the same purchase, very different math</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Avg new car price',
              then: `$${THEN.carPrice.toLocaleString()}`,
              now: `$${NOW.carPrice.toLocaleString()}`,
              change: pct(THEN.carPrice, NOW.carPrice),
              note: 'Chip shortage never fully unwound',
            },
            {
              label: 'Avg monthly payment',
              then: `$${THEN.payment}/mo`,
              now: `$${NOW.payment}/mo`,
              change: pct(THEN.payment, NOW.payment),
              note: 'Payments grew faster than prices',
            },
            {
              label: 'Avg loan interest rate',
              then: '4.1% APR',
              now: '6.4% APR',
              change: '+56%',
              note: 'Fed hikes made financing far costlier',
            },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">{item.label}</div>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">2015</div>
                  <div className="text-lg font-bold text-gray-500">{item.then}</div>
                </div>
                <div className="text-gray-200 font-light text-2xl mb-1">→</div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-0.5">2024</div>
                  <div className="text-lg font-bold text-gray-900">{item.now}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-400">{item.note}</span>
                <span className="text-sm font-black text-red-600">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
