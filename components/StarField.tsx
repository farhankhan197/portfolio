"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleVoidProps {
  isDarkMode: boolean;
}

function ParticleVoid({ isDarkMode }: ParticleVoidProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  
  const particleCount = 1500;
  const baseRadius = 1.8;
  
  const [positions, velocities, phases, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);
    const baseColor = new THREE.Color().setHSL(0.7, 0.6, 0.5);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = baseRadius + Math.random() * 1.2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
      
      ph[i] = Math.random() * Math.PI * 2;
      
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }
    
    return [pos, vel, ph, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colorArray = pointsRef.current.geometry.attributes.color?.array as Float32Array | undefined;
    const baseColor = new THREE.Color().setHSL(0.7, 0.6, 0.5);
    const time = state.clock.elapsedTime;
    
    const aspect = size.width / size.height;
    const mouseX = (state.pointer.x * 0.5 + 0.5) * aspect * 2.5;
    const mouseY = -(state.pointer.y * 0.5 - 0.5) * 2 * 2.5;
    
    const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const pullStrength = distanceFromCenter * 0.12;
    const basePull = distanceFromCenter * 0.015;
    
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      const baseAngle = time * 0.06 + phases[i] * 0.08;
      const origX = Math.sin(baseAngle + i * 0.002) * (baseRadius + Math.sin(phases[i]) * 0.25);
      const origY = Math.cos(baseAngle * 0.7 + i * 0.003) * (baseRadius + Math.cos(phases[i]) * 0.25);
      const origZ = Math.sin(baseAngle * 0.5 + i * 0.001) * (baseRadius + Math.sin(phases[i] * 2) * 0.25);
      
      const noiseX = Math.sin(time * 0.25 + i * 0.01 + phases[i]) * 0.12;
      const noiseY = Math.cos(time * 0.2 + i * 0.015 + phases[i]) * 0.12;
      const noiseZ = Math.sin(time * 0.3 + i * 0.012 + phases[i]) * 0.12;
      
      posArray[idx] = origX + noiseX;
      posArray[idx + 1] = origY + noiseY;
      posArray[idx + 2] = origZ + noiseZ;
      
      const dx = -posArray[idx];
      const dy = -posArray[idx + 1];
      const dz = -posArray[idx + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (dist > 0.1) {
        const force = basePull + (dist < 1 ? pullStrength * (1 - dist) : 0);
        velocities[idx] += (dx / dist) * force;
        velocities[idx + 1] += (dy / dist) * force;
        velocities[idx + 2] += (dz / dist) * force;
      }
      
      velocities[idx] *= 0.98;
      velocities[idx + 1] *= 0.98;
      velocities[idx + 2] *= 0.98;
      
      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];
      
      const maxDist = 2.8;
      const currentDist = Math.sqrt(posArray[idx] ** 2 + posArray[idx + 1] ** 2 + posArray[idx + 2] ** 2);
      if (currentDist > maxDist) {
        const scale = maxDist / currentDist;
        posArray[idx] *= scale;
        posArray[idx + 1] *= scale;
        posArray[idx + 2] *= scale;
      }

      if (colorArray) {
        const normalizedDist = currentDist / maxDist;
        let opacity = 0.35 - normalizedDist * 0.3;
        opacity = Math.max(0.02, Math.min(0.4, opacity));
        
        if (isDarkMode) {
          colorArray[idx] = baseColor.r * opacity;
          colorArray[idx + 1] = baseColor.g * opacity;
          colorArray[idx + 2] = baseColor.b * opacity;
        } else {
          colorArray[idx] = baseColor.r * opacity * 0.7;
          colorArray[idx + 1] = baseColor.g * opacity * 0.7;
          colorArray[idx + 2] = baseColor.b * opacity * 0.7;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (pointsRef.current.geometry.attributes.color) {
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef as any} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

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
        <ParticleVoid isDarkMode={isDarkMode} />
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
