import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { IconSparkles, IconUser, IconGraduationCap, IconBriefcase, IconMapPin } from './Icons';

export const About = () => {
  return (
    <section id="about" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">01 // MANIFESTO</span>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          An honest reflection on where I stand, how I learn, and where I am headed.
        </p>
      </div>

      <div className="about-grid">
        
        {/* Left Column: Student Dossier Card */}
        <div className="about-dossier-card">
          <div className="dossier-avatar-wrap">
            <div className="dossier-avatar-placeholder">
              <span className="dossier-avatar-initials">MHM</span>
              <div className="avatar-ambient-glow" />
            </div>
            <div className="dossier-badge-row">
              <span className="dossier-badge">
                <span className="status-dot-pulse-sm"></span>
                First-Year Undergraduate
              </span>
            </div>
          </div>

          <div className="dossier-details">
            <h3 className="dossier-name">{personalInfo.name}</h3>
            <p className="dossier-role">{personalInfo.headline}</p>

            <div className="dossier-meta-list">
              <div className="dossier-meta-item">
                <IconGraduationCap size={16} className="dossier-icon" />
                <div>
                  <span className="meta-item-label">Institution</span>
                  <span className="meta-item-value">{personalInfo.education.institution}</span>
                </div>
              </div>

              <div className="dossier-meta-item">
                <IconBriefcase size={16} className="dossier-icon" />
                <div>
                  <span className="meta-item-label">Campus Role</span>
                  <span className="meta-item-value">Technical Coordinator @ Code Crypt</span>
                </div>
              </div>

              <div className="dossier-meta-item">
                <IconMapPin size={16} className="dossier-icon" />
                <div>
                  <span className="meta-item-label">Location</span>
                  <span className="meta-item-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Story & Learning Philosophy */}
        <div className="about-narrative">
          <div className="narrative-quote-block">
            <span className="quote-mark">“</span>
            <p className="quote-text">
              I believe true engineering begins when you stop memorizing syntax and start asking why things work the way they do.
            </p>
          </div>

          <div className="narrative-paragraphs">
            {personalInfo.bioLong.map((para, idx) => (
              <p key={idx} className="narrative-p">
                {para}
              </p>
            ))}
          </div>

          {/* Core Values / Learning Pillars */}
          <div className="about-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-num">01</span>
                <h4 className="pillar-title">First Principles</h4>
              </div>
              <p className="pillar-desc">
                Focusing on strong foundations in Python, logic, and data structures before rushing to high-level abstractions.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-num">02</span>
                <h4 className="pillar-title">Transparent Growth</h4>
              </div>
              <p className="pillar-desc">
                Presenting my student journey authentically—learning out loud, iterating consistently, and building genuine projects.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-num">03</span>
                <h4 className="pillar-title">Community Spirit</h4>
              </div>
              <p className="pillar-desc">
                Active involvement in Code Crypt to learn alongside peers, share insights, and cultivate collaborative curiosity.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
