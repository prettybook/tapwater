'use client';

import Link from 'next/link';
import type { CityDataWithState } from '@/lib/data/types';

interface PopularCitiesSliderProps {
  cities: CityDataWithState[];
}

export function PopularCitiesSlider({ cities }: PopularCitiesSliderProps) {
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
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
      {cities.map((city) => (
        <Link
          key={`${city.stateSlug}-${city.slug}`}
          href={`/${city.stateSlug}/${city.slug}`}
          className="group flex-shrink-0 w-[280px] p-5 bg-white border border-gray-200 rounded-md hover:bg-brand-50 hover:border-brand-400 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-brand-900 group-hover:text-brand-600 transition-colors">
                {formatName(city.name)}
              </h3>
              <p className="text-sm text-brand-900/50">
                {city.state} &middot; {formatPopulation(city.population)}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-brand-900/30 group-hover:text-brand-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="space-y-2">
            {/* Hardness */}
            {city.hardness?.value && city.hardness?.classification && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-900/50">Hardness</span>
                <span className={`font-medium ${
                  city.hardness.classification === 'Soft'
                    ? 'text-safe'
                    : city.hardness.classification === 'Moderately Hard'
                      ? 'text-info'
                      : city.hardness.classification === 'Hard'
                        ? 'text-warning'
                        : 'text-danger'
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

            {/* Violations */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-brand-900/50">Violations</span>
              <span className={`font-medium ${
                city.violations3yr.total === 0
                  ? 'text-safe'
                  : city.violations3yr.healthBased > 0
                    ? 'text-danger'
                    : 'text-warning'
              }`}>
                {city.violations3yr.total === 0
                  ? 'None'
                  : `${city.violations3yr.total} (3yr)`}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
