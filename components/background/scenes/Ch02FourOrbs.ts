import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

export class Ch02FourOrbsScene implements Scene {
  public id = 'ch02' as const;
  public title = 'Chapter 02: Four Orbs';

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {}
  public resize(size: SceneSize): void {}
  public update(dt: number, state: SceneState): void {}

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { chapterProgress, pointer, theme, accentColours, time } = state;

    ctx.save();

    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 12, pointer.y * 12);
    }

    const cx = width * 0.5;
    const cy = height * 0.5;
    const baseRadius = Math.min(width, height) * 0.28;

    // Convergence ratio: 0 = far apart, 1 = centered together
    const conv = Math.max(0, Math.min(1, chapterProgress));

    // Outer offsets (when conv = 0)
    const spreadX = width * 0.24 * (1 - conv);
    const spreadY = height * 0.22 * (1 - conv);

    // Subtle floating breathing offsets
    const f1 = Math.sin(time * 0.9) * 8;
    const f2 = Math.cos(time * 0.8) * 8;
    const f3 = Math.sin(time * 0.7 + 1.5) * 8;
    const f4 = Math.cos(time * 0.85 + 2.0) * 8;

    const orbs = [
      {
        name: 'azure',
        rgb: accentColours.azureRgb,
        x: cx - spreadX + f1,
        y: cy - spreadY + f2,
      },
      {
        name: 'iris',
        rgb: accentColours.irisRgb,
        x: cx + spreadX + f2,
        y: cy - spreadY + f3,
      },
      {
        name: 'rose',
        rgb: accentColours.roseRgb,
        x: cx - spreadX + f3,
        y: cy + spreadY + f4,
      },
      {
        name: 'ember',
        rgb: accentColours.emberRgb,
        x: cx + spreadX + f4,
        y: cy + spreadY + f1,
      },
    ];

    const maxAlpha = theme === 'dark' ? 0.16 : 0.11;

    // Draw four discipline orbs
    for (const orb of orbs) {
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, baseRadius);
      grad.addColorStop(0, rgba(orb.rgb, maxAlpha));
      grad.addColorStop(0.5, rgba(orb.rgb, maxAlpha * 0.45));
      grad.addColorStop(1, rgba(orb.rgb, 0));

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, baseRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Converged unified gold nucleus emerges as conv increases
    if (conv > 0.2) {
      const nucleusRatio = (conv - 0.2) / 0.8;
      const nucleusRadius = baseRadius * (0.8 + nucleusRatio * 0.4);
      const nucleusAlpha = nucleusRatio * (theme === 'dark' ? 0.18 : 0.12);

      const nucleusGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucleusRadius);
      nucleusGrad.addColorStop(0, rgba(accentColours.goldRgb, nucleusAlpha));
      nucleusGrad.addColorStop(0.5, rgba(accentColours.goldRgb, nucleusAlpha * 0.35));
      nucleusGrad.addColorStop(1, rgba(accentColours.goldRgb, 0));

      ctx.fillStyle = nucleusGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2);
      ctx.fill();
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

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) * 0.3;
    const alpha = theme === 'dark' ? 0.12 : 0.08;

    // Converged soft composite wash
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, rgba(accentColours.goldRgb, alpha));
    grad.addColorStop(0.4, rgba(accentColours.irisRgb, alpha * 0.6));
    grad.addColorStop(0.8, rgba(accentColours.azureRgb, alpha * 0.3));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {}
}
