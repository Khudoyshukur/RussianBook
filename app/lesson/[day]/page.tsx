'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLesson, getNextLesson, getPreviousLesson } from '@/lib/lessons';
import { markDayCompleted, updateExerciseScore, isDayCompleted, getProgress } from '@/lib/progress';
import { TEST_MODE } from '@/lib/config';
import { Lesson } from '@/types/lesson';
import CollapsibleSection from '@/components/CollapsibleSection';
import ExerciseSet from '@/components/ExerciseSet';
import AiChat from '@/components/AiChat';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const day = Number(params.day);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lessonData = getLesson(day);
    setLesson(lessonData);
    setCompleted(isDayCompleted(day));

    if (!lessonData) {
      // Redirect to home if lesson doesn't exist
      router.push('/');
    }
  }, [day, router]);

  if (!mounted || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleComplete = () => {
    markDayCompleted(day);
    setCompleted(true);
  };

  const handleExerciseComplete = (score: number) => {
    updateExerciseScore(day, score);
  };

  const nextLesson = getNextLesson(day);
  const previousLesson = getPreviousLesson(day);

  // Check if next lesson is unlocked
  const progress = getProgress();
  const isNextLessonUnlocked = TEST_MODE || (nextLesson && nextLesson.day <= progress.currentDay);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lesson-page-content max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  Day {lesson.day}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                  Phase {lesson.phase}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {lesson.difficultyLevel}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            </div>
            {completed && (
              <span className="text-4xl">✓</span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>📖 {lesson.wordCount} words</span>
            <span>⏱️ ~{lesson.estimatedMinutes} min</span>
          </div>
        </div>

        {/* Story Arc */}
        {lesson.storyArc && (
          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 mb-6 rounded">
            <p className="text-sm text-blue-900 font-medium">
              <span className="font-bold">Story:</span> {lesson.storyArc}
            </p>
          </div>
        )}

        {/* Main Text */}
        <CollapsibleSection title="📖 The Text (Текст)" defaultOpen={true} icon="">
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div
                className="text-lg leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: lesson.textRussian }}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Translation */}
        <CollapsibleSection title="🔄 Translation (Перевод)" icon="">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{lesson.textEnglish}</p>
          </div>
        </CollapsibleSection>

        {/* Vocabulary */}
        <CollapsibleSection title="📚 Vocabulary (Словарный запас)" defaultOpen={true} icon="">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                    Russian
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                    English
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden md:table-cell">
                    Context
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lesson.vocabulary.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-3 sm:px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {item.russian}
                      {item.reactivatedFrom && (
                        <span className="ml-2 text-xs text-blue-600">
                          (Day {item.reactivatedFrom})
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700">{item.english}</td>
                    <td className="px-3 sm:px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{item.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile context info */}
          <div className="md:hidden mt-4 space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">Context Notes:</p>
            {lesson.vocabulary.map((item, index) => (
              item.context && (
                <div key={index} className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300">
                  <p className="font-medium text-sm text-gray-900 mb-1">{item.russian}</p>
                  <p className="text-xs text-gray-600">{item.context}</p>
                </div>
              )
            ))}
          </div>
        </CollapsibleSection>

        {/* Pronunciation */}
        {lesson.pronunciation && lesson.pronunciation.length > 0 && (
          <CollapsibleSection title="🗣️ Pronunciation Notes (Произношение)" icon="">
            <div className="space-y-4">
              {lesson.pronunciation.map((note, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-1">{note.word}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">IPA:</span> {note.ipa}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Phonetic:</span> {note.phonetic}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Common pitfall:</span> {note.pitfalls}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Cultural Insight */}
        {lesson.culturalInsight && (
          <CollapsibleSection title="🌍 Cultural Insight (Культурный контекст)" icon="">
            <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4">
              <h4 className="font-bold text-purple-900 mb-2">
                {lesson.culturalInsight.topic}
              </h4>
              <p className="text-gray-800 font-medium">{lesson.culturalInsight.content}</p>
            </div>
          </CollapsibleSection>
        )}

        {/* Exercises */}
        <CollapsibleSection title="✏️ Exercises (Упражнения)" defaultOpen={true} icon="">
          <ExerciseSet
            exercises={lesson.exercises}
            onComplete={handleExerciseComplete}
          />
        </CollapsibleSection>

        {/* Mark Complete Button */}
        {!completed && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <button
              onClick={handleComplete}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              ✓ Mark Day {day} as Completed
            </button>
          </div>
        )}

        {/* AI Tutor */}
        <AiChat lesson={lesson} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {previousLesson ? (
            <Link
              href={`/lesson/${previousLesson.day}`}
              className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>←</span>
              <span>Day {previousLesson.day}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>

          {nextLesson && isNextLessonUnlocked ? (
            <Link
              href={`/lesson/${nextLesson.day}`}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Day {nextLesson.day}</span>
              <span>→</span>
            </Link>
          ) : nextLesson ? (
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-200 border-2 border-gray-400 text-gray-600 rounded-lg cursor-not-allowed">
              <span className="font-medium">Day {nextLesson.day}</span>
              <span>🔒</span>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
