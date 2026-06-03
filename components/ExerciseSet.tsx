'use client';

import { useState } from 'react';
import { Exercise } from '@/types/lesson';

interface ExerciseSetProps {
  exercises: Exercise[];
  onComplete: (score: number) => void;
}

export default function ExerciseSet({ exercises, onComplete }: ExerciseSetProps) {
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (index: number, answer: string | string[]) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const checkAnswers = () => {
    let correct = 0;
    exercises.forEach((exercise, index) => {
      const userAnswer = answers[index];
      if (Array.isArray(exercise.correctAnswer)) {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.sort().join(',') === exercise.correctAnswer.sort().join(',')
        ) {
          correct++;
        }
      } else {
        if (userAnswer === exercise.correctAnswer) {
          correct++;
        }
      }
    });

    const percentage = Math.round((correct / exercises.length) * 100);
    setScore(percentage);
    setShowResults(true);
    onComplete(percentage);
  };

  const resetExercises = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className={`border rounded-lg p-4 ${
            showResults
              ? checkAnswer(exercise, answers[index])
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-start space-x-2 mb-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="text-gray-800 font-medium mb-2">{exercise.question}</p>
              <p className="text-xs text-gray-500 mb-3">
                Type: {formatExerciseType(exercise.type)}
              </p>

              {renderExerciseInput(exercise, index, answers[index], handleAnswerChange, showResults)}

              {showResults && (
                <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {checkAnswer(exercise, answers[index]) ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Correct answer:</span>{' '}
                    {Array.isArray(exercise.correctAnswer)
                      ? exercise.correctAnswer.join(', ')
                      : exercise.correctAnswer}
                  </p>
                  {exercise.explanation && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Explanation:</span> {exercise.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-4">
        {showResults ? (
          <>
            <div className="flex items-center space-x-4">
              <div className="text-lg font-bold text-gray-800">
                Score: {score}%
              </div>
              {score >= 80 && (
                <span className="text-2xl">🎉</span>
              )}
            </div>
            <button
              onClick={resetExercises}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </>
        ) : (
          <button
            onClick={checkAnswers}
            disabled={Object.keys(answers).length !== exercises.length}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
}

function renderExerciseInput(
  exercise: Exercise,
  index: number,
  value: string | string[] | undefined,
  onChange: (index: number, value: string | string[]) => void,
  showResults: boolean
) {
  const disabled = showResults;

  switch (exercise.type) {
    case 'fill-in-blanks':
    case 'verb-conjugation':
      return (
        <div className="space-y-2">
          {exercise.wordBank && (
            <div className="bg-gray-100 p-3 rounded mb-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Word Bank:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.wordBank.map((word, i) => (
                  <span key={i} className="px-3 py-1 bg-white rounded border border-gray-300 text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          <input
            type="text"
            value={value as string || ''}
            onChange={(e) => onChange(index, e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Enter your answer..."
          />
        </div>
      );

    case 'context-selection':
    case 'code-debugging':
    case 'case-selection':
      return (
        <div className="space-y-2">
          {exercise.options?.map((option, i) => (
            <label
              key={i}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                value === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <input
                type="radio"
                name={`exercise-${index}`}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(index, e.target.value)}
                disabled={disabled}
                className="mr-3"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      );

    case 'sentence-reordering':
      return <SentenceReordering exercise={exercise} value={value as string[] || []} onChange={(v) => onChange(index, v)} disabled={disabled} />;

    case 'matching':
      return <MatchingExercise exercise={exercise} value={value as string[] || []} onChange={(v) => onChange(index, v)} disabled={disabled} />;

    case 'code-switching':
      return (
        <div className="space-y-2">
          {exercise.wordBank && (
            <div className="bg-gray-100 p-3 rounded mb-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Word Bank:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.wordBank.map((word, i) => (
                  <span key={i} className="px-3 py-1 bg-white rounded border border-gray-300 text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          <textarea
            value={value as string || ''}
            onChange={(e) => onChange(index, e.target.value)}
            disabled={disabled}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Complete the sentence..."
          />
        </div>
      );

    default:
      return null;
  }
}

function checkAnswer(exercise: Exercise, userAnswer: string | string[] | undefined): boolean {
  if (!userAnswer) return false;

  if (Array.isArray(exercise.correctAnswer)) {
    return (
      Array.isArray(userAnswer) &&
      userAnswer.sort().join(',') === exercise.correctAnswer.sort().join(',')
    );
  }

  return userAnswer === exercise.correctAnswer;
}

function formatExerciseType(type: string): string {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
