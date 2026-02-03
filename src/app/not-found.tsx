import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <p className="text-brand-600 text-sm font-mono uppercase tracking-wider mb-4">
          Error 404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-brand-900/60 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
          Try searching for a city or browse by state.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn btn-primary inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/#states"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            Browse by State
          </Link>
        </div>
      </div>
    </div>
  );
}
