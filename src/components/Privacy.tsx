
import { LegalLayout } from './layout/LegalLayout';
import { Shield, Eye, Lock, Server, Globe, UserCheck, Mail } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';

export function Privacy() {
    return (
        <LegalLayout title="Privacy Policy" icon="privacy">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Introduction Card */}
                <TiltCard className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Our Commitment to Trust</h2>
                            <p className="text-gray-400 leading-relaxed">
                                At Saswat AI Studio, your privacy isn't just a compliance checklist—it's the foundation of our architecture.
                                We collect only what is strictly necessary to power your AI experience, and we ensure that **you remain the sole owner of your creative data.**
                            </p>
                        </div>
                    </div>
                </TiltCard>

                {/* Data Collection */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">What We Collect</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                            <span><strong>Identity:</strong> Name & Email (via Clerk) for secure login.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                            <span><strong>Usage:</strong> Chat inputs & Image prompts for generation.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                            <span><strong>Analytics:</strong> Anonymous performance data to optimize speed.</span>
                        </li>
                    </ul>
                </div>

                {/* Data Usage */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <Server className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-bold text-white">How We Use It</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                            <span><strong>Service Delivery:</strong> Processing your prompts through LLMs.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                            <span><strong>Personalization:</strong> Remembering your history for context.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                            <span><strong>Security:</strong> Detecting and preventing abuse automatically.</span>
                        </li>
                    </ul>
                </div>

                {/* Security Spec */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Lock className="w-5 h-5 text-amber-400" />
                            <h3 className="text-lg font-bold text-white">Enterprise-Grade Security</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your data doesn't sit in a plain text file. We use **Row Level Security (RLS)** in Supabase, meaning your chat history is cryptographically isolated.
                            Even our admins cannot access your private generations without your explicit consent.
                        </p>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-gray-500 border-l border-white/10 pl-6">
                        <div className="text-center">
                            <div className="text-white font-bold text-lg mb-1">TLS 1.3</div>
                            <div>Encryption</div>
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold text-lg mb-1">SOC2</div>
                            <div>Compliant Utils</div>
                        </div>
                    </div>
                </div>

                {/* Third Party Map */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white">AI Engine Providers</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        We act as a orchestrator layer. Your prompts are securely transmitted to:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">OpenAI (GPT)</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">Google (Gemini)</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">Pollinations (Flux)</span>
                    </div>
                </div>

                {/* User Rights */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <UserCheck className="w-5 h-5 text-pink-400" />
                        <h3 className="text-lg font-bold text-white">Your Data Rights</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        You are in control. At any time, you can:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-center">
                        <button className="bg-white/5 hover:bg-white/10 p-2 rounded transition">Request Export</button>
                        <button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded transition">Delete Account</button>
                    </div>
                </div>

                {/* Contact Footer */}
                <div className="md:col-span-2 mt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">Have specific privacy concerns?</p>
                    <a href="mailto:officialsaswat@outlook.in" className="inline-flex items-center gap-2 text-white hover:text-pink-400 transition-colors font-medium">
                        <Mail className="w-4 h-4" />
                        officialsaswat@outlook.in
                    </a>
                </div>
            </div>
        </LegalLayout>
    );
}
