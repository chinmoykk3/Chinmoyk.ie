# A STORY STILL UNFOLDING — The Story of Chinmoy Kalita

An interactive first-person documentary portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, and Three.js / React Three Fiber / Drei.

## The Narrative Arc

- **Prologue**: Curiosity
- **Chapter 01**: Discovery
- **Chapter 02**: Experimentation
- **Chapter 03**: Creation
- **Chapter 04**: Expression
- **Chapter 05**: Exploration
- **Chapter 06**: Growth
- **Chapter 07**: Possibility
- **Epilogue**: A Story Still Unfolding

## Project Structure

- `/app` — App Router routes:
  - `/` — Story Mode (the documentary journey)
  - `/explore` — Explore Mode Hub (10-point project specs, AI tracks, timeline)
  - `/projects/[slug]` — Individual project case study pages with the 10-point framework
  - `/design` — Design systems, spatial 3D interfaces & deliverables
  - `/contact` — Direct channels and collaboration invitation
- `/components`:
  - `/components/ui` — Navbar, Footer, UI primitives
  - `/components/story` — Documentary Hero and story layout
  - `/components/chapters` — ChapterCard and chapter timeline items
  - `/components/motion` — SmoothScroll provider (Lenis + GSAP ScrollTrigger)
  - `/components/three` — Three.js WebGL canvas with reduced-motion fallback
- `/content` — Strongly-typed content schema single-source-of-truth:
  - `chapters.ts` — Prologue through Epilogue narration and emotional arcs
  - `projects.ts` — 10-point engineering framework for seeded projects
  - `designWork.ts` — Design system specs and deliverables
  - `aiWork.ts` — AI tracks (`completed`, `experiments`, `learning`, `future`)
  - `timeline.ts` — Chronological milestones
  - `contact.ts` — Profiles, verified email, and social handles
  - `README.md` — Comprehensive checklist of placeholders to be filled
- `/lib` — Utility functions (`cn`, motion preference helpers)
- `/hooks` — Custom hooks (`useLenis`)
- `/styles` — Global design tokens & styling
- `/public/{media,fonts}` — Static media & webfonts

## Scripts

```bash
# Start development server
npm run dev

# Run production build
npm run build

# Run linting
npm run lint

# Format code
npm run format
```
