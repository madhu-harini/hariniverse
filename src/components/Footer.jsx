import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { IconArrowDown, IconSparkles } from './Icons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Massive Watermark Brand */}
        <div className="footer-brand-watermark">
          <span>{personalInfo.brand}</span>
        </div>

        <div className="footer-main-row">
          
          <div className="footer-identity-col">
            <span className="footer-symbol">✦</span>
            <h3 className="footer-name">{personalInfo.name}</h3>
            <p className="footer-tagline">"{personalInfo.tagline}"</p>
            <p className="footer-affiliation">
              {personalInfo.education.degree} • {personalInfo.education.institution}
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <div className="footer-links-list">
              <a href="#about" className="footer-link">About</a>
              <a href="#exploration" className="footer-link">Exploration</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#education" className="footer-link">Education</a>
              <a href="#beyond" className="footer-link">Beyond Tech</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-action-col">
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-back-to-top"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <span className="top-arrow">↑</span>
            </button>
            <div className="footer-status-pill">
              <span className="status-dot-pulse-sm"></span>
              <span>{personalInfo.status}</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {personalInfo.name}. Built with React, Vite & Cosmic Curiosity.
          </p>
          <p className="footer-location">
            {personalInfo.location}
          </p>
        </div>

      </div>
    </footer>
  );
};
