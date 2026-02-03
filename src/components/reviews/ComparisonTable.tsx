import { Product } from '@/lib/products/water-test-kits';

interface ComparisonTableProps {
  products: Product[];
  category?: 'lab' | 'diy' | 'specialized' | 'all';
}

// Muted badge colors matching the site's design system
const badgeConfig = {
  'best-overall': { label: 'Best Overall', color: 'bg-brand-600' },
  'best-value': { label: 'Best Value', color: 'bg-safe-text' },
  'best-diy': { label: 'Best DIY', color: 'bg-info-text' },
  'most-comprehensive': { label: 'Most Comprehensive', color: 'bg-purple-700' },
  'best-lead': { label: 'Best for Lead', color: 'bg-danger-text' },
  'best-budget': { label: 'Budget Pick', color: 'bg-safe-text' },
};

export function ComparisonTable({ products, category = 'all' }: ComparisonTableProps) {
  const filteredProducts = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-brand-50">
              <th scope="col" className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-brand-600">
                Product
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">
                Tests
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">
                Results
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">
                Rating
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">
                Best For
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-mono uppercase tracking-wider text-brand-600">

              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredProducts.map((product, index) => {
              const badge = product.badge ? badgeConfig[product.badge] : null;

              return (
                <tr
                  key={product.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-brand-50/50 transition-colors`}
                >
                  {/* Product Name */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {badge && (
                        <span className={`${badge.color} text-white text-xs font-medium px-2 py-0.5 w-fit`}>
                          {badge.label}
                        </span>
                      )}
                      <a
                        href={`#${product.id}`}
                        className="font-medium text-brand-900 hover:text-brand-600 transition-colors"
                      >
                        {product.name}
                      </a>
                      <span className="text-xs text-brand-900/60">{product.brand}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4 text-center">
                    <span className="font-bold text-brand-900">${product.price}</span>
                  </td>

                  {/* Test Count */}
                  <td className="px-4 py-4 text-center">
                    <span className="font-medium text-brand-900">{product.testCount}</span>
                  </td>

                  {/* Turnaround */}
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm text-brand-900/80">{product.turnaround}</span>
                  </td>

                  {/* Rating */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium text-brand-900">{product.rating}</span>
                      <span className="text-xs text-brand-900/50">({product.reviews.toLocaleString()})</span>
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="px-4 py-4 text-center max-w-[150px]">
                    <span className="text-sm text-brand-900/80">{product.bestFor}</span>
                  </td>

                  {/* CTA */}
                  <td className="px-4 py-4 text-center">
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn btn-primary inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      View
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Quick comparison for top picks
export function QuickComparisonGrid({ products }: { products: Product[] }) {
  const topPicks = products.filter(p =>
    p.badge === 'best-overall' ||
    p.badge === 'best-value' ||
    p.badge === 'best-diy'
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {topPicks.map((product) => {
        const badge = product.badge ? badgeConfig[product.badge] : null;

        return (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden hover:border-brand-400 transition-colors"
          >
            {badge && (
              <div className={`${badge.color} text-white text-center py-2 text-sm font-medium`}>
                {badge.label}
              </div>
            )}

            {/* Product Image */}
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-center text-brand-900/30">
                  <svg className="w-12 h-12 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-xs">Product Image</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-brand-900 mb-1">{product.name}</h3>
              <p className="text-sm text-brand-900/60 mb-3">{product.brand}</p>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-brand-900">${product.price}</span>
                <span className="text-sm text-brand-900/50">{product.testCount} tests</span>
              </div>

              <p className="text-sm text-brand-900/70 mb-4 line-clamp-2">
                {product.whyWeLoveIt}
              </p>

              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                Check Price
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
