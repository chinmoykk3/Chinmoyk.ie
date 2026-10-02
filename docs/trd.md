# Technical Requirements Document (TRD)

## Target Environment

- **Runtime:** Node V18+ (for build), Modern Browsers (Chrome 100+, Safari 15+, Firefox, Edge).
- **Build Tool:** Vite + Rollup.

## Dependencies Breakdown

1. **Core:** `react`, `react-dom`, `react-router-dom`
2. **Styling Engine:** `tailwindcss` v4 or v3 + `@tailwindcss/vite`
3. **Animation/Physics:**
    - `framer-motion` (Component mounting, variants, UI states)
    - `gsap` (Complex scroll scrubbing, path drawing)
    - `@studio-freight/lenis` (Hooking scroll events seamlessly to GSAP)
    - `matter-js` (2D physics engine for stickers/playground)
    - `three` & `@react-three/fiber` (WebGL Backgrounds)
4. **Form Handling:** `react-hook-form`, `@hookform/resolvers`, `zod`
5. **Utilities:** `cmdk`, `canvas-confetti`, `lucide-react` (icons), `clsx`, `tailwind-merge`

## Data Architecture

All content is decentralized from the components and lives within `src/data/`:

- `site.js`: Global config (author info, SEO defaults).
- `projects.js`: Portfolio items.
- `skills.js`: Proficiencies with relationships.
- `experience.js`: Timeline logic.
- `testimonials.js`: Quotes.

## Rendering Strategy

Client-side rendered (CSR) via Vite. Due to the high reliance on `window` and `document` APIs (Lenis, GSAP, Matter.js, Three.js), CSR is the chosen pathway. SEO implications are mitigated by rich `<head>` meta tags and basic semantic HTML structure prior to hydration.
