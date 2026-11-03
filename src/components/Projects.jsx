import React from 'react';
import { projects } from '../data/portfolioData';
import { IconArrowUpRight, IconGithub, IconCode, IconSparkles } from './Icons';

export const Projects = () => {
  return (
    <section id="projects" className="section-container">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="section-index">03 // WORKSPACE</span>
        <h2 className="section-title">Projects & Explorations</h2>
        <p className="section-subtitle">
          Hands-on coding builds, algorithmic exercises, and applied prototypes. All slots are cleanly editable.
        </p>
      </div>

      {/* Projects List / Grid */}
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <article key={project.id} className="project-card">
            
            {/* Card Header */}
            <div className="project-card-header">
              <div className="project-meta-left">
                <span className="project-number">0{idx + 1}</span>
                <span className="project-category">{project.category}</span>
              </div>
              <span className={`project-stage-badge stage-${project.stage.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {project.stage}
              </span>
            </div>

            {/* Card Body */}
            <div className="project-card-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-desc">{project.description}</p>

              {/* Tech Stack Pills */}
              <div className="project-tech-list">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Takeaway Box */}
              {project.keyTakeaway && (
                <div className="project-takeaway">
                  <span className="takeaway-label">Key Insight:</span>
                  <span className="takeaway-text">{project.keyTakeaway}</span>
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="project-card-footer">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  title="View repository"
                >
                  <IconGithub size={16} />
                  <span>View Repository</span>
                  <IconArrowUpRight size={14} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn project-link-primary"
                  title="Open live preview"
                >
                  <span>Live Preview</span>
                  <IconArrowUpRight size={14} />
                </a>
              )}
            </div>

          </article>
        ))}
      </div>

      {/* Beginner Guide Banner */}
      <div className="project-customization-notice">
        <div className="notice-icon-col">
          <IconCode size={18} />
        </div>
        <div className="notice-content">
          <h4 className="notice-title">Easily customize your projects</h4>
          <p className="notice-text">
            To update the projects above with your real GitHub repositories or new builds, simply open <code>src/data/portfolioData.js</code> and replace the placeholder text and URLs.
          </p>
        </div>
      </div>

    </section>
  );
};
