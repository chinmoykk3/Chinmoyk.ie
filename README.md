# Mission Control Portfolio

A production-quality, award-level personal portfolio website built with React 18, Vite, Tailwind CSS, Framer Motion, GSAP, and Matter.js.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

## Folder Structure

- `/src/components/layout/` - Global layout components (Navbar, Footer).
- `/src/components/sections/` - The main sections of the single-page application.
- `/src/components/ui/` - Micro-components like the cursor and command palette.
- `/src/components/effects/` - WebGL/Three.js layers.
- `/src/data/` - **(IMPORTANT)** Contains all customizable site content.
- `/src/hooks/` - Custom logic (theme, interactions).
- `/docs/` - System architecture, PRD, rules, and history.

## How to Edit Content

You do not need to touch any React components to update your information. Navigate to `/src/data/` and modify the following files:

- `site.js`: Your name, tagline, bio, contact email, and social links.
- `projects.js`: Your portfolio case studies (with images, tags, and problem/solution text).
- `skills.js`: Add or remove skills for the graph/list.
- `experience.js`: Your timeline of roles.
- `testimonials.js`: Quotes from colleagues/clients.

## Connecting the Contact Form

The contact form is currently validated using `react-hook-form` + `zod` but lacks an actual backend hookup.
To connect it:

1. Sign up for a service like [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).
2. Open `/src/components/sections/Contact.jsx`.
3. Locate the `onSubmit` function.
4. Replace the internal `setTimeout` placeholder with a `fetch` request to your Formspree endpoint (or the EmailJS send function).

## Deployment

The app is fully static (`SSG`/`SPA`) and can be hosted anywhere.

### Vercel

1. Install Vercel CLI or link GitHub repo.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Netlify

1. Link GitHub repository.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Ensure you set up a redirect rule (`_redirects` file with `/* /index.html 200`) to route all 404 paths to React Router.

## Pre-Launch Checklist

- [ ] Replace `site.js` placeholders (`[NAME]`, `[EMAIL]`, etc.) with real data.
- [ ] Replace `projects.js` fake case studies with your actual work.
- [ ] Swap out placeholder `.webp` and `.jpg` images.
- [ ] Place your actual resume at `/public/resume.pdf`.
- [ ] Configure the contact form endpoint.
- [ ] Deploy and verify Lighthouse scores.
