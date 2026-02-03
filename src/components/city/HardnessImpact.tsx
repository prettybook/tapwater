import { HardnessClassification } from '@/lib/data/types';

interface HardnessImpactProps {
  classification: HardnessClassification | null;
}

const moderateImpact = {
  shower: { severity: 'low', text: 'Minor dryness possible' },
  kitchen: { severity: 'low', text: 'Some water spots' },
  laundry: { severity: 'low', text: 'May need more detergent' },
  appliances: { severity: 'low', text: 'Minimal scale' },
};

const impactData: Record<string, typeof moderateImpact> = {
  Soft: {
    shower: { severity: 'none', text: 'Great for skin & hair' },
    kitchen: { severity: 'none', text: 'No water spots' },
    laundry: { severity: 'none', text: 'Clothes stay soft' },
    appliances: { severity: 'none', text: 'No scale buildup' },
  },
  'Moderately Hard': moderateImpact,
  'Moderate': moderateImpact, // Alias for data compatibility
  Hard: {
    shower: { severity: 'medium', text: 'May dry out skin & hair' },
    kitchen: { severity: 'medium', text: 'Spots on dishes' },
    laundry: { severity: 'medium', text: 'Clothes may feel stiff' },
    appliances: { severity: 'medium', text: 'Scale buildup' },
  },
  'Very Hard': {
    shower: { severity: 'high', text: 'Dries out skin & hair' },
    kitchen: { severity: 'high', text: 'Heavy mineral deposits' },
    laundry: { severity: 'high', text: 'Stiff, dingy clothes' },
    appliances: { severity: 'high', text: 'Significant scale' },
  },
};

const icons = {
  shower: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  ),
  kitchen: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  laundry: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  appliances: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const labels = {
  shower: 'Shower',
  kitchen: 'Kitchen',
  laundry: 'Laundry',
  appliances: 'Appliances',
};

export function HardnessImpact({ classification }: HardnessImpactProps) {
  if (!classification) return null;

  const impacts = impactData[classification] || impactData['Moderate'];
  if (!impacts) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {(Object.keys(impacts) as Array<keyof typeof impacts>).map((key) => {
        const impact = impacts[key];

        return (
          <div
            key={key}
            className="bg-gray-50 rounded-md p-4"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-brand-600">
                {icons[key]}
              </span>
              <p className="font-medium text-sm text-brand-900">{labels[key]}</p>
            </div>
            <p className="text-xs text-brand-900/60 pl-8">{impact.text}</p>
          </div>
        );
      })}
    </div>
  );
}

interface HardnessComparisonProps {
  cityName: string;
  cityValue: number;
  stateValue?: number;
  stateName?: string;
  usAverage?: number;
}

export function HardnessComparison({
  cityName,
  cityValue,
  stateValue = 120,
  stateName = 'State',
  usAverage = 100,
}: HardnessComparisonProps) {
  const maxValue = Math.max(cityValue, stateValue, usAverage, 200);

  const getBarWidth = (value: number) => `${(value / maxValue) * 100}%`;

  return (
    <div className="space-y-3">
      {/* City */}
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-brand-900 font-medium truncate">{cityName}</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500"
            style={{ width: getBarWidth(cityValue) }}
          />
        </div>
        <span className="w-16 text-sm text-brand-900 font-medium text-right">{cityValue}</span>
      </div>

      {/* State */}
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-brand-900/50 truncate">{stateName}</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-300 rounded-full transition-all duration-500"
            style={{ width: getBarWidth(stateValue) }}
          />
        </div>
        <span className="w-16 text-sm text-brand-900/50 text-right">{stateValue}</span>
      </div>

      {/* US Average */}
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-brand-900/50 truncate">US Average</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-200 rounded-full transition-all duration-500"
            style={{ width: getBarWidth(usAverage) }}
          />
        </div>
        <span className="w-16 text-sm text-brand-900/50 text-right">{usAverage}</span>
      </div>
    </div>
  );
}
