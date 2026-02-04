import type { WaterQualitySource } from '@/lib/data/municipal-types';

interface DataSourceBadgeProps {
  source: WaterQualitySource;
}

export function DataSourceBadge({ source }: DataSourceBadgeProps) {
  if (source.type === 'municipal') {
    return (
      <p className="text-xs text-gray-500">
        Data source: {source.sourceName} ({source.dataYear})
        {source.sourceUrl && (
          <>
            {' '}
            •{' '}
            <a
              href={source.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              View report
            </a>
          </>
        )}
      </p>
    );
  }

  return (
    <p className="text-xs text-gray-500">
      Data source: EPA Water Quality Portal (environmental samples, not verified
      tap water)
    </p>
  );
}
