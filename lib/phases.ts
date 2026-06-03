import { PhaseInfo } from '@/types/lesson';

export const phases: PhaseInfo[] = [
  {
    phase: 1,
    title: 'Foundation: Dev Workspace Basics',
    description: 'Short paragraphs with simple sentence structures. Focus on present tense, core development vocabulary, and basic workplace interactions.',
    dayRange: [1, 22],
    focusAreas: [
      'Basic dev workspace vocabulary',
      'Status updates and simple communication',
      'Present tense mastery',
      'Subject-Verb-Object sentence structures',
    ],
    grammarTopics: [
      'Present tense conjugations',
      'Personal pronouns',
      'Basic question formation',
      'Simple negation',
    ],
  },
  {
    phase: 2,
    title: 'Agile Interactions',
    description: 'Introduction of past and future tenses with compound sentences. Covers daily standups, Slack communication, and cross-functional collaboration.',
    dayRange: [23, 45],
    focusAreas: [
      'Agile ceremonies vocabulary',
      'Past and future tense usage',
      'Team collaboration phrases',
      'Written communication (Slack, emails)',
    ],
    grammarTopics: [
      'Past tense (perfective/imperfective)',
      'Future tense formation',
      'Compound sentences with conjunctions',
      'Modal verbs (should, must, can)',
    ],
  },
  {
    phase: 3,
    title: 'Technical Workflows & Cases',
    description: 'Natural integration of Russian cases through complex technical scenarios like debugging, code reviews, and API design.',
    dayRange: [46, 68],
    focusAreas: [
      'Debugging and troubleshooting',
      'Code review discussions',
      'API design and documentation',
      'Technical problem-solving',
    ],
    grammarTopics: [
      'Accusative case (direct objects)',
      'Genitive case (possession, negation)',
      'Instrumental case (tools, methods)',
      'Prepositional case (locations, topics)',
      'Complex sentence structures',
    ],
  },
  {
    phase: 4,
    title: 'Advanced Technical Leadership',
    description: 'Advanced technical Russian covering architectural decisions, production incidents, security debates, and infrastructure optimization.',
    dayRange: [69, 90],
    focusAreas: [
      'Architectural trade-offs and debates',
      'Production incident management',
      'Security and compliance discussions',
      'Infrastructure and scalability',
      'Technical leadership communication',
    ],
    grammarTopics: [
      'All cases in natural context',
      'Conditional sentences',
      'Subjunctive mood',
      'Technical argumentation',
      'Formal vs informal registers',
    ],
  },
];

export const getPhaseByDay = (day: number): PhaseInfo => {
  return phases.find(
    (phase) => day >= phase.dayRange[0] && day <= phase.dayRange[1]
  ) || phases[0];
};

export const getPhaseProgress = (completedDays: number[], phase: PhaseInfo): number => {
  const phaseDays = completedDays.filter(
    (day) => day >= phase.dayRange[0] && day <= phase.dayRange[1]
  );
  const totalDays = phase.dayRange[1] - phase.dayRange[0] + 1;
  return Math.round((phaseDays.length / totalDays) * 100);
};
