import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Matter from "matter-js";
import siteData from "../../data/site";
import { RefreshCw } from "lucide-react";

// The sticker board canvas
const StickerBoard = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const generateStickers = () => {
            const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;

            // Create engine
            const engine = Engine.create();
            engineRef.current = engine;
            engine.world.gravity.y = 1;

            // Create renderer
            const render = Render.create({
                element: sceneRef.current,
                engine: engine,
                options: {
                    width: sceneRef.current.clientWidth,
                    height: 400,
                    wireframes: false,
                    background: 'transparent',
                    pixelRatio: window.devicePixelRatio
                }
            });
            renderRef.current = render;

            const items = [
                "React", "Three.js", "Matter.js", "GSAP", "TailwindCSS", "Figma",
                "☕ 4 cups/day", "Spaceships", "Vim enjoyer"
            ];

            const bodies = items.map((text, i) => {
                const x = Math.random() * sceneRef.current.clientWidth * 0.8 + 50;
                const y = -(Math.random() * 500 + 100);

                // Approximating pill shapes with rectangles (Matter.js rounded rects need chamfer)
                return Bodies.rectangle(x, y, 120 + text.length * 5, 50, {
                    chamfer: { radius: 25 },
                    restitution: 0.8,
                    friction: 0.1,
                    render: {
                        fillStyle: i % 2 === 0 ? "#7C5CFF" : "#14141F", // primary or surface
                        strokeStyle: i % 2 === 0 ? "#7C5CFF" : "rgba(255,255,255,0.2)",
                        lineWidth: 1
                    },
                    label: text
                });
            });

            // Boundaries
            const width = sceneRef.current.clientWidth;
            const height = 400;
            const ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
            const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
            const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });

            World.add(engine.world, [...bodies, ground, leftWall, rightWall]);

            // Add mouse control
            const mouse = Mouse.create(render.canvas);
            const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false }
                }
            });

            // Fix scroll issue on touch devices for the canvas area
            mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
            mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

            World.add(engine.world, mouseConstraint);
            render.mouse = mouse;

            // Run
            Render.run(render);
            const runner = Runner.create();
            Runner.run(runner, engine);

            // Custom drawing for text (hacky but works for Matter.js native render)
            // better way is mapping Matter bodies to DOM elements, but for brevity we'll draw on the canvas context directly after render
            Matter.Events.on(render, 'afterRender', function () {
                const context = render.context;
                context.font = "bold 14px 'JetBrains Mono'";
                context.textAlign = "center";
                context.textBaseline = "middle";

                bodies.forEach(body => {
                    const { x, y } = body.position;
                    context.translate(x, y);
                    context.rotate(body.angle);

                    context.fillStyle = body.render.fillStyle === "#14141F" ? "#EDEDF5" : "#0B0B14";
                    context.fillText(body.label, 0, 0);

                    context.rotate(-body.angle);
                    context.translate(-x, -y);
                });
            });

            return () => {
                Render.stop(render);
                Runner.stop(runner);
                if (engineRef.current) {
                    Engine.clear(engineRef.current);
                    renderRef.current.canvas.remove();
                    renderRef.current.canvas = null;
                    renderRef.current.context = null;
                    renderRef.current.textures = {};
                }
            };
        };

        const cleanup = generateStickers();

        const handleResize = () => {
            cleanup();
            // small delay to let container resize
            setTimeout(() => generateStickers(), 100);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cleanup();
        };
    }, []);

    const shakeIt = () => {
        if (!engineRef.current) return;
        const bodies = Matter.Composite.allBodies(engineRef.current.world);
        bodies.forEach(body => {
            if (!body.isStatic) {
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.2,
                    y: -0.2 - Math.random() * 0.2
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
            }
        });
    };

    return (
        <div className="relative w-full h-[400px] mt-20 border border-border rounded-3xl overflow-hidden glass" data-cursor="drag">
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={shakeIt}
                    className="flex items-center gap-2 px-3 py-2 bg-surface-2 rounded-lg text-sm text-text hover:bg-white/10 transition-colors border border-border"
                    data-cursor="hover"
                >
                    <RefreshCw size={14} className="hover:animate-spin" /> Shake it
                </button>
            </div>
            <div ref={sceneRef} className="w-full h-full" />
        </div>
    );
};

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const paragraphs = siteData.bio.split("\n\n");

    return (
        <section id="about" className="py-24 relative max-w-7xl mx-auto px-6" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
                {/* Left Column: Bio */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 flex items-center gap-4">
                        <span className="text-secondary font-mono text-xl">01.</span> Who am I?
                    </h2>

                    <div className="space-y-6 text-lg text-muted">
                        {paragraphs.map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{
                                __html: p.replace(
                                    /(immersive web experiences|unhinged creativity|intersection of logic and feeling)/ig,
                                    '<span class="relative text-text whitespace-nowrap inline-block group">$&<span class="absolute left-0 bottom-0 w-full h-0.5 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span></span>'
                                )
                            }} />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-8">
                        <div>
                            <div className="text-3xl font-heading font-bold text-text">5+</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-widest mt-1">Years Exp</div>
                        </div>
                        <div>
                            <div className="text-3xl font-heading font-bold text-secondary">40+</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-widest mt-1">Projects</div>
                        </div>
                        <div>
                            <div className="text-3xl font-heading font-bold text-text">∞</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-widest mt-1">Coffees</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Photo Card */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass group" data-cursor="view">
                    <img
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
                        alt="Portrait"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Spinning Badge */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-surface rounded-full flex items-center justify-center shadow-lg border border-border">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="absolute inset-2 border border-dashed border-primary rounded-full opacity-50"
                        />
                        <div className="text-center font-mono text-[10px] text-secondary font-bold uppercase rotate-12">
                            Open to<br />Work
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sticker Board component */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <StickerBoard />
            </motion.div>
        </section>
    );
}
