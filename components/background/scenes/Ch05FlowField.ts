import { Scene, SceneSize, SceneState } from '../types';
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
  private maxStreamlines = 90; // Strictly under <= 120 requirement

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxStreamlines = isMobile ? 40 : 90;

    this.streamlines = [];
    for (let i = 0; i < this.maxStreamlines; i++) {
      const x = Math.random() * size.width;
      const y = Math.random() * size.height;
      this.streamlines.push({
        x,
        y,
        prevX: x,
        prevY: y,
        speed: 38 + Math.random() * 45,
        life: Math.random() * 4,
        maxLife: 3 + Math.random() * 4,
        alpha: 0.25 + Math.random() * 0.45,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxStreamlines * (state.qualityLevel < 0.5 ? 0.5 : 1));
    const t = state.time * 0.15;

    for (let i = 0; i < activeCount; i++) {
      const s = this.streamlines[i];
      s.prevX = s.x;
      s.prevY = s.y;

      // Evolving smooth trigonometric vector field angle
      const scale = 0.0022;
      const angle =
        Math.sin(s.x * scale + t) * 2.2 +
        Math.cos(s.y * scale * 1.2 - t) * 1.8 +
        Math.sin((s.x + s.y) * scale * 0.5 + t * 0.7);

      s.x += Math.cos(angle) * s.speed * dt;
      s.y += Math.sin(angle) * s.speed * dt;
      s.life += dt;

      // Respawn when life expires or particle wanders offscreen
      if (s.life >= s.maxLife || s.x < -20 || s.x > w + 20 || s.y < -20 || s.y > h + 20) {
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

    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 8, pointer.y * 8);
    }

    // Ambient radial iris glow
    const centerGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.5
    );
    const ambientAlpha = theme === 'dark' ? 0.09 : 0.06;
    centerGrad.addColorStop(0, rgba(accentColours.irisRgb, ambientAlpha));
    centerGrad.addColorStop(0.6, rgba(accentColours.irisRgb, ambientAlpha * 0.3));
    centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = centerGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw streamlines
    const stretchY = 1 + Math.min(Math.abs(scrollVelocity) * 0.001, 0.4);
    ctx.lineWidth = 1.2;

    for (let i = 0; i < activeCount; i++) {
      const s = this.streamlines[i];

      // Smooth fade in and out during lifespan
      const progress = s.life / s.maxLife;
      const fade = Math.sin(progress * Math.PI);
      const alpha = s.alpha * fade * (theme === 'dark' ? 0.75 : 0.55);

      if (alpha < 0.01) continue;

      ctx.save();
      ctx.strokeStyle = rgba(accentColours.irisRgb, alpha);
      ctx.beginPath();
      ctx.moveTo(s.prevX, s.prevY);
      ctx.lineTo(s.x, s.y);
      if (stretchY > 1) {
        ctx.scale(1, stretchY);
      }
      ctx.stroke();

      // Faint particle head
      ctx.fillStyle = rgba(accentColours.irisRgb, alpha * 1.3);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  public drawStatic(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { theme, accentColours } = state;

    ctx.save();
    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      Math.min(width, height) * 0.4
    );
    grad.addColorStop(0, rgba(accentColours.irisRgb, 0.09));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.streamlines = [];
  }
}
