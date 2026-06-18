import { NextRequest } from 'next/server';

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

export async function POST(req: NextRequest) {
  const { apiKey, model, messages, lessonContext } = await req.json();

  if (!apiKey) {
    return Response.json({ error: 'No API key provided' }, { status: 401 });
  }

  const geminiModel = model || DEFAULT_MODEL;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

  const systemInstruction = buildSystemPrompt(lessonContext);

  const geminiMessages = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: geminiMessages,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 600,
    },
  };

  const res = await fetch(`${geminiApiUrl}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = (err as { error?: { message?: string } })?.error?.message ?? `Gemini error ${res.status}`;
    return Response.json({ error: message }, { status: res.status });
  }

  const data = await res.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return Response.json({ text });
}

function buildSystemPrompt(ctx: {
  day: number;
  title: string;
  difficultyLevel: string;
  textRussian: string;
  textEnglish: string;
  vocabulary: { russian: string; english: string; context: string }[];
  grammarNote?: string | object;
  culturalInsight?: { topic: string; content: string };
} | null): string {
  const base = `You are a Russian tutor in a learning app for software engineers. Answer questions about Russian grammar, vocabulary, pronunciation, and cases.

Rules:
- Be extremely concise. 1-3 sentences max unless asked for more.
- No intros, no "Great question!", no restating the question.
- Translation: just give the word + stress mark (e.g. програ́ммист = programmer).
- Grammar: name the concept + one-line reason. No examples unless asked.
- If asked to elaborate, then go deeper.
- Respond in English unless the learner writes in Russian.
- Plain text only. No markdown: no tables, no bold (**), no italics (*), no headers (#), no bullet lists with dashes. Use plain line breaks and simple punctuation instead.
- Always write Russian words in Cyrillic script, never in Latin transliteration (e.g. вести́, not "vesti").`;

  if (!ctx) return base;

  const vocabList = ctx.vocabulary
    .map((v) => `  • ${v.russian} = ${v.english} (${v.context})`)
    .join('\n');

  const grammarSection =
    ctx.grammarNote
      ? `\nGrammar note for this lesson:\n${typeof ctx.grammarNote === 'string' ? ctx.grammarNote : JSON.stringify(ctx.grammarNote, null, 2)}`
      : '';

  const culturalSection =
    ctx.culturalInsight
      ? `\nCultural insight: ${ctx.culturalInsight.topic} — ${ctx.culturalInsight.content}`
      : '';

  const russianTextPlain = ctx.textRussian.replace(/<[^>]+>/g, '');

  return `${base}

---
CURRENT LESSON CONTEXT (Day ${ctx.day}: "${ctx.title}", Level ${ctx.difficultyLevel})

Russian text from the lesson:
${russianTextPlain}

English translation:
${ctx.textEnglish}

Vocabulary covered in this lesson:
${vocabList}
${grammarSection}
${culturalSection}
---

The learner may ask about any word or phrase from this lesson, or about Russian in general. Use the lesson context to give relevant, grounded answers.`;
}
