import fs from 'fs';
import path from 'path';
import type {
  MunicipalData,
  MunicipalCity,
  WaterQualityData,
  WaterQualitySource,
  EnhancedHardness,
} from './municipal-types';
import { getCityData } from './loader';
import type { CityData } from './types';

const MUNICIPAL_DATA_PATH = path.join(
  process.cwd(),
  'public/data/municipal/cities.json'
);

let municipalDataCache: MunicipalData | null = null;

/**
 * Load municipal water data from JSON file
 */
function loadMunicipalData(): MunicipalData | null {
  if (municipalDataCache) {
    return municipalDataCache;
  }

  try {
    if (!fs.existsSync(MUNICIPAL_DATA_PATH)) {
      console.log('Municipal data file not found, using WQP fallback only');
      return null;
    }

    const fileContent = fs.readFileSync(MUNICIPAL_DATA_PATH, 'utf-8');
    municipalDataCache = JSON.parse(fileContent);
    console.log(`Loaded ${municipalDataCache?.cities.length || 0} municipal cities`);
    return municipalDataCache;
  } catch (error) {
    console.error('Error loading municipal data:', error);
    return null;
  }
}

/**
 * Find municipal data for a city
 */
function findMunicipalCity(
  state: string,
  citySlug: string
): MunicipalCity | null {
  const municipalData = loadMunicipalData();
  if (!municipalData) {
    return null;
  }

  const stateAbbr = state.toUpperCase();
  const municipal = municipalData.cities.find(
    (c) =>
      c.state === stateAbbr &&
      (c.slug === citySlug || c.city.toLowerCase().replace(/\s+/g, '-') === citySlug)
  );

  return municipal || null;
}

/**
 * Convert WQP city data to enhanced format
 */
function wqpToEnhancedFormat(
  cityData: CityData,
  state: string
): WaterQualityData {
  const hardness: EnhancedHardness | null = cityData.hardness
    ? {
        value: cityData.hardness.value,
        unit: cityData.hardness.unit,
        classification: cityData.hardness.classification || 'Unknown',
        sampleCount: cityData.hardness.sampleCount,
        isNeighborEstimate: cityData.hardness.isNeighborEstimate,
      }
    : null;

  return {
    source: {
      type: 'wqp',
      verified: false,
      dataYear: 'Various',
      sourceName: 'EPA Water Quality Portal',
    },
    city: cityData.name,
    state: state.toUpperCase(),
    hardness,
    contaminants: [],
    utilityName: cityData.utilityName,
    pwsid: cityData.pwsid,
    populationServed: cityData.population,
  };
}

/**
 * Convert municipal city data to enhanced format
 */
function municipalToEnhancedFormat(
  municipal: MunicipalCity
): WaterQualityData {
  const hardness: EnhancedHardness = {
    value: municipal.hardness.value,
    range: municipal.hardness.range,
    unit: municipal.hardness.unit,
    classification: municipal.hardness.classification,
    sampleCount: municipal.hardness.sampleCount,
    isNeighborEstimate: false,
  };

  const source: WaterQualitySource = {
    type: 'municipal',
    verified: true,
    dataYear: municipal.hardness.reportYear,
    sourceName: municipal.hardness.source,
    sourceUrl: municipal.hardness.sourceUrl,
  };

  return {
    source,
    city: municipal.city,
    state: municipal.state,
    hardness,
    contaminants: municipal.contaminants,
    utilityName: municipal.utilityName,
    pwsid: municipal.pwsid,
    populationServed: municipal.populationServed,
  };
}

/**
 * Get water quality data with municipal priority and WQP fallback
 *
 * Priority:
 * 1. Try municipal data first (verified tap water from CCRs)
 * 2. Fall back to WQP data (environmental samples)
 *
 * @param state - State slug (e.g., 'california')
 * @param citySlug - City slug (e.g., 'san-francisco')
 * @returns Water quality data with source information
 */
export async function getWaterQuality(
  state: string,
  citySlug: string
): Promise<WaterQualityData | null> {
  // 1. Try municipal data first
  const municipal = findMunicipalCity(state, citySlug);

  if (municipal) {
    console.log(`Using municipal data for ${municipal.city}, ${municipal.state}`);
    return municipalToEnhancedFormat(municipal);
  }

  // 2. Fall back to WQP data
  try {
    const cityData = await getCityData(state, citySlug);
    if (cityData) {
      console.log(`Using WQP fallback for ${cityData.name}, ${state}`);
      return wqpToEnhancedFormat(cityData, state);
    }
  } catch (error) {
    console.error(`Error loading WQP data for ${citySlug}, ${state}:`, error);
  }

  return null;
}

/**
 * Check if a city has municipal data available
 */
export function hasMunicipalData(state: string, citySlug: string): boolean {
  return findMunicipalCity(state, citySlug) !== null;
}

/**
 * Get all cities with municipal data
 */
export function getMunicipalCities(): MunicipalCity[] {
  const data = loadMunicipalData();
  return data?.cities || [];
}
