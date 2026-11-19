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
  gold: 'rgb(255, 200, 87)',
  ember: 'rgb(255, 138, 76)',
  rose: 'rgb(255, 92, 138)',
  iris: 'rgb(155, 123, 255)',
  azure: 'rgb(76, 141, 255)',
  text: 'rgb(245, 245, 245)',
  textMuted: 'rgb(163, 163, 163)',
  bg: 'rgb(0, 0, 0)',
  surface: 'rgb(13, 13, 13)',
  border: 'rgb(38, 38, 38)',
  goldRgb: { r: 255, g: 200, b: 87 },
  emberRgb: { r: 255, g: 138, b: 76 },
  roseRgb: { r: 255, g: 92, b: 138 },
  irisRgb: { r: 155, g: 123, b: 255 },
  azureRgb: { r: 76, g: 141, b: 255 },
  bgRgb: { r: 0, g: 0, b: 0 },
  textRgb: { r: 245, g: 245, b: 245 },
  goldTextSafeRgb: { r: 255, g: 200, b: 87 },
  emberTextSafeRgb: { r: 255, g: 138, b: 76 },
  roseTextSafeRgb: { r: 255, g: 92, b: 138 },
  irisTextSafeRgb: { r: 155, g: 123, b: 255 },
  azureTextSafeRgb: { r: 76, g: 141, b: 255 },
};

const DEFAULT_LIGHT_TOKENS: AccentColours = {
  gold: 'rgb(255, 176, 0)',
  ember: 'rgb(255, 106, 31)',
  rose: 'rgb(244, 63, 122)',
  iris: 'rgb(123, 77, 255)',
  azure: 'rgb(46, 107, 255)',
  text: 'rgb(20, 18, 31)',
  textMuted: 'rgb(94, 90, 112)',
  bg: 'rgb(255, 248, 236)',
  surface: 'rgb(255, 255, 255)',
  border: 'rgb(232, 220, 196)',
  goldRgb: { r: 255, g: 176, b: 0 },
  emberRgb: { r: 255, g: 106, b: 31 },
  roseRgb: { r: 244, g: 63, b: 122 },
  irisRgb: { r: 123, g: 77, b: 255 },
  azureRgb: { r: 46, g: 107, b: 255 },
  bgRgb: { r: 255, g: 248, b: 236 },
  textRgb: { r: 20, g: 18, b: 31 },
  goldTextSafeRgb: { r: 138, g: 90, b: 0 },
  emberTextSafeRgb: { r: 194, g: 65, b: 12 },
  roseTextSafeRgb: { r: 200, g: 30, b: 91 },
  irisTextSafeRgb: { r: 91, g: 53, b: 216 },
  azureTextSafeRgb: { r: 27, g: 79, b: 214 },
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
  const goldTextStr = getVar('--color-gold-text', goldStr);
  const emberTextStr = getVar('--color-ember-text', emberStr);
  const roseTextStr = getVar('--color-rose-text', roseStr);
  const irisTextStr = getVar('--color-iris-text', irisStr);
  const azureTextStr = getVar('--color-azure-text', azureStr);

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
    goldTextSafeRgb: parseRgb(goldTextStr, defaults.goldTextSafeRgb),
    emberTextSafeRgb: parseRgb(emberTextStr, defaults.emberTextSafeRgb),
    roseTextSafeRgb: parseRgb(roseTextStr, defaults.roseTextSafeRgb),
    irisTextSafeRgb: parseRgb(irisTextStr, defaults.irisTextSafeRgb),
    azureTextSafeRgb: parseRgb(azureTextStr, defaults.azureTextSafeRgb),
  };
}

export function rgba(rgb: RgbTuple, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a.toFixed(3)})`;
}
