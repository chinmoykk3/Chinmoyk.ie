import { ChapterKey, Scene, SceneSize, SceneState, ThemeMode } from './types';
import { getAccentColours } from './tokens';
import { GrainLayer } from './layers/Grain';
import { VignetteLayer } from './layers/Vignette';
import { PrologueDustScene } from './scenes/PrologueDust';
import { Ch01ConnectingDotsScene } from './scenes/Ch01ConnectingDots';
import { Ch02FourOrbsScene } from './scenes/Ch02FourOrbs';
import { Ch03BlueprintScene } from './scenes/Ch03Blueprint';
import { Ch04InkRegistrationScene } from './scenes/Ch04InkRegistration';
import { Ch05FlowFieldScene } from './scenes/Ch05FlowField';
import { Ch06LightLeaksFilmScene } from './scenes/Ch06LightLeaksFilm';
import { Ch07BokehScene } from './scenes/Ch07Bokeh';
import { EpilogueSunriseScene } from './scenes/EpilogueSunrise';

export interface SceneManagerOptions {
  theme: ThemeMode;
  reducedMotion: boolean;
  manualChapter?: ChapterKey;
  manualChapterProgress?: number;
}

export class SceneManager {
  private ctx: CanvasRenderingContext2D;
  private size: SceneSize = { width: 0, height: 0, dpr: 1 };
  private grainLayer = new GrainLayer();
  private vignetteLayer = new VignetteLayer();

  // Registry of all scene factories
  private sceneFactories: Record<ChapterKey, () => Scene> = {
    prologue: () => new PrologueDustScene(),
    ch01: () => new Ch01ConnectingDotsScene(),
    ch02: () => new Ch02FourOrbsScene(),
    ch03: () => new Ch03BlueprintScene(),
    ch04: () => new Ch04InkRegistrationScene(),
    ch05: () => new Ch05FlowFieldScene(),
    ch06: () => new Ch06LightLeaksFilmScene(),
    ch07: () => new Ch07BokehScene(),
    epilogue: () => new EpilogueSunriseScene(),
  };

  // Instantiated active scenes (at most 2 active during crossfade)
  private activeScenes: Map<ChapterKey, Scene> = new Map();

  // Sequence of registered chapters
  private chapterSequence: ChapterKey[] = [
    'prologue',
    'ch01',
    'ch02',
    'ch03',
    'ch04',
    'ch05',
    'ch06',
    'ch07',
    'epilogue',
  ];

  // DOM mapping for chapters on the page
  private chapterBounds: { key: ChapterKey; top: number; bottom: number }[] = [];

  // Adaptive performance metrics
  private frameTimes: number[] = [];
  private qualityLevel = 1.0;
  private frameDurationThreshold = 6.0; // 6ms budget
  private degradedTime = 0;

  // State
  private lastTime = 0;
  private totalElapsed = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public resize(size: SceneSize): void {
    this.size = size;
    this.grainLayer.resize(size, this.ctx);
    this.vignetteLayer.resize(size, this.ctx);

    // Resize currently instantiated scenes
    for (const scene of this.activeScenes.values()) {
      scene.resize(size);
    }

    this.recalculateChapterBounds();
  }

  public recalculateChapterBounds(): void {
    if (typeof document === 'undefined') return;

    const domMap: Record<ChapterKey, string> = {
      prologue: 'prologue',
      ch01: 'chapter-01',
      ch02: 'chapter-02',
      ch03: 'chapter-03',
      ch04: 'chapter-04',
      ch05: 'chapter-05',
      ch06: 'chapter-06',
      ch07: 'chapter-07',
      epilogue: 'epilogue',
    };

    const newSequence: ChapterKey[] = [];
    const bounds: { key: ChapterKey; top: number; bottom: number }[] = [];
    const scrollY = window.scrollY || window.pageYOffset || 0;

    for (const key of this.chapterSequence) {
      const elId = domMap[key];
      const el = document.getElementById(elId);

      // If Chapter 07 or any other chapter has no content / element in DOM, skip it
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + Math.max(rect.height, 400);

        newSequence.push(key);
        bounds.push({ key, top, bottom });
      }
    }

    if (bounds.length > 0) {
      this.chapterBounds = bounds;
    }
  }

  /**
   * Ensure only needed scenes (active + next during crossfade) are initialized,
   * disposing any out-of-scope scenes immediately to respect memory budgets.
   */
  private getOrCreateScene(key: ChapterKey): Scene {
    let scene = this.activeScenes.get(key);
    if (!scene) {
      scene = this.sceneFactories[key]();
      scene.init(this.ctx, this.size);
      this.activeScenes.set(key, scene);
    }
    return scene;
  }

  private pruneUnusedScenes(allowedKeys: ChapterKey[]): void {
    for (const [key, scene] of this.activeScenes.entries()) {
      if (!allowedKeys.includes(key)) {
        scene.dispose();
        this.activeScenes.delete(key);
      }
    }
  }

  public render(
    now: number,
    stateParams: {
      scrollProgress: number;
      scrollVelocity: number;
      pointer: SceneState['pointer'];
      theme: ThemeMode;
      exposure: number;
      reducedMotion: boolean;
      manualChapter?: ChapterKey;
      manualChapterProgress?: number;
    }
  ): void {
    const startTime = performance.now();
    const dt = this.lastTime > 0 ? Math.min((now - this.lastTime) / 1000, 0.1) : 0.016;
    this.lastTime = now;
    this.totalElapsed += dt;

    // Adaptive performance monitoring: rolling frame time
    this.updateAdaptiveQuality(dt);

    const { width, height } = this.size;
    if (width === 0 || height === 0) return;

    const accentColours = getAccentColours(stateParams.theme);

    // Determine active chapter(s) and crossfade transition progress
    let currentKey: ChapterKey = 'prologue';
    let nextKey: ChapterKey | null = null;
    let transitionProgress = 0;
    let chapterProgress = 0;

    if (stateParams.manualChapter) {
      // In Background Lab: direct manual selection
      currentKey = stateParams.manualChapter;
      chapterProgress = stateParams.manualChapterProgress ?? 0.5;
    } else if (this.chapterBounds.length > 0) {
      const scrollY = (window.scrollY || window.pageYOffset || 0) + height * 0.4;
      const total = this.chapterBounds.length;

      let activeIndex = 0;
      for (let i = 0; i < total; i++) {
        if (scrollY >= this.chapterBounds[i].top) {
          activeIndex = i;
        }
      }

      const currentBound = this.chapterBounds[activeIndex];
      const nextBound = activeIndex < total - 1 ? this.chapterBounds[activeIndex + 1] : null;

      currentKey = currentBound.key;
      const chapterHeight = currentBound.bottom - currentBound.top;
      chapterProgress = Math.max(0, Math.min(1, (scrollY - currentBound.top) / chapterHeight));

      // Transition window: last 20% of chapter scrolls into next
      if (nextBound && chapterProgress > 0.8) {
        nextKey = nextBound.key;
        transitionProgress = (chapterProgress - 0.8) / 0.2;
      }
    } else {
      // Fallback interpolation based on scrollProgress
      const count = this.chapterSequence.length;
      const scaled = stateParams.scrollProgress * (count - 1);
      const idx = Math.min(Math.floor(scaled), count - 1);
      currentKey = this.chapterSequence[idx];
      chapterProgress = scaled - idx;

      if (chapterProgress > 0.8 && idx < count - 1) {
        nextKey = this.chapterSequence[idx + 1];
        transitionProgress = (chapterProgress - 0.8) / 0.2;
      }
    }

    // Keep only active and next scene initialized; dispose all others
    const allowed = nextKey ? [currentKey, nextKey] : [currentKey];
    this.pruneUnusedScenes(allowed);

    const currentScene = this.getOrCreateScene(currentKey);
    const nextScene = nextKey ? this.getOrCreateScene(nextKey) : null;

    // Construct unified SceneState
    const state: SceneState = {
      time: this.totalElapsed,
      scrollProgress: stateParams.scrollProgress,
      chapterProgress,
      scrollVelocity: stateParams.scrollVelocity,
      pointer: stateParams.pointer,
      theme: stateParams.theme,
      accentColours,
      exposure: stateParams.exposure,
      reducedMotion: stateParams.reducedMotion,
      qualityLevel: this.qualityLevel,
      size: this.size,
    };

    // 1. Clear & draw background base with exposure lift
    this.drawBackgroundBase(state);

    // 2. Render active scene (or static fallback if reduced motion is requested)
    if (state.reducedMotion || this.qualityLevel === 0) {
      if (currentScene.drawStatic) {
        currentScene.drawStatic(this.ctx, state);
      } else {
        currentScene.draw(this.ctx, state);
      }
    } else if (nextScene && transitionProgress > 0) {
      // Crossfade between current and next scene
      currentScene.update(dt, state);
      this.ctx.save();
      this.ctx.globalAlpha = 1 - transitionProgress;
      currentScene.draw(this.ctx, state);
      this.ctx.restore();

      const nextState: SceneState = {
        ...state,
        chapterProgress: 0,
      };
      nextScene.update(dt, nextState);
      this.ctx.save();
      this.ctx.globalAlpha = transitionProgress;
      nextScene.draw(this.ctx, nextState);
      this.ctx.restore();
    } else {
      // Single active scene
      currentScene.update(dt, state);
      currentScene.draw(this.ctx, state);
    }

    // 3. Render Global Layers: Vignette & Film Grain
    this.vignetteLayer.draw(this.ctx, state);
    this.grainLayer.draw(this.ctx, state);

    // Track frame execution duration
    const frameElapsed = performance.now() - startTime;
    this.recordFrameTime(frameElapsed, dt);
  }

  /**
   * Background base with Exposure Lift:
   * Dark mode: pure neutral black (rgb(0, 0, 0)) lifting up to at most rgb(15, 15, 15) in pure neutral steps.
   * Light mode: warm cream (rgb(250, 248, 245)).
   */
  private drawBackgroundBase(state: SceneState): void {
    const { width, height } = this.size;
    const { theme, exposure } = state;

    if (theme === 'dark') {
      const maxLift = 15;
      const step = Math.min(maxLift, Math.max(0, Math.round(exposure * maxLift)));
      // Confirm R=G=B (zero navy/indigo tint)
      this.ctx.fillStyle = `rgb(${step}, ${step}, ${step})`;
    } else {
      this.ctx.fillStyle = 'rgb(250, 248, 245)';
    }

    this.ctx.fillRect(0, 0, width, height);
  }

  private updateAdaptiveQuality(dt: number): void {
    if (this.frameTimes.length < 30) return;

    // Calculate rolling average
    const sum = this.frameTimes.reduce((acc, val) => acc + val, 0);
    const avg = sum / this.frameTimes.length;

    if (avg > this.frameDurationThreshold) {
      this.degradedTime += dt;
      // If frame time stays above threshold for 2 seconds, step down quality
      if (this.degradedTime > 2.0) {
        if (this.qualityLevel === 1.0) {
          this.qualityLevel = 0.5; // Half element count
          this.degradedTime = 0;
        } else if (this.qualityLevel === 0.5) {
          this.qualityLevel = 0.0; // Fall back to static frame
          this.degradedTime = 0;
        }
      }
    } else {
      this.degradedTime = Math.max(0, this.degradedTime - dt * 0.5);
    }
  }

  private recordFrameTime(timeMs: number, dt: number): void {
    this.frameTimes.push(timeMs);
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }
  }

  public getQualityLevel(): number {
    return this.qualityLevel;
  }

  public setQualityLevel(level: number): void {
    this.qualityLevel = level;
  }

  public getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    const sum = this.frameTimes.reduce((acc, val) => acc + val, 0);
    return sum / this.frameTimes.length;
  }

  public dispose(): void {
    for (const scene of this.activeScenes.values()) {
      scene.dispose();
    }
    this.activeScenes.clear();
    this.grainLayer.dispose();
    this.vignetteLayer.dispose();
  }
}
