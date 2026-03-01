'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { NetWorthPoint } from '@/lib/calculations';

interface Props {
  data: NetWorthPoint[];
  collegeYears: number;
  repaymentYears: number;
  currentAge: number;
}

function formatYAxis(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
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
          <span className={`font-semibold ${p.value < 0 ? 'text-red-600' : 'text-gray-900'}`}>
            {p.value < 0 ? '-' : ''}${Math.abs(p.value).toLocaleString()}
          </span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
          <span className="text-gray-500">Gap</span>
          <span className="font-bold text-emerald-600">
            +${Math.abs(payload[1].value - payload[0].value).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function NetWorthChart({ data, collegeYears, repaymentYears, currentAge }: Props) {
  const debtFreeAge = currentAge + collegeYears + repaymentYears;

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Net Worth Over Time</h3>
        <p className="text-sm text-gray-500 mt-1">
          College path vs. investing that money instead — same time horizon, very different outcomes.
        </p>
      </div>

      <div className="h-72 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="collegeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              interval={4}
            />
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
            <ReferenceLine x={`Age ${debtFreeAge}`} stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'Debt Free', fill: '#dc2626', fontSize: 11 }} />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Area
              type="monotone"
              dataKey="investPath"
              name="Invest Instead"
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#investGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="collegePath"
              name="College Path"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#collegeGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Invest path assumes loan payment amount + 15% of income invested from age {currentAge}.
        College path assumes 10% savings while repaying, 20% after debt-free.
        Return rate set by user above.
      </p>
    </div>
  );
}
