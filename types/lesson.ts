export type DifficultyLevel = 'A2-' | 'A2' | 'A2+' | 'B1' | 'B1+' | 'B2';

export type Phase = 1 | 2 | 3 | 4;

export interface VocabularyItem {
  russian: string; // with stress marks
  english: string;
  context: string; // contextual analogy or example
  reactivatedFrom?: number; // Day number if this is a reactivation
}

export interface Exercise {
  type:
    | 'fill-in-blanks'        // Fill in missing words with word bank
    | 'code-debugging'         // Fix grammatical errors (multiple choice)
    | 'context-selection'      // Multiple choice about the story
    | 'sentence-reordering'    // Reorder scrambled words into correct sentence
    | 'case-selection'         // Choose correct case form
    | 'verb-conjugation'       // Fill in correct verb form
    | 'matching'               // Match Russian to English
    | 'code-switching';        // Complete sentence using word bank

  // Standard format
  question?: string;
  options?: string[];           // for multiple choice types
  wordBank?: string[];          // for fill-in-blanks, code-switching
  scrambledWords?: string[];    // for sentence-reordering
  pairs?: { russian: string; english: string }[];  // for matching
  correctAnswer?: string | string[];
  explanation?: string;

  // Alternative format (for multi-item exercises like case-selection)
  instruction?: string;
  items?: Array<{
    context?: string;
    question: string;
    options: string[];
    correctAnswer: number | string;
    explanation: string;
  }>;

  // Alternative matching format
  sentences?: Array<{
    russian: string;
    english: string;
  }>;
}

export interface PronunciationNote {
  word: string;
  ipa: string;
  phonetic: string;
  pitfalls: string;
}

export interface CulturalInsight {
  topic: string;
  content: string;
}

export interface Lesson {
  day: number;
  phase: Phase;
  title: string;
  difficultyLevel: DifficultyLevel;

  // Core content
  textRussian: string; // HTML string with <strong> tags for vocabulary
  textEnglish: string; // Parallel translation

  // Learning materials
  vocabulary: VocabularyItem[];
  exercises: Exercise[];

  // Optional enrichment
  pronunciation?: PronunciationNote[];
  culturalInsight?: CulturalInsight;
  grammarNote?: {
    topic: string;
    content: string;
  } | {
    title: string;
    summary: string;
    examples: string[];
  } | string;

  // Narrative continuity
  characters?: string[];
  storyArc?: string;

  // Metadata
  wordCount: number;
  estimatedMinutes: number;
  previousDayReferences?: number[]; // Days referenced in this lesson
}

export interface PhaseInfo {
  phase: Phase;
  title: string;
  description: string;
  dayRange: [number, number];
  focusAreas: string[];
  grammarTopics: string[];
}

export interface UserProgress {
  completedDays: number[];
  currentDay: number;
  lastAccessDate: string;
  exerciseScores: Record<number, number>; // day -> score percentage
  vocabularyMastery: Record<string, number>; // word -> mastery level (0-1)
}
