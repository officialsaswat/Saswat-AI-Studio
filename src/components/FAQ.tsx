import { useState } from 'react';
import { Plus, Minus, Cpu, Zap, Shield, Image } from 'lucide-react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';


const faqs = [
    {
        q: "Is Saswat AI Studio really free?",
        a: "Yes. We operate on a 'Democratized Intelligence' model. Core access to our high-performance LLMs is completely free, subsidized by our research partners. No credit card, no hidden paywalls.",
        icon: Zap
    },
    {
        q: "What defines the 'Hybrid Engine'?",
        a: "Unlike standard wrappers, we orchestrate queries across multiple providers (OpenAI, Anthropic, Google) dynamically. This ensures you always get the model with the highest reasoning capability for your specific prompt.",
        icon: Cpu
    },
    {
        q: "How does the Image Gen work?",
        a: "We integrate the FLUX.1 [schnell] model via high-bandwidth API tunnels. It processes natural language prompts into 4K-ready photorealistic assets in under 2 seconds.",
        icon: Image
    },
    {
        q: "Is my session data encrypted?",
        a: "End-to-end. We use Supabase RLS (Row Level Security) combined with client-side ephemeral keys. Even our developers cannot access your private session history without an audit warrant.",
        icon: Shield
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faqs" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                <div className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-block mb-4">
                        <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-400 tracking-widest uppercase backdrop-blur-md">
                            Knowledge Base
                        </span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tight">
                        Common Queries
                    </motion.h2>
                </div>

                <LayoutGroup>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            const Icon = faq.icon;

                            return (
                                <motion.div
                                    layout
                                    key={i}
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className={`relative rounded-3xl cursor-pointer overflow-hidden transition-all duration-500 group ${isOpen ? 'md:col-span-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-white/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    {/* Tech Decor Background */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_3s_linear_infinite]" />

                                    <div className="p-8 relative z-10">
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-2xl transition-colors ${isOpen ? 'bg-white/20 text-white shadow-lg' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                                                    {faq.q}
                                                </h3>
                                            </div>
                                            <div className={`p-2 rounded-full border transition-all ${isOpen ? 'bg-white text-black border-white rotate-180' : 'border-white/10 text-gray-500'}`}>
                                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-lg text-gray-300 leading-relaxed pl-[60px] border-l-2 border-white/10 ml-5">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </LayoutGroup>

            </div>
        </section>
    );
}
