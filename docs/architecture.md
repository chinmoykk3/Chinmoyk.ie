# Mission Control Portfolio - Architecture

## Tech Stack

- **Framework:** React 18 + Vite (JavaScript)
- **Styling:** Tailwind CSS with raw CSS variables for design tokens.
- **Animation:**
  - Framer Motion (Layout animations, shared-element transitions, component states)
  - GSAP + ScrollTrigger (Scroll-driven sequences, timeline drawing)
- **Scrolling:** Lenis (Smooth scrolling, synced with ScrollTrigger)
- **3D & Physics:**
  - Three.js via @react-three/fiber (Background starfield/particle field)
  - Matter.js (Physics for draggable stickers and playground)
- **Routing:** React Router (404 page, case-study deep links endpoints)
- **Forms & Utils:** react-hook-form + zod, cmdk (Command palette), canvas-confetti

## System Design (Midnight Neon)

- **Theme Engine:** CSS Variables injected into `:root` and `.light` classes. Toggled via localStorage and initialized with `prefers-color-scheme`.
- **Responsive Approach:** Mobile-first Tailwind utility classes. Layout breaks at 768px, 1024px, 1440px.

## Suggested Folder Structure

```
src/
  assets/
  components/
    layout/       (Navbar, Footer, LayoutWrapper)
    ui/           (Buttons, Form inputs, Cmdk, Cursor)
    sections/     (Hero, About, Projects, Skills, Experience, Playground, Contact)
    effects/      (ThreeBackground, ParticleCanvas)
  hooks/          (useMagnetic, useMousePosition, useTheme, useKonami, useReducedMotion)
  data/           (projects.js, skills.js, experience.js, testimonials.js, site.js)
  styles/         (globals.css, tokens.css)
  pages/          (Home, ProjectPage, NotFound)
  utils/          (animation helpers, physics setup)
```

## Data Management

All content is centralized in `/src/data` (JS object exports).
Component logic accesses this data purely to render the DOM. No complex global state management (Zustand/Redux) is needed since interactions are mostly local and animation-driven. Theme state is persisted in localStorage.

## Performance Considerations

- Three.js context pauses when off-screen using `IntersectionObserver`.
- Heavy assets and case-study overlays are lazy-loaded with React.lazy and Suspense.
- Explicit image dimensions to avoid Layout Shifts.

## Accessibility (A11y)

- `prefers-reduced-motion` hook controls complex GSAP/Framer animations, defaulting to simple opacity fades.
- Full keyboard operability and visible focus rings.
- Semantic HTML tags.
