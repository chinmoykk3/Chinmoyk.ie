import { Scene, SceneSize, SceneState, RgbTuple } from '../types';
import { rgba } from '../tokens';

interface DataPacket {
  gridX: number;
  gridY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  axis: 'x' | 'y';
  direction: 1 | -1;
  length: number;
  alpha: number;
}

interface BlueprintPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export class Ch03BlueprintScene implements Scene {
  public id = 'ch03' as const;
  public title = 'Chapter 03: Blueprint';

  private cellSize = 54;
  private packets: DataPacket[] = [];
  private maxPackets = 20;
  private pulses: BlueprintPulse[] = [];
  private lastActiveProject = -1;
  private lastWidth = 0;
  private lastHeight = 0;

  private onProjectChange = (e: Event) => {
    const custom = e as CustomEvent<{ index?: number }>;
    const idx = custom.detail?.index ?? 0;
    this.spawnPulse(idx);
  };

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
    if (typeof window !== 'undefined') {
      window.addEventListener('story:project-change', this.onProjectChange);
    }
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.cellSize = isMobile ? 42 : 54;
    this.maxPackets = isMobile ? 10 : 20;
    this.lastWidth = size.width;
    this.lastHeight = size.height;

    const cols = Math.ceil(size.width / this.cellSize) + 1;
    const rows = Math.ceil(size.height / this.cellSize) + 1;

    this.packets = [];
    for (let i = 0; i < this.maxPackets; i++) {
      const gx = Math.floor(Math.random() * cols);
      const gy = Math.floor(Math.random() * rows);
      const axis = Math.random() > 0.5 ? 'x' : 'y';
      const dir = Math.random() > 0.5 ? 1 : -1;

      this.packets.push({
        gridX: gx,
        gridY: gy,
        targetX: axis === 'x' ? gx + dir : gx,
        targetY: axis === 'y' ? gy + dir : gy,
        progress: Math.random(),
        speed: 0.5 + Math.random() * 0.7,
        axis,
        direction: dir,
        length: 14 + Math.random() * 18,
        alpha: 0.35 + Math.random() * 0.45,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const cols = Math.ceil(state.size.width / this.cellSize) + 1;
    const rows = Math.ceil(state.size.height / this.cellSize) + 1;
    const activeCount = Math.floor(this.maxPackets * (state.qualityLevel < 0.5 ? 0.5 : 1));

    // Project quadrant tracking: 4 projects mapped across chapter progress
    const currentProject = Math.min(3, Math.max(0, Math.floor(state.chapterProgress * 4)));
    if (this.lastActiveProject !== -1 && currentProject !== this.lastActiveProject) {
      this.spawnPulse(currentProject);
    }
    this.lastActiveProject = currentProject;

    // Update travelling packets along the circuit
    for (let i = 0; i < activeCount; i++) {
      const p = this.packets[i];
      p.progress += p.speed * dt;

      if (p.progress >= 1) {
        p.progress = 0;
        p.gridX = p.targetX;
        p.gridY = p.targetY;

        // 60% continue straight, 40% turn 90 degrees at grid intersections
        if (Math.random() < 0.4) {
          p.axis = p.axis === 'x' ? 'y' : 'x';
          p.direction = Math.random() > 0.5 ? 1 : -1;
        }

        p.targetX = p.axis === 'x' ? p.gridX + p.direction : p.gridX;
        p.targetY = p.axis === 'y' ? p.gridY + p.direction : p.gridY;

        // Wrap around grid boundaries
        if (p.targetX < 0) {
          p.gridX = cols;
          p.targetX = cols - 1;
        } else if (p.targetX > cols) {
          p.gridX = 0;
          p.targetX = 1;
        }
        if (p.targetY < 0) {
          p.gridY = rows;
          p.targetY = rows - 1;
        } else if (p.targetY > rows) {
          p.gridY = 0;
          p.targetY = 1;
        }
      }
    }

    // Update pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.radius += pulse.speed * dt;
      pulse.alpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);
      if (pulse.radius >= pulse.maxRadius || pulse.alpha <= 0.01) {
        this.pulses.splice(i, 1);
      }
    }
  }

  private spawnPulse(projectIndex: number): void {
    const width = this.lastWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    const height = this.lastHeight || (typeof window !== 'undefined' ? window.innerHeight : 800);

    // Anchor the pulse position according to the active project in the viewport
    const xPositions = [width * 0.25, width * 0.45, width * 0.65, width * 0.85];
    const originX = xPositions[projectIndex % 4] ?? width * 0.5;
    const originY = height * 0.5;

    this.pulses.push({
      x: originX,
      y: originY,
      radius: 10,
      maxRadius: Math.max(width, height) * 0.85,
      alpha: 0.8,
      speed: 480,
    });
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours, chapterProgress } = state;
    const activeCount = Math.floor(this.maxPackets * (state.qualityLevel < 0.5 ? 0.5 : 1));

    ctx.save();

    const isDark = theme === 'dark';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'multiply';

    // Text-safe azure for daylight light mode, luminous azure for noir dark mode
    const azureRgb: RgbTuple = isDark ? accentColours.azureRgb : accentColours.azureTextSafeRgb;

    // Parallax
    if (!pointer.isTouch) {
      ctx.translate(pointer.x * 6, pointer.y * 6);
    }

    // 1. Azure grid drawing in: grid lines draw across proportional to chapter progress
    // Ensure at least a base architectural grid is present (min 0.35 reveal)
    const drawFraction = Math.min(1, Math.max(0.35, chapterProgress * 1.8));

    ctx.lineWidth = isDark ? 0.65 : 0.75;
    ctx.strokeStyle = rgba(azureRgb, (isDark ? 0.09 : 0.07) * drawFraction);

    ctx.beginPath();
    // Vertical grid lines
    const maxLinesX = Math.ceil(width / this.cellSize) + 1;
    for (let i = 0; i <= maxLinesX; i++) {
      const x = i * this.cellSize;
      const lineLen = height * drawFraction;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, lineLen);
    }
    // Horizontal grid lines
    const maxLinesY = Math.ceil(height / this.cellSize) + 1;
    for (let j = 0; j <= maxLinesY; j++) {
      const y = j * this.cellSize;
      const lineLen = width * drawFraction;
      ctx.moveTo(0, y);
      ctx.lineTo(lineLen, y);
    }
    ctx.stroke();

    // 2. Grid intersection coordinate ticks
    ctx.fillStyle = rgba(azureRgb, (isDark ? 0.18 : 0.12) * drawFraction);
    for (let x = 0; x <= width * drawFraction; x += this.cellSize * 2) {
      for (let y = 0; y <= height * drawFraction; y += this.cellSize * 2) {
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    }

    // 3. Active project pulse waves expanding across the blueprint grid
    for (let i = 0; i < this.pulses.length; i++) {
      const p = this.pulses[i];
      if (p.alpha <= 0.01) continue;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(azureRgb, p.alpha * (isDark ? 0.45 : 0.35));
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Soft ambient wavefront fill
      const grad = ctx.createRadialGradient(p.x, p.y, Math.max(0, p.radius - 40), p.x, p.y, p.radius);
      grad.addColorStop(0, rgba(azureRgb, 0));
      grad.addColorStop(1, rgba(azureRgb, p.alpha * (isDark ? 0.12 : 0.08)));
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    }

    // 4. Data packets travelling along the active grid lines
    for (let i = 0; i < activeCount; i++) {
      const p = this.packets[i];
      const startX = p.gridX * this.cellSize;
      const startY = p.gridY * this.cellSize;
      const targetX = p.targetX * this.cellSize;
      const targetY = p.targetY * this.cellSize;

      const currX = startX + (targetX - startX) * p.progress;
      const currY = startY + (targetY - startY) * p.progress;

      // Only draw if within currently revealed blueprint region
      if (currX > width * drawFraction && currY > height * drawFraction) continue;

      ctx.save();
      ctx.strokeStyle = rgba(azureRgb, p.alpha * (isDark ? 0.65 : 0.45));
      ctx.lineWidth = isDark ? 1.8 : 2.0;

      ctx.beginPath();
      if (p.axis === 'x') {
        const tailX = currX - p.direction * p.length;
        ctx.moveTo(tailX, currY);
        ctx.lineTo(currX, currY);
      } else {
        const tailY = currY - p.direction * p.length;
        ctx.moveTo(currX, tailY);
        ctx.lineTo(currX, currY);
      }
      ctx.stroke();

      // Glowing head of packet
      ctx.fillStyle = rgba(azureRgb, p.alpha * (isDark ? 0.9 : 0.7));
      ctx.beginPath();
      ctx.arc(currX, currY, isDark ? 1.8 : 2.2, 0, Math.PI * 2);
      ctx.fill();

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

    const azureRgb: RgbTuple = isDark ? accentColours.azureRgb : accentColours.azureTextSafeRgb;

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = rgba(azureRgb, isDark ? 0.06 : 0.04);
    ctx.beginPath();
    for (let x = 0; x <= width; x += this.cellSize * 2) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += this.cellSize * 2) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  public dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('story:project-change', this.onProjectChange);
    }
    this.packets = [];
    this.pulses = [];
  }
}
