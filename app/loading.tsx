"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-transparent">
      <div className="w-full max-w-3xl space-y-4 mt-20">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="h-20 bg-muted rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}