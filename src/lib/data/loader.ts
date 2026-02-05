/**
 * Data loading utilities for tapwater.org
 * Loads static JSON files for states and cities
 */

import {
  StateData,
  CityData,
  CityDataWithState,
  StatesMetadataFile,
  EPAStandardsFile,
  StateMetadata,
} from './types';

// ============================================
// Population Threshold for Staged Rollout
// ============================================

/**
 * Minimum population for cities to be included in static generation.
 * Start with larger cities for SEO authority building, then lower over time:
 * - Launch: 100,000+ (~300 cities)
 * - Month 2: 50,000+ (~700 cities)
 * - Month 3: 25,000+ (~1,500 cities)
 * - Month 4+: 0 (all cities)
 */
export const MIN_POPULATION_THRESHOLD = 100_000;

// ============================================
// State Code to Slug Mapping
// ============================================

const STATE_CODE_TO_SLUG: Record<string, string> = {
  AL: 'alabama',
  AK: 'alaska',
  AZ: 'arizona',
  AR: 'arkansas',
  CA: 'california',
  CO: 'colorado',
  CT: 'connecticut',
  DE: 'delaware',
  DC: 'district-of-columbia',
  FL: 'florida',
  GA: 'georgia',
  HI: 'hawaii',
  ID: 'idaho',
  IL: 'illinois',
  IN: 'indiana',
  IA: 'iowa',
  KS: 'kansas',
  KY: 'kentucky',
  LA: 'louisiana',
  ME: 'maine',
  MD: 'maryland',
  MA: 'massachusetts',
  MI: 'michigan',
  MN: 'minnesota',
  MS: 'mississippi',
  MO: 'missouri',
  MT: 'montana',
  NE: 'nebraska',
  NV: 'nevada',
  NH: 'new-hampshire',
  NJ: 'new-jersey',
  NM: 'new-mexico',
  NY: 'new-york',
  NC: 'north-carolina',
  ND: 'north-dakota',
  OH: 'ohio',
  OK: 'oklahoma',
  OR: 'oregon',
  PA: 'pennsylvania',
  RI: 'rhode-island',
  SC: 'south-carolina',
  SD: 'south-dakota',
  TN: 'tennessee',
  TX: 'texas',
  UT: 'utah',
  VT: 'vermont',
  VA: 'virginia',
  WA: 'washington',
  WV: 'west-virginia',
  WI: 'wisconsin',
  WY: 'wyoming',
  // Territories
  AS: 'american-samoa',
  GU: 'guam',
  MP: 'northern-mariana-islands',
  PR: 'puerto-rico',
  VI: 'virgin-islands',
};

const SLUG_TO_STATE_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODE_TO_SLUG).map(([code, slug]) => [slug, code])
);

// ============================================
// State Data Cache
// ============================================

const stateCache = new Map<string, StateData>();

// ============================================
// Helper Functions
// ============================================

/**
 * Convert state code to URL slug
 */
export function stateCodeToSlug(code: string): string {
  return STATE_CODE_TO_SLUG[code.toUpperCase()] || code.toLowerCase();
}

/**
 * Convert URL slug to state code
 */
export function slugToStateCode(slug: string): string {
  return SLUG_TO_STATE_CODE[slug] || slug.toUpperCase();
}

/**
 * Format city name (convert from UPPERCASE to Title Case)
 */
export function formatCityName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => {
      // Handle special cases
      if (word === 'of' || word === 'the' || word === 'and') {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// ============================================
// Primary Data Loaders
// ============================================

/**
 * Load state data by slug (e.g., "california") or state code (e.g., "CA")
 * Files are stored as lowercase state codes (e.g., ca.json)
 */
export async function getStateData(stateIdentifier: string): Promise<StateData | null> {
  // Normalize to lowercase state code for file loading
  let stateCode: string;

  if (stateIdentifier.length === 2) {
    // Already a state code
    stateCode = stateIdentifier.toLowerCase();
  } else {
    // It's a slug, convert to code
    const code = slugToStateCode(stateIdentifier);
    stateCode = code.toLowerCase();
  }

  // Check cache first
  if (stateCache.has(stateCode)) {
    return stateCache.get(stateCode)!;
  }

  try {
    // Dynamic import of state JSON file
    const data = await import(`@/data/states/${stateCode}.json`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData = data.default as any;

    // Transform populationServed to population for backwards compatibility
    const stateData: StateData = {
      ...rawData,
      cities: rawData.cities.map((city: Record<string, unknown>) => ({
        ...city,
        // Map populationServed to population if present
        population: city.populationServed ?? city.population ?? 0,
      })),
    };

    // Cache for future use
    stateCache.set(stateCode, stateData);

    return stateData;
  } catch (error) {
    console.error(`Failed to load state data for: ${stateCode}`, error);
    return null;
  }
}

/**
 * Get city data by state slug and city slug
 * Returns city data with state information added
 */
export async function getCityData(
  stateSlug: string,
  citySlug: string
): Promise<CityDataWithState | null> {
  const stateData = await getStateData(stateSlug);

  if (!stateData) {
    return null;
  }

  const city = stateData.cities.find((c) => c.slug === citySlug);

  if (city) {
    // Add state info to city data
    return {
      ...city,
      state: stateData.stateName,
      stateCode: stateData.stateCode,
      stateSlug: stateCodeToSlug(stateData.stateCode),
    };
  }

  return null;
}

// ============================================
// Metadata Loaders
// ============================================

let statesMetadataCache: StatesMetadataFile | null = null;

/**
 * Load states metadata (for sitemap generation, navigation, etc.)
 */
export async function getStatesMetadata(): Promise<StatesMetadataFile> {
  if (statesMetadataCache) {
    return statesMetadataCache;
  }

  try {
    const data = await import('@/data/metadata/states.json');
    statesMetadataCache = data.default as StatesMetadataFile;
    return statesMetadataCache;
  } catch (error) {
    console.error('Failed to load states metadata', error);
    // Return empty default if file doesn't exist yet
    return { states: [] };
  }
}

/**
 * Get all state slugs for static generation
 */
export async function getAllStateSlugs(): Promise<string[]> {
  const metadata = await getStatesMetadata();
  return metadata.states.map((s) => s.slug);
}

/**
 * Get state metadata by slug
 */
export async function getStateMetadata(slug: string): Promise<StateMetadata | null> {
  const metadata = await getStatesMetadata();
  return metadata.states.find((s) => s.slug === slug) || null;
}

let epaStandardsCache: EPAStandardsFile | null = null;

/**
 * Load EPA standards reference data
 */
export async function getEPAStandards(): Promise<EPAStandardsFile> {
  if (epaStandardsCache) {
    return epaStandardsCache;
  }

  try {
    const data = await import('@/data/metadata/epa-standards.json');
    epaStandardsCache = data.default as EPAStandardsFile;
    return epaStandardsCache;
  } catch (error) {
    console.error('Failed to load EPA standards', error);
    return { standards: [], lastUpdated: '' };
  }
}

// ============================================
// Aggregation Functions
// ============================================

/**
 * Get all cities across all states
 * Used for sitemap generation and search indexing
 * @param applyPopulationFilter - If true, filters by MIN_POPULATION_THRESHOLD (default: true)
 */
export async function getAllCities(applyPopulationFilter: boolean = true): Promise<CityDataWithState[]> {
  const metadata = await getStatesMetadata();
  const allCities: CityDataWithState[] = [];

  for (const state of metadata.states) {
    const stateData = await getStateData(state.slug);
    if (stateData) {
      const citiesWithState = stateData.cities
        .filter((city) => !applyPopulationFilter || city.population >= MIN_POPULATION_THRESHOLD)
        .map((city) => ({
          ...city,
          state: stateData.stateName,
          stateCode: stateData.stateCode,
          stateSlug: state.slug,
        }));
      allCities.push(...citiesWithState);
    }
  }

  return allCities;
}

/**
 * Get nearby cities for internal linking
 * Returns cities from the same state, sorted by population
 */
export async function getNearbyCities(
  city: CityDataWithState,
  limit: number = 6
): Promise<CityDataWithState[]> {
  const stateData = await getStateData(city.stateSlug);
  if (!stateData) {
    return [];
  }

  // Filter out current city and sort by population
  return stateData.cities
    .filter((c) => c.slug !== city.slug)
    .sort((a, b) => b.population - a.population)
    .slice(0, limit)
    .map((c) => ({
      ...c,
      state: stateData.stateName,
      stateCode: stateData.stateCode,
      stateSlug: city.stateSlug,
    }));
}

/**
 * Get popular cities for homepage display
 * Returns top N cities by population across all states
 */
export async function getPopularCities(limit: number = 20): Promise<CityDataWithState[]> {
  const allCities = await getAllCities();

  // Sort by population first
  const sorted = allCities.sort((a, b) => b.population - a.population);

  // Deduplicate by state+slug combination, keeping the one with highest population
  const seenCities = new Map<string, CityDataWithState>();
  for (const city of sorted) {
    const key = `${city.stateSlug}:${city.slug}`;
    if (!seenCities.has(key)) {
      seenCities.set(key, city);
    }
  }

  // Convert back to array and take top N
  return Array.from(seenCities.values()).slice(0, limit);
}

/**
 * State with city count for homepage display
 */
export interface StateWithCityCount {
  name: string;
  slug: string;
  abbreviation: string;
  cityCount: number;
}

/**
 * Get states with city counts for homepage
 * Sorted by city count descending
 */
export async function getStatesWithCityCounts(): Promise<StateWithCityCount[]> {
  const metadata = await getStatesMetadata();
  const statesWithCounts: StateWithCityCount[] = [];

  for (const state of metadata.states) {
    const stateData = await getStateData(state.slug);
    if (stateData) {
      const cityCount = stateData.cities.filter(
        (city) => city.population >= MIN_POPULATION_THRESHOLD
      ).length;

      if (cityCount > 0) {
        statesWithCounts.push({
          name: state.name,
          slug: state.slug,
          abbreviation: state.abbreviation,
          cityCount,
        });
      }
    }
  }

  return statesWithCounts.sort((a, b) => b.cityCount - a.cityCount);
}

/**
 * Get cities with the worst water quality
 * Ranked by violations, health-based violations weighted higher
 */
export async function getWorstCities(limit: number = 12): Promise<CityDataWithState[]> {
  const allCities = await getAllCities();

  // Score cities based on water quality issues
  const scoredCities = allCities.map((city) => {
    let score = 0;

    // Violations are the primary factor
    score += city.violations3yr.total * 10;
    score += city.violations3yr.healthBased * 25; // Health-based weighted more

    // Lead issues add to score
    if (city.leadAndCopper?.leadStatus === 'exceeded') {
      score += 50;
    } else if (city.leadAndCopper?.leadStatus === 'warning') {
      score += 20;
    }

    return { city, score };
  });

  // Sort by score descending and filter out cities with no issues
  const sorted = scoredCities
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Deduplicate by state+slug combination, keeping the one with highest score
  const seenCities = new Map<string, CityDataWithState>();
  for (const item of sorted) {
    const key = `${item.city.stateSlug}:${item.city.slug}`;
    if (!seenCities.has(key)) {
      seenCities.set(key, item.city);
    }
  }

  // Convert back to array and take top N
  return Array.from(seenCities.values()).slice(0, limit);
}

// ============================================
// Static Params Generators (for Next.js SSG)
// ============================================

/**
 * Generate static params for all state pages
 */
export async function generateStateParams(): Promise<Array<{ state: string }>> {
  const metadata = await getStatesMetadata();
  return metadata.states.map((state) => ({ state: state.slug }));
}

/**
 * Generate static params for all city pages
 * Filters by MIN_POPULATION_THRESHOLD for staged rollout
 * Also includes cities from municipal data even if not in WQP data
 */
export async function generateCityParams(): Promise<
  Array<{ state: string; city: string }>
> {
  const metadata = await getStatesMetadata();
  const params: Array<{ state: string; city: string }> = [];
  const cityKeys = new Set<string>();

  // Add cities from WQP data
  for (const state of metadata.states) {
    const stateData = await getStateData(state.slug);
    if (stateData) {
      for (const city of stateData.cities) {
        // Filter by population threshold for staged rollout
        if (city.population >= MIN_POPULATION_THRESHOLD) {
          const key = `${state.slug}:${city.slug}`;
          cityKeys.add(key);
          params.push({
            state: state.slug,
            city: city.slug,
          });
        }
      }
    }
  }

  // Add cities from municipal data (even if not in WQP)
  try {
    // Dynamic import to avoid circular dependency
    const { getMunicipalCities } = await import('./municipal-loader');
    const municipalCities = getMunicipalCities();

    for (const municipalCity of municipalCities) {
      const stateSlug = stateCodeToSlug(municipalCity.state);
      const citySlug = municipalCity.slug || municipalCity.city.toLowerCase().replace(/\s+/g, '-');
      const key = `${stateSlug}:${citySlug}`;

      // Only add if not already in params
      if (!cityKeys.has(key)) {
        cityKeys.add(key);
        params.push({
          state: stateSlug,
          city: citySlug,
        });
      }
    }
  } catch (error) {
    console.error('Error loading municipal cities for static params:', error);
  }

  return params;
}
