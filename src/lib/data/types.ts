/**
 * TypeScript interfaces for tapwater.org water quality data
 * Data sourced from EPA SDWIS and USGS Water Quality Portal
 *
 * These types match the actual JSON data structure from the data pipeline
 */

// ============================================
// Violation Summary (simplified from EPA data)
// ============================================

export interface ViolationSummary {
  total: number;
  healthBased: number;
}

// ============================================
// Lead and Copper Data
// ============================================

export type LeadStatus = 'good' | 'warning' | 'exceeded' | null;
export type CopperStatus = 'good' | 'warning' | 'exceeded' | null;

export interface LeadAndCopper {
  lead90thPercentile: number | null;
  leadUnit: string;                    // "ppb"
  leadActionLevel: number;             // 15.0 ppb
  leadStatus: LeadStatus;
  copper90thPercentile: number | null;
  copperUnit: string;                  // "ppm"
  copperActionLevel: number;           // 1.3 ppm
  copperStatus: CopperStatus;
  samplePeriod: string | null;         // e.g., "2023-H2"
  lastSampleDate: string | null;       // e.g., "2023-12-31"
}

// ============================================
// Water Hardness Data
// ============================================

export type HardnessClassification = 'Soft' | 'Moderately Hard' | 'Hard' | 'Very Hard';

export interface HardnessData {
  value: number | null;            // ppm (mg/L as CaCO3)
  unit: string;                    // "ppm"
  classification: HardnessClassification | null;
  county: string | null;           // County where data was measured
  sampleCount: number | null;
  isNeighborEstimate?: boolean;    // True if estimated from neighboring counties
  neighborCount?: number;          // Number of neighbors used for estimate
}

// ============================================
// City Data (Main Entity)
// ============================================

export interface CityData {
  // Identification
  slug: string;                     // URL slug: "los-angeles"
  name: string;                     // Display name: "LOS ANGELES" (may be uppercase)

  // Location
  county: string | null;

  // Demographics
  population: number;
  waterSystemCount: number;

  // Water System Info
  primarySource: string | null;     // "Surface Water", "Ground Water", etc.
  pwsid: string;                    // Primary Water System ID
  utilityName: string;              // e.g., "LOS ANGELES-CITY, DEPT. OF WATER & POWER"
  epaUrl: string | null;            // Link to EPA ECHO report
  allUtilities: string[] | null;    // If multiple utilities serve the city

  // Violations
  violations3yr: ViolationSummary;
  hasActiveViolations: boolean;

  // Lead and Copper (can be null if no data available)
  leadAndCopper: LeadAndCopper | null;

  // Hardness (can be null if no data available)
  hardness: HardnessData | null;
}

// ============================================
// State Data (Container for cities)
// ============================================

export interface StateData {
  stateCode: string;                // "CA"
  stateName: string;                // "California"
  lastUpdated: string;              // ISO date string
  cities: CityData[];
}

// ============================================
// Metadata Types
// ============================================

export interface StateMetadata {
  name: string;
  slug: string;
  abbreviation: string;
}

export interface StatesMetadataFile {
  states: StateMetadata[];
}

export interface EPAStandard {
  contaminantCode: string;
  contaminantName: string;
  mcl: number;              // Maximum Contaminant Level
  mclg: number;             // MCL Goal
  unit: string;
  healthEffects: string;
  category: string;
}

export interface EPAStandardsFile {
  standards: EPAStandard[];
  lastUpdated: string;
}

// ============================================
// Safety Assessment Types
// ============================================

export type SafetyVerdict = 'safe' | 'generally-safe' | 'concerns' | 'unsafe';

export interface SafetyAssessment {
  verdict: SafetyVerdict;
  summary: string;
  details?: string[];
}

// ============================================
// Search Types
// ============================================

export interface CitySearchResult {
  name: string;
  state: string;
  stateSlug: string;
  stateCode: string;
  slug: string;
  population: number;
}

// ============================================
// Extended City Data (with state info added)
// ============================================

export interface CityDataWithState extends CityData {
  state: string;           // Full state name: "California"
  stateCode: string;       // "CA"
  stateSlug: string;       // "california"
}
