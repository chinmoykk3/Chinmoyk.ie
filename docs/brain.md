# Brain / Workflow Tracker

## Project goal

Create a production-quality, award-level portfolio for Chinmoy Kalita that is recruiter-clear, art-directed, and inspectable by designers and engineers.

## Phases & status

### ✅ Phase 0: Audit & prep

- [x] Read current source, data, docs, and makeover brief.
- [x] Confirmed content remains data-driven in `src/data/*.js`.

### ✅ Phase 1: Four Modes foundation

- [x] Added DEV / DESIGN / AI / LEAD mode tokens and a persistent mode switcher.
- [x] Added active-mode state, scroll-linked scene detection, and mode jump navigation.
- [x] Added live telemetry for local time and scroll progress.
- [x] Preserved light/dark support and reduced-motion behavior.

### ✅ Phase 2: Identity & hero

- [x] Reframed hero around Chinmoy Kalita and the four role identities.
- [x] Added rotating role line and signature trajectory graphic.
- [x] Replaced the legacy JD mark with the CK monogram.
- [x] Updated metadata, favicon reference, Open Graph copy, and Person JSON-LD.

### ✅ Phase 3: Scenes & work

- [x] Added the Four Modes scene deck with distinct accents and motifs.
- [x] Kept project cards keyboard-operable and route-driven.
- [x] Preserved `/work/:slug` case studies and graceful missing-project states.

### 🔄 Phase 4: Final launch pass

- [x] Build and lint verified after the makeover pass.
- [x] Browser preview verified with no console errors.
- [ ] Run full keyboard-only, reduced-motion, contrast, and Lighthouse pass before production launch.
- [ ] Connect `VITE_FORM_ENDPOINT` for real contact submissions.
- [ ] Replace any clearly marked placeholder social/project URLs before launch.

## Global rules

Content belongs in `src/data/`. Motion explains state or hierarchy. Every custom interaction has a keyboard/focus path. Mode accents remain readable on both themes. Decorative animation must have a static reduced-motion fallback.
