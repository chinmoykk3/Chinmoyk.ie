# Living Background System

The Living Background system is a single, fixed Canvas2D stage mounted once in the root layout behind all content. It crossfades between distinct, narrative-driven animated scenes corresponding to each chapter of the documentary.

---

## Architecture Overview

```
components/background/
├── types.ts                 # Scene, SceneState, SceneSize, AccentColours interfaces
├── tokens.ts                # Dynamic CSS variable resolver (zero hardcoded hex)
├── layers/
│   ├── Grain.ts             # Pre-generated 128x128 noise pattern tile with subtle shift
│   └── Vignette.ts          # Radial gradient edge softening
├── scenes/
│   ├── PrologueDust.ts      # 40-50 slow motes in golden light cone
│   ├── Ch01ConnectingDots.ts# Drifting constellation nodes linked by proximity & cursor
│   ├── Ch02FourOrbs.ts      # Four discipline orbs converging via chapterProgress
│   ├── Ch03Blueprint.ts     # Azure circuit grid with travelling data pulses
│   ├── Ch04InkRegistration.ts # Rose ink blooms, registration crosshairs & letterforms
│   ├── Ch05FlowField.ts     # Trigonometric vector streamlines (≤ 120 trails)
│   ├── Ch06LightLeaksFilm.ts# Analog golden-ember light leaks + 35mm film sprockets
│   ├── Ch07Bokeh.ts         # Floating out-of-focus bokeh discs
│   └── EpilogueSunrise.ts   # Horizon spectrum ramp + sweeping volumetric dawn rays
├── SceneManager.ts          # Boundary-driven crossfade engine & adaptive quality monitor
├── BackgroundStage.tsx      # Canvas component with RAF loop, DPR cap & content scrim
└── README.md                # System documentation
```

---

## How to Add a New Scene

### 1. Implement the `Scene` Interface

Create a new file in `components/background/scenes/MyNewScene.ts`:

```typescript
import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

export class MyNewScene implements Scene {
  public id = 'my-scene' as const;
  public title = 'My Custom Narrative Scene';

  // Pre-allocate object pools here (zero allocations during draw!)
  private particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    const count = isMobile ? 25 : 60; // Respect element budget!

    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { theme, accentColours } = state;

    ctx.save();
    // Blending modes: Additive in Dark Mode, Multiply in Light Mode
    ctx.globalCompositeOperation = theme === 'dark' ? 'lighter' : 'multiply';

    ctx.fillStyle = rgba(accentColours.goldRgb, 0.4);
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  public drawStatic(ctx: CanvasRenderingContext2D, state: SceneState): void {
    // Beautifully composed single-frame fallback for reduced-motion / low-power
  }

  public dispose(): void {
    this.particles = [];
  }
}
```

### 2. Register in `SceneManager.ts`

1. Add the factory to `sceneFactories`:
   ```typescript
   myNewScene: () => new MyNewScene(),
   ```
2. Add its key to `chapterSequence` and `domMap`.

---

## Design Token & Contrast Rules

- **Zero Inline Hex Values**: Never hardcode hex codes like `#FFFFFF` in `.ts` or `.tsx` files. Always read from `state.accentColours` (e.g. `accentColours.goldRgb`, `accentColours.goldTextSafeRgb`) and use the `rgba(rgb, alpha)` helper.
- **Pure Dark Neutral Rule**: In dark mode, no neutral tone may have a blue channel higher than red or green ($R = G = B$).
- **Light Mode Text-Safe Accents**: Use `accentColours.*TextSafeRgb` in light mode for ink lines and text to guarantee AA contrast against the cream background.
- **WCAG AA Compliance**: Keep background opacity behind readable text blocks below ~35% via `<BackgroundStage scrimOpacity={0.18} />`.

---

## Performance & Resilience Rules

- **DPR Cap**: Capped at `1.5` (`Math.min(window.devicePixelRatio || 1, 1.5)`) to prevent GPU overhead on high-DPI screens.
- **Element Budgets**: Desktop $\le 120$ elements per scene; mobile $\le 50$ elements per scene.
- **Mobile Frame Throttling**: 30fps cap on mobile devices to preserve battery and thermal performance.
- **Adaptive Quality**: If rolling average frame render time exceeds 6ms for 2 seconds:
  1. Reduce element count to 50% (`qualityLevel = 0.66`)
  2. Disable 35mm film grain (`qualityLevel = 0.33`)
  3. Fall back to static composed frame (`qualityLevel = 0.0`)
- **Pause on Inactivity**: Canvas loop completely halts when `document.hidden` is true (`visibilitychange`).
- **Resilience Fallbacks**:
  - `prefers-reduced-motion` or `Save-Data` $\to$ static composed frame (`drawStatic`)
  - Canvas context failure $\to$ CSS radial gradient wash
  - No-JS $\to$ progressive `.no-js` and `<noscript>` CSS gradient washes per chapter

