import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Playground() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameDone, setGameDone] = useState(false);

    useEffect(() => {
        let timer;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0 && isPlaying) {
            setIsPlaying(false);
            setGameDone(true);
            setTarget(null);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(10);
        setGameDone(false);
        setIsPlaying(true);
        spawnTarget();
    };

    const spawnTarget = () => {
        // Generate random position inside the container
        const x = Math.random() * 80 + 10; // 10% to 90%
        const y = Math.random() * 80 + 10; // 10% to 90%
        setTarget({ x, y });
    };

    const handleHit = () => {
        setScore((s) => s + 1);
        spawnTarget();
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-4">
                        <span className="text-secondary font-mono text-xl">05.</span> The Lab
                    </h2>
                    <p className="font-mono text-muted text-sm mt-4">No deliverables here. Just vibes & a quick reaction test.</p>
                </div>
            </div>

            <div className="w-full h-[500px] glass rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group" data-cursor="view">

                {!isPlaying && !gameDone && (
                    <div className="text-center z-10 p-8 glass rounded-2xl flex flex-col items-center">
                        <Zap size={48} className="text-secondary mb-4 drop-shadow-[0_0_15px_rgba(198,255,61,0.5)]" />
                        <h3 className="text-2xl font-bold font-heading mb-2">Reaction Test</h3>
                        <p className="text-muted mb-6 max-w-sm">Click the targets as fast as you can. You have 10 seconds.</p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-secondary text-black font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {isPlaying && (
                    <>
                        <div className="absolute top-6 left-8 font-mono text-xl text-primary font-bold">Score: {score}</div>
                        <div className="absolute top-6 right-8 font-mono text-xl text-secondary font-bold">Time: {timeLeft}s</div>

                        {target && (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={handleHit}
                                className="absolute w-12 h-12 bg-primary rounded-full shadow-[0_0_20px_rgba(124,92,255,0.8)] border-2 border-white focus:outline-none"
                                style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        )}
                    </>
                )}

                {gameDone && (
                    <div className="text-center z-10 p-8 glass rounded-2xl flex flex-col items-center">
                        <h3 className="text-3xl font-bold font-heading mb-2">Game Over</h3>
                        <p className="text-xl mb-6">Score: <span className="text-secondary font-bold text-3xl">{score}</span></p>
                        <p className="text-muted mb-8 text-sm max-w-xs">
                            {score < 5 ? "Did your mouse disconnect?" : score < 12 ? "Not bad. But you can do better." : "Okay, you've got hacker reflexes."}
                        </p>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 border border-primary text-text font-bold rounded-full hover:bg-primary/20 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
