import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Command, Menu, X } from "lucide-react";

const links = [
    { name: "About", path: "/#about" },
    { name: "Projects", path: "/#projects" },
    { name: "Skills", path: "/#skills" },
    { name: "Experience", path: "/#experience" },
    { name: "Contact", path: "/#contact" },
];

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const location = useLocation();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Calculate scroll progress for top bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress((winScroll / height) * 100);

            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setScrolled(currentScrollY > 50);
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Use Lenis for smooth anchor clicking if available
    const handleNavClick = (e, path) => {
        if (path.startsWith("/#") && window.lenis) {
            if (location.pathname === "/") {
                e.preventDefault();
                const target = document.querySelector(path.replace("/", ""));
                if (target) {
                    window.lenis.scrollTo(target);
                    setMobileMenuOpen(false);
                }
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}
            >
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

                <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center">

                    <Link to="/" className="text-2xl font-heading font-bold text-gradient z-50" data-cursor="hover">
                        JD.
                    </Link>

                    {/* Desktop Nav */}
                    <div className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? "glass" : ""}`}>
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                onClick={(e) => handleNavClick(e, link.path)}
                                className="relative px-4 py-2 text-sm font-medium text-muted hover:text-text transition-colors"
                                data-cursor="hover"
                            >
                                {link.name}
                                {/* Active indicator logic would go here if tracking current section */}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-surface-2 transition-colors relative text-muted hover:text-secondary"
                            aria-label="Toggle Theme"
                            data-cursor="hover"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-2 hover:border-primary transition-colors text-xs font-mono text-muted"
                            data-cursor="hover"
                            onClick={() => {
                                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                                document.dispatchEvent(event);
                            }}
                        >
                            <Command size={14} /> <span>K</span>
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 text-text p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-30 bg-bg flex flex-col items-center justify-center gap-8 px-6"
                    >
                        {links.map((link, i) => (
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={link.name}
                                href={link.path}
                                onClick={(e) => handleNavClick(e, link.path)}
                                className="text-4xl font-heading font-bold text-text hover:text-secondary"
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-6 mt-8"
                        >
                            <button
                                onClick={toggleTheme}
                                className="p-4 rounded-full bg-surface-2 text-text"
                            >
                                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
