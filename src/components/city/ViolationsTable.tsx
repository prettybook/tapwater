import { ViolationSummary } from '@/lib/data/types';

interface ViolationsTableProps {
  violations: ViolationSummary;
  hasActiveViolations: boolean;
  cityName: string;
  epaUrl?: string | null;
}

export function ViolationsTable({
  violations,
  hasActiveViolations,
  cityName,
  epaUrl,
}: ViolationsTableProps) {
  // Determine the overall status and recommendation
  const getStatus = () => {
    if (hasActiveViolations && violations.healthBased > 0) {
      return {
        level: 'critical',
        title: 'Action Recommended',
        subtitle: 'Active health-based violations detected',
        recommendation: 'Consider using a certified water filter until violations are resolved. Contact your utility for updates on corrective actions.',
        borderColor: 'border-danger',
        bgColor: 'bg-danger-light',
        textColor: 'text-danger-text',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
      };
    }
    if (hasActiveViolations) {
      return {
        level: 'notice',
        title: 'Active Violations',
        subtitle: 'Administrative issues pending',
        recommendation: 'Current violations are administrative or monitoring-related. Water quality is not immediately affected, but stay informed about utility updates.',
        borderColor: 'border-brand-300',
        bgColor: 'bg-brand-50',
        textColor: 'text-brand-700',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      };
    }
    if (violations.healthBased > 0) {
      return {
        level: 'resolved',
        title: 'Past Issues Resolved',
        subtitle: 'Previous health violations now corrected',
        recommendation: 'Past health-based violations have been addressed. No current action needed, but consider periodic testing for peace of mind.',
        borderColor: 'border-info',
        bgColor: 'bg-info-light',
        textColor: 'text-info-text',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      };
    }
    if (violations.total > 0) {
      return {
        level: 'minor',
        title: 'Good Standing',
        subtitle: 'Only minor violations on record',
        recommendation: 'Past violations were administrative (missed paperwork or testing deadlines) and did not affect water quality. No action needed.',
        borderColor: 'border-safe',
        bgColor: 'bg-safe-light',
        textColor: 'text-safe-text',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      };
    }
    return {
      level: 'excellent',
      title: 'Excellent Record',
      subtitle: 'No violations in past 3 years',
      recommendation: 'This utility has maintained full EPA compliance. No action needed, but regular home testing is still recommended.',
      borderColor: 'border-safe',
      bgColor: 'bg-safe-light',
      textColor: 'text-safe-text',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
  };

  const status = getStatus();

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`${status.bgColor} rounded-md p-5 border-l-4 ${status.borderColor}`}>
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 ${status.textColor}`}>
            {status.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h4 className={`font-semibold ${status.textColor}`}>{status.title}</h4>
              <span className={`text-xs ${status.textColor} opacity-70`}>
                {status.subtitle}
              </span>
            </div>
            <p className={`text-sm ${status.textColor} opacity-80`}>
              {status.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Violation Breakdown */}
      <div className="bg-gray-50 rounded-md p-5">
        <h4 className="text-sm font-semibold text-brand-900 mb-4">3-Year Violation Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          {/* Total */}
          <div className="text-center">
            <p className={`text-3xl font-bold ${
              violations.total === 0 ? 'text-safe' : violations.healthBased > 0 ? 'text-danger' : 'text-warning'
            }`}>
              {violations.total}
            </p>
            <p className="text-xs text-brand-900/60 mt-1">Total Violations</p>
          </div>

          {/* Health-Based */}
          <div className="text-center border-x border-gray-200">
            <p className={`text-3xl font-bold ${violations.healthBased === 0 ? 'text-safe' : 'text-danger'}`}>
              {violations.healthBased}
            </p>
            <p className="text-xs text-brand-900/60 mt-1">Health-Related</p>
          </div>

          {/* Administrative */}
          <div className="text-center">
            <p className={`text-3xl font-bold ${
              violations.total - violations.healthBased === 0 ? 'text-safe' : 'text-warning'
            }`}>
              {violations.total - violations.healthBased}
            </p>
            <p className="text-xs text-brand-900/60 mt-1">Administrative</p>
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full ${hasActiveViolations ? 'bg-danger animate-pulse' : 'bg-safe'}`} />
          <span className="text-sm text-brand-900/70">
            {hasActiveViolations ? 'Active violations pending resolution' : 'All past violations resolved'}
          </span>
        </div>
      </div>

      {/* What This Means */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-md p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-danger/10 flex items-center justify-center flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-danger" />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-900">Health-Related Violations</p>
              <p className="text-xs text-brand-900/60 mt-1">
                Contaminant exceeded EPA safety limits. May require filter or alternative water source.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-brand-100 flex items-center justify-center flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-900">Administrative Violations</p>
              <p className="text-xs text-brand-900/60 mt-1">
                Missed testing deadlines or reporting. Does not indicate water quality issues.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EPA Link */}
      {epaUrl && (
        <div className="text-center">
          <a
            href={epaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-md text-sm font-medium transition-colors"
          >
            <span>View Full EPA Compliance Report for {cityName}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
