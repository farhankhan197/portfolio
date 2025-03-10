"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const StarfieldBackground = () => {
  if(typeof window === "undefined") return null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const [isWarping, setIsWarping] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let centerX = canvasWidth * 0.5;
  let centerY = canvasHeight * 0.5;
  let stars: Star[] = [];
  let bgColor = theme === "dark" ? "#111" : "#f0f0f0";

  // Warp effect variables
  let warpFactor = 1;
  const maxWarpFactor = 8;
  const warpAcceleration = 0.2;
  const slowdownDuration = 80; // Longer slowdown duration for a smooth effect
  let slowdownProgress = 0;
  let isSlowingDown = false;

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
        this.distance = Math.pow(Math.random(), 0.5);
        this.speed = 0.0005 + Math.random() * 0.001;
        this.maxRadius = 1 + Math.random() * 2;
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
        this.distance = 0.01;
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
          const opacity = remap(i, 0, this.trail.length - 1, 0.8, 0);

          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.strokeStyle =
            theme === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
          ctx.lineWidth = radius * 0.8 * (1 - i / this.trail.length);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = theme === "dark" ? "#fff" : "#000";
      ctx.fill();
    }
  }

  function setup() {
    if (stars.length === 0) {
      stars = Array.from({ length: 5}, () => new Star());
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
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

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
    isSlowingDown = false;
  }

  function stopWarp() {
    slowdownProgress = 0;
    isSlowingDown = true;

    const easeOutSlowdown = () => {
      slowdownProgress++;

      if (slowdownProgress <= slowdownDuration) {
        const progress = slowdownProgress / slowdownDuration;
        warpFactor = 1 + (maxWarpFactor - 1) * Math.pow(1 - progress, 3); // Smooth cubic ease-out

        if (slowdownProgress > slowdownDuration * 0.8) {
          // Overshoot effect: slow down slightly below 1 before settling
          warpFactor = 1 + (warpFactor - 1) * 0.9;
        }

        requestAnimationFrame(easeOutSlowdown);
      } else {
        warpFactor = 1;
        isSlowingDown = false;
        setIsWarping(false);
      }
    };

    easeOutSlowdown();
  }

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [theme]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestAnchor = target.closest("a");

      if (
        closestAnchor &&
        closestAnchor.href.startsWith(window.location.origin) &&
        !closestAnchor.target &&
        !closestAnchor.hasAttribute("download") &&
        !(e.ctrlKey || e.metaKey || e.shiftKey)
      ) {
        startWarp();
        setTimeout(stopWarp, 600);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }} />;
};

function remap(value: number, from1: number, to1: number, from2: number, to2: number) {
  return from2 + ((value - from1) * (to2 - from2)) / (to1 - from1);
}

export default StarfieldBackground;

