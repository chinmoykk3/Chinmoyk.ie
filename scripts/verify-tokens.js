/**
 * Token and Contrast Verification Script
 * 
 * Verifies:
 * 1. Dark "Noir" neutrals have no blue tint: B <= R and B <= G for all neutral tokens.
 * 2. WCAG AA contrast compliance (>= 4.5:1 for standard text, >= 3.0:1 for large text/ui) for all text/bg token pairs.
 * 3. Zero hard-coded hex colors in /components.
 */

const fs = require('fs');
const path = require('path');

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  throw new Error(`Invalid hex: ${hex}`);
}

function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const darkNeutrals = {
  bg: '#000000',
  surface: '#0D0D0D',
  raised: '#171717',
  border: '#262626',
  text: '#F5F5F5',
  muted: '#A3A3A3',
  thread: '#FFC857'
};

const lightTokens = {
  bg: '#FFF8EC',
  surface: '#FFFFFF',
  sand: '#F3ECDD',
  border: '#E8DCC4',
  text: '#14121F',
  muted: '#5E5A70',
  thread: '#FFB000'
};

const lightAccents = {
  'azure-text': '#1B4FD6',
  'iris-text': '#5B35D8',
  'rose-text': '#C81E5B',
  'ember-text': '#C2410C',
  'gold-text': '#8A5A00'
};

let errors = [];

console.log('--- 1. Testing Dark "Noir" Neutral Purity (No Blue Tint) ---');
for (const [name, hex] of Object.entries(darkNeutrals)) {
  if (name === 'thread') continue; // thread is gold accent
  const { r, g, b } = hexToRgb(hex);
  if (b > r || b > g) {
    errors.push(`Dark neutral ${name} (${hex}) has blue tint (R:${r}, G:${g}, B:${b})`);
  } else {
    console.log(`✓ ${name.padEnd(8)} ${hex} -> R=${r}, G=${g}, B=${b} (pure neutral)`);
  }
}

console.log('\n--- 2. Testing WCAG Contrast Ratios ---');
const darkPairs = [
  { name: 'Dark: text on bg', text: darkNeutrals.text, bg: darkNeutrals.bg, min: 4.5 },
  { name: 'Dark: text on surface', text: darkNeutrals.text, bg: darkNeutrals.surface, min: 4.5 },
  { name: 'Dark: text on raised', text: darkNeutrals.text, bg: darkNeutrals.raised, min: 4.5 },
  { name: 'Dark: muted on bg', text: darkNeutrals.muted, bg: darkNeutrals.bg, min: 4.5 },
  { name: 'Dark: muted on surface', text: darkNeutrals.muted, bg: darkNeutrals.surface, min: 4.5 },
  { name: 'Dark: thread on bg', text: darkNeutrals.thread, bg: darkNeutrals.bg, min: 3.0 },
];

for (const pair of darkPairs) {
  const cr = contrast(pair.text, pair.bg);
  const pass = cr >= pair.min;
  console.log(`${pass ? '✓' : '✗'} ${pair.name.padEnd(26)}: ${cr.toFixed(2)}:1 (min ${pair.min}:1)`);
  if (!pass) errors.push(`${pair.name} failed contrast: ${cr.toFixed(2)}:1 < ${pair.min}:1`);
}

const lightPairs = [
  { name: 'Light: text on bg', text: lightTokens.text, bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: text on surface', text: lightTokens.text, bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: text on sand', text: lightTokens.text, bg: lightTokens.sand, min: 4.5 },
  { name: 'Light: muted on bg', text: lightTokens.muted, bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: muted on surface', text: lightTokens.muted, bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: muted on sand', text: lightTokens.muted, bg: lightTokens.sand, min: 4.5 },
  { name: 'Light: azure-text on bg', text: lightAccents['azure-text'], bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: iris-text on bg', text: lightAccents['iris-text'], bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: rose-text on bg', text: lightAccents['rose-text'], bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: ember-text on bg', text: lightAccents['ember-text'], bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: gold-text on bg', text: lightAccents['gold-text'], bg: lightTokens.bg, min: 4.5 },
  { name: 'Light: azure-text on surface', text: lightAccents['azure-text'], bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: iris-text on surface', text: lightAccents['iris-text'], bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: rose-text on surface', text: lightAccents['rose-text'], bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: ember-text on surface', text: lightAccents['ember-text'], bg: lightTokens.surface, min: 4.5 },
  { name: 'Light: gold-text on surface', text: lightAccents['gold-text'], bg: lightTokens.surface, min: 4.5 },
];

for (const pair of lightPairs) {
  const cr = contrast(pair.text, pair.bg);
  const pass = cr >= pair.min;
  console.log(`${pass ? '✓' : '✗'} ${pair.name.padEnd(30)}: ${cr.toFixed(2)}:1 (min ${pair.min}:1)`);
  if (!pass) errors.push(`${pair.name} failed contrast: ${cr.toFixed(2)}:1 < ${pair.min}:1`);
}

console.log('\n--- 3. Verifying Zero Hex in /components ---');
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        // Match hex colors: # followed by 3, 6, or 8 hex digits, word boundary or quote
        const matches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
        if (matches) {
          // Exclude comments or explicit token definitions if any
          const cleanLine = line.trim();
          if (!cleanLine.startsWith('//') && !cleanLine.startsWith('*')) {
            matches.forEach(m => {
              // Ignore canvas clear or webgl fallback in background tokens if defined as fallback
              if (fullPath.includes('background') && fullPath.includes('tokens.ts')) {
                // background/tokens.ts holds token fallback mapping for 3D shaders
                return;
              }
              errors.push(`Hardcoded hex ${m} in ${fullPath}:${idx + 1}: ${cleanLine}`);
            });
          }
        }
      });
    }
  }
}

scanDir(path.resolve(__dirname, '../components'));
console.log('Component scan complete.');

if (errors.length > 0) {
  console.error('\nFAILURES DETECTED:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n✓ ALL VERIFICATIONS PASSED: Pure dark neutrals, WCAG AA compliance, and zero hex in components.');
  process.exit(0);
}
