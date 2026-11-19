import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
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
  private isCalmed = false;
  private calmFactor = 1.0;

  private handleLightboxEvent = (e: Event) => {
    const custom = e as CustomEvent<{ open?: boolean }>;
    this.isCalmed = Boolean(custom.detail?.open);
  };

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
    if (typeof window !== 'undefined') {
      window.addEventListener('story:lightbox', this.handleLightboxEvent);
    }
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    const markCount = isMobile ? 6 : 14;

    this.marks = [];
    const types: ('crosshair' | 'corner' | 'circle')[] = ['crosshair', 'corner', 'circle'];
    for (let i = 0; i < markCount; i++) {
      this.marks.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        type: types[i % 3],
        size: 14 + Math.random() * 12,
      });
    }

    this.letterforms = [
      {
        char: 'A',
        x: size.width * 0.14,
        y: size.height * 0.32,
        size: isMobile ? 130 : 250,
        vx: 1.5,
        vy: -0.8,
        rotation: -0.06,
      },
      {
        char: '&',
        x: size.width * 0.84,
        y: size.height * 0.62,
        size: isMobile ? 150 : 280,
        vx: -1.0,
        vy: 1.0,
        rotation: 0.05,
      },
      {
        char: 'g',
        x: size.width * 0.44,
        y: size.height * 0.82,
        size: isMobile ? 110 : 210,
        vx: 0.8,
        vy: 0.6,
        rotation: -0.04,
      },
      {
        char: 'R',
        x: size.width * 0.68,
        y: size.height * 0.22,
        size: isMobile ? 90 : 170,
        vx: -0.6,
        vy: 0.8,
        rotation: 0.04,
      },
    ];
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;

    // Smoothly transition calm factor when lightbox opens/closes
    const targetFactor = this.isCalmed ? 0.15 : 1.0;
    this.calmFactor += (targetFactor - this.calmFactor) * Math.min(1, dt * 5);

    const speedMultiplier = this.calmFactor;

    // Update drifting registration marks
    for (const m of this.marks) {
      m.x += m.vx * dt * speedMultiplier;
      m.y += m.vy * dt * speedMultiplier;
      if (m.x < -30) m.x = w + 30;
      if (m.x > w + 30) m.x = -30;
      if (m.y < -30) m.y = h + 30;
      if (m.y > h + 30) m.y = -30;
    }

    // Update drifting giant letterforms
    for (const lf of this.letterforms) {
      lf.x += lf.vx * dt * speedMultiplier;
      lf.y += lf.vy * dt * speedMultiplier;
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

    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const roseRgb: RgbTuple = isDark ? accentColours.roseRgb : accentColours.roseTextSafeRgb;

    // Subtle Parallax (calmed when lightbox is active)
    if (!pointer.isTouch) {
      const pFactor = 8 * this.calmFactor;
      ctx.translate(pointer.x * pFactor, pointer.y * pFactor);
    }

    // 1. Slow, breathing rose ink-bloom radial gradients
    const bloom1X = width * 0.3 + Math.sin(time * 0.35) * 40 * this.calmFactor;
    const bloom1Y = height * 0.4 + Math.cos(time * 0.45) * 35 * this.calmFactor;
    const radius1 = Math.min(width, height) * 0.4;

    const baseAlpha1 = (isDark ? 0.12 : 0.08) * this.calmFactor;
    const grad1 = ctx.createRadialGradient(bloom1X, bloom1Y, 0, bloom1X, bloom1Y, radius1);
    grad1.addColorStop(0, rgba(roseRgb, baseAlpha1));
    grad1.addColorStop(0.55, rgba(roseRgb, baseAlpha1 * 0.4));
    grad1.addColorStop(1, rgba(roseRgb, 0));

    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(bloom1X, bloom1Y, radius1, 0, Math.PI * 2);
    ctx.fill();

    const bloom2X = width * 0.72 + Math.cos(time * 0.3) * 30 * this.calmFactor;
    const bloom2Y = height * 0.65 + Math.sin(time * 0.4) * 30 * this.calmFactor;
    const radius2 = Math.min(width, height) * 0.35;

    const grad2 = ctx.createRadialGradient(bloom2X, bloom2Y, 0, bloom2X, bloom2Y, radius2);
    grad2.addColorStop(0, rgba(roseRgb, baseAlpha1 * 0.85));
    grad2.addColorStop(0.5, rgba(roseRgb, baseAlpha1 * 0.25));
    grad2.addColorStop(1, rgba(roseRgb, 0));

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(bloom2X, bloom2Y, radius2, 0, Math.PI * 2);
    ctx.fill();

    // 2. Faint giant serif letterforms drifting behind
    const letterAlpha = (isDark ? 0.04 : 0.045) * this.calmFactor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = rgba(roseRgb, letterAlpha);

    for (const lf of this.letterforms) {
      ctx.save();
      ctx.translate(lf.x, lf.y);
      ctx.rotate(lf.rotation);
      ctx.font = `italic 700 ${lf.size}px "Instrument Serif", Georgia, serif`;
      ctx.fillText(lf.char, 0, 0);
      ctx.restore();
    }

    // 3. Editorial registration marks and crop crosshairs
    ctx.lineWidth = 0.8;
    const markAlpha = (isDark ? 0.25 : 0.2) * this.calmFactor;
    ctx.strokeStyle = rgba(roseRgb, markAlpha);

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
        ctx.beginPath();
        ctx.arc(0, 0, m.size * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(roseRgb, markAlpha * 1.2);
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
    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const roseRgb: RgbTuple = isDark ? accentColours.roseRgb : accentColours.roseTextSafeRgb;

    const grad = ctx.createRadialGradient(
      width * 0.4,
      height * 0.4,
      0,
      width * 0.4,
      height * 0.4,
      Math.min(width, height) * 0.35
    );
    grad.addColorStop(0, rgba(roseRgb, 0.08));
    grad.addColorStop(1, rgba(roseRgb, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }

  public dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('story:lightbox', this.handleLightboxEvent);
    }
    this.marks = [];
    this.letterforms = [];
  }
}
