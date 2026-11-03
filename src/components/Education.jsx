import React from 'react';
import { personalInfo, achievements } from '../data/portfolioData';
import { IconGraduationCap, IconMapPin, IconAward, IconBookOpen } from './Icons';

export const Education = () => {
  const edu = personalInfo.education;

  return (
    <section id="education" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">05 // FOUNDATIONS</span>
        <h2 className="section-title">Education & Milestones</h2>
        <p className="section-subtitle">
          Academic journey, foundational coursework, and verified student achievements.
        </p>
      </div>

      <div className="education-grid">
        
        {/* Education Timeline Card */}
        <div className="education-main-card">
          <div className="edu-card-top">
            <div className="edu-icon-badge">
              <IconGraduationCap size={24} />
            </div>
            <div className="edu-title-group">
              <span className="edu-type-tag">Undergraduate Degree</span>
              <h3 className="edu-degree">{edu.degree}</h3>
              <h4 className="edu-institution">{edu.institution}</h4>
            </div>
            <div className="edu-meta-pill">
              <span className="edu-period">{edu.period}</span>
              <span className="edu-location">
                <IconMapPin size={12} />
                {edu.location}
              </span>
            </div>
          </div>

          <div className="edu-focus-box">
            <span className="focus-label">Core Focus Areas:</span>
            <p className="focus-text">{edu.focus}</p>
          </div>

          <div className="edu-highlights-list">
            <h5 className="highlights-title">Academic Highlights:</h5>
            <ul>
              {edu.highlights.map((item, idx) => (
                <li key={idx} className="highlight-item">
                  <span className="highlight-bullet">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievements / Milestones Sidebar */}
        <div className="achievements-card">
          <div className="achievements-header">
            <div className="achieve-title-wrap">
              <IconAward size={20} className="achieve-icon" />
              <h3 className="achieve-heading">Activities & Milestones</h3>
            </div>
            <span className="achieve-status-badge">Documented</span>
          </div>

          <p className="achieve-intro">
            A chronological record of milestones, club appointments, and certifications.
          </p>

          <div className="achieve-items-list">
            {achievements.map((item, idx) => (
              <div key={idx} className="achieve-item">
                <div className="achieve-item-top">
                  <span className="achieve-type-tag">{item.type}</span>
                  <span className="achieve-year">{item.year}</span>
                </div>
                <h4 className="achieve-title">{item.title}</h4>
                <p className="achieve-org">{item.organization}</p>
                <p className="achieve-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="achieve-helper-tip">
            <span>Tip: To add new hackathons or certifications, edit <code>achievements</code> in <code>src/data/portfolioData.js</code>.</span>
          </div>
        </div>

      </div>

    </section>
  );
};
