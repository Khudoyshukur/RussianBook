import { getAiKey } from './aiKey';

const TTS_MODEL = 'gemini-2.5-flash-preview-tts';

export async function speakRussian(text: string): Promise<void> {
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

  const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inlineData) throw new Error('No audio in response');

  // The API returns raw PCM (audio/L16, 16-bit signed LE, mono, 24000 Hz).
  // Browsers can't play raw PCM via <audio>, so we decode it with Web Audio API.
  const binary = atob(inlineData.data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const sampleRate = 24000;
  const numSamples = bytes.length / 2; // 16-bit = 2 bytes per sample
  const ctx = new AudioContext({ sampleRate });
  const buffer = ctx.createBuffer(1, numSamples, sampleRate);
  const channel = buffer.getChannelData(0);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < numSamples; i++) {
    channel[i] = view.getInt16(i * 2, true) / 32768; // LE, normalize to [-1, 1]
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
  await new Promise<void>((resolve) => { source.onended = () => resolve(); });
}
