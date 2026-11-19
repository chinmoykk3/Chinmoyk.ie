import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';

export class Ch06LightLeaksFilmScene implements Scene {
  public id = 'ch06' as const;
  public title = 'Chapter 06: Light Leaks + Film';

  private perfOffset = 0;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {}
  public resize(size: SceneSize): void {}

  public update(dt: number, state: SceneState): void {
    // Film sprockets scroll slowly along Y
    this.perfOffset = (this.perfOffset + dt * 16) % 36;
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, time } = state;

    ctx.save();

    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const goldRgb: RgbTuple = isDark ? accentColours.goldRgb : accentColours.goldTextSafeRgb;
    const emberRgb: RgbTuple = isDark ? accentColours.emberRgb : accentColours.emberTextSafeRgb;

    // Subtle Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 8, pointer.y * 8);
    }

    // 1. Organic light leaks in corners (gold to ember with subtle warmth flicker)
    const flicker1 = Math.sin(time * 1.8) * 0.12 + Math.cos(time * 3.1) * 0.08;
    const leak1Radius = Math.min(width, height) * (0.45 + flicker1 * 0.2);

    // Top-left leak (Gold)
    const leak1Grad = ctx.createRadialGradient(0, 0, 0, 0, 0, leak1Radius);
    const alphaGold = (isDark ? 0.14 : 0.09) * (1 + flicker1 * 0.4);
    leak1Grad.addColorStop(0, rgba(goldRgb, alphaGold));
    leak1Grad.addColorStop(0.5, rgba(emberRgb, alphaGold * 0.4));
    leak1Grad.addColorStop(1, rgba(goldRgb, 0));

    ctx.fillStyle = leak1Grad;
    ctx.beginPath();
    ctx.arc(0, 0, leak1Radius, 0, Math.PI * 2);
    ctx.fill();

    // Bottom-right leak (Ember)
    const flicker2 = Math.cos(time * 2.2) * 0.14;
    const leak2Radius = Math.min(width, height) * (0.5 + flicker2 * 0.2);
    const leak2Grad = ctx.createRadialGradient(width, height, 0, width, height, leak2Radius);
    const alphaEmber = (isDark ? 0.15 : 0.1) * (1 + flicker2 * 0.35);
    leak2Grad.addColorStop(0, rgba(emberRgb, alphaEmber));
    leak2Grad.addColorStop(0.6, rgba(goldRgb, alphaEmber * 0.35));
    leak2Grad.addColorStop(1, rgba(emberRgb, 0));

    ctx.fillStyle = leak2Grad;
    ctx.beginPath();
    ctx.arc(width, height, leak2Radius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Faint 35mm film perforation sprocket strip along left and right edges
    const perfWidth = 14;
    const perfHeight = 20;
    const perfSpacing = 36;
    const margin = 16;
    const perfAlpha = isDark ? 0.08 : 0.06;

    ctx.strokeStyle = rgba(goldRgb, perfAlpha);
    ctx.lineWidth = 1;

    // Left perforation column
    for (let y = -perfSpacing + this.perfOffset; y < height + perfSpacing; y += perfSpacing) {
      this.drawRoundedRect(ctx, margin, y, perfWidth, perfHeight, 3);
      ctx.stroke();
    }

    // Right perforation column
    for (let y = -perfSpacing + this.perfOffset; y < height + perfSpacing; y += perfSpacing) {
      this.drawRoundedRect(ctx, width - margin - perfWidth, y, perfWidth, perfHeight, 3);
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  public drawStatic(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { theme, accentColours } = state;

    ctx.save();
    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    const emberRgb = isDark ? accentColours.emberRgb : accentColours.emberTextSafeRgb;

    const grad = ctx.createRadialGradient(
      width,
      height,
      0,
      width,
      height,
      Math.min(width, height) * 0.5
    );
    grad.addColorStop(0, rgba(emberRgb, 0.12));
    grad.addColorStop(1, rgba(emberRgb, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }

  public dispose(): void {}
}
