import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useTheme } from "../../hooks/useTheme";
import siteData from "../../data/site";
import { Home, Folder, User, Terminal, Mail, Moon, Sun, Hash, Code, Briefcase, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command) => {
        setOpen(false);
        command();
    };

    const scrollTo = (hash) => {
        if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                if (window.lenis) {
                    const el = document.querySelector(hash);
                    if (el) window.lenis.scrollTo(el);
                }
            }, 500);
        } else {
            if (window.lenis) {
                const el = document.querySelector(hash);
                if (el) window.lenis.scrollTo(el);
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" onClick={() => setOpen(false)} />

            <div className="relative w-full max-w-2xl bg-surface border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(124,92,255,0.2)] flex flex-col">
                <Command label="Command Menu" className="w-full flex-grow flex flex-col">
                    <Command.Input
                        autoFocus
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent p-6 outline-none text-text text-xl font-mono border-b border-border placeholder:text-muted"
                    />
                    <Command.List className="overflow-y-auto p-4 max-h-[50vh] text-muted">
                        <Command.Empty className="p-8 text-center text-muted font-mono">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-mono uppercase tracking-widest mb-2 px-2">
                            <Command.Item
                                onSelect={() => runCommand(() => scrollTo("#hero"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Home size={18} /> Go to Home
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => scrollTo("#about"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <User size={18} /> About Me
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => scrollTo("#projects"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Folder size={18} /> View Projects
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => scrollTo("#contact"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Mail size={18} /> Contact
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Actions" className="text-xs font-mono uppercase tracking-widest mb-2 px-2 mt-4">
                            <Command.Item
                                onSelect={() => runCommand(toggleTheme)}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => navigator.clipboard.writeText(siteData.email))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Copy size={18} /> Copy Email Address
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => {
                                    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                                    // Simulate easter egg cheat code visually or just trigger confetti
                                    import('canvas-confetti').then((module) => {
                                        const confetti = module.default;
                                        confetti({ particleCount: 100, origin: { y: 0.2 }, colors: ['#FF6B57', '#C6FF3D'] });
                                    });
                                })}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-primary cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-primary"
                            >
                                <Terminal size={18} /> Run Diagnostics (Easter Egg)
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Socials" className="text-xs font-mono uppercase tracking-widest mb-2 px-2 mt-4">
                            <Command.Item
                                onSelect={() => runCommand(() => window.open(siteData.github, "_blank"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Code size={18} /> GitHub
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open(siteData.twitter, "_blank"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Hash size={18} /> Twitter
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open(siteData.linkedin, "_blank"))}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-2 hover:text-text cursor-pointer transition-colors aria-selected:bg-surface-2 aria-selected:text-white"
                            >
                                <Briefcase size={18} /> LinkedIn
                            </Command.Item>
                        </Command.Group>

                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
