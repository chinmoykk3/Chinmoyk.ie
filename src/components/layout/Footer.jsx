import { useState, useEffect } from "react";
import siteData from "../../data/site";
import { Rocket } from "lucide-react";

export function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            // Create formatter in given timezone
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: siteData.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(formatter.format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="w-full bg-bg py-10 overflow-hidden border-t border-border mt-auto">

            {/* Big Marquee */}
            <div className="w-full overflow-hidden mb-16 whitespace-nowrap rotate-[-2deg] scale-105 origin-center opacity-10 pointer-events-none">
                <h2 className="text-[120px] md:text-[200px] font-heading font-extrabold uppercase text-transparent stroke-text"
                    style={{ WebkitTextStroke: '1px var(--text)' }}>
                    {siteData.name} • {siteData.name} • {siteData.name} •
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex flex-col items-center md:items-start">
                    <span className="font-heading font-bold text-lg text-text">© {new Date().getFullYear()} {siteData.name}</span>
                    <span className="text-sm font-mono text-muted mt-1">Built with React, coffee, and questionable sleep habits.</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="px-4 py-2 border border-border rounded-full text-xs font-mono text-muted flex items-center gap-2 glass">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        {siteData.location} Time: {time}
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full bg-primary text-bg flex items-center justify-center shadow-lg hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(124,92,255,0.4)] transition-all"
                        aria-label="Back to top"
                        data-cursor="hover"
                    >
                        <Rocket size={20} />
                    </button>
                </div>

            </div>
        </footer>
    );
}
