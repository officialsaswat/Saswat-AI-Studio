import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export function HoloProjector({ children }: PropsWithChildren) {
    return (
        <div className="relative group">
            {/* The Base Emitter */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-4 bg-blue-500/20 blur-md rounded-[100%] group-hover:bg-pink-500/30 transition-colors duration-500" />

            {/* Upward Light Beam */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ clipPath: 'polygon(20% 100%, 80% 100%, 100% 0, 0 0)' }}
            />

            {/* Holographic Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px) brightness(2)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px) brightness(1)' }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                {/* Scanline Overlay on Content */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-20 transition-opacity mix-blend-overlay pointer-events-none z-20" />

                {children}
            </motion.div>
        </div>
    );
}
