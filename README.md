# Chinmoy Kalita Portfolio (`Chinmoyk.ie`)

> **A Mind in Motion** — Three disciplines. One creative universe.
> Interactive editorial storytelling portfolio of **Chinmoy Kalita** (Full-stack Developer, AI Engineer & Graphic Designer).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
- **Motion & Kinetics**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/) & ScrollTrigger
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher (verified on `v24.20.0`)
- **npm**: `v9.0.0` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/chinmoykk3/Chinmoyk.ie.git
cd Chinmoyk.ie

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the optimized static application
npm run build

# Preview production build locally
npm run start
```

---

## 📁 Architecture Overview

```text
src/
  ├── animations/       # Framer Motion variants & GSAP easing definitions
  ├── app/              # Next.js App Router (layout, page, SEO metadata)
  ├── components/
  │   ├── chapters/     # Narrative sections (Disciplines, About)
  │   ├── gallery/      # Visual & computational exhibits
  │   ├── hero/         # Hero layout & interactive 3D WebGL sculpture
  │   ├── navigation/   # Header & responsive mobile drawer
  │   ├── projects/     # SAHYOG, LIBRARIUM & SHUTTERSCAPE showcases
  │   └── shared/       # Lenis smooth scroll provider, footer, utilities
  ├── data/             # Project and editorial data definitions
  ├── hooks/            # useReducedMotion, useMousePosition
  ├── lib/              # cn(), lerp(), clamp() utility functions
  ├── styles/           # Tailwind globals, editorial grain, custom scrollbar
  └── types/            # TypeScript schema definitions
public/
  ├── images/           # Images & authentic portrait directory
  ├── models/           # 3D GLTF/GLB models
  ├── textures/         # Shaders & environmental textures
  └── icons/            # SVG branding marks
```

For full project guidelines, creative constraints, and roadmap status, refer to [PROJECT_CONTEXT.md](file:///f:/chinmoyk.ie/Chinmoyk.ie/PROJECT_CONTEXT.md).
