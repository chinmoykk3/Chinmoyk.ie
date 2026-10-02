import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import skillsData from "../../data/skills";

// Fallback logic for Skills Constellation (pure Framer Motion grid)
export function Skills() {
    const [viewMode, setViewMode] = useState("graph"); // "graph" or "list"
    const [filter, setFilter] = useState("All");
    const categories = ["All", ...new Set(skillsData.map(s => s.category))];

    const filteredSkills = skillsData.filter(s => filter === "All" || s.category === filter);

    return (
        <section id="skills" className="py-24 relative max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-4">
                    <span className="text-secondary font-mono text-xl">03.</span> Toolset
                </h2>

                <div className="flex gap-2 bg-surface p-1 rounded-full border border-border">
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${viewMode === 'graph' ? 'bg-primary text-white' : 'text-muted'}`}
                        onClick={() => setViewMode("graph")}
                    >
                        Graph
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted'}`}
                        onClick={() => setViewMode("list")}
                    >
                        List
                    </button>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-12">
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${filter === c ? "bg-white text-black" : "glass text-muted hover:text-text"
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {viewMode === "graph" ? (
                <div className="w-full min-h-[500px] glass rounded-3xl relative overflow-hidden flex flex-wrap content-start p-8 gap-4">
                    {/* Simple Animated Grid Simulation of a graph */}
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            layout
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            className="flex items-center justify-center p-4 rounded-full bg-surface-2 border border-border cursor-pointer group hover:border-secondary hover:shadow-[0_0_20px_rgba(198,255,61,0.2)]"
                        >
                            <div className="text-center">
                                <div className="font-bold text-text group-hover:text-secondary mb-1">{skill.label}</div>
                                <div className="text-[10px] font-mono uppercase text-muted group-hover:text-primary">Lvl {skill.level} / {skill.years}Y</div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="absolute bottom-6 right-6 text-xs font-mono text-muted/50 max-w-xs text-right">
                        Hover over nodes to see proficiency. Connections omitted in accessibility grid mode.
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.filter(c => c !== "All").map(cat => (
                        (filter === "All" || filter === cat) && (
                            <div key={cat} className="glass p-6 rounded-2xl">
                                <h3 className="text-xl font-bold font-heading mb-6 pb-4 border-b border-white/5">{cat}</h3>
                                <ul className="space-y-4">
                                    {skillsData.filter(s => s.category === cat).map(skill => (
                                        <li key={skill.id} className="flex justify-between items-center group">
                                            <span className="font-medium text-muted group-hover:text-text transition-colors">{skill.label}</span>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-full ${i < skill.level ? 'bg-primary' : 'bg-surface-2'}`} />
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
            )}
        </section>
    );
}
