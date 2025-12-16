import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Send, Paperclip, Mic, Sparkles, Command } from 'lucide-react';

export function ChatInterface3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smoother, subtler animations - REDUCED INTENSITY for professional feel
    const rotateX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [5, 0, -5]);
    const rotateY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [-5, 0, 5]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Parallax values for inner elements (creating true depth)
    const yHeader = useTransform(scrollYProgress, [0.2, 0.8], [0, -10]);
    const yBubbles = useTransform(scrollYProgress, [0.2, 0.8], [10, -10]);
    const yInput = useTransform(scrollYProgress, [0.2, 0.8], [20, 0]);

    return (
        <div ref={containerRef} className="hidden md:flex perspective-[2000px] w-full justify-center py-24 lg:py-32 overflow-visible min-h-[420px] lg:min-h-[600px]">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    opacity,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full max-w-4xl aspect-[16/10] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-visible"
            >
                {/* Glowing Backlight - Subtle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-purple-500/5 to-indigo-500/5 rounded-3xl -z-10 blur-xl" />

                {/* Floating Elements Container - "Pop out" effect */}
                <div className="relative h-full flex flex-col p-6 [transform-style:preserve-3d]">

                    {/* Header: Floats slightly */}
                    <motion.div
                        style={{ z: 40, y: yHeader }}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-sm mb-6 transform-gpu"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <div className="flex items-center gap-2 text-gray-200">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium tracking-wide">Saswat AI Studio</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 flex items-center gap-2 tracking-wider">
                                <Command className="w-3 h-3" />
                                <span>PRO_MODE</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chat Area: Messages float at different depths */}
                    <div className="flex-1 space-y-6 relative [transform-style:preserve-3d]">

                        {/* Bot Message - Mid Depth */}
                        <motion.div
                            style={{ z: 60, y: yBubbles }}
                            className="flex gap-4 max-w-[85%]"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 mt-1">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-2">
                                <motion.div
                                    className="p-5 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 text-gray-200 shadow-xl backdrop-blur-sm"
                                >
                                    <p className="text-sm leading-relaxed font-light">
                                        Processing complete. I've synthesized the dataset into a comprehensive strategy. The analysis indicates a <span className="font-semibold text-white">40% efficiency gain</span> when deploying the new neural architecture.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* User Message - Highest Depth */}
                        <motion.div
                            style={{ z: 80, y: yBubbles }}
                            className="flex gap-4 max-w-[80%] self-end flex-row-reverse"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                                <div className="text-xs font-bold text-white">You</div>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="p-5 rounded-2xl rounded-tr-sm bg-purple-600/20 border border-purple-500/20 text-white shadow-lg">
                                    <p className="text-sm font-medium">Generate the efficiency report.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Input Area: Floats closer to camera */}
                    <motion.div
                        style={{ z: 100, y: yInput }}
                        className="mt-6 p-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 transform-gpu"
                    >
                        <button className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <div className="flex-1 text-gray-500 text-sm font-medium ml-2">
                            Type a message to Saswat AI...
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                <Mic className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-white text-black hover:scale-105 transition-transform shadow-lg shadow-white/10">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Glossy Overlay for Reflection Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none z-50 mix-blend-overlay" />
            </motion.div>
        </div>
    );
}
