export interface CommentaryItem {
  id: string; // target id: chapter id (e.g. 'chapter-01') or project slug (e.g. 'sahyog-cryptos')
  targetType: 'chapter' | 'project' | 'design';
  category:
    | 'Why I built this'
    | "What I'd do differently"
    | 'A decision I struggled with'
    | "Director's Reflection";
  note: string;
  isPlaceholder: boolean;
}

export const commentaryItems: CommentaryItem[] = [
  {
    id: 'chapter-01',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: '[TODO: Chinmoy to write: Reflections on the transition from taking things apart to building the first working software]',
    isPlaceholder: true,
  },
  {
    id: 'chapter-02',
    targetType: 'chapter',
    category: 'A decision I struggled with',
    note: '[TODO: Chinmoy to write: The tension between specializing in a single framework versus mastering the full multidisciplinary spectrum]',
    isPlaceholder: true,
  },
  {
    id: 'chapter-03',
    targetType: 'chapter',
    category: 'Why I built this',
    note: '[TODO: Chinmoy to write: Why building deployed, real-world systems became the only standard that satisfied my engineering drive]',
    isPlaceholder: true,
  },
  {
    id: 'chapter-04',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: '[TODO: Chinmoy to write: Why visual design and typography are equal disciplines to backend architecture in my craft]',
    isPlaceholder: true,
  },
  {
    id: 'chapter-05',
    targetType: 'chapter',
    category: 'A decision I struggled with',
    note: '[TODO: Chinmoy to write: Moving beyond API consumption toward deep local model inference and autonomous agent architectures]',
    isPlaceholder: true,
  },
  {
    id: 'sahyog-cryptos',
    targetType: 'project',
    category: "What I'd do differently",
    note: '[TODO: Chinmoy to write: What architectural or state synchronization decisions I would refine in Sahyog Cryptos today]',
    isPlaceholder: true,
  },
  {
    id: 'librarium-2-0',
    targetType: 'project',
    category: 'A decision I struggled with',
    note: '[TODO: Chinmoy to write: Bridging physical library book tracking with low-latency browser state in Librarium 2.0]',
    isPlaceholder: true,
  },
  {
    id: 'gcu-campus-flow',
    targetType: 'project',
    category: 'Why I built this',
    note: '[TODO: Chinmoy to write: Addressing administrative paper log bottlenecks across university department approvals]',
    isPlaceholder: true,
  },
  {
    id: 'irdms-assam',
    targetType: 'project',
    category: 'Why I built this',
    note: '[TODO: Chinmoy to write: The imperative to build low-bandwidth disaster relief mapping for Assam during flood emergencies]',
    isPlaceholder: true,
  },
  {
    id: 'epilogue',
    targetType: 'chapter',
    category: "Director's Reflection",
    note: '[TODO: Chinmoy to write: Personal closing conviction on why an unfinished story is the most exciting creative frontier]',
    isPlaceholder: true,
  },
];

export function getCommentaryFor(id: string): CommentaryItem | undefined {
  return commentaryItems.find((item) => item.id === id && item.note && item.note.trim().length > 0);
}

export function hasAnyCommentary(): boolean {
  return commentaryItems.some((item) => item.note && item.note.trim().length > 0);
}
