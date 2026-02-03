'use client';

import { useEffect, useState } from 'react';
import { SafetyVerdict } from '@/lib/data/types';

interface WaterQualityGaugeProps {
  verdict: SafetyVerdict;
  cityName: string;
  hardnessGpg?: number;
}

const verdictConfig = {
  safe: {
    label: 'Safe to Drink',
    grade: 'A',
    color: '#4ade80',
    bgColor: 'rgba(74, 222, 128, 0.15)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    description: 'Meets all EPA standards',
  },
  'generally-safe': {
    label: 'Generally Safe',
    grade: 'B',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.15)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    description: 'Minor compliance issues',
  },
  concerns: {
    label: 'Some Concerns',
    grade: 'C',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.15)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    description: 'Monitor recommended',
  },
  unsafe: {
    label: 'Action Needed',
    grade: 'D',
    color: '#f87171',
    bgColor: 'rgba(248, 113, 113, 0.15)',
    borderColor: 'rgba(248, 113, 113, 0.3)',
    description: 'Quality issues detected',
  },
};

export function WaterQualityGauge({ verdict, hardnessGpg }: WaterQualityGaugeProps) {
  const config = verdictConfig[verdict];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Clean Badge */}
      <div
        className="w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: config.bgColor,
          border: `2px solid ${config.borderColor}`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        <span
          className="text-7xl font-bold transition-all duration-500 delay-150"
          style={{
            color: config.color,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {config.grade}
        </span>
      </div>

      {/* Label */}
      <div
        className="text-center mt-5 transition-all duration-500 delay-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        <p className="font-semibold text-lg text-white">
          {config.label}
        </p>
        <p className="text-white/50 text-sm mt-1">
          {config.description}
        </p>
        {hardnessGpg !== undefined && (
          <p className="text-white/40 text-xs mt-2">
            {hardnessGpg} GPG hardness
          </p>
        )}
      </div>
    </div>
  );
}
