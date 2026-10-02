# Code Style Guidelines

## Naming Conventions

- **Components:** PascalCase (e.g., `LayoutWrapper`, `ContactForm`)
- **Files:** PascalCase for component files (`HeroSection.jsx`), camelCase for utilities/hooks (`useMousePosition.js`, `cn.js`).
- **CSS Variables:** kebab-case inside `:root` block (e.g., `--color-primary`).
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_SPEED_MS`).

## React Components

- Use functional components and hooks.
- Destructure props at the function signature: `function HeroSection({ title, subtitle }) { ... }`
- Keep components small. If a section component grows beyond 200 lines, extract its logic into custom hooks or split its sub-sections (e.g., separate the `.map` iteration blocks into smaller components).

## Styling

- Heavily rely on Tailwind CSS utility classes.
- For dynamic classes, use the `cn()` utility (`clsx` + `tailwind-merge`): `className={cn("base-class", isActive && "active-class")}`
- Avoid writing raw CSS unless defining critical global animations, `glassmorphism`, or configuring raw CSS variables.

## Documentation and Comments

- Comment complex math or physics algorithms prominently.
- Add small docstrings to shared hooks like `useKonami.js` to define expected outputs.
