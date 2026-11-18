# Content Placeholders Checklist & Guide

This directory is the single source of truth for all structured narrative and technical content across **"A STORY STILL UNFOLDING — The Story of Chinmoy Kalita"**.

Per the core project rules:

> **RULE:** Never invent personal facts, clients, dates, metrics, or project outcomes. All unknown content must be a clearly marked placeholder (e.g. `[TODO: ...]`) stored in `/content` files. Narration text provided is DRAFT and editable.

Below is the complete registry of every placeholder you must fill to replace draft/stub data with verified facts.

---

## 1. `chapters.ts` (Narrative Documentary Flow & Sunrise-Ramp Accents)

The documentary arc follows: **Curiosity → Discovery → Experimentation → Creation → Expression → Exploration → Growth → Possibility**.
Accents: `prologue=gold, 01=gold, 02=all, 03=azure, 04=rose, 05=iris, 06=gold-ember, 07=ember, epilogue=sunrise`.

- [ ] **Prologue (Curiosity · gold)**:
  - `narration[1].text`: Replace `[TODO: Add personal opening memory/reflection about early fascination with machines, computers, or problem-solving]` with your authentic opening reflection.
- [ ] **Chapter 01 (Discovery · gold)**:
  - `narration[1].text`: Replace `[TODO: Add personal milestone: first language learned, first tool built, or pivotal discovery moment]` with your real first coding milestone and dates.
- [ ] **Chapter 02 (Experimentation · all)**:
  - `narration[1].text`: Replace `[TODO: Add specific experimental projects, early hackathons, or exploratory prototypes]` with early hacks and prototypes you built.
- [ ] **Chapter 03 (Creation · azure)**:
  - `narration[1].text`: Replace `[TODO: Detail the shift into full-stack development, early system designs, and community platforms]` with your experience architecting real end-to-end systems.
- [ ] **Chapter 04 (Expression · rose)**:
  - `narration[1].text`: Replace `[TODO: Add personal insights on design systems, 3D interaction, spatial design, and typography craft]` with your design philosophy.
- [ ] **Chapter 05 (Exploration · iris)**:
  - `narration[1].text`: Replace `[TODO: Highlight exploration in AI systems, decentralization (Sahyog Cryptos), or regional data platforms (IRDMS Assam)]` with the impetus for venturing into Web3/AI/GovTech.
- [ ] **Chapter 06 (Growth · gold-ember)**:
  - `narration[1].text`: Replace `[TODO: Add lessons from shipping institutional software like GCU Campus Flow or public systems]` with real user metrics, organizational friction, and scale lessons.
- [ ] **Chapter 07 (Possibility · ember)**:
  - `narration[1].text`: Replace `[TODO: Detail Chinmoy’s current research focus, active hypotheses, and next-generation ambitions]` with your active vision.
- [ ] **Epilogue (Possibility · sunrise)**:
  - `narration[1].text`: Replace `[TODO: Add personal closing sign-off from Chinmoy Kalita]` with your closing thoughts and call to collaborate.

---

## 2. `projects.ts` (10-Point Engineering Framework)

For each seed project below, fill out the 10-point framework:

1. `idea` · 2. `problem` · 3. `motivation` · 4. `vision` · 5. `contribution` · 6. `process` · 7. `stack` · 8. `challenges` · 9. `outcomes` · 10. `lessons`

### A. Sahyog Cryptos

- [ ] `year`: Actual creation year/dates.
- [ ] `status`: Change from `'prototype'` to `'completed'` or `'in-progress'` as accurate.
- [ ] `framework.idea`: Core premise of Sahyog Cryptos.
- [ ] `framework.problem`: Specific friction in crypto-asset management.
- [ ] `framework.motivation`: Why you initiated this build.
- [ ] `framework.vision`: Long-term decentralized collective vision.
- [ ] `framework.contribution`: Exactly what you authored/engineered.
- [ ] `framework.process`: How you designed and tested it.
- [ ] `framework.stack`: Actual chain, libraries, node providers, and frontend stack.
- [ ] `framework.challenges`: Technical obstacles (gas, consensus, re-entrancy, etc.).
- [ ] `framework.outcomes`: Real verifiable results, user feedback, or benchmarks — DO NOT INVENT.
- [ ] `framework.lessons`: Takeaways regarding blockchain/smart contract development.
- [ ] `links.github` / `links.demo`: URLs if public.
- [ ] Toggle `isPlaceholder: false` once verified.

### B. Librarium 2.0

- [ ] `year`: Actual year/dates.
- [ ] `status`: Verify real status (`'completed'` | `'in-progress'` | `'prototype'`).
- [ ] `framework.idea`: Specific library information architecture concept.
- [ ] `framework.problem`: Legacy institutional library inefficiencies addressed.
- [ ] `framework.motivation`: What sparked the rebuild for 2.0.
- [ ] `framework.vision`: Modern digital resource ecosystem vision.
- [ ] `framework.contribution`: Your personal backend, schema, and interface code.
- [ ] `framework.process`: Database design, indexing, and deployment methodology.
- [ ] `framework.stack`: Exact DB (PostgreSQL/Supabase/etc.) and indexing tech.
- [ ] `framework.challenges`: Concurrency, catalog querying, or physical asset tagging.
- [ ] `framework.outcomes`: Real adoption numbers, catalog count, or deployment status — DO NOT INVENT.
- [ ] `framework.lessons`: Architecture and relational schema takeaways.
- [ ] `links.github` / `links.demo`: URLs.
- [ ] Toggle `isPlaceholder: false` once verified.

### C. GCU Campus Flow

- [ ] `year`: Actual development year/dates.
- [ ] `status`: Verify status (`'completed'` | `'in-progress'` | `'prototype'`).
- [ ] `framework.idea`: Exact scope of campus workflows handled.
- [ ] `framework.problem`: Specific administrative friction at Girijananda Chowdhury University (GCU).
- [ ] `framework.motivation`: Personal catalyst for addressing campus operations.
- [ ] `framework.vision`: Vision for integrated campus digital services.
- [ ] `framework.contribution`: Architecture, roles/permissions, frontend vs backend authorship.
- [ ] `framework.process`: Campus user feedback cycles and deployment steps.
- [ ] `framework.stack`: Exact backend, database, and auth stack used.
- [ ] `framework.challenges`: Role hierarchy, security, or non-technical user UX friction.
- [ ] `framework.outcomes`: Verified user numbers, faculty adoption, or pilot milestones — DO NOT INVENT.
- [ ] `framework.lessons`: Takeaways on building mission-critical institutional software.
- [ ] `links.github` / `links.demo`: URLs.
- [ ] Toggle `isPlaceholder: false` once verified.

### D. IRDMS Assam (Integrated Resource & Disaster Management System)

- [ ] `year`: Actual project year/dates.
- [ ] `status`: Verify status (`'completed'` | `'in-progress'` | `'prototype'`).
- [ ] `framework.idea`: Exact disaster relief/resource scope for Assam.
- [ ] `framework.problem`: Regional communication and disaster supply chain bottlenecks.
- [ ] `framework.motivation`: Personal motivation for regional disaster resilience tech.
- [ ] `framework.vision`: Vision for civic technology in high-vulnerability regions.
- [ ] `framework.contribution`: GIS mapping, reporting portal, or dispatch coordination work.
- [ ] `framework.process`: Field research, wireframing, API and map tile integration.
- [ ] `framework.stack`: Geospatial libraries (Leaflet/Mapbox/OpenLayers) and real-time backend.
- [ ] `framework.challenges`: Low-bandwidth connectivity, data verification under duress.
- [ ] `framework.outcomes`: Pilot tests, demo evaluations, or agency presentations — DO NOT INVENT.
- [ ] `framework.lessons`: Takeaways on resilient, fail-safe civic software engineering.
- [ ] `links.github` / `links.demo`: URLs.
- [ ] Toggle `isPlaceholder: false` once verified.

---

## 3. `beyond.ts` (Forward Horizons)

- [ ] `ambient-agentic-intelligence`: Detail current experiments in local agent orchestration or WASM inference.
- [ ] `resilient-civic-software`: Add specific research notes regarding disaster protocols and regional GIS topologies.
- [ ] `beyond-personal-hypothesis`: Add your personal open research bet or hypothesis for the coming years.

---

## 4. `designWork.ts` (Design Systems & Spatial UI)

- [ ] **GCU Campus Flow UX Architecture**: Real user journey description, confirmed tools, and artifacts.
- [ ] **IRDMS Emergency Response Interface**: Map UI, crisis notification layouts, and tools.
- [ ] **Spatial & 3D Interactive Explorations**: Three.js shaders, 3D models, or Blender deliverables.

---

## 5. `aiWork.ts` (AI Systems & Research)

- [ ] **`completed`**: Replace `completed-ai-placeholder-1` with your actual shipped AI projects or benchmarked models.
- [ ] **`experiments`**: Replace `experiment-ai-placeholder-2` with active experimental agentic or LLM prototypes.
- [ ] **`learning`**: Replace `learning-ai-placeholder-3` with specific neural network / deep learning topics in your study queue.
- [ ] **`future`**: Replace `future-ai-placeholder-4` with speculative hypotheses and research bets.

---

## 6. `timeline.ts` (Milestone Dates)

- [ ] Add authentic calendar years or academic years for all 8 stages from Curiosity to Present.
- [ ] Update `details` for each milestone with genuine personal turning points.

---

## 7. `contact.ts` (Identity & Channels)

- [ ] `location`: Confirm exact city/state in Assam, India.
- [ ] `currentRoleOrStatus`: Your exact current title (e.g. Software Engineer, Student, Researcher).
- [ ] `socials`:
  - GitHub profile URL and handle.
  - LinkedIn profile URL.
  - X / Twitter profile URL.
  - Confirm public contact email preference (`chinmoykk3@gmail.com`).
