import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import experienceData from "../../data/experience";
import { Download, Briefcase, MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        // Draw the center line
        const ctx = gsap.context(() => {
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="py-32 relative bg-surface-2" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-4">
                        <span className="text-secondary font-mono text-xl">04.</span> Experience
                    </h2>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-text font-bold hover:bg-white hover:text-black transition-colors"
                        data-cursor="hover"
                    >
                        <Download size={20} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
                        Download Résumé
                    </a>
                </div>

                <div className="relative">
                    {/* Timeline Center Line (Desktop only mostly) */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
                        <div
                            ref={lineRef}
                            className="absolute top-0 left-0 w-full h-full bg-secondary origin-top"
                        />
                    </div>

                    <div className="space-y-24">
                        {experienceData.map((job, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={job.id} className={`relative flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                    {/* Glowing Node */}
                                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-surface border-4 border-secondary -translate-x-1/2 flex items-center justify-center z-10 
                                  shadow-[0_0_15px_rgba(198,255,61,0.6)]">
                                        <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                                    </div>

                                    {/* Empty space for alternating layout on desktop */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-16 md:pl-0">
                                        <div className={isEven ? "md:pr-16" : "md:pl-16"}>
                                            <div className="glass p-8 rounded-3xl hover:border-primary/50 transition-colors duration-300">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <Briefcase size={20} className="text-secondary" />
                                                    <h3 className="text-2xl font-bold font-heading">{job.role}</h3>
                                                </div>
                                                <div className="text-xl font-bold text-primary mb-4">{job.company}</div>

                                                <div className="flex flex-wrap gap-4 text-sm font-mono text-muted mb-6">
                                                    <span className="flex items-center gap-1"><Calendar size={14} />{job.dates}</span>
                                                    <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                                                </div>

                                                <ul className="space-y-4 text-muted mb-8 text-[15px]">
                                                    {job.achievements.map((ach, i) => (
                                                        <li key={i} className="flex gap-3">
                                                            <span className="text-secondary opacity-50 mt-1">▹</span>
                                                            {ach}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.tech.map(t => (
                                                        <span key={t} className="px-3 py-1 bg-surface-2 border border-white/5 rounded-full text-xs font-mono text-text/80">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
