import React, { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/harini-avatar-feathered.png';
import mascotImg from '../assets/harini-mascot.png';
import { IconSparkles } from './Icons';

export const AvatarHeroVisual = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });

  // Mouse tracking for subtle 3D parallax tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Gentle dampening for subtle, luxury feel
      setTilt({
        rotateX: -y * 10,
        rotateY: x * 10,
        translateX: x * 16,
        translateY: y * 16
      });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Floating stardust & cosmic particles canvas
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

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI,
      speed: Math.random() * 0.015 + 0.005,
      driftY: (Math.random() - 0.5) * 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulse += p.speed;
        p.y += p.driftY;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentAlpha = 0.2 + (Math.sin(p.pulse) + 1) * 0.4 * p.alpha;
        ctx.fillStyle = `rgba(196, 181, 253, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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

  return (
    <div ref={containerRef} className="avatar-stage-container">
      {/* Background Star Particle Canvas */}
      <canvas ref={canvasRef} className="avatar-star-canvas" />

      {/* Layer 1: Ambient Violet / Lavender Nebula Glow */}
      <div 
        className="avatar-ambient-nebula"
        style={{
          transform: `translate(${tilt.translateX * 0.5}px, ${tilt.translateY * 0.5}px)`
        }}
      />

      {/* Layer 2: Rotating Cosmic Orbital Rings */}
      <div 
        className="avatar-orbital-rig"
        style={{
          transform: `translate(${tilt.translateX * 0.7}px, ${tilt.translateY * 0.7}px)`
        }}
      >
        <svg 
          viewBox="0 0 600 600" 
          className="avatar-orbital-svg"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Circular Orbit */}
          <circle 
            cx="300" 
            cy="300" 
            r="270" 
            stroke="rgba(196, 181, 253, 0.12)" 
            strokeWidth="1" 
            strokeDasharray="4 8"
            className="ring-rotate-slow"
          />

          {/* Signature Elliptical Violet Glowing Orbit (matches the reference artwork!) */}
          <g className="ellipse-orbit-group">
            <ellipse 
              cx="300" 
              cy="310" 
              rx="280" 
              ry="110" 
              stroke="url(#violetOrbitGlow)" 
              strokeWidth="2.5" 
              className="ellipse-orbit-pulse"
              transform="rotate(-18 300 310)"
            />

            {/* Orbiting Celestial Node */}
            <g className="orbit-node-carrier">
              <circle cx="560" cy="225" r="5" fill="#C4B5FD" filter="url(#glowFilter)" />
              <circle cx="560" cy="225" r="12" stroke="rgba(196, 181, 253, 0.3)" strokeWidth="1" />
            </g>
          </g>

          {/* Secondary Counter Elliptical Orbit */}
          <ellipse 
            cx="300" 
            cy="290" 
            rx="230" 
            ry="85" 
            stroke="rgba(167, 139, 250, 0.22)" 
            strokeWidth="1.2" 
            strokeDasharray="6 6"
            transform="rotate(22 300 290)"
            className="ring-rotate-reverse"
          />

          {/* Subtle Concentric Rings */}
          <circle cx="300" cy="300" r="190" stroke="rgba(196, 181, 253, 0.08)" strokeWidth="1" />

          {/* SVG Definitions */}
          <defs>
            <linearGradient id="violetOrbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Layer 3: Interactive Animated Avatar Portrait with 3D Tilt */}
      <div 
        className="avatar-artwork-frame"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.translateX}px, ${tilt.translateY}px, 0)`
        }}
      >
        <div className="avatar-artwork-inner">
          <img 
            src={avatarImg} 
            alt="Madhu Harini Maanthi Avatar Artwork" 
            className="avatar-character-image"
          />
          {/* Subtle bottom fade gradient to seamlessly blend into dark background */}
          <div className="avatar-bottom-blend-fade" />
        </div>
      </div>

      {/* Layer 4: Floating Celestial Badges (Reference Art Elements) */}
      <div 
        className="avatar-floating-badge badge-top-right"
        style={{
          transform: `translate(${tilt.translateX * 1.2}px, ${tilt.translateY * 1.2}px)`
        }}
      >
        <span className="badge-script">Dream • Code • Create</span>
      </div>

      {/* Layer 5: Cute Space Mascot Easter Egg */}
      <div 
        className="avatar-mascot-pill"
        title="Cosmic Companion Mascot"
        style={{
          transform: `translate(${tilt.translateX * 0.9}px, ${tilt.translateY * 0.9}px)`
        }}
      >
        <img src={mascotImg} alt="Cosmic Mascot" className="mascot-img" />
        <div className="mascot-status">
          <span className="mascot-dot"></span>
          <span>Online</span>
        </div>
      </div>

    </div>
  );
};
