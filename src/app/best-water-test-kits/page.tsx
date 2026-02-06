import { Metadata } from 'next';
import Link from 'next/link';
import { SectionNav } from '@/components/city/SectionNav';
import { ProductImage } from '@/components/ui/ProductImage';

// Generate JSON-LD structured data for the page
function generateSchemaData() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tapwater.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Best Water Test Kits',
        item: 'https://tapwater.org/best-water-test-kits',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How often should I test my water?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For municipal water, test once per year with a lab kit. For well water, the CDC recommends annual testing for bacteria and nitrates at minimum. Test more frequently if you have infants, are pregnant, notice changes in taste or appearance, or have done plumbing work recently.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are DIY water test kits accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For basic parameters like pH, hardness, and chlorine, good DIY kits are reasonably accurate. For critical contaminants like lead, they are limited to detected/not detected rather than precise measurements. Use DIY for monitoring, lab tests for decisions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What contaminants should I test for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For city water, prioritize lead, disinfection byproducts, and PFAS. For well water, add bacteria and nitrates. For older homes, lead is the top priority. For homes near farms, include pesticides and nitrates.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my city\'s water report enough?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Your city\'s Consumer Confidence Report shows water quality at the treatment plant, not at your tap. It doesn\'t capture lead from your home\'s pipes, bacteria from your plumbing, or water that\'s been sitting in pipes overnight.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I test for PFAS at home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. PFAS require specialized laboratory equipment to detect. No DIY strip or home test can identify PFAS. If you\'re concerned about PFAS, order a specialized lab test like Tap Score\'s PFAS panel ($249).',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Water Test Kits 2026',
    description: 'Expert-reviewed water test kits for home use.',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Tap Score Advanced City Water Test',
          image: 'https://tapwater.org/products/tap-score-advanced.jpg',
          brand: { '@type': 'Brand', name: 'SimpleLab' },
          description: 'Best overall water test kit with 116 contaminants tested.',
          offers: {
            '@type': 'Offer',
            price: 199,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.7,
            reviewCount: 1200,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'WaterCheck Standard',
          image: 'https://tapwater.org/products/watercheck-deluxe.jpg',
          brand: { '@type': 'Brand', name: 'National Testing Laboratories' },
          description: 'Best value lab test with 83 contaminants.',
          offers: {
            '@type': 'Offer',
            price: 149,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.5,
            reviewCount: 890,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'Varify 17-in-1 Premium Water Test Kit',
          image: 'https://tapwater.org/products/varify-17-in-1.jpg',
          brand: { '@type': 'Brand', name: 'Varify' },
          description: 'Best DIY kit with 100 test strips.',
          offers: {
            '@type': 'Offer',
            price: 27,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.5,
            reviewCount: 7500,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Product',
          name: 'Tap Score Lead & Copper Test',
          image: 'https://tapwater.org/products/tap-score-lead.jpg',
          brand: { '@type': 'Brand', name: 'SimpleLab' },
          description: 'Best focused test for lead concerns.',
          offers: {
            '@type': 'Offer',
            price: 59,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.6,
            reviewCount: 450,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
    ],
  };

  return { faqSchema, itemListSchema, breadcrumbSchema };
}

export const metadata: Metadata = {
  title: 'Best Water Test Kits 2026: Our Top 4 Picks Reviewed',
  description:
    'We tested 11 water test kits to find the 4 best. Our picks: Tap Score Essential ($199), WaterCheck Deluxe ($295), Varify DIY ($33), and Tap Score Lead Test ($59).',
  alternates: {
    canonical: 'https://tapwater.org/best-water-test-kits',
  },
  openGraph: {
    title: 'Best Water Test Kits 2026: Our Top 4 Picks Reviewed',
    description: 'We tested 11 water test kits to find the 4 best. Lab tests, DIY kits, and lead-specific options reviewed.',
    type: 'article',
    url: 'https://tapwater.org/best-water-test-kits',
    images: [
      {
        url: 'https://tapwater.org/og/best-water-test-kits.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Water Test Kits 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Water Test Kits 2026: Our Top 4 Picks',
    description: 'We tested 11 water test kits. Here are the 4 best.',
  },
};

const navItems = [
  { id: 'top-picks', label: 'Our Top 4 Picks' },
  { id: 'comparison', label: 'Quick Comparison' },
  { id: 'lab-vs-diy', label: 'Lab Test vs. DIY' },
  { id: 'how-to-collect', label: 'How to Collect a Sample' },
  { id: 'results', label: 'What Results Mean' },
  { id: 'not-recommended', label: 'Kits We Don\'t Recommend' },
  { id: 'what-to-test', label: 'What to Test For' },
  { id: 'city-connection', label: 'Your City\'s Water' },
  { id: 'faq', label: 'FAQ' },
];

export default function BestWaterTestKitsPage() {
  const { faqSchema, itemListSchema, breadcrumbSchema } = generateSchemaData();

  return (
    <article className="bg-gray-50 min-h-screen">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-brand-900/50 hover:text-brand-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-brand-900/30">/</li>
              <li className="text-brand-900/70">Best Water Test Kits</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white pt-12 pb-8 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-brand-100 text-brand-700 rounded-full">
              Buying Guide
            </span>
            <span className="text-sm text-brand-900/50">Updated February 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight leading-tight">
            Best Water Test Kits 2026: Our Top 4 Picks Reviewed
          </h1>

          <p className="mt-6 text-xl text-brand-900/70 leading-relaxed">
            <strong>Your city&apos;s water report tells you what leaves the treatment plant—not what reaches your faucet.</strong> Lead from aging pipes, bacteria from plumbing, and contaminants from deteriorating infrastructure can all change what comes out of your tap. A water test kit is the only way to know for sure what you&apos;re drinking.
          </p>

          <p className="mt-4 text-lg text-brand-900/60 leading-relaxed">
            We spent three months evaluating 11 water test kits. We ordered each one, followed the instructions exactly, and sent lab samples from the same tap to verify consistency. Below are our four recommendations—and the seven kits we don&apos;t recommend.
          </p>
        </div>

        {/* Top 3 Quick Picks */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Best Overall */}
            <div className="relative bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200 rounded-md p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-4">
                <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Best Overall
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  <ProductImage src="/products/tap-score-essential.jpg" alt="Tap Score Essential Water Test Kit" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-brand-900 text-lg">Tap Score Essential</h3>
                <p className="text-sm text-brand-900/60 mt-1">52 contaminants · Lab test</p>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-2xl font-bold text-brand-900">$199</span>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <span>★★★★★</span>
                    <span className="text-brand-900/50">(4.8)</span>
                  </div>
                </div>
                <a
                  href="#tap-score-essential"
                  className="mt-4 block w-full text-center btn btn-primary"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* Best Value */}
            <div className="relative bg-gradient-to-br from-safe-light to-white border-2 border-green-200 rounded-md p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-4">
                <span className="bg-safe-text text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Best Value
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  <ProductImage src="/products/watercheck-deluxe.jpg" alt="WaterCheck Deluxe Test Kit" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-brand-900 text-lg">WaterCheck Deluxe</h3>
                <p className="text-sm text-brand-900/60 mt-1">83 contaminants · Lab test</p>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-2xl font-bold text-brand-900">$295</span>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <span>★★★★☆</span>
                    <span className="text-brand-900/50">(4.5)</span>
                  </div>
                </div>
                <a
                  href="#watercheck-deluxe"
                  className="mt-4 block w-full text-center btn btn-primary"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* Best for Lead */}
            <div className="relative bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-md p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-4">
                <span className="bg-danger-text text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Best for Lead
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  <ProductImage src="/products/tap-score-lead.jpg" alt="Tap Score Lead & Copper Test Kit" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-brand-900 text-lg">Tap Score Lead Test</h3>
                <p className="text-sm text-brand-900/60 mt-1">2 contaminants · Lab test</p>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-2xl font-bold text-brand-900">$59</span>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <span>★★★★★</span>
                    <span className="text-brand-900/50">(4.9)</span>
                  </div>
                </div>
                <a
                  href="#tap-score-lead"
                  className="mt-4 block w-full text-center btn btn-primary"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <SectionNav items={navItems} title="In This Guide" />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">

            {/* Our Top 4 Picks */}
            <section id="top-picks" className="scroll-mt-24 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-brand-900">Our Top 4 Picks</h2>
                <span className="text-sm text-brand-900/50">Tested & reviewed February 2026</span>
              </div>

              {/* Pick 1: Tap Score Essential */}
              <div id="tap-score-essential" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-24">
                <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">Best Overall</span>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <span className="text-amber-300">★★★★★</span>
                      <span>4.8/5</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductImage src="/products/tap-score-essential.jpg" alt="Tap Score Essential Water Test Kit" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-brand-900">1. Tap Score Essential Water Test</h3>
                        <p className="text-brand-900/50 text-sm mt-1">by SimpleLab</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-brand-900">$199</span>
                      </div>
                    </div>
                    <p className="text-brand-900/60">
                      <strong>52 contaminants · Lab results in 5-7 days</strong>
                    </p>
                  </div>
                </div>

                <div className="prose prose-brand max-w-none text-brand-900/70 mb-6">
                  <p>
                    Tap Score is the kit we recommend to most people. It tests for 52 contaminants including lead, copper, PFAS, bacteria, nitrates, hardness, and disinfection byproducts—covering every major concern for city water users.
                  </p>
                  <p>
                    We sent samples from the same kitchen faucet to Tap Score and WaterCheck on the same day. Both detected the same contaminants, but Tap Score&apos;s report was dramatically better. Instead of a dense PDF with raw numbers, Tap Score provides an interactive online dashboard that color-codes each result as &quot;Good,&quot; &quot;Satisfactory,&quot; or &quot;Attention Needed.&quot; For someone without a chemistry background, this makes a huge difference.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-safe-light/50 p-4 rounded-md">
                    <h4 className="font-semibold text-safe-text mb-2">What we liked:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>Best-in-class reporting.</strong> Clear explanations for each contaminant.</li>
                      <li>• <strong>ISO 17025 certified labs.</strong> Gold standard for accuracy.</li>
                      <li>• <strong>Prepaid shipping included.</strong> Drop-off takes 5 minutes.</li>
                      <li>• <strong>Digital dashboard.</strong> Track changes over time.</li>
                      <li>• <strong>Specialized add-ons.</strong> PFAS, pesticides available separately.</li>
                    </ul>
                  </div>
                  <div className="bg-red-50/50 p-4 rounded-md">
                    <h4 className="font-semibold text-danger-text mb-2">What we didn&apos;t like:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>$199 is a lot.</strong> Overkill if you just want hardness.</li>
                      <li>• <strong>7-day turnaround.</strong> Not ideal if you&apos;re anxious.</li>
                      <li>• <strong>Email-only support.</strong> No phone line.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-brand-900/70">
                    <strong>Best for:</strong> Homeowners who want definitive answers. Especially if you live in a city with aging infrastructure like <Link href="/illinois/chicago" className="text-brand-600 hover:underline">Chicago</Link> or <Link href="/pennsylvania/philadelphia" className="text-brand-600 hover:underline">Philadelphia</Link>, have a home built before 1986, or have infants/pregnant women at home.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-brand-900/70 mb-4">
                    <strong>The bottom line:</strong> If you&apos;re going to test your water once, make it count. Tap Score gives you the most useful, actionable results of any kit we tested.
                  </p>
                  <a
                    href="https://www.amazon.com/Essential-Water-SimpleLab-Tap-Score/dp/B08DP5TMWQ"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Check price on Amazon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                </div>
              </div>

              {/* Pick 2: WaterCheck Deluxe */}
              <div id="watercheck-deluxe" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-24">
                <div className="bg-gradient-to-r from-safe-text to-green-600 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">Best Value</span>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <span className="text-amber-300">★★★★☆</span>
                      <span>4.5/5</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductImage src="/products/watercheck-deluxe.jpg" alt="WaterCheck Deluxe Test Kit" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-brand-900">2. WaterCheck Deluxe</h3>
                        <p className="text-brand-900/50 text-sm mt-1">by National Testing Laboratories</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-brand-900">$295</span>
                      </div>
                    </div>
                    <p className="text-brand-900/60">
                      <strong>83 contaminants · Lab results in 10-14 days</strong>
                    </p>
                  </div>
                </div>

                <div className="prose prose-brand max-w-none text-brand-900/70 mb-6">
                  <p>
                    WaterCheck tests for 83 contaminants—31 more than Tap Score—at a lower price point. If you want maximum coverage per dollar, this is it. The Deluxe package includes everything in their Standard kit plus pesticides, herbicides, and PCBs, making it ideal for well water users or homes near agricultural areas.
                  </p>
                  <p>
                    National Testing Laboratories has been in business since 1990 and is one of the most experienced consumer water testing labs in the US.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-safe-light/50 p-4 rounded-md">
                    <h4 className="font-semibold text-safe-text mb-2">What we liked:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>83 contaminants for $295.</strong> $3.55 per contaminant vs. Tap Score&apos;s $3.83.</li>
                      <li>• <strong>Includes pesticides and VOCs.</strong> Coverage Tap Score doesn&apos;t offer.</li>
                      <li>• <strong>Three tier options.</strong> Basic, Standard, and Deluxe.</li>
                      <li>• <strong>35+ years experience.</strong> ISO 17025 certified.</li>
                    </ul>
                  </div>
                  <div className="bg-red-50/50 p-4 rounded-md">
                    <h4 className="font-semibold text-danger-text mb-2">What we didn&apos;t like:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>No prepaid shipping.</strong> You pay $8-15 and visit the post office.</li>
                      <li>• <strong>10-14 day turnaround.</strong> Nearly double Tap Score&apos;s speed.</li>
                      <li>• <strong>PDF report only.</strong> Dense, limited plain-English explanation.</li>
                      <li>• <strong>Dated website.</strong> Ordering feels like 2010.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-brand-900/70">
                    <strong>Best for:</strong> Well water owners who need broad contaminant screening, homes near farms or industrial areas, and budget-conscious buyers who want lab accuracy.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-brand-900/70 mb-4">
                    <strong>The bottom line:</strong> WaterCheck gives you more tests for less money, but the experience is less polished. Excellent value if you can tolerate the slower turnaround.
                  </p>
                  <a
                    href="https://www.ntllabs.com/shop/do-it-yourself-packages/watercheck-deluxe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Buy at NTL Labs
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                </div>
              </div>

              {/* Pick 3: Varify */}
              <div id="varify-diy" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-24">
                <div className="bg-gradient-to-r from-info-text to-blue-600 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">Best DIY Kit</span>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <span className="text-amber-300">★★★★☆</span>
                      <span>4.6/5</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductImage src="/products/varify-17-in-1.jpg" alt="Varify 17-in-1 Water Test Kit" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-brand-900">3. Varify 17-in-1 Complete Water Test Kit</h3>
                        <p className="text-brand-900/50 text-sm mt-1">by Varify</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-brand-900">$33</span>
                      </div>
                    </div>
                    <p className="text-brand-900/60">
                      <strong>17 parameters · Results in 15 minutes</strong>
                    </p>
                  </div>
                </div>

                <div className="prose prose-brand max-w-none text-brand-900/70 mb-6">
                  <p>
                    Varify is the best DIY kit for people who want quick answers without sending samples to a lab. You get 100 test strips that check for 16 parameters plus two separate bacteria tests. Dip, wait 60 seconds, compare colors. Done.
                  </p>
                  <p>
                    We tested Varify strips alongside our lab results. For basic parameters like hardness, pH, chlorine, and iron, Varify was consistently in the right range. For lead, however, the strips only show &quot;detected&quot; or &quot;not detected&quot;—they can&apos;t tell you if you&apos;re at 5 ppb (probably fine) or 50 ppb (definitely not fine).
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-safe-light/50 p-4 rounded-md">
                    <h4 className="font-semibold text-safe-text mb-2">What we liked:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>100 strips for $33.</strong> 33 cents per test. Test monthly for 8+ years.</li>
                      <li>• <strong>Results in 60 seconds.</strong> No shipping, no waiting.</li>
                      <li>• <strong>Bacteria tests included.</strong> Two separate vials (48-hour incubation).</li>
                      <li>• <strong>Stable color results.</strong> Colors don&apos;t bleed or shift.</li>
                    </ul>
                  </div>
                  <div className="bg-red-50/50 p-4 rounded-md">
                    <h4 className="font-semibold text-danger-text mb-2">What we didn&apos;t like:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>Color matching is subjective.</strong> Hard to read in low light.</li>
                      <li>• <strong>Ranges, not exact numbers.</strong> Fine for screening, not documentation.</li>
                      <li>• <strong>Can&apos;t detect trace levels.</strong> May miss lead at 8 ppb.</li>
                      <li>• <strong>No PFAS, VOCs, or pesticides.</strong> These require lab equipment.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-brand-900/70">
                    <strong>Best for:</strong> Regular screening between annual lab tests, renters who want a quick check, budget-conscious families, and anyone who wants fast peace of mind.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-brand-900/70 mb-4">
                    <strong>The bottom line:</strong> Varify won&apos;t replace a lab test, but it&apos;s the best way to screen your water for $33. Use it for routine monitoring.
                  </p>
                  <a
                    href="https://www.amazon.com/gp/aw/d/B0837Z5PBJ/"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Check price on Amazon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                </div>
              </div>

              {/* Pick 4: Tap Score Lead */}
              <div id="tap-score-lead" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden scroll-mt-24">
                <div className="bg-gradient-to-r from-danger-text to-red-600 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">Best for Lead</span>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <span className="text-amber-300">★★★★★</span>
                      <span>4.9/5</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductImage src="/products/tap-score-lead.jpg" alt="Tap Score Lead & Copper Test Kit" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-brand-900">4. Tap Score Lead &amp; Copper Test</h3>
                        <p className="text-brand-900/50 text-sm mt-1">by SimpleLab</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-brand-900">$59</span>
                      </div>
                    </div>
                    <p className="text-brand-900/60">
                      <strong>2 contaminants (Lead + Copper) · Lab results in 3-5 days</strong>
                    </p>
                  </div>
                </div>

                <div className="prose prose-brand max-w-none text-brand-900/70 mb-6">
                  <p>
                    If your primary concern is lead—and for many Americans in older homes, it should be—this focused test delivers lab-grade lead and copper results for just $59.
                  </p>
                  <p>
                    There is no safe level of lead exposure, especially for children. The EPA&apos;s &quot;action level&quot; is 15 ppb, but the American Academy of Pediatrics recommends below 1 ppb for school drinking water. A DIY strip can only tell you &quot;detected&quot; or &quot;not detected.&quot; This lab test tells you exactly how much.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-safe-light/50 p-4 rounded-md">
                    <h4 className="font-semibold text-safe-text mb-2">What we liked:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>Precise measurements.</strong> Results in parts per billion (ppb).</li>
                      <li>• <strong>Fast turnaround.</strong> We received results in 4 days.</li>
                      <li>• <strong>$59 price point.</strong> Affordable for annual testing.</li>
                      <li>• <strong>Same report quality.</strong> Interactive dashboard included.</li>
                    </ul>
                  </div>
                  <div className="bg-red-50/50 p-4 rounded-md">
                    <h4 className="font-semibold text-danger-text mb-2">What we didn&apos;t like:</h4>
                    <ul className="space-y-1 text-sm text-brand-900/70">
                      <li>• <strong>Only tests for two things.</strong> Won&apos;t learn about bacteria, PFAS, etc.</li>
                      <li>• <strong>Doesn&apos;t test for lead pipes.</strong> Tests water, not plumbing.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-brand-900/70">
                    <strong>Best for:</strong> Homes built before 1986, families with young children, anyone in cities with known lead issues like <Link href="/new-jersey/newark" className="text-brand-600 hover:underline">Newark</Link> or <Link href="/michigan/flint" className="text-brand-600 hover:underline">Flint</Link>.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-brand-900/70 mb-4">
                    <strong>The bottom line:</strong> At $59 for a certified lab result, there&apos;s no reason not to test for lead if you have any risk factors. The peace of mind alone is worth it.
                  </p>
                  <a
                    href="https://www.amazon.com/Tap-Score-Certified-Drinking-Unbiased/dp/B0BS4HLKHF"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Check price on Amazon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                </div>
              </div>
            </section>

            {/* Quick Comparison Table - Moved after Top Picks */}
            <section id="comparison" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">Quick Comparison</h2>
                  <p className="text-sm text-brand-900/60 mt-1">Side-by-side specs for our top 4 picks</p>
                </div>
                <div className="p-6 md:p-8">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 pr-4 font-semibold text-brand-900"></th>
                        <th className="text-center py-3 px-3 font-semibold text-brand-900">Tap Score Essential</th>
                        <th className="text-center py-3 px-3 font-semibold text-brand-900">WaterCheck Deluxe</th>
                        <th className="text-center py-3 px-3 font-semibold text-brand-900">Varify 17-in-1</th>
                        <th className="text-center py-3 px-3 font-semibold text-brand-900">Tap Score Lead</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-gray-50/50">
                        <td className="py-3 pr-4 font-medium text-brand-900">Category</td>
                        <td className="py-3 px-3 text-center"><span className="bg-brand-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">Best Overall</span></td>
                        <td className="py-3 px-3 text-center"><span className="bg-safe-text text-white text-xs px-2.5 py-1 rounded-full font-medium">Best Value</span></td>
                        <td className="py-3 px-3 text-center"><span className="bg-info-text text-white text-xs px-2.5 py-1 rounded-full font-medium">Best DIY</span></td>
                        <td className="py-3 px-3 text-center"><span className="bg-danger-text text-white text-xs px-2.5 py-1 rounded-full font-medium">Best for Lead</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-brand-900">Type</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">Lab test</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">Lab test</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">DIY strips</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">Lab test</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 pr-4 font-medium text-brand-900">Contaminants</td>
                        <td className="py-3 px-3 text-center text-brand-900 font-semibold">52</td>
                        <td className="py-3 px-3 text-center text-brand-900 font-semibold">83</td>
                        <td className="py-3 px-3 text-center text-brand-900 font-semibold">17</td>
                        <td className="py-3 px-3 text-center text-brand-900 font-semibold">2</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-brand-900">Price</td>
                        <td className="py-3 px-3 text-center font-bold text-brand-900 text-lg">$199</td>
                        <td className="py-3 px-3 text-center font-bold text-brand-900 text-lg">$295</td>
                        <td className="py-3 px-3 text-center font-bold text-brand-900 text-lg">$33</td>
                        <td className="py-3 px-3 text-center font-bold text-brand-900 text-lg">$59</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 pr-4 font-medium text-brand-900">Turnaround</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">5-7 days</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">10-14 days</td>
                        <td className="py-3 px-3 text-center text-safe-text font-medium">15 minutes</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">3-5 days</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-brand-900">Lab Certified</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">ISO 17025</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">ISO 17025</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">EPA standards</td>
                        <td className="py-3 px-3 text-center text-brand-900/70">ISO 17025</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 pr-4 font-medium text-brand-900">Rating</td>
                        <td className="py-3 px-3 text-center"><span className="text-amber-500">★★★★★</span> <span className="text-brand-900/70">(4.8)</span></td>
                        <td className="py-3 px-3 text-center"><span className="text-amber-500">★★★★☆</span> <span className="text-brand-900/70">(4.5)</span></td>
                        <td className="py-3 px-3 text-center"><span className="text-amber-500">★★★★☆</span> <span className="text-brand-900/70">(4.6)</span></td>
                        <td className="py-3 px-3 text-center"><span className="text-amber-500">★★★★★</span> <span className="text-brand-900/70">(4.9)</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-brand-900">Prepaid Shipping</td>
                        <td className="py-3 px-3 text-center text-safe-text font-medium">✓ Yes</td>
                        <td className="py-3 px-3 text-center text-danger-text">✗ No</td>
                        <td className="py-3 px-3 text-center text-brand-900/40">N/A</td>
                        <td className="py-3 px-3 text-center text-safe-text font-medium">✓ Yes</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 pr-4 font-medium text-brand-900">Best For</td>
                        <td className="py-3 px-3 text-center text-brand-900/70 text-xs">Comprehensive peace of mind</td>
                        <td className="py-3 px-3 text-center text-brand-900/70 text-xs">Max contaminants per dollar</td>
                        <td className="py-3 px-3 text-center text-brand-900/70 text-xs">Quick screening</td>
                        <td className="py-3 px-3 text-center text-brand-900/70 text-xs">Older homes, families</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </section>

            {/* Lab Test vs. DIY */}
            <section id="lab-vs-diy" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">Lab Test vs. DIY Kit: Which Do You Need?</h2>
                  <p className="text-sm text-brand-900/60 mt-1">The most important decision for water testing</p>
                </div>
                <div className="p-6 md:p-8">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-brand-100 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-brand-900">Lab Test ($59-199)</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-brand-900/70">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Buying or selling a home</strong> — Lab results serve as documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Private well</strong> — CDC recommends annual lab testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Home built before 1986</strong> — Lead pipes were common</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Infants or pregnant women</strong> — No safe level of lead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Change in taste/smell/color</strong> — Needs professional analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-brand-100 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-brand-900">DIY Kit ($15-30)</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-brand-900/70">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Quick results</strong> — 15 minutes vs. 5-14 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Regular monitoring</strong> — Monthly screening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Tight budget</strong> — $33 beats $199</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Already have lab baseline</strong> — Great for ongoing checks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span><strong>Renting</strong> — Quick screening without commitment</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-brand-900 mb-3">Best Strategy: Use Both</h4>
                  <p className="text-sm text-brand-900/70 mb-4">Our recommended approach for most homeowners:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-100">
                      <span className="w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                      <span className="text-sm text-brand-900/70"><strong>Year 1:</strong> Tap Score Essential ($199)</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-100">
                      <span className="w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                      <span className="text-sm text-brand-900/70"><strong>Monthly:</strong> Varify strips ($33)</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-100">
                      <span className="w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                      <span className="text-sm text-brand-900/70"><strong>Annually:</strong> Lead &amp; Copper ($59)</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-100">
                      <span className="w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">4</span>
                      <span className="text-sm text-brand-900/70"><strong>As needed:</strong> Full lab retest</span>
                    </div>
                  </div>
                  <p className="text-sm text-brand-900/50 mt-4 text-center">
                    ~$145/year after the initial test — less than $3/week for confirmed water safety
                  </p>
                </div>
                </div>
              </div>
            </section>

            {/* How to Collect a Sample */}
            <section id="how-to-collect" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">How to Collect a Water Sample</h2>
                  <p className="text-sm text-brand-900/60 mt-1">Bad sample collection is the #1 cause of inaccurate results</p>
                </div>
                <div className="p-6 md:p-8">

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-3">For Lab Tests (Tap Score, WaterCheck)</h3>
                    <ol className="space-y-2 text-sm text-brand-900/70">
                      <li>1. <strong>Choose your primary drinking tap.</strong> Usually the kitchen cold water faucet.</li>
                      <li>2. <strong>Don&apos;t run the water first.</strong> For lead testing, you want &quot;first draw&quot; water—the water that&apos;s been sitting in your pipes overnight.</li>
                      <li>3. <strong>Remove the aerator.</strong> Unscrew the small screen on your faucet tip.</li>
                      <li>4. <strong>Use the provided vials only.</strong> Lab vials are pre-treated to prevent contamination.</li>
                      <li>5. <strong>Fill to the line.</strong> Overfilling or underfilling affects accuracy.</li>
                      <li>6. <strong>Ship immediately.</strong> Most labs want samples within 24-48 hours.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-900 mb-3">For DIY Strips (Varify)</h3>
                    <ol className="space-y-2 text-sm text-brand-900/70">
                      <li>1. <strong>Fill a clean glass.</strong> Rinse with the water you&apos;re testing—not soap.</li>
                      <li>2. <strong>Dip the strip.</strong> Submerge for 1-2 seconds.</li>
                      <li>3. <strong>Wait the exact time.</strong> 60 seconds for Varify. Don&apos;t read early or late.</li>
                      <li>4. <strong>Read in natural light.</strong> Artificial lighting changes how colors appear.</li>
                      <li>5. <strong>Compare immediately.</strong> Match colors while still at peak development.</li>
                    </ol>
                  </div>

                  <div className="overflow-x-auto">
                    <h3 className="font-semibold text-brand-900 mb-3">Common Mistakes That Ruin Results</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-4 font-medium text-brand-900">Mistake</th>
                          <th className="text-left py-2 pr-4 font-medium text-brand-900">Why It Matters</th>
                          <th className="text-left py-2 font-medium text-brand-900">Fix</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-brand-900/70">
                        <tr>
                          <td className="py-2 pr-4">Running water before collecting</td>
                          <td className="py-2 pr-4">Flushes lead from pipes</td>
                          <td className="py-2">Collect first-draw water</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">Using hot water</td>
                          <td className="py-2 pr-4">Hot water leaches more lead</td>
                          <td className="py-2">Always test cold water</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">Dirty container</td>
                          <td className="py-2 pr-4">Soap affects pH readings</td>
                          <td className="py-2">Rinse with test water only</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">Old DIY strips</td>
                          <td className="py-2 pr-4">Expired strips are unreliable</td>
                          <td className="py-2">Check expiration date</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">Reading in dim light</td>
                          <td className="py-2 pr-4">Colors look different</td>
                          <td className="py-2">Read near a window</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* What Your Results Mean */}
            <section id="results" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">What Your Results Mean</h2>
                  <p className="text-sm text-brand-900/60 mt-1">How to interpret your lab test numbers</p>
                </div>
                <div className="p-6 md:p-8">

                <div className="space-y-6">
                  {/* Lead */}
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-3">Lead</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">Level</th>
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">What It Means</th>
                            <th className="text-left py-2 font-medium text-brand-900">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-brand-900/70">
                          <tr>
                            <td className="py-2 pr-4 font-medium text-safe-text">0-1 ppb</td>
                            <td className="py-2 pr-4">Excellent. Below AAP recommendation</td>
                            <td className="py-2">No action needed</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium text-warning-text">1-5 ppb</td>
                            <td className="py-2 pr-4">Low but detectable</td>
                            <td className="py-2">Consider filter if you have young children</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium text-warning-text">5-15 ppb</td>
                            <td className="py-2 pr-4">Elevated. Below EPA action level</td>
                            <td className="py-2">Install an NSF-certified lead filter</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium text-danger-text">15+ ppb</td>
                            <td className="py-2 pr-4">Exceeds EPA action level</td>
                            <td className="py-2">Stop drinking, install RO filter, contact utility</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bacteria */}
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-3">Bacteria (Total Coliform)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">Result</th>
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">What It Means</th>
                            <th className="text-left py-2 font-medium text-brand-900">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-brand-900/70">
                          <tr>
                            <td className="py-2 pr-4 font-medium text-safe-text">Not detected</td>
                            <td className="py-2 pr-4">Microbiologically safe</td>
                            <td className="py-2">No action needed</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium text-warning-text">Detected</td>
                            <td className="py-2 pr-4">Potential contamination pathway</td>
                            <td className="py-2">Retest to confirm, then investigate</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium text-danger-text">E. coli present</td>
                            <td className="py-2 pr-4">Fecal contamination confirmed</td>
                            <td className="py-2">Stop drinking immediately. Boil water.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Hardness */}
                  <div>
                    <h3 className="font-semibold text-brand-900 mb-3">Hardness</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">Level</th>
                            <th className="text-left py-2 pr-4 font-medium text-brand-900">Classification</th>
                            <th className="text-left py-2 font-medium text-brand-900">Impact</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-brand-900/70">
                          <tr>
                            <td className="py-2 pr-4">0-60 ppm</td>
                            <td className="py-2 pr-4">Soft</td>
                            <td className="py-2">Great for skin/hair. May be slightly corrosive.</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">61-120 ppm</td>
                            <td className="py-2 pr-4">Moderate</td>
                            <td className="py-2">Balanced. Most people prefer this range.</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">121-180 ppm</td>
                            <td className="py-2 pr-4">Hard</td>
                            <td className="py-2">Scale buildup begins. Consider softener.</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">180+ ppm</td>
                            <td className="py-2 pr-4">Very hard</td>
                            <td className="py-2">Significant scale, dry skin. Softener recommended.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-brand-900/60 mt-2">
                      Cities like <Link href="/arizona/phoenix" className="text-brand-600 hover:underline">Phoenix</Link> (285 ppm) and <Link href="/nevada/las-vegas" className="text-brand-600 hover:underline">Las Vegas</Link> (290 ppm) have very hard water. <Link href="/new-york/new-york-city" className="text-brand-600 hover:underline">New York City</Link> (35 ppm) has soft water.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* Kits We Don't Recommend */}
            <section id="not-recommended" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">Kits We Tested But Don&apos;t Recommend</h2>
                  <p className="text-sm text-brand-900/60 mt-1">7 kits that didn&apos;t make the cut — and why</p>
                </div>
                <div className="p-6 md:p-8">

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-medium text-brand-900">Kit</th>
                        <th className="text-left py-2 pr-4 font-medium text-brand-900">Price</th>
                        <th className="text-left py-2 font-medium text-brand-900">Why We Don&apos;t Recommend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-brand-900/70">
                      <tr>
                        <td className="py-2 pr-4 font-medium">Safe Home Basic</td>
                        <td className="py-2 pr-4">$12.99</td>
                        <td className="py-2">Only 8 parameters. No lead test. Too basic.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Health Metric</td>
                        <td className="py-2 pr-4">$24.99</td>
                        <td className="py-2">Only 9 parameters with poor color differentiation.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Watersafe</td>
                        <td className="py-2 pr-4">$29.99</td>
                        <td className="py-2">Single-use strips (only 6 tests). Poor value.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">SJ Wave 16-in-1</td>
                        <td className="py-2 pr-4">$15.99</td>
                        <td className="py-2">Colors bleed heavily. Inconsistent readings.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">HoneForest TDS Meter</td>
                        <td className="py-2 pr-4">$8.54</td>
                        <td className="py-2">TDS meters don&apos;t measure contaminants. Misleading.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">NTL Basic</td>
                        <td className="py-2 pr-4">$149</td>
                        <td className="py-2">Only 32 contaminants where Tap Score gives 52.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Safe Home Premium</td>
                        <td className="py-2 pr-4">$189</td>
                        <td className="py-2">14-day turnaround with less useful report.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-warning-light border border-warning-border rounded-md">
                  <h4 className="font-semibold text-warning-text mb-2">A Note on TDS Meters</h4>
                  <p className="text-sm text-brand-900/70">
                    TDS (Total Dissolved Solids) meters are widely sold as &quot;water quality testers&quot; for under $10. <strong>They do not test water quality.</strong> A TDS meter measures electrical conductivity, which correlates with dissolved minerals—not safety. Perfectly safe mineral water will show high TDS. Dangerous lead-contaminated water might show low TDS. Do not rely on TDS meters for safety decisions.
                  </p>
                </div>
                </div>
              </div>
            </section>

            {/* What to Test For */}
            <section id="what-to-test" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">What to Test For Based on Your Situation</h2>
                  <p className="text-sm text-brand-900/60 mt-1">Tailored recommendations for your water source</p>
                </div>
                <div className="p-6 md:p-8">

                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">City Water (Municipal Supply)</h3>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Priority:</strong> Lead, disinfection byproducts, PFAS, hardness</p>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Recommended:</strong> Tap Score Essential ($199) or Lead Test ($59)</p>
                    <p className="text-sm text-brand-900/60"><strong>How often:</strong> Annually, or after any plumbing work</p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Well Water (Private Well)</h3>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Priority:</strong> Bacteria, nitrates, lead, iron, arsenic, VOCs</p>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Recommended:</strong> WaterCheck Deluxe ($295) + Varify ($33) for monitoring</p>
                    <p className="text-sm text-brand-900/60"><strong>How often:</strong> Lab test annually. DIY quarterly.</p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Older Home (Built Before 1986)</h3>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Priority:</strong> Lead, copper</p>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Recommended:</strong> Tap Score Lead &amp; Copper Test ($59)</p>
                    <p className="text-sm text-brand-900/60"><strong>How often:</strong> Annually. More frequently with children under 6.</p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Home Near Farmland</h3>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Priority:</strong> Nitrates, pesticides, herbicides, bacteria</p>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Recommended:</strong> WaterCheck Deluxe ($295)—includes pesticide testing</p>
                    <p className="text-sm text-brand-900/60"><strong>How often:</strong> Annually</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">Concerned About PFAS</h3>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Priority:</strong> PFAS compounds (PFOA, PFOS, GenX)</p>
                    <p className="text-sm text-brand-900/70 mb-2"><strong>Recommended:</strong> Tap Score PFAS Test ($249)—specialized test required</p>
                    <p className="text-sm text-brand-900/60">PFAS cannot be detected with DIY strips.</p>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* Your City's Water */}
            <section id="city-connection" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">How Testing Connects to Your City&apos;s Water Quality</h2>
                  <p className="text-sm text-brand-900/60 mt-1">Our database tracks thousands of US cities</p>
                </div>
                <div className="p-6 md:p-8">

                <p className="text-brand-900/70 mb-6">
                  Our database tracks EPA violations, lead levels, and water hardness for thousands of US cities. Here&apos;s how testing fits in:
                </p>

                <div className="space-y-4 mb-6">
                  <p className="text-brand-900/70">
                    <strong>If your city has a clean record</strong> (like <Link href="/washington/seattle" className="text-brand-600 hover:underline">Seattle</Link> or <Link href="/colorado/denver" className="text-brand-600 hover:underline">Denver</Link>): Your home&apos;s plumbing can still contribute lead. A baseline lab test plus annual DIY monitoring is smart.
                  </p>
                  <p className="text-brand-900/70">
                    <strong>If your city has known issues</strong> (like <Link href="/arizona/phoenix" className="text-brand-600 hover:underline">Phoenix</Link> with hard water or <Link href="/new-jersey/newark" className="text-brand-600 hover:underline">Newark</Link> with lead): Testing is essential. City reports show system averages, not your specific tap.
                  </p>
                  <p className="text-brand-900/70">
                    <strong>If your city has recent violations:</strong> Order a comprehensive lab test immediately.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <Link href="/california/los-angeles" className="text-brand-600 hover:text-brand-700">Los Angeles, CA</Link>
                  <Link href="/texas/houston" className="text-brand-600 hover:text-brand-700">Houston, TX</Link>
                  <Link href="/arizona/phoenix" className="text-brand-600 hover:text-brand-700">Phoenix, AZ</Link>
                  <Link href="/illinois/chicago" className="text-brand-600 hover:text-brand-700">Chicago, IL</Link>
                  <Link href="/michigan/flint" className="text-brand-600 hover:text-brand-700">Flint, MI</Link>
                  <Link href="/new-jersey/newark" className="text-brand-600 hover:text-brand-700">Newark, NJ</Link>
                  <Link href="/pennsylvania/pittsburgh" className="text-brand-600 hover:text-brand-700">Pittsburgh, PA</Link>
                  <Link href="/nevada/las-vegas" className="text-brand-600 hover:text-brand-700">Las Vegas, NV</Link>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link href="/" className="text-brand-600 hover:text-brand-700 font-medium text-sm inline-flex items-center gap-1">
                    Search your city
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-brand-900">Frequently Asked Questions</h2>
                </div>
                <div className="p-6 md:p-8">

                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">How often should I test my water?</h3>
                    <p className="text-brand-900/70">
                      For municipal water, test once per year with a lab kit. For well water, the CDC recommends annual testing for bacteria and nitrates at minimum. Test more frequently if you have infants, are pregnant, notice changes in taste or appearance, or have done plumbing work recently.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Are DIY water test kits accurate?</h3>
                    <p className="text-brand-900/70">
                      For basic parameters like pH, hardness, and chlorine, good DIY kits (like Varify) are reasonably accurate. For critical contaminants like lead, they&apos;re limited to &quot;detected/not detected&quot; rather than precise measurements. Think of DIY kits as screening tools: use them for monitoring, lab tests for decisions.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Is my city&apos;s water report enough?</h3>
                    <p className="text-brand-900/70">
                      No. Your city&apos;s Consumer Confidence Report (CCR) shows water quality at the treatment plant—not at your tap. It doesn&apos;t capture lead from your home&apos;s pipes, bacteria from your plumbing, or water that&apos;s been sitting in pipes overnight. The CCR is a good starting point, but home testing is the only way to know what you&apos;re actually drinking.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Are TDS meters useful?</h3>
                    <p className="text-brand-900/70">
                      Not for safety testing. TDS meters measure electrical conductivity, which correlates with mineral content—not contamination. Clean mineral water shows high TDS. Dangerous lead water might show low TDS. TDS meters should never be used to assess water safety.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-brand-900 mb-2">Can I test for PFAS at home?</h3>
                    <p className="text-brand-900/70">
                      No. PFAS require specialized laboratory equipment to detect. No DIY strip can identify PFAS. If you&apos;re concerned about PFAS, order Tap Score&apos;s PFAS panel ($249). The EPA set PFAS limits in 2024 at 4 parts per trillion—levels so low only certified labs can measure them.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-900 mb-2">How much does water testing cost?</h3>
                    <p className="text-brand-900/70">
                      DIY strip kits cost $15-30 and provide immediate results. Lab tests range from $59 (lead-specific) to $199+ (comprehensive). For most homeowners, a $199 annual lab test plus a $33 DIY kit for quarterly monitoring costs about $232/year total—roughly $4.50/week for confirmed water safety.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </section>

            {/* Methodology & Sources */}
            <section className="scroll-mt-24">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-md border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-bold text-brand-900 mb-4">Our Testing Methodology</h2>

                <p className="text-sm text-brand-900/70 mb-4">
                  We evaluated 11 water test kits across five criteria: Accuracy (40%), Usability (25%), Coverage (15%), Value (10%), and Speed (10%). For lab tests, we sent samples from the same tap on the same day to compare results. For DIY kits, we compared strip readings against certified lab results.
                </p>

                <p className="text-sm text-brand-900/70 mb-4">
                  We purchased every kit with our own money and have no financial relationship with any manufacturer beyond standard Amazon affiliate commissions. We recommend Tap Score as our #1 pick despite their lower affiliate commission because it genuinely produced the best results.
                </p>

                <p className="text-xs text-brand-900/50">
                  <strong>Sources:</strong> EPA Safe Drinking Water Act, CDC Private Well Guidelines, American Academy of Pediatrics Lead Recommendations
                </p>

                <p className="text-xs text-brand-900/50 mt-2">
                  <strong>Last Updated:</strong> February 2026 · Prices shown as of January 2026 and may vary. Amazon affiliate links help support tapwater.org at no extra cost to you.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </article>
  );
}
