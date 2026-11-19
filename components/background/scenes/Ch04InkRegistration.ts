import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

interface RegistrationMark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'crosshair' | 'corner' | 'circle';
  size: number;
}

interface Letterform {
  char: string;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
}

export class Ch04InkRegistrationScene implements Scene {
  public id = 'ch04' as const;
  public title = 'Chapter 04: Ink + Registration';

  private marks: RegistrationMark[] = [];
  private letterforms: Letterform[] = [];

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    const markCount = isMobile ? 6 : 12;

    this.marks = [];
    const types: ('crosshair' | 'corner' | 'circle')[] = ['crosshair', 'corner', 'circle'];
    for (let i = 0; i < markCount; i++) {
      this.marks.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        type: types[i % 3],
        size: 14 + Math.random() * 12,
      });
    }

    this.letterforms = [
      {
        char: 'A',
        x: size.width * 0.15,
        y: size.height * 0.35,
        size: isMobile ? 140 : 260,
        vx: 1.5,
        vy: -1.0,
        rotation: -0.06,
      },
      {
        char: '&',
        x: size.width * 0.82,
        y: size.height * 0.65,
        size: isMobile ? 160 : 300,
        vx: -1.2,
        vy: 1.2,
        rotation: 0.05,
      },
      {
        char: 'g',
        x: size.width * 0.45,
        y: size.height * 0.85,
        size: isMobile ? 120 : 220,
        vx: 1.0,
        vy: 0.8,
        rotation: -0.04,
      },
    ];
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;

    // Update registration marks
    for (const m of this.marks) {
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      if (m.x < -30) m.x = w + 30;
      if (m.x > w + 30) m.x = -30;
      if (m.y < -30) m.y = h + 30;
      if (m.y > h + 30) m.y = -30;
    }

    // Update letterforms
    for (const lf of this.letterforms) {
      lf.x += lf.vx * dt;
      lf.y += lf.vy * dt;
      if (lf.x < -150) lf.x = w + 150;
      if (lf.x > w + 150) lf.x = -150;
      if (lf.y < -150) lf.y = h + 150;
      if (lf.y > h + 150) lf.y = -150;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, time } = state;

    ctx.save();

    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 10, pointer.y * 10);
    }

    // 1. Slow, breathing rose ink-bloom gradients
    const bloom1X = width * 0.3 + Math.sin(time * 0.4) * 40;
    const bloom1Y = height * 0.4 + Math.cos(time * 0.5) * 35;
    const radius1 = Math.min(width, height) * 0.38;

    const grad1 = ctx.createRadialGradient(bloom1X, bloom1Y, 0, bloom1X, bloom1Y, radius1);
    const alpha1 = theme === 'dark' ? 0.12 : 0.08;
    grad1.addColorStop(0, rgba(accentColours.roseRgb, alpha1));
    grad1.addColorStop(0.6, rgba(accentColours.roseRgb, alpha1 * 0.35));
    grad1.addColorStop(1, rgba(accentColours.roseRgb, 0));

    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(bloom1X, bloom1Y, radius1, 0, Math.PI * 2);
    ctx.fill();

    const bloom2X = width * 0.72 + Math.cos(time * 0.35) * 30;
    const bloom2Y = height * 0.65 + Math.sin(time * 0.45) * 30;
    const radius2 = Math.min(width, height) * 0.32;

    const grad2 = ctx.createRadialGradient(bloom2X, bloom2Y, 0, bloom2X, bloom2Y, radius2);
    grad2.addColorStop(0, rgba(accentColours.roseRgb, alpha1 * 0.9));
    grad2.addColorStop(0.5, rgba(accentColours.roseRgb, alpha1 * 0.25));
    grad2.addColorStop(1, rgba(accentColours.roseRgb, 0));

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(bloom2X, bloom2Y, radius2, 0, Math.PI * 2);
    ctx.fill();

    // 2. Faint giant serif letterforms drifting behind
    ctx.font = 'italic 700 serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = rgba(accentColours.roseRgb, theme === 'dark' ? 0.035 : 0.04);

    for (const lf of this.letterforms) {
      ctx.save();
      ctx.translate(lf.x, lf.y);
      ctx.rotate(lf.rotation);
      ctx.font = `italic ${lf.size}px "Instrument Serif", Georgia, serif`;
      ctx.fillText(lf.char, 0, 0);
      ctx.restore();
    }

    // 3. Editorial registration marks and crop crosshairs
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = rgba(accentColours.roseRgb, theme === 'dark' ? 0.25 : 0.18);

    for (const m of this.marks) {
      ctx.save();
      ctx.translate(m.x, m.y);

      if (m.type === 'crosshair') {
        ctx.beginPath();
        ctx.moveTo(-m.size, 0);
        ctx.lineTo(m.size, 0);
        ctx.moveTo(0, -m.size);
        ctx.lineTo(0, m.size);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, m.size * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      } else if (m.type === 'corner') {
        ctx.beginPath();
        ctx.moveTo(-m.size, 0);
        ctx.lineTo(-m.size, -m.size);
        ctx.lineTo(0, -m.size);
        ctx.stroke();
      } else {
        // Circle target with notch
        ctx.beginPath();
        ctx.arc(0, 0, m.size * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(accentColours.roseRgb, 0.3);
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
    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    const grad = ctx.createRadialGradient(
      width * 0.4,
      height * 0.4,
      0,
      width * 0.4,
      height * 0.4,
      Math.min(width, height) * 0.35
    );
    grad.addColorStop(0, rgba(accentColours.roseRgb, 0.08));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }

  public dispose(): void {
    this.marks = [];
    this.letterforms = [];
  }
}
