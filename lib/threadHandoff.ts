/**
 * Thread Handoff Coordinates (normalized 0.0 to 1.0)
 * 
 * Exports the precise normalized coordinates where Chapter 01's lamp beam exits
 * the viewport, ensuring Chapter 02's prism receives the continuous thread
 * at the exact corresponding spatial location.
 */
export interface ThreadHandoffPoint {
  x: number; // Viewport-normalized X (0.0 = left, 0.5 = center, 1.0 = right)
  y: number; // Viewport-normalized Y (0.0 = top, 1.0 = bottom edge)
}

export const threadHandoff: ThreadHandoffPoint = {
  x: 0.5, // Dead center (matching Chapter 02's top center entry)
  y: 1.0, // Bottom edge of Chapter 01 viewport
};
