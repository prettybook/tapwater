'use client';

import { useEffect, useState } from 'react';

interface MiniBarChartProps {
  value: number;
  max: number;
  threshold?: number;
  color: 'safe' | 'warning' | 'danger' | 'info';
  label?: string;
  showThreshold?: boolean;
}

const colorClasses = {
  safe: 'bg-safe',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

export function MiniBarChart({
  value,
  max,
  threshold,
  color,
  label,
  showThreshold = true,
}: MiniBarChartProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const percentage = Math.min((value / max) * 100, 100);
      setAnimatedWidth(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [value, max]);

  const thresholdPosition = threshold ? Math.min((threshold / max) * 100, 100) : null;

  return (
    <div className="w-full">
      {label && (
        <p className="text-xs text-brand-900/50 mb-2">{label}</p>
      )}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        {/* Progress bar */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${colorClasses[color]}`}
          style={{ width: `${animatedWidth}%` }}
        />
        {/* Threshold marker */}
        {showThreshold && thresholdPosition && (
          <div
            className="absolute inset-y-0 w-0.5 bg-brand-900/30"
            style={{ left: `${thresholdPosition}%` }}
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-brand-900/50 whitespace-nowrap">
              EPA Limit
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
