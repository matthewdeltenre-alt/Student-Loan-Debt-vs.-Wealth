import type { Metadata } from 'next';
import AutoLoanCalculator from '@/components/AutoLoanCalculator';

export const metadata: Metadata = {
  title: 'Auto Loan True Cost Calculator | The Real Cost of Debt',
  description:
    'See what your car loan is really costing you — including total interest, depreciation, and the wealth you forfeit by borrowing instead of investing.',
  keywords: [
    'auto loan true cost',
    'car loan calculator',
    'auto loan opportunity cost',
    'car depreciation calculator',
    'should i finance a car',
    'auto loan vs investing',
  ],
  openGraph: {
    title: 'Auto Loan True Cost Calculator',
    description: 'See what your car loan is really costing you — including depreciation and opportunity cost.',
    type: 'website',
    url: 'https://www.therealcostofdebt.com/auto-loans',
  },
};

export default function AutoLoansPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber-700 text-sm font-semibold">
              Average new car loan: $40,657 at 7.1% interest
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Before you drive it off the lot,<br />
            <span className="text-red-600">see what you&apos;re really paying.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A car payment isn&apos;t just a car payment. It&apos;s interest on a depreciating asset,
            delayed wealth-building, and years of your income locked into something that&apos;s losing
            value every day.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: '$736/mo', label: 'Average new car payment' },
              { value: '~50%', label: 'Value lost in first 5 years' },
              { value: '68 months', label: 'Average loan term' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 px-4 py-3">
                <div className="text-2xl font-black text-red-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-base text-gray-700 font-medium">
            Enter your numbers below to see the full picture.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-8">
        <AutoLoanCalculator />
      </section>

      {/* ── TIPS SECTION ── */}
      <section className="bg-white border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">
            What car dealers don&apos;t tell you
          </h2>
          <p className="text-gray-500 text-center mb-12">
            The auto finance industry profits from your lack of information. Here&apos;s what to know.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Monthly payment is a trap',
                body: 'Dealers negotiate monthly payment, not total price. Stretching from 48 to 72 months feels affordable but adds thousands in interest and locks you in while the car loses value.',
                icon: '🪤',
              },
              {
                title: 'You\'re upside-down immediately',
                body: 'A new car loses 15-20% of its value the moment you drive it off the lot. If you financed most of it, you owe more than it\'s worth for the first year or two.',
                icon: '📉',
              },
              {
                title: 'The 20/4/10 rule',
                body: 'A widely-used guideline: 20% down, loan term no longer than 4 years, and total car costs (payment + insurance) no more than 10% of gross monthly income.',
                icon: '📐',
              },
              {
                title: 'Used cars have better math',
                body: 'A 3-year-old vehicle with 30,000 miles has already absorbed most of its depreciation. You get nearly the same reliability at 50-60% of the new price.',
                icon: '✅',
              },
              {
                title: 'Get pre-approved before you shop',
                body: 'If you need to finance, get pre-approved at your bank or credit union before stepping into a dealership. This gives you negotiating power and often a better rate.',
                icon: '🏦',
              },
              {
                title: 'The opportunity cost is enormous',
                body: 'A $700/month car payment invested for 30 years at 7% turns into $850,000. You might buy a dozen cheap used cars in that time and still come out millions ahead.',
                icon: '📈',
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <div className="text-white font-bold text-lg">TheRealCostOfDebt.com</div>
          <p className="text-sm">
            This tool is for educational purposes only and does not constitute financial advice.
            Calculations use simplified models and historical averages — actual results will vary.
            Consult a licensed financial advisor before making major financial decisions.
          </p>
        </div>
      </footer>

    </main>
  );
}
