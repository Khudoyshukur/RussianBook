'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { phases } from '@/lib/phases';
import { getProgress } from '@/lib/progress';
import ProgressTracker from '@/components/ProgressTracker';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    setCurrentDay(progress.currentDay);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Russian for Software Engineers
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            A 90-Day Targeted Immersive Reader
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Master technical Russian through engaging stories, real workplace scenarios,
            and systematic grammar progression designed specifically for developers.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {mounted && (
            <Link
              href={`/lesson/${currentDay}`}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Continue to Day {currentDay} →
            </Link>
          )}
          <Link
            href="/lessons"
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-blue-600"
          >
            Browse All Lessons
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <ProgressTracker />
        </div>

        {/* Course Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🎯 What You'll Learn
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Technical vocabulary for software development</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Workplace communication and agile terminology</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Russian case system in natural context</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reading comprehension through engaging stories</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                ⚡ Key Features
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Progressive difficulty from A2 to B2</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Interactive exercises with instant feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Spaced repetition vocabulary system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Real workplace scenarios and storytelling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Phases */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Phases</h2>
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div
                key={phase.phase}
                className="border-l-4 border-blue-500 pl-6 hover:bg-blue-50 transition-colors rounded-r-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Phase {phase.phase}: {phase.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    Days {phase.dayRange[0]}–{phase.dayRange[1]}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{phase.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">
                      📌 Focus Areas:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.focusAreas.map((area, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">
                      📝 Grammar Topics:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.grammarTopics.map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          {mounted && (
            <Link
              href={`/lesson/${currentDay}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105"
            >
              Start Learning Today →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
