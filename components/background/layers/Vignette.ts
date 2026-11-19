import { SceneSize, SceneState } from '../types';

export class VignetteLayer {
  private gradientDark: CanvasGradient | null = null;
  private gradientLight: CanvasGradient | null = null;
  private lastWidth = 0;
  private lastHeight = 0;

  public resize(size: SceneSize, ctx: CanvasRenderingContext2D): void {
    if (size.width === this.lastWidth && size.height === this.lastHeight) return;

    this.lastWidth = size.width;
    this.lastHeight = size.height;

    const cx = size.width / 2;
    const cy = size.height / 2;
    const innerRadius = Math.min(size.width, size.height) * 0.35;
    const outerRadius = Math.max(size.width, size.height) * 0.75;

    // Dark mode vignette: pure neutral black edges
    this.gradientDark = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, outerRadius);
    this.gradientDark.addColorStop(0, 'rgba(0, 0, 0, 0)');
    this.gradientDark.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
    this.gradientDark.addColorStop(1, 'rgba(0, 0, 0, 0.65)');

    // Light mode vignette: delicate warm neutral border shading
    this.gradientLight = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, outerRadius);
    this.gradientLight.addColorStop(0, 'rgba(18, 17, 16, 0)');
    this.gradientLight.addColorStop(0.7, 'rgba(18, 17, 16, 0.08)');
    this.gradientLight.addColorStop(1, 'rgba(18, 17, 16, 0.22)');
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const gradient = state.theme === 'dark' ? this.gradientDark : this.gradientLight;
    if (!gradient) return;

    ctx.save();
    ctx.globalCompositeOperation = state.theme === 'dark' ? 'source-over' : 'multiply';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.size.width, state.size.height);
    ctx.restore();
  }

  public dispose(): void {
    this.gradientDark = null;
    this.gradientLight = null;
  }
}
