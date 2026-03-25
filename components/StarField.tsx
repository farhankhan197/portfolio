"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree } from "@react-three/fiber";


const StarfieldBackground = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isWarping, setIsWarping] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  let canvasWidth = 0;
  let canvasHeight = 0;
  let centerX = 0;
  let centerY = 0;
  let stars: Star[] = [];
  let bgColor = "transparent";

  if (typeof window !== "undefined" && mounted) {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    centerX = canvasWidth * 0.5;
    centerY = canvasHeight * 0.5;
  }

  let warpFactor = 1;
  const maxWarpFactor = 8;
  const slowdownDuration = 80;
  let slowdownProgress = 0;

  class Star {
    normalizedX: number;
    normalizedY: number;
    distance: number;
    angle: number;
    speed: number;
    maxRadius: number;
    trail: { x: number; y: number }[];
    trailLength: number;

    constructor(existingStar?: Star) {  
      if (existingStar) {  
        this.angle = existingStar.angle;  
        this.distance = existingStar.distance;  
        this.speed = existingStar.speed;  
        this.maxRadius = existingStar.maxRadius;  
      } else {  
        this.angle = Math.random() * Math.PI * 2;  
        this.distance = 0.02 + Math.random() * 0.08;
        this.speed = 0.003 + Math.random() * 0.002;
        this.maxRadius = 0.8 + Math.random() * 1.5;
      }  

      this.normalizedX = Math.cos(this.angle) * this.distance;  
      this.normalizedY = Math.sin(this.angle) * this.distance;  
      this.trail = [];  
      this.trailLength = 0;  
    }  

    update() {  
      const currentSpeed = this.speed * warpFactor;  
      this.distance += currentSpeed;  

      if (this.distance > 1) {  
        this.distance = 0.02 + Math.random() * 0.06;
        this.angle = Math.random() * Math.PI * 2;
      }  

      this.normalizedX = Math.cos(this.angle) * this.distance;  
      this.normalizedY = Math.sin(this.angle) * this.distance;  

      const screenX = centerX + this.normalizedX * centerX;  
      const screenY = centerY + this.normalizedY * centerY;  
      this.trail.unshift({ x: screenX, y: screenY });  

      this.trailLength = Math.floor(warpFactor * 5);  
      if (this.trail.length > this.trailLength) {  
        this.trail.pop();  
      }  
    }  

    draw(ctx: CanvasRenderingContext2D) {  
      const screenX = centerX + this.normalizedX * centerX;  
      const screenY = centerY + this.normalizedY * centerY;  
      const radius = this.maxRadius * this.distance;  

      if (warpFactor > 1.05 && this.trail.length > 1) {  
        for (let i = 0; i < this.trail.length - 1; i++) {  
          const startPoint = this.trail[i];  
          const endPoint = this.trail[i + 1];  
          const opacity = remap(i, 0, this.trail.length - 1, 0.6, 0);  

          ctx.beginPath();  
          ctx.moveTo(startPoint.x, startPoint.y);  
          ctx.lineTo(endPoint.x, endPoint.y);  
          ctx.strokeStyle = isDarkMode
            ? `rgba(255, 255, 255, ${opacity})`  
            : `rgba(0, 0, 0, ${opacity})`;  
          ctx.lineWidth = radius * 0.6 * (1 - i / this.trail.length);  
          ctx.stroke();  
        }  
      }  

      ctx.beginPath();  
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2, false);  
      ctx.closePath();  
      ctx.fillStyle = isDarkMode ? "#fff" : "#000";  
      ctx.fill();  
    }
  }

  function setup() {
    if (stars.length === 0) {
      stars = Array.from({ length: 20 }, () => new Star());
    } else {
      stars = stars.map((existingStar) => new Star(existingStar));
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    stars.forEach((star) => {  
      star.update();  
      star.draw(ctx);  
    });  

    animationFrameId.current = requestAnimationFrame(draw);
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;  
    canvas.height = window.innerHeight;  
    canvasWidth = canvas.width;  
    canvasHeight = canvas.height;  
    centerX = canvasWidth * 0.5;  
    centerY = canvasHeight * 0.5;  

    setup();
  }

  function startWarp() {
    setIsWarping(true);
    warpFactor = maxWarpFactor;
  }

  function stopWarp() {
    slowdownProgress = 0;

    const easeOutSlowdown = () => {  
      slowdownProgress++;  

      if (slowdownProgress <= slowdownDuration) {  
        const progress = slowdownProgress / slowdownDuration;  
        warpFactor = 1 + (maxWarpFactor - 1) * Math.pow(1 - progress, 3);  
        requestAnimationFrame(easeOutSlowdown);  
      } else {  
        warpFactor = 1;  
        setIsWarping(false);  
      }  
    };  

    easeOutSlowdown();
  }

  useEffect(() => {
    const handleMouseDown = () => startWarp();
    const handleMouseUp = () => stopWarp();
    const handleTouchStart = () => startWarp();
    const handleTouchEnd = () => stopWarp();

    document.addEventListener("mousedown", handleMouseDown);  
    document.addEventListener("mouseup", handleMouseUp);  
    document.addEventListener("touchstart", handleTouchStart);  
    document.addEventListener("touchend", handleTouchEnd);  

    return () => {  
      document.removeEventListener("mousedown", handleMouseDown);  
      document.removeEventListener("mouseup", handleMouseUp);  
      document.removeEventListener("touchstart", handleTouchStart);  
      document.removeEventListener("touchend", handleTouchEnd);  
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {  
      window.removeEventListener("resize", resizeCanvas);  
      if (animationFrameId.current)  
        cancelAnimationFrame(animationFrameId.current);  
    };
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ position: "absolute", inset: 0 }}
      >
      
      </Canvas>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

function remap(
  value: number,
  from1: number,
  to1: number,
  from2: number,
  to2: number
) {
  return from2 + ((value - from1) * (to2 - from2)) / (to1 - from1);
}

export default StarfieldBackground;
