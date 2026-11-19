# Codebase Audit & Architectural Inventory

**Project:** "A STORY STILL UNFOLDING — The Story of Chinmoy Kalita"  
**Branch:** `rebuild/story`  
**Stack:** Next.js 15 (App Router), React 19, Strict TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis, Canvas2D / Three.js / R3F  
**Audit Date:** November 2026  

---

## 1. Executive Summary

This audit establishes the baseline architectural inventory and health diagnostics for the documentary portfolio. All runtime hydration mismatches and dev console errors have been diagnosed at their root cause and resolved. Strict automated guardrails (typechecking, linting, hex-token enforcement) are now wired into `package.json` and `eslint.config.mjs`. Visual design and layout remain intact while the ground is cleared for phase-by-phase refinement.

### Acceptance Criteria Verification
- [x] **Zero Console Errors:** Dev server runs cleanly with zero runtime exceptions or React warnings.
- [x] **Next.js "Issues" Badge Eliminated:** Hydration mismatches resolved by making client-state-dependent elements strictly client-only.
- [x] **Production Build Passes:** `npm run build` generates 17/17 static and dynamic pages with 0 errors.
- [x] **Tooling Enhanced:** Added `typecheck`, `content:report`, and custom ESLint hex-ban rule.
- [x] **Dead Code Pruned:** Redundant wrappers (`SmoothScroll.tsx`, `useLenis.ts`) removed.

---

## 2. Known Problems Register (Phase Tracking)

These known architectural and typographic discrepancies are documented here and will be resolved systematically across subsequent phases:

- [ ] **Chapters styled as bordered cards:**  
  *Problem:* Chapter 06 and Chapter 07 currently fall back to `ChapterCard.tsx`, which renders boxed cards with borders, hover elevations, and card chrome.  
  *Rule Violated:* **Rule 1 (Scene, Not Card)**. Every chapter must be a full-bleed scene. Cards exist only for genuine deliverables.  
  *Target Phase:* Dedicated scenes `Chapter06Scale.tsx` and `Chapter07Possibility.tsx`.

- [ ] **Invented narration / unverified claims:**  
  *Problem:* Any draft text must strictly match `/content` data without fabricated achievements, metrics, or personal claims.  
  *Rule Violated:* **Rule 3 (Use My Words)**. Missing content must render nothing in production.  
  *Target Phase:* Content reconciliation & production omission filter.

- [ ] **Visible placeholders and debug tags:**  
  *Problem:* Tags like `"Draft Content"`, `"GOLD"`, and rotated `"GOLD → GOLD"` are visible in UI components (`ThreadSpine.tsx`, `ChapterCard.tsx`).  
  *Rule Violated:* **Rule 4 (Placeholders Are Quiet)** & **Rule 2 (One Label)**. Placeholders must be hidden in production and rendered as a tiny muted `TODO` chip in development only.  
  *Target Phase:* Polish & navigation cleanup.

- [ ] **Duplicate navigation systems:**  
  *Problem:* The site renders both the left vertical `ThreadSpine.tsx` (in `RootLayout`) and the right-side `ChapterRail.tsx` ("Movements" panel in `page.tsx`).  
  *Rule Violated:* **Rule 2 (One Label)** and UX cohesion. Navigation should be singular and non-competing.  
  *Target Phase:* Navigation consolidation.

- [ ] **Chapter index uses emotion words instead of chapter titles:**  
  *Problem:* `ThreadSpine.tsx` and `ChapterRail.tsx` display emotional arcs (`Curiosity`, `Convergence`, `Creation`, etc.) as the primary navigation labels rather than canonical chapter titles (`It Started With Curiosity`, `I Found More Than One World`).  
  *Rule Violated:* Narrative clarity and standard chapter indexing.  
  *Target Phase:* Rail and spine label refactor.

- [ ] **Slashed-zero numerals:**  
  *Problem:* Certain fonts or CSS declarations render slashed zeros in numeral displays.  
  *Rule Violated:* **Rule 6 (Typography)**. Numerals must be lining tabular numerals only (`tabular-nums`), never slashed zeros.  
  *Target Phase:* Typography token audit.

- [ ] **Over-tight serif tracking & line-heights:**  
  *Problem:* Some display headings have excessive negative letter-spacing or cramped line-heights.  
  *Rule Violated:* **Rule 6 (Typography)**. Instrument Serif must adhere to tracking `0` to `-0.01em`, display line-height `1.05–1.15`, and narration `1.3–1.4`.  
  *Target Phase:* Typographic styling pass.

- [ ] **Blurred smudges behind the header:**  
  *Problem:* Heavy backdrop blur or ambient radial gradients overlapping behind `Navbar` create blurry dark smudges at the top of the viewport.  
  *Rule Violated:* Visual precision and optical cleanliness.  
  *Target Phase:* Navbar & header scrim refactor.

- [ ] **Any blue/navy-tinted dark colours:**  
  *Problem:* Dark mode neutrals must strictly obey true neutral math ($R = G = B \le 0x1C$), never allowing blue/navy tinting in dark surfaces.  
  *Rule Violated:* Design system specification ("Exposure" true neutral dark mode).  
  *Target Phase:* Color token audit.

- [ ] **Hard-coded hex values in components:**  
  *Problem:* Components must use semantic Tailwind tokens only (e.g. `text-theme-text`, `bg-chapter-accent`, `border-theme-border`), never inline hex codes like `#FFFFFF` or `#FBBF24`.  
  *Rule Violated:* Concept token rule.  
  *Target Phase:* Enforced via newly added `tokens/no-hardcoded-hex` ESLint rule.

- [ ] **Background scene not visible:**  
  *Problem:* High scrim opacity (content scrim overlay) or canvas z-index stacking in `BackgroundStage.tsx` can obscure subtle procedural Canvas2D living background animations.  
  *Rule Violated:* Visual narrative depth.  
  *Target Phase:* Scrim balancing & background lighting pass.

---

## 3. Inventory Table: Routes & Components

| File Path | Type | Action | Architectural Reason |
| :--- | :--- | :--- | :--- |
| **Routes (`/app`)** | | | |
| `app/layout.tsx` | Route Layout | **keep** | Global layout providing fonts, providers, BackgroundStage, Navbar, Footer. |
| `app/template.tsx` | Transition | **keep** | Smooth route transition wrapper utilizing `PageTransition`. |
| `app/page.tsx` | Page | **refactor** | Replace fallback `ChapterCard` for chapters 06 & 07 with dedicated full-bleed scenes; remove duplicate `ChapterRail`. |
| `app/explore/page.tsx` | Page | **keep** | Explore mode hub with 10-point project specs, AI tracks, and timeline. |
| `app/projects/[slug]/page.tsx` | Dynamic Page | **keep** | 10-point engineering case study layout with dynamic parameters and architecture diagrams. |
| `app/design/page.tsx` | Page | **keep** | Design systems, spatial interfaces, and tactile design work gallery. |
| `app/contact/page.tsx` | Page | **keep** | Direct dialogue page with contact form, verified email, and social channels. |
| `app/api/contact/route.ts` | API Route | **keep** | Contact form submission handler with honeypot verification and rate limiting. |
| `app/motion-lab/page.tsx` | Dev Lab | **keep** | Internal testing sandbox for GSAP ScrollTrigger, Lenis, and motion hooks. |
| `app/polish-lab/page.tsx` | Dev Lab | **keep** | Internal testing sandbox for commentary, Web Audio sound, and viewfinder cursor. |
| `app/background-lab/page.tsx` | Dev Lab | **keep** | Internal testing sandbox for living background SceneManager and shaders. |
| `app/robots.ts` | SEO | **keep** | Dynamic robots.txt metadata generator. |
| `app/sitemap.ts` | SEO | **keep** | Dynamic sitemap.xml generator covering all static and project routes. |
| `app/opengraph-image.tsx` | SEO | **keep** | Dynamic social card generation using `@vercel/og` (`next/og`). |
| `app/not-found.tsx` | Route | **keep** | Clean, accessible 404 documentary-themed fallback page. |
| `app/globals.css` | Stylesheet | **refactor** | Verify serif tracking, tabular numerals, and neutral black guarantees. |
| **Story Components (`components/story`)** | | | |
| `components/story/OpeningExperience.tsx` | Story Intro | **keep** | Focus-pull overture; made client-only to eliminate sessionStorage hydration error. |
| `components/story/StoryHero.tsx` | Story Hero | **keep** | Prologue scene with single label, pure black staging, and minimal CTA. |
| `components/story/ChapterRail.tsx` | Navigation | **delete** | Duplicate navigation competing with left `ThreadSpine.tsx`; violates Rule 2. |
| `components/story/EpilogueSection.tsx` | Epilogue | **keep** | Full-bleed epilogue scene with sunrise horizon gradient and contact dispatch. |
| **Chapter Scenes (`components/chapters`)** | | | |
| `components/chapters/Chapter01Curiosity.tsx` | Chapter Scene | **keep** | Chapter 01 full-bleed scene with GSAP scroll-pinned line art and narration moments. |
| `components/chapters/Chapter02Worlds.tsx` | Chapter Scene | **keep** | Chapter 02 full-bleed convergence scene representing 4 creative/technical disciplines. |
| `components/chapters/Chapter03Real.tsx` | Chapter Scene | **keep** | Chapter 03 full-bleed horizontal case study reel with keyboard navigation. |
| `components/chapters/Chapter04Design.tsx` | Chapter Scene | **keep** | Chapter 04 full-bleed design scene with typographic rearrangement and masonry lightbox. |
| `components/chapters/Chapter05Intelligence.tsx` | Chapter Scene | **keep** | Chapter 05 full-bleed AI scene with R3F network and 4 honest research tracks. |
| `components/chapters/ChapterCard.tsx` | Fallback Card | **delete** | Boxed card chrome violating Rule 1; will be obsoleted once Chapters 06 & 07 have scenes. |
| `components/chapters/DesignLightbox.tsx` | Lightbox | **keep** | Accessible modal with focus trap, image zoom, and keyboard escape. |
| **Background System (`components/background`)** | | | |
| `components/background/BackgroundStage.tsx` | Canvas Host | **keep** | Fixed Canvas2D stage; updated to render identical SSR DOM tree for hydration safety. |
| `components/background/SceneManager.ts` | Orchestrator | **keep** | State machine smoothly blending chapter canvas scenes and parallax layers. |
| `components/background/tokens.ts` | Token Helper | **keep** | Strictly converts theme RGB tokens without inline hex values. |
| `components/background/types.ts` | Contracts | **keep** | TypeScript definitions for scene life cycles, quality levels, and pointers. |
| `components/background/layers/Grain.ts` | Layer | **keep** | Procedural 35mm film grain canvas compositor layer. |
| `components/background/layers/Vignette.ts` | Layer | **keep** | Optical vignette darkening edges to focus center attention. |
| `components/background/scenes/PrologueDust.ts` | Scene | **keep** | Cosmic dust particles for Prologue. |
| `components/background/scenes/Ch01ConnectingDots.ts` | Scene | **keep** | Constellation point connections for Chapter 01. |
| `components/background/scenes/Ch02FourOrbs.ts` | Scene | **keep** | 4 chromatic orbs converging for Chapter 02. |
| `components/background/scenes/Ch03Blueprint.ts` | Scene | **keep** | Engineering blueprint grid and registration crosshairs for Chapter 03. |
| `components/background/scenes/Ch04InkRegistration.ts` | Scene | **keep** | CMYK ink registration marks for Chapter 04. |
| `components/background/scenes/Ch05FlowField.ts` | Scene | **keep** | Neural flow field vector streamlines for Chapter 05. |
| `components/background/scenes/Ch06LightLeaksFilm.ts` | Scene | **keep** | 35mm film sprockets and warm light leaks for Chapter 06. |
| `components/background/scenes/Ch07Bokeh.ts` | Scene | **keep** | Ascending bokeh optical circles for Chapter 07. |
| `components/background/scenes/EpilogueSunrise.ts` | Scene | **keep** | Warm ascending sunrise horizon rays for Epilogue. |
| **Motion (`components/motion`)** | | | |
| `components/motion/MotionProvider.tsx` | Provider | **keep** | Lenis + GSAP ScrollTrigger RAF loop; scroll progress debounced to avoid loop limits. |
| `components/motion/ThreadSpine.tsx` | Navigation | **refactor** | Remove rotated `"GOLD → GOLD"` tag; replace emotion labels with chapter titles. |
| `components/motion/ChapterTitleCard.tsx` | Motion Helper | **keep** | Full-screen chapter title card with focus-pull. |
| `components/motion/FocusPullText.tsx` | Motion Helper | **keep** | Optical focus-pull text reveal using CSS blur and opacity. |
| `components/motion/PageTransition.tsx` | Motion Helper | **keep** | Route change opacity fade with reduced-motion fallback. |
| `components/motion/PinnedScene.tsx` | Motion Helper | **keep** | GSAP ScrollTrigger scene pinning container. |
| `components/motion/Reveal.tsx` | Motion Helper | **keep** | Scroll-driven entry reveal primitive. |
| `components/motion/SubtitleReveal.tsx` | Motion Helper | **keep** | Staggered subtitle text reveal. |
| `components/motion/SmoothScroll.tsx` | Redundant Helper| **delete** | Deleted dead code; replaced by `MotionProvider`. |
| **Polish (`components/polish`)** | | | |
| `components/polish/PolishContext.tsx` | Provider | **keep** | Manages commentary, audio, cursor, and accessibility reduced-effects states. |
| `components/polish/PolishControls.tsx` | UI Widget | **keep** | Dropdown menu in Navbar exposing director preferences. |
| `components/polish/Preloader.tsx` | Intro Preloader | **keep** | 35mm film leader countdown; skips when assets load in under 600ms. |
| `components/polish/TimecodeHUD.tsx` | HUD Element | **keep** | Running timecode slate; made client-only to ensure hydration safety. |
| `components/polish/ViewfinderCursor.tsx` | Custom Cursor | **keep** | Optical viewfinder camera reticle for fine pointers. |
| `components/polish/SoundToggle.tsx` | Audio Synthesizer| **keep** | Web Audio API harmonic drone synthesised purely in browser with 0 network assets. |
| `components/polish/DirectorsCommentary.tsx` | Annotation | **keep** | Behind-the-scenes engineering and creative reflection drawer. |
| `components/polish/LowerThird.tsx` | HUD Element | **keep** | Broadcast-style documentary lower-third alert callouts. |
| `components/polish/Magnetic.tsx` | Physics Wrapper | **keep** | Magnetic attraction wrapper for interactive buttons. |
| `components/polish/ConsoleCredits.tsx` | Dev Greeting | **keep** | Cinematic credits logged once to developer console. |
| **Projects & 3D (`components/projects`, `components/three`)** | | | |
| `components/projects/ArchitectureDiagram.tsx` | Visual System | **keep** | Self-drawing interactive SVG architecture diagrams for case studies. |
| `components/projects/ProjectEvidenceSection.tsx`| Evidence Block | **keep** | Verified metric chips, code evidence, and artifact inspection cards. |
| `components/three/DocumentaryCanvas.tsx` | 3D Host | **keep** | Three.js canvas host with DPR capping and error boundary. |
| `components/three/IntelligenceNetworkCanvas.tsx`| 3D Scene | **keep** | R3F instanced particle network (< 3,600 nodes) for Chapter 05. |
| `components/three/StaticNetworkFallback.tsx` | Fallback | **keep** | Static SVG vector constellation fallback for low-power and no-WebGL devices. |
| **UI Primitives (`components/ui`)** | | | |
| `components/ui/Button.tsx` | UI Primitive | **keep** | Strict semantic token button with accessible focus rings. |
| `components/ui/Card.tsx` | UI Primitive | **keep** | Card chrome primitive (reserved strictly for genuine project and design items). |
| `components/ui/ChapterLabel.tsx` | UI Primitive | **keep** | Small mono chapter label above titles. |
| `components/ui/CKWordmark.tsx` | Branding | **keep** | SVG monogram and typography mark. |
| `components/ui/ContactForm.tsx` | Interactive UI | **keep** | Accessible contact form with honeypot and feedback states. |
| `components/ui/Container.tsx` | Layout | **keep** | Max-width responsive container. |
| `components/ui/Footer.tsx` | Colophon | **keep** | Footer colophon and copyright metadata. |
| `components/ui/MobileNavMenu.tsx` | Navigation | **keep** | Mobile slide-out navigation sheet with focus trap. |
| `components/ui/ModeSwitch.tsx` | Navigation | **keep** | Story vs Explore mode toggle pill. |
| `components/ui/NarrationText.tsx` | Typography | **keep** | Narration excerpt display with draft markers. |
| `components/ui/Navbar.tsx` | Navigation | **refactor** | Reduce background blur smudge; streamline header layout. |
| `components/ui/OutlinedNumeral.tsx` | Typography | **keep** | Large vector outlined chapter numerals. |
| `components/ui/SectionWrapper.tsx` | Layout | **keep** | Semantic section container. |
| `components/ui/Tag.tsx` | UI Primitive | **keep** | Semantic category and tech stack badge pill. |
| `components/ui/ThemeToggle.tsx` | UI Primitive | **keep** | Cycles theme modes (dark / light / system). |
| **SEO & Analytics (`components/seo`, `components/analytics`)** | | | |
| `components/seo/JsonLdPerson.tsx` | SEO | **keep** | Schema.org JSON-LD Person schema. |
| `components/analytics/PrivacyAnalytics.tsx` | Analytics | **keep** | Privacy-first analytics script loader. |
| **Hooks (`/hooks`)** | | | |
| `hooks/useFocusTrap.ts` | Accessibility | **keep** | Traps focus within open modals / drawers. |
| `hooks/useLenis.ts` | Motion Hook | **delete** | Deleted dead code; replaced by `MotionProvider`. |
| `hooks/useMotion.ts` | Motion Context | **keep** | Exposes scroll progress, motion preference, and Lenis instance. |
| `hooks/useScrollProgress.ts` | Motion Hook | **keep** | Local element scroll progress tracker used in motion-lab. |
| `hooks/useTheme.ts` | Theme Hook | **keep** | Manages system / dark / light mode resolution. |

---

## 4. Root Causes Diagnosed and Resolved

### A. Hydration Mismatch in `OpeningExperience.tsx`
- **Symptom:** Next.js red error overlay: *"Uncaught Error: Hydration failed because the server rendered HTML didn't match the client... Expected `<section className="opening-experience-overlay...">` but found `<aside...>`"*.
- **Root Cause:** `isDismissed` state was initialized via `useState(() => sessionStorage.getItem('ck_intro_viewed') === 'true')`. On SSR, `window` was undefined so it returned `false` (rendering the overlay). On the client, `sessionStorage` returned `true` for returning visitors, so the client rendered `null`, creating a DOM tree mismatch on the first client paint.
- **Fix:** Switched to a client-only `mounted` guard (`if (!mounted || isDismissed) return null;`) and read `sessionStorage` strictly inside `useEffect`. Server and initial client render now both produce `null`, achieving 100% hydration equivalence.

### B. Hydration Mismatch in `TimecodeHUD.tsx`
- **Symptom:** Potential mismatch when client restored scroll position before hydration completed.
- **Root Cause:** Rendered timecode numbers derived from client scroll progress on SSR without mounting verification.
- **Fix:** Added `mounted` state check (`if (!mounted || reduceEffects) return null;`) ensuring the timecode renders strictly on client after hydration.

### C. Maximum Update Depth Exceeded in `MotionProvider.tsx`
- **Symptom:** *"Maximum update depth exceeded. This can happen when a component calls setState inside useEffect..."*
- **Root Cause:** `lenis.on('scroll')` fired on every sub-pixel frame and called `setScrollProgress(e.progress)` synchronously on every RAF tick. This re-rendered the root `MotionProvider` and all child subscribers on every animation frame, causing feedback loops with ScrollTrigger.
- **Fix:** Debounced `setScrollProgress` using `requestAnimationFrame` and a minimum progress threshold (`Math.abs(p - lastProgress) >= 0.002`). Updated `--exposure` directly on `document.documentElement.style` without triggering React re-renders.

### D. DOM Tree Discrepancy in `BackgroundStage.tsx`
- **Symptom:** Rendered a single `<div className="bg-theme-bg" />` on SSR, but replaced it on mount with `<div className="overflow-hidden"><canvas /><div /></div>`.
- **Root Cause:** Conditional `if (!mounted)` returning different HTML structures.
- **Fix:** Renders the identical DOM container with `<canvas className="opacity-0" />` on SSR, smoothly fading to full visibility on client mount.

---

## 5. Tooling & Enforcement Verification

1. **`npm run typecheck` (`tsc --noEmit`)**:
   - Executes with strict flags (`"strict": true`, `"noImplicitAny": true`).
   - Result: `0 errors`.
2. **`npm run lint` (`eslint .`)**:
   - Flat ESLint 9 configuration extending `next/core-web-vitals`.
   - Includes custom rule `tokens/no-hardcoded-hex` preventing any hardcoded hex strings in `components/**/*.{ts,tsx}`.
   - Result: `0 errors, 0 warnings`.
3. **`npm run build` (`next build`)**:
   - Compiles all 17 routes into optimized static SSG pages and server-rendered endpoints.
   - Result: `Compiled successfully`.
4. **`npm run content:report` (`node scripts/content-report.js`)**:
   - Scans all 9 content files in `/content`.
   - Result: Reports 153 active `[TODO]` placeholders tracked in the single source of truth.
