import { Lesson } from '@/types/lesson';
// Phase 1: Foundation (Days 1-22)
import day001 from '@/content/lessons/day-001.json';
import day002 from '@/content/lessons/day-002.json';
import day003 from '@/content/lessons/day-003.json';
import day004 from '@/content/lessons/day-004.json';
import day005 from '@/content/lessons/day-005.json';
import day006 from '@/content/lessons/day-006.json';
import day007 from '@/content/lessons/day-007.json';
import day008 from '@/content/lessons/day-008.json';
import day009 from '@/content/lessons/day-009.json';
import day010 from '@/content/lessons/day-010.json';
import day011 from '@/content/lessons/day-011.json';
import day012 from '@/content/lessons/day-012.json';
import day013 from '@/content/lessons/day-013.json';
import day014 from '@/content/lessons/day-014.json';
import day015 from '@/content/lessons/day-015.json';
import day016 from '@/content/lessons/day-016.json';
import day017 from '@/content/lessons/day-017.json';
import day018 from '@/content/lessons/day-018.json';
import day019 from '@/content/lessons/day-019.json';
import day020 from '@/content/lessons/day-020.json';
import day021 from '@/content/lessons/day-021.json';
import day022 from '@/content/lessons/day-022.json';

// Phase 2: Agile Interactions (Days 23-45)
import day023 from '@/content/lessons/day-023.json';
import day024 from '@/content/lessons/day-024.json';
import day025 from '@/content/lessons/day-025.json';
import day026 from '@/content/lessons/day-026.json';
import day027 from '@/content/lessons/day-027.json';
import day028 from '@/content/lessons/day-028.json';
import day029 from '@/content/lessons/day-029.json';
import day030 from '@/content/lessons/day-030.json';
import day031 from '@/content/lessons/day-031.json';
import day032 from '@/content/lessons/day-032.json';
import day033 from '@/content/lessons/day-033.json';
import day034 from '@/content/lessons/day-034.json';
import day035 from '@/content/lessons/day-035.json';
import day036 from '@/content/lessons/day-036.json';
import day037 from '@/content/lessons/day-037.json';
import day038 from '@/content/lessons/day-038.json';
import day039 from '@/content/lessons/day-039.json';
import day040 from '@/content/lessons/day-040.json';
import day041 from '@/content/lessons/day-041.json';
import day042 from '@/content/lessons/day-042.json';
import day043 from '@/content/lessons/day-043.json';
import day044 from '@/content/lessons/day-044.json';
import day045 from '@/content/lessons/day-045.json';

const lessonMap: Record<number, Lesson> = {
  // Phase 1: Foundation (Days 1-22)
  1: day001 as Lesson,
  2: day002 as Lesson,
  3: day003 as Lesson,
  4: day004 as Lesson,
  5: day005 as Lesson,
  6: day006 as Lesson,
  7: day007 as Lesson,
  8: day008 as Lesson,
  9: day009 as Lesson,
  10: day010 as Lesson,
  11: day011 as Lesson,
  12: day012 as Lesson,
  13: day013 as Lesson,
  14: day014 as Lesson,
  15: day015 as Lesson,
  16: day016 as Lesson,
  17: day017 as Lesson,
  18: day018 as Lesson,
  19: day019 as Lesson,
  20: day020 as Lesson,
  21: day021 as Lesson,
  22: day022 as Lesson,
  // Phase 2: Agile Interactions (Days 23-45)
  23: day023 as Lesson,
  24: day024 as Lesson,
  25: day025 as Lesson,
  26: day026 as Lesson,
  27: day027 as Lesson,
  28: day028 as Lesson,
  29: day029 as Lesson,
  30: day030 as Lesson,
  31: day031 as Lesson,
  32: day032 as Lesson,
  33: day033 as Lesson,
  34: day034 as Lesson,
  35: day035 as Lesson,
  36: day036 as Lesson,
  37: day037 as Lesson,
  38: day038 as Lesson,
  39: day039 as Lesson,
  40: day040 as Lesson,
  41: day041 as Lesson,
  42: day042 as Lesson,
  43: day043 as Lesson,
  44: day044 as Lesson,
  45: day045 as Lesson,
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
