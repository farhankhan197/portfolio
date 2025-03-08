"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme(); // Get current theme
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let centerX = canvasWidth * 0.5;
    let centerY = canvasHeight * 0.5;
    let numberOfStars = 500;
    let stars: Star[] = [];
    let framesPerSecond = 60;
    let interval = Math.floor(1000 / framesPerSecond);
    let previousTime = performance.now();
    let bgColor = theme === "dark" ? "#111" : "#f0f0f0"; // Dynamic background color

    class Star {
      x: number;
      y: number;
      counter: number;
      radiusMax: number;
      speed: number;

      constructor() {
        this.x = getRandomInt(-centerX, centerX);
        this.y = getRandomInt(-centerY, centerY);
        this.counter = getRandomInt(1, canvasWidth);
        this.radiusMax = 1 + Math.random() * 10;
        this.speed = getRandomInt(1, 5);
      }

      drawStar() {
        if (!ctx) return;

        this.counter -= this.speed;
        if (this.counter < 1) {
          this.counter = canvasWidth;
          this.x = getRandomInt(-centerX, centerX);
          this.y = getRandomInt(-centerY, centerY);
          this.radiusMax = getRandomInt(1, 10);
          this.speed = getRandomInt(1, 5);
        }

        const xRatio = this.x / this.counter;
        const yRatio = this.y / this.counter;
        const starX = remap(xRatio, 0, 1, 0, canvasWidth);
        const starY = remap(yRatio, 0, 1, 0, canvasHeight);
        const radius = remap(this.counter, 0, canvasWidth, this.radiusMax, 0);

        ctx.beginPath();
        ctx.arc(starX, starY, radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = theme === "dark" ? "#fff" : "#000"; // Star color adapts to theme
        ctx.fill();
      }
    }

    function setup() {
      stars = [];
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
      }
    }

    function draw(timestamp: number) {
      if (!ctx) return;

      const deltaTime = timestamp - previousTime;
      if (deltaTime > interval) {
        previousTime = timestamp - (deltaTime % interval);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = bgColor; // Use theme-based background
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.save();
        ctx.translate(centerX, centerY);
        stars.forEach((star) => star.drawStar());
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    function resizeCanvas() {
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      centerX = canvasWidth * 0.5;
      centerY = canvasHeight * 0.5;
      setup();
    }

    // Helper functions
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function remap(value: number, from1: number, to1: number, from2: number, to2: number) {
      return from2 + ((value - from1) * (to2 - from2)) / (to1 - from1);
    }

    // Initialize the canvas
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default StarfieldBackground;
