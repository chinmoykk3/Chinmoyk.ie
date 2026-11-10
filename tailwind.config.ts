import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Obsidian & Charcoal Void Canvas System
        canvas: {
          DEFAULT: '#090a0d',
          deep: '#060709',
          subtle: '#111319',
          card: '#161922',
          surface: 'rgba(22, 25, 34, 0.72)',
        },
        // Editorial Text Hierarchy
        paper: {
          DEFAULT: '#f7f7f4',
          muted: '#a5a7b0',
          dim: '#636773',
          faint: '#373a44',
        },
        // Studio Accent Identity
        ochre: {
          DEFAULT: '#e67e3a',
          light: '#f59e0b',
          glow: 'rgba(230, 126, 58, 0.15)',
        },
        cobalt: {
          DEFAULT: '#2f68ee',
          light: '#6366f1',
          glow: 'rgba(47, 104, 238, 0.15)',
        },
        emerald: {
          DEFAULT: '#10b981',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        // Legacy alias mappings for backward compatibility
        background: {
          DEFAULT: '#090a0d',
          subtle: '#111319',
          elevated: '#161922',
        },
        foreground: {
          DEFAULT: '#f7f7f4',
          muted: '#a5a7b0',
          dim: '#636773',
        },
        accent: {
          blue: '#2f68ee',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          amber: '#e67e3a',
        },
        editorial: {
          border: 'rgba(247, 247, 244, 0.08)',
          'border-hover': 'rgba(247, 247, 244, 0.20)',
          card: 'rgba(17, 19, 25, 0.75)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        'display-2xl': ['5.5rem', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        'display-xl': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-lg': ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'editorial-sm': '4px',
        'editorial-md': '8px',
        'editorial-lg': '16px',
        'editorial-xl': '24px',
      },
      boxShadow: {
        'editorial-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'editorial-md': '0 12px 32px rgba(0, 0, 0, 0.55)',
        'editorial-glow': '0 0 40px rgba(47, 104, 238, 0.12)',
        'ochre-glow': '0 0 40px rgba(230, 126, 58, 0.14)',
      },
      transitionTimingFunction: {
        'editorial-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
