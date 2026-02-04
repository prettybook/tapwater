import type {
  EnhancedHardness,
  WaterQualitySource,
} from '@/lib/data/municipal-types';

interface EnhancedHardnessCardProps {
  hardness: EnhancedHardness | null;
  source: WaterQualitySource;
}

export function EnhancedHardnessCard({
  hardness,
  source,
}: EnhancedHardnessCardProps) {
  if (!hardness || !hardness.value) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600">No hardness data available</p>
      </div>
    );
  }

  // Calculate percentage for progress bar (max 500 ppm)
  const percentage = Math.min((hardness.value / 500) * 100, 100);

  // Color based on classification
  const colorMap = {
    Soft: {
      text: 'text-blue-600',
      bg: 'bg-blue-500',
      light: 'bg-blue-100',
    },
    Moderate: {
      text: 'text-green-600',
      bg: 'bg-green-500',
      light: 'bg-green-100',
    },
    Hard: {
      text: 'text-orange-600',
      bg: 'bg-orange-500',
      light: 'bg-orange-100',
    },
    'Very Hard': {
      text: 'text-red-600',
      bg: 'bg-red-500',
      light: 'bg-red-100',
    },
  };

  const colors =
    colorMap[hardness.classification as keyof typeof colorMap] ||
    colorMap.Soft;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Water Hardness
      </h2>

      {/* Main Value */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl font-bold text-gray-900">
            {hardness.value}
          </span>
          <span className="text-lg text-gray-600">{hardness.unit}</span>
          <span className={`text-lg font-medium ${colors.text}`}>
            • {hardness.classification}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 {hardness.unit}</span>
          <span>500 {hardness.unit}</span>
        </div>
      </div>

      {/* Range (if available) */}
      {hardness.range && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Range:</span>
            <span className="text-sm font-medium text-gray-900">
              {hardness.range[0]} - {hardness.range[1]} {hardness.unit}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Water hardness can vary throughout the year
          </p>
        </div>
      )}

      {/* Sample Info */}
      <div className="flex gap-4 text-sm text-gray-600 mb-4">
        {hardness.sampleCount && (
          <div>
            <span className="font-medium">{hardness.sampleCount}</span> samples
          </div>
        )}
        {hardness.isNeighborEstimate && (
          <div className="flex items-center gap-1">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Neighbor estimate</span>
          </div>
        )}
      </div>

      {/* Classification Guide */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Classification:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 rounded-full" />
            <span>Soft (0-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded-full" />
            <span>Moderate (61-120)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 rounded-full" />
            <span>Hard (121-180)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 rounded-full" />
            <span>Very Hard (181+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
