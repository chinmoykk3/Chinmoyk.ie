/**
 * Chapter 02: "The Prism" — Geometric and Kinematic Configuration
 * 
 * Coordinate space: 800 x 800 viewBox (Centered datum at 400, 400)
 * 
 * Flow:
 * 1. Gold input beam descends from (400, 0) into Prism 1 (400, 170).
 * 2. Prism 1 refracts light into 4 tapered beams (azure, iris, rose, ember).
 * 3. Each beam opens into a distinct full-bleed world.
 * 4. Beams curve and converge into inverted Prism 2 (400, 620).
 * 5. Single gold beam exits Prism 2 vertically down to (400, 800) into ThreadSpine.
 */

export interface BeamDef {
  id: string;
  name: string;
  accent: 'azure' | 'iris' | 'rose' | 'ember';
  tokenVar: string;
  angleDeg: number;
  // Starting point at base of refracting prism
  origin: { x: number; y: number };
  // Target coordinates when fanned out
  fannedTarget: { x: number; y: number };
  // Convergence entry point into inverted prism
  convergeTarget: { x: number; y: number };
  // Cross flare anchor with companion beam (during 65-80% crossing)
  crossFlare: { x: number; y: number; feedsTarget: string };
}

export const BEAMS_CONFIG: BeamDef[] = [
  {
    id: 'azure',
    name: 'The Builder',
    accent: 'azure',
    tokenVar: 'var(--color-accent-azure)',
    angleDeg: -38,
    origin: { x: 375, y: 210 },
    fannedTarget: { x: 100, y: 700 },
    convergeTarget: { x: 370, y: 590 },
    crossFlare: { x: 330, y: 520, feedsTarget: 'the-builder' },
  },
  {
    id: 'iris',
    name: 'The Engineer of Intelligence',
    accent: 'iris',
    tokenVar: 'var(--color-accent-iris)',
    angleDeg: -14,
    origin: { x: 390, y: 215 },
    fannedTarget: { x: 280, y: 750 },
    convergeTarget: { x: 390, y: 595 },
    crossFlare: { x: 370, y: 540, feedsTarget: 'the-engineer-of-intelligence' },
  },
  {
    id: 'rose',
    name: 'The Visual Thinker',
    accent: 'rose',
    tokenVar: 'var(--color-accent-rose)',
    angleDeg: 14,
    origin: { x: 410, y: 215 },
    fannedTarget: { x: 520, y: 750 },
    convergeTarget: { x: 410, y: 595 },
    crossFlare: { x: 430, y: 540, feedsTarget: 'the-visual-thinker' },
  },
  {
    id: 'ember',
    name: 'The Explorer',
    accent: 'ember',
    tokenVar: 'var(--color-accent-ember)',
    angleDeg: 38,
    origin: { x: 425, y: 210 },
    fannedTarget: { x: 700, y: 700 },
    convergeTarget: { x: 430, y: 590 },
    crossFlare: { x: 470, y: 520, feedsTarget: 'the-explorer' },
  },
];

export const PRISM_1_COORDS = {
  // Equilateral prism: apex pointing up
  center: { x: 400, y: 175 },
  size: 90,
  apex: { x: 400, y: 125 },
  baseLeft: { x: 350, y: 215 },
  baseRight: { x: 450, y: 215 },
};

export const PRISM_2_COORDS = {
  // Inverted equilateral prism: apex pointing down for recombination
  center: { x: 400, y: 635 },
  size: 90,
  apex: { x: 400, y: 685 },
  baseLeft: { x: 350, y: 595 },
  baseRight: { x: 450, y: 595 },
};
