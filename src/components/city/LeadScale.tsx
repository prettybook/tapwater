interface LeadScaleProps {
  value: number | null;
  actionLevel?: number;
  unit?: string;
  cityName?: string;
}

export function LeadScale({ value, actionLevel = 15, unit = 'ppb', cityName = 'This city' }: LeadScaleProps) {
  if (value === null) return null;

  const isAboveAction = value > actionLevel;
  const isNearAction = value > actionLevel * 0.75 && value <= actionLevel;
  const maxScale = actionLevel * 2;
  const position = Math.min((value / maxScale) * 100, 100);

  // Status text
  let statusText: string;
  let statusClass: string;
  if (isAboveAction) {
    statusText = 'Exceeds EPA Action Level';
    statusClass = 'text-danger';
  } else if (isNearAction) {
    statusText = 'Approaching EPA Limit';
    statusClass = 'text-warning';
  } else {
    statusText = 'Below EPA Action Level';
    statusClass = 'text-safe';
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-gray-50 rounded-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-brand-900/50 mb-1">90th Percentile Lead Level</p>
            <p className="text-3xl font-bold text-brand-900">
              {value} <span className="text-lg font-normal text-brand-900/50">{unit}</span>
            </p>
          </div>
          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
            isAboveAction
              ? 'bg-danger-light text-danger-text'
              : isNearAction
                ? 'bg-warning-light text-warning-text'
                : 'bg-safe-light text-safe-text'
          }`}>
            {statusText}
          </span>
        </div>

        {/* Visual Scale */}
        <div className="relative mb-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-safe via-warning to-danger" />
          {/* Current Value Marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${position}%` }}
          >
            <div className="w-4 h-4 -ml-2 rounded-full bg-brand-900 border-2 border-white shadow" />
          </div>
          {/* EPA Limit Marker */}
          <div
            className="absolute top-0 h-2"
            style={{ left: '50%' }}
          >
            <div className="w-0.5 h-full bg-brand-900/40" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-brand-900/40">
          <span>0</span>
          <span>EPA Limit ({actionLevel})</span>
          <span>{maxScale}+</span>
        </div>
      </div>

      {/* Interpretation */}
      <div className={`border-l-4 pl-4 py-2 ${
        isAboveAction ? 'border-danger' : isNearAction ? 'border-warning' : 'border-safe'
      }`}>
        <p className={`font-medium ${statusClass}`}>
          {isAboveAction
            ? `${cityName} water exceeds the EPA action level for lead.`
            : isNearAction
              ? `${cityName} lead levels are safe but approaching the EPA limit.`
              : `${cityName} lead levels are well within safe limits.`
          }
        </p>
        <p className="text-sm text-brand-900/60 mt-1">
          {isAboveAction
            ? 'A certified lead-removal filter is strongly recommended, especially for homes with young children or pregnant women.'
            : isNearAction
              ? 'While within limits, consider a filter if you have young children or want extra protection.'
              : 'Regular testing is still recommended, as lead can enter water through household plumbing.'
          }
        </p>
      </div>
    </div>
  );
}

// Lead Info Component
export function LeadInfo() {
  return (
    <div className="space-y-6">
      {/* What is Lead */}
      <div>
        <h4 className="font-semibold text-brand-900 mb-2">What is Lead in Water?</h4>
        <p className="text-sm text-brand-900/70 leading-relaxed">
          Lead is a toxic metal that can dissolve into drinking water from older pipes, solder, and fixtures.
          It&apos;s invisible, tasteless, and odorless, making testing the only way to detect it. The EPA has
          set an action level of 15 ppb, though they emphasize there is no safe level of lead exposure.
        </p>
      </div>

      {/* Health Effects */}
      <div>
        <h4 className="font-semibold text-brand-900 mb-3">Potential Health Effects</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-medium text-sm text-brand-900">Children</span>
            </div>
            <p className="text-xs text-brand-900/60">
              Developmental delays, learning difficulties, lower IQ, behavioral issues
            </p>
          </div>
          <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium text-sm text-brand-900">Adults</span>
            </div>
            <p className="text-xs text-brand-900/60">
              High blood pressure, kidney damage, reproductive issues
            </p>
          </div>
        </div>
      </div>

      {/* Protection Tips */}
      <div>
        <h4 className="font-semibold text-brand-900 mb-3">How to Reduce Exposure</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-brand-900/70">
            <span className="text-brand-600 mt-0.5">•</span>
            Run water for 30 seconds to 2 minutes before drinking, especially in the morning
          </li>
          <li className="flex items-start gap-2 text-sm text-brand-900/70">
            <span className="text-brand-600 mt-0.5">•</span>
            Use cold water for cooking and drinking (hot water dissolves more lead)
          </li>
          <li className="flex items-start gap-2 text-sm text-brand-900/70">
            <span className="text-brand-600 mt-0.5">•</span>
            Install a NSF-certified filter designed to remove lead
          </li>
          <li className="flex items-start gap-2 text-sm text-brand-900/70">
            <span className="text-brand-600 mt-0.5">•</span>
            Test your water, especially if your home was built before 1986
          </li>
        </ul>
      </div>
    </div>
  );
}
