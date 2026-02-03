'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface City {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  population: number;
}

interface HeroSearchProps {
  cities: City[];
}

export function HeroSearch({ cities }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter cities based on query
  const filteredCities = query.length >= 2
    ? cities
        .filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.state.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigate to city
  const navigateToCity = useCallback((city: City) => {
    router.push(`/${city.stateSlug}/${city.slug}`);
    setIsOpen(false);
    setQuery('');
  }, [router]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredCities[selectedIndex]) {
          navigateToCity(filteredCities[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Format city name
  const formatName = (name: string) => {
    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-brand-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for your city..."
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && filteredCities.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden"
        >
          {filteredCities.map((city, index) => (
            <button
              key={`${city.stateSlug}-${city.slug}`}
              onClick={() => navigateToCity(city)}
              className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                index === selectedIndex
                  ? 'bg-brand-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div>
                <p className="font-medium text-brand-900">
                  {formatName(city.name)}
                </p>
                <p className="text-sm text-brand-900/50">{city.state}</p>
              </div>
              <svg
                className="w-4 h-4 text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && filteredCities.length === 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-xl border border-gray-200 p-4 text-center"
        >
          <p className="text-brand-900/50">No cities found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
