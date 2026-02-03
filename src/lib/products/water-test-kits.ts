export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'lab' | 'diy' | 'specialized';
  testCount: number;
  turnaround: string;
  bestFor: string;
  badge?: 'best-overall' | 'best-value' | 'best-diy' | 'most-comprehensive' | 'best-lead' | 'best-budget';
  whyWeLoveIt: string;
  pros: string[];
  cons: string[];
  verdict: string;
  buyUrl?: string;
  amazonUrl: string;
  rating: number;
  reviews: number;
  image?: string;
}

export const waterTestKits: Product[] = [
  // LAB TESTS
  {
    id: 'tap-score-advanced',
    name: 'Tap Score Advanced City Water Test',
    brand: 'SimpleLab',
    price: 199,
    category: 'lab',
    testCount: 116,
    turnaround: '3-5 business days',
    bestFor: 'City water, comprehensive testing',
    badge: 'best-overall',
    whyWeLoveIt: 'Most user-friendly lab test with the clearest reports. NYT Wirecutter\'s top pick for 4 years running.',
    pros: [
      'Tests 116 contaminants including lead, bacteria, VOCs',
      'EPA/NELAC certified labs across all 50 states',
      'Interactive digital report with health guidance',
      'Free prepaid shipping both ways',
      'PhD scientist support via chat',
    ],
    cons: [
      'Premium price point',
      'Results take 3-5 days (not instant)',
      'Some specialized tests cost extra',
    ],
    verdict: 'If you want one comprehensive test that covers everything, this is it. The report alone is worth the price - it explains every result in plain English with actionable recommendations.',
    buyUrl: 'https://mytapscore.com/products/advanced-city-water-test',
    amazonUrl: 'https://www.amazon.com/dp/B076DRBCBX',
    rating: 4.7,
    reviews: 1200,
    image: '/products/tap-score-advanced.jpg',
  },
  {
    id: 'watercheck-standard',
    name: 'WaterCheck Standard',
    brand: 'National Testing Laboratories',
    price: 149,
    category: 'lab',
    testCount: 83,
    turnaround: '7-10 business days',
    bestFor: 'Well water, budget-conscious comprehensive testing',
    badge: 'best-value',
    whyWeLoveIt: 'Gold standard in the industry for 30+ years. Color-coded reports make results easy to understand.',
    pros: [
      'Tests 83 contaminants - heavy metals, bacteria, nitrates, more',
      'ISO/EPA/NELAC multi-state certified',
      'Color-coded results vs EPA standards',
      'Trusted by professionals and homeowners since 1990s',
      'Excellent customer support',
    ],
    cons: [
      'Return shipping not included (~$30 overnight)',
      'Slower turnaround than Tap Score',
      'Website feels dated',
      'Reports less interactive than competitors',
    ],
    verdict: 'The workhorse of lab testing. Less flashy than Tap Score but equally accurate and $50 cheaper. Great for well water owners.',
    buyUrl: 'https://watercheck.com/products/watercheck-1-2',
    amazonUrl: 'https://www.amazon.com/dp/B0000AXSVE',
    rating: 4.5,
    reviews: 890,
    image: '/products/watercheck-standard.jpg',
  },
  {
    id: 'safe-home-ultimate',
    name: 'Safe Home Ultimate Drinking Water Test Kit',
    brand: 'Safe Home',
    price: 399,
    category: 'lab',
    testCount: 200,
    turnaround: '10-14 business days',
    bestFor: 'Home inspections, real estate, complete peace of mind',
    badge: 'most-comprehensive',
    whyWeLoveIt: 'Tests for everything - 200+ parameters including rare contaminants most kits miss.',
    pros: [
      '200+ contaminants - most comprehensive available',
      'Good Housekeeping Seal',
      'EPA certified lab',
      'Paper + digital report',
      'Great for home purchases',
    ],
    cons: [
      'Expensive ($399)',
      'Long turnaround (2 weeks)',
      'Overkill for most city water users',
      'No interactive digital dashboard',
    ],
    verdict: 'If you\'re buying a home, have a new well, or want to test for absolutely everything, this is your kit. Otherwise, it\'s more than most people need.',
    buyUrl: 'https://safehometestkits.com/product/ultimate-drinking-water-test-kit/',
    amazonUrl: 'https://www.amazon.com/dp/B07H2QJP3C',
    rating: 4.4,
    reviews: 620,
  },
  {
    id: 'tap-score-essential',
    name: 'Tap Score Essential Water Test',
    brand: 'SimpleLab',
    price: 99,
    category: 'lab',
    testCount: 56,
    turnaround: '3-5 business days',
    bestFor: 'First-time testers, basic screening',
    badge: 'best-budget',
    whyWeLoveIt: 'Lab-quality results at the lowest price point. Same great Tap Score report, just fewer tests.',
    pros: [
      'Affordable entry to lab testing',
      'Tests lead, bacteria, nitrates, hardness',
      'Same certified labs as Advanced',
      'Interactive report included',
    ],
    cons: [
      'No VOC or pesticide testing',
      'Fewer contaminants than competitors at similar price',
      'May need follow-up tests',
    ],
    verdict: 'Good starting point, but the WaterCheck Standard offers more tests for $50 more. Best for city water users who just want basics.',
    buyUrl: 'https://mytapscore.com/products/essential-city-water-test',
    amazonUrl: 'https://www.amazon.com/dp/B08DP5TMWQ',
    rating: 4.5,
    reviews: 780,
  },

  // DIY KITS
  {
    id: 'varify-17-in-1',
    name: 'Varify 17-in-1 Premium Water Test Kit',
    brand: 'Varify',
    price: 27,
    category: 'diy',
    testCount: 17,
    turnaround: 'Minutes (bacteria 48h)',
    bestFor: 'Quick screening, ongoing monitoring',
    badge: 'best-diy',
    whyWeLoveIt: 'Best balance of accuracy, tests, and value. The bacteria tests set it apart from cheaper strip-only kits.',
    pros: [
      '100 test strips + 2 bacteria tests',
      'Tests lead, bacteria, fluoride, iron, copper, mercury, more',
      'Results in 15 minutes (bacteria 48h)',
      'Over 7,500 Amazon reviews',
      'Made in USA, EPA standard compliant',
    ],
    cons: [
      'Less accurate than lab tests',
      'Color matching can be tricky',
      'Bacteria test takes 48 hours',
      'No detailed report or guidance',
    ],
    verdict: 'Our favorite DIY kit. If a lab test isn\'t in your budget, this gives you a solid picture of your water quality.',
    amazonUrl: 'https://www.amazon.com/dp/B08DKN8LLD',
    rating: 4.5,
    reviews: 7500,
    image: '/products/varify-17-in-1.jpg',
  },
  {
    id: 'health-metric-drinking',
    name: 'Health Metric Drinking Water Test Kit',
    brand: 'Health Metric',
    price: 20,
    category: 'diy',
    testCount: 9,
    turnaround: '10 minutes (bacteria 48h)',
    bestFor: 'First-time testers, basic safety check',
    whyWeLoveIt: 'Simple, affordable, covers the essentials. Great customer support with video guides.',
    pros: [
      'Tests 9 parameters - lead, bacteria, nitrates, pH, hardness',
      'Very easy to use with clear instructions',
      'Made in USA, calibrated to EPA standards',
      'Excellent customer support',
      'Video guides available online',
    ],
    cons: [
      'Fewer tests than Varify',
      'Some users report color chart hard to read',
      'Single-use only',
      'pH/hardness less accurate than other methods',
    ],
    verdict: 'Perfect for first-timers who want a simple yes/no on water safety. Upgrade to Varify if you want more detail.',
    amazonUrl: 'https://www.amazon.com/dp/B01N5K7LR3',
    rating: 4.3,
    reviews: 4100,
  },
  {
    id: 'watersafe-ws425b',
    name: 'Watersafe WS425B Drinking Water Test Kit',
    brand: 'Watersafe',
    price: 25,
    category: 'diy',
    testCount: 10,
    turnaround: '10 min (bacteria 48h)',
    bestFor: 'Quick safety screening',
    whyWeLoveIt: 'The original home water test kit. Proven, reliable, and widely available.',
    pros: [
      'Tests bacteria, lead, pesticides, nitrates, chlorine, pH, hardness',
      'EPA-based standards',
      'Available at most hardware stores',
      'Well-established brand',
    ],
    cons: [
      'Bacteria test takes 48 hours',
      'Single-use only (10 tests total)',
      'Results can be hard to interpret',
      'Older product, less refined than newer options',
    ],
    verdict: 'A reliable classic, but newer kits like Varify offer more tests for similar price.',
    amazonUrl: 'https://www.amazon.com/dp/B000Q6QWZA',
    rating: 4.2,
    reviews: 3800,
  },
  {
    id: 'jnw-direct-15-in-1',
    name: 'JNW Direct 15-in-1 Water Test Strips',
    brand: 'JNW Direct',
    price: 17,
    category: 'diy',
    testCount: 15,
    turnaround: '2 minutes',
    bestFor: 'Ongoing monitoring, water softener checks',
    whyWeLoveIt: '150 strips means you can test monthly for over a year. Best value for regular testing.',
    pros: [
      '150 strips per pack (incredible value)',
      'Tests hardness, chlorine, pH, iron, lead, more',
      'Results in 2 minutes',
      'Great for checking water softeners',
    ],
    cons: [
      'No bacteria testing',
      'Strip accuracy varies',
      'No guidance on what to do with results',
      'Lead test less sensitive than dedicated kits',
    ],
    verdict: 'Buy this if you want to test regularly. One pack lasts 1-2 years of monthly testing.',
    amazonUrl: 'https://www.amazon.com/dp/B07XFDXPX2',
    rating: 4.4,
    reviews: 4500,
  },

  // SPECIALIZED
  {
    id: 'tap-score-lead-copper',
    name: 'Tap Score Lead & Copper Test',
    brand: 'SimpleLab',
    price: 59,
    category: 'specialized',
    testCount: 2,
    turnaround: '3-5 business days',
    bestFor: 'Older homes, lead pipe concerns, families with children',
    badge: 'best-lead',
    whyWeLoveIt: 'Lab-accurate lead detection at an affordable price. Essential for homes built before 1986.',
    pros: [
      'Lab-certified accuracy for lead and copper',
      'Detects levels below EPA action threshold',
      'Important for pre-1986 homes',
      'Same quality as full Tap Score tests',
    ],
    cons: [
      'Only tests 2 contaminants',
      'Need additional kits for complete picture',
    ],
    verdict: 'If lead is your main concern, this is the most reliable option short of a full lab panel.',
    buyUrl: 'https://mytapscore.com/products/lead-and-copper-water-test',
    amazonUrl: 'https://www.amazon.com/dp/B0BS4GXYZZ',
    rating: 4.6,
    reviews: 450,
    image: '/products/tap-score-lead.jpg',
  },
  {
    id: 'health-metric-heavy-metals',
    name: 'Health Metric Heavy Metals Test Kit',
    brand: 'Health Metric',
    price: 15,
    category: 'specialized',
    testCount: 4,
    turnaround: '15 minutes',
    bestFor: 'Quick heavy metal screening',
    whyWeLoveIt: 'Tests lead, copper, iron, and mercury separately. More detail than multi-test strips.',
    pros: [
      'Individual tests for 4 heavy metals',
      'Detects lead down to 5 ppb',
      'Multiple tests included',
      'Clear instructions',
    ],
    cons: [
      'Less accurate than lab tests',
      'Color matching can be subjective',
      'No bacteria or other contaminants',
    ],
    verdict: 'Good first screen for metals, but follow up with lab test if you detect anything concerning.',
    amazonUrl: 'https://www.amazon.com/dp/B07BRSMF76',
    rating: 4.2,
    reviews: 1800,
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return waterTestKits.find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return waterTestKits.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return waterTestKits.filter(p => p.badge);
}

export function getTopPicks(): Product[] {
  return waterTestKits.filter(p =>
    p.badge === 'best-overall' ||
    p.badge === 'best-value' ||
    p.badge === 'best-diy'
  );
}
