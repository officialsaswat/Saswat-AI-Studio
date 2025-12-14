import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';
import { synth } from '../../lib/audio';

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    const steps = [
        { text: "INITIALIZING NEURAL NET...", icon: Cpu, color: "text-blue-500" },
        { text: "ESTABLISHING SECURE CONNECTION...", icon: ShieldCheck, color: "text-green-500" },
        { text: "CALIBRATING NEURAL MODELS...", icon: Radio, color: "text-pink-500" },
        { text: "SYSTEM ONLINE", icon: Zap, color: "text-yellow-500" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800); // Hold final text briefly
                    return prev;
                }
                // Play simple beep on step change
                try { synth.playClick(); } catch (e) { }
                return prev + 1;
            });
        }, 600); // Speed of boot sequence

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center font-mono text-xs"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-64 relative mb-8">
                {/* Loading Bar */}
                <div className="h-1 glass-obsidian rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.4, ease: "linear" }}
                    />
                </div>
            </div>

            <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        {steps[step] && (() => {
                            const Icon = steps[step].icon;
                            return (
                                <>
                                    <Icon className={`w-4 h-4 ${steps[step].color} animate-pulse`} />
                                    <span className="tracking-[0.2em] text-gray-400">{steps[step].text}</span>
                                </>
                            );
                        })()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-10 text-[10px] text-gray-700">
                SASWAT AI STUDIO v2.0 // CONCEPT CAR EDITION
            </div>
        </motion.div>
    );
}
