import React from 'react';
import { beyondTech } from '../data/portfolioData';
import { IconSparkles, IconCompass, IconBookOpen, IconOrbit } from './Icons';

export const BeyondTech = () => {
  const getIcon = (title) => {
    if (title.toLowerCase().includes('cosmos') || title.toLowerCase().includes('astronomy')) {
      return <IconOrbit size={22} />;
    }
    if (title.toLowerCase().includes('writing') || title.toLowerCase().includes('inquiry')) {
      return <IconBookOpen size={22} />;
    }
    return <IconCompass size={22} />;
  };

  return (
    <section id="beyond" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">06 // HUMAN DIMENSION</span>
        <h2 className="section-title">Beyond The Screen</h2>
        <p className="section-subtitle">
          The curiosities, creative pursuits, and perspectives that enrich my engineering mindset.
        </p>
      </div>

      {/* 3-Column Editorial Grid */}
      <div className="beyond-grid">
        {beyondTech.map((item, idx) => (
          <article key={idx} className="beyond-card">
            
            <div className="beyond-card-header">
              <div className="beyond-icon-wrap">
                {getIcon(item.title)}
              </div>
              <span className="beyond-tag">{item.tag}</span>
            </div>

            <div className="beyond-card-body">
              <h3 className="beyond-title">{item.title}</h3>
              <p className="beyond-desc">{item.description}</p>
            </div>

            <div className="beyond-card-footer">
              <span className="beyond-dot">✦</span>
              <span className="beyond-footer-text">Inspiration Source</span>
            </div>

          </article>
        ))}
      </div>

      {/* Connecting Thought */}
      <div className="beyond-philosophy-banner">
        <p className="beyond-quote">
          “Engineering without curiosity is just syntax. Great builders are shaped not only by the code they write, but by the questions they ask about the world around them.”
        </p>
      </div>

    </section>
  );
};
