const skills = [
    { id: "react", label: "React", category: "Frontend", level: 5, years: 5, related: ["nextjs", "framer"], projects: ["nebula-analytics"] },
    { id: "nextjs", label: "Next.js", category: "Frontend", level: 4, years: 3, related: ["react", "tailwind"], projects: ["chronos-editor"] },
    { id: "three", label: "Three.js", category: "Frontend", level: 3, years: 2, related: ["react", "webgl"], projects: ["nebula-analytics"] },
    { id: "gsap", label: "GSAP", category: "Frontend", level: 4, years: 3, related: ["framer", "css"], projects: [] },
    { id: "tailwind", label: "TailwindCSS", category: "Frontend", level: 5, years: 4, related: ["css", "react"], projects: ["synth-wave-ds"] },

    { id: "nodejs", label: "Node.js", category: "Backend", level: 4, years: 4, related: ["express", "python"], projects: ["echo-social"] },
    { id: "python", label: "Python", category: "Backend", level: 3, years: 2, related: ["nodejs"], projects: ["nebula-analytics"] },
    { id: "redis", label: "Redis", category: "Backend", level: 3, years: 2, related: ["nodejs"], projects: ["nebula-analytics"] },

    { id: "figma", label: "Figma", category: "Design", level: 5, years: 4, related: ["uiux"], projects: ["synth-wave-ds"] },
    { id: "uiux", label: "UI/UX", category: "Design", level: 4, years: 4, related: ["figma"], projects: ["synth-wave-ds"] },

    { id: "git", label: "Git", category: "Tools", level: 5, years: 5, related: [], projects: [] },
    { id: "vite", label: "Vite", category: "Tools", level: 4, years: 2, related: ["react"], projects: [] }
];

export default skills;
