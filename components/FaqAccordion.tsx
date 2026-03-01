'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faqContent';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border rounded-xl overflow-hidden transition-all ${
              isOpen ? 'border-blue-200 shadow-sm' : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.question}</span>
              </div>
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isOpen ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}
              >
                <svg
                  className={`w-2.5 h-2.5 transition-transform ${isOpen ? 'rotate-180 text-white' : 'text-gray-400'}`}
                  fill="none"
                  viewBox="0 0 10 6"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 bg-white border-t border-gray-100">
                <div className="pt-4 space-y-3">
                  {item.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
