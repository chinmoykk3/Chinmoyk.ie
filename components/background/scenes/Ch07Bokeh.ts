import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';

interface BokehDisc {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  alpha: number;
  phase: number;
}

export class Ch07BokehScene implements Scene {
  public id = 'ch07' as const;
  public title = 'Chapter 07: Bokeh';

  private discs: BokehDisc[] = [];
  private maxDiscs = 36;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxDiscs = isMobile ? 18 : 36;

    this.discs = [];
    for (let i = 0; i < this.maxDiscs; i++) {
      this.discs.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        radius: 18 + Math.random() * 45,
        vy: -12 - Math.random() * 20,
        vx: (Math.random() - 0.5) * 6,
        alpha: 0.08 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxDiscs * (state.qualityLevel < 0.5 ? 0.5 : 1));

    for (let i = 0; i < activeCount; i++) {
      const d = this.discs[i];
      const sway = Math.sin(state.time * 0.6 + d.phase) * 8;
      d.x += (d.vx + sway) * dt;
      d.y += d.vy * dt;

      if (d.y < -d.radius * 2) {
        d.y = h + d.radius * 2;
        d.x = Math.random() * w;
      }
      if (d.x < -d.radius * 2) d.x = w + d.radius * 2;
      if (d.x > w + d.radius * 2) d.x = -d.radius * 2;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, scrollVelocity } = state;
    const activeCount = Math.floor(this.maxDiscs * (state.qualityLevel < 0.5 ? 0.5 : 1));

    ctx.save();

    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const emberRgb: RgbTuple = isDark ? accentColours.emberRgb : accentColours.emberTextSafeRgb;
    const goldRgb: RgbTuple = isDark ? accentColours.goldRgb : accentColours.goldTextSafeRgb;

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 10, pointer.y * 10);
    }

    const stretchY = 1 + Math.min(Math.abs(scrollVelocity) * 0.0012, 0.45);

    for (let i = 0; i < activeCount; i++) {
      const d = this.discs[i];

      ctx.save();
      ctx.translate(d.x, d.y);
      if (stretchY > 1) {
        ctx.scale(1, stretchY);
      }

      // Soft bokeh disc with subtle rim highlight
      const grad = ctx.createRadialGradient(0, 0, d.radius * 0.2, 0, 0, d.radius);
      const alpha = d.alpha * (isDark ? 1.0 : 0.7);

      grad.addColorStop(0, rgba(emberRgb, alpha * 0.4));
      grad.addColorStop(0.75, rgba(emberRgb, alpha * 0.85));
      grad.addColorStop(0.92, rgba(goldRgb, alpha * 1.1));
      grad.addColorStop(1, rgba(emberRgb, 0));

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  public drawStatic(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { theme, accentColours } = state;

    ctx.save();
    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const emberRgb = isDark ? accentColours.emberRgb : accentColours.emberTextSafeRgb;

    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.6,
      0,
      width * 0.5,
      height * 0.6,
      Math.min(width, height) * 0.4
    );
    grad.addColorStop(0, rgba(emberRgb, 0.12));
    grad.addColorStop(1, rgba(emberRgb, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.discs = [];
  }
}
