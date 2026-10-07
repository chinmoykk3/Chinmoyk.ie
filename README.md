# Flight Log Portfolio

An editorial React 19 portfolio for a creative engineer. The visual system is a precise instrument panel: visible rules, abstract project visuals, strong typography, and signal-orange interactions.

## Setup

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Content editing

All personal content lives in `src/data/`:

- `site.js` — identity, bio, contact details, links, timezone, and role rotation.
- `projects.js` — project title, route slug, visual treatment, role, timeline, stack, problem, process, features, and outcomes.
- `skills.js` — capability list.
- `experience.js` — work history.

Project routes are generated at `/work/:slug`. Add a new project object with a unique `slug` to make it available from the index and next-project navigation.

## Themes

The default theme is Night Ops. The navigation sun/moon control switches to Paper and stores the preference in `localStorage` under `flight-log-theme`.

## Contact form

The current form is a validated frontend success flow. To connect a provider, add `VITE_FORM_ENDPOINT` and replace the simulated submission in `src/App.jsx` with a `fetch` POST to Formspree, EmailJS, or another endpoint. Keep server-side validation and spam protection in production.

## Deployment

The app is a static Vite SPA. Build with `npm run build` and deploy `dist/`. Configure the host to serve `index.html` for `/` and `/work/*` routes. Netlify users can add `_redirects` with `/* /index.html 200`.

## Checklist

- [ ] Replace placeholder identity/contact details in `src/data/site.js`.
- [ ] Replace example project links and metrics in `src/data/projects.js`.
- [ ] Add a real resume at `public/resume.pdf` if required.
- [ ] Configure the contact endpoint.
- [ ] Run the mobile and desktop accessibility/performance pass before launch.
