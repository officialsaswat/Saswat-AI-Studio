import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function CoreMesh({ isHovered }: { isHovered: boolean }) {
    const mesh = useRef<any>(null);

    useFrame((state) => {
        if (mesh.current) {
            // "Breathing" rotation
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere args={[1, 32, 32]} ref={mesh} scale={isHovered ? 1.2 : 1}>
            <MeshDistortMaterial
                color={isHovered ? "#ec4899" : "#3b82f6"} // Turn pink on hover, blue idle
                attach="material"
                distort={0.4} // Slightly reduced distortion for performance
                speed={2} // Ripple speed
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

export function CompanionCore() {
    const [hovered, setHover] = useState(false);

    return (
        <motion.div
            className="fixed bottom-4 right-4 w-20 h-20 md:bottom-8 md:right-8 md:w-32 md:h-32 z-10 pointer-events-auto cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full blur-xl transition-colors duration-500 ${hovered ? 'bg-pink-500/30' : 'bg-blue-500/20'}`} />

            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                    <CoreMesh isHovered={hovered} />
                </Float>
            </Canvas>
        </motion.div>
    );
}
