"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const FallingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme(); // Use resolvedTheme instead of theme
  
  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      trail: Array<{x: number, y: number}>;
    }> = [];
    
    // Handle resize - crucial for mobile
    const handleResize = () => {
      // Set canvas dimensions to window dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // After resize, recreate stars to match new dimensions
      initStars();
    };
    
    // Initialize stars
    const initStars = () => {
      const isMobile = window.innerWidth < 768;
      const starCount = isMobile ? 20 : 60; // Fewer stars on mobile
      
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3, // Smaller stars
          speed: (Math.random() * 0.5 + 0.1) * (isMobile ? 0.7 : 1), // Slower on mobile
          opacity: Math.random() * 0.5 + 0.3,
          trail: []
        });
      }
    };
    
    // Draw everything
    const draw = () => {
      const isDark = resolvedTheme === 'dark';
      const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
      
      // Clear canvas with very subtle background to help with rendering
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach(star => {
        // Move star
        star.y += star.speed;
        
        // Add current position to trail
        star.trail.push({x: star.x, y: star.y});
        
        // Limit trail length
        const isMobile = window.innerWidth < 768;
        const maxTrail = isMobile ? 3 : 5;
        if (star.trail.length > maxTrail) {
          star.trail.shift();
        }
        
        // Draw trail
        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          for (let i = 1; i < star.trail.length; i++) {
            ctx.lineTo(star.trail[i].x, star.trail[i].y);
          }
          ctx.strokeStyle = `rgba(${baseColor}, ${star.opacity * 0.3})`;
          ctx.lineWidth = star.size / 2;
          ctx.stroke();
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${star.opacity})`;
        ctx.fill();
        
        // Reset if off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.trail = [];
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]); // Only depend on resolvedTheme
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        touchAction: 'none'
      }}
    />
  );
};

export default FallingStarsBackground;