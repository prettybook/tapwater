import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCityData,
  getNearbyCities,
  generateCityParams,
} from '@/lib/data/loader';
import {
  formatCityName,
  formatPopulation,
  getWaterSafetyAssessment,
  generateFeaturedSnippet,
  getFilterRecommendation,
  getHardnessDescription,
  ppmToGpg,
  generateCityFAQs,
  getStateAverageHardness,
  US_AVERAGE_HARDNESS_PPM,
} from '@/lib/data/helpers';
import {
  FAQAccordion,
  WaterQualityGauge,
  TestKitCTA,
  HardnessImpact,
  HardnessComparison,
  LeadScale,
  LeadInfo,
  ViolationsTable,
  SectionNav,
  MiniBarChart,
  DataSourceBadge,
  EnhancedHardnessCard,
  ContaminantsTable,
} from '@/components/city';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { getWaterQuality } from '@/lib/data/municipal-loader';

interface CityPageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

const CURRENT_YEAR = new Date().getFullYear();
const SITE_URL = 'https://tapwater.org';

// Navigation items for the sidebar
const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'hardness', label: 'Water Hardness' },
  { id: 'lead', label: 'Lead & Contaminants' },
  { id: 'provider', label: 'Water Provider' },
  { id: 'faq', label: 'FAQ' },
];

// Generate static params for all cities
export async function generateStaticParams() {
  return generateCityParams();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { state, city: citySlug } = await params;
  const city = await getCityData(state, citySlug);

  if (!city) {
    return {};
  }

  const displayName = formatCityName(city.name);
  const safety = getWaterSafetyAssessment(city);

  const title = `${displayName} Tap Water Quality: Safety, Hardness & Lead - ${CURRENT_YEAR}`;

  const safetyText =
    safety.verdict === 'safe'
      ? 'is safe'
      : safety.verdict === 'generally-safe'
        ? 'is generally safe'
        : 'has some concerns';
  const hardnessText = city.hardness?.value
    ? `${city.hardness.value} ppm (${city.hardness.classification})`
    : 'N/A';
  const description = `Is ${displayName} tap water safe? It ${safetyText}. Hardness: ${hardnessText}. Check lead levels, violations & filter recommendations.`;

  return {
    title,
    description,
    keywords: [
      `${displayName} tap water`,
      `${displayName} water quality`,
      `${displayName} water hardness`,
      `is ${displayName} water safe`,
      `${displayName} water lead`,
      `${displayName} ${city.state} water`,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${city.stateSlug}/${city.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${city.stateSlug}/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { state, city: citySlug } = await params;

  // Try to get municipal data first, fallback to WQP data
  const waterQualityData = await getWaterQuality(state, citySlug);
  const city = await getCityData(state, citySlug);

  if (!city) {
    notFound();
  }

  const nearbyCities = await getNearbyCities(city, 6);
  const displayName = formatCityName(city.name);
  const safety = getWaterSafetyAssessment(city);
  const featuredSnippet = generateFeaturedSnippet(city);
  const filterRecommendation = getFilterRecommendation(city);
  const faqItems = generateCityFAQs(city);
  const stateAverage = getStateAverageHardness(city.stateSlug);
  const hardnessGpg = city.hardness?.value ? ppmToGpg(city.hardness.value) : undefined;

  // Check if we have municipal data
  const hasMunicipalData = waterQualityData?.source.type === 'municipal';

  // Suppress unused variable warning
  void filterRecommendation;

  // Breadcrumb data for schema
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: city.state, url: `/${city.stateSlug}` },
    { name: displayName, url: `/${city.stateSlug}/${city.slug}` },
  ];

  return (
    <article>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="bg-brand-900 text-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="pt-6 pb-4 border-b border-white/10" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link
                  href={`/${city.stateSlug}`}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {city.state}
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white/70">{displayName}</li>
            </ol>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Title and Summary */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                {displayName} Drinking Water Quality
              </h1>
              <p className="text-xl md:text-2xl text-white/60 italic mb-6">
                What&apos;s Really in Your Tap Water?
              </p>
              <p className="text-white/70 leading-relaxed max-w-2xl">
                {featuredSnippet}
              </p>
            </div>

            {/* Right: Animated Gauge */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <WaterQualityGauge
                verdict={safety.verdict}
                cityName={displayName}
                hardnessGpg={hardnessGpg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          DATA SOURCE BADGE
          ======================================== */}
      {waterQualityData && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DataSourceBadge source={waterQualityData.source} />
          </div>
        </section>
      )}

      {/* ========================================
          FACT CARDS ROW
          ======================================== */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Card */}
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">Lead</h3>
              {city.leadAndCopper?.lead90thPercentile !== null &&
              city.leadAndCopper?.lead90thPercentile !== undefined ? (
                <>
                  <p className="text-sm text-brand-900/60 mb-4">
                    {city.leadAndCopper.leadStatus === 'exceeded'
                      ? 'Exceeds EPA action level'
                      : city.leadAndCopper.leadStatus === 'warning'
                        ? 'Approaching EPA limit'
                        : 'Below EPA action level'}
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-4xl font-bold ${
                      city.leadAndCopper.leadStatus === 'exceeded'
                        ? 'text-danger'
                        : city.leadAndCopper.leadStatus === 'warning'
                          ? 'text-warning'
                          : 'text-safe'
                    }`}>
                      {city.leadAndCopper.lead90thPercentile}
                    </span>
                    <span className="text-lg text-brand-900/50">
                      {city.leadAndCopper.leadUnit}
                    </span>
                  </div>
                  <div className="mt-4">
                    <MiniBarChart
                      value={city.leadAndCopper.lead90thPercentile}
                      max={city.leadAndCopper.leadActionLevel * 1.5}
                      threshold={city.leadAndCopper.leadActionLevel}
                      color={
                        city.leadAndCopper.leadStatus === 'exceeded'
                          ? 'danger'
                          : city.leadAndCopper.leadStatus === 'warning'
                            ? 'warning'
                            : 'safe'
                      }
                    />
                  </div>
                  <p className="text-xs text-brand-900/50 mt-4 pt-4 border-t border-gray-100">
                    EPA action level: {city.leadAndCopper.leadActionLevel} {city.leadAndCopper.leadUnit}
                  </p>
                </>
              ) : (
                <p className="text-brand-900/60 text-sm">Lead data not available</p>
              )}
            </div>

            {/* Hardness Card */}
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">Hardness</h3>
              {city.hardness?.value ? (
                <>
                  <p className="text-sm text-brand-900/60 mb-4">
                    {city.hardness.classification} water
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-4xl font-bold ${
                      city.hardness.classification === 'Soft'
                        ? 'text-safe'
                        : city.hardness.classification === 'Moderately Hard'
                          ? 'text-info'
                          : city.hardness.classification === 'Hard'
                            ? 'text-warning'
                            : 'text-danger'
                    }`}>
                      {city.hardness.value}
                    </span>
                    <span className="text-lg text-brand-900/50">ppm</span>
                  </div>
                  <div className="mt-4">
                    <MiniBarChart
                      value={city.hardness.value}
                      max={Math.max(city.hardness.value * 1.2, 300)}
                      threshold={180}
                      showThreshold={false}
                      color={
                        city.hardness.classification === 'Soft'
                          ? 'safe'
                          : city.hardness.classification === 'Moderately Hard'
                            ? 'info'
                            : city.hardness.classification === 'Hard'
                              ? 'warning'
                              : 'danger'
                      }
                    />
                    <div className="flex justify-between text-[10px] text-brand-900/40 mt-1">
                      <span>0</span>
                      <span>{US_AVERAGE_HARDNESS_PPM}</span>
                      <span>{Math.max(Math.round(city.hardness.value * 1.2), 300)}+</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-900/50 mt-4 pt-4 border-t border-gray-100">
                    US Average: {US_AVERAGE_HARDNESS_PPM} ppm
                  </p>
                </>
              ) : (
                <p className="text-brand-900/60 text-sm">Hardness data not available</p>
              )}
            </div>

            {/* Violations Card */}
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">Violations</h3>
              <p className="text-sm text-brand-900/60 mb-4">Past 3 years</p>
              <p className={`text-4xl font-bold mb-2 ${
                (city.violations3yr?.healthBased ?? 0) > 0
                  ? 'text-danger'
                  : (city.violations3yr?.total ?? 0) > 0
                    ? 'text-warning'
                    : 'text-safe'
              }`}>
                {city.violations3yr?.total ?? 0}
                <span className="text-lg font-normal text-brand-900/50 ml-1">total</span>
              </p>
              {city.violations3yr && city.violations3yr.healthBased > 0 ? (
                <p className="text-sm text-danger">
                  {city.violations3yr.healthBased} health-based
                </p>
              ) : city.violations3yr && city.violations3yr.total > 0 ? (
                <p className="text-sm text-brand-900/50">
                  All administrative/monitoring
                </p>
              ) : (
                <p className="text-sm text-safe">Clean record</p>
              )}
              {city.epaUrl && (
                <a
                  href={city.epaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 text-sm font-medium hover:text-brand-700 mt-4 pt-4 border-t border-gray-100 block"
                >
                  View EPA report →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CONTAMINANTS TABLE (Municipal Data Only)
          ======================================== */}
      {hasMunicipalData && waterQualityData && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ContaminantsTable contaminants={waterQualityData.contaminants} />
          </div>
        </section>
      )}

      {/* ========================================
          MAIN CONTENT WITH SIDEBAR
          ======================================== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Sidebar Navigation */}
            <aside className="hidden lg:block lg:col-span-1">
              <SectionNav items={NAV_ITEMS} title="Explore This Utility" />
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-16">
              {/* ========================================
                  OVERVIEW SECTION
                  ======================================== */}
              <section id="overview">
                <h2 className="text-2xl font-bold text-brand-900 mb-6">
                  Is {displayName} Tap Water Safe to Drink?
                </h2>

                <div className={`border-l-4 pl-5 py-1 mb-6 ${
                  safety.verdict === 'safe'
                    ? 'border-safe'
                    : safety.verdict === 'generally-safe'
                      ? 'border-info'
                      : safety.verdict === 'concerns'
                        ? 'border-warning'
                        : 'border-danger'
                }`}>
                  <p className="text-lg text-brand-900 leading-relaxed">
                    {safety.summary}
                  </p>
                  {safety.details && safety.details.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {safety.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-sm text-brand-900/60">
                          <span className="mr-2 text-brand-900/30">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p className="text-brand-900/70 leading-relaxed">
                  The data below shows test results from {city.waterSystemCount || 1} water
                  {(city.waterSystemCount || 1) > 1 ? ' utilities' : ' utility'} serving{' '}
                  {formatPopulation(city.population)} people in the {displayName} area.
                  Water quality testing is conducted regularly and reported to the EPA.
                </p>
              </section>

              {/* ========================================
                  HARDNESS SECTION
                  ======================================== */}
              <section id="hardness" className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-brand-900 mb-6">
                  How Hard is {displayName} Water?
                </h2>

                {city.hardness?.value && city.hardness?.classification ? (
                  <div className="space-y-8">
                    {/* Hardness Visual Scale */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-brand-900/50">Soft</span>
                        <span className="text-sm text-brand-900/50">Very Hard</span>
                      </div>
                      <div className="relative h-4 bg-gradient-to-r from-safe via-info via-warning to-danger rounded-full">
                        <div
                          className="absolute top-1/2 -translate-y-1/2 z-10"
                          style={{
                            left: `${Math.min((city.hardness.value / 300) * 100, 100)}%`,
                          }}
                        >
                          <div className="relative -translate-x-1/2">
                            <div className="w-6 h-6 rounded-full border-4 border-white shadow-lg bg-brand-900" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-brand-900/40 font-mono">
                        <span>0</span>
                        <span>60</span>
                        <span>120</span>
                        <span>180</span>
                        <span>300+</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-md p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-4xl font-bold text-brand-900">
                            {city.hardness.value}{' '}
                            <span className="text-lg font-normal text-brand-900/50">ppm</span>
                          </p>
                          <p className="text-sm text-brand-900/50 mt-1">
                            {ppmToGpg(city.hardness.value)} grains per gallon
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          city.hardness.classification === 'Soft'
                            ? 'bg-safe-light text-safe-text'
                            : city.hardness.classification === 'Moderately Hard'
                              ? 'bg-info-light text-info-text'
                              : city.hardness.classification === 'Hard'
                                ? 'bg-warning-light text-warning-text'
                                : 'bg-danger-light text-danger-text'
                        }`}>
                          {city.hardness.classification}
                        </span>
                      </div>
                      <p className="text-brand-900/70 leading-relaxed">
                        {getHardnessDescription(city.hardness.classification)}
                      </p>
                      {city.hardness.isNeighborEstimate && (
                        <p className="text-xs text-brand-900/50 mt-3 pt-3 border-t border-gray-200 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Estimated from {city.hardness.neighborCount || 'nearby'} neighboring {city.hardness.neighborCount === 1 ? 'county' : 'counties'}. Actual values may vary.
                        </p>
                      )}
                    </div>

                    {/* Impact & Comparison Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Impact */}
                      <div>
                        <h3 className="text-sm font-semibold text-brand-900 mb-4">
                          Impact on Your Home
                        </h3>
                        <HardnessImpact classification={city.hardness.classification} />
                      </div>

                      {/* Comparison */}
                      <div>
                        <h3 className="text-sm font-semibold text-brand-900 mb-4">
                          Regional Comparison
                        </h3>
                        <div className="bg-gray-50 rounded-md p-5">
                          <HardnessComparison
                            cityName={displayName}
                            cityValue={city.hardness.value}
                            stateValue={stateAverage}
                            stateName={city.state}
                            usAverage={US_AVERAGE_HARDNESS_PPM}
                          />
                          <p className="text-xs text-brand-900/40 mt-4 pt-3 border-t border-gray-200">
                            Values in ppm (mg/L as CaCO₃)
                          </p>
                        </div>
                      </div>
                    </div>

                    {city.hardness.sampleCount && (
                      <p className="text-sm text-brand-900/50">
                        Based on {city.hardness.sampleCount} water samples
                        {city.hardness.county && ` from ${city.hardness.county} County`}.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-md p-8 text-center">
                    <p className="text-brand-900/70">
                      Water hardness data is not currently available for {displayName}.
                    </p>
                    <p className="text-sm text-brand-900/50 mt-2">
                      Contact your local water utility for this information.
                    </p>
                  </div>
                )}
              </section>

              {/* ========================================
                  TEST KIT CTA
                  ======================================== */}
              <TestKitCTA cityName={displayName} />

              {/* ========================================
                  LEAD & CONTAMINANTS SECTION
                  ======================================== */}
              <section id="lead" className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-brand-900 mb-2">
                  Lead & Contaminants
                </h2>
                <p className="text-brand-900/60 mb-8">
                  Understanding lead levels and water quality violations in {displayName}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Lead Test Results */}
                  <div>
                    <h3 className="text-sm font-semibold text-brand-900 mb-4">
                      Lead Test Results
                    </h3>
                    {city.leadAndCopper?.lead90thPercentile !== null &&
                    city.leadAndCopper?.lead90thPercentile !== undefined ? (
                      <>
                        <LeadScale
                          value={city.leadAndCopper.lead90thPercentile}
                          actionLevel={city.leadAndCopper.leadActionLevel}
                          unit={city.leadAndCopper.leadUnit}
                          cityName={displayName}
                        />
                        {city.leadAndCopper?.lastSampleDate && (
                          <p className="mt-4 text-xs text-brand-900/40">
                            Last sampled: {city.leadAndCopper.lastSampleDate}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="bg-gray-50 rounded-md p-6">
                        <p className="text-brand-900/70 text-sm">
                          Lead testing data is currently unavailable for {displayName}.
                          Contact your local water utility for the most recent test results.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: About Lead */}
                  <div>
                    <h3 className="text-sm font-semibold text-brand-900 mb-4">
                      About Lead in Drinking Water
                    </h3>
                    <LeadInfo />
                  </div>
                </div>

                {/* Violations Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-brand-900 mb-4">
                    EPA Compliance History
                  </h3>
                  <ViolationsTable
                    violations={city.violations3yr}
                    hasActiveViolations={city.hasActiveViolations}
                    cityName={displayName}
                    epaUrl={city.epaUrl}
                  />
                </div>
              </section>

              {/* ========================================
                  WATER PROVIDER SECTION
                  ======================================== */}
              <section id="provider" className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-brand-900 mb-6">
                  Who Provides {displayName}&apos;s Water?
                </h2>

                <div className="bg-gray-50 rounded-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-brand-900/50 mb-1">Utility Name</p>
                        <p className="font-semibold text-brand-900">{city.utilityName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-brand-900/50 mb-1">EPA System ID (PWSID)</p>
                        <p className="font-mono text-brand-900">{city.pwsid}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {city.primarySource && (
                        <div>
                          <p className="text-sm text-brand-900/50 mb-1">Primary Water Source</p>
                          <p className="text-brand-900">{city.primarySource}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-brand-900/50 mb-1">Population Served</p>
                        <p className="text-brand-900">{formatPopulation(city.population)}</p>
                      </div>
                    </div>
                  </div>
                  {city.epaUrl && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <a
                        href={city.epaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
                      >
                        View Full EPA Report
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* ========================================
                  FAQ SECTION
                  ======================================== */}
              <section id="faq" className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-brand-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-brand-900/60 mb-6">
                  Common questions about {displayName} tap water quality
                </p>
                <FAQAccordion items={faqItems} cityName={displayName} />
              </section>

              {/* ========================================
                  NEARBY CITIES
                  ======================================== */}
              {nearbyCities.length > 0 && (
                <section className="pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900 mb-6">
                    Nearby Cities in {city.state}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {nearbyCities.map((nearbyCity) => (
                      <Link
                        key={nearbyCity.slug}
                        href={`/${nearbyCity.stateSlug}/${nearbyCity.slug}`}
                        className="p-4 bg-gray-50 rounded-md hover:bg-brand-50 transition-colors"
                      >
                        <p className="font-medium text-brand-900">
                          {formatCityName(nearbyCity.name)}
                        </p>
                        {nearbyCity.hardness?.classification && (
                          <p className="text-sm text-brand-900/50 mt-1">
                            {nearbyCity.hardness.classification} water
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/${city.stateSlug}`}
                    className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm mt-6"
                  >
                    View all {city.state} cities
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </section>
              )}

              {/* ========================================
                  DISCLAIMER
                  ======================================== */}
              <section className="pt-8 mt-8 border-t border-gray-200">
                <p className="text-sm text-brand-900/50 leading-relaxed">
                  This data is for informational purposes only. Water quality can vary by
                  neighborhood and building. For official reports, contact your local water
                  utility or the EPA.{' '}
                  <Link
                    href="/data-sources"
                    className="text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    Learn about our methodology
                  </Link>
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>
    </article>
  );
}
