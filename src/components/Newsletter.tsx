import { useState } from 'react';
import { Send, Check, Loader2, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus('loading');
        try {
            // Call Supabase Edge Function
            const { error } = await supabase.functions.invoke('resend', {
                body: {
                    email,
                    type: 'newsletter'
                }
            });

            if (error) throw error;

            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.message || 'Connection failed');
            setTimeout(() => { setStatus('idle'); setErrorMessage(''); }, 5000);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                Stay Updated
            </h4>
            <form onSubmit={handleSubscribe} className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`absolute right-1 top-1 bottom-1 p-2 rounded-lg transition-all ${status === 'success'
                        ? 'bg-green-500 text-white'
                        : status === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : status === 'success' ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                </button>
            </form>
            <p className="text-[10px] text-gray-500 mt-2 ml-1">
                {status === 'success'
                    ? 'Thanks for subscribing!'
                    : status === 'error'
                        ? <span className="text-red-400">{errorMessage || 'Something went wrong. Try again.'}</span>
                        : 'Get the latest AI updates.'}
            </p>
        </div>
    );
}
