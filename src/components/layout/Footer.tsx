import Link from 'next/link';
import Image from 'next/image';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image
                src="/tap-logo-white.svg"
                alt="TapWater.org"
                width={140}
                height={14}
              />
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-md">
              Free tap water quality reports for US cities based on EPA SDWIS
              data and USGS water quality measurements. Understand your local
              water quality including hardness, lead levels, and violation history.
            </p>
          </div>

          {/* Popular States */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-100 mb-4">
              Popular States
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/california" className="text-white/60 hover:text-white transition-colors">
                  California
                </Link>
              </li>
              <li>
                <Link href="/texas" className="text-white/60 hover:text-white transition-colors">
                  Texas
                </Link>
              </li>
              <li>
                <Link href="/florida" className="text-white/60 hover:text-white transition-colors">
                  Florida
                </Link>
              </li>
              <li>
                <Link href="/new-york" className="text-white/60 hover:text-white transition-colors">
                  New York
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-100 mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.epa.gov/dwstandardsregulations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  EPA Standards
                </a>
              </li>
              <li>
                <a
                  href="https://echo.epa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  EPA ECHO Database
                </a>
              </li>
              <li>
                <a
                  href="https://www.usgs.gov/mission-areas/water-resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  USGS Water Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/imprint" className="text-sm text-white/40 hover:text-white transition-colors">
              Imprint
            </Link>
          </div>
          <p className="text-sm text-white/40 text-center">
            {CURRENT_YEAR} TapWater.org &middot; Data sourced from EPA SDWIS and USGS
          </p>
          <p className="mt-4 text-xs text-white/30 text-center max-w-3xl mx-auto leading-relaxed">
            This information is for educational purposes only and should not replace
            official water quality reports from your local utility. Water quality can
            vary by neighborhood and over time. For the most current information,
            contact your local water provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
