import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ThreeBackground } from "../effects/ThreeBackground";
import siteData from "../../data/site";
import { MousePointer2 } from "lucide-react";

const Typewriter = ({ roles }) => {
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (isDeleting) {
            if (text.length > 0) {
                timeout = setTimeout(() => setText(text.slice(0, -1)), 50);
            } else {
                setIsDeleting(false);
                setRoleIndex((i) => (i + 1) % roles.length);
            }
        } else {
            if (text.length < currentRole.length) {
                timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 100);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex, roles]);

    return (
        <div className="text-xl md:text-3xl font-mono text-muted mb-8 h-10 flex items-center justify-center">
            <span>{text}</span>
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-8 bg-secondary ml-1"
            />
        </div>
    );
};

const PhysicsLetter = ({ letter }) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.span
            ref={ref}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            animate={hovered ? { scale: 1.15, y: -10, color: "var(--secondary)" } : { scale: 1, y: 0, color: "var(--text)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="inline-block transition-colors duration-200"
        >
            {letter === " " ? "\u00A0" : letter}
        </motion.span>
    );
};

export function Hero() {
    const letters = siteData.name.split("");

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <ThreeBackground />

            <div className="z-10 flex flex-col items-center text-center max-w-5xl px-6 relative">
                <div className="absolute top-10 left-10 md:-left-20 font-mono text-[10px] text-muted tracking-widest hidden md:block">
                    SYS.ONLINE<br />
                    LAT: 40.7128<br />
                    LONG: -74.0060
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 flex items-center gap-2 glass px-4 py-2 rounded-full"
                >
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-muted">Available for work</span>
                </motion.div>

                <h1 className="text-6xl md:text-[clamp(60px,10vw,160px)] font-heading font-extrabold leading-none tracking-tighter mb-4 text-text drop-shadow-[0_0_20px_rgba(124,92,255,0.2)]">
                    {letters.map((char, i) => (
                        <PhysicsLetter key={i} letter={char} />
                    ))}
                </h1>

                <Typewriter roles={siteData.roles} />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-xl text-text max-w-2xl mb-12 font-medium"
                >
                    {siteData.tagline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <a href="#projects" className="px-8 py-4 bg-secondary text-surface font-bold rounded-full hover:scale-105 transition-transform" data-cursor="hover">
                        View my work
                    </a>
                    <a href="#contact" className="px-8 py-4 border border-border text-text rounded-full hover:border-primary hover:text-primary transition-colors glass" data-cursor="hover">
                        Let's talk
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono tracking-widest text-muted uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-primary"
                >
                    <MousePointer2 size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}
