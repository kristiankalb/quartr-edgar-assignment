'use client';

import { Company } from '@/types';
import { useMemo, useState } from 'react';

type TickerInputProps = {
  companies: Company[];
  initialValue?: string;
  onTickerSelect: (ticker: string) => void;
};

const MAX_SUGGESTIONS = 5;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightMatch = (text: string, query: string) => {
  if (query.length === 0) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'ig');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-inherit">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
};

export const TickerInput = ({
  companies,
  initialValue = '',
  onTickerSelect,
}: TickerInputProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length === 0) return [];
    return companies
      .filter(
        (company) =>
          company.ticker.toLowerCase().includes(trimmed) ||
          company.title.toLowerCase().includes(trimmed),
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [companies, query]);

  const handleSelect = (company: Company) => {
    setQuery(company.ticker);
    setIsOpen(false);
    onTickerSelect(company.ticker);
  };

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="ticker-input" className="sr-only">
        Company ticker
      </label>
      <input
        type="text"
        id="ticker-input"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        placeholder="Search ticker or company name"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
          {suggestions.map((company) => (
            <li key={company.cik_str}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(company)}
                className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <span className="font-semibold">
                  {highlightMatch(company.ticker, query.trim())}
                </span>
                <span className="text-gray-600">
                  {highlightMatch(company.title, query.trim())}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
