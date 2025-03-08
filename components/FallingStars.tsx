"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const FallingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Resize canvas to match screen size - simplified for mobile
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset after resize to prevent scaling issues
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
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
    
    // Reduce complexity for mobile
    const isMobile = window.innerWidth < 768;
    const maxStars = isMobile ? 30 : 80;
    const maxTrailLength = isMobile ? 4 : 8;
    
    const stars: Star[] = [];
    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Slightly reduced size range
        speedY: (0.3 + Math.random() * 0.5) * (isMobile ? 0.8 : 1), // Slower on mobile
        speedX: (Math.random() - 0.5) * 0.2,
        trail: [],
        maxTrailLength: Math.floor(3 + Math.random() * maxTrailLength),
        opacity: 0.5 + Math.random() * 0.5,
      });
    }
    
    let lastTime = 0;
    const fps = isMobile ? 30 : 60; // Lower FPS on mobile
    const interval = 1000 / fps;
    
    const animate = (timestamp: number) => {
      const currentTheme = theme || 'light';
      const isDarkMode = currentTheme === "dark";
      const starColor = isDarkMode ? "rgba(255, 255, 255," : "rgba(0, 0, 0,";
      
      // Throttle animation for better performance
      if (timestamp - lastTime < interval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;
        
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > star.maxTrailLength) {
          star.trail.shift();
        }
        
        // Only draw trails if we have enough points
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
        
        // Reset star when it goes off-screen
        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
          star.trail = [];
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Wait a bit before starting animation on mobile
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, isMobile ? 300 : 0);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  // Only render canvas after mount to prevent SSR issues
  if (!isMounted) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1, 
        touchAction: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
      aria-hidden="true"
    />
  );
};

export default FallingStarsBackground;