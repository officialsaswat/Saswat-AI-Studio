import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Logo } from './ui/Logo';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={twMerge(
            "fixed top-0 w-full z-50 transition-all duration-500 border-b",
            isScrolled
                ? "bg-black/50 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                : "bg-transparent border-transparent"
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Logo size="default" className="cursor-pointer" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
                    <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
                    <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
                    <a href="#faqs" className="hover:text-white transition-colors duration-300">FAQs</a>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-white shadow-lg hover:shadow-pink-500/10">
                                Log In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 text-sm font-medium text-gray-300 animate-in slide-in-from-top-2">
                    <a href="#features" className="hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                    <a href="#pricing" className="hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                    <a href="#faqs" className="hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>FAQs</a>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white w-full text-center shadow-lg">
                                Log In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex justify-center p-2">
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>
            )}
        </header>
    );
}
