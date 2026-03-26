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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="mx-auto" style={{ width: 200, height: 200 }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticleVoid isDarkMode={resolvedTheme === 'dark'} />
          </Canvas>
          <p className="text-sm text-muted-foreground tracking-widest mt-4">
            Loading...
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-border hover:bg-accent rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}