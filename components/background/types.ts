export type ChapterKey =
  | 'prologue'
  | 'ch01'
  | 'ch02'
  | 'ch03'
  | 'ch04'
  | 'ch05'
  | 'ch06'
  | 'ch07'
  | 'epilogue';

export type ThemeMode = 'dark' | 'light';

export interface SceneSize {
  width: number;
  height: number;
  dpr: number;
}

export interface RgbTuple {
  r: number;
  g: number;
  b: number;
}

export interface AccentColours {
  gold: string;
  ember: string;
  rose: string;
  iris: string;
  azure: string;
  text: string;
  textMuted: string;
  bg: string;
  surface: string;
  border: string;
  // Pre-parsed numeric RGB values for allocation-free color blending in Canvas2D
  goldRgb: RgbTuple;
  emberRgb: RgbTuple;
  roseRgb: RgbTuple;
  irisRgb: RgbTuple;
  azureRgb: RgbTuple;
  bgRgb: RgbTuple;
  textRgb: RgbTuple;
}

export interface PointerState {
  x: number; // -1 to 1 normalized coordinates (0 is center)
  y: number; // -1 to 1 normalized coordinates (0 is center)
  isTouch: boolean;
  active: boolean;
}

export interface SceneState {
  time: number; // Elapsed seconds
  scrollProgress: number; // 0.0 to 1.0 total document scroll progress
  chapterProgress: number; // 0.0 to 1.0 progress within current chapter
  scrollVelocity: number; // Scroll speed from Lenis (clamped)
  pointer: PointerState;
  theme: ThemeMode;
  accentColours: AccentColours;
  exposure: number; // 0.0 to 1.0 exposure lift from CSS token
  reducedMotion: boolean;
  qualityLevel: number; // 1.0 = full, 0.5 = throttled/half elements, 0.0 = static fallback
  size: SceneSize;
}

export interface Scene {
  id: ChapterKey;
  title: string;
  init(ctx: CanvasRenderingContext2D, size: SceneSize): void;
  resize(size: SceneSize): void;
  update(dt: number, state: SceneState): void;
  draw(ctx: CanvasRenderingContext2D, state: SceneState): void;
  drawStatic?(ctx: CanvasRenderingContext2D, state: SceneState): void;
  dispose(): void;
}
