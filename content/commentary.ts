import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const commentaryCategorySchema = z.enum([
  'Why I built this',
  "What I'd do differently",
  'A decision I struggled with',
  "Director's Reflection",
]);
export type CommentaryCategory = z.infer<typeof commentaryCategorySchema>;

export const commentaryItemSchema = z.object({
  id: z.string(),
  targetType: z.enum(['chapter', 'project', 'design']),
  category: commentaryCategorySchema,
  note: contentFieldSchema,
});
export type CommentaryItem = z.infer<typeof commentaryItemSchema>;

const rawCommentaryItems: CommentaryItem[] = [
  {
    id: 'chapter-01',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: placeholder('[TODO: Chinmoy to write: Reflections on the transition from taking things apart to building the first working software]'),
  },
  {
    id: 'chapter-02',
    targetType: 'chapter',
    category: 'A decision I struggled with',
    note: placeholder('[TODO: Chinmoy to write: The tension between specializing in a single framework versus mastering the multidisciplinary spectrum]'),
  },
  {
    id: 'chapter-03',
    targetType: 'chapter',
    category: 'Why I built this',
    note: placeholder('[TODO: Chinmoy to write: Why building deployed, real-world systems became the standard for my engineering drive]'),
  },
  {
    id: 'chapter-04',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: placeholder('[TODO: Chinmoy to write: Why visual design and typography are equal disciplines to backend architecture in my craft]'),
  },
  {
    id: 'chapter-05',
    targetType: 'chapter',
    category: 'A decision I struggled with',
    note: placeholder('[TODO: Chinmoy to write: Moving beyond API consumption toward deep local model inference and autonomous agent architectures]'),
  },
  {
    id: 'sahyog-cryptos',
    targetType: 'project',
    category: "What I'd do differently",
    note: placeholder('[TODO: Chinmoy to write: What architectural or state synchronization decisions I would refine in Sahyog Cryptos today]'),
  },
  {
    id: 'librarium-2-0',
    targetType: 'project',
    category: 'A decision I struggled with',
    note: placeholder('[TODO: Chinmoy to write: Bridging physical library book tracking with low-latency browser state in Librarium 2.0]'),
  },
  {
    id: 'gcu-campus-flow',
    targetType: 'project',
    category: 'Why I built this',
    note: placeholder('[TODO: Chinmoy to write: Addressing administrative paper log bottlenecks across university department approvals]'),
  },
  {
    id: 'irdms-assam',
    targetType: 'project',
    category: 'Why I built this',
    note: placeholder('[TODO: Chinmoy to write: The imperative to build low-bandwidth disaster relief mapping for Assam during flood emergencies]'),
  },
  {
    id: 'epilogue',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: placeholder('[TODO: Chinmoy to write: Personal closing conviction on why an unfinished story is the most exciting creative frontier]'),
  },
];

export const commentaryItems: CommentaryItem[] = z.array(commentaryItemSchema).parse(rawCommentaryItems);

export function getCommentaryFor(id: string): CommentaryItem | undefined {
  return commentaryItems.find(
    (item) => item.id === id && (item.note.status === 'confirmed' || item.note.status === 'draft')
  );
}

export function hasAnyCommentary(): boolean {
  return commentaryItems.some(
    (item) => item.note.status === 'confirmed' || item.note.status === 'draft'
  );
}
