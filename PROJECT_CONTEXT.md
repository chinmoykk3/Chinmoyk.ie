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
- **Fallback**: Graceful low-power/mobile 2D/canvas/WebGL fallback ensuring fast first-paint without layout shift.

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
- **Framework**: Next.js (App Router, React 19 / Server & Client Components)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom design tokens, fluid typography, and bespoke CSS variables
- **Motion & Physics**: Framer Motion (page transitions, micro-interactions) + GSAP (timeline choreography, scroll triggers)
- **3D Graphics & Canvas**: Three.js, React Three Fiber (`@react-three/fiber`), and `@react-three/drei`
- **Markdown / Content**: MDX for editorial write-ups, deep-dives, and technical notes

### 2.5 Design Principles
- **Experimental Editorial Composition**: Magazine-grade asymmetry, varied grid rhythms, and bold compositional balance.
- **Expressive Typography**: Dynamic typographic scale pairing editorial serif/display headlines with ultra-clean technical sans-serif bodies.
- **Sophisticated Layouts**: Layered depths, subtle grain/film textures, balanced negative space, and refined borders.
- **Original Visuals**: Bespoke generative geometries, mathematical patterns, and custom SVG iconography.
- **Meaningful Animation**: Purposeful, physics-driven kinetics that amplify comprehension and immersion rather than pure ornament.

### 2.6 Responsive & Accessibility (a11y) Requirements
- **Responsive Fluidity**: Pixel-perfect presentation across ultra-wide monitors, standard laptops, tablets, and mobile viewports.
- **Performance Budget**: Target 60fps interaction; prioritize lazy loading of 3D assets, shader optimization, and dynamic device-tier detection.
- **Accessibility Standards**: WCAG 2.1 AA compliance, full keyboard navigability, semantic HTML landmark structure, screen reader labels, and `prefers-reduced-motion` compliance.

---

## 3. Architecture & File Structure

```text
Chinmoyk.ie/
├── PROJECT_CONTEXT.md          # Permanent source of truth (this document)
├── README.md                   # Repository overview and quickstart
├── package.json                # Project dependencies and script runner
├── tsconfig.json               # TypeScript compiler configuration
├── tailwind.config.ts          # Extended styling tokens and typography
├── next.config.mjs             # Next.js build and optimization flags
├── public/                     # Static media, fonts, 3D gltf/glb models, icons
│   ├── assets/
│   │   └── portraits/          # Real photograph provided by Chinmoy Kalita
│   └── models/                 # Optimized 3D geometry and environment maps
└── src/
    ├── app/                    # Next.js App Router (layout, pages, routes)
    │   ├── layout.tsx          # Global root layout, font definitions, analytics
    │   ├── page.tsx            # Editorial home experience
    │   ├── globals.css         # Reset, design tokens, and smooth-scroll rules
    │   ├── projects/           # Deep-dive case studies (SAHYOG, LIBRARIUM, SHUTTERSCAPE)
    │   ├── blog/               # Technical thoughts & creative notes
    │   └── resume/             # Interactive career timeline & qualifications
    ├── components/
    │   ├── 3d/                 # Three.js / R3F canvases, shaders, and sculptures
    │   ├── canvas/             # Supporting canvas effects (background grain, cursor trails)
    │   ├── editorial/          # Typography blocks, pull quotes, narrative dividers
    │   ├── motion/             # Reusable Framer Motion / GSAP wrappers & transitions
    │   ├── navigation/         # Header, drawer, magnetic nav, footer
    │   ├── sections/           # Hero, About, Projects, Experience, Contact
    │   └── ui/                 # Accessible primitives (buttons, modals, tooltips)
    ├── hooks/                  # Custom React hooks (useMousePosition, useReducedMotion, etc.)
    ├── lib/                    # Math, animation presets, GSAP utils, shader helpers
    └── types/                  # Global TypeScript models and schema definitions
```

---

## 4. Animation Architecture

- **Global Smooth Motion**: Lenis smooth scroll coordinated with GSAP ScrollTrigger.
- **Timeline Sequencing**: GSAP timelines for multi-stage section entrances and editorial reveals.
- **Component Micro-Interactions**: Framer Motion for magnetic hover states, interactive cursor tracking, and button dynamics.
- **3D Kinetics**: R3F render loop (`useFrame`) with lerped damping for buttery smooth pointer reactions and quaternion rotations.
- **Reduced Motion Strategy**: Automatic fallback replacing physics transitions with instant or subtle opacity fades when `prefers-reduced-motion` is active.

---

## 5. Project State & Tracking

### 5.1 Current Development Phase
- **Phase 0**: Project Initialization, Git Repository Setup & Architecture Specification.

### 5.2 Completed Components & Milestones
- [x] Initialized Git repository with remote: `https://github.com/chinmoykk3/Chinmoyk.ie.git`.
- [x] Created initial [README.md](file:///f:/chinmoyk.ie/Chinmoyk.ie/README.md) and pushed initial commit to `origin/main`.
- [x] Formulated architectural and creative blueprint ([PROJECT_CONTEXT.md](file:///f:/chinmoyk.ie/Chinmoyk.ie/PROJECT_CONTEXT.md)).

### 5.3 Installed Dependencies
*(To be populated following Next.js project bootstrap)*
- Current Status: Pending package initialization (`next`, `react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`, `tailwindcss`, `typescript`).

### 5.4 Approved Design Decisions
- **Decision 001**: Adopt Next.js App Router with TypeScript for maximum SEO, streaming performance, and long-term modularity.
- **Decision 002**: Maintain a single source of truth document (`PROJECT_CONTEXT.md`) that must be updated after every phase.
- **Decision 003**: 3D hero sculpture must be interactive and mouse-reactive with high frame-rate performance budgeting.
- **Decision 004**: No synthetic portraits; exclusively utilize authentic photographs supplied by Chinmoy Kalita.

### 5.5 Known Bugs & Issues
- *None currently logged.*

### 5.6 Pending Tasks
- [ ] Initialize Next.js project structure with TypeScript and Tailwind CSS.
- [ ] Configure custom typography, colour palette, and editorial layout primitives in Tailwind.
- [ ] Install and configure Three.js, React Three Fiber, Drei, GSAP, and Framer Motion.
- [ ] Scaffold the 3D Abstract Sculpture Canvas with mouse-reactive coordinates.
- [ ] Build the interactive editorial layout (Hero, About, Projects, Resume, Contact).
- [ ] Implement responsive breakpoints and accessibility features.

### 5.7 Project Content Requiring Owner Input
- [ ] **Owner Photograph**: High-resolution authentic portrait photo of Chinmoy Kalita for the About section.
- [ ] **Project Assets & Links**: Live links, repository URLs, and visual assets for SAHYOG, LIBRARIUM, and SHUTTERSCAPE.
- [ ] **Resume & Experience Details**: Full chronology of professional roles, milestones, and education.
- [ ] **Contact & Social Coordinates**: Preferred email, GitHub, LinkedIn, X/Twitter, and other public handles.

---

*Last Updated*: Phase 0 Initialization (2026-11-10)
