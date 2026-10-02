import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Cursor() {
    const [hidden, setHidden] = useState(true);
    const [cursorState, setCursorState] = useState("default"); // default, view, drag

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return; // Hide on touch

        setHidden(false);

        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest('a') || target.closest('button')) {
                setCursorState("hover");
            } else if (target.closest('[data-cursor="view"]')) {
                setCursorState("view");
            } else if (target.closest('[data-cursor="drag"]')) {
                setCursorState("drag");
            } else {
                setCursorState("default");
            }
        };

        const handleMouseDown = () => setCursorState("click");
        const handleMouseUp = () => setCursorState("default"); // Simplification.

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    if (hidden) return null;

    const variants = {
        default: { scale: 1, backgroundColor: "transparent", border: "1px solid var(--primary)", opacity: 1 },
        hover: { scale: 1.5, backgroundColor: "transparent", border: "1px solid var(--secondary)", opacity: 0.8 },
        view: { scale: 2.5, backgroundColor: "var(--primary)", border: "none", opacity: 0.9 },
        drag: { scale: 2.5, backgroundColor: "var(--highlight)", border: "none", opacity: 0.9 },
        click: { scale: 0.8, backgroundColor: "var(--secondary)", border: "none", opacity: 1 },
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-secondary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: cursorX.get() + 16,
                    top: cursorY.get() + 16
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-40 flex items-center justify-center text-[10px] font-mono text-bg uppercase font-bold tracking-widest"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                variants={variants}
                animate={cursorState}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {cursorState === "view" && "View"}
                {cursorState === "drag" && "Drag"}
            </motion.div>
        </>
    );
}
