# Chinmoy Kalita — Four Modes Portfolio

A highly art-directed React 19 portfolio for **Chinmoy Kalita**: Full-Stack Developer, Graphics Designer, AI Enthusiast, and Team Lead. The site is built as one living canvas with four visual modes — DEV, DESIGN, AI, and LEAD — connected to scroll position and a persistent keyboard-accessible mode switcher.

## Setup

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Content editing

All identity and portfolio content lives in `src/data/`:

- `site.js` — name, initials, roles, bio, contact details, social links, and availability.
- `projects.js` — project route slug, category, visual treatment, role, timeline, stack, problem, process, features, and outcomes.
- `skills.js` — capability list.
- `experience.js` — work history.

Project routes are generated at `/work/:slug`. Add a project object with a unique `slug` to make it available from the index and next-project navigation. Missing process and outcome fields render a graceful compact fallback.

## Four Modes

The navigation mode switcher maps each identity to a scene in the page:

| Mode | Purpose | Accent |
|---|---|---|
| DEV | Systems and frontend engineering | Acid green |
| DESIGN | Graphic systems and interface craft | Hot magenta |
| AI | Practical intelligence and experimentation | Electric cyan |
| LEAD | Direction, critique, and team delivery | Amber |

The active mode is updated from scroll position and can be changed directly with the switcher. Each mode includes a reduced-motion fallback.

## Contact and environment

The current contact form provides a frontend success state. To connect a real provider, add `VITE_FORM_ENDPOINT` and replace the simulated submission in `src/App.jsx` with a server-validated POST. Keep server-side validation, a honeypot, rate limiting, and spam protection in production.

The social preview and Person JSON-LD metadata are maintained in `index.html`. Update the canonical URL, OG image, and social links before deploying to a different domain.

## Deployment

This is a static Vite SPA. Build with `npm run build` and deploy `dist/`. Configure the host to serve `index.html` for `/` and `/work/*` routes. Netlify users can add `_redirects` with `/* /index.html 200`.

## Launch checklist

- Replace example project URLs and metrics in `src/data/projects.js`.
- Add a real résumé at `public/resume.pdf` if required.
- Configure `VITE_FORM_ENDPOINT` for real submissions.
- Replace `/og-image.webp` with a final social preview asset if one is not already supplied.
- Run keyboard, reduced-motion, contrast, mobile, and Lighthouse checks before launch.
