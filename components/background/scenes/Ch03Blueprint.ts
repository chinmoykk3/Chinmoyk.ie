import { Scene, SceneSize, SceneState } from '../types';
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

export class Ch03BlueprintScene implements Scene {
  public id = 'ch03' as const;
  public title = 'Chapter 03: Blueprint';

  private cellSize = 54;
  private packets: DataPacket[] = [];
  private maxPackets = 18;

  public init(ctx: CanvasRenderingContext2D, size: SceneSize): void {
    this.resize(size);
  }

  public resize(size: SceneSize): void {
    const isMobile = size.width < 768;
    this.cellSize = isMobile ? 44 : 54;
    this.maxPackets = isMobile ? 8 : 18;

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
        speed: 0.6 + Math.random() * 0.8,
        axis,
        direction: dir,
        length: 12 + Math.random() * 16,
        alpha: 0.4 + Math.random() * 0.45,
      });
    }
  }

  public update(dt: number, state: SceneState): void {
    const cols = Math.ceil(state.size.width / this.cellSize) + 1;
    const rows = Math.ceil(state.size.height / this.cellSize) + 1;
    const activeCount = Math.floor(this.maxPackets * (state.qualityLevel < 0.5 ? 0.5 : 1));

    for (let i = 0; i < activeCount; i++) {
      const p = this.packets[i];
      p.progress += p.speed * dt;

      if (p.progress >= 1) {
        p.progress = 0;
        p.gridX = p.targetX;
        p.gridY = p.targetY;

        // Choose next step: 60% continue straight, 40% turn 90 degrees
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
  }

  public draw(ctx: CanvasRenderingContext2D, state: SceneState): void {
    const { width, height } = state.size;
    const { pointer, theme, accentColours } = state;
    const activeCount = Math.floor(this.maxPackets * (state.qualityLevel < 0.5 ? 0.5 : 1));

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

    // 1. Draw architectural grid lines
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = rgba(accentColours.azureRgb, theme === 'dark' ? 0.07 : 0.05);

    ctx.beginPath();
    for (let x = 0; x <= width + this.cellSize; x += this.cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height + this.cellSize; y += this.cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 2. Draw subtle grid intersections (cross ticks)
    ctx.fillStyle = rgba(accentColours.azureRgb, theme === 'dark' ? 0.15 : 0.1);
    for (let x = 0; x <= width + this.cellSize; x += this.cellSize * 2) {
      for (let y = 0; y <= height + this.cellSize; y += this.cellSize * 2) {
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    }

    // 3. Draw travelling circuit packets
    for (let i = 0; i < activeCount; i++) {
      const p = this.packets[i];
      const startX = p.gridX * this.cellSize;
      const startY = p.gridY * this.cellSize;
      const targetX = p.targetX * this.cellSize;
      const targetY = p.targetY * this.cellSize;

      const currX = startX + (targetX - startX) * p.progress;
      const currY = startY + (targetY - startY) * p.progress;

      ctx.save();
      ctx.strokeStyle = rgba(accentColours.azureRgb, p.alpha * (theme === 'dark' ? 0.6 : 0.4));
      ctx.lineWidth = 1.8;

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

      // Glowing head
      ctx.fillStyle = rgba(accentColours.azureRgb, p.alpha * (theme === 'dark' ? 0.85 : 0.65));
      ctx.beginPath();
      ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
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

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = rgba(accentColours.azureRgb, 0.05);
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
    this.packets = [];
  }
}
