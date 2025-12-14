import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white font-mono p-8 text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4 animate-pulse">SYSTEM FAILURE</h1>
                    <p className="text-gray-400 mb-8">A critical error has occurred in the neural net.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all font-bold"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
