const KEY_STORAGE_KEY = 'russian-book-gemini-key';
const MODEL_STORAGE_KEY = 'russian-book-gemini-model';

export const GEMINI_MODELS = [
  { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash' },
  { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite' },
  { id: 'gemini-3-flash-preview', label: 'Gemini 3 Flash Preview' },
  { id: 'gemini-2.5-flash-preview-05-20', label: 'Gemini 2.5 Flash Preview' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite' },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
] as const;

export const DEFAULT_MODEL = GEMINI_MODELS[1].id;

export function getAiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEY_STORAGE_KEY);
}

export function saveAiKey(key: string): void {
  localStorage.setItem(KEY_STORAGE_KEY, key);
}

export function deleteAiKey(): void {
  localStorage.removeItem(KEY_STORAGE_KEY);
}

export function getAiModel(): string {
  if (typeof window === 'undefined') return DEFAULT_MODEL;
  return localStorage.getItem(MODEL_STORAGE_KEY) ?? DEFAULT_MODEL;
}

export function saveAiModel(model: string): void {
  localStorage.setItem(MODEL_STORAGE_KEY, model);
}
