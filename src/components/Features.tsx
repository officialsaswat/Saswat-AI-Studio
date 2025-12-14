import { motion } from 'framer-motion';
import { Image, Mic, User, Zap, Brain, Code, Sparkles } from 'lucide-react';

const features = [
    {
        name: "Advanced Reasoning",
        desc: "Solve complex problems with state-of-the-art logic and analysis.",
        icon: Brain,
        color: "from-purple-500 to-indigo-600",
        shape: "octahedron"
    },
    {
        name: "Expert Coding",
        desc: "Generate, debug, and optimize code across any language.",
        icon: Code,
        color: "from-blue-500 to-cyan-600",
        shape: "box"
    },
    {
        name: "Creative Studio",
        desc: "Generate stunning 4K visuals and artwork instantly.",
        icon: Image,
        color: "from-pink-500 to-rose-600",
        shape: "dodecahedron"
    },
    {
        name: "Real-time Voice",
        desc: "Natural conversations with human-like speech processing.",
        icon: Mic,
        color: "from-green-500 to-emerald-600",
        shape: "sphere"
    },
    {
        name: "Lightning Fast",
        desc: "Optimized responses powered by enterprise-grade infrastructure.",
        icon: Zap,
        color: "from-amber-500 to-orange-600",
        shape: "cone"
    },
    {
        name: "Personalized",
        desc: "An AI that remembers your context and adapts to your style.",
        icon: User,
        color: "from-red-500 to-pink-600",
        shape: "torus"
    }
];

import { TiltCard } from './ui/TiltCard';

function FeatureCard({ feature, index }: { feature: any, index: number }) {
    return (
        <TiltCard
            delay={index * 0.1}
            className="h-full w-full rounded-xl glass-obsidian p-8 cursor-pointer group hover:bg-white/5 transition-colors overflow-hidden relative"
        >
            {/* 3D Wireframe Decoration (CSS-based for performance) */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500 border border-white/30 rounded-full animate-[spin_10s_linear_infinite]`} />
            <div className={`absolute -right-8 -top-8 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500 border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]`} />

            <div
                style={{ transform: "translateZ(50px)" }}
                className={`w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center shadow-lg border border-white/10 backdrop-blur-sm relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <feature.icon className="w-8 h-8 text-white relative z-10" />
            </div>

            <div style={{ transform: "translateZ(25px)" }}>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {feature.name}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                    {feature.desc}
                </p>
            </div>

            {/* Edge Glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-white/20 transition-all duration-500" />
        </TiltCard>
    );
}

export function Features() {
    return (
        <section id="features" className="py-32 relative overflow-hidden bg-black">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-pink-400 mb-6 backdrop-blur-md"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Next Generation AI Engine</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    >
                        Unified Intelligence. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
                            Limitless Possibilities.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Experience the convergence of reasoning, creativity, and speed. One powerful studio for all your professional needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {features.map((feature, idx) => (
                        <div key={idx} className="h-[300px] w-full perspective-1000">
                            <FeatureCard feature={feature} index={idx} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
