import { useCallback } from 'react';
import { synth } from '../lib/audio';

export function useSfx() {
    const playHover = useCallback(() => {
        try {
            synth.playHover();
        } catch (e) {
            // Ignore audio context errors
        }
    }, []);

    const playClick = useCallback(() => {
        try {
            synth.playClick();
        } catch (e) {
            // Ignore
        }
    }, []);

    const playType = useCallback(() => {
        try {
            synth.playType();
        } catch (e) {
            // Ignore
        }
    }, []);

    return { playHover, playClick, playType };
}
