export type AccentKey =
  'gold' | 'all' | 'azure' | 'rose' | 'iris' | 'gold-ember' | 'ember' | 'sunrise';

export interface ChapterNarrationItem {
  speaker?: string;
  text: string;
  note?: string;
}

export interface CuriositySlot {
  id: string;
  label: string;
  question: string;
  visualType: 'gear' | 'circuit' | 'sketch';
  placeholder: string;
}

export interface ConvergingIdentity {
  id: string;
  role: string;
  accent: AccentKey;
  description: string;
  feedsOthers: string;
  isPlaceholder?: boolean;
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
  curiositySlots?: CuriositySlot[];
  convergingIdentities?: ConvergingIdentity[];
}

export const chapters: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: 'The Spark',
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
    title: 'It Started With Curiosity',
    subtitle: 'The shift from observer to maker',
    emotionalArc: 'Curiosity',
    accentKey: 'gold',
    summary:
      "I've always been fascinated by understanding how things work. But eventually, understanding wasn't enough. I wanted to create things myself.",
    narration: [
      {
        text: "I've always been fascinated by understanding how things work. But eventually, understanding wasn't enough. I wanted to create things myself.",
        note: 'DRAFT narration — core movement thesis',
      },
      {
        text: '[TODO: Chinmoy to supply: what first sparked curiosity]',
        note: 'PLACEHOLDER: Slot 1 — Early technical spark',
      },
      {
        text: '[TODO: Chinmoy to supply: a first thing I built]',
        note: 'PLACEHOLDER: Slot 2 — First creation milestone',
      },
      {
        text: '[TODO: Chinmoy to supply: what keeps me experimenting]',
        note: 'PLACEHOLDER: Slot 3 — Perpetual experimenter drive',
      },
    ],
    curiositySlots: [
      {
        id: 'slot-spark',
        label: 'THE SPARK',
        question: 'What first sparked curiosity?',
        visualType: 'gear',
        placeholder:
          '[TODO: Chinmoy to supply: what first sparked curiosity — e.g. taking apart hardware, examining how mechanical/digital systems tick]',
      },
      {
        id: 'slot-first-build',
        label: 'FIRST CREATION',
        question: 'A first thing I built',
        visualType: 'circuit',
        placeholder:
          '[TODO: Chinmoy to supply: a first thing I built — e.g. an early C script, electronic circuit, game prototype, or web tool]',
      },
      {
        id: 'slot-fuel',
        label: 'PERPETUAL DRIVE',
        question: 'What keeps me experimenting?',
        visualType: 'sketch',
        placeholder:
          '[TODO: Chinmoy to supply: what keeps me experimenting — e.g. the obsession with bringing imagined systems into tangible reality]',
      },
    ],
    bridgeToNext: 'Understanding was only the first step.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-02',
    number: 2,
    title: 'I Found More Than One World',
    subtitle: 'Four disciplines converging into a single craft',
    emotionalArc: 'Convergence',
    accentKey: 'all',
    summary:
      "I eventually realised that I didn't want to choose between technology and creativity. I wanted to explore both.",
    narration: [
      {
        text: "I eventually realised that I didn't want to choose between technology and creativity. I wanted to explore both.",
        note: 'DRAFT narration — convergence thesis',
      },
    ],
    convergingIdentities: [
      {
        id: 'the-builder',
        role: 'The Builder',
        accent: 'azure',
        description: 'Architecting resilient full-stack systems and production foundations.',
        feedsOthers:
          'Lays the robust infrastructure and scalable mechanics that turn abstract reasoning into reliable products.',
        isPlaceholder: true,
      },
      {
        id: 'the-engineer-of-intelligence',
        role: 'The Engineer of Intelligence',
        accent: 'iris',
        description:
          'Designing autonomous agent workflows, machine learning models, and cognitive systems.',
        feedsOthers:
          'Injects adaptive intelligence and reasoning loops into the builder’s static architectures.',
        isPlaceholder: true,
      },
      {
        id: 'the-visual-thinker',
        role: 'The Visual Thinker',
        accent: 'rose',
        description:
          'Crafting spatial interfaces, fluid motion choreography, and tactile typography.',
        feedsOthers:
          'Gives intelligent systems a human, emotional voice, turning invisible logic into intuitive clarity.',
        isPlaceholder: true,
      },
      {
        id: 'the-explorer',
        role: 'The Explorer',
        accent: 'ember',
        description:
          'Investigating decentralized topologies, civic technology, and community resilience.',
        feedsOthers:
          'Pushes systems into unmapped public frontiers, testing whether technology truly serves real people.',
        isPlaceholder: true,
      },
    ],
    bridgeToNext: 'Having found these worlds, I wanted to build something real.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-03',
    number: 3,
    title: 'I Wanted To Build Something Real',
    subtitle: 'From exploratory scripts to concrete, deployed systems',
    emotionalArc: 'Creation',
    accentKey: 'azure',
    summary:
      'Moving beyond theoretical exercises: engineering full-scale architectures that solve tangible friction for people and institutions.',
    narration: [
      {
        text: 'Building small scripts is empowering, but eventually you crave real weight. You want to engineer systems that stand on their own in the real world.',
        note: 'DRAFT narration — creation thesis',
      },
      {
        text: '[TODO: Chinmoy to supply: Reflections on the transition from learning code to architecting real platforms]',
        note: 'PLACEHOLDER: The drive toward tangible engineering',
      },
    ],
    bridgeToNext:
      'When a system becomes real, how it speaks to people matters as much as how it runs. Architecture demands expression.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-04',
    number: 4,
    title: 'Another Language Called Design',
    subtitle: 'Visual voice, typography, and the architecture of feeling',
    emotionalArc: 'Expression',
    accentKey: 'rose',
    summary:
      'Design is not decoration — it is another language for communicating ideas. A discipline that stands shoulder-to-shoulder with engineering.',
    narration: [
      {
        text: 'Code instructs machines what to do. Design explains to humans why it matters. Design is another language of thought.',
        note: 'DRAFT narration — design co-equality thesis',
      },
      {
        text: '[TODO: Chinmoy to supply: Reflections on visual identity, typography, and why design is co-equal with engineering]',
        note: 'PLACEHOLDER: Craft philosophy from Chinmoy',
      },
    ],
    bridgeToNext:
      'When engineering rigor and visual language unite, you gain the confidence to venture into uncharted frontiers.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-05',
    number: 5,
    title: 'The World of Intelligence',
    subtitle: 'Building and understanding intelligent systems, not merely consuming them',
    emotionalArc: 'Exploration',
    accentKey: 'iris',
    summary: 'I want to understand and build intelligent systems, not merely use AI tools.',
    narration: [
      {
        text: 'I want to understand and build intelligent systems, not merely use AI tools.',
        note: 'DRAFT narration — intelligence thesis',
      },
      {
        text: '[TODO: Chinmoy to supply: Reflections on the transition from using AI APIs to engineering autonomous agentic workflows and local models]',
        note: 'PLACEHOLDER: Awaiting authentic AI engineering reflection',
      },
    ],
    bridgeToNext:
      'Intelligence without real-world utility remains an experiment. The true crucible is taking these systems to people at scale.',
    isPlaceholder: true,
  },
  {
    id: 'chapter-06',
    number: 6,
    title: 'The Crucible of Scale',
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
    title: 'Horizon of Possibility',
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
    title: 'The Story Is Still Being Written',
    subtitle: 'An unfinished narrative, an open invitation to build',
    emotionalArc: 'Possibility',
    accentKey: 'sunrise',
    summary:
      "I don't know exactly where this journey will lead me. And perhaps that's what makes it interesting. There are still ideas to explore, problems to solve and things to create.",
    narration: [
      {
        text: "I don't know exactly where this journey will lead me. And perhaps that's what makes it interesting. There are still ideas to explore, problems to solve and things to create.",
        note: 'DRAFT narration — epilogue thesis',
      },
      {
        text: '[TODO: Chinmoy to supply: Personal closing thoughts and reflection on the unfinished horizon ahead]',
        note: 'PLACEHOLDER: Awaiting authentic closing words',
      },
    ],
    bridgeToNext: 'The story remains open. Let us build what comes next together.',
    isPlaceholder: true,
  },
];
