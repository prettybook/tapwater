'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { CityDataWithState } from '@/lib/data/types';

interface WorstCitiesSliderProps {
  cities: CityDataWithState[];
}

export function WorstCitiesSlider({ cities }: WorstCitiesSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 340;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
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

  // Format population
  const formatPopulation = (pop: number) => {
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)}M`;
    }
    if (pop >= 1000) {
      return `${(pop / 1000).toFixed(0)}K`;
    }
    return pop.toLocaleString();
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-900 hover:bg-brand-50 transition-colors hidden md:flex"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-900 hover:bg-brand-50 transition-colors hidden md:flex"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
      >
        {cities.map((city) => (
          <Link
            key={`${city.stateSlug}-${city.slug}`}
            href={`/${city.stateSlug}/${city.slug}`}
            className="group flex-shrink-0 w-[300px] p-5 bg-white border border-gray-200 rounded-md hover:bg-brand-50 hover:border-brand-400 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-brand-900 group-hover:text-brand-600 transition-colors">
                  {formatName(city.name)}
                </h3>
                <p className="text-sm text-brand-900/50">
                  {city.state} &middot; {formatPopulation(city.population)}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-danger-light rounded-md">
                <svg className="w-4 h-4 text-danger" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              {/* Violations */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-900/50">Violations (3yr)</span>
                <span className="font-medium text-danger">
                  {city.violations3yr.total}
                  {city.violations3yr.healthBased > 0 && (
                    <span className="text-xs ml-1">
                      ({city.violations3yr.healthBased} health)
                    </span>
                  )}
                </span>
              </div>

              {/* Hardness */}
              {city.hardness?.classification && city.hardness?.value && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-900/50">Hardness</span>
                  <span className={`font-medium ${
                    city.hardness.classification === 'Very Hard'
                      ? 'text-danger'
                      : city.hardness.classification === 'Hard'
                        ? 'text-warning'
                        : 'text-brand-900'
                  }`}>
                    {city.hardness.value} ppm
                  </span>
                </div>
              )}

              {/* Lead Status */}
              {city.leadAndCopper?.leadStatus && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-900/50">Lead</span>
                  <span className={`font-medium ${
                    city.leadAndCopper.leadStatus === 'good'
                      ? 'text-safe'
                      : city.leadAndCopper.leadStatus === 'warning'
                        ? 'text-warning'
                        : city.leadAndCopper.leadStatus === 'exceeded'
                          ? 'text-danger'
                          : 'text-brand-900'
                  }`}>
                    {city.leadAndCopper.leadStatus === 'good'
                      ? 'Below limit'
                      : city.leadAndCopper.leadStatus === 'warning'
                        ? 'Near limit'
                        : city.leadAndCopper.leadStatus === 'exceeded'
                          ? 'Above limit'
                          : 'Unknown'}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-sm text-brand-600 group-hover:text-brand-700 font-medium inline-flex items-center">
                View full report
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
