import { z } from 'zod';
import { contentFieldSchema, ContentField, draft } from './schema';

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

function createSvgDataUri(
  title: string,
  category: string,
  stage: 'sketch' | 'draft' | 'final' = 'final',
  accentColor = '#FF5C8A'
): string {
  const isSketch = stage === 'sketch';
  const isDraft = stage === 'draft';
  const stageLabel = stage.toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <rect width="800" height="1000" fill="${isSketch ? '#141414' : isDraft ? '#101010' : '#0D0D0D'}" />
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="${isSketch ? '#333333' : '#262626'}" stroke-width="${isSketch ? '1.5' : '1'}" stroke-dasharray="${isSketch ? '4 4' : 'none'}" />
  <text x="70" y="90" fill="${accentColor}" font-family="monospace" font-size="14" letter-spacing="3">${category.toUpperCase()} · ${stageLabel}</text>
  <line x1="70" y1="110" x2="730" y2="110" stroke="#262626" stroke-width="1" />
  <g transform="translate(400, 480)">
    ${isSketch ? `
      <circle r="160" fill="none" stroke="#555555" stroke-width="1.5" stroke-dasharray="6 6" />
      <line x1="-180" y1="0" x2="180" y2="0" stroke="#444444" stroke-width="1" />
      <line x1="0" y1="-180" x2="0" y2="180" stroke="#444444" stroke-width="1" />
      <rect x="-90" y="-90" width="180" height="180" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.6" />
    ` : isDraft ? `
      <circle r="160" fill="none" stroke="${accentColor}" stroke-width="2" stroke-dasharray="8 4" />
      <circle r="110" fill="none" stroke="#F5F5F5" stroke-opacity="0.3" stroke-width="1.5" />
      <rect x="-70" y="-70" width="140" height="140" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="1" />
    ` : `
      <circle r="170" fill="none" stroke="${accentColor}" stroke-width="2.5" />
      <circle r="110" fill="none" stroke="#F5F5F5" stroke-opacity="0.4" stroke-width="1.5" />
      <circle r="60" fill="${accentColor}" fill-opacity="0.25" />
      <rect x="-80" y="-80" width="160" height="160" fill="none" stroke="#F5F5F5" stroke-opacity="0.2" stroke-width="1" />
    `}
  </g>
  <rect x="70" y="800" width="660" height="120" rx="8" fill="#171717" stroke="#262626" />
  <text x="100" y="845" fill="#F5F5F5" font-family="serif" font-size="26">${title}</text>
  <text x="100" y="880" fill="${accentColor}" font-family="monospace" font-size="13">[SPECIMEN STAGE: ${stageLabel}]</text>
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
    alt: draft('Constructivist typographic specimen exploring mathematical alignment on dark canvas'),
    image: createSvgDataUri('Constructivist Tension', 'Posters', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('Figma'), draft('Illustrator')],
    deliverables: [draft('A1 Silk Screen Prints'), draft('Digital Archive')],
    year: '2025',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Constructivist Tension', 'Posters', 'sketch'),
      draft: createSvgDataUri('Constructivist Tension', 'Posters', 'draft'),
      final: createSvgDataUri('Constructivist Tension', 'Posters', 'final'),
    },
    processNotes: 'Iterated from hand-drafted diagonal grid guides to precise SVG vector paths.',
  },
  {
    id: 'design-02-identity-systems',
    slug: 'identity-systems',
    title: draft('Monochrome Spatial Identity'),
    category: 'Branding',
    description: draft('Identity framework developed for an architectural collective exploring monolithic forms.'),
    alt: draft('Monochrome spatial brand identity layout with modular grid'),
    image: createSvgDataUri('Monochrome Identity', 'Branding', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'square',
    tools: [draft('Figma'), draft('After Effects')],
    deliverables: [draft('Brand Guidelines'), draft('Stationery Suite')],
    year: '2025',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Monochrome Identity', 'Branding', 'sketch'),
      draft: createSvgDataUri('Monochrome Identity', 'Branding', 'draft'),
      final: createSvgDataUri('Monochrome Identity', 'Branding', 'final'),
    },
    processNotes: 'Geometric explorations evaluating mark legibility at 16px favicon scale versus architectural signage.',
  },
  {
    id: 'design-03-typography-foundations',
    slug: 'typography-foundations',
    title: draft('Optical Kerning & Proportional Rhythm'),
    category: 'Typography',
    description: draft('Specimen exploration testing high-contrast serif display scales against tabular mono counters.'),
    alt: draft('Typographic specimen sheet displaying proportional serif letterforms'),
    image: createSvgDataUri('Optical Kerning', 'Typography', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'landscape',
    tools: [draft('Glyphs'), draft('InDesign')],
    deliverables: [draft('Specimen Book'), draft('Variable Font Testbeds')],
    year: '2024',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Optical Kerning', 'Typography', 'sketch'),
      draft: createSvgDataUri('Optical Kerning', 'Typography', 'draft'),
      final: createSvgDataUri('Optical Kerning', 'Typography', 'final'),
    },
    processNotes: 'Calibrating optical bezier curves for extreme display clamp scales from 320px to 1440px.',
  },
  {
    id: 'design-04-generative-artifacts',
    slug: 'generative-artifacts',
    title: draft('Vector Fields & Algorithmic Topologies'),
    category: 'Visual experiments',
    description: draft('Form studies generated using simplex noise fields constrained by rigid Swiss grid frameworks.'),
    alt: draft('Generative algorithmic vector poster with complex flow lines'),
    image: createSvgDataUri('Algorithmic Topologies', 'Visual experiments', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('Processing / Canvas API'), draft('Figma')],
    deliverables: [draft('Vector Plots'), draft('4K Screen Captures')],
    year: '2025',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Algorithmic Topologies', 'Visual experiments', 'sketch'),
      draft: createSvgDataUri('Algorithmic Topologies', 'Visual experiments', 'draft'),
      final: createSvgDataUri('Algorithmic Topologies', 'Visual experiments', 'final'),
    },
    processNotes: 'Bridging procedural JavaScript trigonometric canvas math with vector SVG export for plot printing.',
  },
  {
    id: 'design-05-editorial-spreads',
    slug: 'editorial-spreads',
    title: draft('Asymmetric Modernist Grid Systems'),
    category: 'Posters',
    description: draft('Editorial layout experiments balancing multi-column dense typographic narratives with stark white space.'),
    alt: draft('Editorial typography poster exploring asymmetrical column hierarchy'),
    image: createSvgDataUri('Asymmetric Modernist', 'Posters', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('InDesign'), draft('Figma')],
    deliverables: [draft('Editorial Broadsheets'), draft('PDF Catalog')],
    year: '2024',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Asymmetric Modernist', 'Posters', 'sketch'),
      draft: createSvgDataUri('Asymmetric Modernist', 'Posters', 'draft'),
      final: createSvgDataUri('Asymmetric Modernist', 'Posters', 'final'),
    },
    processNotes: 'Iterative grid divisions following the Fibonacci sequence to generate harmonic typographic rhythm.',
  },
  {
    id: 'design-06-glyph-morphology',
    slug: 'glyph-morphology',
    title: draft('Variable Weight & Contrast Studies'),
    category: 'Typography',
    description: draft('Parametric stroke weight transitions analyzing readability thresholds under dynamic lighting.'),
    alt: draft('Variable stroke weight letterform studies illustrating optical contrast adjustments'),
    image: createSvgDataUri('Variable Weight', 'Typography', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'landscape',
    tools: [draft('Glyphs'), draft('CSS Houdini')],
    deliverables: [draft('Variable Specimen'), draft('Web Font Testbed')],
    year: '2025',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Variable Weight', 'Typography', 'sketch'),
      draft: createSvgDataUri('Variable Weight', 'Typography', 'draft'),
      final: createSvgDataUri('Variable Weight', 'Typography', 'final'),
    },
    processNotes: 'Interpolating master glyph points across weight axes to maintain stroke geometry integrity.',
  },
  {
    id: 'design-07-tactile-packaging',
    slug: 'tactile-packaging',
    title: draft('Geometric Identity & Tactile Surfaces'),
    category: 'Branding',
    description: draft('Brand packaging design incorporating blind debossing, foil stamping, and minimal typography.'),
    alt: draft('Minimal packaging specimen showcasing geometric foil stamping on matte surface'),
    image: createSvgDataUri('Tactile Surfaces', 'Branding', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'square',
    tools: [draft('Figma'), draft('Cinema 4D')],
    deliverables: [draft('3D Mockups'), draft('Die-Line Production Files')],
    year: '2024',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Tactile Surfaces', 'Branding', 'sketch'),
      draft: createSvgDataUri('Tactile Surfaces', 'Branding', 'draft'),
      final: createSvgDataUri('Tactile Surfaces', 'Branding', 'final'),
    },
    processNotes: 'Calibrating substrate physical stock textures with micro-embossing dies for tactile brand contact.',
  },
  {
    id: 'design-08-chromatic-interference',
    slug: 'chromatic-interference',
    title: draft('Wave Interference & Spectral Lithography'),
    category: 'Visual experiments',
    description: draft('Study in moiré patterns and optical color synthesis using overlapping high-frequency line screens.'),
    alt: draft('Optical wave interference study with high-frequency moiré patterns'),
    image: createSvgDataUri('Chromatic Interference', 'Visual experiments', 'final'),
    blurDataUrl: placeholderBlur,
    aspectRatio: 'portrait',
    tools: [draft('Shader / GLSL'), draft('Illustrator')],
    deliverables: [draft('Screen Prints'), draft('Digital Specimen')],
    year: '2025',
    isPlaceholder: true,
    processStages: {
      sketch: createSvgDataUri('Chromatic Interference', 'Visual experiments', 'sketch'),
      draft: createSvgDataUri('Chromatic Interference', 'Visual experiments', 'draft'),
      final: createSvgDataUri('Chromatic Interference', 'Visual experiments', 'final'),
    },
    processNotes: 'Experimenting with angle registration differences (15°, 45°, 75°) to produce harmonic moiré waves.',
  },
];

export const designWork: DesignWorkItem[] = z.array(designWorkItemSchema).parse(rawDesignWork);
export const designWorks = designWork;
