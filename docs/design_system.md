# Design System — Flight Log

## Concept

A precise, warm, tactile mission-control aesthetic: aerospace documentation, Swiss grid posters, and Teenage Engineering labelling. Content is primary; decoration behaves like wayfinding.

## Visual rules

- Use a visible 12-column grid with hairline rules and small telemetry labels.
- Keep surfaces mostly flat. Use blur only for the command palette and navigation treatment.
- Use 4px inputs/tags, 12px cards, and full-radius pills.
- Use one signal accent per viewport: orange in both themes, with green reserved for online/available status.
- Project visuals are CSS-composed abstract/typographic cards. Add real media only through data fields when it exists.

## Tokens

| Token | Night Ops | Paper |
|---|---|---|
| Background | `#0A0A0F` | `#F2EFE8` |
| Surface | `#121218` | `#FBFAF6` |
| Surface 2 | `#1A1A22` | `#E9E5DB` |
| Text | `#F1EEE6` | `#0F0F14` |
| Muted | `#8F8F9C` | `#5C5C66` |
| Signal | `#FF4F1F` | `#E63E0E` |
| Status | `#3DDC84` | `#3DDC84` |

## Typography

- Display: Space Grotesk with tight tracking and italic/color emphasis.
- Body: Manrope, 15–18px, generous line-height.
- Data: DM Mono, uppercase, 9–11px, tracked labels.

## Component inventory

- `SectionLabel` — numbered section header with eyebrow and description.
- `Reveal` — viewport-aware opacity/translate entrance.
- `ProjectCard` — keyboard-operable index item linking to a case-study route.
- `ProjectPage` — shared case-study structure with role/timeline/stack, brief, process, outcomes, and next project.
- `CommandMenu` — keyboard-first command surface opened with `⌘K` / `Ctrl+K`.
- `RouteMessage` — helpful 404 and missing-project state.

## Motion rules

Use `cubic-bezier(.22, 1, .36, 1)` for reveals and short hover transitions. Prefer one clear motion moment per section. Respect `prefers-reduced-motion` by reducing transitions and disabling decorative movement.

## Do / don't

- Do use numbering, rules, and labels to make the page easier to scan.
- Do let the case-study content carry the story.
- Don't use neon gradients, anonymous icon circles, fake loading waits, or hover-only meaning.
