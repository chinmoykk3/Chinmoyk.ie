# Design System (Midnight Neon)

## Concept

"Mission Control" - A playful, futuristic command-deck experience. Glassmorphism, neon accents on dark backgrounds, mono-font labels.

## Core Colors

- **Backgrounds:** `--bg: #0B0B14`, `--surface: #14141F`, `--surface-2: #1C1C2B`
- **Text:** `--text: #EDEDF5`, `--muted: #8A8AA3`
- **Accents:**
  - `--primary: #7C5CFF` (Violet: glows, gradients, focus)
  - `--secondary: #C6FF3D` (Acid Lime: CTAs, active states, cursor)
  - `--highlight: #FF6B57` (Coral: easter eggs, errors)

## Typography

- **Headings:** `Space Grotesk` (600-700 font-weight)
- **Body:** `Inter` (400-500 font-weight)
- **Labels/Code:** `JetBrains Mono` (Uppercase, 0.08em tracking)

## Spacing & Grid

- **Base Grid:** 8px increments.
- **Section Padding:** `clamp(80px, 12vw, 160px)`
- **Content Max-Width:** 1280px

## UI Elements

- **Surfaces:** `backdrop-blur(16px)`, `1px solid var(--border)`, 16-24px radius.
- **Buttons:**
  - *Primary:* Acid Lime bg, dark text.
  - *Secondary:* Ghost outline, Violet interactions.
  - All buttons have magnetic physics (pull towards cursor within 80px).
- **Forms:** Input fields with glass effect, floating labels, inline error validation with shake animation.

## Motion Language

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` default.
- **Pacing:** Micro-interactions (150-250ms), reveals (600-900ms), staggers (60-80ms).
