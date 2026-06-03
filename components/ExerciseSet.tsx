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

  // For sentence reordering, check if words are in correct order
  if (exercise.type === 'sentence-reordering') {
    if (!Array.isArray(userAnswer) || !Array.isArray(exercise.correctAnswer)) return false;
    return userAnswer.join(' ') === exercise.correctAnswer.join(' ');
  }

  // For matching, check if all pairs match correctly
  if (exercise.type === 'matching') {
    if (!Array.isArray(userAnswer) || !Array.isArray(exercise.correctAnswer)) return false;
    return userAnswer.sort().join(',') === exercise.correctAnswer.sort().join(',');
  }

  // For other array answers (multiple selection)
  if (Array.isArray(exercise.correctAnswer)) {
    return (
      Array.isArray(userAnswer) &&
      userAnswer.sort().join(',') === exercise.correctAnswer.sort().join(',')
    );
  }

  // For string answers, trim whitespace and compare
  return userAnswer.toString().trim() === exercise.correctAnswer.toString().trim();
}

function formatExerciseType(type: string): string {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Sentence Reordering Component
function SentenceReordering({
  exercise,
  value,
  onChange,
  disabled,
}: {
  exercise: Exercise;
  value: string[];
  onChange: (value: string[]) => void;
  disabled: boolean;
}) {
  const [selectedWords, setSelectedWords] = useState<string[]>(value);
  const [availableWords, setAvailableWords] = useState<string[]>(
    exercise.scrambledWords || []
  );

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (disabled) return;

    if (fromAvailable) {
      const newSelected = [...selectedWords, word];
      const newAvailable = availableWords.filter((w, i) =>
        i !== availableWords.indexOf(word)
      );
      setSelectedWords(newSelected);
      setAvailableWords(newAvailable);
      onChange(newSelected);
    } else {
      const newAvailable = [...availableWords, word];
      const newSelected = selectedWords.filter((w, i) =>
        i !== selectedWords.indexOf(word)
      );
      setSelectedWords(newSelected);
      setAvailableWords(newAvailable);
      onChange(newSelected);
    }
  };

  return (
    <div className="space-y-4">
      {/* Scrambled words area */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-xs font-semibold text-gray-600 mb-2">
          Available Words (click to add):
        </p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {availableWords.map((word, i) => (
            <button
              key={`avail-${i}`}
              onClick={() => handleWordClick(word, true)}
              disabled={disabled}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Sentence construction area */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-2">
          Your Sentence (click to remove):
        </p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {selectedWords.length === 0 ? (
            <p className="text-gray-500 italic text-sm">Click words above to build your sentence...</p>
          ) : (
            selectedWords.map((word, i) => (
              <button
                key={`sel-${i}`}
                onClick={() => handleWordClick(word, false)}
                disabled={disabled}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {word}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Matching Exercise Component
function MatchingExercise({
  exercise,
  value,
  onChange,
  disabled,
}: {
  exercise: Exercise;
  value: string[];
  onChange: (value: string[]) => void;
  disabled: boolean;
}) {
  const [matches, setMatches] = useState<Record<number, number>>(
    value.reduce((acc, match, idx) => {
      const [russianIdx, englishIdx] = match.split('-').map(Number);
      acc[russianIdx] = englishIdx;
      return acc;
    }, {} as Record<number, number>)
  );
  const [selectedRussian, setSelectedRussian] = useState<number | null>(null);

  const handleRussianClick = (index: number) => {
    if (disabled) return;
    setSelectedRussian(index);
  };

  const handleEnglishClick = (index: number) => {
    if (disabled || selectedRussian === null) return;

    const newMatches = { ...matches, [selectedRussian]: index };
    setMatches(newMatches);

    // Convert to array format for validation
    const matchArray = Object.entries(newMatches).map(
      ([rIdx, eIdx]) => `${rIdx}-${eIdx}`
    );
    onChange(matchArray);
    setSelectedRussian(null);
  };

  const pairs = exercise.pairs || [];
  const russianItems = pairs.map((p) => p.russian);
  const englishItems = [...pairs.map((p) => p.english)].sort(() => Math.random() - 0.5);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Russian column */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 mb-2">Russian:</p>
        {russianItems.map((russian, idx) => {
          const isMatched = matches[idx] !== undefined;
          const isSelected = selectedRussian === idx;

          return (
            <button
              key={idx}
              onClick={() => handleRussianClick(idx)}
              disabled={disabled || isMatched}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : isMatched
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 bg-white'
              } ${disabled || isMatched ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{russian}</span>
                {isMatched && <span className="text-green-600">✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* English column */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 mb-2">English:</p>
        {englishItems.map((english, idx) => {
          const isMatched = Object.values(matches).includes(idx);

          return (
            <button
              key={idx}
              onClick={() => handleEnglishClick(idx)}
              disabled={disabled || isMatched || selectedRussian === null}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                isMatched
                  ? 'border-green-500 bg-green-50'
                  : selectedRussian !== null
                  ? 'border-blue-400 hover:bg-blue-50 bg-white'
                  : 'border-gray-300 bg-white'
              } ${disabled || isMatched || selectedRussian === null ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{english}</span>
                {isMatched && <span className="text-green-600">✓</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
