import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'True Cost of College | See What Student Loans Really Cost You',
  description:
    'Calculate the real cost of student loans including interest, opportunity cost, and the retirement wealth you forfeit by taking on college debt instead of investing.',
  keywords: [
    'student loan calculator',
    'true cost of college',
    'student loan opportunity cost',
    'college debt calculator',
    'should i go to college',
    'student loan vs investing',
    'roth ira vs student loans',
  ],
  openGraph: {
    title: 'True Cost of College',
    description: 'See what student loans really cost you — including the retirement wealth you\'ll never have.',
    type: 'website',
    url: 'https://www.truecostofcollege.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
