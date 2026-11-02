import React, { useRef, useEffect } from 'react';

/**
 * High-performance, volumetric cold air vapor & mist canvas
 * Generates realistic billowing plumes of chilled condensation moisture.
 */
export default function MoistAirMistCanvas({
  isBlowing = true,
  turbo = false,
  temperature = 21,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = particlesRef.current;

    // Spawn parameters
    const maxParticles = turbo ? 95 : 65;
    const spawnRate = turbo ? 3 : 2;

    const createParticle = () => {
      // Spawn across the bottom louver slit (width * 0.15 to width * 0.85)
      const x = width * 0.18 + Math.random() * (width * 0.64);
      const y = 8 + Math.random() * 8; // right at the vent opening
      const baseSpeed = turbo ? 2.8 : 1.8;
      const speedY = baseSpeed + Math.random() * 2.2;
      // Slight outward spreading from center
      const centerX = width * 0.5;
      const spread = (x - centerX) / (width * 0.5);
      const speedX = spread * (0.8 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.4;

      return {
        x,
        y,
        vx: speedX,
        vy: speedY,
        radius: 14 + Math.random() * 16,
        growth: 0.95 + Math.random() * 0.7,
        alpha: 0.55 + Math.random() * 0.35,
        maxLife: 60 + Math.random() * 35,
        life: 0,
        swirl: (Math.random() - 0.5) * 0.05,
      };
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Only spawn new mist if AC is blowing
      if (isBlowing) {
        for (let i = 0; i < spawnRate; i++) {
          if (particles.length < maxParticles) {
            particles.push(createParticle());
          }
        }
      }

      // Update and draw each vapor puff
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += p.growth;
        p.vx += Math.sin(p.y * 0.03 + tick * 0.05) * 0.04; // subtle air turbulence

        const progress = p.life / p.maxLife;
        // Fade in quickly, then smoothly fade out as it descends
        let currentAlpha = 0;
        if (progress < 0.2) {
          currentAlpha = (progress / 0.2) * p.alpha;
        } else {
          currentAlpha = (1 - (progress - 0.2) / 0.8) * p.alpha;
        }

        if (currentAlpha < 0) currentAlpha = 0;

        // Render soft radial mist gradient
        if (currentAlpha > 0.005) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          // Pure white-cyan icy cold condensation
          grad.addColorStop(0, `rgba(235, 252, 255, ${currentAlpha * 0.75})`);
          grad.addColorStop(0.35, `rgba(186, 242, 255, ${currentAlpha * 0.45})`);
          grad.addColorStop(0.7, `rgba(140, 230, 255, ${currentAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(140, 230, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Remove dead particles or fallen past canvas
        if (p.life >= p.maxLife || p.y > height + 20) {
          particles.splice(i, 1);
        }
      }

      // Draw downward ambient mist illumination cone when blowing
      if (isBlowing && particles.length > 5) {
        const coneGrad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        coneGrad.addColorStop(0, 'rgba(186, 242, 255, 0.25)');
        coneGrad.addColorStop(0.4, 'rgba(140, 230, 255, 0.12)');
        coneGrad.addColorStop(0.85, 'rgba(140, 230, 255, 0.03)');
        coneGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(width * 0.18, 0);
        ctx.lineTo(width * 0.82, 0);
        ctx.lineTo(width * 0.95, height * 0.85);
        ctx.lineTo(width * 0.05, height * 0.85);
        ctx.closePath();
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isBlowing, turbo, temperature]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'blur(3px)' }}
    />
  );
}
