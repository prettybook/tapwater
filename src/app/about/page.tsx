import { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://tapwater.org';

export const metadata: Metadata = {
  title: 'About Us - Tapwater.org',
  description: 'Learn about our mission to make water quality data accessible to everyone. We provide free EPA water quality reports for every US city.',
  openGraph: {
    title: 'About Us - Tapwater.org',
    description: 'Learn about our mission to make water quality data accessible to everyone.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
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
              <li className="text-white/70">About Us</li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              About Tapwater.org
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Making water quality data accessible to everyone
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-brand-900 mb-6">Our Mission</h2>
            <p className="text-brand-900/70 leading-relaxed mb-6">
              We believe every American has the right to know what&apos;s in their tap water.
              The EPA collects detailed water quality data from every public water system in the
              country, but this information is often buried in technical databases that are
              difficult for regular people to access and understand.
            </p>
            <p className="text-brand-900/70 leading-relaxed mb-6">
              Tapwater.org was created to change that. We take official EPA data and present it
              in a clear, easy-to-understand format. Whether you&apos;re concerned about lead levels,
              water hardness, or EPA violations in your area, we make it simple to find the
              information you need.
            </p>

            <h2 className="text-2xl font-bold text-brand-900 mb-6 mt-12">What We Provide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
              <div className="p-6 bg-gray-50 rounded-md">
                <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-900 mb-2">Water Hardness Data</h3>
                <p className="text-sm text-brand-900/60">
                  Find out if your water is soft, moderately hard, hard, or very hard, and what that means for your home.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-900 mb-2">Lead & Copper Levels</h3>
                <p className="text-sm text-brand-900/60">
                  See how your city&apos;s lead and copper levels compare to EPA action levels.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-900 mb-2">EPA Violations</h3>
                <p className="text-sm text-brand-900/60">
                  Track recent EPA violations and compliance history for water systems in your area.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <div className="w-10 h-10 bg-brand-100 rounded-md flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-900 mb-2">Filter Recommendations</h3>
                <p className="text-sm text-brand-900/60">
                  Get personalized recommendations for water filtration based on your local water quality.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-900 mb-6 mt-12">Our Commitment</h2>
            <p className="text-brand-900/70 leading-relaxed mb-6">
              We are committed to providing accurate, up-to-date information. All data on our site
              comes directly from official EPA sources and is updated regularly. We do not
              editorialize or make health claims—we simply present the data and let you draw
              your own conclusions.
            </p>
            <p className="text-brand-900/70 leading-relaxed mb-6">
              Our service is free and always will be. We believe access to water quality
              information should not be behind a paywall.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gray-50 rounded-md">
            <h3 className="text-xl font-bold text-brand-900 mb-4">
              Want to learn more about our data?
            </h3>
            <p className="text-brand-900/60 mb-6">
              Read about our data sources, collection methods, and how we process EPA information.
            </p>
            <Link
              href="/data-sources"
              className="btn btn-primary inline-flex items-center"
            >
              View Data Sources
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
