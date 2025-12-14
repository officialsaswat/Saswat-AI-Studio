import { LegalLayout } from './layout/LegalLayout';
import { FileText, CheckCircle, XCircle, AlertTriangle, Copyright, Scale, HelpCircle } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';

export function Terms() {
    return (
        <LegalLayout title="Terms of Service" icon="terms">
            <div className="grid md:grid-cols-2 gap-6">

                {/* Agreement Banner */}
                <TiltCard className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">The Short Version</h2>
                            <p className="text-gray-400 leading-relaxed">
                                By using Saswat AI Studio, you agree to play fair. We give you powerful tools; you use them responsibly.
                                It's a mutual pact of trust.
                            </p>
                        </div>
                    </div>
                </TiltCard>

                {/* Usage Rules */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-bold text-white">Permitted Use</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex gap-2">
                            <span className="text-green-400">✓</span> Personal & Creative exploration.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400">✓</span> Commercial use of generated assets.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400">✓</span> Sharing results on social media.
                        </li>
                    </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <h3 className="text-lg font-bold text-white">Prohibited Use</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex gap-2">
                            <span className="text-red-400">✕</span> Generating illegal or harmful content.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-red-400">✕</span> Reverse engineering our API/Code.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-red-400">✕</span> Automated scraping/bots.
                        </li>
                    </ul>
                </div>

                {/* AI Disclaimer */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">AI Accuracy Disclaimer</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Our AI models are advanced but not infallible. They may occasionally produce incorrect information ("hallucinations").
                                **Always verify critical facts.** We provide the service "AS IS" and cannot guarantee 100% accuracy for medical, legal, or financial advice.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ownership */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <Copyright className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Who Owns What?</h3>
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <strong className="block text-purple-300 mb-1">You Own:</strong>
                            <p className="text-gray-400">Your inputs (prompts) and the outputs (text/images) generated by the AI.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <strong className="block text-gray-300 mb-1">We Own:</strong>
                            <p className="text-gray-400">The platform code, logos, interface, and our proprietary algorithms.</p>
                        </div>
                    </div>
                </div>

                {/* Legal Boiletplate */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-lg font-bold text-white">Liability Cap</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Our liability is limited to the amount you paid us (which is $0 for free usage). We aren't liable for consequential damages.
                        </p>
                    </div>
                    <div className="text-xs text-gray-500 pt-4 border-t border-white/10">
                        Governed by the laws of India.
                    </div>
                </div>

                {/* Contact Footer */}
                <div className="md:col-span-2 mt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">Questions about the Terms?</p>
                    <a href="mailto:officialsaswat@outlook.in" className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-medium">
                        <HelpCircle className="w-4 h-4" />
                        officialsaswat@outlook.in
                    </a>
                </div>

            </div>
        </LegalLayout>
    );
}
