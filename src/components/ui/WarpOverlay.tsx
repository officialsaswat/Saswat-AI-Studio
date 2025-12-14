
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

// Reusable Warp Effect Overlay - Optimized & Portalled
export function WarpOverlay({ isExiting, targetTitle = "WARPING..." }: { isExiting: boolean; targetTitle?: string }) {
    return createPortal(
        <AnimatePresence>
            {isExiting && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden font-sans">
                    {/* 1. The Void (Blackout) - Optimized: No blur, just scale */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 150 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "circIn" }}
                        className="absolute w-[20px] h-[20px] bg-black rounded-full will-change-transform"
                    />

                    {/* 2. Warp Tunnel (Speed Lines) - Optimized: Simple opacity fade, no heavy blur scaling */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.5, scale: 5, rotate: 180 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "anticipate" }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-pink-500/50 mix-blend-screen opacity-0"
                    />

                    {/* 3. Text Reveal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="relative z-10 text-white font-black text-4xl md:text-8xl tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    >
                        {targetTitle}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

export function WarpTransition({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
