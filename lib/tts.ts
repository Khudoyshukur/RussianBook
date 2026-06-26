import { getAiKey } from './aiKey';

const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const SAMPLE_RATE = 24000;
const DB_NAME = 'tts-cache';
const DB_STORE = 'audio';

// ── IndexedDB cache ───────────────────────────────────────────────────────────

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(DB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getCached(key: string): Promise<string | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const req = db.transaction(DB_STORE).objectStore(DB_STORE).get(key);
      req.onsuccess = () => resolve((req.result as string) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function setCache(key: string, base64: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const req = db.transaction(DB_STORE, 'readwrite').objectStore(DB_STORE).put(base64, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // silently skip if IndexedDB unavailable
  }
}

// ── PCM → WAV ────────────────────────────────────────────────────────────────
// Wraps raw 16-bit LE mono PCM in a WAV container so browsers can play it
// natively via <audio>, which gives us seek + pause for free.

function pcmBase64ToWavBlob(base64: string): Blob {
  const binary = atob(base64);
  const pcmBytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) pcmBytes[i] = binary.charCodeAt(i);

  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = SAMPLE_RATE * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmBytes.length;
  const headerSize = 44;

  const wav = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(wav);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);           // chunk size
  view.setUint16(20, 1, true);            // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);
  new Uint8Array(wav, headerSize).set(pcmBytes);

  return new Blob([wav], { type: 'audio/wav' });
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Fetches TTS audio (or returns cached), and gives back an object URL to a WAV blob. Caller must revoke when done. */
export async function getTtsUrl(text: string, cacheKey?: string): Promise<string> {
  const cached = cacheKey ? await getCached(cacheKey) : null;
  const base64 = cached ?? await fetchTts(text, cacheKey);
  const blob = pcmBase64ToWavBlob(base64);
  return URL.createObjectURL(blob);
}

async function fetchTts(text: string, cacheKey?: string): Promise<string> {
  const apiKey = getAiKey();
  if (!apiKey) throw new Error('No API key');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
        },
      }),
    }
  );

  const data = await res.json() as {
    candidates?: { content?: { parts?: { inlineData?: { data: string; mimeType: string } }[] } }[];
    error?: { message?: string };
  };

  if (!res.ok || data.error) throw new Error(data.error?.message ?? 'TTS error');

  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64) throw new Error('No audio in response');

  if (cacheKey) await setCache(cacheKey, base64);
  return base64;
}

/** Simple one-shot play for short clips (flashcards). No seek needed. */
export async function speakRussian(text: string, cacheKey?: string): Promise<void> {
  const url = await getTtsUrl(text, cacheKey);
  const audio = new Audio(url);
  audio.onended = () => URL.revokeObjectURL(url);
  await audio.play();
}
