import type { Contaminant } from '@/lib/data/municipal-types';

interface ContaminantsTableProps {
  contaminants: Contaminant[];
}

export function ContaminantsTable({ contaminants }: ContaminantsTableProps) {
  if (!contaminants || contaminants.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600">
          No contaminant data available for this location.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Only available for cities with official tap water data.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Detected Contaminants
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {contaminants.length} contaminant{contaminants.length !== 1 ? 's' : ''}{' '}
          detected
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contaminant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Water
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Limit (MCL)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contaminants.map((contaminant, index) => {
              const limit =
                contaminant.mcl ||
                contaminant.actionLevel ||
                contaminant.mrdl;
              const percentage = limit ? (contaminant.value / limit) * 100 : 0;

              // Determine status color
              let statusColor = 'text-green-600';
              let statusBg = 'bg-green-100';
              let statusText = 'Safe';

              if (contaminant.exceedsMCL) {
                statusColor = 'text-red-600';
                statusBg = 'bg-red-100';
                statusText = 'Exceeds';
              } else if (percentage > 50) {
                statusColor = 'text-amber-600';
                statusBg = 'bg-amber-100';
                statusText = 'Caution';
              }

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contaminant.name}
                      </div>
                      {contaminant.percentile && (
                        <div className="text-xs text-gray-500">
                          {contaminant.percentile}th percentile
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {contaminant.value} {contaminant.unit}
                    </div>
                    {contaminant.range && (
                      <div className="text-xs text-gray-500">
                        Range: {contaminant.range[0]}-{contaminant.range[1]}
                      </div>
                    )}
                    {contaminant.note && (
                      <div className="text-xs text-gray-500 italic mt-1">
                        {contaminant.note}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {limit ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {limit} {contaminant.unit}
                        </div>
                        {(contaminant.phg || contaminant.mclg) && (
                          <div className="text-xs text-gray-500">
                            Goal: {contaminant.phg || contaminant.mclg}{' '}
                            {contaminant.unit}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}
                    >
                      {statusText}
                    </span>
                    {limit && percentage > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {percentage.toFixed(0)}% of limit
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded-full" />
            <span>Safe: Below 50% of limit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-100 rounded-full" />
            <span>Caution: 50-100% of limit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 rounded-full" />
            <span>Exceeds: Above legal limit</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          MCL = Maximum Contaminant Level (EPA legal limit)
        </p>
      </div>
    </div>
  );
}
