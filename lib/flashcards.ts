'use client';

const STORAGE_KEY = 'russian-book-flashcards';

export type CardType = 'classic' | 'cloze' | 'definition';

export interface Flashcard {
  id: string;
  front: string; // Russian
  back: string;  // English / meaning
  cardType?: CardType;
  createdAt: string;
  // SM-2 fields
  interval: number;      // days until next review
  easeFactor: number;    // >= 1.3
  repetitions: number;   // number of successful reviews in a row
  nextReviewAt: string;  // ISO date
}

export type Rating = 'forgot' | 'hard' | 'easy';

export function getFlashcards(): Flashcard[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Flashcard[]) : [];
  } catch {
    return [];
  }
}

export function saveFlashcards(cards: Flashcard[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function addFlashcard(front: string, back: string, cardType?: CardType): Flashcard {
  const cards = getFlashcards();
  const now = new Date().toISOString();
  const card: Flashcard = {
    id: crypto.randomUUID(),
    front: front.trim(),
    back: back.trim(),
    cardType: cardType ?? 'classic',
    createdAt: now,
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewAt: now, // due immediately
  };
  saveFlashcards([...cards, card]);
  return card;
}

export function updateFlashcard(id: string, front: string, back: string): void {
  const cards = getFlashcards().map((c) =>
    c.id === id ? { ...c, front: front.trim(), back: back.trim() } : c
  );
  saveFlashcards(cards);
}

export function deleteFlashcard(id: string): void {
  saveFlashcards(getFlashcards().filter((c) => c.id !== id));
}

// SM-2 algorithm
export function reviewFlashcard(id: string, rating: Rating): void {
  const cards = getFlashcards();
  const idx = cards.findIndex((c) => c.id === id);
  if (idx === -1) return;

  const card = { ...cards[idx] };
  const q = rating === 'easy' ? 5 : rating === 'hard' ? 3 : 1;

  if (card.repetitions > 0) {
    card.easeFactor = Math.max(
      1.3,
      card.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
    );
  }

  if (q < 3) {
    // Forgot — reset streak, review again tomorrow
    card.repetitions = 0;
    card.interval = 1;
  } else {
    if (card.repetitions === 0) card.interval = 1;
    else if (card.repetitions === 1) card.interval = 6;
    else card.interval = Math.round(card.interval * card.easeFactor);

    card.repetitions += 1;
  }

  const next = new Date();
  next.setDate(next.getDate() + card.interval);
  card.nextReviewAt = next.toISOString();
  cards[idx] = card;
  saveFlashcards(cards);
}

export function getDueCards(): Flashcard[] {
  const now = new Date();
  return getFlashcards().filter((c) => new Date(c.nextReviewAt) <= now);
}

export function exportFlashcards(): void {
  if (typeof window === 'undefined') return;
  const data = JSON.stringify(getFlashcards(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `russian-book-flashcards-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importFlashcards(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const cards = JSON.parse(e.target?.result as string) as Flashcard[];
        if (!Array.isArray(cards)) throw new Error('Invalid format');
        saveFlashcards(cards);
        resolve();
      } catch {
        reject(new Error('Invalid flashcards file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function resetFlashcards(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
