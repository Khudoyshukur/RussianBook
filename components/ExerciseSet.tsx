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
      if (checkAnswer(exercise, userAnswer)) {
        correct++;
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
          className={`border-2 rounded-lg p-4 ${
            showResults
              ? checkAnswer(exercise, answers[index])
                ? 'border-green-600 bg-green-100'
                : 'border-red-600 bg-red-100'
              : 'border-gray-300 bg-white'
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
                <div className="mt-3 p-3 bg-white rounded border-2 border-gray-300">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {checkAnswer(exercise, answers[index]) ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {exercise.type === 'matching' && exercise.pairs ? (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Correct pairs:</span>
                      <ul className="mt-1 space-y-1">
                        {exercise.pairs.map((pair, i) => (
                          <li key={i}>• {pair.russian} → {pair.english}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Correct answer:</span>{' '}
                      {Array.isArray(exercise.correctAnswer)
                        ? exercise.type === 'sentence-reordering'
                          ? exercise.correctAnswer.join(' ')
                          : exercise.correctAnswer.join(', ')
                        : exercise.correctAnswer}
                    </p>
                  )}
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
      return <FillInBlanksExercise exercise={exercise} value={value as string || ''} onChange={(v) => onChange(index, v)} disabled={disabled} />;

    case 'context-selection':
    case 'code-debugging':
    case 'case-selection':
      return (
        <div className="space-y-2">
          {exercise.options?.map((option, i) => (
            <label
              key={i}
              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                value === option
                  ? 'border-blue-600 bg-blue-100'
                  : 'border-gray-400 hover:bg-gray-100 hover:border-blue-500'
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
              <p className="text-xs font-semibold text-gray-600 mb-2">Word Bank (click to select):</p>
              <div className="flex flex-wrap gap-2">
                {exercise.wordBank.map((word, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => !disabled && onChange(index, (value as string || '') + (value ? ' ' : '') + word)}
                    disabled={disabled}
                    className="px-3 py-1 bg-white rounded border-2 border-gray-300 text-sm hover:bg-blue-100 hover:border-blue-500 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {word}
                  </button>
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
            placeholder="Complete the sentence or click words above..."
          />
        </div>
      );

    default:
      return null;
  }
}

function checkAnswer(exercise: Exercise, userAnswer: string | string[] | undefined): boolean {
  if (!userAnswer) return false;
  if (!exercise.correctAnswer) return false;

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

  // For fill-in-blanks and verb-conjugation, normalize by removing punctuation and extra spaces
  if (exercise.type === 'fill-in-blanks' || exercise.type === 'verb-conjugation') {
    const normalize = (str: string) =>
      str.toString().trim().toLowerCase()
        .replace(/[,;.!?]/g, '') // Remove common punctuation
        .replace(/\s+/g, ' '); // Normalize multiple spaces to single space

    return normalize(userAnswer.toString()) === normalize(exercise.correctAnswer.toString());
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

// Fill In Blanks Component
function FillInBlanksExercise({
  exercise,
  value,
  onChange,
  disabled,
}: {
  exercise: Exercise;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  // Parse current value into array of selected words
  const selectedWords = value ? value.trim().split(' ').filter(Boolean) : [];
  const wordBank = exercise.wordBank || [];

  // Calculate available words (not yet selected)
  const availableWords = wordBank.filter(word => {
    const timesInBank = wordBank.filter(w => w === word).length;
    const timesSelected = selectedWords.filter(w => w === word).length;
    return timesSelected < timesInBank;
  });

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (disabled) return;

    if (fromAvailable) {
      // Add word to selected
      const newSelected = [...selectedWords, word];
      onChange(newSelected.join(' '));
    } else {
      // Remove word from selected (first occurrence)
      const newSelected = [...selectedWords];
      const indexToRemove = newSelected.indexOf(word);
      if (indexToRemove > -1) {
        newSelected.splice(indexToRemove, 1);
      }
      onChange(newSelected.join(' '));
    }
  };

  return (
    <div className="space-y-4">
      {/* Word bank area */}
      {wordBank.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Word Bank (click to add):
          </p>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {availableWords.length > 0 ? (
              availableWords.map((word, i) => (
                <button
                  key={`avail-${i}-${word}`}
                  type="button"
                  onClick={() => handleWordClick(word, true)}
                  disabled={disabled}
                  className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {word}
                </button>
              ))
            ) : (
              <p className="text-gray-500 italic text-sm">All words used</p>
            )}
          </div>
        </div>
      )}

      {/* Answer area */}
      <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
        <p className="text-xs font-bold text-blue-900 mb-2">
          Your Answer (click to remove):
        </p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {selectedWords.length === 0 ? (
            <p className="text-gray-500 italic text-sm">Click words above to build your answer...</p>
          ) : (
            selectedWords.map((word, i) => (
              <button
                key={`sel-${i}-${word}`}
                type="button"
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
  // Initialize state only once on mount
  const [selectedWords, setSelectedWords] = useState<string[]>(() => value || []);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    if (value && value.length > 0) {
      // If there's already a value, calculate available words by removing selected ones
      const scrambled = exercise.scrambledWords || [];
      return scrambled.filter(word => !value.includes(word));
    }
    return exercise.scrambledWords || [];
  });

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
      <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
        <p className="text-xs font-bold text-blue-900 mb-2">
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
  const pairs = exercise.pairs || [];
  const russianItems = pairs.map((p) => p.russian);

  // Shuffle English items only once when component mounts
  const [englishItems] = useState(() =>
    [...pairs.map((p) => p.english)].sort(() => Math.random() - 0.5)
  );

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

    // If clicking on an already matched Russian word, unmatch it
    if (matches[index] !== undefined) {
      const newMatches = { ...matches };
      delete newMatches[index];
      setMatches(newMatches);

      // Update the answer array
      const matchArray = Object.entries(newMatches).map(
        ([russianIdx, englishShuffledIdx]) => {
          const russianWord = russianItems[Number(russianIdx)];
          const englishWord = englishItems[Number(englishShuffledIdx)];
          const originalEnglishIdx = pairs.findIndex(p => p.english === englishWord);
          return `${russianIdx}-${originalEnglishIdx}`;
        }
      );
      onChange(matchArray);
      return;
    }

    setSelectedRussian(index);
  };

  const handleEnglishClick = (shuffledIndex: number) => {
    if (disabled || selectedRussian === null) return;

    const newMatches = { ...matches, [selectedRussian]: shuffledIndex };
    setMatches(newMatches);

    // Convert matches to word pairs for validation (not indices)
    // We need to map shuffled indices back to actual words
    const matchArray = Object.entries(newMatches).map(
      ([russianIdx, englishShuffledIdx]) => {
        const russianWord = russianItems[Number(russianIdx)];
        const englishWord = englishItems[Number(englishShuffledIdx)];

        // Find the original index of this English word in the pairs array
        const originalEnglishIdx = pairs.findIndex(p => p.english === englishWord);

        return `${russianIdx}-${originalEnglishIdx}`;
      }
    );
    onChange(matchArray);
    setSelectedRussian(null);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
        <p className="text-sm text-blue-900 font-medium">
          <span className="font-bold">How to match:</span> Click a Russian word, then click its English translation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Russian column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              1
            </div>
            <p className="text-sm font-bold text-gray-800">Select Russian word:</p>
          </div>
          <div className="space-y-2">
            {russianItems.map((russian, idx) => {
              const isMatched = matches[idx] !== undefined;
              const isSelected = selectedRussian === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleRussianClick(idx)}
                  disabled={disabled}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                    isSelected
                      ? 'border-blue-600 bg-blue-100 shadow-lg ring-2 ring-blue-300'
                      : isMatched
                      ? 'border-green-600 bg-green-100 hover:bg-green-200'
                      : 'border-gray-400 hover:border-blue-500 hover:shadow-md bg-white hover:bg-blue-100'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-98'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-900 break-words">{russian}</span>
                    {isMatched && <span className="text-green-700 text-2xl flex-shrink-0 font-bold">✓</span>}
                  </div>
                  {isMatched && !disabled && (
                    <p className="text-xs text-gray-600 mt-2 font-normal">Click to unmatch</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* English column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              2
            </div>
            <p className="text-sm font-bold text-gray-800">Then select English translation:</p>
          </div>
          <div className="space-y-2">
            {englishItems.map((english, idx) => {
              const isMatched = Object.values(matches).includes(idx);

              return (
                <button
                  key={idx}
                  onClick={() => handleEnglishClick(idx)}
                  disabled={disabled || isMatched || selectedRussian === null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                    isMatched
                      ? 'border-green-600 bg-green-100'
                      : selectedRussian !== null
                      ? 'border-purple-500 hover:bg-purple-100 hover:shadow-md bg-white hover:border-purple-600'
                      : 'border-gray-300 bg-gray-100'
                  } ${disabled || isMatched || selectedRussian === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-98'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-900 break-words">{english}</span>
                    {isMatched && <span className="text-green-700 text-2xl flex-shrink-0 font-bold">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
