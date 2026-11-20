import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';

interface BeamMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  beamIndex: number; // 0: azure, 1: iris, 2: rose, 3: ember
}

/**
 * Chapter 02: "Light in the Beams" Canvas Scene
 * Drifting light motes that take the colour of the nearest beam and drift
 * along its direction, turning gold during convergence.
 * Opacity <= 35% behind text.
 * Max 120 motes on desktop, 50 on mobile.
 */
export class Ch02LightInTheBeamsScene implements Scene {
  public id = 'ch02' as const;
  public title = 'Chapter 02: Light in the Beams';

  private motes: BeamMote[] = [];
  private maxMotes = 110;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxMotes = isMobile ? 48 : 110;
    this.motes = [];

    // 4 beam angle trajectories (azure left, iris mid-left, rose mid-right, ember right)
    const angles = [-0.65, -0.25, 0.25, 0.65]; // radians from vertical downwards

    for (let i = 0; i < this.maxMotes; i++) {
      const beamIdx = i % 4;
      const angle = angles[beamIdx] + (Math.random() - 0.5) * 0.2;
      const speed = 18 + Math.random() * 26;

      this.motes.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: Math.sin(angle) * speed,
        vy: Math.cos(angle) * speed,
        radius: 1.0 + Math.random() * 2.0,
        alpha: 0.12 + Math.random() * 0.22, // Keep strictly <= 0.35
        beamIndex: beamIdx,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.5 ? 0.5 : 1));

    // Slow down or turn inward during convergence
    const conv = Math.max(0, Math.min(1, (state.chapterProgress - 0.65) / 0.25));

    for (let i = 0; i < activeCount; i++) {
      const mote = this.motes[i];
      mote.x += mote.vx * dt;
      mote.y += mote.vy * dt;

      // Wrap around canvas edges
      if (mote.x < -20) mote.x = w + 20;
      if (mote.x > w + 20) mote.x = -20;
      if (mote.y < -20) mote.y = -5;
      if (mote.y > h + 20) mote.y = -5;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, chapterProgress } = state;
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.9 ? 0.5 : 1));

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

    // Colors
    const isDark = theme === 'dark';
    const azure = isDark ? accentColours.azureRgb : accentColours.azureTextSafeRgb;
    const iris = isDark ? accentColours.irisRgb : accentColours.irisTextSafeRgb;
    const rose = isDark ? accentColours.roseRgb : accentColours.roseTextSafeRgb;
    const ember = isDark ? accentColours.emberRgb : accentColours.emberTextSafeRgb;
    const gold = isDark ? accentColours.goldRgb : accentColours.goldTextSafeRgb;

    const beamColors = [azure, iris, rose, ember];

    // Convergence ratio: 0.80 to 0.95 turns all motes into gold
    const goldRatio = Math.max(0, Math.min(1, (chapterProgress - 0.80) / 0.15));

    for (let i = 0; i < activeCount; i++) {
      const mote = this.motes[i];
      const baseColor = beamColors[mote.beamIndex];

      // Interpolate color to gold during convergence
      const r = Math.round(baseColor.r + (gold.r - baseColor.r) * goldRatio);
      const g = Math.round(baseColor.g + (gold.g - baseColor.g) * goldRatio);
      const b = Math.round(baseColor.b + (gold.b - baseColor.b) * goldRatio);
      const moteColor: RgbTuple = { r, g, b };

      // Ensure max alpha <= 0.35
      const renderAlpha = Math.min(0.35, mote.alpha * (theme === 'dark' ? 1.0 : 0.85));

      ctx.fillStyle = rgba(moteColor, renderAlpha);
      ctx.beginPath();
      ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  public dispose(): void {
    this.motes = [];
  }
}
