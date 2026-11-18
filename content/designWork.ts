export type DesignCategory = 'Posters' | 'Branding' | 'Typography' | 'Visual experiments';

export interface ProcessStages {
  sketch: string;
  draft: string;
  final: string;
}

export interface DesignWorkItem {
  id: string;
  slug: string;
  title: string;
  category: DesignCategory;
  year?: string;
  isPlaceholder: boolean;
  description: string;
  alt: string;
  image: string; // High-resolution SVG / data URI for next/image
  blurDataUrl: string; // Base64 blur placeholder
  aspectRatio: 'portrait' | 'landscape' | 'square';
  processNotes?: string;
  processStages?: ProcessStages;
  tools: string[];
  deliverables: string[];
  caseStudyAvailable?: boolean;
}

// Procedural SVG Generator for high-contrast, modern editorial placeholder graphics
function createSvgDataUri(
  title: string,
  category: string,
  accentColor: string,
  bgType: 'grid' | 'waveform' | 'prism' | 'swiss'
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="g_${title.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F0F14" />
      <stop offset="100%" stop-color="#1A1A22" />
    </linearGradient>
    <pattern id="pat_${title.replace(/\s+/g, '_')}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="800" height="1000" fill="url(#g_${title.replace(/\s+/g, '_')})" />
  <rect width="800" height="1000" fill="url(#pat_${title.replace(/\s+/g, '_')})" />
  
  <!-- Subtle Tint Wash -->
  <circle cx="400" cy="400" r="350" fill="${accentColor}" fill-opacity="0.08" filter="blur(60px)" />
  
  <!-- Outer Editorial Border -->
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
  
  <!-- Top Technical Metadata -->
  <text x="70" y="90" fill="${accentColor}" font-family="monospace" font-size="16" letter-spacing="4" font-weight="bold">${category.toUpperCase()} SPECIMEN</text>
  <text x="730" y="90" text-anchor="end" fill="rgba(255,255,255,0.4)" font-family="monospace" font-size="14">OP-74 // CK.IE</text>
  <line x1="70" y1="110" x2="730" y2="110" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  
  <!-- Center Graphic Artwork -->
  ${
    bgType === 'grid'
      ? `<g transform="translate(400, 480)">
          <circle r="180" fill="none" stroke="${accentColor}" stroke-width="2" stroke-dasharray="6 6" />
          <circle r="120" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <line x1="-220" y1="0" x2="220" y2="0" stroke="${accentColor}" stroke-width="1.5" />
          <line x1="0" y1="-220" x2="0" y2="220" stroke="${accentColor}" stroke-width="1.5" />
          <rect x="-80" y="-80" width="160" height="160" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" transform="rotate(45)" />
        </g>`
      : bgType === 'waveform'
        ? `<g transform="translate(100, 460)">
            <path d="M 0 0 C 150 -160, 250 160, 400 0 C 480 -90, 540 90, 600 0" fill="none" stroke="${accentColor}" stroke-width="4" />
            <path d="M 0 30 C 150 -130, 250 190, 400 30 C 480 -60, 540 120, 600 30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4 4" />
            <path d="M 0 -30 C 150 -190, 250 130, 400 -30 C 480 -120, 540 60, 600 -30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4 4" />
          </g>`
        : bgType === 'prism'
          ? `<g transform="translate(400, 460)">
              <polygon points="0,-160 140,100 -140,100" fill="none" stroke="${accentColor}" stroke-width="3" />
              <line x1="-200" y1="-40" x2="0" y2="-40" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
              <line x1="0" y1="-40" x2="160" y2="20" stroke="#38BDF8" stroke-width="3" />
              <line x1="0" y1="-40" x2="170" y2="50" stroke="#A78BFA" stroke-width="3" />
              <line x1="0" y1="-40" x2="180" y2="80" stroke="#FB7185" stroke-width="3" />
            </g>`
          : `<g transform="translate(120, 320)">
              <text x="0" y="80" fill="rgba(255,255,255,0.9)" font-family="serif" font-size="120" font-weight="900" letter-spacing="-4">Aa</text>
              <text x="0" y="160" fill="${accentColor}" font-family="serif" font-size="32" font-style="italic">Optical Contrast &amp; Kerning</text>
              <line x1="0" y1="200" x2="560" y2="200" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
              <text x="0" y="240" fill="rgba(255,255,255,0.4)" font-family="monospace" font-size="16">0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
            </g>`
  }
  
  <!-- Bottom Content Box -->
  <rect x="70" y="780" width="660" height="140" rx="8" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" />
  <text x="100" y="830" fill="#FFFFFF" font-family="serif" font-size="28" font-weight="bold">${title}</text>
  <text x="100" y="865" fill="${accentColor}" font-family="monospace" font-size="14" letter-spacing="2">[PLACEHOLDER GRAPHIC ARTIFACT]</text>
  <text x="100" y="895" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-size="13">Awaiting Chinmoy Kalita authentic production design upload</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Procedural 10x10 tiny blur placeholder
const genericBlurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8/+6/MQMRgHFUIY1iBAC1/x+V+5p86QAAAABJRU5ErkJggg==';

export const designWorks: DesignWorkItem[] = [
  {
    id: 'design-kinetic-resonance-poster',
    slug: 'kinetic-resonance-poster',
    title: 'Kinetic Resonance Poster',
    category: 'Posters',
    year: '2025',
    isPlaceholder: true,
    description:
      'Large-format exhibition poster exploring the cadence of acoustic sound frequency waves disrupted by high-contrast typographic grids.',
    alt: 'High contrast black and white poster with acoustic waveform harmonics and bold rose typography',
    image: createSvgDataUri('Kinetic Resonance', 'Posters', '#FB7185', 'waveform'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'portrait',
    processNotes:
      'Stage 1: Hand-drawn acoustic frequency harmonics. Stage 2: Geometric grid alignment in vector software. Stage 3: Halftone silk-screen color separation.',
    processStages: {
      sketch: createSvgDataUri('Kinetic Resonance (Stage 1)', 'Hand Sketch', '#A3A3A3', 'waveform'),
      draft: createSvgDataUri('Kinetic Resonance (Stage 2)', 'Vector Draft', '#7C3AED', 'waveform'),
      final: createSvgDataUri('Kinetic Resonance (Final)', 'Screen Print', '#FB7185', 'waveform'),
    },
    tools: ['Figma', 'Illustrator', 'Halftone Screen Engine'],
    deliverables: [
      'B1 Exhibition Print',
      'Screen Print Separation Plates',
      'Digital Motion Teaser',
    ],
  },
  {
    id: 'design-kalita-grotesk-typeface',
    slug: 'kalita-grotesk-typeface',
    title: 'Kalita Grotesk Specimen',
    category: 'Typography',
    year: '2026',
    isPlaceholder: true,
    description:
      'A custom variable grotesk typeface designed with deep optical ink-traps, exaggerated counter-spaces, and a fluid responsive width axis.',
    alt: 'Typographical specimen poster showcasing the Kalita Grotesk letterforms and ink-traps in warm cream and rose',
    image: createSvgDataUri('Kalita Grotesk', 'Typography', '#FB7185', 'swiss'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'landscape',
    processNotes:
      'Stage 1: Broad-nib pen calligraphy exploring stroke contrast. Stage 2: Bezier anchor simplification. Stage 3: Variable font compilation with optical size axis.',
    processStages: {
      sketch: createSvgDataUri('Kalita Grotesk (Stage 1)', 'Calligraphy', '#A3A3A3', 'swiss'),
      draft: createSvgDataUri('Kalita Grotesk (Stage 2)', 'Glyph Beziers', '#38BDF8', 'swiss'),
      final: createSvgDataUri('Kalita Grotesk (Final)', 'Variable Specimen', '#FB7185', 'swiss'),
    },
    tools: ['Glyphs / FontForge', 'Figma', 'Opentype.js'],
    deliverables: ['Variable TTF / WOFF2 Fonts', 'Specimen Booklet', 'Character Glyphs Map'],
  },
  {
    id: 'design-aethelgard-spatial-identity',
    slug: 'aethelgard-spatial-identity',
    title: 'Aethelgard Systems Identity',
    category: 'Branding',
    year: '2025',
    isPlaceholder: true,
    description:
      'Dynamic brand identity and adaptive modular monogram engineered for a high-performance decentralized systems research group.',
    alt: 'Geometric brand identity mark composed of intersecting vector rings and architectural crosshairs',
    image: createSvgDataUri('Aethelgard Identity', 'Branding', '#FB7185', 'grid'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'square',
    processNotes:
      'Stage 1: Symbolic rune and circular network ideation. Stage 2: Strict 8px modular grid construction. Stage 3: Dynamic responsive token system across dark/light.',
    processStages: {
      sketch: createSvgDataUri('Aethelgard (Stage 1)', 'Ideation Marks', '#A3A3A3', 'grid'),
      draft: createSvgDataUri('Aethelgard (Stage 2)', 'Modular Grid', '#FBBF24', 'grid'),
      final: createSvgDataUri('Aethelgard (Final)', 'Final Logomark', '#FB7185', 'grid'),
    },
    tools: ['Figma', 'Vector CAD', 'Tailwind Tokens'],
    deliverables: ['Responsive Logomark Suite', 'Brand Guidelines Book', 'Token Architecture'],
  },
  {
    id: 'design-chromatic-prism-experiments',
    slug: 'chromatic-prism-experiments',
    title: 'Chromatic Prism Dispersion',
    category: 'Visual experiments',
    year: '2026',
    isPlaceholder: true,
    description:
      'Generative shader experiments investigating optical refraction, chromatic aberration, and sunrise color ramps in interactive real-time canvas.',
    alt: 'Generative triangle prism with dispersed beams of azure, iris, and rose light rays',
    image: createSvgDataUri('Chromatic Prism', 'Visual experiments', '#FB7185', 'prism'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'portrait',
    processNotes:
      'Stage 1: Ray-tracing mathematics and Snell refraction matrices. Stage 2: GLSL fragment shader prototyping. Stage 3: Three.js interactive canvas integration.',
    processStages: {
      sketch: createSvgDataUri('Prism (Stage 1)', 'Refraction Math', '#A3A3A3', 'prism'),
      draft: createSvgDataUri('Prism (Stage 2)', 'Shader Passes', '#A78BFA', 'prism'),
      final: createSvgDataUri('Prism (Final)', 'Compiled Shaders', '#FB7185', 'prism'),
    },
    tools: ['Three.js', 'GLSL', 'WebGL', 'Framer Motion'],
    deliverables: ['Real-time GLSL Shaders', 'Interactive Component', '4K Generative Renders'],
  },
  {
    id: 'design-brutalist-monolith-poster',
    slug: 'brutalist-monolith-poster',
    title: 'Brutalist Monoliths Series',
    category: 'Posters',
    year: '2025',
    isPlaceholder: true,
    description:
      'Architectural poster series contrasting raw concrete textures, heavy typographic mass, and stark asymmetric whitespace.',
    alt: 'Architectural poster featuring monumental geometric shapes, gridlines, and bold editorial captions',
    image: createSvgDataUri('Brutalist Monoliths', 'Posters', '#FB7185', 'grid'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'portrait',
    processNotes:
      'Stage 1: Rough layout blocking on dot-grid paper. Stage 2: Stark Swiss typographic hierarchy pass. Stage 3: High-contrast print textures.',
    processStages: {
      sketch: createSvgDataUri('Monoliths (Stage 1)', 'Rough Grid', '#A3A3A3', 'grid'),
      draft: createSvgDataUri('Monoliths (Stage 2)', 'Swiss Hierarchy', '#38BDF8', 'grid'),
      final: createSvgDataUri('Monoliths (Final)', 'Risograph Plate', '#FB7185', 'grid'),
    },
    tools: ['Figma', 'InDesign', 'Texture Synthesis'],
    deliverables: ['A1 Archival Posters', 'Exhibition Pamphlet', 'Vector Print Files'],
  },
  {
    id: 'design-exposure-sunrise-language',
    slug: 'exposure-sunrise-language',
    title: 'The Exposure Design Language',
    category: 'Branding',
    year: '2026',
    isPlaceholder: true,
    description:
      'Foundational design system specification establishing true-neutral black dark mode, warm cream light mode, and progressive sunrise-ramp accents.',
    alt: 'Comprehensive design system token sheet displaying color chips, fluid type scales, and focus rings',
    image: createSvgDataUri('Exposure System', 'Branding', '#FB7185', 'swiss'),
    blurDataUrl: genericBlurDataUrl,
    aspectRatio: 'landscape',
    processNotes:
      'Stage 1: Mathematical contrast and luminance ratios for WCAG AA compliance. Stage 2: CSS variable definitions and fluid clamp scales. Stage 3: Complete UI component suite.',
    processStages: {
      sketch: createSvgDataUri('Exposure (Stage 1)', 'Color Science', '#A3A3A3', 'swiss'),
      draft: createSvgDataUri('Exposure (Stage 2)', 'Token Mappings', '#FBBF24', 'swiss'),
      final: createSvgDataUri('Exposure (Final)', 'Live Design System', '#FB7185', 'swiss'),
    },
    tools: ['Tailwind CSS', 'Figma Tokens', 'KaTeX / Kaizen Math'],
    deliverables: ['Design System Tokens', 'Figma Component Library', 'Living Styleguide Route'],
  },
];
