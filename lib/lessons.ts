import { Lesson } from '@/types/lesson';
import day001 from '@/content/lessons/day-001.json';
import day002 from '@/content/lessons/day-002.json';

// In a real application, you would dynamically import all lessons
// For now, we'll manually import the sample lessons
const lessonMap: Record<number, Lesson> = {
  1: day001 as Lesson,
  2: day002 as Lesson,
};

export const getLesson = (day: number): Lesson | null => {
  return lessonMap[day] || null;
};

export const getAllLessons = (): Lesson[] => {
  return Object.values(lessonMap).sort((a, b) => a.day - b.day);
};

export const getLessonsByPhase = (phase: number): Lesson[] => {
  return getAllLessons().filter((lesson) => lesson.phase === phase);
};

export const getNextLesson = (currentDay: number): Lesson | null => {
  return getLesson(currentDay + 1);
};

export const getPreviousLesson = (currentDay: number): Lesson | null => {
  if (currentDay <= 1) return null;
  return getLesson(currentDay - 1);
};
