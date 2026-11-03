import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// Airflow cool mist particle system
function CoolAirParticles({ isBlowing = true }) {
  const pointsRef = useRef();
  const particleCount = 120;

  const [positions, velocities, opacities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const op = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spawn across the bottom louver width (-2.2 to 2.2)
      pos[i * 3 + 0] = (Math.random() - 0.5) * 4.2;
      pos[i * 3 + 1] = -0.7 - Math.random() * 0.4;
      pos[i * 3 + 2] = 0.5 + Math.random() * 0.4;

      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = -0.015 - Math.random() * 0.025; // blow downwards
      vel[i * 3 + 2] = 0.008 + Math.random() * 0.015; // push slightly forward

      op[i] = Math.random();
    }
    return [pos, vel, op];
  }, [particleCount]);

  useFrame(() => {
    if (!pointsRef.current || !isBlowing) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < particleCount; i++) {
      array[i * 3 + 0] += velocities[i * 3 + 0];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset when fallen too far
      if (array[i * 3 + 1] < -3.2) {
        array[i * 3 + 0] = (Math.random() - 0.5) * 4.2;
        array[i * 3 + 1] = -0.7;
        array[i * 3 + 2] = 0.5 + Math.random() * 0.3;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color="#70E4FF"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 3D Split AC Unit Model
function ACIndoorUnit({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  const groupRef = useRef();
  const louverRef = useRef();
  const [targetLouverAngle, setTargetLouverAngle] = useState(0.4);

  // Subtle breathing rotation & mouse parallax
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Responsive mouse tilt
    const targetRotY = mousePos.x * 0.25;
    const targetRotX = -mousePos.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);

    // Dynamic louver opening angle based on scroll
    if (louverRef.current) {
      const openAngle = 0.35 + Math.sin(t * 1.5) * 0.04 + scrollProgress * 0.25;
      louverRef.current.rotation.x = THREE.MathUtils.lerp(louverRef.current.rotation.x, openAngle, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* MAIN CHASSIS (Aerodynamic curved body) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.8, 1.4, 1.1]} />
        <meshStandardMaterial
          color="#FAFAFA"
          roughness={0.18}
          metalness={0.08}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* FRONT BEVELED PANEL (Glossy high-tech finish) */}
      <mesh position={[0, 0.05, 0.58]}>
        <boxGeometry args={[4.76, 1.32, 0.08]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.12}
          metalness={0.05}
        />
      </mesh>

      {/* TOP AIR INTAKE GRILLE (Subtle horizontal ridges) */}
      <group position={[0, 0.68, -0.05]}>
        {[-0.3, -0.15, 0, 0.15, 0.3].map((z, i) => (
          <mesh key={i} position={[0, 0.02, z]}>
            <boxGeometry args={[4.4, 0.02, 0.06]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* CHROME / GREEN LOGO ACCENT STRIP */}
      <mesh position={[0, -0.32, 0.63]}>
        <boxGeometry args={[4.6, 0.025, 0.01]} />
        <meshStandardMaterial
          color="#00873E"
          roughness={0.2}
          metalness={0.8}
          emissive="#00873E"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* DIGITAL LED TEMPERATURE DISPLAY */}
      <group position={[1.65, -0.18, 0.63]}>
        {/* Glow backdrop */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.55, 0.22]} />
          <meshBasicMaterial color="#0A1118" />
        </mesh>
        {/* LED Digital text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.11}
          color="#22C55E"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_Pb.woff"
        >
          21°C ECO
        </Text>
      </group>

      {/* AMBIENT COOL-GLOW LIGHT STRIP (Underneath) */}
      <mesh position={[0, -0.66, 0.4]}>
        <boxGeometry args={[4.4, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* AIR DISCHARGE VENT CAVITY (Dark recess inside bottom) */}
      <mesh position={[0, -0.65, 0.1]}>
        <boxGeometry args={[4.5, 0.28, 0.6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* INTERNAL GUIDE VANES (Slats inside cavity) */}
      <group position={[0, -0.62, 0.15]}>
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0.15, 0]}>
            <boxGeometry args={[0.02, 0.2, 0.4]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* MOTORIZED BOTTOM LOUVER / FLAP (Rotates down to open) */}
      <group position={[0, -0.72, 0.48]}>
        <group ref={louverRef} position={[0, 0, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[4.55, 0.3, 0.04]} />
            <meshStandardMaterial
              color="#F8FAFC"
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        </group>
      </group>

      {/* AIR BLOWING PARTICLES */}
      <CoolAirParticles isBlowing={true} />
    </group>
  );
}

// Fallback HTML/CSS visual if WebGL is not active
function ACUnitFallback() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[640px] mx-auto py-4 px-2 flex flex-col items-center">
      {/* High-tech wall-mounted AC unit chassis */}
      <div className="w-full h-36 sm:h-44 bg-gradient-to-b from-white via-slate-50 to-slate-200 rounded-2xl sm:rounded-[28px] shadow-2xl border border-slate-200/90 relative flex flex-col justify-between p-3.5 sm:p-5 overflow-hidden">
        {/* Top subtle air intake ridges */}
        <div className="absolute top-2 inset-x-8 sm:inset-x-12 h-2 flex justify-between gap-1 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-slate-400 rounded-full" />
          ))}
        </div>

        {/* Brand label & LED indicator */}
        <div className="flex items-center justify-between w-full pt-1.5 px-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-green-500 shadow-sm shadow-brand-green-500/50 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider sm:tracking-widest text-slate-800 uppercase font-sans">
              <span className="text-brand-green-500 font-black">JE</span><span className="text-brand-red-500 font-black">FF</span> <span className="text-brand-green-600 font-bold">INVERTER</span>
            </span>
          </div>

          <div className="bg-slate-900/95 text-emerald-400 font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-inner border border-slate-700/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold tracking-wider">21°C • ECO</span>
          </div>
        </div>

        {/* Center Chrome / Brand Accent Strip */}
        <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-brand-green-500 to-transparent opacity-80 rounded-full my-auto" />

        {/* Lower Motorized Louver Flap */}
        <div className="w-full bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-md p-1.5 sm:p-2 flex items-center justify-between relative overflow-hidden">
          {/* Internal cooling slats visible inside */}
          <div className="w-full h-2.5 sm:h-3 bg-slate-800 rounded-md flex items-center justify-evenly px-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-0.5 sm:w-1 h-full bg-slate-600 transform skew-x-12" />
            ))}
          </div>
          {/* Ambient cyan cool-light strip */}
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38BDF8]" />
        </div>
      </div>

      {/* Billowing Cool Air Breeze Glow Effect */}
      <div className="w-[85%] h-20 sm:h-28 bg-gradient-to-b from-cyan-400/35 via-emerald-300/15 to-transparent blur-xl rounded-b-full pointer-events-none -mt-2 animate-pulse-glow" />
    </div>
  );
}

export default function ACUnit3DCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const max = 600;
      setScrollProgress(Math.min(scrolled / max, 1));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (hasError) {
    return <ACUnitFallback />;
  }

  return (
    <div className="relative w-full h-[400px] md:h-[480px] lg:h-[520px] select-none cursor-grab active:cursor-grabbing">
      <Suspense fallback={<ACUnitFallback />}>
        <Canvas
          camera={{ position: [0, 0.4, 5.2], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          onError={() => setHasError(true)}
        >
          {/* Studio Lights */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[4, 5, 4]}
            intensity={2.2}
            castShadow
            shadow-mapSize={1024}
          />
          <directionalLight position={[-4, 3, -2]} intensity={0.9} color="#BEE3F8" />
          <spotLight
            position={[0, -2, 3]}
            intensity={1.4}
            color="#67E8F9"
            angle={0.6}
            penumbra={0.8}
          />

          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <ACIndoorUnit scrollProgress={scrollProgress} mousePos={mousePos} />
          </Float>

          {/* Soft grounding shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.45}
            scale={8}
            blur={2.4}
            far={4}
          />
        </Canvas>
      </Suspense>

      {/* Floating Airflow glow overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-500/10 via-cyan-400/5 to-transparent pointer-events-none blur-xl" />
    </div>
  );
}
