
import { Check } from 'lucide-react';
import { WarpButton } from './ui/WarpButton';
import { TiltCard } from './ui/TiltCard';

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white/5 border-y border-white/5">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Premium AI. <span className="text-primary">100% Free.</span></h2>
                <p className="text-xl text-gray-400 mb-12">No subscriptions. No hidden fees. Just pure AI power.</p>

                <div className="max-w-md mx-auto perspective-1000">
                    <TiltCard className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden hover:border-pink-500/50 transition-colors">
                        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                            <div className="absolute top-0 right-0 p-4 opacity-50" style={{ transform: "translateZ(-20px)" }}>
                                <div className="w-32 h-32 bg-pink-500 rounded-full blur-[80px]" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Free Access</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-6">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                                    $0
                                </span>
                                <span className="text-gray-400">/forever</span>
                            </div>

                            <ul className="space-y-4 text-left mb-8">
                                {[
                                    "Access to Saswat AI Pro",
                                    "Unlimited Conversations",
                                    "Image Generation (4K)",
                                    "Voice & Audio Support",
                                    "24/7 Community Access",
                                    "No Credit Card Required"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <Check className="w-5 h-5 text-green-400 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <WarpButton
                                onClick={() => window.location.href = '/chat'}
                                className="w-full"
                            >
                                Start Chatting Free
                            </WarpButton>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
