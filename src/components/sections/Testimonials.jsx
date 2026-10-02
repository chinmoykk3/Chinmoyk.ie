import { motion } from "framer-motion";
import testimonialsData from "../../data/testimonials";
import { Quote } from "lucide-react";

export function Testimonials() {
    return (
        <section className="py-24 bg-bg overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-3xl font-heading font-bold flex items-center gap-4">
                    People saying nice things
                </h2>
            </div>

            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll group-hover:pause">
                    {[...testimonialsData, ...testimonialsData].map((test, idx) => (
                        <li key={idx} className="w-[350px] md:w-[450px] flex-shrink-0">
                            <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between" data-cursor="drag">
                                <div>
                                    <Quote size={24} className="text-primary/50 mb-4" />
                                    <p className="text-lg leading-relaxed text-text mb-8">"{test.quote}"</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full object-cover grayscale opacity-80" />
                                    <div>
                                        <div className="font-bold font-heading">{test.name}</div>
                                        <div className="text-xs font-mono text-muted">{test.role}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <style>{`
        .animate-infinite-scroll {
          animation: slide 30s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 2)); }
        }
      `}</style>
        </section>
    );
}
