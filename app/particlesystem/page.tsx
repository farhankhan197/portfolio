"use client"
import ParticleVoid from "@/components/particleVoid";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
export default function ParticleSystem() {
    const { resolvedTheme } = useTheme();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent text-black dark:text-white">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ParticleVoid isDarkMode={resolvedTheme === 'dark'} />
            </Canvas>
        </div>
    );
}