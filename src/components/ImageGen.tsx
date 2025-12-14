
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Download, Share2, Sparkles, Wand2, Loader2 as Spinner } from 'lucide-react';
import { StudioSidebar } from './StudioSidebar';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../lib/supabase';
import { useUser } from '@clerk/clerk-react';
import { WarpOverlay } from './ui/WarpOverlay';
import { Logo } from './ui/Logo';
import { TiltCard } from './ui/TiltCard';
import { HoloProjector } from './ui/HoloProjector';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyC57srcwhd_u3amvOZ6p_YFp6x0mNzQnB4');

export function ImageGen() {
    // Load User from Clerk
    const { user } = useUser();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [warpTarget, setWarpTarget] = useState<string>("STUDIO");
    const [isWarping, setIsWarping] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch History Effect
    useEffect(() => {
        if (user) {
            const fetchHistory = async () => {
                const { data } = await supabase
                    .from('image_history')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (data) {
                    setHistory(data.map(item => ({
                        id: item.id,
                        label: item.prompt.substring(0, 30) + (item.prompt.length > 30 ? '...' : ''),
                        onClick: () => {
                            setGeneratedImage(item.image_url);
                            setPrompt(item.prompt);
                        },
                        onDelete: () => handleDeleteImage(item.id)
                    })));
                }
            };
            fetchHistory();
        }
    }, [user]);

    const handleDeleteImage = async (id: string) => {
        // Update local state immediately
        setHistory(prev => prev.filter(item => item.id !== id));
        if (user) {
            await supabase
                .from('image_history')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim() || isGenerating) return;

        setIsGenerating(true);
        setStatusText('Analyzing request...');
        setEnhancedPrompt(null);
        setGeneratedImage(null);

        // Fallback variables
        let finalPrompt = prompt;

        try {
            // Step 1: Try to enhance prompt using Gemini
            try {
                setStatusText('Enhancing request with Saswat Intelligence...');
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const enhancementPrompt = `You are an expert visual prompt engineer for the Flux AI image generator. 
                Refine the following user request into a single, highly detailed, photorealistic image generation prompt.
                Focus on cinematic lighting, 8k resolution, ultra - detailed textures, and specific artistic styles.
                Do not include "Generate an image of". Just describe the visual scene directly.
                Keep it under 60 words for maximum impact.
                Original Request: "${prompt}"`;

                const result = await model.generateContent(enhancementPrompt);
                const response = await result.response;
                finalPrompt = response.text().trim();
                setEnhancedPrompt(finalPrompt);
            } catch (geminiError) {
                setStatusText('AI enhancement skipped. Using raw prompt...');
                finalPrompt = prompt; // Fallback to raw prompt
            }

            // Helper to generate image url
            const generateImageUrl = (promptText: string, model: string) =>
                `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1024&height=1024&model=${model}&nologo=true&seed=${Math.random()}`;

            // Helper to load image
            const attemptLoadImage = (url: string, timeoutMs: number) => {
                return new Promise<string>((resolve, reject) => {
                    const img = new Image();
                    const timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);
                    img.onload = () => { clearTimeout(timer); resolve(url); };
                    img.onerror = () => { clearTimeout(timer); reject(new Error("Load Failed")); };
                    img.src = url;
                });
            };

            let imageUrl = '';

            try {
                // Attempt 1: Flux (High Quality)
                const fluxUrl = generateImageUrl(finalPrompt, 'flux');
                imageUrl = await attemptLoadImage(fluxUrl, 25000); // 25s timeout for Flux
            } catch (fluxError) {
                setStatusText('Routing to backup Neural Engine (Turbo)...');

                // Attempt 2: Turbo (Standard Quality - Faster/Reliable)
                const turboUrl = generateImageUrl(finalPrompt, 'turbo');
                imageUrl = await attemptLoadImage(turboUrl, 15000); // 15s timeout for Turbo
            }

            setGeneratedImage(imageUrl);

            // Save to History (Fire and forget, don't block UI)
            if (user) {
                try {
                    supabase.from('image_history').insert({
                        user_id: user.id,
                        prompt: prompt,
                        image_url: imageUrl
                    }).select().single().then(({ data }) => {
                        if (data) {
                            setHistory(prev => [{
                                id: data.id,
                                label: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
                                onClick: () => { setGeneratedImage(imageUrl); setPrompt(prompt); },
                                onDelete: () => handleDeleteImage(data.id)
                            }, ...prev]);
                        }
                    });
                } catch (dbError) {
                    // Fail silently for history save
                }
            }

        } catch (error) {
            setStatusText('Generation failed. Network or API unavailable.');
            alert('Image Generation Failed. Please check your internet connection and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = async () => {
        if (!generatedImage) return;
        try {
            const response = await fetch(generatedImage);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `saswat-ai-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Could not download image. Opening in new tab instead.");
            window.open(generatedImage, '_blank');
        }
    };

    const handleShare = async () => {
        if (!generatedImage) return;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Created with Saswat AI Image Studio',
                    text: `Check out this image I generated with "${prompt}"`,
                    url: generatedImage
                });
            } else {
                await navigator.clipboard.writeText(generatedImage);
                alert('Image URL copied to clipboard!');
            }
        } catch (error) {
            // Share failed silently or unavailable
        }
    };

    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        setIsWarping(true);
        if (path === '/chat') setWarpTarget("CHAT STUDIO");
        else if (path === '/support') setWarpTarget("SUPPORT");
        else setWarpTarget("STUDIO");

        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    return (
        <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans relative z-[100] perspective-1000 selection:bg-pink-500/30">
            {/* Warp Transition Overlay */}
            <WarpOverlay isExiting={isWarping} targetTitle={warpTarget} />

            <StudioSidebar
                onNewItem={() => { setPrompt(''); setGeneratedImage(null); setEnhancedPrompt(null); setIsMobileMenuOpen(false); }}
                newItemLabel="New Creation"
                historyItems={history}
                historyTitle="Your Creations"
                onNavigate={handleNavigate}
                mobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col relative w-full h-full min-h-0 overflow-hidden">
                {/* Ambient Background Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[20%] -right-[20%] w-[1000px] h-[1000px] bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]" />
                    <div className="absolute -bottom-[20%] -left-[20%] w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[7000ms]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
                </div>
                {/* Header */}
                <div className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20 shrink-0 relative">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        </button>
                        <Logo className="scale-90" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">

                    {/* Display Area */}
                    <div className="w-full h-full flex items-center justify-center mb-8 relative">
                        <AnimatePresence mode="wait">
                            {!generatedImage && !isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center space-y-4"
                                >
                                    <div className="w-24 h-24 rounded-3xl bg-white/5 mx-auto flex items-center justify-center border border-white/10 shadow-2xl skew-y-3 skew-x-3 rotate-6 transform transition-transform hover:rotate-0 hover:skew-0 duration-500">
                                        <ImageIcon className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Start Creating</h2>
                                        <p className="text-sm text-gray-500">Describe your imagination below</p>
                                    </div>
                                </motion.div>
                            )}

                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse" />
                                        <div className="w-16 h-16 rounded-2xl bg-black border border-pink-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                                            <Spinner className="w-8 h-8 text-pink-400 animate-spin" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-pink-300 font-mono animate-pulse">{statusText}</p>
                                    {enhancedPrompt && (
                                        <div className="max-w-md p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400 italic text-center">
                                            "{enhancedPrompt}"
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {generatedImage && !isGenerating && (
                                <HoloProjector>
                                    <TiltCard className="relative group rounded-2xl overflow-hidden glass-obsidian max-h-[60vh] aspect-square">
                                        <img
                                            src={generatedImage}
                                            alt="Generated"
                                            className="w-full h-full object-contain bg-black"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6 gap-4 backdrop-blur-[1px] translate-z-10">
                                            <button onClick={handleDownload} className="p-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95">
                                                <Download className="w-4 h-4" /> Save
                                            </button>
                                            <button onClick={handleShare} className="p-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md flex items-center gap-2 text-sm font-bold shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95">
                                                <Share2 className="w-4 h-4" /> Share
                                            </button>
                                        </div>
                                    </TiltCard>
                                </HoloProjector>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <div className="w-full relative z-20 perspective-1000 group">
                        {/* Glowing backdrop for input */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-30 group-focus-within:opacity-75 pointer-events-none" />

                        <div className="relative flex gap-3 p-3 bg-[#0a0c12] rounded-2xl border border-white/10 shadow-2xl z-20">
                            <button
                                className="p-3 text-gray-400 rounded-xl"
                            >
                                <Wand2 className="w-5 h-5" />
                            </button>

                            <input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                                placeholder="Describe an image to generate..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 text-sm font-medium z-30"
                                disabled={isGenerating}
                            />

                            <button
                                onClick={handleGenerate}
                                disabled={!prompt.trim() || isGenerating}
                                className="relative z-50 p-3 bg-blue-600 text-white rounded-xl shadow-lg disabled:opacity-50"
                                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
