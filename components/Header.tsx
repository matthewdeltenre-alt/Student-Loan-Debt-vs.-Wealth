'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Student Loans', href: '/' },
  { label: 'Auto Loans', href: '/auto-loans' },
  { label: 'Learn', href: '/learn' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none hover:opacity-80 transition-opacity">
          <span className="text-xl font-black tracking-tight text-gray-900 uppercase">The Real Cost</span>
          <span className="text-xl font-black tracking-tight uppercase">
            <span className="text-red-600">of Debt</span>
            <span className="block h-0.5 w-full bg-red-600 mt-0.5 rounded-full" />
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
