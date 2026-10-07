# Brain / Workflow Tracker

## Project goal

Create a production-quality, award-level portfolio that feels art-directed, recruiter-clear, and inspectable by designers and engineers.

## Phases & status

### ✅ Phase 0: Audit & prep

- [x] Read current source and docs.
- [x] Confirmed legacy neon/glass direction, stock-image fields, dead code, and React 18 documentation mismatch.

### ✅ Phase 1: Flight Log foundation

- [x] Added Night Ops and Paper theme tokens.
- [x] Added editorial grid, hairline rules, signal accent, and loaded display/body fonts.
- [x] Replaced text logo with SVG monogram.
- [x] Removed fake loader, legacy page shell, and unused section/effect files.

### ✅ Phase 2: Core portfolio

- [x] Rebuilt hero, about, selected work, toolkit, lab, contact, and footer around the Flight Log language.
- [x] Replaced stock portrait/project-cover dependence with local abstract CSS/SVG treatments.
- [x] Added theme toggle and keyboard command menu.

### ✅ Phase 3: Work routes

- [x] Added `/work/:slug` deep-linkable case-study template.
- [x] Added role/timeline/stack summaries, process fallback, outcomes, highlights, and next-project navigation.
- [x] Added helpful 404 and missing-project states.

### 🔄 Phase 4: Final polish

- [x] Desktop build and local preview verified.
- [ ] Run full keyboard-only, reduced-motion, contrast, and Lighthouse pass before production launch.
- [ ] Connect `VITE_FORM_ENDPOINT` for real submissions.

## Global rules

- Content belongs in `src/data/`.
- Motion explains hierarchy or state.
- Every custom interaction must have a keyboard/focus path.
- Keep the signal accent intentional and preserve contrast in both themes.
