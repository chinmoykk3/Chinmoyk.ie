/**
 * Chapter 01: "The Lamp" — Geometric and Kinematic Configuration
 * 
 * Coordinate space: 1000 x 600 viewBox
 * 
 * Workbench Layout:
 * - Table top plane: x: 0 to 1000, y: 400 to 570
 * - 4 Objects on bench:
 *   1. Pocket Watch : (180, 360)
 *   2. Radio        : (340, 310)
 *   3. Center Gap   : (500, 340) [Where the Lamp will assemble]
 *   4. Camera Lens  : (660, 330)
 *   5. Circuit Board: (820, 370)
 * 
 * Lamp Assembly Mapping:
 * - Base     <-- Pocket Watch gear
 * - Stem     <-- Radio induction coil
 * - Switch   <-- Circuit Board trace switch
 * - Shade    <-- Camera Lens glass element
 * - Filament <-- Camera Lens aperture blades
 * - Spark    <-- Gold point descending from Prologue
 */

export interface ObjectConfig {
  id: 'pocketWatch' | 'radio' | 'cameraLens' | 'circuitBoard';
  index: string;
  name: string;
  discipline: string;
  contributes: string;
  insight: string;
  x: number;
  y: number;
  questionWord: string;
  questionOffset: { x: number; y: number };
}

export const WORKBENCH_OBJECTS: ObjectConfig[] = [
  {
    id: 'pocketWatch',
    index: '01',
    name: 'Pocket Watch',
    discipline: 'Mechanics & Precision',
    contributes: 'Escapement Base Gear',
    insight: 'Every complex system is just simple parts keeping rhythm together.',
    x: 180,
    y: 360,
    questionWord: 'how?',
    questionOffset: { x: -45, y: -65 },
  },
  {
    id: 'radio',
    index: '02',
    name: 'Vacuum Tube Radio',
    discipline: 'Signal & Resonance',
    contributes: 'Induction Stem Coil',
    insight: 'Invisible waves become clear when you tune the right circuit.',
    x: 340,
    y: 310,
    questionWord: 'why?',
    questionOffset: { x: -35, y: -80 },
  },
  {
    id: 'cameraLens',
    index: '03',
    name: 'Camera Lens',
    discipline: 'Optics & Perspective',
    contributes: 'Glass Shade & Aperture',
    insight: 'Framing and focus decide what story the light tells.',
    x: 660,
    y: 330,
    questionWord: "what's inside?",
    questionOffset: { x: 30, y: -75 },
  },
  {
    id: 'circuitBoard',
    index: '04',
    name: 'Circuit Board',
    discipline: 'Logic & Computation',
    contributes: 'Copper Trace Switch',
    insight: 'Small conditional paths scale into living software.',
    x: 820,
    y: 370,
    questionWord: 'what if…?',
    questionOffset: { x: 25, y: -65 },
  },
];

export const LAMP_CONFIG = {
  center: { x: 500, y: 340 },
  base: { x: 500, y: 440 },
  stem: { x: 500, y: 350 },
  switch: { x: 480, y: 435 },
  shade: { x: 500, y: 240 },
  filament: { x: 500, y: 255 },
  spark: { x: 500, y: 255 },
  // Beam exit ray: down vertical axis from lamp to bottom edge
  exitRay: { x: 500, startY: 270, endY: 600 },
};

/**
 * Assembly Flight Paths (Cubic Bezier curve data)
 * Defining how detached parts fly from object centroids to the lamp
 */
export const ASSEMBLY_PATHS = {
  watchGear: 'M 180,360 C 260,280 400,380 500,440',
  radioCoil: 'M 340,310 C 390,260 450,290 500,350',
  circuitSwitch: 'M 820,370 C 720,440 560,450 480,435',
  lensShade: 'M 660,330 C 620,220 540,210 500,240',
  lensFilament: 'M 660,330 C 600,250 530,240 500,255',
  sparkPoint: 'M 500,60 C 500,120 500,190 500,255',
};
