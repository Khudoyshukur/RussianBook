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

export const exportProgress = (): void => {
  if (typeof window === 'undefined') return;

  const progress = getProgress();
  const dataStr = JSON.stringify(progress, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `russian-book-progress-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importProgress = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot import in server environment'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedProgress = JSON.parse(content) as UserProgress;

        // Validate the imported data has required fields
        if (
          !Array.isArray(importedProgress.completedDays) ||
          typeof importedProgress.currentDay !== 'number' ||
          typeof importedProgress.exerciseScores !== 'object'
        ) {
          reject(new Error('Invalid progress file format'));
          return;
        }

        // Save the imported progress
        saveProgress(importedProgress);
        resolve();
      } catch (error) {
        reject(new Error('Failed to parse progress file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

const getDefaultProgress = (): UserProgress => ({
  completedDays: [],
  currentDay: 1,
  lastAccessDate: new Date().toISOString(),
  exerciseScores: {},
  vocabularyMastery: {},
});
