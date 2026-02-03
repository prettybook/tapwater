import { Product } from '@/lib/products/water-test-kits';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
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

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-warning'
                : i === fullStars && hasHalfStar
                  ? 'text-warning'
                  : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-brand-900/60">
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  );
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const badge = product.badge ? badgeConfig[product.badge] : null;

  if (featured) {
    return (
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:border-brand-400 transition-colors">
        {/* Badge */}
        {badge && (
          <div className={`${badge.color} text-white text-center py-2 text-sm font-medium`}>
            {badge.label}
          </div>
        )}

        <div className="p-6">
          {/* Product Image Placeholder */}
          <div className="aspect-square bg-brand-50 mb-4 flex items-center justify-center">
            <div className="text-center text-brand-900/30">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-xs">Product Image</span>
            </div>
          </div>

          {/* Brand & Name */}
          <p className="text-xs text-brand-600 font-medium uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="font-bold text-brand-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-2xl font-bold text-brand-900 mb-2">
            ${product.price}
          </p>

          {/* Rating */}
          <StarRating rating={product.rating} reviews={product.reviews} />

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-900/60">Tests</span>
              <span className="font-medium text-brand-900">{product.testCount} contaminants</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-900/60">Results</span>
              <span className="font-medium text-brand-900">{product.turnaround}</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn-primary mt-4 w-full inline-flex items-center justify-center gap-2"
          >
            Check Price
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Full Product Review Card
  return (
    <div id={product.id} className="bg-white border border-gray-200 rounded-md overflow-hidden scroll-mt-24">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 bg-brand-50/50">
        <div className="flex flex-wrap items-center gap-3">
          {badge && (
            <span className={`${badge.color} text-white text-xs font-medium px-3 py-1`}>
              {badge.label}
            </span>
          )}
          <span className={`text-xs font-mono uppercase tracking-wider px-2 py-1 ${
            product.category === 'lab' ? 'bg-purple-100 text-purple-700' :
            product.category === 'diy' ? 'bg-info-light text-info-text' :
            'bg-warning-light text-warning-text'
          }`}>
            {product.category === 'lab' ? 'Lab Test' : product.category === 'diy' ? 'DIY Kit' : 'Specialized'}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-brand-900 mt-3">
          {product.name}
        </h2>
        <p className="text-brand-900/60 mt-1">by {product.brand}</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + Quick Stats */}
          <div>
            {/* Product Image Placeholder */}
            <div className="aspect-square bg-brand-50 mb-4 flex items-center justify-center">
              <div className="text-center text-brand-900/30">
                <svg className="w-20 h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-sm">Product Image</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-brand-50 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-brand-900/60">Price</span>
                <span className="font-bold text-brand-900">${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-900/60">Tests</span>
                <span className="font-medium text-brand-900">{product.testCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-900/60">Results</span>
                <span className="font-medium text-brand-900">{product.turnaround}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-900/60">Best For</span>
                <span className="font-medium text-brand-900 text-right text-sm">{product.bestFor}</span>
              </div>
              <div className="pt-2 border-t border-brand-200">
                <StarRating rating={product.rating} reviews={product.reviews} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-4 space-y-2">
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                Check Price on Amazon
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              {product.buyUrl && (
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn btn-outline w-full inline-flex items-center justify-center gap-2"
                >
                  Buy Direct
                </a>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why We Love It */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-brand-600 mb-2">
                Why We Love It
              </h3>
              <p className="text-lg text-brand-900/80 leading-relaxed">
                {product.whyWeLoveIt}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-safe-light p-4">
                <h4 className="font-semibold text-safe-text mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pros
                </h4>
                <ul className="space-y-2">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-safe-text">
                      <span className="text-safe mt-0.5">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-danger-light p-4">
                <h4 className="font-semibold text-danger-text mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Cons
                </h4>
                <ul className="space-y-2">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-danger-text">
                      <span className="text-danger mt-0.5">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-gray-100 p-5">
              <h4 className="font-semibold text-brand-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Our Verdict
              </h4>
              <p className="text-brand-900/70 leading-relaxed">
                {product.verdict}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
