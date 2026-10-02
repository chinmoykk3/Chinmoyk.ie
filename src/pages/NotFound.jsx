import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-center px-6 relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-10 pointer-events-none" />

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="z-10"
            >
                <h1 className="text-[120px] md:text-[200px] font-heading font-extrabold text-highlight mb-4 leading-none mix-blend-screen drop-shadow-[0_0_40px_rgba(255,107,87,0.5)]">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-heading font-bold text-text mb-6">
                    Houston, we have a problem.
                </h2>

                <p className="text-lg text-muted max-w-md mx-auto mb-10 font-mono">
                    The coordinates you entered don't exist in this quadrant of the web. The page might have been sucked into a black hole.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-black font-bold rounded-full hover:scale-105 transition-transform"
                    data-cursor="hover"
                >
                    <Rocket size={20} />
                    Return to Base
                </Link>
            </motion.div>
        </div>
    );
}
