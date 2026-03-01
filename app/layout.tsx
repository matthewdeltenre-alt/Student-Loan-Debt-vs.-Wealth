import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Real Cost of Debt | See What Your Loans Are Really Costing You',
  description:
    'Calculate the true cost of student loans, auto loans, and debt — including interest, opportunity cost, and the retirement wealth you forfeit by borrowing instead of investing.',
  keywords: [
    'real cost of debt calculator',
    'student loan calculator',
    'auto loan true cost',
    'debt vs investing',
    'student loan opportunity cost',
    'should i take out a loan',
    'debt vs wealth calculator',
    'roth ira vs student loans',
  ],
  openGraph: {
    title: 'The Real Cost of Debt',
    description: 'See what any loan is really costing you — including the wealth you\'ll never build.',
    type: 'website',
    url: 'https://www.therealcostofdebt.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HKL4BSENQY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HKL4BSENQY');
          `}
        </Script>
      </body>
    </html>
  );
}
