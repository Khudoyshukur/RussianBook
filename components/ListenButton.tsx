'use client';

import { useState } from 'react';
import { speakRussian } from '@/lib/tts';

interface Props {
  text: string;
  cacheKey?: string;
  className?: string;
}

export default function ListenButton({ text, cacheKey, className = '' }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      await speakRussian(text, cacheKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'TTS failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleClick}
        disabled={loading}
        title="Listen"
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-3-3m3 3l3-3M6.343 9.343a8 8 0 000 11.314" />
          </svg>
        )}
        {loading ? 'Loading…' : 'Listen'}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
