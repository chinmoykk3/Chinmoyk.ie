import { SceneSize, SceneState } from '../types';

export class GrainLayer {
  private patternCanvas: HTMLCanvasElement | null = null;
  private pattern: CanvasPattern | null = null;
  private shiftX = 0;
  private shiftY = 0;
  private lastShiftTime = 0;

  constructor() {
    this.createNoisePattern();
  }

  private createNoisePattern(): void {
    if (typeof document === 'undefined') return;

    const size = 128;
    this.patternCanvas = document.createElement('canvas');
    this.patternCanvas.width = size;
    this.patternCanvas.height = size;
    const ctx = this.patternCanvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // Generate balanced monochrome noise
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val; // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 48; // Subtle alpha
    }

    ctx.putImageData(imgData, 0, 0);
  }

  public resize(size: SceneSize, ctx: CanvasRenderingContext2D): void {
    if (this.patternCanvas && !this.pattern) {
      this.pattern = ctx.createPattern(this.patternCanvas, 'repeat');
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    // If quality level is degraded or reduced motion is on, skip grain for performance
    if (state.qualityLevel < 0.5 || state.reducedMotion) return;

    if (!this.pattern && this.patternCanvas) {
      this.pattern = ctx.createPattern(this.patternCanvas, 'repeat');
    }
    if (!this.pattern) return;

    // Shift noise offset every ~80ms for organic 35mm film flutter
    if (state.time - this.lastShiftTime > 0.08) {
      this.shiftX = (this.shiftX + 37) % 128;
      this.shiftY = (this.shiftY + 59) % 128;
      this.lastShiftTime = state.time;
    }

    ctx.save();
    ctx.translate(this.shiftX, this.shiftY);

    if (state.theme === 'dark') {
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.035;
    } else {
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.025;
    }

    ctx.fillStyle = this.pattern;
    ctx.fillRect(
      -this.shiftX,
      -this.shiftY,
      state.size.width + 128,
      state.size.height + 128
    );
    ctx.restore();
  }

  public dispose(): void {
    this.pattern = null;
    this.patternCanvas = null;
  }
}
