import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

export function useKonami() {
    const [success, setSuccess] = useState(false);
    const [inputIndex, setInputIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === KONAMI_CODE[inputIndex].toLowerCase() || e.key === KONAMI_CODE[inputIndex]) {
                if (inputIndex === KONAMI_CODE.length - 1) {
                    setSuccess(true);

                    confetti({
                        particleCount: 200,
                        spread: 160,
                        origin: { y: -0.1 },
                        gravity: 1.5,
                        ticks: 400,
                        colors: ['#FF6B57', '#C6FF3D', '#7C5CFF']
                    });

                    // Custom toast notification style
                    const toast = document.createElement("div");
                    toast.className = "fixed bottom-10 inset-x-0 mx-auto w-max px-6 py-3 bg-secondary text-black font-bold font-mono rounded-full z-[999] animate-bounce";
                    toast.innerText = "Cheat code unlocked: +10 charisma 🚀";
                    document.body.appendChild(toast);

                    setTimeout(() => {
                        if (toast) document.body.removeChild(toast);
                        setSuccess(false);
                    }, 10000);

                    setInputIndex(0);
                } else {
                    setInputIndex((prev) => prev + 1);
                }
            } else {
                setInputIndex(0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [inputIndex]);

    return success;
}

export function KonamiListener() {
    useKonami();
    return null;
}
