import React, { useEffect, useRef, useState } from 'react';

export const OrbitalVisual = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Subtle ambient stardust background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.008 + 0.003,
      pulse: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.pulse += star.speed;
        const currentAlpha = 0.2 + (Math.sin(star.pulse) + 1) * 0.3 * star.alpha;
        ctx.fillStyle = `rgba(196, 181, 253, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const parallaxX = mousePos.x * 24;
  const parallaxY = mousePos.y * 24;

  return (
    <div ref={containerRef} className="orbital-visual-wrapper">
      <canvas ref={canvasRef} className="orbital-star-canvas" />

      {/* Ambient Celestial Glow */}
      <div 
        className="orbital-ambient-glow" 
        style={{
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`
        }}
      />

      {/* Concentric Orbital Geometry */}
      <svg
        className="orbital-svg"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
        }}
      >
        {/* Outermost Orbit */}
        <circle
          cx="300"
          cy="300"
          r="260"
          stroke="rgba(196, 181, 253, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="orbit-ring-slow"
        />

        {/* Outer Orbit */}
        <circle
          cx="300"
          cy="300"
          r="210"
          stroke="rgba(196, 181, 253, 0.2)"
          strokeWidth="1"
          className="orbit-ring-medium"
        />

        {/* Orbit Node 1 */}
        <g className="orbit-rotate-clockwise">
          <circle cx="510" cy="300" r="4" fill="#C4B5FD" />
          <circle cx="510" cy="300" r="10" stroke="rgba(196, 181, 253, 0.25)" strokeWidth="1" />
        </g>

        {/* Mid Orbit */}
        <circle
          cx="300"
          cy="300"
          r="150"
          stroke="rgba(167, 139, 250, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="8 6"
        />

        {/* Orbit Node 2 */}
        <g className="orbit-rotate-counter">
          <circle cx="150" cy="300" r="5" fill="#7C3AED" />
          <circle cx="150" cy="300" r="14" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1" strokeDasharray="2 3" />
        </g>

        {/* Inner Core Orbit */}
        <circle
          cx="300"
          cy="300"
          r="90"
          stroke="rgba(196, 181, 253, 0.3)"
          strokeWidth="1"
        />

        {/* Core Astrolabe / Celestial Cross */}
        <line x1="300" y1="200" x2="300" y2="400" stroke="rgba(196, 181, 253, 0.18)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="200" y1="300" x2="400" y2="300" stroke="rgba(196, 181, 253, 0.18)" strokeWidth="1" strokeDasharray="2 4" />

        {/* Central Pulsing Star */}
        <circle cx="300" cy="300" r="28" fill="url(#coreGradient)" />
        <circle cx="300" cy="300" r="42" stroke="rgba(196, 181, 253, 0.4)" strokeWidth="1" strokeDasharray="3 3" className="core-pulse" />
        <circle cx="300" cy="300" r="6" fill="#F5F4F0" />

        {/* Gradients */}
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
