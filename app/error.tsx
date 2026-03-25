"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ParticleVoid from "@/components/particleVoid";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="mx-auto" style={{ width: 200, height: 200 }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticleVoid isDarkMode={resolvedTheme === 'dark'} />
          </Canvas>
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-widest mt-4">
            Loading...
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}