'use client';

import { useState, useEffect, useRef } from 'react';

export interface CollegeResult {
  id: number;
  name: string;
  city: string;
  state: string;
  costOfAttendance: number | null;
  tuitionInState: number | null;
  tuitionOutOfState: number | null;
  medianDebt: number | null;
}

interface Props {
  onSelect: (college: CollegeResult) => void;
  selectedName?: string;
}

export default function SchoolSearch({ onSelect, selectedName }: Props) {
  const [query, setQuery] = useState(selectedName || '');
  const [results, setResults] = useState<CollegeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedName) setQuery(selectedName);
  }, [selectedName]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/colleges?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data.results || []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  }

  function handleSelect(college: CollegeResult) {
    setQuery(college.name);
    setOpen(false);
    setResults([]);
    onSelect(college);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search for your school..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {results.map((college) => (
            <button
              key={college.id}
              onClick={() => handleSelect(college)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="font-semibold text-gray-900 text-sm">{college.name}</div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500">{college.city}, {college.state}</span>
                {college.costOfAttendance && (
                  <span className="text-xs font-medium text-red-600">
                    ~${college.costOfAttendance.toLocaleString()}/yr
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {open && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl px-4 py-3 text-sm text-gray-500">
          No schools found. Try a different name or enter costs manually.
        </div>
      )}
    </div>
  );
}
