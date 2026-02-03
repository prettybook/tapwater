import Link from 'next/link';
import Image from 'next/image';

interface TestKitCTAProps {
  cityName: string;
}

export function TestKitCTA({ cityName }: TestKitCTAProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Content */}
        <div className="bg-brand-900 p-8 md:p-10 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Your pipes tell a different story
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-8">
            The data above shows what leaves the treatment plant—not what comes
            out of <em>your</em> faucet. Old pipes, lead solder, and building
            plumbing can add contaminants the city never tests for.
            {cityName ? ` Know exactly what's in your ${cityName} tap water.` : ''}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <a
              href="#" // TODO: Add affiliate link
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-900 font-semibold rounded-full hover:bg-brand-50 transition-colors"
            >
              Test Your Water
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <Link
              href="/best-water-test-kits"
              className="text-white/70 hover:text-white font-medium transition-colors"
            >
              See top-rated kits →
            </Link>
          </div>

          {/* Trust element */}
          <p className="text-sm text-white/40 leading-relaxed">
            Home test kits detect lead, bacteria, pesticides, and 100+ other
            contaminants. Results in 5-10 business days from certified labs.
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative h-64 lg:h-auto min-h-[280px] bg-gray-100">
          <Image
            src="/tap-water-splash.jpg"
            alt="Water splashing from a kitchen faucet"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
