'use client';

import { useEffect, useState } from 'react';
import { getProgress, getCompletionPercentage } from '@/lib/progress';
import { phases, getPhaseProgress } from '@/lib/phases';

export default function ProgressTracker() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(getProgress());
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const prog = getProgress();
    setProgress(prog);
    setOverallProgress(getCompletionPercentage());
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
        <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progress.completedDays.length} of 90 days completed
        </p>
      </div>

      <div className="space-y-3">
        {phases.map((phase) => {
          const phaseProgress = getPhaseProgress(progress.completedDays, phase);
          const isCurrentPhase =
            progress.currentDay >= phase.dayRange[0] &&
            progress.currentDay <= phase.dayRange[1];

          return (
            <div
              key={phase.phase}
              className={`border rounded-lg p-3 transition-all ${
                isCurrentPhase
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-800">
                  Phase {phase.phase}: {phase.title}
                </h3>
                <span className="text-xs font-medium text-gray-600">
                  {phaseProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrentPhase
                      ? 'bg-blue-500'
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Days {phase.dayRange[0]}–{phase.dayRange[1]}
              </p>
            </div>
          );
        })}
      </div>

      {progress.completedDays.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Last access:{' '}
            <span className="font-medium">
              {new Date(progress.lastAccessDate).toLocaleDateString()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
