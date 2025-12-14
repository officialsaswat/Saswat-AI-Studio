import { Code, Github, Twitter, Brain, ExternalLink, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function HolographicCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-4xl mx-auto perspective-2000"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl -z-10 animate-pulse" />

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden group">
                {/* Holographic Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" style={{ transform: "translateZ(-50px)" }} />

                {/* Scanning Light Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 animate-scan pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-16 relative z-10" style={{ transformStyle: "preserve-3d" }}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

export function About() {
    return (
        <section id="about" className="py-32 relative overflow-hidden flex items-center justify-center">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="relative w-full max-w-6xl mx-auto">
                    {/* Background Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Profile Visualization (Left - 5 Cols) */}
                        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                            <HolographicCard>
                                <div className="relative w-80 h-80 md:w-96 md:h-96 shrink-0 mx-auto">
                                    {/* Orbiting Rings */}
                                    <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
                                    <div className="absolute inset-12 rounded-full border border-pink-500/20 blur-md animate-pulse" />

                                    {/* Profile Image Container - Enforced Aspect Ratio */}
                                    <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-black/50 shadow-2xl relative z-10 group aspect-square">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 mix-blend-overlay" />
                                        <img
                                            src="/saswat-profile.jpg"
                                            alt="Saswat Subhransu Singh"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Floating Tech Icons */}
                                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 right-10 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl z-20">
                                        <Code className="w-6 h-6 text-cyan-400" />
                                    </motion.div>
                                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 -left-6 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl z-20">
                                        <Sparkles className="w-6 h-6 text-pink-400" />
                                    </motion.div>
                                </div>
                            </HolographicCard>
                        </div>

                        {/* Bio Content (Right - 7 Cols) */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Available for New Ventures
                                </div>

                                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                                    Saswat<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Subhransu Singh</span>
                                </h2>

                                <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                    "I architect digital reality. Transforming complex AI models into seamless, human-centric experiences is my craft.
                                    Welcome to the intersection of <span className="text-white font-medium">Art</span> and <span className="text-white font-medium">Algorithm</span>."
                                </p>

                                {/* Stats Grid - More Premium Looking */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                    {[
                                        { label: "Architecture", val: "Cloud Native" },
                                        { label: "AI Models", val: "Multi-Modal" },
                                        { label: "Experience", val: "Premium" },
                                        { label: "Security", val: "Enterprise" }
                                    ].map((stat, i) => (
                                        <div key={i} className="group p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
                                            <div className="text-white font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">{stat.val}</div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                    <Link
                                        to="/support"
                                        className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                                    >
                                        <span>Start Collaboration</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>

                                    <div className="flex gap-4">
                                        <div className="flex gap-4">
                                            {[
                                                { Icon: Github, href: "https://github.com/officialsaswat" },
                                                { Icon: Brain, href: "https://huggingface.co/officialsaswat" },
                                                { Icon: Twitter, href: "https://x.com/saswat_finance" }
                                            ].map(({ Icon, href }, i) => (
                                                <a
                                                    key={i}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
