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
        // Semantic theme tokens backed by CSS variables
        theme: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-elevated': 'var(--color-surface-elevated)',
          'surface-subtle': 'var(--color-surface-subtle)',
          sand: 'var(--color-surface-elevated)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          'border-strong': 'var(--color-border-strong)',
          thread: 'var(--color-thread-gold)',
          gold: 'var(--color-gold)',
          ember: 'var(--color-ember)',
          rose: 'var(--color-rose)',
          iris: 'var(--color-iris)',
          azure: 'var(--color-azure)',
        },
        // Active chapter dynamic variables
        chapter: {
          accent: 'var(--accent)',
          'accent-text': 'var(--accent-text)',
          wash: 'var(--wash)',
        },
        // Sunrise-ramp dedicated token palette
        sunrise: {
          azure: 'var(--color-azure)',
          iris: 'var(--color-iris)',
          rose: 'var(--color-rose)',
          ember: 'var(--color-ember)',
          gold: 'var(--color-gold)',
        },
        // Cinematic opening experience tokens (Pure black #000000, true neutral cinema palette)
        cinema: {
          bg: 'var(--color-cinema-bg)',
          surface: 'var(--color-cinema-surface)',
          text: 'var(--color-cinema-text)',
          muted: 'var(--color-cinema-muted)',
          border: 'var(--color-cinema-border)',
          gold: 'var(--color-cinema-gold)',
        },
        // Editorial Poster Hero palette
        poster: {
          bg: 'var(--color-poster-bg)',
          cream: 'var(--color-poster-cream)',
          muted: 'var(--color-poster-muted)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'monospace'],
        display: ['var(--font-display)', 'Bebas Neue', 'Oswald', 'Impact', 'sans-serif'],
      },
      fontSize: {
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
        breathe: 'breathe 2.6s ease-in-out infinite',
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
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.4)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
