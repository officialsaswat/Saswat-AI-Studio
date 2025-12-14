
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { Command } from 'lucide-react';
// Actually, looking at the screenshot, the SIDEBAR seems to be INSIDE the window or part of the layout.
// Let's assume the Layout WRAPS the sidebar + content.

interface StudioLayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    title?: string;
}

export function StudioLayout({ children, sidebar }: StudioLayoutProps) {
    // Mouse Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Subtle 3D Tilt - Not too extreme to avoid dizziness
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = (mouseXPos / width) - 0.5;
        const yPct = (mouseYPos / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <div
            className="h-screen w-screen overflow-hidden bg-[#02040a] flex items-center justify-center perspective-[2000px] font-sans selection:bg-pink-500/30"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Deep Space Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150" />
            </div>

            {/* The 3D Floating Window */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative w-[95vw] h-[92vh] max-w-[1600px] rounded-3xl bg-[#0a0c12]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden ring-1 ring-white/5"
            >
                {/* Window Glow Border */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 mix-blend-overlay" />

                {/* Mac-style Header */}
                <div className="h-14 px-6 flex items-center justify-between border-b border-white/5 bg-black/20 shrink-0 relative z-50">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2 group">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_10px_rgba(255,95,87,0.3)] group-hover:bg-[#FF5F57]/80 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_10px_rgba(254,188,46,0.3)] group-hover:bg-[#FEBC2E]/80 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_10px_rgba(40,200,64,0.3)] group-hover:bg-[#28C840]/80 transition-colors" />
                    </div>

                    {/* App Title */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-80">
                        {/* Using text directly or Logo component if it fits nicely essentially */}
                        <Logo className="scale-75" />
                    </div>

                    {/* Pro Badge */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-gray-400 group hover:text-white hover:bg-white/10 transition-all cursor-default">
                            <Command className="w-3 h-3" />
                            <span>PRO_MODE</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex min-h-0 relative">
                    {sidebar}

                    {/* Inner Content - Scrollable */}
                    <div className="flex-1 flex flex-col relative min-w-0 bg-transparent">
                        {children}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
