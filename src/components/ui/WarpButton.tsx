
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface WarpButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
    className?: string;
}

import { useSfx } from '../../hooks/use-sfx';

export function WarpButton({ onClick, children = "Start Chatting Now", className = "" }: WarpButtonProps) {
    const [isLaunching, setIsLaunching] = useState(false);
    const { playClick, playHover } = useSfx();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default link behavior if wrapped
        playClick();
        setIsLaunching(true);
        // Slightly faster navigation for snappier feel
        setTimeout(() => {
            onClick();
        }, 700);
    };

    return (
        <div className={`relative z-50 ${className}`}>
            {isLaunching && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden">
                    {/* 1. The Void (Blackout) - Optimized: No blur, just scale */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 150 }}
                        transition={{ duration: 0.8, ease: "circIn" }}
                        className="absolute w-[20px] h-[20px] bg-black rounded-full will-change-transform"
                    />

                    {/* 2. Warp Tunnel (Speed Lines) - Optimized: Simple opacity fade, no heavy blur scaling */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.5, scale: 5, rotate: 180 }}
                        transition={{ duration: 0.6, ease: "anticipate" }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-pink-500/50 mix-blend-screen opacity-0"
                    />

                    {/* 3. Text Reveal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="relative z-10 text-white font-black text-4xl md:text-6xl tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    >
                        Entering Studio
                    </motion.div>
                </div>,
                document.body
            )}

            <motion.button
                onClick={handleClick}
                animate={isLaunching ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={playHover}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-full font-bold text-white text-lg transition-all hover:scale-110 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] flex items-center gap-2 overflow-hidden w-full justify-center"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10 tracking-wide">{children}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
        </div>
    );
}
