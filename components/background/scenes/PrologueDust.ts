import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

interface DustMote {
  x: number;
  y: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  seed: number;
}

export class PrologueDustScene implements Scene {
  public id = 'prologue' as const;
  public title = 'Prologue: Dust';

  private motes: DustMote[] = [];
  private maxMotes = 50;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxMotes = isMobile ? 24 : 50;

    this.motes = [];
    for (let i = 0; i < this.maxMotes; i++) {
      this.motes.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        baseRadius: 1.0 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 8, // pixels per second
        vy: -4 - Math.random() * 12, // gentle upward drift
        alpha: 0.2 + Math.random() * 0.5,
        seed: Math.random() * 100,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;

    // Scale element count by quality level
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.5 ? 0.5 : 1));

    for (let i = 0; i < activeCount; i++) {
      const m = this.motes[i];
      // Gentle sinusoidal drift
      const wobble = Math.sin(state.time * 0.8 + m.seed) * 6;
      m.x += (m.vx + wobble) * dt;
      m.y += m.vy * dt;

      // Wrap around edges
      if (m.x < -20) m.x = w + 20;
      if (m.x > w + 20) m.x = -20;
      if (m.y < -20) m.y = h + 20;
      if (m.y > h + 20) m.y = -20;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, scrollVelocity, theme, accentColours } = state;

    ctx.save();

    // 1. Desktop subtle parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 10, pointer.y * 10);
    }

    // 2. Faint central light cone around the gold point
    const coneX = width * 0.5;
    const coneY = height * 0.35;
    const coneRadius = Math.max(width, height) * 0.45;

    const moteRgb = theme === 'dark' ? accentColours.goldRgb : accentColours.goldTextSafeRgb;

    const coneGrad = ctx.createRadialGradient(coneX, coneY, 0, coneX, coneY, coneRadius);
    if (theme === 'dark') {
      coneGrad.addColorStop(0, rgba(accentColours.goldRgb, 0.08));
      coneGrad.addColorStop(0.4, rgba(accentColours.goldRgb, 0.03));
      coneGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'lighter';
    } else {
      coneGrad.addColorStop(0, rgba(accentColours.goldTextSafeRgb, 0.08));
      coneGrad.addColorStop(0.5, rgba(accentColours.goldTextSafeRgb, 0.025));
      coneGrad.addColorStop(1, 'rgba(255, 248, 236, 0)');
      ctx.globalCompositeOperation = 'multiply';
    }

    ctx.fillStyle = coneGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Draw drifting dust motes with scroll velocity stretch
    const stretchY = 1 + Math.min(Math.abs(scrollVelocity) * 0.0012, 0.5);
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.9 ? 0.5 : 1));

    for (let i = 0; i < activeCount; i++) {
      const m = this.motes[i];

      // Distance to light cone center increases luminance
      const dx = m.x - coneX;
      const dy = m.y - coneY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / coneRadius);
      const radiance = m.alpha * (0.6 + proximity * 0.8);

      ctx.save();
      ctx.translate(m.x, m.y);
      if (stretchY > 1) {
        ctx.scale(1, stretchY);
      }

      ctx.beginPath();
      ctx.arc(0, 0, m.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = rgba(moteRgb, radiance);
      ctx.fill();

      // Soft glow aura for larger motes in dark mode
      if (theme === 'dark' && m.baseRadius > 1.8 && proximity > 0.2) {
        ctx.beginPath();
        ctx.arc(0, 0, m.baseRadius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = rgba(accentColours.goldRgb, radiance * 0.25);
        ctx.fill();
      }

      ctx.restore();
    }

    ctx.restore();
  }

  public drawStatic(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { theme, accentColours } = state;

    ctx.save();
    const coneGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.35,
      0,
      width * 0.5,
      height * 0.35,
      Math.max(width, height) * 0.4
    );

    if (theme === 'dark') {
      coneGrad.addColorStop(0, rgba(accentColours.goldRgb, 0.07));
      coneGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'lighter';
    } else {
      coneGrad.addColorStop(0, rgba(accentColours.goldTextSafeRgb, 0.06));
      coneGrad.addColorStop(1, 'rgba(255, 248, 236, 0)');
      ctx.globalCompositeOperation = 'multiply';
    }

    ctx.fillStyle = coneGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.motes = [];
  }
}
