'use client';

interface FactCardProps {
  title: string;
  subtitle?: string;
  value: string;
  unit?: string;
  description?: string;
  status: 'good' | 'warning' | 'danger' | 'info';
  filterEffectiveness?: 'high' | 'moderate' | 'low';
  variant?: 'default' | 'featured';
}

const statusConfig = {
  good: {
    badge: 'text-safe-text bg-safe-light',
    icon: 'text-safe',
  },
  warning: {
    badge: 'text-warning-text bg-warning-light',
    icon: 'text-warning',
  },
  danger: {
    badge: 'text-danger-text bg-danger-light',
    icon: 'text-danger',
  },
  info: {
    badge: 'text-info-text bg-info-light',
    icon: 'text-info',
  },
};

const filterLabels = {
  high: 'High filter effectiveness',
  moderate: 'Moderate filter effectiveness',
  low: 'Low filter effectiveness',
};

export function FactCard({
  title,
  subtitle,
  value,
  unit,
  description,
  status,
  filterEffectiveness,
  variant = 'default',
}: FactCardProps) {
  const config = statusConfig[status];

  if (variant === 'featured') {
    // Featured card with dark background (like PFAS in wireframe)
    return (
      <div className="relative bg-brand-900 rounded-md p-6 overflow-hidden">
        {/* Decorative bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full" />
          <div className="absolute bottom-8 right-12 w-12 h-12 bg-white/5 rounded-full" />
          <div className="absolute top-16 right-20 w-8 h-8 bg-white/5 rounded-full" />
        </div>

        <div className="relative">
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-white/60 text-sm mb-4">{subtitle}</p>
          )}

          {filterEffectiveness && (
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-safe" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white/80 text-sm">{filterLabels[filterEffectiveness]}</span>
            </div>
          )}

          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {description}
          </p>

          <button className="text-brand-100 text-sm font-medium hover:text-white transition-colors">
            Learn more
          </button>
        </div>
      </div>
    );
  }

  // Default white card variant
  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
        {subtitle && (
          <p className={`text-sm mt-1 ${config.badge} inline-block px-2 py-0.5 rounded`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="mb-4">
        <span className={`text-4xl font-bold ${config.icon}`}>{value}</span>
        {unit && (
          <span className="text-sm text-brand-900/50 ml-2">{unit}</span>
        )}
      </div>

      {filterEffectiveness && (
        <div className="flex items-center gap-2 mb-4">
          <svg className={`w-4 h-4 ${filterEffectiveness === 'high' ? 'text-safe' : filterEffectiveness === 'moderate' ? 'text-warning' : 'text-danger'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-brand-900/70 text-sm">{filterLabels[filterEffectiveness]}</span>
        </div>
      )}

      {description && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-brand-900/50">{description}</span>
          </div>
        </div>
      )}

      <button className="mt-4 text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors">
        Learn more
      </button>
    </div>
  );
}

// Simpler stat card for the fact row
interface QuickFactCardProps {
  label: string;
  value: string;
  subvalue?: string;
  status: 'good' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
}

const quickStatusColors = {
  good: 'text-safe',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  neutral: 'text-brand-900',
};

export function QuickFactCard({ label, value, subvalue, status, icon }: QuickFactCardProps) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-brand-900/60 font-medium">{label}</span>
        {icon && <span className="text-brand-900/30">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${quickStatusColors[status]}`}>{value}</p>
      {subvalue && (
        <p className="text-sm text-brand-900/50 mt-1">{subvalue}</p>
      )}
    </div>
  );
}
