import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { IconMail, IconGithub, IconLinkedin, IconCopy, IconCheck, IconMapPin, IconArrowUpRight, IconSparkles } from './Icons';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [hydTime, setHydTime] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // Live Hyderabad (IST) time clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        setHydTime(new Intl.DateTimeFormat('en-IN', options).format(now));
      } catch (e) {
        setHydTime('IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">07 // TRANSMISSION</span>
        <h2 className="section-title">Initiate Contact</h2>
        <p className="section-subtitle">
          Have an idea, student collaboration, or opportunity? Feel free to reach out.
        </p>
      </div>

      <div className="contact-grid">
        
        {/* Left Column: Direct Info & Celestial Terminal */}
        <div className="contact-info-panel">
          <div className="contact-terminal-card">
            
            <div className="terminal-top">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">contact@hariniverse.terminal</span>
            </div>

            <div className="terminal-body">
              <span className="terminal-prompt">$ echo $STATUS</span>
              <p className="terminal-output">"{personalInfo.status} & curious about Applied AI"</p>

              <span className="terminal-prompt">$ echo $LOCATION</span>
              <div className="terminal-location-row">
                <IconMapPin size={15} className="terminal-icon" />
                <span>{personalInfo.location}</span>
                <span className="terminal-time">({hydTime} IST)</span>
              </div>

              <span className="terminal-prompt">$ cat contact_email.txt</span>
              <div className="terminal-email-row">
                <span className="terminal-email-address">{personalInfo.contact.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="terminal-copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <>
                      <IconCheck size={14} className="copied-icon" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Social Profiles Grid */}
          <div className="contact-social-matrix">
            <h4 className="social-matrix-title">Connect & Explore</h4>
            <div className="social-links-grid">
              
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                title="GitHub Profile (Placeholder)"
              >
                <div className="social-card-left">
                  <IconGithub size={20} />
                  <div>
                    <span className="social-platform">GitHub</span>
                    <span className="social-handle">Code repositories</span>
                  </div>
                </div>
                <IconArrowUpRight size={16} className="social-arrow" />
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                title="LinkedIn Profile (Placeholder)"
              >
                <div className="social-card-left">
                  <IconLinkedin size={20} />
                  <div>
                    <span className="social-platform">LinkedIn</span>
                    <span className="social-handle">Professional network</span>
                  </div>
                </div>
                <IconArrowUpRight size={16} className="social-arrow" />
              </a>

            </div>

            <p className="social-placeholder-note">
              Note: Update your real email and profile URLs in <code>src/data/portfolioData.js</code>.
            </p>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="contact-form-panel">
          <div className="form-container-card">
            <h3 className="form-card-title">Send a Direct Message</h3>
            <p className="form-card-desc">
              Whether you're a fellow student, mentor, or recruiter, drop a message below.
            </p>

            {formSubmitted ? (
              <div className="form-success-banner">
                <IconCheck size={28} className="success-icon" />
                <h4 className="success-title">Message Simulated!</h4>
                <p className="success-text">
                  Thank you, <strong>{formData.name}</strong>. Because this is a static portfolio, to send a real email please click the "Copy Email" button or write directly to <strong>{personalInfo.contact.email}</strong>.
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Collaboration, Opportunity, or General Inquiry"
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows="5"
                    placeholder="Hello Madhu, I came across your portfolio HARINIVERSE..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  <span>Transmit Message</span>
                  <IconArrowUpRight size={16} />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};
