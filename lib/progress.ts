'use client';

import { UserProgress } from '@/types/lesson';

const STORAGE_KEY = 'russian-book-progress';

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored) as UserProgress;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return getDefaultProgress();
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;

  try {
    progress.lastAccessDate = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const markDayCompleted = (day: number): void => {
  const progress = getProgress();
  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day);
    progress.completedDays.sort((a, b) => a - b);
  }
  progress.currentDay = Math.max(progress.currentDay, day + 1);
  saveProgress(progress);
};

export const updateExerciseScore = (day: number, score: number): void => {
  const progress = getProgress();
  progress.exerciseScores[day] = score;
  saveProgress(progress);
};

export const updateVocabularyMastery = (word: string, mastery: number): void => {
  const progress = getProgress();
  progress.vocabularyMastery[word] = mastery;
  saveProgress(progress);
};

export const isDayCompleted = (day: number): boolean => {
  const progress = getProgress();
  return progress.completedDays.includes(day);
};

export const getCompletionPercentage = (): number => {
  const progress = getProgress();
  return Math.round((progress.completedDays.length / 90) * 100);
};

export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

const getDefaultProgress = (): UserProgress => ({
  completedDays: [],
  currentDay: 1,
  lastAccessDate: new Date().toISOString(),
  exerciseScores: {},
  vocabularyMastery: {},
});
