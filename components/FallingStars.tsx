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

    // Resize canvas to match screen size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
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

    const maxStars = window.innerWidth < 768 ? 40 : 80; // Reduce stars on mobile
    const stars: Star[] = [];

    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Prevent invisible stars
        speedY: 0.5 + Math.random() * 0.7, // Slightly faster
        speedX: (Math.random() - 0.5) * 0.3,
        trail: [],
        maxTrailLength: Math.floor(5 + Math.random() * 8),
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    const animate = () => {
      const isDarkMode = theme === "dark";
      const starColor = isDarkMode ? "rgba(255, 255, 255," : "rgba(0, 0, 0,";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;

        star.trail.push({ x: star.x, y: star.y });

        if (star.trail.length > star.maxTrailLength) {
          star.trail.shift();
        }

        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          for (let i = 1; i < star.trail.length; i++) {
            ctx.lineTo(star.trail[i].x, star.trail[i].y);
          }
          ctx.strokeStyle = `${starColor}${star.opacity * 0.3})`;
          ctx.lineWidth = star.size / 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor}${star.opacity})`;
        ctx.fill();

        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
          star.trail = [];
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1, touchAction: "none" }} // Prevent mobile touch interference
    />
  );
};

export default FallingStarsBackground;
