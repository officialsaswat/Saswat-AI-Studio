import { motion } from 'framer-motion';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Scene3D } from './Scene3D';
import { ChatInterface3D } from './ChatInterface3D';
import { WarpButton } from './ui/WarpButton';

export function Hero() {
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    const handleStartChatting = () => {
        if (isSignedIn) {
            navigate('/chat');
        } else {
            openSignIn();
        }
    };

    return (
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[80vh] md:min-h-screen flex flex-col justify-center">
            {/* 3D Background */}
            <Scene3D />

            {/* Background gradients/glows fallback/overlay */}

            {/* Background gradients/glows fallback/overlay */}
            <div className="absolute top-14 md:top-20 left-1/2 -translate-x-1/2 w-[320px] h-[320px] md:w-[500px] md:h-[500px] bg-purple-500/10 rounded-full blur-[90px] md:blur-[100px] -z-10" />

            <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-default backdrop-blur-md"
                >
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>Built by Saswat Subhransu Singh</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight max-w-5xl leading-[1.1]"
                >
                    Saswat AI Studio. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
                        Professional & Unlimited.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
                >
                    Experience the ultimate creative intelligence. One powerful studio for reasoning, coding, and design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col items-center gap-6 w-full max-w-xs sm:max-w-none"
                >
                    <WarpButton onClick={handleStartChatting} />
                    <p className="text-sm text-gray-500">No credit card required.</p>
                </motion.div>

                {/* Chat Interface 3D Preview */}
                <ChatInterface3D />
            </div>
        </section>
    );
}
