import { z } from 'zod';
import { contentFieldSchema, ContentField, confirmed, draft, placeholder } from './schema';
import { narration } from './narration';
import { beyond } from './beyond';

export const accentKeySchema = z.enum([
  'gold',
  'all',
  'azure',
  'rose',
  'iris',
  'gold-ember',
  'ember',
  'sunrise',
]);
export type AccentKey = z.infer<typeof accentKeySchema>;

export const curiositySlotSchema = z.object({
  id: z.string(),
  label: z.string(),
  question: contentFieldSchema,
  visualType: z.enum(['gear', 'circuit', 'sketch']),
  placeholder: z.string(),
});
export type CuriositySlot = z.infer<typeof curiositySlotSchema>;

export const convergingIdentitySchema = z.object({
  id: z.string(),
  role: contentFieldSchema,
  accent: accentKeySchema,
  description: contentFieldSchema,
  feedsOthers: contentFieldSchema,
  isPlaceholder: z.boolean().optional(),
});
export type ConvergingIdentity = z.infer<typeof convergingIdentitySchema>;

export const chapterSchema = z.object({
  id: z.string(),
  number: z.union([z.number(), z.string()]),
  title: contentFieldSchema,
  subtitle: contentFieldSchema,
  emotionalArc: z.string(),
  accentKey: accentKeySchema,
  bridge: contentFieldSchema,
  narration: z.array(contentFieldSchema),
  curiositySlots: z.array(curiositySlotSchema).optional(),
  convergingIdentities: z.array(convergingIdentitySchema).optional(),
});

export type Chapter = z.infer<typeof chapterSchema>;

const rawChapters: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: confirmed('Every Story Has a Name', 'Official prologue title'),
    subtitle: draft('Where questioning begins', 'Prologue subtitle'),
    emotionalArc: 'Curiosity',
    accentKey: 'gold',
    bridge: draft(
      'Before I built anything, there was an insatiable question: how does it work?',
      'Bridge leading into Chapter 01'
    ),
    narration: narration.prologue,
  },
  {
    id: 'chapter-01',
    number: 1,
    title: confirmed('It Started With Curiosity', 'Official Chapter 01 title'),
    subtitle: draft('The shift from observer to maker', 'Chapter 01 subtitle'),
    emotionalArc: 'Curiosity',
    accentKey: 'gold',
    bridge: draft(
      'Building taught me that pure engineering was only one half of what I was looking for.',
      'Bridge leading into Chapter 02'
    ),
    narration: narration['chapter-01'],
    curiositySlots: [
      {
        id: 'slot-spark',
        label: 'THE SPARK',
        question: draft('What first sparked curiosity?'),
        visualType: 'gear',
        placeholder: '[TODO: what first sparked curiosity]',
      },
      {
        id: 'slot-first-build',
        label: 'FIRST BUILD',
        question: draft('A first thing I built?'),
        visualType: 'circuit',
        placeholder: '[TODO: a first thing I built]',
      },
      {
        id: 'slot-experimentation',
        label: 'RECURSIVE DRIVE',
        question: draft('What keeps me experimenting?'),
        visualType: 'sketch',
        placeholder: '[TODO: what keeps me experimenting]',
      },
    ],
  },
  {
    id: 'chapter-02',
    number: 2,
    title: confirmed('I Found More Than One World', 'Official Chapter 02 title'),
    subtitle: draft('Technology and creativity converging', 'Chapter 02 subtitle'),
    emotionalArc: 'Discovery',
    accentKey: 'all',
    bridge: draft(
      'Connecting these worlds meant moving beyond experiments into systems people actually use.',
      'Bridge leading into Chapter 03'
    ),
    narration: narration['chapter-02'],
    convergingIdentities: [
      {
        id: 'the-builder',
        role: draft('The Builder'),
        accent: 'azure',
        description: draft('Architecting resilient full-stack systems and production foundations.'),
        feedsOthers: draft('Lays the robust infrastructure and scalable mechanics that turn abstract reasoning into reliable products.'),
      },
      {
        id: 'the-engineer-of-intelligence',
        role: draft('The Engineer of Intelligence'),
        accent: 'iris',
        description: draft('Designing autonomous agent workflows, machine learning models, and cognitive systems.'),
        feedsOthers: draft('Injects adaptive intelligence and reasoning loops into the builder’s static architectures.'),
      },
      {
        id: 'the-visual-thinker',
        role: draft('The Visual Thinker'),
        accent: 'rose',
        description: draft('Crafting typography, spatial composition, and interactive visual narratives.'),
        feedsOthers: draft('Ensures every technical capability communicates with emotional clarity, dignity, and aesthetic precision.'),
      },
      {
        id: 'the-explorer',
        role: draft('The Explorer'),
        accent: 'ember',
        description: draft('Venturing into low-level protocols, decentralization, and uncharted technical frontiers.'),
        feedsOthers: draft('Pulls the entire system forward into unexplored paradigms before they become industry consensus.'),
      },
    ],
  },
  {
    id: 'chapter-03',
    number: 3,
    title: confirmed('I Wanted To Build Something Real', 'Official Chapter 03 title'),
    subtitle: draft('From code to deployed reality', 'Chapter 03 subtitle'),
    emotionalArc: 'Creation',
    accentKey: 'azure',
    bridge: draft(
      'A working system was essential, but how it felt and spoke mattered just as much.',
      'Bridge leading into Chapter 04'
    ),
    narration: narration['chapter-03'],
  },
  {
    id: 'chapter-04',
    number: 4,
    title: confirmed('Another Language Called Design', 'Official Chapter 04 title'),
    subtitle: draft('Visual form, rhythm, and typography', 'Chapter 04 subtitle'),
    emotionalArc: 'Expression',
    accentKey: 'rose',
    bridge: draft(
      'Once form and function aligned, I wanted systems that could reason and adapt.',
      'Bridge leading into Chapter 05'
    ),
    narration: narration['chapter-04'],
  },
  {
    id: 'chapter-05',
    number: 5,
    title: confirmed('The World of Intelligence', 'Official Chapter 05 title'),
    subtitle: draft('From rules to reasoning systems', 'Chapter 05 subtitle'),
    emotionalArc: 'Exploration',
    accentKey: 'iris',
    bridge: draft(
      'The technology kept evolving, but the deeper transformation was in how I worked and learned.',
      'Bridge leading into Chapter 06'
    ),
    narration: narration['chapter-05'],
  },
  {
    id: 'chapter-06',
    number: 6,
    title: confirmed('The Making of Me', 'Official Chapter 06 title'),
    subtitle: draft('Scaling systems and shipping under pressure', 'Chapter 06 subtitle'),
    emotionalArc: 'Growth',
    accentKey: 'gold-ember',
    bridge: draft(
      'The code and interfaces are what I produce, but not the boundary of what drives me.',
      'Bridge leading into Chapter 07'
    ),
    narration: narration['chapter-06'],
  },
  {
    id: 'chapter-07',
    number: 7,
    title: confirmed('Beyond the Work', 'Official Chapter 07 title'),
    subtitle: draft('Explorations outside the primary stack', 'Chapter 07 subtitle'),
    emotionalArc: 'Possibility',
    accentKey: 'ember',
    bridge: draft(
      'Every milestone behind me is only preparation for what comes next.',
      'Bridge leading into Epilogue'
    ),
    narration: narration['chapter-07'],
  },
  {
    id: 'epilogue',
    number: 'Epilogue',
    title: confirmed('The Story Is Still Being Written', 'Official Epilogue title'),
    subtitle: draft('The journey continues', 'Epilogue subtitle'),
    emotionalArc: 'Possibility',
    accentKey: 'sunrise',
    bridge: draft(
      'The next chapter begins with what we build together.',
      'Epilogue closing invitation'
    ),
    narration: narration.epilogue,
  },
];

// Validate all chapters at startup
export const validatedChapters: Chapter[] = z.array(chapterSchema).parse(rawChapters);

export interface ChapterList extends Array<Chapter> {
  visible(): Chapter[];
}

const list = [...validatedChapters] as ChapterList;

/**
 * Requirement 9: Chapter 07 auto-hides if beyond.ts is empty
 */
list.visible = function (): Chapter[] {
  const isBeyondEmpty = !beyond || beyond.length === 0;
  if (isBeyondEmpty) {
    return list.filter((ch) => ch.id !== 'chapter-07');
  }
  return list;
};

export const chapters: ChapterList = list;
