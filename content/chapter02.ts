import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, confirmed } from './schema';

export const identityWorldSchema = z.object({
  id: z.string(),
  name: contentFieldSchema,
  role: contentFieldSchema,
  accent: z.enum(['azure', 'iris', 'rose', 'ember']),
  description: contentFieldSchema,
  feedsOthers: contentFieldSchema,
});

export type IdentityWorld = z.infer<typeof identityWorldSchema>;

export const chapter02ContentSchema = z.object({
  title: contentFieldSchema,
  subtitle: contentFieldSchema,
  identities: z.array(identityWorldSchema),
  convergenceNarration: contentFieldSchema,
  bridge: contentFieldSchema,
});

export type Chapter02Content = z.infer<typeof chapter02ContentSchema>;

/**
 * Chapter 02: "The Prism" — I Found More Than One World
 * Strict verified documentary content adhering strictly to the user brief.
 * No invented claims, no fabricated personal history.
 */
export const chapter02Content: Chapter02Content = {
  title: confirmed('I Found More Than One World', 'Official Chapter 02 Title'),
  subtitle: draft('Technology and creativity converging', 'Chapter 02 Subtitle'),
  identities: [
    {
      id: 'the-builder',
      name: draft('The Builder', 'Identity 1 Title'),
      role: draft('Full-Stack Developer', 'Identity 1 Role'),
      accent: 'azure',
      description: draft(
        'I like building complete digital experiences: applications, backend systems, software products.',
        'Identity 1 Description'
      ),
      feedsOthers: draft(
        'Builds the stage where everything else can run.',
        'Identity 1 Feeds Others'
      ),
    },
    {
      id: 'the-engineer-of-intelligence',
      name: draft('The Engineer of Intelligence', 'Identity 2 Title'),
      role: draft('AI Engineer', 'Identity 2 Role'),
      accent: 'iris',
      description: draft(
        "I'm drawn to machine learning, intelligent systems and AI-powered applications.",
        'Identity 2 Description'
      ),
      feedsOthers: draft(
        'Gives what I build a way to learn and adapt.',
        'Identity 2 Feeds Others'
      ),
    },
    {
      id: 'the-visual-thinker',
      name: draft('The Visual Thinker', 'Identity 3 Title'),
      role: draft('Graphic Designer', 'Identity 3 Role'),
      accent: 'rose',
      description: draft(
        'I think in visual communication: branding, typography, composition.',
        'Identity 3 Description'
      ),
      feedsOthers: draft(
        'Makes what I build and think understandable.',
        'Identity 3 Feeds Others'
      ),
    },
    {
      id: 'the-explorer',
      name: draft('The Explorer', 'Identity 4 Title'),
      role: draft('AI Enthusiast', 'Identity 4 Role'),
      accent: 'ember',
      description: draft(
        'I follow emerging technologies, experiments and future possibilities.',
        'Identity 4 Description'
      ),
      feedsOthers: draft(
        'Keeps asking what to try next.',
        'Identity 4 Feeds Others'
      ),
    },
  ],
  convergenceNarration: draft(
    "I eventually realised that I didn't want to choose between technology and creativity. I wanted to explore both.",
    'Exact verified Chapter 02 convergence narration'
  ),
  bridge: draft(
    "Once I'd found these worlds, I wanted to build something real.",
    'Chapter 02 Bridge leading into Chapter 03'
  ),
};
