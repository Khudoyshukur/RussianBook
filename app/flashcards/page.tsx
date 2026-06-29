'use client';

import { useEffect, useState } from 'react';
import {
  getFlashcards,
  deleteFlashcard,
  reviewFlashcard,
  getDueCards,
  Flashcard,
  Rating,
} from '@/lib/flashcards';
import { getAiKey } from '@/lib/aiKey';
import FlashcardModal from '@/components/FlashcardModal';
import FlashcardManagement from '@/components/FlashcardManagement';
import ListenButton from '@/components/ListenButton';
import Link from 'next/link';

type View = 'list' | 'review';

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>('list');
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState<Flashcard | undefined>(undefined);
  const [showManagement, setShowManagement] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Review state
  const [reviewQueue, setReviewQueue] = useState<Flashcard[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  const [hasAiKey, setHasAiKey] = useState(false);

  function reload() {
    const all = getFlashcards();
    setCards(all);
    setDueCards(getDueCards());
  }

  useEffect(() => {
    setMounted(true);
    reload();
    setHasAiKey(!!getAiKey());
  }, []);

  function startReview() {
    const due = getDueCards();
    const shuffled = [...due].sort(() => Math.random() - 0.5).slice(0, 20);
    setReviewQueue(shuffled);
    setReviewIndex(0);
    setFlipped(false);
    setReviewDone(false);
    setView('review');
  }

  function handleRating(rating: Rating) {
    const card = reviewQueue[reviewIndex];
    reviewFlashcard(card.id, rating);
    const next = reviewIndex + 1;
    if (next >= reviewQueue.length) {
      setReviewDone(true);
      reload();
    } else {
      setReviewIndex(next);
      setFlipped(false);
    }
  }

  type MasteryLevel = 'new' | 'learning' | 'good' | 'mastered' | 'struggling';

  function getMastery(card: Flashcard): MasteryLevel {
    if (card.repetitions === 0) return 'new';
    if (card.easeFactor < 1.8) return 'struggling';
    if (card.easeFactor >= 2.3 && card.interval >= 21) return 'mastered';
    if (card.easeFactor >= 2.0 && card.repetitions >= 3) return 'good';
    return 'learning';
  }

  const masteryConfig: Record<MasteryLevel, { label: string; className: string }> = {
    new:        { label: 'New',        className: 'bg-gray-100 text-gray-500' },
    learning:   { label: 'Learning',   className: 'bg-yellow-100 text-yellow-700' },
    good:       { label: 'Good',       className: 'bg-blue-100 text-blue-700' },
    mastered:   { label: 'Mastered',   className: 'bg-green-100 text-green-700' },
    struggling: { label: 'Struggling', className: 'bg-red-100 text-red-700' },
  };

  function formatNextReview(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    if (diffMs <= 0) return 'Due now';
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // ── Review mode ──────────────────────────────────────────────
  if (view === 'review') {
    if (reviewDone || reviewQueue.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-sm w-full">
            <p className="text-4xl mb-4">🎉</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Session complete!</h2>
            <p className="text-gray-600 mb-8">You reviewed {reviewQueue.length} card{reviewQueue.length !== 1 ? 's' : ''}.</p>
            <button
              onClick={() => setView('list')}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      );
    }

    const current = reviewQueue[reviewIndex];
    return (
      <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => { setView('list'); reload(); }} className="text-gray-500 hover:text-gray-700 text-sm">
              ← Exit review
            </button>
            <span className="text-sm text-gray-500">
              {reviewIndex + 1} / {reviewQueue.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all"
              style={{ width: `${(reviewIndex / reviewQueue.length) * 100}%` }}
            />
          </div>

          {/* Card */}
          <div
            className="bg-white rounded-2xl shadow-md p-10 text-center cursor-pointer min-h-[220px] flex flex-col items-center justify-center gap-4 select-none"
            onClick={() => setFlipped(true)}
          >
            <p className="text-2xl font-bold text-gray-900">{current.front}</p>
            {flipped ? (
              <>
                <div className="w-12 border-t border-gray-200" />
                {current.cardType === 'cloze' ? (
                  (() => {
                    const [answer, swapContext] = current.back.split('\n');
                    const fullSentence = current.front.replace('___', answer);
                    return (
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-lg font-semibold text-gray-900">{answer}</p>
                        {swapContext && (
                          <p className="text-sm text-gray-500 italic">{swapContext}</p>
                        )}
                        {hasAiKey && (
                          <ListenButton text={fullSentence} cacheKey={`card-${current.id}`} className="mt-1" />
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-lg text-gray-700">{current.back}</p>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-400 mt-2">Tap to reveal</p>
            )}
          </div>

          {/* Edit button */}
          {flipped && (
            <div className="flex justify-end mt-2">
              <button
                onClick={(e) => { e.stopPropagation(); setEditCard(current); setShowModal(true); }}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors px-2 py-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit card
              </button>
            </div>
          )}

          {/* Rating buttons */}
          {flipped && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleRating('forgot')}
                className="flex-1 py-3 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 border border-red-200 transition-colors"
              >
                Forgot
              </button>
              <button
                onClick={() => handleRating('hard')}
                className="flex-1 py-3 bg-amber-100 text-amber-700 font-semibold rounded-xl hover:bg-amber-200 border border-amber-200 transition-colors"
              >
                Hard
              </button>
              <button
                onClick={() => handleRating('easy')}
                className="flex-1 py-3 bg-green-100 text-green-700 font-semibold rounded-xl hover:bg-green-200 border border-green-200 transition-colors"
              >
                Easy
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <FlashcardModal
          card={editCard}
          onClose={() => { setShowModal(false); setEditCard(undefined); }}
          onSaved={() => {
            reload();
            setShowModal(false);
            setEditCard(undefined);
          }}
        />
      )}
    </>
    );
  }

  // ── List mode ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
            <p className="text-sm text-gray-500 mt-1">{cards.length} card{cards.length !== 1 ? 's' : ''} total</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowManagement((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
              title="Manage flashcards"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={() => { setEditCard(undefined); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              + Add Card
            </button>
          </div>
        </div>

        {/* Management panel */}
        {showManagement && (
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-200">
            <FlashcardManagement />
          </div>
        )}

        {/* Due banner */}
        {dueCards.length > 0 && (
          <div className="bg-blue-600 text-white rounded-xl p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{dueCards.length} card{dueCards.length !== 1 ? 's' : ''} due for review</p>
              <p className="text-blue-200 text-sm">Keep your streak going!</p>
            </div>
            <button
              onClick={startReview}
              className="px-5 py-2.5 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm flex-shrink-0"
            >
              Review Now
            </button>
          </div>
        )}

        {/* Empty state */}
        {cards.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">🗂️</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No flashcards yet</h2>
            <p className="text-gray-500 mb-6 text-sm">Add cards for Russian words you want to remember. The system will schedule reviews for you.</p>
            <button
              onClick={() => { setEditCard(undefined); setShowModal(true); }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add your first card
            </button>
          </div>
        )}

        {/* Stats bar */}
        {cards.length > 0 && (() => {
          const counts = { new: 0, learning: 0, good: 0, mastered: 0, struggling: 0 };
          cards.forEach((c) => counts[getMastery(c)]++);
          const masteredPct = Math.round((counts.mastered / cards.length) * 100);
          const segments: { level: MasteryLevel; color: string }[] = [
            { level: 'mastered',   color: 'bg-green-400' },
            { level: 'good',       color: 'bg-blue-400' },
            { level: 'learning',   color: 'bg-yellow-400' },
            { level: 'struggling', color: 'bg-red-400' },
            { level: 'new',        color: 'bg-gray-300' },
          ];
          return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Mastery overview</span>
                <span className="text-sm font-bold text-green-600">{masteredPct}% mastered</span>
              </div>
              <div className="flex rounded-full overflow-hidden h-2.5 mb-3">
                {segments.map(({ level, color }) =>
                  counts[level] > 0 ? (
                    <div
                      key={level}
                      className={`${color} transition-all`}
                      style={{ width: `${(counts[level] / cards.length) * 100}%` }}
                      title={`${masteryConfig[level].label}: ${counts[level]}`}
                    />
                  ) : null
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {segments.map(({ level, color }) => (
                  <div key={level} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
                    {masteryConfig[level].label}
                    <span className="font-semibold text-gray-800">{counts[level]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Card list */}
        {cards.length > 0 && (
          <div className="space-y-3">
            {cards.map((card) => {
              const due = new Date(card.nextReviewAt) <= new Date();
              const mastery = getMastery(card);
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-gray-900 truncate">{card.front}</p>
                      {card.cardType && card.cardType !== 'classic' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 font-medium flex-shrink-0">
                          {card.cardType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{card.back.split('\n')[0]}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${masteryConfig[mastery].className}`}>
                      {masteryConfig[mastery].label}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${due ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                      {formatNextReview(card.nextReviewAt)}
                    </span>
                    <button
                      onClick={() => { setEditCard(card); setShowModal(true); }}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(card.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <FlashcardModal
          card={editCard}
          onClose={() => setShowModal(false)}
          onSaved={reload}
        />
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete flashcard?</h3>
            <p className="text-gray-600 text-sm mb-6">This will remove the card and its review history.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { deleteFlashcard(deleteConfirmId); setDeleteConfirmId(null); reload(); }}
                className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
