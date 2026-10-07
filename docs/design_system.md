# Design System — Four Modes

## Concept

**Four Modes** is a living portfolio system for Chinmoy Kalita: one person, four ways of making value.

- **DEV** — systems, frontend engineering, infrastructure, and dependable delivery.
- **DESIGN** — graphic language, interaction, typography, and visual craft.
- **AI** — practical intelligence, experimentation, and human-centered automation.
- **LEAD** — direction, critique, collaboration, and teams that ship.

The mode switcher is persistent in the navigation. Scroll position updates the active mode, while clicking a pill jumps to the corresponding scene.

## Mode tokens

| Mode | Accent | Motif | Motion personality |
|---|---|---|---|
| DEV | `#B6FF3B` | Grid / terminal signal | Precise, blinking, modular |
| DESIGN | `#FF3D8B` | Registration grid / print layers | Elastic, misregistered, expressive |
| AI | `#3DE0FF` | Signal orbit / node field | Reactive, pulsing, connective |
| LEAD | `#FFB020` | Formation / metrics | Steady, assembling, directional |

All mode accents are used on dark and light surfaces with readable supporting text. Decorative layers never carry meaning by themselves.

## Typography

- Display: Space Grotesk, tight tracking, fluid `clamp()` scale.
- Body: Inter, 15–18px, generous line height.
- Labels and telemetry: JetBrains Mono, uppercase, 9–11px.
- Italic emphasis is reserved for the active mode or a single idea per heading.

## Component inventory

- `ModeSwitcher` — keyboard-operable four-pill navigation.
- `Reveal` — viewport-aware section entrance.
- `ProjectCard` — keyboard-operable route link with mode/year metadata.
- `SectionLabel` — numbered section heading and supporting copy.
- `CommandMenu` — `Cmd/Ctrl+K` navigation and utility commands.
- `ProjectPage` — shared Problem → Process → Outcome case-study route.
- `RouteMessage` — helpful 404 and missing-project state.
- `Hero telemetry` — live local time, scroll position, and role rotation.

## Motion rules

Use the default ease `cubic-bezier(.22, 1, .36, 1)`. Motion must explain state or hierarchy: active mode, role rotation, project reveal, or navigation. Decorative animation is transform/opacity/clip-path only. `prefers-reduced-motion` disables trajectory, pulse, and rotating scene motion.

## Accessibility

- Semantic main landmark and skip link.
- Mode switcher uses `aria-pressed` and works with keyboard focus.
- Project cards remain keyboard-operable.
- Visible focus rings are preserved.
- Native cursor remains available; no hover-only content is required.
- Reduced-motion users receive static scene treatments.
- Content remains readable without animation or JavaScript-driven state.

## Content rules

All identity, role, project, experience, and contact content belongs in `src/data/*.js`. Placeholder values must be clearly marked before launch. No stock imagery is required; visuals are composed with CSS/SVG and project data.
