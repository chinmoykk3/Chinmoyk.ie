import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const designCategorySchema = z.enum([
  'Posters',
  'Branding',
  'Typography',
  'Visual experiments',
]);
export type DesignCategory = z.infer<typeof designCategorySchema>;

export const designWorkItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: contentFieldSchema,
  category: designCategorySchema,
  description: contentFieldSchema,
  alt: contentFieldSchema,
  image: z.string(),
  blurDataUrl: z.string(),
  aspectRatio: z.enum(['portrait', 'landscape', 'square']),
  tools: z.array(contentFieldSchema),
  deliverables: z.array(contentFieldSchema),
  year: z.string().optional(),
  isPlaceholder: z.boolean().optional(),
  processStages: z
    .object({
      sketch: z.string(),
      draft: z.string(),
      final: z.string(),
    })
    .optional(),
  processNotes: z.string().optional(),
  caseStudyAvailable: z.boolean().optional(),
});
export type DesignWorkItem = z.infer<typeof designWorkItemSchema>;

function createSvgDataUri(title: string, category: string, accentColor: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <rect width="800" height="1000" fill="#0D0D0D" />
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="#262626" stroke-width="1" />
  <text x="70" y="90" fill="${accentColor}" font-family="monospace" font-size="16" letter-spacing="4">${category.toUpperCase()} SPECIMEN</text>
  <line x1="70" y1="110" x2="730" y2="110" stroke="#262626" stroke-width="1" />
  <g transform="translate(400, 480)">
    <circle r="160" fill="none" stroke="${accentColor}" stroke-width="2" stroke-dasharray="6 6" />
    <circle r="100" fill="none" stroke="#F5F5F5" stroke-opacity="0.2" stroke-width="1" />
  </g>
  <rect x="70" y="800" width="660" height="120" rx="8" fill="#171717" stroke="#262626" />
  <text x="100" y="845" fill="#F5F5F5" font-family="serif" font-size="28">${title}</text>
  <text x="100" y="880" fill="${accentColor}" font-family="monospace" font-size="14">[PLACEHOLDER GRAPHIC]</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const placeholderBlur =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGQwZDBkIiAvPjwvc3ZnPg==';

const rawDesignWork: DesignWorkItem[] = [
  {
    id: 'design-01-kinetic-posters',
    slug: 'kinetic-posters',
    title: draft('Constructivist Tension & Grid Dissolution'),
    category: 'Posters',
    description: draft('Experimental poster series exploring mathematical type alignments under lateral stress.'),
    alt: draft('High-contrast editorial typographic specimen'),
    image: createSvgDataUri('Constructivist Tension', 'Posters', '#FF5C8A'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('Figma'), draft('Illustrator')],
    deliverables: [draft('A1 Silk Screen Prints'), draft('Digital Archive')],
  },
  {
    id: 'design-02-identity-systems',
    slug: 'identity-systems',
    title: draft('Monochrome Spatial Identity'),
    category: 'Branding',
    description: draft('Identity framework developed for a fictional architectural collective based in Guwahati.'),
    alt: draft('Spatial brand architecture specimen'),
    image: createSvgDataUri('Monochrome Identity', 'Branding', '#FF5C8A'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'square',
    tools: [draft('Figma'), draft('After Effects')],
    deliverables: [draft('Brand Guidelines'), draft('Stationery Suite')],
  },
  {
    id: 'design-03-typography-foundations',
    slug: 'typography-foundations',
    title: draft('Optical Kerning & Proportional Rhythm'),
    category: 'Typography',
    description: draft('Specimen exploration testing high-contrast serif display scales against tabular mono counters.'),
    alt: draft('Typographic specimen sheet'),
    image: createSvgDataUri('Optical Kerning', 'Typography', '#FF5C8A'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'landscape',
    tools: [draft('Glyphs'), draft('InDesign')],
    deliverables: [draft('Specimen Book'), draft('Variable Font Testbeds')],
  },
  {
    id: 'design-04-generative-artifacts',
    slug: 'generative-artifacts',
    title: draft('Vector Fields & Algorithmic Topologies'),
    category: 'Visual experiments',
    description: draft('Form studies generated using simplex noise fields constrained by rigid Swiss grid frameworks.'),
    alt: draft('Generative algorithmic vector poster'),
    image: createSvgDataUri('Algorithmic Topologies', 'Visual experiments', '#FF5C8A'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('Processing / Canvas API'), draft('Figma')],
    deliverables: [draft('Vector Plots'), draft('4K Screen Captures')],
  },
];

export const designWork: DesignWorkItem[] = z.array(designWorkItemSchema).parse(rawDesignWork);
export const designWorks = designWork;
