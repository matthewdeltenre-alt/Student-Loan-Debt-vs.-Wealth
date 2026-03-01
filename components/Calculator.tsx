'use client';

import { useState, useMemo } from 'react';
import SchoolSearch, { type CollegeResult } from './SchoolSearch';
import MajorSelect from './MajorSelect';
import ResultsPanel from './ResultsPanel';
import NetWorthChart from './NetWorthChart';
import {
  calcLoanSummary,
  calcOpportunityCost,
  calcNetWorthOverTime,
  type CalcInputs,
} from '@/lib/calculations';
import { type Major } from '@/lib/majors';

const DEFAULT_INPUTS: CalcInputs = {
  loanAmount: 40000,
  annualInterestRate: 6.54,
  repaymentYears: 10,
  collegeYears: 4,
  currentAge: 18,
  expectedSalary: 50000,
  investmentReturnRate: 7,
  noDegreeSalary: 38000,
};

type Tab = 'school' | 'manual';

export default function Calculator() {
  const [tab, setTab] = useState<Tab>('school');
  const [selectedCollege, setSelectedCollege] = useState<CollegeResult | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [showMajorPicker, setShowMajorPicker] = useState(false);
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS);
  const [returnRate, setReturnRate] = useState(7);

  const effectiveInputs = { ...inputs, investmentReturnRate: returnRate };

  function handleCollegeSelect(college: CollegeResult) {
    setSelectedCollege(college);
    const cost = college.costOfAttendance ?? college.tuitionInState ?? 30000;
    setInputs((prev) => ({
      ...prev,
      loanAmount: Math.round((cost * prev.collegeYears) / 1000) * 1000,
    }));
  }

  function handleMajorSelect(major: Major) {
    setSelectedMajor(major);
    setInputs((prev) => ({ ...prev, expectedSalary: major.startingSalary }));
    setShowMajorPicker(false);
  }

  function set(field: keyof CalcInputs) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = Number(e.target.value);
      setInputs((prev) => ({ ...prev, [field]: value }));
    };
  }

  const loan = useMemo(() => calcLoanSummary(effectiveInputs), [effectiveInputs]);
  const opportunity = useMemo(() => calcOpportunityCost(effectiveInputs), [effectiveInputs]);
  const netWorthData = useMemo(() => calcNetWorthOverTime(effectiveInputs), [effectiveInputs]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ── LEFT: INPUTS ── */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

            {/* School section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Your School</h2>
              <p className="text-sm text-gray-500 mb-4">Search for your school or enter costs manually.</p>

              {/* Tab toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setTab('school')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${tab === 'school' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                >
                  Search School
                </button>
                <button
                  onClick={() => setTab('manual')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${tab === 'manual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                >
                  Enter Manually
                </button>
              </div>

              {tab === 'school' ? (
                <div className="space-y-3">
                  <SchoolSearch
                    onSelect={handleCollegeSelect}
                    selectedName={selectedCollege?.name}
                  />
                  {selectedCollege && (
                    <div className="bg-blue-50 rounded-lg p-3 text-sm">
                      <div className="font-semibold text-blue-900">{selectedCollege.name}</div>
                      <div className="text-blue-700 mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        {selectedCollege.costOfAttendance && (
                          <span>Attendance/yr: <strong>${selectedCollege.costOfAttendance.toLocaleString()}</strong></span>
                        )}
                        {selectedCollege.tuitionInState && (
                          <span>In-state tuition: <strong>${selectedCollege.tuitionInState.toLocaleString()}</strong></span>
                        )}
                        {selectedCollege.tuitionOutOfState && (
                          <span>Out-of-state: <strong>${selectedCollege.tuitionOutOfState.toLocaleString()}</strong></span>
                        )}
                        {selectedCollege.medianDebt && (
                          <span>Median grad debt: <strong>${selectedCollege.medianDebt.toLocaleString()}</strong></span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <InputRow
                    label="Annual Cost of Attendance"
                    id="annual-cost"
                    prefix="$"
                    value={Math.round(inputs.loanAmount / inputs.collegeYears)}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        loanAmount: Number(e.target.value) * prev.collegeYears,
                      }))
                    }
                    min={0}
                    max={100000}
                    step={500}
                  />
                </div>
              )}
            </div>

            <Divider />

            {/* Major section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Your Major</h2>
              <p className="text-sm text-gray-500 mb-3">Affects salary used in repayment calculations.</p>

              <button
                onClick={() => setShowMajorPicker(!showMajorPicker)}
                className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg text-sm hover:border-blue-400 transition-colors"
              >
                {selectedMajor ? (
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{selectedMajor.name}</span>
                    <span className="text-emerald-600 font-medium">
                      ${selectedMajor.startingSalary.toLocaleString()} starting
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">Select your intended major...</span>
                )}
              </button>

              {showMajorPicker && (
                <div className="mt-3">
                  <MajorSelect onSelect={handleMajorSelect} selectedId={selectedMajor?.id} />
                </div>
              )}
            </div>

            <Divider />

            {/* Loan details */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Loan Details</h2>
              <div className="space-y-4">

                <InputRow
                  label={`Total Loan Amount (${inputs.collegeYears} yrs)`}
                  id="loan-amount"
                  prefix="$"
                  value={inputs.loanAmount}
                  onChange={set('loanAmount')}
                  min={0}
                  max={300000}
                  step={1000}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in College</label>
                    <select
                      value={inputs.collegeYears}
                      onChange={set('collegeYears')}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={2}>2 years</option>
                      <option value={4}>4 years</option>
                      <option value={6}>6 years (grad)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repayment Term</label>
                    <select
                      value={inputs.repaymentYears}
                      onChange={set('repaymentYears')}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={10}>10 years (standard)</option>
                      <option value={20}>20 years (extended)</option>
                      <option value={25}>25 years (income-driven)</option>
                    </select>
                  </div>
                </div>

                <InputRow
                  label="Interest Rate (%)"
                  id="interest-rate"
                  suffix="%"
                  value={inputs.annualInterestRate}
                  onChange={set('annualInterestRate')}
                  min={0}
                  max={15}
                  step={0.01}
                />

                <InputRow
                  label="Your Age Today"
                  id="current-age"
                  value={inputs.currentAge}
                  onChange={set('currentAge')}
                  min={14}
                  max={30}
                  step={1}
                />

                <InputRow
                  label="Expected Starting Salary"
                  id="salary"
                  prefix="$"
                  value={inputs.expectedSalary}
                  onChange={set('expectedSalary')}
                  min={20000}
                  max={300000}
                  step={1000}
                />

              </div>
            </div>

          </div>

          {/* ── INVESTMENT ASSUMPTION: separate card inside left column ── */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900">The Alternative: Investing Instead</h2>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">What if?</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Instead of paying off loans, what if that money went into the market? Set your expected annual return below.
            </p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">Expected Annual Return</label>
                <span className="text-sm font-bold text-emerald-700">{returnRate}%</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3% (conservative)</span>
                <span>10% (S&amp;P 500 avg)</span>
                <span>12%</span>
              </div>
              <p className="text-xs text-emerald-700 mt-2 font-medium">
                {returnRate <= 7
                  ? `${returnRate}% is inflation-adjusted — a conservative, realistic estimate.`
                  : `${returnRate}% reflects the S&P 500 nominal historical average. Not guaranteed.`}
              </p>
            </div>
          </div>

        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <ResultsPanel inputs={effectiveInputs} loan={loan} opportunity={opportunity} />
          </div>
        </div>
      </div>

      {/* ── CHART: full width below ── */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <NetWorthChart
          data={netWorthData}
          collegeYears={inputs.collegeYears}
          repaymentYears={inputs.repaymentYears}
          currentAge={inputs.currentAge}
        />
      </div>
    </div>
  );
}

// ── Helpers ──

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
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-gray-900">
          {prefix}{Number(value).toLocaleString()}{suffix}
        </span>
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
    </div>
  );
}
