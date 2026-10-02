# Brain / Workflow Tracker

## Project Goal

Create a production-quality, award-level personal portfolio website with a "Mission Control" theme (playful, futuristic command-deck experience).

## Phases & Status

### ✅ Phase 0: Documentation & Prep

- [x] Create `architecture.md`
- [x] Create `brain.md`
- [x] Initialize React + Vite project
- [x] Install base dependencies

### ✅ Phase 1: Foundation

- [x] Project setup & Design tokens (`tokens.css`, `globals.css`)
- [x] Tailwind CSS configuration for "Midnight Neon" theme
- [x] Layout shell & Routing setup (React Router)
- [x] Lenis smooth scrolling integration
- [x] Theme toggle logic & animations
- [x] Navbar (sticky, glassmorphism, animated active states)
- [x] Custom cursor (Three-state: default, view, drag)
- [x] Loading screen (0-100% counter, witty text, wipe reveal, sessionStorage bypass)

### ✅ Phase 2: Core Sections

- [x] Hero Section (Physics-based name, typewriter roles, R3F starfield bg)
- [x] About Section (Bio, Matter.js sticker board, stats counter)
- [x] Projects Section (Horizontal GSAP scroll, 3D tilt cards, Framer Motion full-screen overlay)

### ✅ Phase 3: Secondary Sections

- [x] Skills Section (Interactive constellation graph)
- [x] Experience Timeline (GSAP line draw, alternating layout)
- [x] Playground / "The Lab" (Matter.js shapes + quiz/game)
- [x] Testimonials Carousel (Draggable)
- [x] Contact Section (react-hook-form validation, confetti, magnetic buttons)
- [x] Footer (Scrolling marquee, local time)

### ✅ Phase 4: Polish & Deploy

- [x] Command Palette (cmdk via Cmd/Ctrl+K)
- [x] Konami Easter Egg
- [x] Custom 404 Page
- [x] Accessibility pass & Keyboard navigation
- [x] Performance pass (Lighthouse tuning, lazy loading)
- [x] Final SEO (Title, meta, OG images, schema)

## Global Rules

- **Verify before moving on:** Run the app locally, check desktop & mobile responsiveness, and confirm zero console errors before starting the next phase.
- **Tone:** Confident, witty, slightly nerdy.
- **Animations:** Default ease `cubic-bezier(0.22, 1, 0.36, 1)`, no linear feel, use springs.
