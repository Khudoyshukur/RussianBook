'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { phases } from '@/lib/phases';
import { getAllLessons } from '@/lib/lessons';
import { getProgress, isDayCompleted } from '@/lib/progress';
import { Lesson } from '@/types/lesson';
import { TEST_MODE } from '@/lib/config';
import ProgressTracker from '@/components/ProgressTracker';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    setCurrentDay(progress.currentDay);
    setCompletedDays(progress.completedDays);
    setLessons(getAllLessons());
  }, []);

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseNum)
        ? prev.filter((p) => p !== phaseNum)
        : [...prev, phaseNum]
    );
  };

  const getLessonsByPhase = (phaseNum: number) => {
    return lessons.filter((lesson) => lesson.phase === phaseNum);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Russian for Software Engineers
          </h1>
          <p className="text-lg text-gray-600">
            Master technical Russian through a 90-day immersive journey
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <ProgressTracker />
        </div>

        {/* Learning Phases */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Phases</h2>
          <div className="space-y-6">
            {phases.map((phase) => {
              const phaseLessons = getLessonsByPhase(phase.phase);
              const isExpanded = expandedPhases.includes(phase.phase);

              return (
                <div
                  key={phase.phase}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Phase Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">
                        Phase {phase.phase}: {phase.title}
                      </h3>
                      <span className="px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-full">
                        Days {phase.dayRange[0]}–{phase.dayRange[1]}
                      </span>
                    </div>
                    <p className="text-blue-100 mb-4">{phase.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">📌 Focus Areas:</h4>
                        <ul className="text-sm text-blue-100 space-y-1">
                          {phase.focusAreas.map((area, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">📝 Grammar Topics:</h4>
                        <ul className="text-sm text-blue-100 space-y-1">
                          {phase.grammarTopics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => togglePhase(phase.phase)}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                    >
                      <span className="text-sm">
                        {isExpanded ? 'Hide' : 'Show'} Lessons ({phaseLessons.length})
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Expandable Lesson Cards */}
                  {isExpanded && mounted && (
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {phaseLessons.map((lesson) => {
                          const completed = isDayCompleted(lesson.day);
                          const isCurrent = lesson.day === currentDay;
                          const isLocked = TEST_MODE ? false : lesson.day > currentDay;

                          return (
                            <Link
                              key={lesson.day}
                              href={isLocked ? '#' : `/lesson/${lesson.day}`}
                              className={`block bg-white rounded-lg shadow hover:shadow-lg transition-all p-4 border-2 ${
                                completed
                                  ? 'border-green-500 bg-green-50'
                                  : isCurrent
                                  ? 'border-blue-500 bg-blue-50'
                                  : isLocked
                                  ? 'border-gray-300 opacity-60 cursor-not-allowed'
                                  : 'border-gray-200 hover:border-blue-400'
                              }`}
                              onClick={(e) => isLocked && e.preventDefault()}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                      completed
                                        ? 'bg-green-500 text-white'
                                        : isCurrent
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-gray-600'
                                    }`}
                                  >
                                    {completed ? '✓' : lesson.day}
                                  </span>
                                  <span className="text-xs font-semibold text-gray-500">
                                    Day {lesson.day}
                                  </span>
                                </div>
                                {isLocked && (
                                  <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>

                              <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                                {lesson.title}
                              </h4>

                              <div className="flex items-center space-x-2 mb-2">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                                  {lesson.difficultyLevel}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {lesson.wordCount} words
                                </span>
                              </div>

                              {lesson.storyArc && (
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {lesson.storyArc}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
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
