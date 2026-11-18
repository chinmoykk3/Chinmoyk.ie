import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic dynamic theme tokens backed by CSS variables
        theme: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-elevated': 'var(--color-surface-elevated)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          'border-strong': 'var(--color-border-strong)',
          amber: 'var(--color-thread-amber)',
        },
        // Active chapter dynamic variables
        chapter: {
          accent: 'var(--accent)',
          wash: 'var(--wash)',
        },
        // Fixed exact palette tokens for the Exposure concept
        exposure: {
          dark: {
            bg: '#07070A',
            surface: '#0F0F14',
            surfaceElevated: '#1A1A22',
            text: '#F4F1EA',
            muted: '#9A9AA8',
            amber: '#FFB020',
            cyan: '#22D3EE',
            violet: '#8B6CFF',
            coral: '#FF4D6D',
            lime: '#B6F23A',
          },
          light: {
            bg: '#FBF8F1',
            surface: '#FFFFFF',
            surfaceElevated: '#F3EEE2',
            text: '#0B0B10',
            muted: '#5B5B6B',
            amber: '#F59E0B',
            cyan: '#0891B2',
            violet: '#6D4AFF',
            coral: '#F43F5E',
            lime: '#65A30D',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'monospace'],
      },
      fontSize: {
        // Fluid typography using responsive clamp() calculations
        'fluid-display': 'clamp(2.5rem, 6vw + 1rem, 5.5rem)',
        'fluid-h1': 'clamp(2rem, 4vw + 0.75rem, 3.5rem)',
        'fluid-h2': 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)',
        'fluid-h3': 'clamp(1.25rem, 1.5vw + 0.35rem, 1.75rem)',
        'fluid-narration': 'clamp(1.125rem, 1.2vw + 0.5rem, 1.625rem)',
        'fluid-body': 'clamp(0.9375rem, 0.4vw + 0.75rem, 1.0625rem)',
        'fluid-caption': 'clamp(0.75rem, 0.2vw + 0.65rem, 0.8125rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
