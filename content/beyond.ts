import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, isContentRenderable } from './schema';

export const beyondCategorySchema = z.enum([
  'Photography',
  'Inspirations',
  'Hobbies',
  'Influences',
  'Research Bet',
  'Engineering Principle',
  'Future Frontier',
  'Open Hypothesis',
]);
export type BeyondCategory = z.infer<typeof beyondCategorySchema>;

export const beyondItemSchema = z.object({
  id: z.string(),
  title: contentFieldSchema,
  category: beyondCategorySchema,
  description: contentFieldSchema,
  caption: contentFieldSchema.optional(),
  currentInvestigation: contentFieldSchema.optional(),
  image: z.string().optional(),
  blurDataUrl: z.string().optional(),
  notes: contentFieldSchema.optional(),
  parallaxSpeed: z.number().optional(),
});
export type BeyondItem = z.infer<typeof beyondItemSchema>;

const placeholderBlur =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGQwZDBkIiAvPjwvc3ZnPg==';

const rawBeyond: BeyondItem[] = [
  {
    id: 'beyond-analog-photography',
    title: draft('35mm Film Photography & Mechanical Latitudes'),
    category: 'Photography',
    description: draft(
      'Documenting changing landscapes across Assam, industrial bridges, and architectural textures using mechanical analog cameras and mechanical shutters.'
    ),
    caption: draft('Film teaches patience: 36 exposures where every frame requires deliberate focus and intention.'),
    blurDataUrl: placeholderBlur,
    parallaxSpeed: 0.15,
  },
  {
    id: 'beyond-monolithic-architecture',
    title: draft('Brutalist Architecture & High-Relief Monoliths'),
    category: 'Influences',
    description: draft(
      'Studying how monumental concrete forms, honest material exposure, and deliberate shadows communicate strength without ornamental excess.'
    ),
    caption: draft('Architecture is structural honesty made physical — exactly like well-architected backend systems.'),
    blurDataUrl: placeholderBlur,
    parallaxSpeed: -0.1,
  },
  {
    id: 'beyond-tactile-interfaces',
    title: draft('Tactile Keyboards & Acoustic Actuation'),
    category: 'Hobbies',
    description: draft(
      'Custom soldering, switch tuning, force curve calibration, and understanding the physical tactile ergonomics of engineering tools.'
    ),
    caption: draft('The physical instruments we touch 10 hours a day deserve the same precision as the code we write.'),
    blurDataUrl: placeholderBlur,
    parallaxSpeed: 0.2,
  },
  {
    id: 'beyond-independent-presses',
    title: draft('Independent Monograph Presses & Print Craft'),
    category: 'Inspirations',
    description: draft(
      'Collecting limited-run design monographs, letterpress specimens, and studying tactile paper weights from independent Japanese and European publishing houses.'
    ),
    caption: draft('Physical print endures without batteries, servers, or bandwidth — the ultimate offline-first medium.'),
    blurDataUrl: placeholderBlur,
    parallaxSpeed: -0.15,
  },
];

export const beyond: BeyondItem[] = z.array(beyondItemSchema).parse(rawBeyond);

/**
 * Returns true if beyond has renderable items.
 * If false, Chapter 07 is hidden everywhere (Story, Thread, Index, Explore).
 */
export function hasBeyondContent(): boolean {
  if (!beyond || beyond.length === 0) return false;
  return beyond.some((item) => isContentRenderable(item.title));
}
