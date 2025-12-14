import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LegalLayoutProps {
    children: React.ReactNode;
    title: string;
    lastUpdated?: string;
    icon?: 'privacy' | 'terms';
}

export function LegalLayout({ children, title, lastUpdated, icon }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-[#02040a] text-gray-200 relative overflow-hidden font-sans selection:bg-pink-500/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                {/* Header Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group mb-8"
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/10">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span>Back to Studio</span>
                    </Link>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-2xl shadow-purple-500/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            {icon === 'privacy' ? (
                                <Shield className="w-10 h-10 text-purple-400" />
                            ) : (
                                <Scale className="w-10 h-10 text-blue-400" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                {title}
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base font-medium">
                                Last Updated: <span className="text-white">{lastUpdated || new Date().toLocaleDateString()}</span>
                            </p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* Content Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white"
                >
                    {children}
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 pt-10 border-t border-white/5 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Saswat AI Studio. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
