
export function Logo({ className = "", size = "default" }: { className?: string, size?: "default" | "large" }) {
    const isLarge = size === "large";

    return (
        <div className={`filter drop-shadow-lg flex items-center gap-2 select-none ${className}`}>


            {/* Original Text Gradient */}
            <div className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                Saswat AI Studio
            </div>
        </div>
    );
}
