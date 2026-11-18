export type AccentKey =
  'gold' | 'all' | 'azure' | 'rose' | 'iris' | 'gold-ember' | 'ember' | 'sunrise';

export interface ChapterNarrationItem {
  speaker?: string;
  text: string;
  note?: string;
}

export interface Chapter {
  id: string;
  number: number | string; // e.g. 0 for Prologue, 1-7, 'Epilogue'
  title: string;
  subtitle: string;
  emotionalArc: string;
  accentKey: AccentKey;
  summary: string;
  narration: ChapterNarrationItem[];
  bridgeToNext: string;
  isPlaceholder?: boolean;
}

export const chapters: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: 'Prologue: The Spark',
    subtitle: 'Where questioning begins',
    emotionalArc: 'Curiosity',
    accentKey: 'gold',
    summary:
      'Before systems, code, and architectures, there was only relentless curiosity — the drive to dismantle and understand.',
    narration: [
      {
        text: 'Everything started not with an answer, but with an insatiable need to ask why things work the way they do.',
        note: 'DRAFT narration — personal reflection',
      },
      {
        text: '[TODO: Add personal opening memory/reflection about early fascination with machines, computers, or problem-solving]',
        note: 'PLACEHOLDER: Awaiting authentic personal memory from Chinmoy',
      },
    ],
    bridgeToNext:
      'Curiosity alone asks questions; discovery begins when the first answers reveal how deep the world really is.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-01',
    number: 1,
    title: 'Chapter 01: The First Terminal',
    subtitle: 'Uncovering the digital canvas',
    emotionalArc: 'Discovery',
    accentKey: 'gold',
    summary:
      'The discovery of computing: when text becomes instruction, and instruction brings ideas to life.',
    narration: [
      {
        text: 'The moment lines of code execute on screen for the first time, the boundary between imagination and reality dissolves.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Add personal milestone: first language learned, first tool built, or pivotal discovery moment]',
        note: 'PLACEHOLDER: Awaiting real dates and early experiences',
      },
    ],
    bridgeToNext:
      'Understanding the mechanics opens the door to testing boundaries — breaking things to see how they rebuild.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-02',
    number: 2,
    title: 'Chapter 02: Breaking & Building',
    subtitle: 'Trial by code and curiosity',
    emotionalArc: 'Experimentation',
    accentKey: 'all',
    summary:
      'The experimental stage: tinkering with prototypes, scripts, and unraveling failures into insight across all directions.',
    narration: [
      {
        text: 'Experimentation is messy. It is the willingness to build imperfect things repeatedly until intuition forms.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Add specific experimental projects, early hackathons, or exploratory prototypes]',
        note: 'PLACEHOLDER: Awaiting authentic project memories',
      },
    ],
    bridgeToNext:
      'Out of chaotic experimentation crystallizes the desire to craft coherent, purposeful products.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-03',
    number: 3,
    title: 'Chapter 03: Architecture of Meaning',
    subtitle: 'From scripts to cohesive software',
    emotionalArc: 'Creation',
    accentKey: 'azure',
    summary:
      'Engineering end-to-end applications designed to solve concrete problems for real communities.',
    narration: [
      {
        text: 'Software creation shifts when you realize code is never about the developer — it is about the person whose friction you remove.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Detail the shift into full-stack development, early system designs, and community platforms]',
        note: 'PLACEHOLDER: Add real architectural breakthroughs',
      },
    ],
    bridgeToNext:
      'Functionality is the baseline; how a system communicates its soul requires sensory and visual craft.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-04',
    number: 4,
    title: 'Chapter 04: The Visual Voice',
    subtitle: 'Where engineering meets sensory craft',
    emotionalArc: 'Expression',
    accentKey: 'rose',
    summary:
      'Bridging backend rigor with interactive visual design, motion dynamics, and micro-interactions.',
    narration: [
      {
        text: 'An interface is not decoration. It is the language through which complexity explains itself gracefully.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Add personal insights on design systems, 3D interaction, spatial design, and typography craft]',
        note: 'PLACEHOLDER: Awaiting Chinmoy design philosophy notes',
      },
    ],
    bridgeToNext:
      'When technical capability unites with expressive design, wider territories call to be explored.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-05',
    number: 5,
    title: 'Chapter 05: Uncharted Frontiers',
    subtitle: 'Stepping into AI, decentralization, and complex domains',
    emotionalArc: 'Exploration',
    accentKey: 'iris',
    summary:
      'Diving into generative AI, decentralized protocols, and data-heavy institutional infrastructures.',
    narration: [
      {
        text: 'True exploration requires stepping into domains where standard playbooks do not yet exist.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Highlight exploration in AI systems, decentralization (Sahyog Cryptos), or regional data platforms (IRDMS Assam)]',
        note: 'PLACEHOLDER: Awaiting project background details',
      },
    ],
    bridgeToNext:
      'Every frontier explored transforms the builder, demanding deeper resilience and systematic growth.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-06',
    number: 6,
    title: 'Chapter 06: The Crucible of Scale',
    subtitle: 'Refining craft through real-world constraints',
    emotionalArc: 'Growth',
    accentKey: 'gold-ember',
    summary:
      'Navigating real-world stakes, user adoption, latency, reliability, and engineering discipline under pressure.',
    narration: [
      {
        text: 'Growth does not happen in isolation. It happens when software encounters real people, real friction, and real accountability.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Add lessons from shipping institutional software like GCU Campus Flow or public systems]',
        note: 'PLACEHOLDER: Add verified user numbers, scale metrics, or organizational context',
      },
    ],
    bridgeToNext:
      'Mastering today’s constraints clears the lens to envision what could be built tomorrow.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-07',
    number: 7,
    title: 'Chapter 07: Horizon of Possibility',
    subtitle: 'Active frontiers and future convictions',
    emotionalArc: 'Possibility',
    accentKey: 'ember',
    summary:
      'Synthesizing creative engineering, intelligent systems, and enduring craft for what lies ahead.',
    narration: [
      {
        text: 'We stand at the intersection of autonomous intelligence and human expression. What we choose to build now defines the shape of our tools.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Detail Chinmoy’s current research focus, active hypotheses, and next-generation ambitions]',
        note: 'PLACEHOLDER: Awaiting forward-looking statements',
      },
    ],
    bridgeToNext: 'No story is finished while there is still work to be made.',
    isPlaceholder: true,
  },
  {
    id: 'epilogue',
    number: 'Epilogue',
    title: 'Epilogue: A Story Still Unfolding',
    subtitle: 'Open invitations to collaborate',
    emotionalArc: 'Possibility',
    accentKey: 'sunrise',
    summary:
      'The journey continues into full illumination. An invitation to build, converse, and push boundaries together.',
    narration: [
      {
        text: 'This portfolio is not an archive of what has ended. It is an artifact of momentum.',
        note: 'DRAFT narration',
      },
      {
        text: '[TODO: Add personal closing sign-off from Chinmoy Kalita]',
        note: 'PLACEHOLDER: Awaiting authentic closing words',
      },
    ],
    bridgeToNext: 'Explore the work or start a conversation.',
    isPlaceholder: true,
  },
];
