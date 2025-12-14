import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';

export function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <TiltCard className="max-w-md w-full glass-obsidian p-12 text-center rounded-3xl relative z-10">
                <h1 className="text-9xl font-bold text-white/5 mb-4 select-none">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-pink-500 mb-2">VOID DETECTED</h2>
                </div>

                <p className="text-gray-400 mb-8 mt-12 relative z-10">
                    You have ventured into deep space. There is nothing here but silence.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all text-white font-medium hover:scale-105 active:scale-95"
                >
                    <Home className="w-4 h-4" />
                    Return to Base
                </Link>
            </TiltCard>
        </div>
    );
}
