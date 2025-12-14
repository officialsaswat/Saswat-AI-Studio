import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);

    // Smooth mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over clickable
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%'
            }}
        >
            {/* Core Dot */}
            <div className={`rounded-full bg-white transition-all duration-300 pointer-events-none ${isPointer ? 'w-2 h-2' : 'w-2 h-2'}`} />

            {/* Magnetic Ring */}
            <motion.div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full transition-all duration-300 ease-out flex items-center justify-center pointer-events-none`}
                animate={{
                    width: isPointer ? 48 : 24,
                    height: isPointer ? 48 : 24,
                    opacity: isPointer ? 1 : 0.5,
                    scale: isPointer ? 1.2 : 1
                }}
            />
        </motion.div>
    );
}
