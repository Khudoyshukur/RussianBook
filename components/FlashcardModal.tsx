'use client';

import { useEffect, useRef, useState } from 'react';
import { addFlashcard, updateFlashcard, Flashcard } from '@/lib/flashcards';
import { getAiKey, getAiModel, DEFAULT_MODEL } from '@/lib/aiKey';

interface Props {
  card?: Flashcard;
  onClose: () => void;
  onSaved: () => void;
}

export default function FlashcardModal({ card, onClose, onSaved }: Props) {
  const [front, setFront] = useState(card?.front ?? '');
  const [back, setBack] = useState(card?.back ?? '');
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const aiInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasApiKey(!!getAiKey());
    frontRef.current?.focus();
  }, []);

  async function handleAiGenerate() {
    const query = aiInput.trim();
    if (!query) return;
    const apiKey = getAiKey();
    if (!apiKey) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const model = getAiModel() || DEFAULT_MODEL;
      const prompt = `You are a Russian language flashcard generator. Given a Russian word, phrase, or sentence, output EXACTLY two lines:
Line 1: The Russian text with stress marks added (use the acute accent ́ after the stressed vowel). Keep it exactly as given — do not extract or shorten. If it is a full sentence, keep the full sentence.
Line 2: The English translation. For a single word: concise definition (max 5 words). For a phrase or sentence: natural English translation.

No extra text, no punctuation changes, no explanations. Just two lines.

Input: ${query}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 120 },
        }),
      });

      const data = await res.json() as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
        error?: { message?: string };
      };

      if (!res.ok || data.error) {
        setAiError(data.error?.message ?? 'AI error');
        return;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
      const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        setFront(lines[0]);
        setBack(lines[1]);
        setAiInput('');
      } else {
        setAiError('Unexpected AI response. Try again.');
      }
    } catch {
      setAiError('Network error. Try again.');
    } finally {
      setAiLoading(false);
    }
  }

  function handleSave() {
    if (!front.trim() || !back.trim()) {
      setError('Both fields are required.');
      return;
    }
    if (card) {
      updateFlashcard(card.id, front, back);
    } else {
      addFlashcard(front, back);
    }
    onSaved();
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onKeyDown={handleKeyDown}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          {card ? 'Edit Flashcard' : 'Add Flashcard'}
        </h2>

        {/* AI input */}
        {hasApiKey && !card && (
          <div className="mb-5 bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
            <p className="text-xs font-semibold text-blue-700">✨ Fill with AI</p>
            <div className="flex gap-2">
              <input
                ref={aiInputRef}
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                placeholder="Paste a word or sentence..."
                className="flex-1 text-sm border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <button
                onClick={handleAiGenerate}
                disabled={!aiInput.trim() || aiLoading}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors flex-shrink-0"
              >
                {aiLoading ? '...' : 'Insert'}
              </button>
            </div>
            {aiError && <p className="text-xs text-red-600">{aiError}</p>}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Russian (front)
            </label>
            <input
              ref={frontRef}
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g. програ́ммист"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meaning (back)
            </label>
            <input
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="e.g. programmer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>

        <p className="text-xs text-gray-400 mt-3">Tip: Cmd/Ctrl+Enter to save</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {card ? 'Save Changes' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  );
}
