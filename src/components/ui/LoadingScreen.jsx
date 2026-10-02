import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
    "Warming up the thrusters...",
    "Calibrating neon levels...",
    "Establishing secure connection...",
    "Mission control is online."
];

export function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            onComplete();
            return;
        }

        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        sessionStorage.setItem("hasVisited", "true");
                        onComplete();
                    }, 600);
                    return 100;
                }
                return p + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);

        const msgInterval = setInterval(() => {
            setMsgIndex(i => (i + 1) % messages.length);
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(msgInterval);
        };
    }, [onComplete]);

    if (sessionStorage.getItem("hasVisited")) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ y: "-100vh", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
            >
                <div className="w-64 flex flex-col items-center">
                    <div className="text-secondary font-mono text-4xl mb-8 font-bold">
                        {Math.min(progress, 100)}%
                    </div>

                    <div className="w-full h-px bg-surface-2 overflow-hidden mb-4 relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    <motion.div
                        key={msgIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-muted font-mono text-xs uppercase tracking-widest h-4"
                    >
                        {messages[msgIndex]}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
