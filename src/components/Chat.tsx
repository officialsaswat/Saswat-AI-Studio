import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { Menu, Bot, User, File, Paperclip, X, Mic, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { StudioSidebar } from './StudioSidebar';

import { WarpOverlay } from './ui/WarpOverlay';
import { Logo } from './ui/Logo';

const SYSTEM_PROMPT = 'You are Saswat AI Studio, a professional, creative, and advanced AI assistant. You were created by Saswat. Be concise and professional.';

export function Chat() {
    const { user } = useUser();

    // Navigation State
    const [isWarping, setIsWarping] = useState(false);
    const [warpTarget, setWarpTarget] = useState("STUDIO");

    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        setIsWarping(true);
        if (path === '/image') setWarpTarget("IMAGE GEN");
        else if (path === '/support') setWarpTarget("SUPPORT");
        else setWarpTarget("STUDIO");

        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    // Default Messages
    const [messages, setMessages] = useState<any[]>([
        {
            role: 'model',
            content: 'Hello! I am Saswat AI Studio. How can I help you create today?'
        }
    ]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [attachment, setAttachment] = useState<globalThis.File | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);



    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
        } else {
            setIsListening(true);
            setTimeout(() => {
                setInput(prev => prev + " (Voice input simulated)");
                setIsListening(false);
            }, 2000);
        }
    };

    const startNewChat = async () => {
        setMessages([{ role: 'model', content: 'Hello! I am Saswat AI Studio. How can I help you create today?' }]);
        if (user) {
            const { data } = await supabase
                .from('chat_sessions')
                .insert({
                    user_id: user.id,
                    title: 'New Chat'
                })
                .select()
                .single();

            if (data) {
                setCurrentSessionId(data.id);
                setSessions(prev => [{
                    id: data.id,
                    label: data.title,
                    updated_at: data.created_at
                }, ...prev]);
            }
        }
    };

    // Fetch sessions on load
    useEffect(() => {
        if (user) {
            const fetchSessions = async () => {
                const { data } = await supabase
                    .from('chat_sessions')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false });

                if (data) {
                    setSessions(data.map(s => ({
                        id: s.id,
                        label: s.title || 'New Chat',
                        updated_at: s.updated_at
                    })));

                    // Auto-load Logic
                    // EXCLUDE support tickets when auto-loading
                    const regularSessions = data.filter(s => !s.title?.startsWith('🎫'));

                    if (!currentSessionId) {
                        if (regularSessions.length > 0) {
                            setCurrentSessionId(regularSessions[0].id);
                        } else {
                            // If no regular sessions exist (only tickets), start fresh
                            startNewChat();
                        }
                    }
                }
            };
            fetchSessions();
        }
    }, [user]);

    // Fetch messages when current session changes
    useEffect(() => {
        if (user && currentSessionId) {
            const fetchMessages = async () => {
                const { data } = await supabase
                    .from('chat_history')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('session_id', currentSessionId)
                    .order('created_at', { ascending: true });

                if (data) {
                    const welcomeMsg = 'Hello! I am Saswat AI Studio. How can I help you create today?';
                    const historyMessages = data.map(msg => ({
                        role: msg.role === 'model' ? 'model' : 'user',
                        content: msg.content
                    }));

                    const cleanHistory = historyMessages.filter(m => m.content !== welcomeMsg);
                    setMessages([{ role: 'model', content: welcomeMsg }, ...cleanHistory]);
                }
            };
            fetchMessages();
        }
    }, [user, currentSessionId]);

    // Auto-scroll removed to preventing locking user to bottom
    // useEffect(() => { scrollToBottom(); }, [messages]);

    const handleSend = async () => {
        if (!input.trim() && !attachment) return;
        if (isLoading) return;

        const userContent = input;

        const newMessages = [...messages, {
            role: 'user',
            content: userContent,
            attachment: attachment ? { name: attachment.name, type: attachment.type } : undefined
        }];

        setMessages(newMessages);
        setInput('');
        setAttachment(null);
        setIsLoading(true);
        setIsTyping(true);

        try {
            if (user && currentSessionId) {
                await supabase.from('chat_history').insert({
                    user_id: user.id,
                    session_id: currentSessionId,
                    role: 'user',
                    content: userContent
                });
            }

            // Smart response system with knowledge base
            const lastMessage = newMessages[newMessages.length - 1].content;
            const lowerMessage = lastMessage.toLowerCase();
            
            console.log('Processing message:', lastMessage);
            
            let response;
            
            // Check knowledge base FIRST for instant responses
            let useKnowledgeBase = false;
            
            // Greetings
            if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/i.test(lastMessage.trim())) {
                response = "Hello! I'm Saswat AI Studio. I'm here to assist you with information, answer questions, and help with various tasks. What can I help you with today?";
                useKnowledgeBase = true;
            }
            // About AI/Self
            else if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
                response = "I'm Saswat AI Studio, an advanced AI assistant designed to help with information, creative tasks, and problem-solving. I was created by Saswat to provide professional and helpful assistance.";
                useKnowledgeBase = true;
            }
            else if (lowerMessage.includes('how are you')) {
                response = "I'm functioning well, thank you! I'm ready to help you with any questions or tasks. What would you like to know?";
                useKnowledgeBase = true;
            }
            // Elon Musk
            else if (lowerMessage.includes('elon') && (lowerMessage.includes('musk') || lowerMessage.includes('who is elon'))) {
                response = "Elon Musk is a business magnate and entrepreneur. He's the CEO of Tesla (electric vehicles), SpaceX (aerospace), and owner of X (formerly Twitter). He's also involved with Neuralink (brain-computer interfaces) and The Boring Company (infrastructure/tunnels). He's known for his ambitious goals including Mars colonization and sustainable energy.";
                useKnowledgeBase = true;
            }
            // Narendra Modi
            else if (lowerMessage.includes('narendra modi') || lowerMessage.includes('modi')) {
                response = "Narendra Modi is the Prime Minister of India, serving since May 2014. He's a member of the Bharatiya Janata Party (BJP) and previously served as Chief Minister of Gujarat from 2001 to 2014. His tenure is known for economic reforms, digital initiatives like Digital India, and various infrastructure development programs. He's one of the world's most followed political leaders on social media.";
                useKnowledgeBase = true;
            }
            // World Leaders
            else if (lowerMessage.includes('joe biden') || (lowerMessage.includes('biden') && lowerMessage.includes('president'))) {
                response = "Joe Biden is the 46th President of the United States, serving since January 2021. He previously served as Vice President under Barack Obama from 2009-2017 and represented Delaware in the U.S. Senate for 36 years.";
                useKnowledgeBase = true;
            }
            else if (lowerMessage.includes('donald trump') || (lowerMessage.includes('trump') && lowerMessage.includes('president'))) {
                response = "Donald Trump is an American businessman and politician who served as the 45th President of the United States from 2017 to 2021. Before his presidency, he was known for his real estate business and reality TV show 'The Apprentice'.";
                useKnowledgeBase = true;
            }
            // Farming
            else if (lowerMessage.includes('subsistence farming') || (lowerMessage.includes('farming') && lowerMessage.includes('subsistence'))) {
                response = "Subsistence farming is agricultural practice where farmers grow food primarily for their own consumption rather than for sale. It's common in developing countries and focuses on growing just enough to feed the farmer's family with little to no surplus for trade. This contrasts with commercial farming, which is profit-oriented.";
                useKnowledgeBase = true;
            }
            // AI/Technology questions
            else if (lowerMessage.includes('chatgpt') || lowerMessage.includes('chat gpt')) {
                response = "ChatGPT is an AI chatbot developed by OpenAI, released in November 2022. It's built on the GPT (Generative Pre-trained Transformer) architecture. OpenAI was founded by Sam Altman, Elon Musk, and others in 2015. ChatGPT became extremely popular for its ability to have human-like conversations and assist with various tasks.";
                useKnowledgeBase = true;
            }
            else if (lowerMessage.includes('openai') || lowerMessage.includes('sam altman')) {
                response = "OpenAI is an AI research company founded in 2015 by Sam Altman, Elon Musk, Ilya Sutskever, and others. Sam Altman is the current CEO. OpenAI created ChatGPT, GPT-4, DALL-E (image generation), and other AI technologies. Their mission is to ensure artificial general intelligence benefits all of humanity.";
                useKnowledgeBase = true;
            }
            else if (lowerMessage.includes('what is ai') || lowerMessage.includes('artificial intelligence')) {
                response = "Artificial Intelligence (AI) is the simulation of human intelligence by machines, especially computer systems. It includes learning, reasoning, problem-solving, perception, and language understanding. AI powers virtual assistants, recommendation systems, autonomous vehicles, and much more.";
                useKnowledgeBase = true;
            }
            else if (lowerMessage.includes('what can you do')) {
                response = "I can help you with:\n• Answering questions on various topics\n• Providing explanations and information\n• Helping with creative writing and ideas\n• Problem-solving and analysis\n• General conversation\n\nWhat would you like assistance with?";
                useKnowledgeBase = true;
            }
            // Thank you
            else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
                response = "You're welcome! I'm here to help. Is there anything else you'd like to know?";
                useKnowledgeBase = true;
            }
            // Goodbye
            else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
                response = "Goodbye! Feel free to come back anytime you need assistance. Have a great day!";
                useKnowledgeBase = true;
            }
            
            // Only try AI API if knowledge base didn't have answer
            if (!useKnowledgeBase) {
            try {
                // Use Hugging Face Inference API with a better model
                const apiResponse = await fetch(
                    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            inputs: `<s>[INST] You are Saswat AI Studio, a helpful AI assistant. Answer the following question concisely and accurately: ${lastMessage} [/INST]`,
                            parameters: {
                                max_new_tokens: 150,
                                temperature: 0.7,
                                top_p: 0.95,
                                return_full_text: false
                            }
                        }),
                        signal: AbortSignal.timeout(8000)
                    }
                );

                console.log('API Response Status:', apiResponse.status);
                
                if (apiResponse.ok) {
                    const data = await apiResponse.json();
                    console.log('API Response Data:', data);
                    
                    if (Array.isArray(data) && data[0]?.generated_text) {
                        response = data[0].generated_text.trim();
                        // Clean up the response
                        response = response.replace(/^<s>\[INST\].*?\[\/INST\]\s*/i, '').trim();
                        if (response.length < 15) {
                            throw new Error('Response too short, using knowledge base');
                        }
                    } else {
                        throw new Error('Invalid API response format');
                    }
                } else {
                    throw new Error(`API failed with status ${apiResponse.status}`);
                }
            } catch (error) {
                console.log('AI API unavailable, using fallback response:', error);
                response = `I received your question: "${lastMessage}". While my AI model is currently loading, I'm here to help! I have built-in knowledge about technology, world leaders, AI, and general topics. Try asking about ChatGPT, Elon Musk, Narendra Modi, or other common topics for instant answers!`;
            }
            }
            
            console.log('Final response:', response);
            
            const assistantMessage = response;

            if (user && currentSessionId) {
                await supabase.from('chat_history').insert({
                    user_id: user.id,
                    session_id: currentSessionId,
                    role: 'model',
                    content: assistantMessage
                });

                if (messages.length <= 1) {
                    const newLabel = userContent.substring(0, 30);
                    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, label: newLabel } : s));
                    await supabase.from('chat_sessions').update({ title: newLabel }).eq('id', currentSessionId);
                }
            }

            setMessages(prev => [...prev, { role: 'model', content: assistantMessage }]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = error instanceof Error ? error.message : "Error. Please check your connection.";
            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    const handleRenameSession = async (id: string, newTitle: string) => {
        setSessions(prev => prev.map(s => s.id === id ? { ...s, label: newTitle } : s));
        if (user) {
            await supabase.from('chat_sessions').update({ title: newTitle }).eq('id', id).eq('user_id', user.id);
        }
    };

    const handleDeleteSession = async (id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentSessionId === id) {
            const remaining = sessions.filter(s => s.id !== id && !s.label.startsWith('🎫'));
            if (remaining.length > 0) setCurrentSessionId(remaining[0].id);
            else startNewChat();
        }
        if (user) {
            await supabase.from('chat_sessions').delete().eq('id', id).eq('user_id', user.id);
        }
    };

    // Filter Logic: Hide tickets
    const creativeSessions = sessions.filter(s => !s.label.startsWith('🎫'));

    return (
        <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans selection:bg-pink-500/30">
            <WarpOverlay isExiting={isWarping} targetTitle={warpTarget} />
            <StudioSidebar
                onNewItem={startNewChat}
                newItemLabel="New Chat"
                historyItems={creativeSessions.map(s => ({
                    id: s.id,
                    label: s.label,
                    onClick: () => setCurrentSessionId(s.id),
                    onEdit: (newName) => handleRenameSession(s.id, newName),
                    onDelete: () => handleDeleteSession(s.id)
                }))}
                historyTitle="Your Chats"
                onNavigate={handleNavigate}
            />

            <div className="flex-1 flex flex-col relative w-full h-full min-h-0 overflow-hidden">
                {/* Ambient Background Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[20%] -right-[20%] w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]" />
                    <div className="absolute -bottom-[20%] -left-[20%] w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[7000ms]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-20 shrink-0">
                    <div className="flex items-center gap-2 md:hidden">
                        <button className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <Logo />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Add extra header actions if needed */}
                    </div>
                </div>

                {/* Messages */}
                <div
                    className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 relative z-10 perspective-1000"
                    data-lenis-prevent
                >
                    <AnimatePresence mode='popLayout'>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, rotateX: -90, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 100,
                                    duration: 0.6
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className={`flex gap-4 max-w-4xl mx-auto group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                {/* Avatar */}
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-lg overflow-hidden ${msg.role === 'model' ? 'bg-black' : 'bg-gray-800'}`}>
                                    {msg.role === 'model' ? (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                    ) : (
                                        user?.imageUrl ? (
                                            <img src={user.imageUrl} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-400" />
                                        )
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`space-y-1 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    <div className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-1 px-1">
                                        {msg.role === 'model' ? 'Saswat AI' : 'You'}
                                    </div>
                                    <div className={`p-5 rounded-2xl backdrop-blur-md text-sm md:text-base leading-relaxed shadow-lg border ${msg.role === 'model'
                                        ? 'bg-[#1a1d26]/80 border-white/10 text-gray-100 rounded-tl-none hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow'
                                        : 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white border-white/10 rounded-tr-none shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)]'
                                        }`}>
                                        <div className="whitespace-pre-wrap">
                                            {msg.content}
                                        </div>
                                        {(msg as any).attachment && (
                                            <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 w-fit">
                                                <div className="p-2 rounded-lg bg-white/10">
                                                    <File className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-xs text-gray-400">Attached File</div>
                                                    <div className="text-sm font-medium text-white max-w-[150px] truncate">{(msg as any).attachment.name}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-4 max-w-4xl mx-auto"
                        >
                            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="font-medium text-xs text-gray-500 uppercase tracking-wider px-1">Thinking</div>
                                <div className="flex items-center gap-1.5 h-10 px-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
                                    <motion.span animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                    <motion.span animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                                    <motion.span animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>

                {/* Input Area */}
                <div className="p-6 relative z-20 perspective-1000">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="max-w-3xl mx-auto relative group"
                    >
                        {/* Glowing backdrop for input */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-focus-within:opacity-75 transition-opacity duration-500" />

                        <div className="relative flex flex-col gap-2 bg-[#0a0c12] border border-white/10 rounded-2xl p-3 shadow-2xl transition-all duration-300 transform group-focus-within:scale-[1.01] group-focus-within:bg-[#0f111a]">

                            {attachment && (
                                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 mx-1 mt-1 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded bg-pink-500/20 text-pink-400">
                                            <File className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm text-gray-200">{attachment.name}</span>
                                    </div>
                                    <button onClick={() => setAttachment(null)} className="p-1 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

                            <div className="flex items-end gap-2 px-1">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                    title="Attach"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask anything..."
                                    className="w-full bg-transparent border-none text-white focus:ring-0 resize-none py-2.5 max-h-32 min-h-[44px] placeholder:text-gray-600 text-base"
                                    rows={1}
                                    style={{ height: 'auto', minHeight: '44px' }}
                                />

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={toggleListening}
                                        className={`p-2.5 rounded-xl transition-all ${isListening
                                            ? 'bg-red-500/10 text-red-500 animate-pulse'
                                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <Mic className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() && !attachment && !isLoading}
                                        className={`p-2.5 rounded-xl transition-all shadow-lg ${(input.trim() || attachment) && !isLoading
                                            ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-white/10'
                                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 left-0 right-0 text-center">
                            <p className="text-[10px] text-gray-600 font-medium">
                                Saswat AI Studio can make mistakes. Verify important info.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
