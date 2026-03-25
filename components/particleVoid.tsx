import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";

interface ParticleVoidProps {
  isDarkMode: boolean;
}

function ParticleVoid({ isDarkMode }: ParticleVoidProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  
  const particleCount = 1500;
  const baseRadius = 2.8;
  
  const [positions, velocities, phases, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);
    const baseColor = new THREE.Color().setHSL(0.7, 0.6, 0.5);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = baseRadius + Math.random() * 1.8;
      
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
      
      const maxDist = 4.0;
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