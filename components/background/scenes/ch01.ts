import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';
import { lightStore } from '@/lib/lightStore';

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

/**
 * Chapter 01: "Dust in the Light" Canvas Scene
 * Motes are visible ONLY inside the interactive light cone (reading lightStore).
 * After lamp ignition, motes turn warm gold and gently drift upward.
 * Opacity <= 35% behind text.
 * Max 110 motes on desktop, 45 on mobile.
 */
export class Ch01DustInTheLightScene implements Scene {
  public id = 'ch01' as const;
  public title = 'Chapter 01: Dust in the Light';

  private motes: DustMote[] = [];
  private maxMotes = 110;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.maxMotes = isMobile ? 45 : 110;
    this.motes = [];

    for (let i = 0; i < this.maxMotes; i++) {
      this.motes.push({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        radius: 1.0 + Math.random() * 1.8,
        alpha: 0.15 + Math.random() * 0.20, // Keep strictly <= 0.35
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const w = state.size.width;
    const h = state.size.height;
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.5 ? 0.5 : 1));
    const light = lightStore.getState();

    // After ignition, dust motes drift upward
    const upwardDraft = light.gold ? -22 : 0;

    for (let i = 0; i < activeCount; i++) {
      const m = this.motes[i];
      m.x += m.vx * dt;
      m.y += (m.vy + upwardDraft) * dt;

      // Wrap boundaries
      if (m.x < -10) m.x = w + 10;
      if (m.x > w + 10) m.x = -10;
      if (m.y < -10) m.y = h + 10;
      if (m.y > h + 10) m.y = -10;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { pointer, theme, accentColours } = state;
    const activeCount = Math.floor(this.maxMotes * (state.qualityLevel < 0.9 ? 0.5 : 1));
    const light = lightStore.getState();

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

    const goldColor = theme === 'dark' ? accentColours.goldRgb : accentColours.goldTextSafeRgb;
    const neutralLightColor: RgbTuple = theme === 'dark' ? { r: 245, g: 245, b: 245 } : { r: 40, g: 38, b: 50 };
    const moteColor = light.gold ? goldColor : neutralLightColor;

    const lx = light.x;
    const ly = light.y;
    const lrSq = light.radius * light.radius;

    for (let i = 0; i < activeCount; i++) {
      const m = this.motes[i];

      // Distance from mote to light center
      const dx = m.x - lx;
      const dy = m.y - ly;
      const distSq = dx * dx + dy * dy;

      // If lamp is ignited, whole room receives ambient light; otherwise motes visible only inside light cone
      let coneVisibility = 0;
      if (light.gold) {
        coneVisibility = 0.85;
      } else if (distSq < lrSq) {
        // Soft falloff from center to edge of cone
        const dist = Math.sqrt(distSq);
        coneVisibility = Math.max(0, 1 - dist / light.radius);
      }

      if (coneVisibility > 0) {
        const renderAlpha = Math.min(0.35, m.alpha * coneVisibility * light.intensity);
        ctx.fillStyle = rgba(moteColor, renderAlpha);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  public dispose(): void {
    this.motes = [];
  }
}
