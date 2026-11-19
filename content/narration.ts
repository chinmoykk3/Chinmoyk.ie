import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const narrationItemSchema = z.object({
  chapterId: z.string(),
  lines: z.array(contentFieldSchema),
});

export const narrationSchema = z.record(z.string(), z.array(contentFieldSchema));

export type NarrationCollection = z.infer<typeof narrationSchema>;

/**
 * Strict verified documentary narration.
 * Uses ONLY the verified draft lines from the project brief.
 * All missing narration items are marked with status "placeholder" and render nothing in production.
 */
export const narration: Record<string, ContentField[]> = {
  prologue: [
    draft(
      'Every story starts somewhere. Mine started with curiosity.',
      'Verified draft opening thesis'
    ),
  ],
  'chapter-01': [
    draft(
      "I've always been fascinated by understanding how things work. But eventually, understanding wasn't enough. I wanted to create things myself.",
      'Verified draft narration Ch01'
    ),
  ],
  'chapter-02': [
    draft(
      "I eventually realised that I didn't want to choose between technology and creativity. I wanted to explore both.",
      'Verified draft narration Ch02'
    ),
  ],
  'chapter-03': [
    placeholder(
      '',
      'Awaiting authentic reflection on building real-world full-stack architectures'
    ),
  ],
  'chapter-04': [
    placeholder(
      '',
      'Awaiting authentic reflection on design systems, visual craft, and typography'
    ),
  ],
  'chapter-05': [
    placeholder(
      '',
      'Awaiting authentic reflection on artificial intelligence and autonomous systems'
    ),
  ],
  'chapter-06': [
    placeholder(
      '',
      'Awaiting authentic reflection on shipping institutional software at scale'
    ),
  ],
  'chapter-07': [
    placeholder(
      '',
      'Awaiting authentic reflection on research frontiers and future bets'
    ),
  ],
  epilogue: [
    draft(
      "I don't know exactly where this journey will lead me. And perhaps that's what makes it interesting. There are still ideas to explore, problems to solve and things to create.",
      'Verified draft epilogue thesis'
    ),
  ],
};

// Validate against Zod schema at runtime
narrationSchema.parse(narration);
