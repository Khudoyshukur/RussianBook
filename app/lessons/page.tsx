'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllLessons } from '@/lib/lessons';
import { getProgress, isDayCompleted } from '@/lib/progress';
import { getPhaseByDay } from '@/lib/phases';
import { Lesson } from '@/types/lesson';
import { TEST_MODE } from '@/lib/config';

export default function AllLessonsPage() {
  const [mounted, setMounted] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setLessons(getAllLessons());
    const progress = getProgress();
    setCurrentDay(progress.currentDay);
    setCompletedDays(progress.completedDays);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const groupedByPhase = lessons.reduce((acc, lesson) => {
    const phase = lesson.phase;
    if (!acc[phase]) {
      acc[phase] = [];
    }
    acc[phase].push(lesson);
    return acc;
  }, {} as Record<number, Lesson[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Lessons</h1>
          <p className="text-gray-600">
            Browse all 90 days of your Russian learning journey
          </p>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <span className="text-gray-700">Locked</span>
            </div>
          </div>
        </div>

        {/* Lessons by Phase */}
        {Object.keys(groupedByPhase)
          .map(Number)
          .sort()
          .map((phaseNum) => {
            const phaseLessons = groupedByPhase[phaseNum];
            const phaseInfo = getPhaseByDay(phaseLessons[0].day);

            return (
              <div key={phaseNum} className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-6 mb-4 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Phase {phaseNum}: {phaseInfo.title}
                  </h2>
                  <p className="text-blue-100">{phaseInfo.description}</p>
                  <div className="mt-3 text-sm text-blue-100">
                    Days {phaseInfo.dayRange[0]}–{phaseInfo.dayRange[1]}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phaseLessons.map((lesson) => {
                    const completed = isDayCompleted(lesson.day);
                    const isCurrent = lesson.day === currentDay;
                    const isLocked = TEST_MODE ? false : lesson.day > currentDay;

                    return (
                      <Link
                        key={lesson.day}
                        href={isLocked ? '#' : `/lesson/${lesson.day}`}
                        className={`block bg-white rounded-lg shadow hover:shadow-lg transition-all p-5 border-2 ${
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
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
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
                              className="w-5 h-5 text-gray-400"
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

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {lesson.title}
                        </h3>

                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            {lesson.difficultyLevel}
                          </span>
                          <span className="text-xs text-gray-500">
                            {lesson.wordCount} words
                          </span>
                        </div>

                        {lesson.storyArc && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {lesson.storyArc}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* Coming Soon Placeholder */}
        {lessons.length < 90 && (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              More Lessons Coming Soon!
            </h3>
            <p className="text-gray-600">
              Days {lessons.length + 1}–90 are currently being developed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
