import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Learn: Financial Basics | The Real Cost of Debt',
  description:
    'Understand compound interest, the S&P 500, Roth IRAs, opportunity cost, and more — explained in plain English for students and young adults.',
  keywords: [
    'what is compound interest',
    'what is the sp500',
    'what is a roth ira',
    'opportunity cost explained',
    'financial literacy for teens',
    'investing for beginners',
    'student loan subsidized vs unsubsidized',
  ],
  openGraph: {
    title: 'Learn Financial Basics | The Real Cost of Debt',
    description: 'Plain-English explanations of compound interest, investing, and debt — for people who were never taught this stuff.',
    type: 'website',
    url: 'https://www.therealcostofdebt.com/learn',
  },
};

export default function LearnPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-700 text-sm font-semibold">No jargon. No prerequisites.</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            The financial basics<br />
            <span className="text-blue-600">nobody taught you in school.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Understanding how money works is one of the most valuable things you can do
            before taking on debt or signing anything. Start here.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Now put the math to work.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Use our calculators to see how these concepts apply to your actual numbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Student Loan Calculator
            </a>
            <a
              href="/auto-loans"
              className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors border border-blue-400"
            >
              Auto Loan Calculator
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <div className="text-white font-bold text-lg">TheRealCostOfDebt.com</div>
          <p className="text-sm">
            This content is for educational purposes only and does not constitute financial advice.
            Consult a licensed financial advisor before making major financial decisions.
          </p>
        </div>
      </footer>

    </main>
  );
}
