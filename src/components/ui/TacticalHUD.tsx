import { useEffect, useState } from 'react';

export function TacticalHUD() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-lg hidden md:block" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 rounded-tr-lg hidden md:block" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 rounded-bl-lg hidden md:block" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/10 rounded-br-lg hidden md:block" />

            {/* Coordinates Stream */}
            <div className="absolute bottom-10 left-12 font-mono text-[10px] text-white/20 tracking-widest hidden md:flex flex-col gap-1">
                <span>X: {mouse.x.toString().padStart(4, '0')}</span>
                <span>Y: {mouse.y.toString().padStart(4, '0')}</span>
                <span>SYS: ONLINE</span>
            </div>

            {/* Center Reticle (follows mouse with delay handled by CSS) */}
            <div
                className="absolute w-[800px] h-[800px] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]"
                style={{
                    borderStyle: 'dashed',
                    borderWidth: '1px'
                }}
            />
            {/* Scanlines - Ultra Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-[0.03]" />
        </div>
    );
}
