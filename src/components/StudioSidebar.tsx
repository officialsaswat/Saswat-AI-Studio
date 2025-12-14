import { Plus, MessageSquare, Sparkles, Pencil, Trash2, Check, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarItem {
    id: string;
    label: string;
    onClick: () => void;
    onEdit?: (newName: string) => void;
    onDelete?: () => void;
}

interface StudioSidebarProps {
    onNewItem: () => void;
    newItemLabel: string;
    historyItems?: SidebarItem[];
    historyTitle?: string;
    hideApps?: boolean;
    mobileOpen?: boolean;
    onMobileClose?: () => void;
    onNavigate?: (path: string) => void;
}

import { useSfx } from '../hooks/use-sfx';

export function StudioSidebar({
    onNewItem,
    newItemLabel,
    historyItems = [],
    historyTitle = "Recent Activity",
    hideApps = false,
    mobileOpen = false,
    onMobileClose,
    onNavigate
}: StudioSidebarProps) {
    const { user } = useUser();
    const location = useLocation();
    const { playHover, playClick } = useSfx();
    const isActive = (path: string) => {
        const currentPath = location.pathname.replace(/\/$/, "");
        const targetPath = path.replace(/\/$/, "");
        return currentPath === targetPath;
    };

    const handleNavClick = (e: React.MouseEvent, path: string) => {
        playClick();
        if (onNavigate) {
            e.preventDefault();
            if (location.pathname !== path) {
                onNavigate(path);
            }
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                    onClick={onMobileClose}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 z-40 w-80 glass-obsidian flex flex-col shrink-0 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 transform
                md:relative md:translate-x-0 md:flex
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* New Item Button */}
                <div className="p-6 pb-2">
                    <button
                        onClick={() => { playClick(); onNewItem(); }}
                        onMouseEnter={playHover}
                        className="group w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-900/40 transition-all flex items-center justify-center gap-2 border border-white/10 overflow-hidden relative transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm" />
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform relative z-10" />
                        <span className="relative z-10">{newItemLabel}</span>
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 space-y-6 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {!hideApps && (
                        <div>
                            <div className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 font-mono opacity-70">
                                Studio Apps
                            </div>
                            <div className="space-y-2">
                                <a
                                    href="/chat"
                                    onClick={(e) => { playClick(); handleNavClick(e, '/chat'); }}
                                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden border ${isActive('/chat')
                                        ? 'bg-gradient-to-r from-blue-600/30 to-transparent border-blue-500/80 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] backdrop-blur-md'
                                        : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200 hover:border-white/5'
                                        }`}
                                >
                                    {isActive('/chat') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl shadow-[0_0_15px_#3b82f6]" />}
                                    <div className={`p-2 rounded-lg transition-colors ${isActive('/chat') ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-600 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <span className="tracking-tight">Saswat AI Chat</span>
                                    {isActive('/chat') && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse ml-auto shadow-[0_0_12px_rgba(59,130,246,1)]" />}
                                </a>

                                <a
                                    href="/image"
                                    onClick={(e) => { playClick(); handleNavClick(e, '/image'); }}
                                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden border ${isActive('/image')
                                        ? 'bg-gradient-to-r from-pink-600/20 to-transparent border-pink-500/50 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md'
                                        : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200 hover:border-white/5'
                                        }`}
                                >
                                    {isActive('/image') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-xl shadow-[0_0_15px_#ec4899]" />}
                                    <div className={`p-2 rounded-lg transition-colors ${isActive('/image') ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 text-gray-600 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <span className="tracking-tight">Saswat AI Image Gen</span>
                                    {isActive('/image') && <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse ml-auto shadow-[0_0_12px_rgba(236,72,153,1)]" />}
                                </a>
                            </div>
                        </div>
                    )}

                    {historyItems.length > 0 && (
                        <div>
                            <div className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 font-mono opacity-70">
                                {historyTitle}
                            </div>
                            <div className="space-y-1.5 perspective-1000">
                                <AnimatePresence initial={false} mode='popLayout'>
                                    {historyItems.map((item, i) => (
                                        <SidebarItemRow key={item.id} item={item} index={i} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-white/5 bg-[#010205]/50">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer hover:border-white/10 hover:shadow-lg hover:shadow-purple-900/10">
                        <div className="scale-100 group-hover:scale-105 transition-transform">
                            <UserButton afterSignOutUrl="/" appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 ring-2 ring-white/5 hover:ring-white/20 transition-all",
                                    userButtonPopoverCard: "bg-black border border-white/10 shadow-2xl",
                                }
                            }} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <div className="text-sm font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
                                {user?.fullName || user?.firstName || 'Creator'}
                            </div>
                            <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                PRO_MEMBER
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function SidebarItemRow({ item, index }: { item: SidebarItem, index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.label);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when editing starts
    useEffect(() => {
        if (isEditing) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isEditing]);

    const handleSave = () => {
        if (item.onEdit && editValue.trim()) {
            item.onEdit(editValue);
            setIsEditing(false);
            setEditValue(item.label);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditValue(item.label);
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/10 shadow-inner">
                <input
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => { /* Optional: save on blur or cancel */ }}
                    className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 p-0 min-w-0"
                />
                <button onClick={handleSave} className="p-1 hover:text-green-400 text-gray-400"><Check className="w-3 h-3" /></button>
                <button onClick={() => { setIsEditing(false); setEditValue(item.label); }} className="p-1 hover:text-red-400 text-gray-400"><X className="w-3 h-3" /></button>
            </div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group/item relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 cursor-pointer border border-transparent hover:border-white/5 hover:shadow-lg hover:shadow-black/20"
        >
            <div onClick={item.onClick} className="flex-1 flex items-center gap-3 truncate">
                <motion.span
                    animate={isHovered ? { scale: 1.2, backgroundColor: "#22c55e" } : { scale: 1, backgroundColor: "#374151" }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                />
                <span className="truncate group-hover/item:text-gray-200 transition-colors">{item.label}</span>
            </div>

            {(item.onEdit || item.onDelete) && (
                <div className="hidden group-hover/item:flex items-center gap-1 absolute right-2 bg-[#0a0a0a] shadow-xl rounded-lg border border-white/5 p-0.5">
                    {item.onEdit && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-blue-400 transition-colors"
                            title="Rename"
                        >
                            <Pencil className="w-3 h-3" />
                        </button>
                    )}
                    {item.onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this chat?')) item.onDelete?.();
                            }}
                            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
}
