/**
 * Chapter 01: "The System Core" — Developer-Driven Geometric & Module Configuration
 *
 * Coordinate space: 1000 x 600 viewBox
 *
 * Engineering Desk Layout:
 * - Desk plane: x: 0 to 1000, y: 400 to 570
 * - 4 Engineering Modules on desk:
 *   1. Kernel & Clock   : (180, 360)
 *   2. Network & Signal : (340, 310)
 *   3. Center Gap       : (500, 330) [Where the System Core compiles & boots]
 *   4. Terminal & AST   : (660, 330)
 *   5. Neural Logic     : (820, 370)
 */

export interface ObjectConfig {
  id: 'kernel' | 'network' | 'terminal' | 'neural';
  index: string;
  shortLabel: string;
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
    id: 'kernel',
    index: '01',
    shortLabel: 'Kernel',
    name: 'Kernel & Clock',
    discipline: 'Systems & Silicon',
    contributes: 'Clock Oscillator',
    insight: 'Every software abstraction rests on deterministic timing and binary state.',
    x: 180,
    y: 360,
    questionWord: 'how does silicon think?',
    questionOffset: { x: -75, y: -72 },
  },
  {
    id: 'network',
    index: '02',
    shortLabel: 'Network',
    name: 'Network & Signal',
    discipline: 'Protocols & APIs',
    contributes: 'Data Stream Bus',
    insight: 'Distributed systems are just structured conversations over noisy wires.',
    x: 340,
    y: 310,
    questionWord: 'why do machines talk?',
    questionOffset: { x: -65, y: -82 },
  },
  {
    id: 'terminal',
    index: '03',
    shortLabel: 'Terminal',
    name: 'Terminal & AST',
    discipline: 'Syntax & Compilers',
    contributes: 'Execution Pipeline',
    insight: 'Reading the source turns black-box magic into an engineering blueprint.',
    x: 660,
    y: 330,
    questionWord: "what's under the hood?",
    questionOffset: { x: -10, y: -82 },
  },
  {
    id: 'neural',
    index: '04',
    shortLabel: 'Neural',
    name: 'Neural Logic Gate',
    discipline: 'Algorithms & AI',
    contributes: 'Inference Core',
    insight: 'Simple conditional gates scale into systems that reason and adapt.',
    x: 820,
    y: 370,
    questionWord: 'what if it learns?',
    questionOffset: { x: -10, y: -72 },
  },
];

export const LAMP_CONFIG = {
  center: { x: 500, y: 330 },
  base: { x: 500, y: 435 },
  stem: { x: 500, y: 350 },
  switch: { x: 480, y: 435 },
  shade: { x: 500, y: 245 },
  filament: { x: 500, y: 260 },
  spark: { x: 500, y: 260 },
  exitRay: { x: 500, startY: 275, endY: 600 },
};

/**
 * Assembly Flight Paths (Cubic Bezier curve data)
 * Defining how module traces wire from each node into the central System Core
 */
export const ASSEMBLY_PATHS = {
  watchGear: 'M 180,360 C 260,280 400,380 500,435',
  radioCoil: 'M 340,310 C 390,260 450,290 500,350',
  circuitSwitch: 'M 820,370 C 720,440 560,450 480,435',
  lensShade: 'M 660,330 C 620,220 540,210 500,245',
  lensFilament: 'M 660,330 C 600,250 530,240 500,260',
  sparkPoint: 'M 500,60 C 500,120 500,190 500,260',
};
