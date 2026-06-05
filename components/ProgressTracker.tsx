'use client';

import { useEffect, useState } from 'react';
import { getProgress } from '@/lib/progress';
import { TEST_MODE } from '@/lib/config';
import Link from 'next/link';

export default function ProgressTracker() {
  const [mounted, setMounted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    setCurrentDay(progress.currentDay);
  }, []);

  if (!mounted) {
    return null;
  }

  const nextDay = currentDay + 1;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Continue Your Journey</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Current Day Card */}
        <Link
          href={`/lesson/${currentDay}`}
          className="bg-white rounded-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-blue-600">CURRENT</span>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              {currentDay}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Day {currentDay}</h3>
          <p className="text-blue-600 text-sm font-medium">Continue learning →</p>
        </Link>

        {/* Next Day Card - locked in production mode, unlocked in test mode */}
        {nextDay <= 90 && (
          TEST_MODE ? (
            <Link
              href={`/lesson/${nextDay}`}
              className="bg-white bg-opacity-90 rounded-lg p-6 hover:bg-opacity-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-purple-600">UP NEXT</span>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  {nextDay}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Day {nextDay}</h3>
              <p className="text-purple-600 text-sm font-medium">Preview next lesson →</p>
            </Link>
          ) : (
            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 cursor-not-allowed relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-600">UP NEXT</span>
                <div className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold border-2 border-gray-400">
                  {nextDay}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Day {nextDay}</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm font-bold">Complete current day to unlock</p>
                <span className="text-2xl">🔒</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
