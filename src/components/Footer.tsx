


import { Newsletter } from './Newsletter';

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/10 bg-black text-gray-400 text-sm relative z-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col gap-4 max-w-xs">
                    <div>
                        <div className="text-xl font-bold text-white mb-1">Saswat AI Studio</div>
                        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Saswat AI. All rights reserved.</p>
                    </div>
                    <Newsletter />
                </div>

                <div className="flex gap-8">
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/support" className="hover:text-white transition-colors">Contact Support</a>
                </div>
            </div>
        </footer>
    );
}
