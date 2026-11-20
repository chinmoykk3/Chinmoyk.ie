/**
 * Chapter 01 "The Mechanism" — Geometric and Kinematic Configuration
 * 
 * Defines the 8 distinct mechanical and electronic components:
 * 1. outerRing     - Structural casing ring & index datum
 * 2. largeGear     - 12-tooth master spur gear with spoke lightening apertures
 * 3. smallGear     - 8-tooth precision pinion gear
 * 4. shaft         - Stepped central arbor / transmission axis
 * 5. circuitPlate  - Substrate PCB with angular signal traces & IC footprint
 * 6. coilSpring    - Helical balance / inductive resonator spring
 * 7. screw1        - Precision chassis machine fastener (left)
 * 8. screw2        - Precision chassis machine fastener (right)
 * 
 * Coordinate space: 600 x 600 viewBox
 * Center datum: (300, 300)
 */

export interface PartTransform {
  x: number;
  y: number;
  rotation: number;
  scale?: number;
}

export interface ExplodedDelta {
  dx: number;
  dy: number;
  rotation: number;
  depth: number; // For fine pointer parallax weighting (0.5 to 1.5)
}

export interface MechanismPartConfig {
  id: string;
  name: string;
  assembled: PartTransform;
  exploded: ExplodedDelta;
  rebuilt: PartTransform;
}

export const MECHANISM_PARTS: MechanismPartConfig[] = [
  {
    id: 'outerRing',
    name: 'Outer Casing Ring',
    // Symmetrical outer datum collar at center
    assembled: { x: 300, y: 280, rotation: 0, scale: 1 },
    exploded: { dx: 0, dy: -55, rotation: -8, depth: 1.2 },
    // Rebuilt: forms the upper structural canopy of the new instrument
    rebuilt: { x: 300, y: 190, rotation: 45, scale: 0.92 },
  },
  {
    id: 'largeGear',
    name: 'Master Spur Gear',
    // Intermeshed gear train at upper-left
    assembled: { x: 260, y: 265, rotation: 0, scale: 1 },
    exploded: { dx: -75, dy: -40, rotation: -28, depth: 0.9 },
    // Rebuilt: shifts down to flank the central logic core
    rebuilt: { x: 215, y: 310, rotation: 110, scale: 0.9 },
  },
  {
    id: 'smallGear',
    name: 'Pinion Gear',
    // Meshes with large gear at upper-right
    assembled: { x: 345, y: 230, rotation: 15, scale: 1 },
    exploded: { dx: 70, dy: -50, rotation: 38, depth: 0.8 },
    // Rebuilt: flanks opposite side of logic core
    rebuilt: { x: 385, y: 275, rotation: -50, scale: 0.88 },
  },
  {
    id: 'shaft',
    name: 'Transmission Arbor',
    // Central mechanical axis
    assembled: { x: 260, y: 265, rotation: 0, scale: 1 },
    exploded: { dx: -25, dy: 65, rotation: 15, depth: 1.1 },
    // Rebuilt: vertical spine linking mechanical crown to circuit bus
    rebuilt: { x: 300, y: 285, rotation: 90, scale: 1.05 },
  },
  {
    id: 'circuitPlate',
    name: 'Circuit Plate & Traces',
    // Electronic substrate alongside gear train
    assembled: { x: 330, y: 335, rotation: 0, scale: 1 },
    exploded: { dx: 65, dy: 60, rotation: -14, depth: 0.7 },
    // Rebuilt: forms the grounded base whose central bus trace leads directly down to the terminal node
    rebuilt: { x: 300, y: 415, rotation: 0, scale: 1.05 },
  },
  {
    id: 'coilSpring',
    name: 'Resonator Coil',
    // Mechanical balance spring at lower-left
    assembled: { x: 260, y: 350, rotation: 0, scale: 1 },
    exploded: { dx: -65, dy: 55, rotation: 42, depth: 0.65 },
    // Rebuilt: forms an inductive filter coil in the new architecture
    rebuilt: { x: 240, y: 430, rotation: -20, scale: 0.95 },
  },
  {
    id: 'screw1',
    name: 'Left Fastener',
    assembled: { x: 210, y: 210, rotation: 0, scale: 1 },
    exploded: { dx: -60, dy: -70, rotation: 80, depth: 1.4 },
    // Rebuilt: secures upper-left anchor node
    rebuilt: { x: 195, y: 240, rotation: 45, scale: 1 },
  },
  {
    id: 'screw2',
    name: 'Right Fastener',
    assembled: { x: 390, y: 345, rotation: 0, scale: 1 },
    exploded: { dx: 70, dy: 65, rotation: -95, depth: 1.35 },
    // Rebuilt: secures lower-right circuit anchor node
    rebuilt: { x: 405, y: 375, rotation: -30, scale: 1 },
  },
];

/**
 * Question Mark glyph anchors (Beat 1: Curiosity/Understanding)
 * Morphs into small solid anchor dots in Beat 2 (Taking apart).
 */
export interface QuestionGlyph {
  id: string;
  x: number;
  y: number;
  associatedPart: string;
}

export const QUESTION_GLYPHS: QuestionGlyph[] = [
  { id: 'q1', x: 200, y: 245, associatedPart: 'largeGear' },
  { id: 'q2', x: 385, y: 215, associatedPart: 'smallGear' },
  { id: 'q3', x: 390, y: 315, associatedPart: 'circuitPlate' },
  { id: 'q4', x: 230, y: 385, associatedPart: 'coilSpring' },
];

/**
 * Terminal pulse path:
 * Follows the central bus trace down out of the circuit plate and terminates
 * at the glowing node (300, 560), which seamlessly meets the ThreadSpine.
 */
export const TERMINAL_TRACE_PATH = 'M 300,380 L 300,430 L 285,445 L 285,490 L 300,505 L 300,560';
export const TERMINAL_NODE_COORDS = { x: 300, y: 560 };
