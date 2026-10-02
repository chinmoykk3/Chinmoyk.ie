import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import projectsData from "../../data/projects";
import { X, ExternalLink, Code, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index, onOpen }) => {
    const cardRef = useRef(null);

    // 3D Tilt effect
    const handleMouseMove = (e) => {
        if (!cardRef.current || window.matchMedia("(hover: none)").matches) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(cardRef.current, {
            rotateY: x * 16,
            rotateX: -y * 16,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <motion.div
            layoutId={`card-container-${project.slug}`}
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3) }}
            onClick={() => onOpen(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="view"
            className="md:w-[500px] w-[85vw] flex-shrink-0 cursor-pointer group rounded-3xl overflow-hidden glass relative transform-gpu hover:shadow-[0_0_30px_rgba(124,92,255,0.3)] transition-shadow duration-300"
        >
            <motion.div layoutId={`card-image-${project.slug}`} className="w-full h-[60%] overflow-hidden bg-surface-2">
                <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-110"
                />
            </motion.div>
            <div className="p-8 h-[40%] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <motion.h3 layoutId={`card-title-${project.slug}`} className="text-2xl font-heading font-bold text-text group-hover:text-secondary transition-colors">
                            {project.title}
                        </motion.h3>
                        <span className="text-xs font-mono text-muted">0{index + 1}/06</span>
                    </div>
                    <p className="text-muted line-clamp-2">{project.tagline}</p>
                </div>
                <div className="flex gap-2 flex-wrap mt-4">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-mono text-text bg-surface-2 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const CaseStudyOverlay = ({ project, onClose }) => {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (window.lenis) window.lenis.stop();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            if (window.lenis) window.lenis.start();
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" onClick={onClose} />

            {/* Modal Content */}
            <motion.div
                layoutId={`card-container-${project.slug}`}
                className="bg-surface border border-border w-full max-w-5xl h-full max-h-[90vh] rounded-3xl overflow-y-auto overflow-x-hidden relative flex flex-col z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 bg-bg/50 p-2 rounded-full border border-border hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                    <X size={24} className="text-text" />
                </button>

                <motion.div layoutId={`card-image-${project.slug}`} className="w-full h-[40vh] md:h-[50vh] flex-shrink-0 relative">
                    <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </motion.div>

                <div className="p-8 md:p-12 -mt-20 relative z-10 font-sans">
                    <motion.h2 layoutId={`card-title-${project.slug}`} className="text-4xl md:text-6xl font-heading font-extrabold mb-4 drop-shadow-md">
                        {project.title}
                    </motion.h2>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-secondary mb-12">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                        <div className="flex-1" />
                        <div className="flex gap-4">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <ExternalLink size={16} /> Live
                                </a>
                            )}
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Code size={16} /> Code
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-muted">
                        <div className="md:col-span-2 space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold text-text mb-4">The Problem</h3>
                                <p className="text-lg leading-relaxed">{project.problem || project.tagline}</p>
                            </section>

                            {project.process?.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-text mb-6">The Process</h3>
                                    <div className="space-y-8">
                                        {project.process.map((step, i) => (
                                            <div key={i} className="glass p-6 rounded-2xl relative">
                                                <span className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-primary text-bg flex items-center justify-center font-bold">
                                                    {i + 1}
                                                </span>
                                                <h4 className="text-xl font-bold text-text mb-2">{step.title}</h4>
                                                <p>{step.description}</p>
                                                {step.image && (
                                                    <img src={step.image} alt={step.title} className="w-full h-48 object-cover rounded-xl mt-4 opacity-80" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-xl font-bold text-text mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-surface-2 border border-border px-3 py-1.5 rounded-lg text-sm">{tag}</span>
                                    ))}
                                </div>
                            </section>

                            {project.features?.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-text mb-4">Key Features</h3>
                                    <ul className="space-y-3">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex gap-3">
                                                <ArrowRight size={18} className="text-primary shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Projects() {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = projectsData.filter(p => filter === "All" || p.category === filter);

    useEffect(() => {
        // Only apply horizontal GSAP scroll on desktop
        const matchMedia = gsap.matchMedia();

        matchMedia.add("(min-width: 768px)", () => {
            // Small timeout to ensure DOM is ready and images are somewhat loaded
            const ctx = gsap.context(() => {
                const sections = gsap.utils.toArray(scrollRef.current.children);

                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (sections.length - 1),
                        // Adjust the scrolling distance based on number of cards
                        end: () => "+=" + scrollRef.current.offsetWidth
                    }
                });
            }, containerRef);

            return () => ctx.revert();
        });

        return () => matchMedia.revert();
    }, [filteredProjects]);

    return (
        <>
            <section id="projects" className="relative min-h-screen bg-bg" ref={containerRef}>
                <div className="absolute top-20 left-6 md:left-12 z-20 w-fit">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 flex items-center gap-4">
                        <span className="text-secondary font-mono text-xl">02.</span> Selected Work
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(c => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${filter === c ? "bg-primary text-white" : "bg-surface-2 text-muted hover:text-text"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal scrolling track container */}
                <div className="h-screen flex items-center pt-32 overflow-hidden px-6 md:px-12 w-full">
                    <motion.div
                        layout
                        className="flex gap-6 md:gap-12 w-max"
                        ref={scrollRef}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    index={index}
                                    onOpen={setActiveProject}
                                />
                            ))}
                        </AnimatePresence>

                        {/* 1 empty block to buffer end of scroll */}
                        <div className="md:w-[200px] w-0 flex-shrink-0" />
                    </motion.div>
                </div>
            </section>

            {/* Shared Element Overlay */}
            <AnimatePresence>
                {activeProject && (
                    <CaseStudyOverlay
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
