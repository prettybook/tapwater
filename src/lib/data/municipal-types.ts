/**
 * Municipal water data types for verified tap water from Consumer Confidence Reports
 */

export interface WaterQualitySource {
  type: 'municipal' | 'wqp';
  verified: boolean;
  dataYear: string;
  sourceName?: string;
  sourceUrl?: string;
}

export interface MunicipalHardness {
  value: number;
  range?: [number, number];
  unit: string;
  classification: 'Soft' | 'Moderate' | 'Hard' | 'Very Hard';
  sampleCount?: number;
  reportYear: string;
  source: string;
  sourceUrl?: string;
}

export interface Contaminant {
  name: string;
  value: number;
  unit: string;
  mcl?: number;
  actionLevel?: number;
  phg?: number;
  mclg?: number;
  mrdl?: number;
  exceedsMCL: boolean;
  percentile?: number;
  range?: [number, number];
  note?: string;
}

export interface MunicipalCity {
  city: string;
  state: string;
  slug: string;
  utilityName: string;
  pwsid: string;
  hardness: MunicipalHardness;
  contaminants: Contaminant[];
  populationServed: number;
}

export interface MunicipalData {
  cities: MunicipalCity[];
  lastUpdated: string;
  version: string;
}

export interface EnhancedHardness {
  value: number | null;
  range?: [number, number];
  unit: string;
  classification: string | null;
  sampleCount?: number | null;
  isNeighborEstimate?: boolean;
}

export interface WaterQualityData {
  source: WaterQualitySource;
  city: string;
  state: string;
  hardness: EnhancedHardness | null;
  contaminants: Contaminant[];
  utilityName?: string;
  pwsid?: string;
  populationServed?: number;
}
