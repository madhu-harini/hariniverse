import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { IconMenu, IconClose, IconSparkles } from './Icons';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'exploration', 'projects', 'experience', 'education', 'beyond', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Exploration', href: '#exploration' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Beyond Tech', href: '#beyond' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand */}
          <a href="#" className="navbar-brand">
            <span className="brand-symbol">✦</span>
            <span className="brand-text">{personalInfo.brand}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar-desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Status & Location Indicator */}
          <div className="navbar-status-wrap">
            <div className="status-pill" title="Current Status">
              <span className="status-dot-pulse"></span>
              <span className="status-text">{personalInfo.status}</span>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-nav-content">
          <div className="mobile-nav-top">
            <span className="brand-text">{personalInfo.brand}</span>
            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <IconClose size={22} />
            </button>
          </div>

          <div className="mobile-nav-status">
            <span className="status-dot-pulse"></span>
            <span>{personalInfo.status}</span>
            <span className="meta-divider">•</span>
            <span>{personalInfo.location}</span>
          </div>

          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-nav-footer">
            <p className="mobile-tagline">{personalInfo.tagline}</p>
            <a href="#contact" className="btn-primary mobile-cta" onClick={() => setMobileMenuOpen(false)}>
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
