import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { IconBriefcase, IconMapPin, IconSparkles } from './Icons';

export const Experience = () => {
  return (
    <section id="experience" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">04 // LEADERSHIP & COMMUNITY</span>
        <h2 className="section-title">Experience & Community</h2>
        <p className="section-subtitle">
          Active involvement in student-led technical initiatives, peer learning, and collaborative coding.
        </p>
      </div>

      <div className="experience-list">
        {personalInfo.roles.map((role, idx) => (
          <article key={idx} className="experience-card">
            
            <div className="experience-top-row">
              <div className="experience-role-group">
                <span className="experience-tag">Campus Technical Club</span>
                <h3 className="experience-title">{role.title}</h3>
                <h4 className="experience-org">
                  {role.organization} • {role.institution}
                </h4>
              </div>

              <div className="experience-meta-box">
                <span className="experience-period">{role.period}</span>
                <span className="experience-location">
                  <IconMapPin size={13} className="meta-icon" />
                  {role.location}
                </span>
              </div>
            </div>

            <p className="experience-desc">{role.description}</p>

            <div className="experience-points-grid">
              {role.points.map((pt, pIdx) => (
                <div key={pIdx} className="experience-point-item">
                  <span className="point-bullet">✦</span>
                  <span className="point-text">{pt}</span>
                </div>
              ))}
            </div>

          </article>
        ))}
      </div>

      {/* Community Mindset Note */}
      <div className="community-mindset-box">
        <span className="community-accent-star">✦</span>
        <p className="community-quote">
          “Technical clubs are the heartbeat of engineering colleges. Being part of Code Crypt allows me to learn from seniors, exchange ideas with peers, and help foster an environment where trying, asking questions, and debugging together are celebrated.”
        </p>
      </div>

    </section>
  );
};
