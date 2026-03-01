import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">CollegeDebt</span>
            <span className="text-xl font-black text-blue-600">Reality</span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            A financial reality check for prospective students
          </span>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-red-700 text-sm font-semibold">$1.7 Trillion in student debt in the U.S.</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Before you sign,<br />
            <span className="text-red-600">see what you&apos;re really paying.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Student loans aren&apos;t just tuition. They&apos;re years of your life, thousands in interest,
            and the compounding wealth you could have built instead. See the full picture.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: '$37,787', label: 'Average borrower debt' },
              { value: '20 years', label: 'Average repayment time' },
              { value: '1 in 5', label: 'Borrowers are in default' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 px-4 py-3">
                <div className="text-2xl font-black text-red-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-base text-gray-700 font-medium">
            Use the calculator below to see your personal numbers.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-8">
        <Calculator />
      </section>

      {/* ── EDUCATION SECTION ── */}
      <section className="bg-white border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">
            What the brochure doesn&apos;t tell you
          </h2>
          <p className="text-gray-500 text-center mb-12">
            The student loan industry is built on decisions made at 17. Here&apos;s what you need to know.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Interest starts accruing immediately',
                body: 'On unsubsidized loans, interest builds while you\'re still in school. A $50,000 loan at 6.54% grows to $64,595 by graduation day — before you make a single payment.',
                icon: '⏰',
              },
              {
                title: 'The 10-year plan is brutal',
                body: 'The standard repayment term is 10 years. On $50,000 at 6.5%, that\'s $567/month — before rent, food, or car payments.',
                icon: '📅',
              },
              {
                title: 'Compounding works against you',
                body: 'The same compounding that builds wealth in the market works against you in debt. Every month you delay paying it off, you owe more.',
                icon: '📉',
              },
              {
                title: 'Your 20s are your most valuable investing years',
                body: 'A dollar invested at 22 is worth more than $21 at 65. Student debt delays your investing by a decade — that gap is enormous.',
                icon: '📈',
              },
              {
                title: 'Not all degrees are equal',
                body: 'A nursing degree from a state school has a 2-3 year payoff. A communications degree from a private university may never break even.',
                icon: '🎓',
              },
              {
                title: 'Alternatives are underrated',
                body: 'Trade schools, community college, coding bootcamps, and apprenticeships can lead to $60-100K+ careers with zero debt.',
                icon: '🔧',
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

      {/* ── ALTERNATIVES SECTION ── */}
      <section className="bg-blue-600 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            College isn&apos;t the only path to a great life.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Before signing any loan, explore every option. The best financial decision is an informed one.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Community College', sub: '2 yrs, then transfer' },
              { label: 'Trade School', sub: 'Electricians earn $90K+' },
              { label: 'Apprenticeships', sub: 'Earn while you learn' },
              { label: 'Bootcamps', sub: 'Tech skills in 6 months' },
            ].map((alt) => (
              <div key={alt.label} className="bg-blue-500 bg-opacity-60 rounded-xl p-4">
                <div className="font-bold text-white text-sm">{alt.label}</div>
                <div className="text-blue-200 text-xs mt-1">{alt.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <div className="text-white font-bold text-lg">CollegeDebtReality.com</div>
          <p className="text-sm">
            This tool is for educational purposes only and does not constitute financial advice.
            Calculations use simplified models and historical averages — actual results will vary.
            Consult a licensed financial advisor before making major financial decisions.
          </p>
          <p className="text-xs text-gray-600">
            College cost data sourced from the U.S. Department of Education College Scorecard.
            Salary data sourced from Bureau of Labor Statistics. S&amp;P 500 historical returns are not guaranteed.
          </p>
        </div>
      </footer>

    </main>
  );
}
