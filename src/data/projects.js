const projects = [
    {
        slug: "nebula-analytics",
        title: "Nebula Analytics",
        tagline: "Real-time user clustering and attribution engine.",
        category: "Web",
        year: "2025",
        tags: ["React", "WebGL", "Python", "Redis"],
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
            "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "Data analysts were struggling with slow query times and uninspired visualizations when trying to understand real-time user flow across enterprise platforms.",
        process: [
            {
                title: "Architecting the Pipeline",
                description: "Implemented a Redis pub/sub queue to handle live data streams with minimal latency.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1280"
            },
            {
                title: "Building the Visualization Matrix",
                description: "Used Three.js to render a 3D node representation of user cohorts, allowing physical grouping based on interaction density."
            }
        ],
        features: [
            "Interactive 3D node graph for demographic clustering.",
            "Custom query language with real-time feedback.",
            "Automated PDF report generation engine."
        ],
        results: [
            { label: "Query Speed", value: "3x faster" },
            { label: "Daily Active Users", value: "12,000+" }
        ],
        liveUrl: "https://example.com/nebula",
        repoUrl: "https://github.com/example/nebula"
    },
    {
        slug: "aero-finance",
        title: "Aero Finance",
        tagline: "Frictionless mobile banking for modern nomads.",
        category: "Mobile",
        year: "2024",
        tags: ["React Native", "Zustand", "tRPC"],
        cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "Traditional banking apps are cluttered, slow, and fail to provide immediate context for international transactions.",
        process: [
            {
                title: "UX Research",
                description: "Conducted interviews with 50+ digital nomads to identify pain points in cross-border financial management."
            }
        ],
        features: [
            "Real-time currency conversion overlays.",
            "Receipt scanning via device camera.",
            "Biometric transaction approval."
        ],
        results: [
            { label: "App Store", value: "4.9 ★" },
            { label: "Transactions", value: "$2M+" }
        ],
        liveUrl: "https://example.com/aero",
        repoUrl: "https://github.com/example/aero"
    },
    {
        slug: "synth-wave-ds",
        title: "Synth UI",
        tagline: "A retro-futuristic component library.",
        category: "Design",
        year: "2024",
        tags: ["Figma", "Design Tokens", "React"],
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "Developers needed an out-of-the-box solution to build interfaces that looked like 1980s sci-fi movies, without compromising on accessibility.",
        process: [],
        features: [
            "Over 40 accessible components.",
            "Built-in CSS variable theming.",
            "Extensive Framer Motion integration for cyber-transitions."
        ],
        results: [
            { label: "NPM Downloads", value: "50k/mo" },
            { label: "GitHub Stars", value: "2,300" }
        ],
        liveUrl: "https://example.com/synth",
        repoUrl: "https://github.com/example/synth"
    },
    {
        slug: "chronos-editor",
        title: "Chronos",
        tagline: "Collaborative markdown editing in the browser.",
        category: "Web",
        year: "2023",
        tags: ["Next.js", "WebSockets", "TipTap"],
        cover: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "",
        process: [],
        features: [],
        results: [],
        liveUrl: "https://example.com/chronos",
        repoUrl: "https://github.com/example/chronos"
    },
    {
        slug: "luna-dashboard",
        title: "Luna",
        tagline: "Spacecraft telemetry visualization.",
        category: "Web",
        year: "2025",
        tags: ["Vue", "D3.js", "Tailwind"],
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "",
        process: [],
        features: [],
        results: [],
        liveUrl: "https://example.com/luna",
        repoUrl: "https://github.com/example/luna"
    },
    {
        slug: "echo-social",
        title: "Echo",
        tagline: "Decentralized audio sharing network.",
        category: "Mobile",
        year: "2023",
        tags: ["Swift", "Node.js", "IPFS"],
        cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1280",
        images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1280"
        ],
        problem: "",
        process: [],
        features: [],
        results: [],
        liveUrl: "https://example.com/echo",
        repoUrl: "https://github.com/example/echo"
    }
];

export default projects;
