# Complete Exercise Types Guide

This document describes all available exercise types in the Russian for Software Engineers platform.

## Available Exercise Types

### 1. Matching (`matching`)
**Description**: Match Russian words/phrases with their English equivalents.

**When to use**:
- Phase 1-2: Vocabulary introduction
- Quick vocabulary review
- Testing recognition skills

**JSON Structure**:
```json
{
  "type": "matching",
  "question": "Match the Russian words with their English meanings:",
  "pairs": [
    { "russian": "программист", "english": "programmer" },
    { "russian": "стартап", "english": "startup" },
    { "russian": "код", "english": "code" }
  ],
  "correctAnswer": ["0-0", "1-1", "2-2"],
  "explanation": "These are core vocabulary words..."
}
```

**User Experience**:
- Click Russian word to select it
- Click English word to match
- Matched pairs turn green
- Interactive and visual

---

### 2. Context Selection (`context-selection`)
**Description**: Multiple choice questions about the story content.

**When to use**:
- Testing reading comprehension
- All phases
- Reinforcing story elements

**JSON Structure**:
```json
{
  "type": "context-selection",
  "question": "What does Dmitry show to Alex?",
  "options": [
    "Репозиторий (repository)",
    "Тесты (tests)",
    "Документацию (documentation)"
  ],
  "correctAnswer": "Репозиторий (repository)",
  "explanation": "Dmitry says: 'Это наш репозиторий'"
}
```

---

### 3. Sentence Reordering (`sentence-reordering`)
**Description**: Arrange scrambled words into correct Russian sentence.

**When to use**:
- Phase 2+: Testing word order
- Grammar structure practice
- Syntax understanding

**JSON Structure**:
```json
{
  "type": "sentence-reordering",
  "question": "Arrange these words to form a correct sentence:",
  "scrambledWords": ["Алекс", "в", "работает", "стартапе"],
  "correctAnswer": ["Алекс", "работает", "в", "стартапе"],
  "explanation": "Subject-Verb-Prepositional Phrase word order."
}
```

**User Experience**:
- Click words from "Available Words" area
- Build sentence in "Your Sentence" area
- Click words in sentence to remove them
- Visual drag-and-drop style interface

---

### 4. Code Debugging (`code-debugging`)
**Description**: Identify and fix grammatical errors in Russian sentences.

**When to use**:
- All phases
- Testing grammar rules
- Case endings practice
- Common mistakes

**JSON Structure**:
```json
{
  "type": "code-debugging",
  "question": "Find the error: 'Алекс программисты. Он работает в офис.'",
  "options": [
    "программисты → программист",
    "в офис → в офисе",
    "Both A and B",
    "No error"
  ],
  "correctAnswer": "Both A and B",
  "explanation": "Plural should be singular. Prepositional case needed after 'в'."
}
```

---

### 5. Fill-in-Blanks (`fill-in-blanks`)
**Description**: Complete sentences using words from a word bank.

**When to use**:
- All phases
- Vocabulary recall
- Context practice
- Can test multiple blanks

**JSON Structure**:
```json
{
  "type": "fill-in-blanks",
  "question": "Алекс открывает _______. Он вводит _______.",
  "wordBank": ["терминал", "команду", "браузер", "файл"],
  "correctAnswer": "терминал, команду",
  "explanation": "Alex opens the terminal and enters a command."
}
```

**Format for correctAnswer**:
- Single blank: `"терминал"`
- Multiple blanks: `"терминал, команду"` (comma-separated, order matters)

---

### 6. Verb Conjugation (`verb-conjugation`)
**Description**: Fill in the correct verb form.

**When to use**:
- Phase 2+: Verb practice
- Tense mastery
- Conjugation patterns

**JSON Structure**:
```json
{
  "type": "verb-conjugation",
  "question": "Fill in the correct verb form: Дмитрий _______ (помогать) Алексу.",
  "wordBank": ["помогает", "помогать", "помогал", "помогают"],
  "correctAnswer": "помогает",
  "explanation": "Present tense, 3rd person singular: 'помогает' (helps)."
}
```

**Best Practices**:
- Show infinitive in parentheses
- Provide word bank with different forms
- Test one concept at a time (tense, person, etc.)

---

### 7. Case Selection (`case-selection`)
**Description**: Choose the correct case form for a given context.

**When to use**:
- Phase 3+: Case system focus
- Testing case understanding
- Preposition + case combinations

**JSON Structure**:
```json
{
  "type": "case-selection",
  "question": "Choose the correct form: 'В _____ открывается приложение.'",
  "options": [
    "браузер (nominative)",
    "браузере (prepositional)",
    "браузера (genitive)",
    "браузером (instrumental)"
  ],
  "correctAnswer": "браузере (prepositional)",
  "explanation": "After 'в' (in) referring to location, we use prepositional case."
}
```

**Best Practices**:
- Label each option with case name
- Explain why that case is needed
- Focus on one preposition or context

---

### 8. Code-Switching (`code-switching`)
**Description**: Complete a sentence that starts in English and continues in Russian (or vice versa).

**When to use**:
- Phase 2+: Active production
- Bridging languages
- Practical communication
- Testing application

**JSON Structure**:
```json
{
  "type": "code-switching",
  "question": "Complete in Russian: 'Yesterday Alex _______ (fixed) the bug.'",
  "wordBank": ["исправил", "исправляет", "исправить", "исправлял"],
  "correctAnswer": "исправил",
  "explanation": "Past tense perfective: 'исправил' indicates completed action."
}
```

**Variations**:
- English → Russian completion
- Russian → English → Russian
- Workplace hybrid phrases

---

## Exercise Type Selection Guide

### Phase 1 (Days 1-22) - Foundation
**Recommended Mix**:
- Matching (30%)
- Context Selection (25%)
- Fill-in-Blanks (25%)
- Code Debugging (20%)

**Why**: Simple, recognition-based exercises. Focus on vocabulary and basic patterns.

### Phase 2 (Days 23-45) - Agile Interactions
**Recommended Mix**:
- Verb Conjugation (25%)
- Sentence Reordering (20%)
- Context Selection (20%)
- Fill-in-Blanks (20%)
- Code Debugging (15%)

**Why**: Introduce active production and word order understanding.

### Phase 3 (Days 46-68) - Technical Workflows & Cases
**Recommended Mix**:
- Case Selection (30%)
- Sentence Reordering (20%)
- Verb Conjugation (15%)
- Code-Switching (15%)
- Context Selection (10%)
- Code Debugging (10%)

**Why**: Heavy focus on case system with production practice.

### Phase 4 (Days 69-90) - Advanced Technical Leadership
**Recommended Mix**:
- Code-Switching (30%)
- Case Selection (25%)
- Sentence Reordering (20%)
- Verb Conjugation (15%)
- Context Selection (10%)

**Why**: Focus on natural production and complex structures.

---

## Tips for Writing Effective Exercises

### 1. Matching Exercises
- Use 3-5 pairs per exercise
- Shuffle English order automatically (handled by UI)
- Keep all words at similar difficulty
- Use thematically related words

### 2. Sentence Reordering
- Start with 4-5 words in Phase 2
- Gradually increase to 6-8 words in Phase 4
- Test one grammar point (word order, case placement)
- Avoid ambiguous sentences

### 3. Fill-in-Blanks
- Provide 4-6 words in word bank
- Include plausible distractors
- Test vocabulary in context
- Can test 1-3 blanks per exercise

### 4. Verb Conjugation
- Always show infinitive
- Provide 3-4 forms in word bank
- Include one correct answer and logical distractors
- Explain the tense/person/aspect chosen

### 5. Case Selection
- Label each option clearly with case name
- Provide context that demands specific case
- Explain the rule (preposition, verb requirement, etc.)
- Focus on one case concept per exercise

### 6. Code-Switching
- Keep sentences short (8-12 words)
- Provide word bank with 3-5 options
- Test one grammar point (tense, case, word form)
- Make it feel natural, not forced

### 7. Context Selection
- Base on actual story content
- All options should be plausible
- Test comprehension, not memory tricks
- Explain where the answer comes from

### 8. Code Debugging
- Maximum 2 errors per sentence
- Include "Both X and Y" or "No error" options
- Common errors: case endings, verb forms, plurals
- Explain each error in the explanation

---

## Answer Format Requirements

### String Answers
```json
"correctAnswer": "помогает"
```

### Multiple Fill-in-Blanks
```json
"correctAnswer": "терминал, команду"
```
*Note: Comma-separated, order matters*

### Array Answers (Matching)
```json
"correctAnswer": ["0-0", "1-1", "2-2", "3-3"]
```
*Note: Format is "russianIndex-englishIndex"*

### Array Answers (Sentence Reordering)
```json
"correctAnswer": ["Алекс", "работает", "в", "стартапе"]
```
*Note: Exact word order matters*

---

## Quality Checklist

Before adding an exercise:
- [ ] Question is clear and unambiguous
- [ ] Correct answer is definitively correct
- [ ] Distractors are plausible but wrong
- [ ] Explanation teaches the concept
- [ ] Difficulty matches the phase
- [ ] Tests vocabulary from the text
- [ ] JSON structure follows schema
- [ ] correctAnswer format is correct for the type

---

## Future Exercise Types (Ideas)

Potential additions:
- **Audio Transcription**: Listen and type what you hear
- **Pronunciation Recording**: Record yourself saying the sentence
- **Dialogue Completion**: Multi-turn conversation practice
- **Error Count**: "How many errors are in this paragraph?"
- **Synonym Selection**: "Which word means the same as X?"
- **Antonym Matching**: Opposite pairs
- **Collocations**: "Which words go together?"

---

Generated for Russian for Software Engineers | 90-Day Immersive Reader
