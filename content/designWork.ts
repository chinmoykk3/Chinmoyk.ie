export interface DesignWorkItem {
  id: string;
  slug: string;
  title: string;
  category: 'UI/UX Systems' | 'Visual Identity' | 'Interactive / 3D' | 'Experimental Design';
  year: string;
  isPlaceholder: boolean;
  description: string;
  tools: string[];
  deliverables: string[];
  caseStudyAvailable: boolean;
  notes?: string;
}

export const designWorks: DesignWorkItem[] = [
  {
    id: 'design-system-foundations',
    slug: 'design-system-foundations',
    title: 'Documentary Portfolio Design Language',
    category: 'UI/UX Systems',
    year: '2026',
    isPlaceholder: true,
    description:
      'A cinematic, dark editorial design system built for high-contrast accessibility, narrative flow, and micro-interactions.',
    tools: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    deliverables: [
      'Design token architecture (colors, typography scales, spacing)',
      'Motion choreography primitives',
      'Accessibility contrast guidelines',
    ],
    caseStudyAvailable: true,
    notes: 'Established as part of the core portfolio identity.',
  },
  {
    id: 'campus-flow-ux',
    slug: 'campus-flow-ux',
    title: 'GCU Campus Flow UX Architecture',
    category: 'UI/UX Systems',
    year: '[TODO: year]',
    isPlaceholder: true,
    description:
      '[TODO: Add description of student and administrator workflows, wireframes, and design heuristics]',
    tools: ['Figma [TODO: confirm tools]'],
    deliverables: [
      '[TODO: list deliverables — e.g. User journey maps, high-fidelity prototypes, component library]',
    ],
    caseStudyAvailable: false,
  },
  {
    id: 'disaster-dashboard-ui',
    slug: 'disaster-dashboard-ui',
    title: 'IRDMS Emergency Response Interface',
    category: 'UI/UX Systems',
    year: '[TODO: year]',
    isPlaceholder: true,
    description:
      '[TODO: Add description of mission-critical GIS map interface and crisis notification layouts for low-latency operational environments]',
    tools: ['Figma [TODO: confirm]'],
    deliverables: ['[TODO: Incident triage workflows, emergency alert typography, map overlays]'],
    caseStudyAvailable: false,
  },
  {
    id: 'spatial-experiments-3d',
    slug: 'spatial-experiments-3d',
    title: 'Spatial & 3D Interactive Explorations',
    category: 'Interactive / 3D',
    year: '[TODO: year]',
    isPlaceholder: true,
    description:
      '[TODO: Add description of WebGL / Three.js experimental shaders, spatial layouts, and generative visual canvas]',
    tools: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Blender [TODO: confirm]'],
    deliverables: ['[TODO: Interactive particle simulations, spatial soundscapes]'],
    caseStudyAvailable: false,
  },
];
