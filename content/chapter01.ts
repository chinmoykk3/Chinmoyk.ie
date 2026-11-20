import { z } from 'zod';
import { contentFieldSchema, placeholder, draft, confirmed, ContentField } from './schema';

export const questionWordSchema = z.object({
  id: z.string(),
  word: contentFieldSchema,
  targetObjectId: z.string(),
});
export type QuestionWord = z.infer<typeof questionWordSchema>;

export const chapter01PersonalNotesSchema = z.object({
  spark: contentFieldSchema,
  firstBuild: contentFieldSchema,
  experimenting: contentFieldSchema,
});
export type Chapter01PersonalNotes = z.infer<typeof chapter01PersonalNotesSchema>;

export const chapter01ContentSchema = z.object({
  title: contentFieldSchema,
  subtitle: contentFieldSchema,
  narrationLines: z.array(contentFieldSchema),
  questionWords: z.array(questionWordSchema),
  bridge: contentFieldSchema,
  personalNotes: chapter01PersonalNotesSchema,
});
export type Chapter01Content = z.infer<typeof chapter01ContentSchema>;

/**
 * Chapter 01: "The Lamp" — It Started With Curiosity
 * Strict verified documentary content adhering strictly to the user brief.
 * No invented claims, no fabricated personal history.
 */
export const chapter01Content: Chapter01Content = {
  title: confirmed('It Started With Curiosity', 'Official Chapter 01 Title'),
  subtitle: draft('The shift from observer to maker', 'Chapter 01 Subtitle'),
  narrationLines: [
    draft(
      "I've always been fascinated by understanding how things work.",
      'Ch01 Line 1: Observation & Understanding'
    ),
    draft(
      "But eventually, understanding wasn't enough.",
      'Ch01 Line 2: The Limit of Observation'
    ),
    draft(
      'I wanted to create things myself.',
      'Ch01 Line 3: The Imperative to Build'
    ),
  ],
  questionWords: [
    {
      id: 'q-how',
      word: draft('how?', 'Curiosity inquiry: mechanics'),
      targetObjectId: 'pocketWatch',
    },
    {
      id: 'q-why',
      word: draft('why?', 'Curiosity inquiry: signal & resonance'),
      targetObjectId: 'radio',
    },
    {
      id: 'q-inside',
      word: draft("what's inside?", 'Curiosity inquiry: optics & light'),
      targetObjectId: 'cameraLens',
    },
    {
      id: 'q-whatif',
      word: draft('what if…?', 'Curiosity inquiry: computation & logic'),
      targetObjectId: 'circuitBoard',
    },
  ],
  bridge: draft(
    'The light I made showed me more than one way forward.',
    'Ch01 Bridge line leading into Chapter 02'
  ),
  personalNotes: {
    spark: placeholder('', 'Awaiting authentic reflection on what first sparked curiosity'),
    firstBuild: placeholder('', 'Awaiting authentic reflection on a first thing built'),
    experimenting: placeholder('', 'Awaiting authentic reflection on what keeps me experimenting'),
  },
};
