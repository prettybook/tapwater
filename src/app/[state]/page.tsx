import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStateData, generateStateParams, MIN_POPULATION_THRESHOLD } from '@/lib/data/loader';
import { formatCityName, formatPopulation } from '@/lib/data/helpers';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

interface StatePageProps {
  params: Promise<{
    state: string;
  }>;
}

const CURRENT_YEAR = new Date().getFullYear();
const SITE_URL = 'https://tapwater.org';

// Generate static params for all states
export async function generateStaticParams() {
  return generateStateParams();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = await getStateData(stateSlug);

  if (!stateData) {
    return {};
  }

  const cityCount = stateData.cities.filter(
    (c) => c.population >= MIN_POPULATION_THRESHOLD
  ).length;

  const title = `${stateData.stateName} Tap Water Quality by City - ${CURRENT_YEAR}`;
  const description = `Compare tap water quality across ${cityCount} cities in ${stateData.stateName}. Check hardness, lead levels, and EPA violations for your city.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${stateSlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${stateSlug}`,
    },
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;
  const stateData = await getStateData(stateSlug);

  if (!stateData) {
    notFound();
  }

  // Filter cities by population threshold and sort by population
  const filteredCities = stateData.cities.filter(
    (c) => c.population >= MIN_POPULATION_THRESHOLD
  );
  const sortedCities = [...filteredCities].sort(
    (a, b) => b.population - a.population
  );
  // Show more cities for smaller states, limit for larger states
  const displayCities = sortedCities.slice(0, Math.min(sortedCities.length, 48));

  // Breadcrumb data for schema
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: stateData.stateName, url: `/${stateSlug}` },
  ];

  return (
    <article>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="pt-6 pb-4 border-b border-white/10" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white/70">{stateData.stateName}</li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              {stateData.stateName} Water Quality
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Tap water quality data for {filteredCities.length} cities and their water systems
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          CITIES
          ======================================== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-900 mb-2">
              {filteredCities.length === displayCities.length
                ? `All ${filteredCities.length} Cities`
                : `${displayCities.length} of ${filteredCities.length} Cities`}
            </h2>
            <p className="text-brand-900/60">
              Sorted by population served
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${stateSlug}/${city.slug}`}
                className="group block p-5 bg-gray-50 rounded-md hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-brand-900 group-hover:text-brand-600 transition-colors">
                      {formatCityName(city.name)}
                    </h3>
                    <p className="text-sm text-brand-900/50">
                      Utility serves {formatPopulation(city.population)}
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
                  {city.hardness?.value && (
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
                            : 'text-danger'
                      }`}>
                        {city.leadAndCopper.leadStatus === 'good'
                          ? 'Below limit'
                          : city.leadAndCopper.leadStatus === 'warning'
                            ? 'Near limit'
                            : 'Above limit'}
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

          {/* Back to States */}
          <div className="mt-12 text-center">
            <Link
              href="/#states"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View all states
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
