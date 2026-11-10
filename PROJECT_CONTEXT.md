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
- **Visual Centerpiece**: Original abstract 3D sculpture rendered in real time using Three.js and React Three Fiber.
- **Sculptural Geometry**: Multi-layered composition featuring:
  1. A central **Parametric Harmonic Torus-Knot Sculpture** (`TorusKnotGeometry(1.5, 0.4, 260, 48, 2, 3)`).
  2. An inner counter-rotating **Luminous Polyhedral Intelligence Core** (`OctahedronGeometry(0.75, 0)`).
  3. Concentric **Gyroscopic Orbital Rings** rotating independently across secondary axes.
- **Materiality & Lighting**:
  - `MeshPhysicalMaterial` with clearcoat, deep obsidian-cobalt base (`#121724`), high metalness (`0.92`), and subtle roughness (`0.16`).
  - Warm solar amber key directional light (`#fbbf24`), cool algorithmic rim point light (`#2f68ee`), and dynamic pointer proximity specular light (`#38bdf8`).
  - Ground contact shadow plane (`ContactShadows`) grounding the sculpture.
- **Interaction Model**:
  - Continuous harmonic floating and breathing oscillation.
  - Pointer position tracking with smooth lerped damping (`THREE.MathUtils.damp`).
  - Full click-and-drag 360-degree rotation with momentum/inertia decay (`decay = 0.94`).
  - Dynamic pointer proximity: light intensity intensifies as the cursor approaches the core.
  - Scroll-linked transition: as the user scrolls, the sculpture gracefully translates along the Y/Z axes and rotates, transitioning seamlessly into Chapter 01.
  - Accessibility: Respects `prefers-reduced-motion` by freezing dynamic drift, distortion, and drag momentum.
- **Typography & Structure**:
  - Compact editorial navigation header.
  - Introductory headline: `"A CURIOUS MIND. AN ENDLESS CANVAS."`
  - Oversized animated name: `CHINMOY KALITA` with staggered character masking.
  - Professional descriptor: `"FULL-STACK DEVELOPER / AI ENGINEER / GRAPHIC DESIGNER"`.
  - Supporting copy: `"I build digital experiences where engineering meets intelligence and creativity."`.
  - Editorial metadata: coordinates `[ 26.14° N, 91.73° E ]`, engine status, and scroll indicator.

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
- **Styling**: Tailwind CSS with custom editorial design tokens, fluid typography, and bespoke CSS variables
- **Motion & Physics**: Framer Motion 12 (page transitions, spring physics, magnetic buttons) + GSAP 3 (ScrollTrigger ticker integration)
- **Smooth Scrolling**: Lenis 1.3 synchronized with GSAP ticker loop
- **3D Graphics & Canvas**: Three.js 0.174, React Three Fiber (`@react-three/fiber` v9), and `@react-three/drei` v10
- **Typography & Icons**: `next/font/google` (Inter, Playfair Display, JetBrains Mono), Lucide React + custom SVG brand icons

---

## 3. Creative Identity & Visual Design System

### 3.1 Color Palette
- **Canvas / Void Background**:
  - `canvas.DEFAULT` (`#090a0d`): Deep obsidian architectural tone providing high contrast without the flatness of `#000000`.
  - `canvas.deep` (`#060709`): Footer & preloader grounding surface.
  - `canvas.subtle` (`#111319`): Elevated surface background for cards and secondary panels.
  - `canvas.card` (`#161922` / `rgba(22, 25, 34, 0.72)`): Translucent frosted cards with backdrop blur.
- **Editorial Paper / Typographic Hierarchy**:
  - `paper.DEFAULT` (`#f7f7f4`): Warm alabaster / editorial archival tone for prominent headlines and high emphasis text.
  - `paper.muted` (`#a5a7b0`): Editorial body text providing optimal reading ergonomics.
  - `paper.dim` (`#636773`): Technical metadata, indexes, coordinates, and chapter labels.
- **Craft & Intelligence Accents**:
  - `ochre.DEFAULT` (`#e67e3a`): Burnt solar amber representing creative intuition, graphic design, and artistic craft.
  - `cobalt.DEFAULT` (`#2f68ee`): Precision hyper-indigo representing algorithmic intelligence and full-stack architecture.
  - `emerald.DEFAULT` (`#10b981`): Status verification & operational telemetry indicators.

### 3.2 Typography Scale
- **Oversized Name Headline**: `font-serif font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.92] tracking-tight`
- **Section Heading**: `font-serif font-normal text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight`
- **Editorial Subtitle**: `font-serif italic font-light text-paper-muted`
- **Body Text**: `font-sans font-light text-base sm:text-lg leading-[1.75] text-paper-muted`
- **Technical Index / Metadata**: `font-mono text-2xs uppercase tracking-[0.2em] text-paper-dim`

---

## 4. Reusable Component Inventory

| Component | Path | Description |
| :--- | :--- | :--- |
| `AnimatedName` | `src/components/hero/AnimatedName.tsx` | Oversized staggered letter typography animation with masked overflow containers. |
| `HeroSculpture` | `src/components/hero/HeroSculpture.tsx` | Multi-layered 3D sculpture (Harmonic Torus Knot, core, dual orbital rings, drag momentum, cursor light). |
| `HeroSection` | `src/components/hero/HeroSection.tsx` | Comprehensive interactive hero orchestrating headline, name, descriptor, copy, CTAs, 3D artwork, and scroll cue. |
| `SectionHeading` | `src/components/shared/SectionHeading.tsx` | Standardized editorial chapter heading with Roman numeral metadata, italic highlights, and lead paragraph. |
| `ChapterLabel` | `src/components/shared/ChapterLabel.tsx` | Asymmetric chapter tag with blinking status pulse and animated hairline divider. |
| `RevealText` | `src/components/shared/RevealText.tsx` | Kinetic word-by-word mask reveal with customizable italic and accent word targeting. |
| `MagneticButton` | `src/components/shared/MagneticButton.tsx` | Physics-informed magnetic button/link that pulls towards the pointer on hover. |
| `ProjectCard` | `src/components/projects/ProjectCard.tsx` | Asymmetric editorial project card with discipline tags, tech pills, and milestone bullets. |
| `CustomCursor` | `src/components/shared/CustomCursor.tsx` | Trailing spring follower with contextual states (`default`, `pointer`, `magnetic`, `view`). |
| `LoadingScreen` | `src/components/shared/LoadingScreen.tsx` | Minimalist editorial preloader with non-linear percentage counter and session caching. |
| `Navbar` | `src/components/navigation/Navbar.tsx` | Sticky editorial navigation with live Guwahati/IST studio clock, magnetic CTA, and mobile drawer. |
| `Footer` | `src/components/shared/Footer.tsx` | Editorial colophon with direct communication coordinates, verified handles, and system specs. |

---

## 5. Actual Architecture & File Structure

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
│   ├── images/                             # Raster/vector editorial imagery (reserved for real portrait)
│   ├── models/                             # Optimized 3D geometry and GLTF/GLB models
│   ├── textures/                           # Surface textures, noise maps & environment maps
│   └── icons/                              # Custom SVG marks & favicons
└── src/
    ├── animations/
    │   └── index.ts                        # Framer Motion spring presets, ease curves & variants
    ├── app/
    │   ├── layout.tsx                      # Root layout, Google fonts, SEO metadata, preloader & custom cursor
    │   └── page.tsx                        # Homepage entry point orchestrating editorial sections
    ├── components/
    │   ├── chapters/
    │   │   ├── AboutSection.tsx            # Chapter 03: Narrative & identity frame reserved for authentic portrait
    │   │   └── DisciplinesSection.tsx      # Chapter 01: Engineering, AI & Design pillars
    │   ├── gallery/                        # High-resolution visual gallery & interactive showcases
    │   ├── hero/
    │   │   ├── AnimatedName.tsx            # Oversized staggered letter typography animation
    │   │   ├── HeroSection.tsx             # Editorial hero container, typography, magnetic CTAs & status
    │   │   └── HeroSculpture.tsx           # Multi-layered interactive 3D abstract sculpture (R3F, drag, lighting)
    │   ├── navigation/
    │   │   └── Navbar.tsx                  # Sticky editorial navigation with live studio clock & magnetic CTA
    │   ├── projects/
    │   │   ├── ProjectCard.tsx             # Reusable asymmetric editorial project card
    │   │   └── ProjectsPreview.tsx         # Chapter 02: SAHYOG, LIBRARIUM & SHUTTERSCAPE showcase
    │   └── shared/
    │       ├── ChapterLabel.tsx            # Reusable chapter tag with hairline divider
    │       ├── CustomCursor.tsx            # Contextual trailing follower with hover states
    │       ├── Footer.tsx                  # Editorial footer, colophon & verified social coordinates
    │       ├── LoadingScreen.tsx           # Initial entry editorial preloader with counter
    │       ├── MagneticButton.tsx          # Spring physics magnetic button & link component
    │       ├── RevealText.tsx              # Kinetic typography masked reveal
    │       ├── SectionHeading.tsx          # Reusable editorial section header
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

## 6. Installed Dependencies

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

## 7. Project State & Tracking

### 7.1 Current Development Phase
- **Phase 01 — Project Foundation**: COMPLETED.
- **Phase 02 — Creative Identity and Design System**: COMPLETED.
- **Phase 03 — Interactive Hero Experience**: COMPLETED.
- **Next Phase**: Phase 04 — Editorial Chapters, Deep-Dive Case Studies & Interactive Exhibits.

### 7.2 Completed Components & Milestones
- [x] Initialized Git repository with remote: `https://github.com/chinmoykk3/Chinmoyk.ie.git`.
- [x] Formulated architectural and creative blueprint ([PROJECT_CONTEXT.md](file:///f:/chinmoyk.ie/Chinmoyk.ie/PROJECT_CONTEXT.md)).
- [x] Bootstrapped Next.js 15 App Router with React 19, TypeScript strict mode, and Tailwind CSS.
- [x] Established original editorial color palette (Obsidian Void, Warm Alabaster Paper, Burnt Ochre, Electric Cobalt).
- [x] Built complete design system primitives: `SectionHeading`, `ChapterLabel`, `RevealText`, `MagneticButton`, `ProjectCard`, `CustomCursor`, `LoadingScreen`, `Navbar`, and `Footer`.
- [x] **Engineered Phase 03 Interactive Hero Experience**:
  - Oversized staggered letter typography animation for `CHINMOY KALITA` ([AnimatedName.tsx](file:///f:/chinmoyk.ie/Chinmoyk.ie/src/components/hero/AnimatedName.tsx)).
  - Headline: `"A CURIOUS MIND. AN ENDLESS CANVAS."` with kinetic mask reveal.
  - Professional descriptor: `"FULL-STACK DEVELOPER / AI ENGINEER / GRAPHIC DESIGNER"`.
  - Supporting copy: `"I build digital experiences where engineering meets intelligence and creativity."`.
  - Multi-layered 3D sculpture ([HeroSculpture.tsx](file:///f:/chinmoyk.ie/Chinmoyk.ie/src/components/hero/HeroSculpture.tsx)):
    - Parametric Harmonic Torus Knot (`TorusKnotGeometry(1.5, 0.4, 260, 48, 2, 3)`).
    - Inner pulsing octahedral intelligence core with emissive wireframe.
    - Concentric counter-rotating gyroscopic orbital rings.
    - Three-point lighting + dynamic pointer proximity specular point light.
    - Ground contact shadow plane (`ContactShadows`).
    - Full 360-degree pointer drag-to-rotate with inertia decay.
    - Scroll-linked Y/Z depth transition.
- [x] Verified zero TypeScript errors (`tsc --noEmit` passed with 0 errors).
- [x] Verified production build (`npm run build` succeeded with clean static generation).

### 7.3 Approved Design Decisions
- **Decision 001**: Adopt Next.js App Router with TypeScript for maximum SEO, streaming performance, and long-term modularity.
- **Decision 002**: Maintain a single source of truth document (`PROJECT_CONTEXT.md`) that must be updated after every phase.
- **Decision 003**: 3D hero sculpture must be interactive and mouse-reactive with high frame-rate performance budgeting.
- **Decision 004**: No synthetic portraits; exclusively utilize authentic photographs supplied by Chinmoy Kalita.
- **Decision 005**: Integrate Lenis smooth scrolling with GSAP ScrollTrigger via the GSAP ticker loop (`gsap.ticker.add`) for synchronized scroll choreography.
- **Decision 006**: Pair classic editorial serif typography (`Playfair Display`) with clean sans-serif (`Inter`) and technical mono (`JetBrains Mono`) to reflect the three disciplines.
- **Decision 007**: Develop an original color scheme: **Obsidian Void** (`#090a0d`), **Warm Alabaster** (`#f7f7f4`), **Burnt Ochre** (`#e67e3a`), and **Electric Cobalt** (`#2f68ee`) for a bespoke independent creative studio look.
- **Decision 008**: Implement spring physics for magnetic interactions with strict `prefers-reduced-motion` and touch screen bypasses.
- **Decision 009**: Preloader must be non-intrusive and cached via `sessionStorage` after initial load.
- **Decision 010**: Micro hairline borders (`rgba(247, 247, 244, 0.08)`) and tactile grain overlay (`editorial-grain`) unify all pages into a cohesive physical print-meets-digital aesthetic.
- **Decision 011**: Mathematical multi-layered abstract 3D sculpture composed of a Parametric Harmonic Torus Knot, an inner pulsating octahedral intelligence core, and counter-rotating gyroscopic orbital rings.
- **Decision 012**: Drag-to-rotate interaction with friction momentum decay, combined with cursor proximity specular lighting and scroll-triggered z/y-depth transition.
- **Decision 013**: Oversized animated name typography (`CHINMOY KALITA`) with staggered character masking for maximum editorial presence while preserving selectable semantic HTML.

### 7.4 Known Bugs & Issues
- *None currently logged. Production build verified clean.*

### 7.5 Pending Tasks
- [ ] Provide authentic portrait photograph of Chinmoy Kalita to place into `public/images/chinmoy-portrait.webp`.
- [ ] Develop interactive deep-dive case study drawers or modal experiences for `SAHYOG`, `LIBRARIUM`, and `SHUTTERSCAPE`.
- [ ] Build interactive career / experience timeline component (`ExperienceTimeline.tsx`).
- [ ] Implement creative exhibits & generative gallery in `src/components/gallery/CreativeGallery.tsx`.

### 7.6 Project Content Requiring Owner Input
- [ ] **Owner Photograph**: High-resolution authentic portrait photo of Chinmoy Kalita for the About section.
- [ ] **Project Assets & Links**: Live URLs, GitHub repositories, and preview imagery for SAHYOG, LIBRARIUM, and SHUTTERSCAPE.
- [ ] **Resume Details**: Detailed chronological timeline of professional experience, education, and credentials.
- [ ] **Contact Email & Social Coordinates**: Confirm preferred public contact email and verified social media usernames.

---

*Last Updated*: Phase 03 Interactive Hero Experience (2026-11-10)
