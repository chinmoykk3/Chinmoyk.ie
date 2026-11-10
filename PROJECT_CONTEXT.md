# PROJECT_CONTEXT.md — Chinmoy Kalita Portfolio (`Chinmoyk.ie`)

> **Notice**: This document serves as the permanent source of truth for the Chinmoy Kalita portfolio project. All architectural decisions, design philosophies, component inventories, and phase progressions must be maintained here. Update this file after every completed development phase. Never silently modify previously approved design decisions without explicit documentation and explanation. Do not regenerate working components unnecessarily; always inspect existing code prior to modification.

---

## 1. Project Identity & Positioning

- **Owner / Identity**: Chinmoy Kalita
- **Positioning**: Full-stack Developer, AI Engineer, and Graphic Designer
- **Creative Concept**: *A Mind in Motion* — Three disciplines. One creative universe.
- **Experience Style**: Interactive editorial storytelling portfolio combining high-performance engineering, intelligent systems, and bespoke graphic art direction.

---

## 2. Core Creative & Architectural Specifications

### 2.1 Hero Section
- **Visual Centerpiece**: Original abstract 3D sculpture rendered in real time.
- **Interaction**: Dynamic mouse-based reactivity, fluid deformation / rotation, and physics-informed lighting/shadow responses.
- **Fallback**: Graceful low-power/mobile 2D/canvas/WebGL fallback ensuring fast first-paint without layout shift. Respects `prefers-reduced-motion`.

### 2.2 About Section
- **Portrait Guideline**: Strict requirement to **use the real photograph supplied by the owner**.
- **Constraint**: **NEVER fabricate a personal portrait or insert synthetic/stock human avatars in place of Chinmoy Kalita.**
- **Narrative**: Highlighting the confluence of engineering rigor, AI system design, and visceral graphic sensibilities.

### 2.3 Featured Projects
1. **SAHYOG**
   - Collaborative and community-driven engineering ecosystem / platform.
2. **LIBRARIUM**
   - Curated knowledge archive, reading intelligence, and digital repository.
3. **SHUTTERSCAPE**
   - Visual imagery, computational aesthetics, and photographic showcase.

### 2.4 Technology Stack
- **Framework**: Next.js 15 (App Router, React 19 / Server & Client Components)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS with custom design tokens, fluid typography, and bespoke CSS variables
- **Motion & Physics**: Framer Motion 12 (page transitions, micro-interactions) + GSAP 3 (ScrollTrigger ticker integration)
- **Smooth Scrolling**: Lenis 1.3 synchronized with GSAP ticker loop
- **3D Graphics & Canvas**: Three.js 0.174, React Three Fiber (`@react-three/fiber` v9), and `@react-three/drei` v10
- **Typography & Icons**: `next/font/google` (Inter, Playfair Display, JetBrains Mono), Lucide React + custom SVG brand icons

### 2.5 Design Principles
- **Experimental Editorial Composition**: Magazine-grade asymmetry, varied grid rhythms, and bold compositional balance.
- **Expressive Typography**: Dynamic typographic scale pairing editorial serif headlines with ultra-clean technical sans-serif bodies and monospace accents.
- **Sophisticated Layouts**: Layered depths, subtle grain/film textures, balanced negative space, and refined borders.
- **Original Visuals**: Bespoke generative geometries, mathematical patterns, and custom SVG iconography.
- **Meaningful Animation**: Purposeful, physics-driven kinetics that amplify comprehension and immersion rather than pure ornament.

### 2.6 Responsive & Accessibility (a11y) Requirements
- **Responsive Fluidity**: Pixel-perfect presentation across ultra-wide monitors, standard laptops, tablets, and mobile viewports.
- **Performance Budget**: Target 60fps interaction; lazy loading of 3D assets, shader optimization, and dynamic device-tier detection.
- **Accessibility Standards**: WCAG 2.1 AA compliance, full keyboard navigability, semantic HTML landmark structure, screen reader labels, and `prefers-reduced-motion` compliance.

---

## 3. Actual Architecture & File Structure

```text
Chinmoyk.ie/
├── PROJECT_CONTEXT.md                      # Permanent source of truth (this document)
├── README.md                               # Repository overview and quickstart
├── package.json                            # Project dependencies and script runner
├── tsconfig.json                           # TypeScript compiler configuration (strict mode, @/* aliases)
├── tailwind.config.ts                      # Extended editorial palette, typography & tokens
├── postcss.config.mjs                      # PostCSS pipeline for Tailwind & Autoprefixer
├── next.config.mjs                         # Next.js build configuration (Three.js transpilation, image formats)
├── .gitignore                              # Git exclusion rules
├── public/                                 # Static assets & public assets directory
│   ├── images/                             # Raster/vector editorial imagery
│   ├── models/                             # Optimized 3D geometry and GLTF/GLB models
│   ├── textures/                           # Surface textures, noise maps & environment maps
│   └── icons/                              # Custom SVG marks & favicons
└── src/
    ├── animations/
    │   └── index.ts                        # Reusable Framer Motion variants & GSAP easing curves
    ├── app/
    │   ├── layout.tsx                      # Root layout, Google fonts (Inter, Playfair, JetBrains), SEO metadata
    │   └── page.tsx                        # Homepage entry point orchestrating editorial sections
    ├── components/
    │   ├── chapters/
    │   │   ├── AboutSection.tsx            # Chapter 03: Narrative & identity frame reserved for authentic portrait
    │   │   └── DisciplinesSection.tsx      # Chapter 01: Engineering, AI & Design pillars
    │   ├── gallery/                        # High-resolution visual gallery & interactive showcases
    │   ├── hero/
    │   │   ├── HeroSection.tsx             # Editorial hero container, typography, CTAs & status
    │   │   └── HeroSculpture.tsx           # Interactive 3D abstract sculpture (R3F, mouse reactivity, shaders)
    │   ├── navigation/
    │   │   └── Navbar.tsx                  # Sticky editorial navigation with responsive drawer & status pill
    │   ├── projects/
    │   │   └── ProjectsPreview.tsx         # Chapter 02: SAHYOG, LIBRARIUM & SHUTTERSCAPE showcase
    │   └── shared/
    │       ├── Footer.tsx                  # Editorial footer, colophon & verified social coordinates
    │       └── SmoothScrollProvider.tsx    # Lenis + GSAP ScrollTrigger ticker integration & reduced motion
    ├── data/
    │   └── projectData.ts                  # Centralized structured data: identity, disciplines, projects, nav
    ├── hooks/
    │   ├── useMousePosition.ts             # Normalized pointer tracker (-1 to 1) for 3D coordinates
    │   └── useReducedMotion.ts             # Media-query hook for WCAG prefers-reduced-motion compliance
    ├── lib/
    │   └── utils.ts                        # Utility helpers: cn() (clsx + tailwind-merge), lerp(), clamp()
    ├── styles/
    │   └── globals.css                     # Base styling, editorial grain, custom scrollbar, Lenis rules
    └── types/
        └── index.ts                        # TypeScript domain schemas (Discipline, ProjectItem, NavigationItem)
```

---

## 4. Animation Architecture

- **Global Smooth Motion**: Lenis 1.3 smooth scroll coordinated directly with GSAP ScrollTrigger's ticker (`gsap.ticker.add`).
- **Timeline Sequencing**: GSAP timelines for multi-stage section entrances and editorial reveals.
- **Component Micro-Interactions**: Framer Motion 12 for staggered entry transitions, magnetic hover states, and button dynamics.
- **3D Kinetics**: React Three Fiber render loop (`useFrame`) utilizing `THREE.MathUtils.damp` for lag-free pointer inertia and quaternion rotations.
- **Accessibility Fallback**: `useReducedMotion()` automatically disables Lenis scroll interpolation and halts Three.js mesh distortion / rotational drift.

---

## 5. Installed Dependencies

### Production Dependencies
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `^15.2.0` (15.5.29) | React App Router framework & SSR/SSG engine |
| `react` | `^19.0.0` (19.3.1) | Core UI library |
| `react-dom` | `^19.0.0` (19.3.1) | DOM rendering for React |
| `three` | `^0.174.0` | 3D WebGL engine |
| `@react-three/fiber` | `^9.8.2` | React reconciler for Three.js (React 19 support) |
| `@react-three/drei` | `^10.7.9` | R3F helpers, shaders, float & particle utilities |
| `framer-motion` | `^12.4.7` | Declarative UI animation & spring physics |
| `gsap` | `^3.12.7` | High-performance animation timelines & ScrollTrigger |
| `lenis` | `^1.3.27` | Smooth inertia scrolling |
| `lucide-react` | `^1.16.0` | Iconography suite |
| `clsx` | `^2.1.1` | Class name constructor |
| `tailwind-merge` | `^3.0.2` | Conflict-free Tailwind class resolution |

### Development Dependencies
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `typescript` | `^5.8.0` | Strict static typing |
| `@types/react` | `^19.0.0` | Type definitions for React 19 |
| `@types/react-dom` | `^19.0.0` | Type definitions for React DOM |
| `@types/node` | `^22.13.0` | Node.js system types |
| `@types/three` | `^0.174.0` | Three.js type definitions |
| `tailwindcss` | `^3.4.17` | Utility-first CSS framework |
| `postcss` | `^8.5.3` | CSS transformation engine |
| `autoprefixer` | `^10.4.20` | Vendor prefix automation |
| `eslint` | `^9.20.0` | Code quality and linting |
| `eslint-config-next` | `^15.2.0` | Next.js ESLint ruleset |

---

## 6. Project State & Tracking

### 6.1 Current Development Phase
- **Phase 01 — Project Foundation**: COMPLETED.
- **Next Phase**: Phase 02 — Editorial Narrative & 3D Interactive Refinement.

### 6.2 Completed Components & Milestones
- [x] Initialized Git repository with remote: `https://github.com/chinmoykk3/Chinmoyk.ie.git`.
- [x] Created permanent source of truth ([PROJECT_CONTEXT.md](file:///f:/chinmoyk.ie/Chinmoyk.ie/PROJECT_CONTEXT.md)).
- [x] Bootstrapped Next.js 15 App Router with React 19 and TypeScript in strict mode.
- [x] Configured Tailwind CSS with custom editorial design tokens, fonts, and dark palette.
- [x] Configured zero-CLS font loading (`Inter`, `Playfair Display`, `JetBrains Mono`) via `next/font/google`.
- [x] Established scalable directory architecture (`src/components/`, `src/animations/`, `src/data/`, `src/hooks/`, `src/lib/`, `src/styles/`, `src/types/`, `public/images`, `public/models`, `public/textures`, `public/icons`).
- [x] Built interactive WebGL 3D abstract sculpture (`HeroSculpture.tsx`) with pointer reactivity, organic distortion, and reduced-motion fallback.
- [x] Constructed core editorial sections: `Navbar.tsx`, `HeroSection.tsx`, `DisciplinesSection.tsx`, `ProjectsPreview.tsx`, `AboutSection.tsx`, and `Footer.tsx`.
- [x] Integrated Lenis smooth scrolling with GSAP ScrollTrigger ticker.
- [x] Set up metadata, OpenGraph, Twitter card SEO, and viewport tags.
- [x] Verified zero TypeScript errors (`tsc --noEmit` passed with 0 errors).
- [x] Verified production build (`npm run build` succeeded with clean static generation).

### 6.3 Approved Design Decisions
- **Decision 001**: Adopt Next.js App Router with TypeScript for maximum SEO, streaming performance, and long-term modularity.
- **Decision 002**: Maintain a single source of truth document (`PROJECT_CONTEXT.md`) that must be updated after every phase.
- **Decision 003**: 3D hero sculpture must be interactive and mouse-reactive with high frame-rate performance budgeting.
- **Decision 004**: No synthetic portraits; exclusively utilize authentic photographs supplied by Chinmoy Kalita.
- **Decision 005**: Integrate Lenis smooth scrolling with GSAP ScrollTrigger via the GSAP ticker loop (`gsap.ticker.add`) for synchronized scroll choreography.
- **Decision 006**: Pair classic editorial serif typography (`Playfair Display`) with clean sans-serif (`Inter`) and technical mono (`JetBrains Mono`) to reflect the three disciplines.

### 6.4 Known Bugs & Issues
- *None currently logged. Production build verified clean.*

### 6.5 Pending Tasks
- [ ] Provide authentic portrait photograph of Chinmoy Kalita to place into `public/images/chinmoy-portrait.webp`.
- [ ] Develop dedicated project deep-dive case studies for `SAHYOG`, `LIBRARIUM`, and `SHUTTERSCAPE`.
- [ ] Add interactive custom cursor and magnetic hover kinetics for interactive elements.
- [ ] Build interactive resume / career timeline component.
- [ ] Expand 3D sculpture shader variants and explore custom GLSL shaders for SHUTTERSCAPE showcase.

### 6.6 Project Content Requiring Owner Input
- [ ] **Owner Photograph**: High-resolution authentic portrait photo of Chinmoy Kalita for the About section.
- [ ] **Project Assets & Links**: Live URLs, GitHub repositories, and preview imagery for SAHYOG, LIBRARIUM, and SHUTTERSCAPE.
- [ ] **Resume Details**: Detailed chronological timeline of professional experience, education, and credentials.
- [ ] **Contact Email & Social Coordinates**: Confirm preferred public contact email and verified social media usernames.

---

*Last Updated*: Phase 01 Foundation (2026-11-10)
