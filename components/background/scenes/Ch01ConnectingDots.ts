import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

interface NodeDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export class Ch01ConnectingDotsScene implements Scene {
  public id = 'ch01' as const;
  public title = 'Chapter 01: Connecting Dots';

  private dots: NodeDot[] = [];
  private maxDots = 42;
  private linkDistance = 120;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxDots = isMobile ? 20 : 42;
    this.linkDistance = isMobile ? 95 : 125;

    this.dots = [];
    for (let i = 0; i < this.maxDots; i++) {
      this.dots.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        radius: 1.2 + Math.random() * 1.8,
        alpha: 0.3 + Math.random() * 0.45,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxDots * (state.qualityLevel < 0.5 ? 0.5 : 1));

    for (let i = 0; i < activeCount; i++) {
      const dot = this.dots[i];
      dot.x += dot.vx * dt;
      dot.y += dot.vy * dt;

      // Wrap boundaries
      if (dot.x < -10) dot.x = w + 10;
      if (dot.x > w + 10) dot.x = -10;
      if (dot.y < -10) dot.y = h + 10;
      if (dot.y > h + 10) dot.y = -10;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours } = state;
    const activeCount = Math.floor(this.maxDots * (state.qualityLevel < 0.5 ? 0.5 : 1));

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

    // Convert normalized pointer (-1 to 1) to canvas pixel coordinates
    const mousePixelX = (pointer.x + 1) * 0.5 * width;
    const mousePixelY = (pointer.y + 1) * 0.5 * height;
    const mouseActive = !pointer.isTouch && pointer.active;

    // 1. Draw connection lines between nearby dots
    ctx.lineWidth = 0.8;
    for (let i = 0; i < activeCount; i++) {
      const a = this.dots[i];

      // Lines to other dots
      for (let j = i + 1; j < activeCount; j++) {
        const b = this.dots[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = this.linkDistance * this.linkDistance;

        if (distSq < maxDistSq) {
          const proximity = 1 - Math.sqrt(distSq) / this.linkDistance;
          const lineAlpha = proximity * 0.22 * (theme === 'dark' ? 1 : 0.85);

          ctx.strokeStyle = rgba(accentColours.goldRgb, lineAlpha);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Desktop interactive link to cursor
      if (mouseActive) {
        const dxM = a.x - mousePixelX;
        const dyM = a.y - mousePixelY;
        const distSqM = dxM * dxM + dyM * dyM;
        const cursorMaxDistSq = (this.linkDistance * 1.35) ** 2;

        if (distSqM < cursorMaxDistSq) {
          const proximity = 1 - Math.sqrt(distSqM) / (this.linkDistance * 1.35);
          ctx.strokeStyle = rgba(accentColours.goldRgb, proximity * 0.35);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mousePixelX, mousePixelY);
          ctx.stroke();
        }
      }
    }

    // 2. Draw dots
    for (let i = 0; i < activeCount; i++) {
      const d = this.dots[i];
      ctx.fillStyle = rgba(accentColours.goldRgb, d.alpha);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle cursor node
    if (mouseActive) {
      ctx.fillStyle = rgba(accentColours.goldRgb, 0.4);
      ctx.beginPath();
      ctx.arc(mousePixelX, mousePixelY, 2.5, 0, Math.PI * 2);
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

    // Draw a quiet, pre-composed web of a few nodes
    const sampleCoords = [
      [width * 0.2, height * 0.3],
      [width * 0.35, height * 0.45],
      [width * 0.5, height * 0.35],
      [width * 0.7, height * 0.4],
      [width * 0.6, height * 0.6],
      [width * 0.4, height * 0.65],
    ];

    ctx.lineWidth = 0.8;
    ctx.strokeStyle = rgba(accentColours.goldRgb, 0.12);
    ctx.beginPath();
    ctx.moveTo(sampleCoords[0][0], sampleCoords[0][1]);
    for (let i = 1; i < sampleCoords.length; i++) {
      ctx.lineTo(sampleCoords[i][0], sampleCoords[i][1]);
    }
    ctx.closePath();
    ctx.stroke();

    for (const [x, y] of sampleCoords) {
      ctx.fillStyle = rgba(accentColours.goldRgb, 0.35);
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  public dispose(): void {
    this.dots = [];
  }
}
