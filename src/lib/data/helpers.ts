/**
 * Helper functions for water quality data transformation and analysis
 */

import {
  CityData,
  CityDataWithState,
  HardnessClassification,
  SafetyAssessment,
  SafetyVerdict,
  LeadAndCopper,
} from './types';

// ============================================
// Constants
// ============================================

export const EPA_LEAD_ACTION_LEVEL_PPB = 15; // ppb (parts per billion)
export const HARDNESS_THRESHOLDS = {
  soft: 60, // < 60 ppm
  moderatelyHard: 120, // 60-120 ppm
  hard: 180, // 120-180 ppm
  // > 180 ppm = Very Hard
};

// ============================================
// Hardness Classification
// ============================================

/**
 * Classify water hardness based on ppm value
 * Based on USGS classification scale
 */
export function getHardnessClassification(ppm: number): HardnessClassification {
  if (ppm < HARDNESS_THRESHOLDS.soft) return 'Soft';
  if (ppm < HARDNESS_THRESHOLDS.moderatelyHard) return 'Moderately Hard';
  if (ppm < HARDNESS_THRESHOLDS.hard) return 'Hard';
  return 'Very Hard';
}

/**
 * Convert ppm to grains per gallon (gpg)
 * 1 gpg = 17.1 ppm
 */
export function ppmToGpg(ppm: number): number {
  return Math.round((ppm / 17.1) * 10) / 10;
}

/**
 * Get hardness description for display
 */
export function getHardnessDescription(
  classification: HardnessClassification | null
): string {
  if (!classification) return 'Hardness data is not available.';

  const descriptions: Record<HardnessClassification, string> = {
    Soft: 'Soft water requires no treatment and is gentle on skin and appliances.',
    'Moderately Hard':
      'Moderately hard water may cause slight mineral buildup over time.',
    Hard: 'Hard water can cause scale buildup in pipes and appliances. A water softener may be beneficial.',
    'Very Hard':
      'Very hard water causes significant mineral buildup. A water softener is recommended.',
  };
  return descriptions[classification];
}

// ============================================
// Lead Analysis
// ============================================

/**
 * Check if lead levels exceed EPA action level
 */
export function isLeadExceeded(leadAndCopper: LeadAndCopper | null): boolean {
  if (!leadAndCopper || leadAndCopper.lead90thPercentile === null) {
    return false;
  }
  return leadAndCopper.leadStatus === 'exceeded';
}

/**
 * Get lead status description
 */
export function getLeadDescription(leadAndCopper: LeadAndCopper | null): string {
  if (!leadAndCopper || leadAndCopper.lead90thPercentile === null) {
    return 'Lead testing data is currently unavailable for this water system.';
  }

  const level = leadAndCopper.lead90thPercentile;
  const unit = leadAndCopper.leadUnit;
  const actionLevel = leadAndCopper.leadActionLevel;

  if (leadAndCopper.leadStatus === 'exceeded') {
    return `Lead levels (${level} ${unit}) exceed the EPA action level of ${actionLevel} ${unit}. Consider using a NSF-certified lead filter.`;
  }

  if (leadAndCopper.leadStatus === 'warning') {
    return `Lead levels (${level} ${unit}) are approaching the EPA action level of ${actionLevel} ${unit}. Monitor regularly.`;
  }

  return `Lead levels (${level} ${unit}) are below the EPA action level of ${actionLevel} ${unit}.`;
}

// ============================================
// Safety Assessment
// ============================================

/**
 * Generate overall water safety assessment for a city
 *
 * Important considerations:
 * 1. We distinguish between health-based violations (actual water quality issues)
 *    and monitoring/reporting violations (administrative/paperwork issues).
 * 2. Cities with many water systems may have aggregated violations that look worse
 *    than they are. We normalize by water system count for fair comparison.
 * 3. Only health-based violations should significantly impact safety ratings.
 */
export function getWaterSafetyAssessment(
  city: CityData | CityDataWithState
): SafetyAssessment {
  const totalViolations = city.violations3yr?.total ?? 0;
  const healthViolations = city.violations3yr?.healthBased ?? 0;
  const monitoringViolations = totalViolations - healthViolations;
  const hasLeadIssues = city.leadAndCopper?.leadStatus === 'exceeded';

  // Normalize by water system count to avoid penalizing cities with many small systems
  const waterSystemCount = city.waterSystemCount ?? 1;
  const healthViolationsPerSystem = healthViolations / waterSystemCount;

  // Get display name (handle uppercase names)
  const displayName = formatCityName(city.name);

  // Determine verdict based primarily on health-based issues (normalized)
  let verdict: SafetyVerdict;
  let summary: string;
  const details: string[] = [];

  // SAFE with monitoring concerns: No health issues, but many administrative violations (20+)
  // Downgrade to "generally-safe" because frequent monitoring failures indicate operational issues
  if (healthViolations === 0 && !hasLeadIssues && monitoringViolations >= 20) {
    verdict = 'generally-safe';
    summary = `${displayName} tap water meets EPA health standards, but the water utility has administrative compliance issues.`;
    details.push('No health-based violations in the past 3 years.');
    if (city.leadAndCopper?.lead90thPercentile !== null && city.leadAndCopper?.lead90thPercentile !== undefined) {
      details.push('Lead levels are below the EPA action level.');
    }
    details.push(`${monitoringViolations} monitoring/reporting violations (administrative issues like missed testing deadlines or late reports).`);
    details.push('While not directly health-related, frequent administrative violations may indicate operational issues with the water utility.');
    details.push('We recommend testing your water at home for complete peace of mind.');
  }
  // SAFE: No health issues, lead is good, few or no monitoring violations
  else if (healthViolations === 0 && !hasLeadIssues) {
    verdict = 'safe';
    summary = `${displayName} tap water meets all EPA health standards and is safe to drink.`;
    details.push('No health-based violations in the past 3 years.');
    if (city.leadAndCopper?.lead90thPercentile !== null && city.leadAndCopper?.lead90thPercentile !== undefined) {
      details.push('Lead levels are below the EPA action level.');
    }
    // Note monitoring violations if present, but don't change verdict
    if (monitoringViolations > 0) {
      details.push(`${monitoringViolations} monitoring/reporting violation${monitoringViolations !== 1 ? 's' : ''} (administrative, not health-related).`);
    }
    // Add general recommendation for home testing
    details.push('For complete peace of mind, consider testing your home\'s water—contaminants can enter through your plumbing.');
  }
  // UNSAFE: Lead exceeds limits OR high rate of health violations per water system
  // Threshold: >5 violations per water system OR >10 total with >2 per system
  else if (hasLeadIssues || healthViolationsPerSystem > 5 || (healthViolations > 10 && healthViolationsPerSystem > 2)) {
    verdict = 'unsafe';
    summary = `${displayName} tap water has significant quality concerns that may require action.`;
    if (hasLeadIssues) {
      details.push('Lead levels exceed the EPA action level. Consider using a certified lead filter.');
    }
    if (healthViolations > 0) {
      details.push(
        `${healthViolations} health-based violation${healthViolations !== 1 ? 's' : ''} in the past 3 years${waterSystemCount > 1 ? ` across ${waterSystemCount} water systems` : ''}.`
      );
    }
    details.push('We strongly recommend testing your water at home and using a certified water filter.');
  }
  // CONCERNS: Moderate rate of health violations (1-5 per system, or 3+ total with <2 per system)
  else if (healthViolationsPerSystem >= 1 || healthViolations >= 3) {
    verdict = 'concerns';
    summary = `${displayName} tap water has some quality concerns but remains within acceptable limits.`;
    details.push(
      `${healthViolations} health-based violation${healthViolations !== 1 ? 's' : ''} in the past 3 years${waterSystemCount > 1 ? ` across ${waterSystemCount} water systems` : ''}.`
    );
    details.push('Consider testing your water at home and using a certified water filter for added safety.');
  }
  // GENERALLY SAFE: Low rate of health violations (<1 per system and <3 total)
  else if (healthViolations > 0) {
    verdict = 'generally-safe';
    summary = `${displayName} tap water is generally safe with minor compliance issues.`;
    details.push(`${healthViolations} health-based violation${healthViolations !== 1 ? 's' : ''} in the past 3 years${waterSystemCount > 1 ? ` across ${waterSystemCount} water systems` : ''}.`);
    if (monitoringViolations > 0) {
      details.push(`${monitoringViolations} monitoring/reporting violation${monitoringViolations !== 1 ? 's' : ''} (administrative).`);
    }
    details.push('Consider testing your water at home for complete peace of mind.');
  }
  // Fallback to safe (shouldn't reach here)
  else {
    verdict = 'safe';
    summary = `${displayName} tap water meets EPA health standards.`;
  }

  return { verdict, summary, details };
}

/**
 * Get safety verdict color for UI
 */
export function getSafetyColor(verdict: SafetyVerdict): string {
  const colors: Record<SafetyVerdict, string> = {
    safe: 'green',
    'generally-safe': 'blue',
    concerns: 'yellow',
    unsafe: 'red',
  };
  return colors[verdict];
}

// ============================================
// Formatting Helpers
// ============================================

/**
 * Format city name (convert from UPPERCASE to Title Case)
 */
export function formatCityName(name: string): string {
  // Handle names that are already in proper case
  if (name !== name.toUpperCase()) {
    return name;
  }

  return name
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Handle special cases
      if (index > 0 && (word === 'of' || word === 'the' || word === 'and')) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Format population number for display
 */
export function formatPopulation(population: number): string {
  if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(1)}M`;
  }
  if (population >= 1_000) {
    return `${Math.round(population / 1_000).toLocaleString()}K`;
  }
  return population.toLocaleString();
}

/**
 * Format date for display
 */
export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return 'N/A';
  try {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

/**
 * Format number with units
 */
export function formatWithUnit(
  value: number | null | undefined,
  unit: string
): string {
  if (value === null || value === undefined) return 'N/A';
  return `${value} ${unit}`;
}

// ============================================
// Featured Snippet Generation
// ============================================

/**
 * Generate featured snippet paragraph (40-60 words)
 * Optimized for Google's featured snippet format
 */
export function generateFeaturedSnippet(city: CityData | CityDataWithState): string {
  const displayName = formatCityName(city.name);
  const safety = getWaterSafetyAssessment(city);
  const totalViolations = city.violations3yr.total;
  const lead = city.leadAndCopper;

  // Opening statement based on safety
  let opening: string;
  if (safety.verdict === 'safe') {
    opening = `Good news for ${displayName} residents — your tap water meets all federal safety standards.`;
  } else if (safety.verdict === 'generally-safe') {
    opening = `${displayName} tap water is generally safe, though there are a few things worth knowing.`;
  } else if (safety.verdict === 'concerns') {
    opening = `${displayName} tap water has some quality concerns you should be aware of.`;
  } else {
    opening = `${displayName} tap water has notable issues that residents should consider.`;
  }

  // Hardness insight
  let hardnessInsight = '';
  if (city.hardness?.value && city.hardness.classification) {
    const gpg = ppmToGpg(city.hardness.value);
    if (city.hardness.classification === 'Very Hard') {
      hardnessInsight = ` At ${city.hardness.value} ppm (${gpg} gpg), the water is quite hard — you may notice mineral buildup on fixtures.`;
    } else if (city.hardness.classification === 'Hard') {
      hardnessInsight = ` With ${city.hardness.value} ppm hardness (${gpg} gpg), expect some mineral deposits over time.`;
    } else if (city.hardness.classification === 'Moderately Hard') {
      hardnessInsight = ` The water measures ${city.hardness.value} ppm (${gpg} gpg) — moderately hard, but manageable for most households.`;
    } else {
      hardnessInsight = ` At just ${city.hardness.value} ppm (${gpg} gpg), the water is pleasantly soft.`;
    }
  }

  // Lead summary
  let leadSummary = '';
  if (lead?.lead90thPercentile !== null && lead?.lead90thPercentile !== undefined) {
    if (lead.leadStatus === 'exceeded') {
      leadSummary = ' Lead levels exceed the EPA action level — a filter is recommended.';
    } else if (lead.leadStatus === 'warning') {
      leadSummary = ' Lead levels are approaching federal limits.';
    } else {
      leadSummary = ' Lead levels test well below the EPA action level.';
    }
  }

  // Violations context
  let violationsNote = '';
  if (totalViolations === 0) {
    violationsNote = ' No violations have been recorded in the past 3 years.';
  } else if (totalViolations <= 2) {
    violationsNote = ` Only ${totalViolations} minor violation${totalViolations > 1 ? 's' : ''} in the past 3 years.`;
  } else {
    violationsNote = ` There have been ${totalViolations} violations recorded over the past 3 years.`;
  }

  return opening + hardnessInsight + leadSummary + violationsNote;
}

// ============================================
// Filter Recommendations
// ============================================

/**
 * Generate filter recommendation based on water quality
 */
export function getFilterRecommendation(city: CityData | CityDataWithState): string {
  const displayName = formatCityName(city.name);
  const safety = getWaterSafetyAssessment(city);
  const isHardWater =
    city.hardness?.classification === 'Hard' ||
    city.hardness?.classification === 'Very Hard';
  const hasLeadConcerns = city.leadAndCopper?.leadStatus === 'exceeded';

  const parts: string[] = [];

  // Safety-based recommendation
  if (safety.verdict === 'safe') {
    parts.push(
      `${displayName} tap water meets all EPA standards and is safe to drink without filtration.`
    );
  } else if (hasLeadConcerns) {
    parts.push(
      `Due to elevated lead levels, a NSF-certified lead filter is recommended for ${displayName}.`
    );
  } else {
    // verdict is 'generally-safe', 'concerns', or 'unsafe'
    parts.push(
      `Based on recent water quality data, a water filter may be beneficial in ${displayName}.`
    );
  }

  // Hardness-based recommendation
  if (isHardWater && city.hardness?.value) {
    parts.push(
      `The water is ${city.hardness.classification?.toLowerCase()} (${city.hardness.value} ppm), so a water softener could reduce scale buildup in pipes and appliances.`
    );
  }

  return parts.join(' ');
}

// ============================================
// FAQ Generation
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ items for a city based on its water quality data
 */
export function generateCityFAQs(city: CityData | CityDataWithState): FAQItem[] {
  const displayName = formatCityName(city.name);
  const safety = getWaterSafetyAssessment(city);
  const faqs: FAQItem[] = [];

  // Q1: Is the water safe to drink?
  const safetyAnswer =
    safety.verdict === 'safe'
      ? `Yes, ${displayName} tap water is safe to drink. The water meets all EPA standards with no health-based violations in the past 3 years. Lead levels are below the EPA action level of 15 ppb.`
      : safety.verdict === 'generally-safe'
        ? `${displayName} tap water is generally safe to drink with minor compliance issues. While there may be some monitoring violations, there are no significant health-based concerns. The water meets EPA safety standards.`
        : safety.verdict === 'concerns'
          ? `${displayName} tap water has some quality concerns but remains within acceptable EPA limits. You may want to consider using a water filter, especially for drinking water. Check the detailed report for specific contaminant levels.`
          : `${displayName} tap water has significant quality issues. We recommend using filtered or bottled water for drinking until issues are resolved. Contact your local water utility for more information.`;

  faqs.push({
    question: `Is ${displayName} tap water safe to drink?`,
    answer: safetyAnswer,
  });

  // Q2: How hard is the water?
  if (city.hardness?.value) {
    const hardnessAnswer = `${displayName} has ${city.hardness.classification?.toLowerCase()} water with a hardness of ${city.hardness.value} ppm (${ppmToGpg(city.hardness.value)} grains per gallon). ${getHardnessDescription(city.hardness.classification)}`;
    faqs.push({
      question: `How hard is ${displayName} water?`,
      answer: hardnessAnswer,
    });
  }

  // Q3: Lead levels
  faqs.push({
    question: `Does ${displayName} water have lead?`,
    answer: getLeadDescription(city.leadAndCopper),
  });

  // Q4: Who provides the water?
  faqs.push({
    question: `Who provides ${displayName}'s tap water?`,
    answer: `${displayName}'s tap water is provided by ${city.utilityName}. The EPA system ID (PWSID) is ${city.pwsid}. ${city.primarySource ? `The primary water source is ${city.primarySource}.` : ''} You can find official water quality reports and contact information through your local utility.`,
  });

  // Q5: Do I need a water filter?
  faqs.push({
    question: `Do I need a water filter in ${displayName}?`,
    answer: getFilterRecommendation(city),
  });

  // Q6: Violations
  const violationAnswer =
    city.violations3yr.total === 0
      ? `${displayName}'s water utility has had no violations in the past 3 years, indicating excellent compliance with EPA drinking water regulations.`
      : `${displayName}'s water utility has had ${city.violations3yr.total} violation${city.violations3yr.total !== 1 ? 's' : ''} in the past 3 years. Of these, ${city.violations3yr.healthBased} ${city.violations3yr.healthBased === 1 ? 'was' : 'were'} health-based and ${city.violations3yr.total - city.violations3yr.healthBased} ${city.violations3yr.total - city.violations3yr.healthBased === 1 ? 'was' : 'were'} monitoring/reporting related.`;

  faqs.push({
    question: `What violations has ${displayName}'s water utility had?`,
    answer: violationAnswer,
  });

  // Q7: Chlorine taste (common search query)
  faqs.push({
    question: `Why does ${displayName} tap water taste like chlorine?`,
    answer: `${displayName}'s water utility uses chlorine or chloramine to disinfect the water supply. This is a safe and common practice required by the EPA. The taste is usually more noticeable in warm weather or near treatment facilities. To reduce chlorine taste, let water sit in an open pitcher for 30 minutes, use a refrigerator filter, or install a carbon filter on your tap.`,
  });

  // Q8: Water source (if available)
  if (city.primarySource) {
    faqs.push({
      question: `Where does ${displayName} get its water from?`,
      answer: `${displayName}'s tap water primarily comes from ${city.primarySource.toLowerCase()} sources. ${
        city.primarySource === 'Surface Water'
          ? 'Surface water is collected from rivers, lakes, and reservoirs, then treated before distribution.'
          : city.primarySource === 'Ground Water'
            ? 'Ground water is pumped from underground aquifers, which is naturally filtered through soil and rock.'
            : 'The water undergoes treatment at local facilities before being distributed through the municipal water system.'
      } The water is provided by ${city.utilityName}.`,
    });
  }

  return faqs;
}

// ============================================
// Stat Card Helpers
// ============================================

export interface StatCardData {
  label: string;
  value: string | number;
  status: 'good' | 'warning' | 'bad' | 'neutral';
  statusLabel: string;
  progress: number;
  context: string;
}

/**
 * Get stat card data for safety assessment
 */
export function getSafetyStatCard(city: CityData | CityDataWithState): StatCardData {
  const safety = getWaterSafetyAssessment(city);

  const statusMap: Record<SafetyVerdict, { status: StatCardData['status']; label: string; progress: number }> = {
    safe: { status: 'good', label: 'Meets EPA Standards', progress: 95 },
    'generally-safe': { status: 'good', label: 'Generally Safe', progress: 75 },
    concerns: { status: 'warning', label: 'Some Concerns', progress: 50 },
    unsafe: { status: 'bad', label: 'Issues Detected', progress: 25 },
  };

  const config = statusMap[safety.verdict] || { status: 'neutral' as const, label: 'Unknown', progress: 50 };

  return {
    label: 'Safety',
    value: config.label,
    status: config.status,
    statusLabel: config.label,
    progress: config.progress,
    context: safety.verdict === 'safe'
      ? 'No health violations'
      : `${city.violations3yr?.healthBased ?? 0} health-based violations (3yr)`,
  };
}

/**
 * Get stat card data for water hardness
 */
export function getHardnessStatCard(city: CityData | CityDataWithState): StatCardData {
  const hardness = city.hardness;

  if (!hardness?.value || !hardness.classification) {
    return {
      label: 'Hardness',
      value: 'N/A',
      status: 'neutral',
      statusLabel: 'No Data',
      progress: 0,
      context: 'Hardness data unavailable',
    };
  }

  // Map various classification names to status/progress
  const classificationMap: Record<string, { status: StatCardData['status']; progress: number }> = {
    'Soft': { status: 'good', progress: 25 },
    'Moderately Hard': { status: 'neutral', progress: 50 },
    'Moderate': { status: 'neutral', progress: 50 }, // Alias
    'Hard': { status: 'warning', progress: 75 },
    'Very Hard': { status: 'bad', progress: 95 },
  };

  const config = classificationMap[hardness.classification] ?? { status: 'neutral' as const, progress: 50 };

  return {
    label: 'Hardness',
    value: `${hardness.value} ppm`,
    status: config.status,
    statusLabel: hardness.classification,
    progress: config.progress,
    context: `${ppmToGpg(hardness.value)} grains per gallon`,
  };
}

/**
 * Get stat card data for lead levels
 */
export function getLeadStatCard(city: CityData | CityDataWithState): StatCardData {
  const lead = city.leadAndCopper;

  if (!lead || lead.lead90thPercentile === null) {
    return {
      label: 'Lead',
      value: 'N/A',
      status: 'neutral',
      statusLabel: 'No Data',
      progress: 0,
      context: 'Lead testing data unavailable',
    };
  }

  const level = lead.lead90thPercentile;
  const actionLevel = lead.leadActionLevel;
  const progress = Math.min((level / actionLevel) * 100, 100);

  let status: StatCardData['status'];
  let statusLabel: string;

  if (lead.leadStatus === 'exceeded') {
    status = 'bad';
    statusLabel = 'Exceeds EPA Limit';
  } else if (lead.leadStatus === 'warning') {
    status = 'warning';
    statusLabel = 'Near EPA Limit';
  } else {
    status = 'good';
    statusLabel = 'Below EPA Limit';
  }

  return {
    label: 'Lead',
    value: `${level} ${lead.leadUnit}`,
    status,
    statusLabel,
    progress,
    context: `EPA action level: ${actionLevel} ${lead.leadUnit}`,
  };
}

/**
 * Get stat card data for violations
 */
export function getViolationsStatCard(city: CityData | CityDataWithState): StatCardData {
  const total = city.violations3yr?.total ?? 0;
  const health = city.violations3yr?.healthBased ?? 0;
  const hasActive = city.hasActiveViolations ?? false;

  let status: StatCardData['status'];
  let statusLabel: string;
  let progress: number;

  if (total === 0) {
    status = 'good';
    statusLabel = 'Clean Record';
    progress = 0;
  } else if (hasActive || health > 2) {
    status = 'bad';
    statusLabel = hasActive ? 'Active Violations' : 'Multiple Health Issues';
    progress = 90;
  } else if (health > 0) {
    status = 'warning';
    statusLabel = 'Has Health Violations';
    progress = 60;
  } else {
    status = 'neutral';
    statusLabel = 'Monitoring Issues Only';
    progress = 30;
  }

  return {
    label: 'Violations',
    value: total,
    status,
    statusLabel,
    progress,
    context: `${health} health-based, ${total - health} monitoring (3yr)`,
  };
}

// ============================================
// Comparison Data Helpers
// ============================================

// US national average hardness (approximate)
export const US_AVERAGE_HARDNESS_PPM = 100;

// State average hardness (approximate values by state)
const STATE_AVERAGE_HARDNESS: Record<string, number> = {
  'california': 150,
  'texas': 170,
  'florida': 180,
  'new-york': 85,
  'illinois': 200,
  'pennsylvania': 140,
  'ohio': 220,
  'georgia': 65,
  'north-carolina': 45,
  'michigan': 190,
  'new-jersey': 110,
  'virginia': 95,
  'washington': 55,
  'arizona': 250,
  'massachusetts': 35,
  'tennessee': 120,
  'indiana': 280,
  'missouri': 195,
  'maryland': 130,
  'wisconsin': 280,
  'colorado': 105,
  'minnesota': 215,
  'south-carolina': 40,
  'alabama': 70,
  'louisiana': 90,
  'kentucky': 180,
  'oregon': 30,
  'oklahoma': 175,
  'connecticut': 50,
  'utah': 220,
  'iowa': 310,
  'nevada': 285,
  'arkansas': 45,
  'mississippi': 65,
  'kansas': 295,
  'new-mexico': 200,
  'nebraska': 245,
  'idaho': 180,
  'west-virginia': 160,
  'hawaii': 85,
  'new-hampshire': 25,
  'maine': 30,
  'montana': 165,
  'rhode-island': 45,
  'delaware': 125,
  'south-dakota': 280,
  'north-dakota': 310,
  'alaska': 60,
  'vermont': 35,
  'wyoming': 205,
};

/**
 * Get state average hardness
 */
export function getStateAverageHardness(stateSlug: string): number {
  return STATE_AVERAGE_HARDNESS[stateSlug] ?? US_AVERAGE_HARDNESS_PPM;
}

// ============================================
// URL Helpers
// ============================================

/**
 * Generate EPA ECHO URL for a water system
 */
export function getEpaEchoUrl(pwsid: string): string {
  return `https://echo.epa.gov/detailed-facility-report?fid=${pwsid}`;
}
