import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Cloud, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function StarField() {
    const ref = useRef<any>(null);
    const { mouse } = useThree();

    useFrame((_state, delta) => {
        if (ref.current) {
            // Subtle parallax based on mouse
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.2, delta * 0.5);
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.2, delta * 0.5);

            // Constant slow rotation
            ref.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group ref={ref}>
            <Stars radius={300} depth={50} count={3000} factor={6} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#ec4899" />
            <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#3b82f6" />
        </group>
    );
}

function Nebula() {
    const ref = useRef<any>(null);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.02;
        }
    });

    return (
        <group ref={ref}>
            <Cloud opacity={0.1} speed={0.4} segments={20} color="#a855f7" position={[15, 0, -15]} />
            <Cloud opacity={0.1} speed={0.4} segments={20} color="#3b82f6" position={[-15, -5, -20]} />
        </group>
    );
}

export function GlobalScene() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#02040a]">
            {/* We use specific camera implementation to ensure it works globally */}
            {/* Performance Optimization: Limit DPR to 1.5 for guaranteed 120fps */}
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
                {/* Fog for depth */}
                <fog attach="fog" args={['#02040a', 15, 45]} />
                <color attach="background" args={['#02040a']} />

                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <StarField />
                    <Nebula />
                </Float>
            </Canvas>

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
        </div>
    );
}
