'use client';

import { useState } from 'react';
import { MAJORS, FIELDS, type Major } from '@/lib/majors';

interface Props {
  onSelect: (major: Major) => void;
  selectedId?: string;
}

export default function MajorSelect({ onSelect, selectedId }: Props) {
  const [activeField, setActiveField] = useState<string>('All');
  const [search, setSearch] = useState('');

  const fields = ['All', ...FIELDS];

  const filtered = MAJORS.filter((m) => {
    const matchesField = activeField === 'All' || m.field === activeField;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesField && matchesSearch;
  });

  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search majors..."
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Field filter pills */}
      <div className="flex flex-wrap gap-1.5">
        {fields.map((f) => (
          <button
            key={f}
            onClick={() => setActiveField(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeField === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Major list */}
      <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
        {filtered.map((major) => (
          <button
            key={major.id}
            onClick={() => onSelect(major)}
            className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${
              selectedId === major.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${selectedId === major.id ? 'text-blue-700' : 'text-gray-900'}`}>
                {major.name}
              </span>
              <div className="text-right">
                <div className="text-xs text-gray-500">Starting</div>
                <div className="text-xs font-semibold text-gray-700">
                  ${major.startingSalary.toLocaleString()}
                </div>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-3 text-sm text-gray-500">No majors found.</div>
        )}
      </div>
    </div>
  );
}
