import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { AvatarHeroVisual } from './AvatarHeroVisual';
import { IconArrowDown, IconArrowUpRight, IconSparkles, IconMapPin, IconMail } from './Icons';

export const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-container">
        
        {/* Left Column: Introduction & Interactive Links */}
        <div className="hero-content">
          
          {/* Greeting & Meta Badges */}
          <div className="hero-greeting-row">
            <span className="hero-greeting-script">Hi, I'm</span>
            <span className="hero-sparkle-star">✦</span>
            <span className="hero-brand-pill">{personalInfo.brand}</span>
          </div>

          {/* Monumental Name */}
          <div className="hero-title-group">
            <h1 className="hero-title">
              <span className="hero-title-first">Madhu Harini</span>
              <span className="hero-title-last">Maanthi</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="hero-tagline">
            "{personalInfo.tagline}" <span className="heart-accent">♡</span>
          </p>

          {/* Role Status Pill (from reference artwork) */}
          <div className="hero-role-badge">
            <IconSparkles size={15} className="role-sparkle" />
            <span className="role-highlight">Aspiring Applied AI Engineer</span>
            <span className="role-separator">•</span>
            <span className="role-club">Technical Coordinator — Code Crypt</span>
          </div>

          {/* Bio text */}
          <p className="hero-bio">
            B.Tech Computer Science student at Stanley College of Engineering & Technology for Women. 
            Actively exploring Python, the foundations of Applied AI, and software engineering with a curious, builder mindset.
          </p>

          {/* Two Main Interactive Links (Requested) */}
          <div className="hero-actions">
            <a href="#about" className="btn-primary hero-btn-universe">
              <span>Explore My Universe</span>
              <span className="btn-star-icon">✦</span>
              <IconArrowDown size={16} />
            </a>

            <a href="#contact" className="btn-secondary hero-btn-connect">
              <IconMail size={16} />
              <span>Let's Connect</span>
            </a>

            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-ghost"
              title="GitHub Profile (Placeholder)"
            >
              <span>GitHub</span>
              <IconArrowUpRight size={14} />
            </a>
          </div>

          {/* Metadata pill row */}
          <div className="hero-meta-row">
            <span className="hero-badge">
              <IconMapPin size={13} className="hero-badge-icon" />
              {personalInfo.location}
            </span>
            <span className="meta-divider">•</span>
            <span className="hero-badge hero-badge-academic">
              {personalInfo.education.period}
            </span>
            <span className="meta-divider">•</span>
            <span className="hero-badge hero-badge-status">
              <span className="status-dot-pulse-sm"></span>
              {personalInfo.status}
            </span>
          </div>

        </div>

        {/* Right Column: Central Animated Avatar Visual */}
        <div className="hero-visual-col">
          <AvatarHeroVisual />
        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="hero-scroll-indicator">
        <a href="#about" aria-label="Scroll to discover more">
          <span className="scroll-text">EXPLORE THE HARINIVERSE</span>
          <div className="scroll-line"></div>
        </a>
      </div>
    </section>
  );
};
