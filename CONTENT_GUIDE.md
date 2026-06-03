# Content Creation Guide

## How to Generate New Lessons

This guide helps you create new lessons following the established pedagogical model.

## Lesson Generation Workflow

### Step 1: Determine Phase and Day

First, identify which phase and day number you're creating:
- **Phase 1 (Days 1-22)**: A2- to A2 level, present tense, simple structures
- **Phase 2 (Days 23-45)**: A2+ level, past/future tenses, compound sentences
- **Phase 3 (Days 46-68)**: B1 level, case system, complex workflows
- **Phase 4 (Days 69-90)**: B1+ to B2 level, advanced technical discussions

### Step 2: Create the Story

Stories should be:
- **Engaging**: Real workplace drama, humor, relatable situations
- **Technical**: Naturally incorporate dev scenarios (bugs, deploys, code reviews)
- **Character-driven**: Use recurring characters (Alex, Dmitry, Anya, Maxim, Elena)
- **Progressive**: Build on previous days' vocabulary and storylines

#### Story Ideas by Phase

**Phase 1 Examples:**
- First day at startup
- Setting up dev environment
- First bug fix
- Team lunch and introductions
- First code review
- Learning the codebase

**Phase 2 Examples:**
- Daily standup chaos
- Slack miscommunication
- Sprint planning drama
- Demo day nerves
- Retrospective insights
- Cross-functional collaboration

**Phase 3 Examples:**
- Production bug investigation
- Architectural debate
- API design decisions
- Performance optimization
- Database migration
- Security vulnerability fix

**Phase 4 Examples:**
- System outage at 2 AM
- Technical debt discussion
- Scaling infrastructure
- Interviewing candidates
- Leading technical meetings
- Post-mortem analysis

### Step 3: Write the Russian Text

Guidelines:
1. **Word Count**:
   - Phase 1: 60-80 words
   - Phase 2 & 3: 120-150 words
   - Phase 4: 200-250 words

2. **Complexity**:
   - Start simple, increase gradually
   - Introduce 1-2 new grammar concepts per lesson
   - Reactivate 30-40% of vocabulary from previous days

3. **Formatting**:
   - Wrap target vocabulary in `<strong>` tags
   - Use proper Russian typography (— for dialogue, not -)
   - Include stress marks in vocabulary tables (программи́ст)

4. **Grammar Focus**:
   - Phase 1: Present tense, nominative case
   - Phase 2: Past/future tenses, basic conjunctions
   - Phase 3: All cases introduced naturally
   - Phase 4: All grammar in complex context

### Step 4: Create Vocabulary Table

Select 5-8 key words that are:
- **Bolded in the text**
- **Technically relevant** or **workplace-specific**
- **Useful for reactivation** in future lessons

Each vocabulary item needs:
```json
{
  "russian": "программи́ст",              // With stress marks
  "english": "programmer / developer",    // Clear translation
  "context": "Core profession in tech...", // Usage note
  "reactivatedFrom": 1                    // Optional: from Day X
}
```

### Step 5: Design Exercises

Create 3-4 exercises with variety:

**Exercise Type Distribution:**
- 1 Fill-in-blanks (with word bank)
- 1 Context selection (multiple choice about the story)
- 1 Code debugging (fix grammatical errors)
- 1 Translation or open-ended

**Exercise Template:**
```json
{
  "type": "fill-in-blanks",
  "question": "Complete the sentence: Алекс работает в _______.",
  "wordBank": ["стартапе", "офис", "команда"],
  "correctAnswer": "стартапе",
  "explanation": "After 'в' (in/at) we use prepositional case: 'в стартапе'"
}
```

### Step 6: Add Enrichment (Optional)

**Pronunciation Notes** (2-3 times per week):
```json
{
  "word": "репозиторий",
  "ipa": "rʲɪpəzʲɪˈtorʲɪj",
  "phonetic": "reh-poh-zee-TOR-eey",
  "pitfalls": "Stress on second 'o', not first syllable"
}
```

**Cultural Insights** (2-3 times per week):
```json
{
  "topic": "Russian Dev Culture",
  "content": "Russian developers often mix English tech terms with Russian grammar..."
}
```

### Step 7: Story Continuity

Maintain narrative threads:
- Reference previous events: "Вчера Алекс исправил баг..." (Yesterday Alex fixed a bug...)
- Character development: Show growth, relationships, conflicts
- Seasonal events: Company milestones, holidays, product launches
- Ongoing projects: Follow a feature from design to deployment

### Step 8: Validate Content

Before finalizing:
- ✅ Grammar is correct for the phase level
- ✅ Vocabulary includes stress marks
- ✅ Exercises have clear correct answers
- ✅ Story is engaging and memorable
- ✅ Technical context is accurate
- ✅ Word count matches phase guidelines
- ✅ JSON is valid and follows schema

## Quick Reference: Phase Grammar Focus

### Phase 1 (Days 1-22)
- Present tense verbs
- Personal pronouns (я, ты, он, она, мы, вы, они)
- Basic nominative case
- Simple questions (Кто? Что? Где?)
- Simple negation (не + verb)

### Phase 2 (Days 23-45)
- Past tense (perfective vs imperfective introduction)
- Future tense (буду + infinitive, perfective future)
- Conjunctions (и, но, а, потому что, когда)
- Modal verbs (могу, должен, хочу, надо)
- Compound sentences

### Phase 3 (Days 46-68)
- **Accusative case** (Days 46-52): Direct objects
- **Genitive case** (Days 53-59): Possession, negation, "of"
- **Instrumental case** (Days 60-64): Tools, methods, "with"
- **Prepositional case** (Days 65-68): Location, topics
- Dative case introduction (Days 67-68)
- Complex sentences with subordinate clauses

### Phase 4 (Days 69-90)
- All cases in natural use
- Conditional sentences (если..., то...)
- Subjunctive mood (бы)
- Passive voice
- Participles and gerunds (light introduction)
- Formal vs informal register
- Technical argumentation

## Example: Complete Day 3 Template

```json
{
  "day": 3,
  "phase": 1,
  "title": "First Bug Fix",
  "difficultyLevel": "A2-",

  "textRussian": "Алекс находит <strong>баг</strong> в коде. Он видит <strong>ошибку</strong> в <strong>консоли</strong>. «Это <strong>null pointer exception</strong>», — думает он. Дмитрий помогает. Они смотрят <strong>логи</strong>. Алекс понимает проблему. Он исправляет код. Он пишет <strong>тест</strong>. Тест проходит! Дмитрий говорит: «Отличная работа!» Алекс делает <strong>коммит</strong>. Его первый баг исправлен. Он чувствует себя счастливым.",

  "textEnglish": "Alex finds a bug in the code. He sees an error in the console. 'This is a null pointer exception,' he thinks. Dmitry helps. They look at the logs. Alex understands the problem. He fixes the code. He writes a test. The test passes! Dmitry says: 'Great job!' Alex makes a commit. His first bug is fixed. He feels happy.",

  "vocabulary": [
    {
      "russian": "баг",
      "english": "bug (software bug)",
      "context": "Direct borrowing from English. Essential dev vocabulary."
    },
    {
      "russian": "оши́бка",
      "english": "error / mistake",
      "context": "General term for error. 'Ошибка в коде' = error in code."
    },
    {
      "russian": "ло́ги",
      "english": "logs (system/application logs)",
      "context": "Plural of 'лог'. 'Смотреть логи' = to check/look at logs."
    },
    {
      "russian": "тест",
      "english": "test (unit test, integration test)",
      "context": "Same as English. 'Писать тест' = to write a test.",
      "reactivatedFrom": 1
    },
    {
      "russian": "комми́т",
      "english": "commit (git commit)",
      "context": "Borrowed from English. 'Делать коммит' = to make a commit.",
      "reactivatedFrom": 2
    }
  ],

  "exercises": [
    {
      "type": "fill-in-blanks",
      "question": "Алекс находит _______ в коде. Он исправляет _______.",
      "wordBank": ["баг", "тест", "код", "ошибку"],
      "correctAnswer": "баг, код",
      "explanation": "Alex finds a bug in the code. He fixes the code."
    },
    {
      "type": "context-selection",
      "question": "What does Alex do after fixing the bug?",
      "options": [
        "Он пишет тест (He writes a test)",
        "Он удаляет код (He deletes the code)",
        "Он идёт домой (He goes home)",
        "Он читает документацию (He reads documentation)"
      ],
      "correctAnswer": "Он пишет тест (He writes a test)",
      "explanation": "After fixing, Alex writes a test to verify the fix."
    },
    {
      "type": "code-debugging",
      "question": "Fix the error: 'Алекс находит баг в код.'",
      "options": [
        "Change 'в код' to 'в коде'",
        "Change 'находит' to 'находить'",
        "Change 'баг' to 'баги'",
        "No error"
      ],
      "correctAnswer": "Change 'в код' to 'в коде'",
      "explanation": "After 'в' (in) we need prepositional case: 'в коде' not 'в код'."
    },
    {
      "type": "translation",
      "question": "Translate: 'He looks at the logs.'",
      "correctAnswer": "Он смотрит логи.",
      "explanation": "Simple present tense. 'Смотрит' is 3rd person singular of 'смотреть'."
    }
  ],

  "characters": ["Алекс (Alex)", "Дмитрий (Dmitry)"],
  "storyArc": "Alex fixes his first bug with Dmitry's help.",
  "wordCount": 72,
  "estimatedMinutes": 15
}
```

## Tips for Effective Content

1. **Keep it real**: Use actual dev scenarios you've experienced
2. **Add humor**: Light jokes make content memorable
3. **Show emotions**: Fear before deploys, relief after fixes, frustration with legacy code
4. **Use dialogue**: Makes text more engaging than pure narration
5. **Build suspense**: Will the test pass? Will the deploy succeed?
6. **Celebrate wins**: First commit, first PR merged, first production deploy
7. **Show failure**: Bugs happen, tests fail, deploys break - it's all learning

## Content Generation Tools

You can use the enhanced curriculum prompt with AI to generate batches of lessons. The system prompt includes all these guidelines.

Happy content creation! 🚀
