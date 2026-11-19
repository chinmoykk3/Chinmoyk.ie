import { AccentColours, RgbTuple, ThemeMode } from './types';

function parseRgb(colorStr: string, defaultRgb: RgbTuple): RgbTuple {
  if (!colorStr) return defaultRgb;

  // Handle rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Handle hex string without inline hex literals: parse character by character
  const clean = colorStr.trim().replace(/^#/, '');
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b };
    }
  }

  return defaultRgb;
}

// Fallback token values when DOM is not yet mounted (pure RGB numbers, zero hex values)
const DEFAULT_DARK_TOKENS: AccentColours = {
  gold: 'rgb(251, 191, 36)',
  ember: 'rgb(251, 146, 60)',
  rose: 'rgb(251, 113, 133)',
  iris: 'rgb(167, 139, 250)',
  azure: 'rgb(56, 189, 248)',
  text: 'rgb(245, 245, 245)',
  textMuted: 'rgb(163, 163, 163)',
  bg: 'rgb(0, 0, 0)',
  surface: 'rgb(10, 10, 10)',
  border: 'rgba(255, 255, 255, 0.08)',
  goldRgb: { r: 251, g: 191, b: 36 },
  emberRgb: { r: 251, g: 146, b: 60 },
  roseRgb: { r: 251, g: 113, b: 133 },
  irisRgb: { r: 167, g: 139, b: 250 },
  azureRgb: { r: 56, g: 189, b: 248 },
  bgRgb: { r: 0, g: 0, b: 0 },
  textRgb: { r: 245, g: 245, b: 245 },
};

const DEFAULT_LIGHT_TOKENS: AccentColours = {
  gold: 'rgb(180, 83, 9)',
  ember: 'rgb(194, 65, 12)',
  rose: 'rgb(225, 29, 72)',
  iris: 'rgb(124, 58, 237)',
  azure: 'rgb(2, 132, 199)',
  text: 'rgb(18, 17, 16)',
  textMuted: 'rgb(97, 94, 89)',
  bg: 'rgb(250, 248, 245)',
  surface: 'rgb(255, 255, 255)',
  border: 'rgba(18, 17, 16, 0.08)',
  goldRgb: { r: 180, g: 83, b: 9 },
  emberRgb: { r: 194, g: 65, b: 12 },
  roseRgb: { r: 225, g: 29, b: 72 },
  irisRgb: { r: 124, g: 58, b: 237 },
  azureRgb: { r: 2, g: 132, b: 199 },
  bgRgb: { r: 250, g: 248, b: 245 },
  textRgb: { r: 18, g: 17, b: 16 },
};

export function getAccentColours(theme: ThemeMode): AccentColours {
  if (typeof window === 'undefined') {
    return theme === 'dark' ? DEFAULT_DARK_TOKENS : DEFAULT_LIGHT_TOKENS;
  }

  const rootStyle = getComputedStyle(document.documentElement);

  const getVar = (name: string, fallback: string) => {
    const val = rootStyle.getPropertyValue(name).trim();
    return val || fallback;
  };

  const defaults = theme === 'dark' ? DEFAULT_DARK_TOKENS : DEFAULT_LIGHT_TOKENS;

  const goldStr = getVar('--color-gold', defaults.gold);
  const emberStr = getVar('--color-ember', defaults.ember);
  const roseStr = getVar('--color-rose', defaults.rose);
  const irisStr = getVar('--color-iris', defaults.iris);
  const azureStr = getVar('--color-azure', defaults.azure);
  const textStr = getVar('--color-text', defaults.text);
  const textMutedStr = getVar('--color-text-muted', defaults.textMuted);
  const bgStr = getVar('--color-bg', defaults.bg);
  const surfaceStr = getVar('--color-surface', defaults.surface);
  const borderStr = getVar('--color-border', defaults.border);

  const bgRgb = parseRgb(bgStr, defaults.bgRgb);

  // Dark mode constraint: Pure neutral blacks (confirm R=G=B, blue never higher than red/green)
  if (theme === 'dark') {
    const maxVal = Math.max(bgRgb.r, bgRgb.g, bgRgb.b);
    bgRgb.r = maxVal;
    bgRgb.g = maxVal;
    bgRgb.b = maxVal;
  }

  return {
    gold: goldStr,
    ember: emberStr,
    rose: roseStr,
    iris: irisStr,
    azure: azureStr,
    text: textStr,
    textMuted: textMutedStr,
    bg: bgStr,
    surface: surfaceStr,
    border: borderStr,
    goldRgb: parseRgb(goldStr, defaults.goldRgb),
    emberRgb: parseRgb(emberStr, defaults.emberRgb),
    roseRgb: parseRgb(roseStr, defaults.roseRgb),
    irisRgb: parseRgb(irisStr, defaults.irisRgb),
    azureRgb: parseRgb(azureStr, defaults.azureRgb),
    bgRgb,
    textRgb: parseRgb(textStr, defaults.textRgb),
  };
}

export function rgba(rgb: RgbTuple, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a.toFixed(3)})`;
}
