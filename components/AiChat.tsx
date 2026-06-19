'use client';

import { useEffect, useRef, useState } from 'react';
import { getAiKey, saveAiKey, deleteAiKey, getAiModel, saveAiModel, GEMINI_MODELS, DEFAULT_MODEL } from '@/lib/aiKey';
import { Lesson } from '@/types/lesson';

type Message = { role: 'user' | 'assistant'; content: string };

type LessonContext = Pick<
  Lesson,
  'day' | 'title' | 'difficultyLevel' | 'textRussian' | 'textEnglish' | 'vocabulary' | 'grammarNote' | 'culturalInsight'
>;

export default function AiChat({ lesson }: { lesson: LessonContext }) {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);
  const [keyInput, setKeyInput] = useState('');
  const [showKeySetup, setShowKeySetup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setApiKey(getAiKey());
    setModel(getAiModel());
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    const main = document.querySelector<HTMLElement>('.lesson-page-content');
    if (main) {
      const isMobile = window.innerWidth < 640;
      main.style.paddingBottom = open && isMobile ? '70vh' : '';
    }
    return () => {
      if (main) main.style.paddingBottom = '';
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function handleOpen() {
    if (!apiKey) {
      setShowKeySetup(true);
    }
    setOpen(true);
  }

  function handleSaveKey() {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    saveAiKey(trimmed);
    setApiKey(trimmed);
    setKeyInput('');
    setShowKeySetup(false);
  }

  function handleDeleteKey() {
    deleteAiKey();
    setApiKey(null);
    setShowKeySetup(true);
    setMessages([]);
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading || !apiKey) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = '40px';
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          model,
          messages: newMessages,
          lessonContext: {
            day: lesson.day,
            title: lesson.title,
            difficultyLevel: lesson.difficultyLevel,
            textRussian: lesson.textRussian,
            textEnglish: lesson.textEnglish,
            vocabulary: lesson.vocabulary,
            grammarNote: lesson.grammarNote,
            culturalInsight: lesson.culturalInsight,
          },
        }),
      });

      const data = await res.json() as { text?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong.');
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.text ?? '' }]);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold"
        aria-label="Open AI tutor"
      >
        <span>AI Tutor</span>
        <span className="text-base">✨</span>
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-[420px] h-[70vh] sm:h-[600px] sm:bottom-6 sm:right-6 sm:rounded-2xl bg-white shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white flex-shrink-0">
            <div>
              <p className="font-semibold text-sm">AI Russian Tutor</p>
              <p className="text-xs text-blue-200 truncate max-w-[240px]">
                Day {lesson.day}: {lesson.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {apiKey && (
                <button
                  onClick={() => setShowKeySetup((v) => !v)}
                  className="text-blue-200 hover:text-white text-xs underline"
                  title="Manage API key"
                >
                  Key
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white text-xl leading-none px-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Key setup panel */}
          {showKeySetup && (
            <div className="flex-shrink-0 bg-amber-50 border-b border-amber-200 px-4 py-4 space-y-3">
              {!apiKey ? (
                <>
                  <p className="text-sm font-semibold text-amber-900">Set up your Gemini API key</p>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Get a free key at{' '}
                    <span className="font-mono bg-amber-100 px-1 rounded">aistudio.google.com</span>
                    {' '}→ "Get API key". Your key is stored only in your browser (localStorage) and is never sent anywhere except directly to Google.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
                      placeholder="AIza..."
                      className="flex-1 text-sm text-gray-900 bg-white border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSaveKey}
                      disabled={!keyInput.trim()}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-amber-900">Gemini API key</p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={keyInput || '••••••••••••••••'}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="Paste new key to replace..."
                      className="flex-1 text-sm text-gray-900 bg-white border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSaveKey}
                      disabled={!keyInput.trim()}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40"
                    >
                      Replace
                    </button>
                  </div>
                  <button
                    onClick={handleDeleteKey}
                    className="text-xs text-red-600 hover:text-red-800 underline"
                  >
                    Remove API key
                  </button>
                </>
              )}
              <div className="pt-1 border-t border-amber-200">
                <label className="text-xs font-semibold text-amber-900 block mb-1.5">Model</label>
                <select
                  value={model}
                  onChange={(e) => { setModel(e.target.value); saveAiModel(e.target.value); }}
                  className="w-full text-sm text-gray-900 border border-amber-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GEMINI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Chat area */}
          {apiKey && !showKeySetup ? (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {messages.length === 0 && (
                  <div className="text-center text-sm text-gray-400 mt-8 space-y-2">
                    <p className="text-2xl">✨</p>
                    <p className="font-medium text-gray-500">Ask anything about this lesson</p>
                    <div className="text-left max-w-xs mx-auto space-y-1 mt-4">
                      {[
                        'What case is "программисту"?',
                        'Translate "совещание"',
                        'Why is the verb "работаю" and not "работает"?',
                        'Explain the grammar note',
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => { setInput(q); inputRef.current?.focus(); }}
                          className="block w-full text-left text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <div className="overflow-x-auto whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white px-3 py-3 flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Russian grammar, vocabulary..."
                  rows={1}
                  className="flex-1 resize-none text-sm text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ lineHeight: '1.4', height: '40px', maxHeight: '200px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors"
                  aria-label="Send"
                >
                  <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
                  </svg>
                </button>
              </div>
            </>
          ) : !apiKey ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div className="space-y-3">
                <p className="text-3xl">🔑</p>
                <p className="text-sm font-medium text-gray-700">Enter your Gemini API key above to start chatting</p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
