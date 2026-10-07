# Flight Log Portfolio — Architecture

## Product direction

A warm, editorial instrument panel for a creative engineer. The interface uses a visible grid, hairline rules, telemetry labels, flat surfaces, and one signal accent instead of generic neon glassmorphism.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4 token compatibility through `src/styles/tokens.css`
- Framer Motion for reveals and route-adjacent motion
- React Router for `/` and deep-linkable `/work/:slug` case studies
- Lucide React for interface icons
- `react-hook-form` + `zod` remain available for the production contact endpoint
- GSAP, ScrollTrigger, Lenis, Three.js, and Matter.js remain optional dependencies for future experiments; the core route does not load them

## Structure

```text
src/
  App.jsx                 route shell, home sections, case-study template, 404
  data/                   all editable portfolio content
  styles/
    tokens.css            theme tokens for Night Ops and Paper
    globals.css           layout, typography, components, responsive rules
```

## Routes

- `/` — recruiter-first portfolio index
- `/work/:slug` — shareable case-study route with summary, process, outcomes, and next-project link
- `*` — on-brand 404 with return and contact actions

## Data contract

Project content is stored in `src/data/projects.js`, including `visual`, `role`, `timeline`, `problem`, `process`, `features`, and `results`. Visual covers are composed in CSS from this metadata, so the site has no stock-photo dependency. Site identity and contact details live in `src/data/site.js`; skills and experience remain data-driven.

## Accessibility and motion

Semantic headings, buttons, route links, focus rings, keyboard-operable project cards, reduced-motion CSS, and explicit labels are required. Motion explains state or hierarchy. Hover-only effects are paired with keyboard/focus behavior.

## Themes

The default theme is Night Ops. The navigation toggle writes `flight-log-theme` to localStorage and sets `data-theme` on the document root. Paper is designed as a separate palette rather than a simple inversion, with signal orange replacing the dark-theme accent.
