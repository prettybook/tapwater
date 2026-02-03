import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for TapWater.org - how we handle your data',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
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
              <li className="text-brand-900/70">Privacy Policy</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-brand-900/60 mb-12">
          Last updated: February 1, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            comnect UG (haftungsbeschränkt) (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates
            TapWater.org. This Privacy Policy explains how we collect, use, and
            protect your personal data when you visit our website.
          </p>

          <h2>2. Data Controller</h2>
          <p>
            <strong>comnect UG (haftungsbeschränkt)</strong><br />
            Immanuelkirchstraße 14a<br />
            10405 Berlin, Germany<br />
            Email: <a href="mailto:info@tapwater.org">info@tapwater.org</a>
          </p>

          <h2>3. Data We Collect</h2>

          <h3>3.1 Automatically Collected Data</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address (anonymized)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent</li>
            <li>Date and time of access</li>
          </ul>

          <h3>3.2 Data You Provide</h3>
          <p>
            We do not require registration or collect personal information such
            as names, email addresses, or phone numbers unless you voluntarily
            contact us.
          </p>

          <h2>4. How We Use Your Data</h2>
          <p>We use collected data to:</p>
          <ul>
            <li>Provide and improve our water quality information service</li>
            <li>Analyze website usage and performance</li>
            <li>Ensure website security and prevent abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>5. Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar technologies for:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling
            cookies may affect website functionality.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>We may use third-party services that collect data:</p>
          <ul>
            <li><strong>Hosting:</strong> Vercel (for website hosting)</li>
            <li><strong>Analytics:</strong> Privacy-focused analytics tools</li>
          </ul>
          <p>
            These services have their own privacy policies governing their use
            of your data.
          </p>

          <h2>7. Data Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal data to
            third parties, except:
          </p>
          <ul>
            <li>When required by law or legal process</li>
            <li>To protect our rights, property, or safety</li>
            <li>With service providers who assist our operations (under data processing agreements)</li>
          </ul>

          <h2>8. Data Retention</h2>
          <p>
            We retain automatically collected data for a maximum of 26 months.
            After this period, data is anonymized or deleted.
          </p>

          <h2>9. Your Rights (GDPR)</h2>
          <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data</li>
            <li><strong>Restriction:</strong> Request limited processing of your data</li>
            <li><strong>Portability:</strong> Request transfer of your data</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
          </ul>
          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:info@tapwater.org">info@tapwater.org</a>.
          </p>

          <h2>10. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data against unauthorized access, alteration,
            disclosure, or destruction. Our website uses HTTPS encryption for
            all data transmission.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Our website is hosted on servers that may be located outside the
            European Economic Area (EEA). We ensure appropriate safeguards are
            in place for any international data transfers.
          </p>

          <h2>12. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed at children under 16 years of age. We do
            not knowingly collect personal data from children.
          </p>

          <h2>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. We encourage you
            to review this policy periodically.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <p>
            <strong>comnect UG (haftungsbeschränkt)</strong><br />
            Immanuelkirchstraße 14a<br />
            10405 Berlin, Germany<br />
            Email: <a href="mailto:info@tapwater.org">info@tapwater.org</a>
          </p>

          <h2>15. Supervisory Authority</h2>
          <p>
            You have the right to lodge a complaint with a data protection
            supervisory authority. In Germany, you may contact:
          </p>
          <p>
            <strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br />
            Alt-Moabit 59-61<br />
            10555 Berlin, Germany
          </p>
        </div>
      </div>
    </div>
  );
}
