"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const FallingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Star properties
    interface Star {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      trail: { x: number; y: number }[];
      maxTrailLength: number;
      opacity: number;
    }

    const stars: Star[] = [];
    const maxStars = 100;

    // Initialize stars
    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedY: 0.1 + Math.random() * 0.3,
        speedX: (Math.random() - 0.5) * 0.1,
        trail: [],
        maxTrailLength: Math.floor(5 + Math.random() * 10),
        opacity: 0.1 + Math.random() * 0.9,
        
      });
    }

    // Animation loop
    const animate = () => {
      const isDarkMode = theme === "dark"; // Check if the current theme is dark
      const starColor = isDarkMode ? "rgba(255, 255, 255," : "rgba(0, 0, 0,";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        // Update position
        star.y += star.speedY;
        star.x += star.speedX;

        // Add current position to trail
        star.trail.push({ x: star.x, y: star.y });

        // Limit trail length
        if (star.trail.length > star.maxTrailLength) {
          star.trail.shift();
        }

        // Draw trail
        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);

          for (let i = 1; i < star.trail.length; i++) {
            ctx.lineTo(star.trail[i].x, star.trail[i].y);
          }

          ctx.strokeStyle = `${starColor}${star.opacity * 0.5})`;
          ctx.lineWidth = star.size / 2;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor}${star.opacity})`;
        ctx.fill();

        // Reset if star goes out of bounds
        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.trail = [];
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run animation when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default FallingStarsBackground;
