import { Plus, Ticket, ArrowLeft, LifeBuoy } from 'lucide-react';
import { useUser, UserButton } from '@clerk/clerk-react';

interface SupportSidebarProps {
    onNewTicket: () => void;
    currentTicketId: string | null;
    tickets: Array<{ id: string; label: string; updated_at: string }>;
    onSelectTicket: (id: string) => void;
    onBack: () => void; // New prop for transition
}

export function SupportSidebar({ onNewTicket, currentTicketId, tickets, onSelectTicket, onBack }: SupportSidebarProps) {
    const { user } = useUser();

    return (
        <div className="w-80 bg-black/95 border-r border-white/10 flex flex-col shrink-0 font-sans backdrop-blur-xl relative z-20">
            {/* Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40"></div>
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center border border-white/20 shadow-xl">
                            <LifeBuoy className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight text-lg">Support</h1>
                        <p className="text-xs text-blue-400 font-medium tracking-wider">PREMIUM DESK</p>
                    </div>
                </div>

                <button
                    onClick={onNewTicket}
                    className="group w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Open New Ticket
                </button>
            </div>

            {/* Ticket List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <div className="px-2 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                    Your Active Tickets
                </div>
                {tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center opacity-50">
                        <Ticket className="w-8 h-8 text-gray-600 mb-2" />
                        <span className="text-xs text-gray-500">No active tickets</span>
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <button
                            key={ticket.id}
                            onClick={() => onSelectTicket(ticket.id)}
                            className={`group w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all border relative overflow-hidden ${currentTicketId === ticket.id
                                ? 'bg-white/10 border-blue-500/50 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                }`}
                        >
                            {currentTicketId === ticket.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl" />
                            )}
                            <div className="flex items-center gap-3">
                                <span className="font-medium truncate flex-1 relative z-10">{ticket.label.replace('🎫 ', '') || 'Untitled Ticket'}</span>
                            </div>
                            <div className="text-[10px] text-gray-600 mt-1 font-mono relative z-10 flex items-center gap-1">
                                <span>ID: {ticket.id.slice(0, 6)}</span>
                                {currentTicketId === ticket.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-auto" />}
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/40 border-t border-white/5 space-y-4">
                <button
                    onClick={onBack}
                    className="w-full flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400" />
                    <span>Back to Chat Studio</span>
                </button>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 ring-2 ring-white/10"
                        }
                    }} />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">{user?.fullName}</span>
                        <span className="text-[10px] text-blue-400 font-mono">ENTERPRISE_PLAN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
