import { Discipline, ProjectItem, NavigationItem } from '@/types';

export const SITE_IDENTITY = {
  name: 'Chinmoy Kalita',
  role: 'Full-stack Developer, AI Engineer & Graphic Designer',
  tagline: 'A Mind in Motion — Three disciplines. One creative universe.',
  bio: 'Bridging engineering rigor, computational intelligence, and visceral visual direction into cohesive interactive digital experiences.',
  contact: {
    email: 'chinmoykalita@example.com', // To be updated with owner coordinates
    github: 'https://github.com/chinmoykk3',
    linkedin: 'https://linkedin.com/in/chinmoykalita',
    twitter: 'https://twitter.com/chinmoykalita',
  },
};

export const DISCIPLINES: Discipline[] = [
  {
    id: 'engineering',
    title: 'Full-Stack Engineering',
    tagline: 'Resilient architectures, low latency, elegant codebases.',
    description:
      'Designing mission-critical distributed web systems, modular component architectures, and responsive digital products built with modern standards.',
    skills: ['Next.js / React', 'TypeScript', 'Node.js', 'PostgreSQL / Prisma', 'Tailwind CSS', 'System Design'],
  },
  {
    id: 'ai',
    title: 'AI & Computational Systems',
    tagline: 'Intelligent interfaces, LLM orchestrations, predictive logic.',
    description:
      'Synthesizing deep learning models, retrieval-augmented pipelines, and agentic workflows into frictionless human-computer interfaces.',
    skills: ['LLM Architectures', 'RAG Pipelines', 'Vector Databases', 'Python / PyTorch', 'Agentic Workflows', 'Computer Vision'],
  },
  {
    id: 'design',
    title: 'Graphic & Motion Direction',
    tagline: 'Editorial precision, expressive typography, kinetic energy.',
    description:
      'Crafting bespoke brand visual identities, high-impact typography, 3D WebGL interactions, and publication-quality digital layouts.',
    skills: ['Editorial Art Direction', 'Three.js / WebGL', 'Kinetic Animation (GSAP)', 'Figma / Typography', 'Brand Systems', '3D Modeling'],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'sahyog',
    slug: 'sahyog',
    title: 'SAHYOG',
    subtitle: 'Collaborative Engineering Ecosystem',
    category: 'Full-Stack Platform',
    year: '2025',
    disciplines: ['engineering', 'design'],
    description:
      'A community-driven engineering ecosystem designed to unify distributed technical teams through real-time collaboration, synchronized documentation, and transparent workflows.',
    highlights: [
      'Real-time state synchronization across distributed clients',
      'Low-latency collaborative canvas and document orchestration',
      'Enterprise-grade role-based access control and telemetry',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'PostgreSQL'],
    featured: true,
  },
  {
    id: 'librarium',
    slug: 'librarium',
    title: 'LIBRARIUM',
    subtitle: 'Curated Knowledge & Reading Intelligence Archive',
    category: 'AI System / Knowledge Base',
    year: '2025',
    disciplines: ['ai', 'engineering'],
    description:
      'An intelligent digital repository combining semantic search, multi-modal knowledge indexing, and contextual synthesis to transform unstructured documents into interactive insight graphs.',
    highlights: [
      'Semantic document embedding with vector similarity indexing',
      'Context-aware knowledge graph synthesis and interactive exploration',
      'Fluid reading environment with automated citation trails',
    ],
    technologies: ['React', 'TypeScript', 'Vector DB', 'OpenAI API', 'Three.js Graph Visualization'],
    featured: true,
  },
  {
    id: 'shutterscape',
    slug: 'shutterscape',
    title: 'SHUTTERSCAPE',
    subtitle: 'Computational Aesthetics & Visual Imagery Showcase',
    category: 'Interactive Experience',
    year: '2024',
    disciplines: ['design', 'engineering'],
    description:
      'A dynamic visual showcase blending photographic artistry with computational shaders, variable typography, and immersive kinetic transitions.',
    highlights: [
      'Custom WebGL fragment shaders for image distortion and chromatic aberration',
      'Smooth scroll inertia synchronized with audio-reactive visual pulses',
      'High-dynamic-range responsive image rendering pipeline',
    ],
    technologies: ['Three.js', 'GLSL Shaders', 'GSAP', 'Next.js', 'Framer Motion'],
    featured: true,
  },
];

export const NAVIGATION_LINKS: NavigationItem[] = [
  { label: 'Overview', href: '#hero' },
  { label: 'Disciplines', href: '#disciplines' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

