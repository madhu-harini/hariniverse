import React, { useState } from 'react';
import { explorationAreas } from '../data/portfolioData';
import { IconSparkles, IconCode } from './Icons';

export const Exploration = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <section id="exploration" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">02 // KNOWLEDGE RADAR</span>
        <h2 className="section-title">My Exploration</h2>
        <p className="section-subtitle">
          An honest map of the languages, AI concepts, and tools I am actively studying and applying.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="exploration-tabs-row" role="tablist">
        {explorationAreas.map((area, idx) => (
          <button
            key={area.category}
            role="tab"
            aria-selected={selectedCategory === idx}
            className={`exploration-tab-btn ${selectedCategory === idx ? 'tab-btn-active' : ''}`}
            onClick={() => setSelectedCategory(idx)}
          >
            <span className="tab-btn-index">0{idx + 1}</span>
            <span className="tab-btn-label">{area.category}</span>
          </button>
        ))}
      </div>

      {/* Active Category Display */}
      <div className="exploration-panel">
        <div className="exploration-panel-header">
          <div>
            <h3 className="panel-title">{explorationAreas[selectedCategory].category}</h3>
            <p className="panel-desc">{explorationAreas[selectedCategory].description}</p>
          </div>
          <span className="panel-status-pill">
            <span className="status-dot-pulse-sm"></span>
            {explorationAreas[selectedCategory].status}
          </span>
        </div>

        {/* Skills Cards Grid */}
        <div className="exploration-skills-grid">
          {explorationAreas[selectedCategory].skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card-top">
                <span className="skill-name">{skill.name}</span>
                <span className={`skill-level-tag level-${skill.level.toLowerCase().replace(/\s+/g, '-')}`}>
                  {skill.level}
                </span>
              </div>
              <p className="skill-note">{skill.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Learning Philosophy Callout */}
      <div className="learning-transparency-card">
        <div className="transparency-icon-col">
          <IconSparkles size={20} className="transparency-icon" />
        </div>
        <div className="transparency-content">
          <h4 className="transparency-title">Honest Learning Philosophy</h4>
          <p className="transparency-text">
            As a first-year undergraduate, I avoid padding my portfolio with technologies I haven't genuinely worked with. My focus is centered on writing clean Python, building solid problem-solving instincts in C and algorithms, and exploring how modern AI systems function from the ground up.
          </p>
        </div>
      </div>

    </section>
  );
};
