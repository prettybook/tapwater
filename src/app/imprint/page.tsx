import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Legal information and imprint for TapWater.org',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ImprintPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-brand-900/50 hover:text-brand-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-brand-900/30">/</li>
              <li className="text-brand-900/70">Imprint</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-12">
          Imprint
        </h1>

        <div className="prose prose-lg max-w-none">
          <h2>Company Information</h2>
          <p>
            comnect UG (haftungsbeschränkt)<br />
            Immanuelkirchstraße 14a<br />
            10405 Berlin<br />
            Germany
          </p>

          <h2>Legal Information</h2>
          <p>
            <strong>Registered at:</strong> Amtsgericht Berlin Charlottenburg<br />
            <strong>Commercial Register Number:</strong> HRB 231194 B
          </p>

          <h2>Management</h2>
          <p>
            <strong>Managing Director:</strong> Max Baumgarten
          </p>

          <h2>Contact</h2>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@tapwater.org">info@tapwater.org</a>
          </p>

          <h2>Copyright Notice</h2>
          <p>
            All content on this website, including text, data compilations, and
            design elements, is the property of comnect UG (haftungsbeschränkt)
            unless otherwise noted. Water quality data is sourced from public
            government databases (EPA SDWIS, USGS) and is used in accordance
            with applicable data usage policies.
          </p>

          <h2>Disclaimer for Third-Party Content</h2>
          <p>
            Despite careful content review, we assume no liability for the
            content of external links or third-party sources. The respective
            operators and data providers are responsible for the accuracy of
            external content.
          </p>

          <h2>Data Sources</h2>
          <p>
            Water quality data is sourced from:
          </p>
          <ul>
            <li>EPA Safe Drinking Water Information System (SDWIS)</li>
            <li>U.S. Geological Survey (USGS) Water Quality Data</li>
            <li>State and local water utility reports</li>
          </ul>
          <p>
            We strive to keep data current but cannot guarantee real-time accuracy.
            For the most current information, contact your local water utility.
          </p>

          <h2>Legal Notice</h2>
          <p>
            This imprint complies with German law (§ 5 TMG, § 55 RStV). Despite
            potential international operations, comnect UG (haftungsbeschränkt)
            remains a company incorporated under German law, subject to German
            jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
