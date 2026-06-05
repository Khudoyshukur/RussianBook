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

// Phase 3: Technical Workflows & Cases (Days 46-68)
import day046 from '@/content/lessons/day-046.json';
import day047 from '@/content/lessons/day-047.json';
import day048 from '@/content/lessons/day-048.json';
import day049 from '@/content/lessons/day-049.json';
import day050 from '@/content/lessons/day-050.json';
import day051 from '@/content/lessons/day-051.json';
import day052 from '@/content/lessons/day-052.json';
import day053 from '@/content/lessons/day-053.json';
import day054 from '@/content/lessons/day-054.json';
import day055 from '@/content/lessons/day-055.json';
import day056 from '@/content/lessons/day-056.json';
import day057 from '@/content/lessons/day-057.json';
import day058 from '@/content/lessons/day-058.json';
import day059 from '@/content/lessons/day-059.json';
import day060 from '@/content/lessons/day-060.json';
import day061 from '@/content/lessons/day-061.json';
import day062 from '@/content/lessons/day-062.json';
import day063 from '@/content/lessons/day-063.json';
import day064 from '@/content/lessons/day-064.json';
import day065 from '@/content/lessons/day-065.json';
import day066 from '@/content/lessons/day-066.json';
import day067 from '@/content/lessons/day-067.json';
import day068 from '@/content/lessons/day-068.json';

// Phase 4: Advanced Technical Leadership (Days 69-90)
import day069 from '@/content/lessons/day-069.json';
import day070 from '@/content/lessons/day-070.json';
import day071 from '@/content/lessons/day-071.json';
import day072 from '@/content/lessons/day-072.json';
import day073 from '@/content/lessons/day-073.json';
import day074 from '@/content/lessons/day-074.json';
import day075 from '@/content/lessons/day-075.json';
import day076 from '@/content/lessons/day-076.json';
import day077 from '@/content/lessons/day-077.json';
import day078 from '@/content/lessons/day-078.json';
import day079 from '@/content/lessons/day-079.json';
import day080 from '@/content/lessons/day-080.json';
import day081 from '@/content/lessons/day-081.json';
import day082 from '@/content/lessons/day-082.json';
import day083 from '@/content/lessons/day-083.json';
import day084 from '@/content/lessons/day-084.json';
import day085 from '@/content/lessons/day-085.json';
import day086 from '@/content/lessons/day-086.json';
import day087 from '@/content/lessons/day-087.json';
import day088 from '@/content/lessons/day-088.json';
import day089 from '@/content/lessons/day-089.json';
import day090 from '@/content/lessons/day-090.json';

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
  // Phase 3: Technical Workflows & Cases (Days 46-68)
  46: day046 as Lesson,
  47: day047 as Lesson,
  48: day048 as Lesson,
  49: day049 as Lesson,
  50: day050 as Lesson,
  51: day051 as Lesson,
  52: day052 as Lesson,
  53: day053 as Lesson,
  54: day054 as Lesson,
  55: day055 as Lesson,
  56: day056 as Lesson,
  57: day057 as Lesson,
  58: day058 as Lesson,
  59: day059 as Lesson,
  60: day060 as Lesson,
  61: day061 as Lesson,
  62: day062 as Lesson,
  63: day063 as Lesson,
  64: day064 as Lesson,
  65: day065 as Lesson,
  66: day066 as Lesson,
  67: day067 as Lesson,
  68: day068 as Lesson,
  // Phase 4: Advanced Technical Leadership (Days 69-90)
  69: day069 as Lesson,
  70: day070 as Lesson,
  71: day071 as Lesson,
  72: day072 as Lesson,
  73: day073 as Lesson,
  74: day074 as Lesson,
  75: day075 as Lesson,
  76: day076 as Lesson,
  77: day077 as Lesson,
  78: day078 as Lesson,
  79: day079 as Lesson,
  80: day080 as Lesson,
  81: day081 as Lesson,
  82: day082 as Lesson,
  83: day083 as Lesson,
  84: day084 as Lesson,
  85: day085 as Lesson,
  86: day086 as Lesson,
  87: day087 as Lesson,
  88: day088 as Lesson,
  89: day089 as Lesson,
  90: day090 as Lesson,
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
