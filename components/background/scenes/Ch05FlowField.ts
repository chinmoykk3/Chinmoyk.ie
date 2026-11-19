import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';

interface Streamline {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
  life: number;
  maxLife: number;
  alpha: number;
}

export class Ch05FlowFieldScene implements Scene {
  public id = 'ch05' as const;
  public title = 'Chapter 05: Flow Field';

  private streamlines: Streamline[] = [];
  private maxStreamlines = 84; // Strictly under ≤ 120 trails requirement

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxStreamlines = isMobile ? 36 : 84;

    this.streamlines = [];
    for (let i = 0; i < this.maxStreamlines; i++) {
      const x = Math.random() * size.width;
      const y = Math.random() * size.height;
      this.streamlines.push({
        x,
        y,
        prevX: x,
        prevY: y,
        speed: 32 + Math.random() * 40,
        life: Math.random() * 4,
        maxLife: 3.5 + Math.random() * 3.5,
        alpha: 0.2 + Math.random() * 0.4,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxStreamlines * (state.qualityLevel < 0.5 ? 0.5 : 1));
    const t = state.time * 0.12;

    for (let i = 0; i < activeCount; i++) {
      const s = this.streamlines[i];
      s.prevX = s.x;
      s.prevY = s.y;

      // Gentle, sparse trigonometric flow field angle
      const scale = 0.0018;
      const angle =
        Math.sin(s.x * scale + t) * 2.0 +
        Math.cos(s.y * scale * 1.1 - t) * 1.6 +
        Math.sin((s.x + s.y) * scale * 0.4 + t * 0.6);

      s.x += Math.cos(angle) * s.speed * dt;
      s.y += Math.sin(angle) * s.speed * dt;
      s.life += dt;

      // Respawn when life expires or particle drifts out of bounds
      if (s.life >= s.maxLife || s.x < -30 || s.x > w + 30 || s.y < -30 || s.y > h + 30) {
        s.x = Math.random() * w;
        s.y = Math.random() * h;
        s.prevX = s.x;
        s.prevY = s.y;
        s.life = 0;
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, scrollVelocity } = state;
    const activeCount = Math.floor(this.maxStreamlines * (state.qualityLevel < 0.5 ? 0.5 : 1));

    ctx.save();

    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const irisRgb: RgbTuple = isDark ? accentColours.irisRgb : accentColours.irisTextSafeRgb;

    // Subtle parallax (non-competing)
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 6, pointer.y * 6);
    }

    // 1. Faint ambient radial iris glow
    const centerGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.5
    );
    const ambientAlpha = isDark ? 0.07 : 0.05;
    centerGrad.addColorStop(0, rgba(irisRgb, ambientAlpha));
    centerGrad.addColorStop(0.55, rgba(irisRgb, ambientAlpha * 0.3));
    centerGrad.addColorStop(1, rgba(irisRgb, 0));
    ctx.fillStyle = centerGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Sparse, non-competing streamlines
    const stretchY = 1 + Math.min(Math.abs(scrollVelocity) * 0.0008, 0.3);
    ctx.lineWidth = isDark ? 1.0 : 1.2;

    for (let i = 0; i < activeCount; i++) {
      const s = this.streamlines[i];

      // Smooth sine fade over lifespan
      const progress = s.life / s.maxLife;
      const fade = Math.sin(progress * Math.PI);
      const alpha = s.alpha * fade * (isDark ? 0.65 : 0.45);

      if (alpha < 0.01) continue;

      ctx.save();
      ctx.strokeStyle = rgba(irisRgb, alpha);
      ctx.beginPath();
      ctx.moveTo(s.prevX, s.prevY);
      ctx.lineTo(s.x, s.y);
      if (stretchY > 1) {
        ctx.scale(1, stretchY);
      }
      ctx.stroke();

      // Faint glowing head
      ctx.fillStyle = rgba(irisRgb, alpha * 1.25);
      ctx.beginPath();
      ctx.arc(s.x, s.y, isDark ? 1.1 : 1.3, 0, Math.PI * 2);
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

    const irisRgb: RgbTuple = isDark ? accentColours.irisRgb : accentColours.irisTextSafeRgb;

    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      Math.min(width, height) * 0.4
    );
    grad.addColorStop(0, rgba(irisRgb, 0.07));
    grad.addColorStop(1, rgba(irisRgb, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.streamlines = [];
  }
}
