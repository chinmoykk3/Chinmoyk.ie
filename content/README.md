# Content Architecture & Verification Registry

This directory is the strict, single source of truth for all structured narrative and technical content in **"A STORY STILL UNFOLDING — The Story of Chinmoy Kalita"**.

---

## 1. Core Content Invariants & Status System

Every text field in `/content` is strongly typed and Zod-validated with a status:

```typescript
export type ContentStatus = 'confirmed' | 'draft' | 'placeholder';

export interface ContentField {
  text: string;
  status: ContentStatus;
  note?: string;
}
```

### Rendering Rules:
1. **Production Mode (`NODE_ENV === 'production'`):**
   - `"confirmed"`: Always rendered.
   - `"draft"`: Rendered as verified authentic draft text from the brief.
   - `"placeholder"`: **Renders nothing** (`null`). Missing content is completely invisible.
2. **Development Mode (`NODE_ENV !== 'production'`):**
   - If `NEXT_PUBLIC_DEBUG_CONTENT=1`: Renders a minimal, quiet `<span class="... text-theme-muted">TODO</span>` chip.
   - Otherwise: Renders nothing.
3. **No Invented Text:**
   - Components MUST NOT declare inline strings for documentary narration or personal claims.
   - All text rendered via the `<Content value={...} />` component.
   - Enforced by ESLint rule `content/no-raw-narration`.

---

## 2. Chapters & Documentary Flow

The documentary follows the narrative progression:
**Curiosity → Discovery → Experimentation → Creation → Expression → Exploration → Growth → Possibility**

Accents map to the Sunrise Ramp:
- `prologue` (gold): "Every Story Has a Name"
- `chapter-01` (gold): "It Started With Curiosity"
- `chapter-02` (all 4 converging): "I Found More Than One World"
- `chapter-03` (azure): "I Wanted To Build Something Real"
- `chapter-04` (rose): "Another Language Called Design"
- `chapter-05` (iris): "The World of Intelligence"
- `chapter-06` (gold-ember): "The Making of Me"
- `chapter-07` (ember): "Beyond the Work" *(Auto-hides if beyond.ts is empty)*
- `epilogue` (sunrise): "The Story Is Still Being Written"

---

## 3. Pending Placeholders Checklist (Grouped by Chapter)

Run `npm run content:report` anytime to see a real-time status summary.

### Prologue: "Every Story Has a Name" (gold)
- [ ] Sound: Custom audio bed or master (`content/sound.ts`)

### Chapter 01: "It Started With Curiosity" (gold)
- [ ] Curiosity Slot 1: What first sparked curiosity (`content/chapters.ts`)
- [ ] Curiosity Slot 2: A first thing I built (`content/chapters.ts`)
- [ ] Curiosity Slot 3: What keeps me experimenting (`content/chapters.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)
- [ ] Director's Commentary: Personal reflection note (`content/commentary.ts`)

### Chapter 02: "I Found More Than One World" (all)
- [ ] Director's Commentary: Note on multidisciplinary craft vs specialization (`content/commentary.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Chapter 03: "I Wanted To Build Something Real" (azure)
- [ ] Chapter Narration: Authentic reflection on building real-world full-stack architectures (`content/narration.ts`)
- [ ] Project: **Sahyog Cryptos** (`content/projects.ts`):
  - [ ] Set `status` from `'unknown'` to real status
  - [ ] 10-Point Framework: Problem, Motivation, Vision, Contribution, Process, Stack, Challenges, Outcomes, Lessons
- [ ] Project: **Librarium 2.0** (`content/projects.ts`):
  - [ ] Set `status` from `'unknown'` to real status
  - [ ] 10-Point Framework: Problem, Motivation, Vision, Contribution, Process, Stack, Challenges, Outcomes, Lessons
- [ ] Project: **GCU Campus Flow** (`content/projects.ts`):
  - [ ] Set `status` from `'unknown'` to real status
  - [ ] 10-Point Framework: Problem, Motivation, Vision, Contribution, Process, Stack, Challenges, Outcomes, Lessons
- [ ] Project: **IRDMS Assam** (`content/projects.ts`):
  - [ ] Set `status` from `'unknown'` to real status
  - [ ] 10-Point Framework: Problem, Motivation, Vision, Contribution, Process, Stack, Challenges, Outcomes, Lessons
- [ ] Commentary: Engineering reflections for each project (`content/commentary.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Chapter 04: "Another Language Called Design" (rose)
- [ ] Chapter Narration: Reflection on design systems, typography, and visual craft (`content/narration.ts`)
- [ ] Design Work: Replace vector specimen graphics with authentic project exports (`content/designWork.ts`)
- [ ] Commentary: Note on visual design as equal discipline to systems (`content/commentary.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Chapter 05: "The World of Intelligence" (iris)
- [ ] Chapter Narration: Reflection on artificial intelligence, agents, and local inference (`content/narration.ts`)
- [ ] AI Work Completed: Real completed AI systems, papers, or tools (`content/aiWork.ts`)
- [ ] AI Stack Confirmation: Verified models and frameworks (`content/aiWork.ts`)
- [ ] Commentary: Shift from API calls to autonomous local architectures (`content/commentary.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Chapter 06: "The Making of Me" (gold-ember)
- [ ] Chapter Narration: Reflection on shipping institutional software at scale (`content/narration.ts`)
- [ ] Scale Metrics: Verified throughput, user count, or uptime facts (`content/chapters.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Chapter 07: "Beyond the Work" (ember)
- [ ] Chapter Narration: Reflection on research frontiers and future bets (`content/narration.ts`)
- [ ] Beyond Items: Current research notes and personal engineering hypotheses (`content/beyond.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

### Epilogue: "The Story Is Still Being Written" (sunrise)
- [ ] Contact Location: Exact city/region in Assam (`content/contact.ts`)
- [ ] Current Role / Engineer Title: Authentic headline (`content/contact.ts`)
- [ ] What I Want To Become / Build / Ambitions: Authenticated aspirations (`content/contact.ts`)
- [ ] Social URLs: Verified GitHub, LinkedIn, X handles (`content/contact.ts`)
- [ ] Commentary: Final closing director's reflection (`content/commentary.ts`)
- [ ] Sound: Custom audio track (`content/sound.ts`)

---

## 4. How to Update Content
To fill any item:
1. Open the corresponding file in `/content/`.
2. Replace `placeholder('...')` with `draft('...')` or `confirmed('...')`.
3. Run `npm run content:report` to confirm resolution.
4. Run `npm run typecheck && npm run lint` to verify validation.
