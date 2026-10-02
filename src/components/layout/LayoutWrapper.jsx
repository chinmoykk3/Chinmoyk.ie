import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { LoadingScreen } from "../ui/LoadingScreen";
import { Cursor } from "../ui/Cursor";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

export function LayoutWrapper({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Make lenis globally available for anchors if needed
        window.lenis = lenis;

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
            <Cursor />
            {/* <Navbar /> */}
            <div className="min-h-screen relative w-full pt-20">
                {children}
            </div>
            {/* <Footer /> */}
        </>
    );
}
