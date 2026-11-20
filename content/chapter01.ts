import { z } from 'zod';
import { contentFieldSchema, placeholder, ContentField } from './schema';

export const chapter01PersonalNotesSchema = z.object({
  spark: contentFieldSchema,
  firstBuild: contentFieldSchema,
  experimenting: contentFieldSchema,
});

export type Chapter01PersonalNotes = z.infer<typeof chapter01PersonalNotesSchema>;

/**
 * Optional personal reflections for Chapter 01 "The Mechanism".
 * Follows the strict quiet placeholders rule:
 * Unconfirmed items remain empty placeholders in production (zero text rendered).
 * If confirmed by Chinmoy, they appear as small italic marginal notes with thin gold leader lines.
 */
export const chapter01PersonalNotes: Chapter01PersonalNotes = {
  spark: placeholder('', 'Awaiting authentic reflection on what first sparked curiosity'),
  firstBuild: placeholder('', 'Awaiting authentic reflection on a first thing built'),
  experimenting: placeholder('', 'Awaiting authentic reflection on what keeps me experimenting'),
};
