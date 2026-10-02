# Security Guidelines

## Frontend Data Security

- **Static Content Only:** The portfolio does not maintain an active database, process payments, or store sensitive user data.
- **Local Storage:** `localStorage` is completely safe and is only used to store non-sensitive user preferences (e.g., `theme`).
- **Session Storage:** Used for `hasVisited` flags for the loading screen.

## Form Security

- **Data Validation:** `react-hook-form` + `zod` ensures that client-side form submissions are strongly validated before ever being dispatched.
- **Third-Party Services:** Contact form submissions will route through a stateless API email service (e.g., Formspree, Resend, or EmailJS) keeping keys on the client-side safe (often public keys with domain restrictions).
- **XSS Protection:** React mitigates cross-site scripting by default through string escaping. No `dangerouslySetInnerHTML` should be used unless dealing with strictly sanitized markdown content.

## Dependency Security

- Run `npm audit` frequently to check for vulnerable packages.
- Ensure all CI/CD pipelines use `npm ci` rather than `npm install` for deterministic dependency resolution.
