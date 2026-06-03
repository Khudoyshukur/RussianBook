# Russian for Software Engineers - 90-Day Immersive Reader

A progressive web application designed to help software engineers learn technical Russian through engaging, story-driven content with systematic grammar progression.

## Features

### Core Features
- ✅ **Progressive Learning Path**: 90 days organized into 4 phases (A2- to B2 level)
- ✅ **Interactive Lessons**: Each day includes Russian text, translation, vocabulary, and exercises
- ✅ **Progress Tracking**: Local storage-based progress tracking with visual feedback
- ✅ **Engaging Content**: Story-driven lessons featuring workplace scenarios and technical contexts
- ✅ **Spaced Repetition**: Vocabulary reactivation from previous lessons
- ✅ **Exercise Variety**: Fill-in-blanks, multiple choice, translation, and code debugging exercises
- ✅ **Pronunciation Guides**: IPA transcription and common pitfalls for challenging words
- ✅ **Cultural Insights**: Periodic notes on Russian workplace culture
- ✅ **Mobile Responsive**: Fully responsive design for learning on any device

### Technical Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage
- **Content Format**: JSON-based lesson structure

## Project Structure

```
RussianBook/
├── app/
│   ├── layout.tsx              # Root layout with Navigation
│   ├── page.tsx                # Home page with course overview
│   ├── lessons/
│   │   └── page.tsx            # All lessons grid view
│   └── lesson/
│       └── [day]/
│           └── page.tsx        # Individual lesson page
├── components/
│   ├── Navigation.tsx          # Top navigation bar
│   ├── ProgressTracker.tsx    # Progress visualization component
│   ├── CollapsibleSection.tsx # Collapsible content sections
│   └── ExerciseSet.tsx         # Interactive exercises component
├── content/
│   └── lessons/
│       ├── day-001.json        # Sample lesson Day 1
│       └── day-002.json        # Sample lesson Day 2
├── lib/
│   ├── progress.ts             # Progress tracking utilities
│   ├── lessons.ts              # Lesson loading and management
│   └── phases.ts               # Phase information and utilities
├── types/
│   └── lesson.ts               # TypeScript type definitions
└── public/                     # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/kjuraev/Projects/RussianBook
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Content Structure

### Lesson Schema

Each lesson follows this structure:

```typescript
{
  day: number;                    // Day number (1-90)
  phase: Phase;                   // Learning phase (1-4)
  title: string;                  // Lesson title in English
  difficultyLevel: string;        // CEFR level (A2-, A2, A2+, B1, B1+, B2)

  textRussian: string;            // Russian text with <strong> tags
  textEnglish: string;            // Parallel English translation

  vocabulary: VocabularyItem[];   // 5-8 key words/phrases
  exercises: Exercise[];          // 3-4 interactive exercises

  pronunciation?: PronunciationNote[];  // Optional pronunciation guides
  culturalInsight?: CulturalInsight;    // Optional cultural context

  characters?: string[];          // Recurring characters
  storyArc?: string;             // Plot summary
  wordCount: number;             // Text word count
  estimatedMinutes: number;      // Estimated completion time
}
```

### Learning Phases

**Phase 1 (Days 1-22)**: Foundation - Dev Workspace Basics
- Present tense focus
- Simple sentence structures
- Core development vocabulary

**Phase 2 (Days 23-45)**: Agile Interactions
- Past and future tenses
- Team collaboration scenarios
- Compound sentences

**Phase 3 (Days 46-68)**: Technical Workflows & Cases
- Russian case system integration
- Debugging and code reviews
- Complex technical scenarios

**Phase 4 (Days 69-90)**: Advanced Technical Leadership
- Architectural discussions
- Production incidents
- Advanced technical communication

## Adding New Lessons

1. Create a new JSON file in `content/lessons/`:
```bash
content/lessons/day-003.json
```

2. Follow the lesson schema (see examples in day-001.json and day-002.json)

3. Import the lesson in `lib/lessons.ts`:
```typescript
import day003 from '@/content/lessons/day-003.json';

const lessonMap: Record<number, Lesson> = {
  1: day001 as Lesson,
  2: day002 as Lesson,
  3: day003 as Lesson, // Add new lesson
  // ... more lessons
};
```

4. The lesson will automatically appear in the UI

## Key Components

### ProgressTracker
Displays overall progress and phase-by-phase breakdown. Updates in real-time as lessons are completed.

### ExerciseSet
Renders interactive exercises with:
- Automatic answer validation
- Instant feedback
- Score tracking
- "Try Again" functionality

### CollapsibleSection
Collapsible content sections for:
- Text (Текст)
- Translation (Перевод)
- Vocabulary (Словарный запас)
- Exercises (Упражнения)
- Pronunciation Notes
- Cultural Insights

## Progress Tracking

Progress is stored in `localStorage` with the following data:
- Completed days
- Current day
- Exercise scores per day
- Vocabulary mastery levels
- Last access date

To reset progress:
```javascript
localStorage.removeItem('russian-book-progress');
```

## Future Enhancements

Potential features to add:
- [ ] Audio pronunciation for all lessons
- [ ] Anki flashcard export
- [ ] Search functionality across lessons
- [ ] User accounts with cloud sync
- [ ] Review days (Days 22, 45, 68, 90)
- [ ] Vocabulary quiz mode
- [ ] Completion certificates
- [ ] Dark mode toggle
- [ ] All 90 days of content

## Development

### Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management
- **localStorage API**: Progress persistence

## Contributing

To add content:
1. Create lesson JSON files following the schema
2. Test exercises thoroughly
3. Ensure vocabulary includes stress marks
4. Verify translations are accurate
5. Include cultural context where relevant

## License

This project is for educational purposes.

## Support

For issues or questions, please open an issue in the project repository.

---

**Current Status**: ✅ MVP Complete with 2 sample lessons
**Next Steps**: Generate Days 3-90 content following the progressive curriculum model
