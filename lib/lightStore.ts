/**
 * Shared Light Store for Chapter 01 "The Lamp"
 * 
 * The single source of truth for the movable light cone.
 * Read by <DarknessVeil> for the SVG overlay mask and by <Ch01DustInTheLightScene>
 * for the canvas dust motes that only appear within the light.
 */

export interface LightState {
  x: number; // Viewport pixel X
  y: number; // Viewport pixel Y
  radius: number; // Spotlight radius in pixels
  intensity: number; // 0.0 (dark) to 1.0 (full brightness)
  gold: boolean; // True when lamp is ignited (warm gold flood)
  veilDarkness: number; // Darkness factor: 0.94 initially, dropping to ~0.35 upon ignition
}

let currentLightState: LightState = {
  x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
  y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 300,
  radius: 180,
  intensity: 1.0,
  gold: false,
  veilDarkness: 0.94,
};

type LightListener = (state: LightState) => void;
const listeners = new Set<LightListener>();

export const lightStore = {
  getState(): LightState {
    return currentLightState;
  },

  setState(partial: Partial<LightState>) {
    currentLightState = { ...currentLightState, ...partial };
    listeners.forEach((fn) => fn(currentLightState));
  },

  subscribe(listener: LightListener): () => void {
    listeners.add(listener);
    listener(currentLightState);
    return () => {
      listeners.delete(listener);
    };
  },
};
