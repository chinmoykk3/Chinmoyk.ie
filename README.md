# A STORY STILL UNFOLDING — The Story of Chinmoy Kalita

An interactive first-person documentary portfolio built with Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, and Three.js / React Three Fiber / Drei.

## Narrative Arc & Sunrise-Ramp Accents

- **Prologue**: Curiosity (`gold`)
- **Chapter 01**: Discovery (`gold`)
- **Chapter 02**: Experimentation (`all`)
- **Chapter 03**: Creation (`azure`)
- **Chapter 04**: Expression (`rose`)
- **Chapter 05**: Exploration (`iris`)
- **Chapter 06**: Growth (`gold-ember`)
- **Chapter 07**: Possibility (`ember`)
- **Epilogue**: A Story Still Unfolding (`sunrise`)

## Design Principles

- **Exposure Concept**: The story gains light and exposure as it progresses from early curiosity into full creative possibility.
- **Dark Mode**: True neutral blacks (`#000000`, `#0A0A0A`, `#141414`), strictly avoiding blue, navy, or indigo tints.
- **Light Mode**: Warm cream (`#FAF8F5`, `#FFFFFF`, `#F4F0E6`) with vibrant washes.
- **Zero Inline Hex**: All UI components reference token-based classes (`bg-theme-bg`, `text-theme-text`, `text-chapter-accent`, `bg-chapter-wash`, etc.).

## Project Architecture

- `/app` — App Router routes:
  - `/` — Story Mode (the complete documentary journey)
  - `/explore` — Explore Mode Hub (10-point frameworks, AI research tracks, Beyond horizons, timeline)
  - `/projects/[slug]` — Individual project case studies with the 10-point framework
  - `/design` — Design systems & spatial UI deliverables
  - `/contact` — Direct channels and collaboration invitations
- `/components`:
  - `/components/ui` — Container, SectionWrapper, Button, Tag, Card, NarrationText, ChapterLabel, OutlinedNumeral, Navbar, Footer, ThemeToggle
  - `/components/story` — StoryHero documentary header
  - `/components/chapters` — ChapterCard narrative component
  - `/components/motion` — SmoothScroll provider (Lenis + GSAP ScrollTrigger)
  - `/components/three` — Three.js canvas with accessible reduced-motion fallback
- `/content` — Typed content schemas & single-source-of-truth:
  - `chapters.ts` — Chapters with `accentKey` mapping
  - `projects.ts` — 10-point framework for seeded projects
  - `beyond.ts` — Active research bets and open hypotheses
  - `designWork.ts` — Design system specs & case studies
  - `aiWork.ts` — AI tracks (`completed`, `experiments`, `learning`, `future`)
  - `timeline.ts` — Chronological milestones
  - `contact.ts` — Contact channels and social handles
  - `README.md` — Complete checklist of placeholders to fill
- `/lib` — Utilities (`cn`, motion preference helpers) and font configurations
- `/hooks` — `useLenis`, `useTheme`
- `/styles` — Stylesheet roots
- `/public/{media,fonts}` — Static media & webfonts

## Scripts

```bash
# Start development server
npm run dev

# Run TypeScript check
npx tsc --noEmit

# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Run production build
npm run build
```
