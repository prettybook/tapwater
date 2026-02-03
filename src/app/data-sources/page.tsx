import { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://tapwater.org';

export const metadata: Metadata = {
  title: 'Data Sources & Methodology - Tapwater.org',
  description: 'Learn where our water quality data comes from. We use official EPA SDWIS data, USGS water quality surveys, and state compliance reports.',
  openGraph: {
    title: 'Data Sources & Methodology - Tapwater.org',
    description: 'Learn where our water quality data comes from and how we process it.',
    url: `${SITE_URL}/data-sources`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/data-sources`,
  },
};

export default function DataSourcesPage() {
  return (
    <article>
      {/* Hero Section */}
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
              <li className="text-white/70">Data Sources</li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Data Sources & Methodology
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Transparency about where our data comes from and how we process it
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Primary Sources */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-brand-900 mb-6">Primary Data Sources</h2>

            <div className="space-y-6">
              {/* EPA SDWIS */}
              <div className="p-6 border border-gray-200 rounded-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">EPA SDWIS Database</h3>
                    <p className="text-brand-900/60 mb-4">
                      The Safe Drinking Water Information System (SDWIS) is the EPA&apos;s official
                      database containing information about all public water systems in the United
                      States. This includes violation data, enforcement actions, and compliance monitoring.
                    </p>
                    <a
                      href="https://www.epa.gov/enviro/sdwis-search"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 inline-flex items-center"
                    >
                      Visit EPA SDWIS
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* EPA Lead & Copper */}
              <div className="p-6 border border-gray-200 rounded-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">Lead & Copper Rule Data</h3>
                    <p className="text-brand-900/60 mb-4">
                      Lead and copper sampling results are collected under the EPA&apos;s Lead and Copper
                      Rule (LCR). Water systems are required to monitor lead and copper levels at
                      customer taps and report 90th percentile values.
                    </p>
                    <a
                      href="https://www.epa.gov/dwreginfo/lead-and-copper-rule"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 inline-flex items-center"
                    >
                      Learn about the Lead & Copper Rule
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* USGS */}
              <div className="p-6 border border-gray-200 rounded-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">USGS Water Quality Data</h3>
                    <p className="text-brand-900/60 mb-4">
                      The U.S. Geological Survey provides comprehensive water quality data including
                      hardness measurements. USGS conducts ongoing water quality assessments across
                      the nation.
                    </p>
                    <a
                      href="https://www.usgs.gov/mission-areas/water-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 inline-flex items-center"
                    >
                      Visit USGS Water Resources
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-brand-900 mb-6">Our Methodology</h2>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">Data Collection</h3>
              <p className="text-brand-900/70 mb-6">
                We aggregate data from multiple official sources and match it to cities based on
                the water systems that serve each area. When multiple water systems serve a city,
                we use population-weighted averages to provide representative values.
              </p>

              <h3 className="text-lg font-semibold text-brand-900 mb-3">Violation Classification</h3>
              <p className="text-brand-900/70 mb-6">
                EPA violations are categorized as either health-based or administrative. Health-based
                violations indicate exceedances of Maximum Contaminant Levels (MCLs), while
                administrative violations relate to monitoring, reporting, or other procedural requirements.
              </p>

              <h3 className="text-lg font-semibold text-brand-900 mb-3">Water Hardness Classification</h3>
              <p className="text-brand-900/70 mb-4">
                We use the standard USGS water hardness scale:
              </p>
              <div className="not-prose mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-safe-light rounded-md">
                    <p className="font-medium text-safe-text">Soft</p>
                    <p className="text-sm text-brand-900/60">0–60 ppm</p>
                  </div>
                  <div className="p-3 bg-info-light rounded-md">
                    <p className="font-medium text-info-text">Moderately Hard</p>
                    <p className="text-sm text-brand-900/60">61–120 ppm</p>
                  </div>
                  <div className="p-3 bg-warning-light rounded-md">
                    <p className="font-medium text-warning-text">Hard</p>
                    <p className="text-sm text-brand-900/60">121–180 ppm</p>
                  </div>
                  <div className="p-3 bg-danger-light rounded-md">
                    <p className="font-medium text-danger-text">Very Hard</p>
                    <p className="text-sm text-brand-900/60">&gt;180 ppm</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-brand-900 mb-3">Lead & Copper Thresholds</h3>
              <p className="text-brand-900/70 mb-6">
                We compare reported 90th percentile values against EPA action levels:
                15 ppb (parts per billion) for lead and 1.3 ppm for copper. Values approaching
                or exceeding these thresholds are flagged accordingly.
              </p>

              <h3 className="text-lg font-semibold text-brand-900 mb-3">Update Frequency</h3>
              <p className="text-brand-900/70 mb-6">
                Our database is updated periodically as new data becomes available from the EPA
                and state agencies. Violation data is typically updated quarterly, while water
                quality sampling results may be updated less frequently depending on the
                monitoring schedule for each water system.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-6 bg-gray-50 rounded-md border-l-4 border-brand-600">
            <h3 className="font-semibold text-brand-900 mb-3">Important Disclaimer</h3>
            <p className="text-brand-900/60 text-sm leading-relaxed mb-4">
              The information provided on Tapwater.org is for general informational purposes only.
              While we strive to keep our data accurate and up-to-date, we make no representations
              or warranties of any kind, express or implied, about the completeness, accuracy,
              reliability, or suitability of the information.
            </p>
            <p className="text-brand-900/60 text-sm leading-relaxed mb-4">
              Water quality can vary significantly within a city depending on the specific water
              system, distribution network, and even the plumbing in individual buildings. For the
              most accurate information about your specific water supply, we recommend:
            </p>
            <ul className="text-brand-900/60 text-sm space-y-2 mb-4 ml-4 list-disc">
              <li>Contacting your local water utility</li>
              <li>Reviewing your annual Consumer Confidence Report (CCR)</li>
              <li>Testing your own tap water with a certified laboratory</li>
            </ul>
            <p className="text-brand-900/60 text-sm leading-relaxed">
              This website does not provide medical advice. If you have concerns about your water
              quality and health, please consult with a healthcare professional.
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
