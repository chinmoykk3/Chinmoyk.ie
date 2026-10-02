# AI Agents Workflow

This file helps standardize how AI agents like me interact with the repository.

## Capabilities & Workflows

- **Automatic Code Generation:** Allowed to create components, hooks, and documentation files directly.
- **Console Validation:** Agents must run local development servers internally to check for terminal errors.
- **Aesthetic Refinement:** If implementing design, agents should prioritize the "Midnight Neon" theme, applying CSS variable colors and robust gradients.

## Command Execution

- Run `npm run dev` to test the application state.
- If dependencies are missing, the agent has clearance to automatically install them via `npm install <package>`.

## File Tracking Strategy

Agents rely heavily on `docs/brain.md` to know what to implement next. Before starting a new phase, an agent must mark checkboxes as `[x]` to maintain a clear trail of thought.
