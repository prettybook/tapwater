import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPopularCities, getWorstCities, getAllCities, getStatesWithCityCounts } from '@/lib/data/loader';
import { formatCityName, formatPopulation } from '@/lib/data/helpers';
import { getAllBlogPosts } from '@/lib/blog/loader';
import { HeroSearch } from '@/components/home/HeroSearch';
import { WorstCitiesSlider } from '@/components/home/WorstCitiesSlider';
import { PopularCitiesSlider } from '@/components/home/PopularCitiesSlider';

const SITE_URL = 'https://tapwater.org';

export const metadata: Metadata = {
  title: 'TapWater.org - Free US Tap Water Quality Reports by City',
  description: 'Is your tap water safe? Free water quality reports for every US city. Check hardness, lead levels, and EPA violations based on official government data from SDWIS.',
  keywords: [
    'tap water quality',
    'drinking water safety',
    'water hardness',
    'lead in water',
    'EPA violations',
    'water quality report',
    'SDWIS',
    'safe drinking water',
  ],
  openGraph: {
    title: 'TapWater.org - Free US Tap Water Quality Reports by City',
    description: 'Is your tap water safe? Check hardness, lead levels, and EPA violations for every US city based on official government data.',
    url: SITE_URL,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.jpg` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TapWater.org - Free US Tap Water Quality Reports',
    description: 'Check tap water quality, hardness, lead levels, and EPA violations for your city.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function HomePage() {
  const popularCities = await getPopularCities(12);
  const statesWithCounts = await getStatesWithCityCounts();
  const worstCities = await getWorstCities(12);
  const allCities = await getAllCities();
  const blogPosts = await getAllBlogPosts();

  // Top 5 cities for hero pills
  const topCities = popularCities.slice(0, 5);

  // Prepare all cities data for search (simplified for client, sorted by population)
  const searchCities = allCities
    .sort((a, b) => b.population - a.population)
    .map((city) => ({
      name: city.name,
      slug: city.slug,
      state: city.state,
      stateSlug: city.stateSlug,
      population: city.population,
    }));

  return (
    <>
      {/* Hero Section with Animated Space-Earth Gradient */}
      <section className="relative text-white overflow-hidden z-20">
        {/* Base dark gradient - even darker */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              #000000 0%,
              #000005 25%,
              #020617 45%,
              #071228 65%,
              #0c1a36 80%,
              #1e3a5f 95%,
              #2563eb 100%
            )`
          }}
        />

        {/* Animated color wave overlay - subtler */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(
              120deg,
              transparent 0%,
              rgba(15, 30, 80, 0.5) 25%,
              rgba(30, 58, 138, 0.35) 50%,
              rgba(15, 30, 80, 0.5) 75%,
              transparent 100%
            )`,
            backgroundSize: '300% 100%',
            animation: 'gradient-wave 8s ease-in-out infinite'
          }}
        />

        {/* Second wave layer - opposite direction */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(
              -60deg,
              transparent 0%,
              rgba(30, 58, 138, 0.2) 30%,
              rgba(37, 99, 235, 0.15) 50%,
              rgba(30, 58, 138, 0.2) 70%,
              transparent 100%
            )`,
            backgroundSize: '300% 100%',
            animation: 'gradient-wave-reverse 12s ease-in-out infinite'
          }}
        />

        {/* Floating glow orbs - darker */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(30, 58, 138, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float-orb 10s ease-in-out infinite'
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            top: '40%',
            right: '0%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float-orb 14s ease-in-out infinite reverse'
          }}
        />
        <div
          className="absolute w-[600px] h-[300px] rounded-full"
          style={{
            bottom: '5%',
            left: '20%',
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-brand-200 text-sm font-mono uppercase tracking-wider mb-4">
              Free Water Quality Reports
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Is Your Tap Water
              <span className="block text-brand-200">Safe to Drink?</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Check hardness, lead levels, and EPA violations for every US city.
              Based on official government data.
            </p>

            {/* Search Field */}
            <HeroSearch cities={searchCities} />

            {/* Top Cities Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {topCities.map((city) => (
                <Link
                  key={`${city.stateSlug}-${city.slug}`}
                  href={`/${city.stateSlug}/${city.slug}`}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/80 hover:text-white transition-colors"
                >
                  {formatCityName(city.name)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Compact */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-brand-900 text-sm">EPA SDWIS Data</p>
                <p className="text-xs text-brand-900/50">Official federal source</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-brand-900 text-sm">Updated Regularly</p>
                <p className="text-xs text-brand-900/50">Latest compliance data</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-brand-900 text-sm">Verified Standards</p>
                <p className="text-xs text-brand-900/50">Compared to EPA MCLs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900">
              Tap Water Quality in Popular Cities
            </h2>
          </div>

          {/* Mobile: Slider */}
          <div className="md:hidden">
            <PopularCitiesSlider cities={popularCities} />
          </div>

          {/* Desktop: Grid (3 rows x 4 cols = 12) */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <Link
                key={`${city.stateSlug}-${city.slug}`}
                href={`/${city.stateSlug}/${city.slug}`}
                className="group block p-5 bg-white border border-gray-200 rounded-md hover:bg-brand-50 hover:border-brand-400 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-brand-900 group-hover:text-brand-600 transition-colors">
                      {formatCityName(city.name)}
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
        </div>
      </section>

      {/* Cities with Water Quality Concerns */}
      {worstCities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-danger text-sm font-mono uppercase tracking-wider mb-2">
                Worth Monitoring
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-900">
                Cities with Water Quality Concerns
              </h2>
              <p className="text-brand-900/60 mt-2">
                These cities have recent EPA violations or elevated contaminant levels
              </p>
            </div>
            <WorstCitiesSlider cities={worstCities} />
          </div>
        </section>
      )}

      {/* About Us Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative h-[400px] lg:h-[480px] rounded-md overflow-hidden">
              <Image
                src="/tap-about-us-image.jpg"
                alt="Water quality research and data analysis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-brand-600 text-sm font-mono uppercase tracking-wider mb-4">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">
                Making Water Data Accessible
              </h2>
              <p className="text-lg text-brand-900/70 mb-6 leading-relaxed">
                We believe everyone deserves to know what&apos;s in their tap water. Our mission
                is to make EPA water quality data easy to understand and accessible to all
                Americans, helping you make informed decisions about your drinking water.
              </p>
              <p className="text-brand-900/60 mb-10 leading-relaxed">
                All data comes from official EPA sources including the Safe Drinking Water
                Information System (SDWIS). We update our database regularly to ensure you
                have access to the most current information available.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="btn btn-primary inline-flex items-center"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/data-sources"
                  className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline inline-flex items-center"
                >
                  View Data Sources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest from the Blog */}
      {blogPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-brand-600 text-sm font-mono uppercase tracking-wider mb-2">
                  Resources
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-900">
                  Latest from the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all articles
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-gray-200 rounded-md overflow-hidden hover:border-brand-400 hover:bg-brand-50 transition-colors"
                  >
                    {/* Image */}
                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-50">
                          <svg
                            className="w-10 h-10 text-brand-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Category & Date */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
                          {post.category}
                        </span>
                        <span className="text-xs text-brand-900/40">{formattedDate}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-brand-900/60 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile: View all link */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all articles
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Browse by State */}
      <section id="states" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900">
              Browse by State
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {statesWithCounts.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
                className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md hover:border-brand-400 hover:bg-brand-50 transition-colors"
              >
                <span className="font-medium text-brand-900 group-hover:text-brand-600 transition-colors">
                  {state.name}
                </span>
                <span className="text-sm text-brand-900/40">
                  {state.cityCount} {state.cityCount === 1 ? 'city' : 'cities'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
