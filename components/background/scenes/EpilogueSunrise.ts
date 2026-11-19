import { Scene, SceneSize, SceneState } from '../types';
import { rgba } from '../tokens';

interface DawnStar {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinklePhase: number;
}

export class EpilogueSunriseScene implements Scene {
  public id = 'epilogue' as const;
  public title = 'Epilogue: Sunrise';

  private stars: DawnStar[] = [];
  private maxStars = 32;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxStars = isMobile ? 16 : 32;

    this.stars = [];
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        x: Math.random() * size.width,
        y: Math.random() * (size.height * 0.55), // Top half sky only
        radius: 0.8 + Math.random() * 1.4,
        baseAlpha: 0.15 + Math.random() * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  public update(dt: number, state: SceneState): void {}

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, time, chapterProgress } = state;

    ctx.save();

    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 6, pointer.y * 6);
    }

    // Sunrise dawn height: rises from bottom as chapterProgress evolves
    const sunriseHeight = height * (0.65 + Math.min(1, chapterProgress) * 0.25);
    const horizonY = height - sunriseHeight;

    // 1. Horizon multi-spectrum ramp: azure -> iris -> rose -> ember -> gold
    const sunriseGrad = ctx.createLinearGradient(0, height, 0, horizonY);
    const alphaScale = theme === 'dark' ? 0.22 : 0.14;

    sunriseGrad.addColorStop(0, rgba(accentColours.bgRgb, 0));
    sunriseGrad.addColorStop(0.12, rgba(accentColours.azureRgb, alphaScale * 0.45));
    sunriseGrad.addColorStop(0.3, rgba(accentColours.irisRgb, alphaScale * 0.65));
    sunriseGrad.addColorStop(0.52, rgba(accentColours.roseRgb, alphaScale * 0.85));
    sunriseGrad.addColorStop(0.76, rgba(accentColours.emberRgb, alphaScale * 1.0));
    sunriseGrad.addColorStop(0.95, rgba(accentColours.goldRgb, alphaScale * 1.15));
    sunriseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = sunriseGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // 2. Soft sweeping dawn volumetric radial fan rays
    const sunCenterX = width * 0.5 + Math.sin(time * 0.15) * (width * 0.15);
    const sunCenterY = height * 1.05;
    const rayCount = 5;

    for (let i = 0; i < rayCount; i++) {
      const angle =
        -Math.PI * 0.5 + (i - (rayCount - 1) / 2) * 0.24 + Math.sin(time * 0.2 + i) * 0.05;
      const rayLength = height * 1.1;

      const endX1 = sunCenterX + Math.cos(angle - 0.06) * rayLength;
      const endY1 = sunCenterY + Math.sin(angle - 0.06) * rayLength;
      const endX2 = sunCenterX + Math.cos(angle + 0.06) * rayLength;
      const endY2 = sunCenterY + Math.sin(angle + 0.06) * rayLength;

      const rayGrad = ctx.createLinearGradient(
        sunCenterX,
        sunCenterY,
        (endX1 + endX2) / 2,
        (endY1 + endY2) / 2
      );
      const rayAlpha = (theme === 'dark' ? 0.045 : 0.03) * (0.8 + Math.sin(time * 0.4 + i) * 0.2);
      rayGrad.addColorStop(0, rgba(accentColours.goldRgb, rayAlpha));
      rayGrad.addColorStop(0.6, rgba(accentColours.emberRgb, rayAlpha * 0.4));
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(sunCenterX, sunCenterY);
      ctx.lineTo(endX1, endY1);
      ctx.lineTo(endX2, endY2);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Faint dawn stars (fade out as golden horizon advances)
    const starFade = Math.max(0, 1 - chapterProgress * 0.7);
    if (starFade > 0.05) {
      for (const s of this.stars) {
        const twinkle = 0.7 + Math.sin(time * 2 + s.twinklePhase) * 0.3;
        const starAlpha = s.baseAlpha * starFade * twinkle * (theme === 'dark' ? 1.0 : 0.5);

        ctx.fillStyle = rgba(accentColours.goldRgb, starAlpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
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

    const sunriseGrad = ctx.createLinearGradient(0, height, 0, height * 0.3);
    sunriseGrad.addColorStop(0, rgba(accentColours.azureRgb, 0.08));
    sunriseGrad.addColorStop(0.4, rgba(accentColours.roseRgb, 0.12));
    sunriseGrad.addColorStop(0.8, rgba(accentColours.goldRgb, 0.15));
    sunriseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = sunriseGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.stars = [];
  }
}
