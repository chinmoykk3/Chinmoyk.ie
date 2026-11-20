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

    // Parallax response
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 6, pointer.y * 6);
    }

    // Sunrise dawn height: rises from bottom as chapterProgress evolves
    const sunriseHeight = height * (0.65 + Math.min(1, chapterProgress) * 0.28);
    const horizonY = Math.max(0, height - sunriseHeight);

    // 1. In dark mode, ensure pure black bottom edge anchor (#000000)
    if (theme === 'dark') {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const blackAnchor = ctx.createLinearGradient(0, height - 120, 0, height);
      blackAnchor.addColorStop(0, 'rgba(0, 0, 0, 0)');
      blackAnchor.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = blackAnchor;
      ctx.fillRect(0, height - 120, width, 120);
      ctx.restore();
    }

    // 2. Multi-spectrum sunrise gradient rising from bottom:
    // azure -> iris -> rose -> ember -> gold (strictly avoiding navy/indigo)
    if (theme === 'dark') {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'multiply';
    }

    const sunriseGrad = ctx.createLinearGradient(0, height, 0, horizonY);
    const alphaScale = theme === 'dark' ? 0.26 : 0.15;

    // Rising stops: pure black base -> azure -> iris -> rose -> ember -> gold
    sunriseGrad.addColorStop(0, rgba(accentColours.bgRgb, 0));
    sunriseGrad.addColorStop(0.12, rgba(accentColours.azureRgb, alphaScale * 0.45));
    sunriseGrad.addColorStop(0.32, rgba(accentColours.irisRgb, alphaScale * 0.65));
    sunriseGrad.addColorStop(0.54, rgba(accentColours.roseRgb, alphaScale * 0.85));
    sunriseGrad.addColorStop(0.76, rgba(accentColours.emberRgb, alphaScale * 1.05));
    sunriseGrad.addColorStop(0.95, rgba(accentColours.goldRgb, alphaScale * 1.25));
    sunriseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = sunriseGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // 3. Volumetric radial fan rays slowly fanning from rising sun horizon
    const sunCenterX = width * 0.5 + Math.sin(time * 0.12) * (width * 0.12);
    const sunCenterY = height * 1.04;
    const rayCount = 6;

    for (let i = 0; i < rayCount; i++) {
      const angle =
        -Math.PI * 0.5 + (i - (rayCount - 1) / 2) * 0.22 + Math.sin(time * 0.15 + i) * 0.04;
      const rayLength = height * 1.15;

      const endX1 = sunCenterX + Math.cos(angle - 0.05) * rayLength;
      const endY1 = sunCenterY + Math.sin(angle - 0.05) * rayLength;
      const endX2 = sunCenterX + Math.cos(angle + 0.05) * rayLength;
      const endY2 = sunCenterY + Math.sin(angle + 0.05) * rayLength;

      const rayGrad = ctx.createLinearGradient(
        sunCenterX,
        sunCenterY,
        (endX1 + endX2) / 2,
        (endY1 + endY2) / 2
      );
      const rayAlpha =
        (theme === 'dark' ? 0.042 : 0.028) * (0.8 + Math.sin(time * 0.35 + i) * 0.2);
      rayGrad.addColorStop(0, rgba(accentColours.goldRgb, rayAlpha * 1.2));
      rayGrad.addColorStop(0.5, rgba(accentColours.emberRgb, rayAlpha * 0.5));
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(sunCenterX, sunCenterY);
      ctx.lineTo(endX1, endY1);
      ctx.lineTo(endX2, endY2);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Faint dawn stars (fade out as golden horizon advances)
    const starFade = Math.max(0, 1 - chapterProgress * 0.8);
    if (starFade > 0.04) {
      for (const s of this.stars) {
        const twinkle = 0.7 + Math.sin(time * 2 + s.twinklePhase) * 0.3;
        const starAlpha = s.baseAlpha * starFade * twinkle * (theme === 'dark' ? 0.95 : 0.45);

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

    const sunriseGrad = ctx.createLinearGradient(0, height, 0, height * 0.25);
    sunriseGrad.addColorStop(0, rgba(accentColours.bgRgb, 0));
    sunriseGrad.addColorStop(0.15, rgba(accentColours.azureRgb, 0.08));
    sunriseGrad.addColorStop(0.35, rgba(accentColours.irisRgb, 0.1));
    sunriseGrad.addColorStop(0.55, rgba(accentColours.roseRgb, 0.12));
    sunriseGrad.addColorStop(0.75, rgba(accentColours.emberRgb, 0.14));
    sunriseGrad.addColorStop(0.95, rgba(accentColours.goldRgb, 0.16));
    sunriseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = sunriseGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  public dispose(): void {
    this.stars = [];
  }
}
