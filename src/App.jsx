import React, { useEffect, useState } from "react";
import "./App.css";

const certificates = [
  {
    title: "Taylor Excellence Day",
    detail: "Poster Presentation",
    category: "Creative",
    image: "/certificates/01-taylor-excellence-poster.png",
  },
  {
    title: "Webverse Workshop",
    detail: "Workshop participation · 18 Oct 2025",
    category: "Technology",
    image: "/certificates/02-webverse-workshop.png",
  },
  {
    title: "National Library Week",
    detail: "Second Prize · Speed Reading and Book Review",
    category: "Achievement",
    image: "/certificates/03-national-library-week-second-prize.png",
  },
  {
    title: "UXplosion 3.0",
    detail: "UI/UX Workshop and Hackathon participation",
    category: "Creative",
    image: "/certificates/04-uxplosion-3.png",
  },
  {
    title: "InsightX",
    detail: "Hackathon participation · 24 May 2026",
    category: "Technology",
    image: "/certificates/05-build-beyond-limits.png",
  },
  {
    title: "Build Beyond Limits",
    detail: "Second Prize · Data Geek's Club · 10 Apr 2026",
    category: "Achievement",
    image: "/certificates/06-insightx-second-prize.png",
  },
];

const skills = [
  { name: "Python", level: "Learning" },
  { name: "Java", level: "Learning" },
  { name: "SQL", level: "Learning" },
  { name: "Applied AI", level: "Exploring" },
  { name: "LLMs", level: "Exploring" },
  { name: "Problem Solving", level: "Developing" },
].map((skill, i) => ({
  ...skill,
  number: String(i + 1).padStart(2, "0"),
}));

const stamps = [
  { id: "explorer", title: "Explorer", section: "about", symbol: "✦" },
  { id: "creator", title: "Creator", section: "projects", symbol: "✧" },
  { id: "collector", title: "Collector", section: "certificates", symbol: "❖" },
  { id: "dreamer", title: "Dreamer", section: "journey", symbol: "☾" },
];

const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Certificates", "certificates"],
  ["Journey", "journey"],
  ["Beyond Tech", "beyond"],
  ["Contact", "contact"],
];

function readStamps() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("hariniverse-passport") || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Passport() {
  const [open, setOpen] = useState(false);
  const [earned, setEarned] = useState(readStamps);

  useEffect(() => {
    localStorage.setItem(
      "hariniverse-passport",
      JSON.stringify(earned)
    );
  }, [earned]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const stamp = stamps.find(
            (item) => item.section === entry.target.id
          );

          if (stamp) {
            setEarned((current) =>
              current.includes(stamp.id)
                ? current
                : [...current, stamp.id]
            );
          }
        });
      },
      { threshold: 0.35 }
    );

    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="passport">
      {open && (
        <div className="passport-panel">
          <div className="passport-panel-top">
            <div>
              <span className="mini-label">YOUR LITTLE ADVENTURE</span>
              <h3>HariniVerse Passport</h3>
            </div>

            <button
              className="passport-close"
              onClick={() => setOpen(false)}
              aria-label="Close passport"
            >
              ×
            </button>
          </div>

          <p className="passport-description">
            Explore the universe and collect all four stamps.
          </p>

          <div className="passport-progress">
            <span
              style={{
                width: `${(earned.length / 4) * 100}%`,
              }}
            />
          </div>

          <p className="passport-count">
            {earned.length} of 4 stamps collected
          </p>

          <div className="stamp-grid">
            {stamps.map((stamp) => {
              const collected = earned.includes(stamp.id);

              return (
                <a
                  key={stamp.id}
                  href={`#${stamp.section}`}
                  className={`stamp ${collected ? "stamp-earned" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="stamp-symbol">{stamp.symbol}</span>
                  <strong>{stamp.title}</strong>
                  <small>
                    {collected ? "Collected" : "Not yet found"}
                  </small>
                </a>
              );
            })}
          </div>

          {earned.length === 4 && (
            <p className="passport-complete">
              ✦ Universe explorer unlocked. Thank you for visiting!
            </p>
          )}
        </div>
      )}

      <button
        className="passport-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="passport-toggle-icon">✧</span>
        <span>My Passport</span>
        <span className="passport-badge">{earned.length}/4</span>
      </button>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const filteredCertificates =
    activeFilter === "All"
      ? certificates
      : certificates.filter(
          (item) => item.category === activeFilter
        );

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCertificate ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  return (
    <>
      <div className="cosmic-glow glow-one" />
      <div className="cosmic-glow glow-two" />

      <div className="galaxy-decorations" aria-hidden="true">
        <span className="floating-astronaut astronaut-one">🧑‍🚀</span>
        <span className="floating-astronaut astronaut-two">👨‍🚀</span>
        <span className="floating-planet planet-one">🪐</span>
        <span className="floating-planet planet-two">🌙</span>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">H</span>
          <span>
            HARINI<span className="brand-light">VERSE</span>
          </span>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "nav-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-stars" aria-hidden="true">
            {Array.from({ length: 90 }).map((_, index) => (
              <span
                key={index}
                className="star"
                style={{
                  "--x": `${(index * 37) % 100}%`,
                  "--y": `${(index * 61) % 100}%`,
                  "--delay": `${(index % 9) * 0.37}s`,
                  "--size": `${2 + (index % 3)}px`,
                }}
              />
            ))}
          </div>

          <div className="shooting-star shooting-one" />
          <div className="shooting-star shooting-two" />

          <div className="hero-content">
            <span className="hero-kicker">
              <i /> A LITTLE UNIVERSE OF IDEAS
            </span>

            <p className="hero-pretitle">HELLO, I'M</p>

            <h1>
              MADHU <span>HARINI.</span>
            </h1>

            <p className="hero-tagline">
              Curious by nature. <em>Building what's next.</em>
            </p>

            <p className="hero-description">
              A computer science student exploring code,
              creativity and the possibilities of Applied AI —
              one experiment at a time.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#about">
                Explore my universe <span>↗</span>
              </a>

              <a className="button-text" href="#projects">
                See what I'm exploring
              </a>
            </div>

            <span className="hero-footnote">
              SCROLL TO EXPLORE · EST. 2026
            </span>
          </div>

          <div className="hero-character">
            <div className="character-orbit orbit-one" />
            <div className="character-orbit orbit-two" />
            <div className="character-aura" />

            <img
              src="/images/harini.png"
              alt="Illustrated avatar of Harini"
              className="avatar-image"
            />

            <div className="character-message">
              <span>✦</span> Hey, welcome to my universe!
            </div>

            <p className="character-caption">
              THE HUMAN BEHIND THE PIXELS
            </p>
          </div>

          <a className="scroll-cue" href="#about">
            <span /> SCROLL DOWN
          </a>
        </section>

        {/* ABOUT */}
        <section className="content-section about-section" id="about">
          <SectionHeading
            eyebrow="01 / THE PERSON"
            title={
              <>
                A mind full of <em>what ifs.</em>
              </>
            }
            description="A little about the person behind this universe."
          />

          <Reveal className="about-panel">
            <div className="about-monogram">
              <span>H.</span>
              <small>
                CURIOUS
                <br />
                ALWAYS
              </small>
              <i>✦</i>
            </div>

            <div className="about-copy">
              <span className="mini-label">THE SHORT VERSION</span>

              <h3>
                I'm Harini — a learner, an explorer, and a work in progress.
              </h3>

              <p>
                I'm pursuing a B.Tech in Computer Science at Stanley College
                of Engineering & Technology for Women, Hyderabad. I enjoy
                discovering how technology works and imagining what I could
                create with it.
              </p>

              <p>
                Right now, I'm strengthening my programming foundations and
                exploring Applied AI and large language models. I believe in
                learning by trying, building, making mistakes and trying again.
              </p>

              <div className="about-tags">
                <span>Curiosity</span>
                <span>Creativity</span>
                <span>Learning by doing</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section className="content-section skills-section" id="skills">
          <SectionHeading
            eyebrow="02 / THE TOOLKIT"
            title={
              <>
                Things I'm <em>learning.</em>
              </>
            }
            description="A growing toolkit. These are learning areas, not claims of expertise."
          />

          <div className="skills-grid">
            {skills.map((skill) => (
              <Reveal key={skill.number} className="skill-card">
                <span className="skill-number">{skill.number}</span>
                <h3>{skill.name}</h3>
                <span className="skill-level">{skill.level}</span>
                <span className="skill-sparkle">✧</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="content-section projects-section immersive-projects"
          id="projects"
        >
          <SectionHeading
            eyebrow="03 / THE WORKBENCH"
            title={
              <>
                Ideas turned into <em>experiences.</em>
              </>
            }
            description="A collection of concepts, prototypes and experiments shaped by curiosity, creativity and real-world problems."
          />

          <div className="projects-intro">
            <span>THE HARINIVERSE PROJECT ARCHIVE</span>
            <span>05 SELECTED WORKS ✦</span>
          </div>

          <div className="immersive-project-grid">
            <article className="immersive-project project-abtalks">
              <div className="immersive-project-visual">
                <div className="project-visual-orbit" />
                <span className="project-visual-index">01</span>
                <span className="project-visual-icon">✦</span>

                <div className="abtalks-visual-content">
                  <span>THE 60-DAY DEVELOPER JOURNEY</span>
                  <h3>
                    BUILD <b>→</b> PROVE <b>→</b> GROW
                  </h3>

                  <div className="abtalks-proof">
                    <span>01 / BUILD</span>
                    <span>02 / PROVE</span>
                    <span>03 / GROW</span>
                  </div>

                  <p>YOUR JOURNEY. YOUR PROOF.</p>
                </div>

                <span className="project-visual-caption">
                  ABTALKS — PROOF
                </span>
              </div>

              <div className="immersive-project-info">
                <div className="project-meta">
                  <span>01 · PRODUCT EXPERIENCE</span>
                  <span className="project-status">DESIGN PROJECT</span>
                </div>

                <h3>ABTalks — Proof</h3>
                <h4>60-Day Developer Journey</h4>

                <p>
                  Reimagining the ABTalks experience around BUILD → PROVE → GROW,
                  with a Proof Portfolio that turns a 60-day challenge into
                  something students can actually show.
                </p>

                <div className="immersive-tags">
                  <span>UI/UX</span>
                  <span>Product Thinking</span>
                  <span>Web Design</span>
                </div>

                <div className="project-links">
                  <a href="https://lnkd.in/g3kNm4C6" target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                  <a href="https://lnkd.in/gD6jtGMc" target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>

            <article className="immersive-project project-inloop">
              <div className="immersive-project-visual">
                <div className="project-visual-orbit" />
                <span className="project-visual-index">02</span>
                <span className="project-visual-icon">∞</span>

                <div className="inloop-visual-content">
                  <span>LEARN TOGETHER</span>
                  <h3>
                    IN<span>LOOP.</span>
                  </h3>
                  <p>MISS A CLASS? NEVER MISS THE LEARNING.</p>

                  <div className="inloop-orbit-labels">
                    <span>SHARE</span>
                    <span>LEARN</span>
                    <span>CONNECT</span>
                  </div>
                </div>

                <span className="project-visual-caption">
                  STUDENT PEER LEARNING
                </span>
              </div>

              <div className="immersive-project-info">
                <div className="project-meta">
                  <span>02 · USER-CENTERED DESIGN</span>
                  <span className="project-status">CONCEPT</span>
                </div>

                <h3>IN LOOP</h3>
                <h4>Student Peer-Learning Platform</h4>

                <p>
                  A student-to-student platform for learners who miss classes
                  because of hackathons, club activities and other commitments,
                  giving them a better way to catch up.
                </p>

                <div className="immersive-tags">
                  <span>UI/UX</span>
                  <span>User Research</span>
                  <span>Prototyping</span>
                </div>

                <div className="project-links">
                  <span className="project-event">
                    UXPLOSION 3.0 · SDC SNIST
                  </span>
                </div>
              </div>
            </article>

            <article className="immersive-project project-eventra">
              <div className="immersive-project-visual">
                <div className="project-visual-orbit" />
                <span className="project-visual-index">03</span>
                <span className="project-visual-icon">⌘</span>

                <div className="eventra-visual-content">
                  <span>ONE PLATFORM. EVERY EVENT.</span>
                  <h3>
                    EVENTRA<span>.</span>
                  </h3>

                  <div className="eventra-mini-grid">
                    <span>QR CHECK-IN</span>
                    <span>TEAM MATCHING</span>
                    <span>LIVE SCORES</span>
                    <span>ANALYTICS</span>
                  </div>

                  <p>MAKE EVERY EVENT COUNT.</p>
                </div>

                <span className="project-visual-caption">
                  SMART EVENT MANAGEMENT
                </span>
              </div>

              <div className="immersive-project-info">
                <div className="project-meta">
                  <span>03 · AI-ASSISTED PROTOTYPE</span>
                  <span className="project-status">PROTOTYPE</span>
                </div>

                <h3>Eventra</h3>
                <h4>Smart Event Management Platform</h4>

                <p>
                  An event management prototype for hackathons, tech fests and
                  conferences, featuring QR check-in, teammate matching,
                  announcements, judging, leaderboards and organizer analytics.
                </p>

                <div className="immersive-tags">
                  <span>Product Design</span>
                  <span>UX</span>
                  <span>AI-assisted Prototype</span>
                </div>

                <div className="project-links">
                  <a href="https://lnkd.in/gwS-MG3F" target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                  <a href="https://lnkd.in/gx5sQ95n" target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>

                <span className="project-event">
                  PROMPT WARS 2026 × ABHIYANTRIX
                </span>
              </div>
            </article>

            <article className="immersive-project project-whysave">
              <div className="immersive-project-visual">
                <div className="project-visual-orbit" />
                <span className="project-visual-index">04</span>
                <span className="project-visual-icon">⌕</span>

                <div className="whysave-visual-content">
                  <span>AN EVERYDAY DIGITAL PROBLEM</span>
                  <h3>
                    WHY
                    <br />
                    <em>SAVE?</em>
                  </h3>

                  <div className="whysave-note">
                    <span>Saved screenshot</span>
                    <span>But why did I save this? ↗</span>
                  </div>

                  <p>DON'T LOSE THE CONTEXT.</p>
                </div>

                <span className="project-visual-caption">
                  SCREENSHOT CONTEXT CONCEPT
                </span>
              </div>

              <div className="immersive-project-info">
                <div className="project-meta">
                  <span>04 · PRODUCT IDEATION</span>
                  <span className="project-status">CONCEPT</span>
                </div>

                <h3>Why Save?</h3>
                <h4>Screenshot Context Concept</h4>

                <p>
                  A product idea inspired by an everyday problem: saving
                  screenshots of things we care about, then forgetting why we
                  saved them. Focused on retaining the context behind saved content.
                </p>

                <div className="immersive-tags">
                  <span>Ideation</span>
                  <span>Product Thinking</span>
                  <span>User Problems</span>
                </div>

                <div className="project-links">
                  <span className="project-award">
                    ✦ 2ND PLACE · SHIPATHON 2026
                  </span>
                </div>
              </div>
            </article>

            <article className="immersive-project project-thinkprompt">
              <div className="immersive-project-visual">
                <div className="project-visual-orbit" />
                <span className="project-visual-index">05</span>
                <span className="project-visual-icon">▥</span>

                <div className="thinkprompt-visual-content">
                  <span>DATA MEETS CURIOSITY</span>
                  <h3>
                    THINK <em>OR</em>
                    <br />
                    PROMPT?
                  </h3>

                  <div className="thinkprompt-bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <p>QUESTION. EXPLORE. VISUALIZE.</p>
                </div>

                <span className="project-visual-caption">
                  POWER BI · DATA STORYTELLING
                </span>
              </div>

              <div className="immersive-project-info">
                <div className="project-meta">
                  <span>05 · DATA STORYTELLING</span>
                  <span className="project-status">DASHBOARD</span>
                </div>

                <h3>Think or Prompt?</h3>
                <h4>Data Visualization Dashboard</h4>

                <p>
                  A Power BI dashboard exploring the relationship between AI
                  usage and problem-solving performance, turning a question
                  about AI dependence into a data-driven story.
                </p>

                <div className="immersive-tags">
                  <span>Power BI</span>
                  <span>Data Visualization</span>
                  <span>Data Storytelling</span>
                </div>

                <div className="project-links">
                  <span className="project-award">
                    ✦ 2ND PLACE · INSIGHTX DATA SPRINT
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="projects-footer-note">
            <span>✦</span>
            <p>
              Every project starts with a question. These are a few of the
              questions I've explored so far.
            </p>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section className="content-section certificates-section" id="certificates">
          <SectionHeading
            eyebrow="04 / THE ARCHIVE"
            title={
              <>
                Little milestones, <em>big memories.</em>
              </>
            }
            description="Workshops, events and achievements collected along the way."
          />

          <div className="certificate-toolbar">
            <span>{filteredCertificates.length} EXHIBITS</span>

            <div className="filter-buttons">
              {["All", "Achievement", "Technology", "Creative"].map((filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? "filter-active" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="certificate-grid">
            {filteredCertificates.map((certificate, index) => (
              <button
                className="certificate-card"
                key={certificate.title}
                onClick={() => setSelectedCertificate(certificate)}
              >
                <div className="certificate-image-wrap">
                  <img
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                  />
                  <span className="certificate-view">VIEW ↗</span>
                </div>

                <div className="certificate-info">
                  <span className="certificate-number">
                    EXHIBIT {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{certificate.title}</h3>
                  <p>{certificate.detail}</p>

                  <span className="certificate-category">
                    {certificate.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="archive-note">
            A small selection from my growing collection.
          </p>
        </section>

        {/* JOURNEY */}
        <section className="content-section journey-section" id="journey">
          <SectionHeading
            eyebrow="05 / THE JOURNEY"
            title={
              <>
                Still becoming. <em>Always.</em>
              </>
            }
            description="A few points on a journey that is very much in progress."
          />

          <div className="timeline">
            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-date">2025 — 2029</span>
              <div>
                <h3>B.Tech · Computer Science</h3>
                <p>
                  Stanley College of Engineering & Technology for Women,
                  Hyderabad.
                </p>
              </div>
            </Reveal>

            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-date">2026</span>
              <div>
                <h3>Technical Coordinator · Code Crypt</h3>
                <p>
                  Part of my college's technical club, learning through
                  collaboration and community activities.
                </p>
              </div>
            </Reveal>

            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-date">ALONG THE WAY</span>
              <div>
                <h3>Events & experiences</h3>
                <p>
                  Exploring technology, design and creative communities
                  through workshops and student events.
                </p>
              </div>
            </Reveal>

            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-date">WHAT'S NEXT</span>
              <div>
                <h3>Applied AI Engineering</h3>
                <p>
                  Building strong foundations and gradually exploring
                  AI-powered applications.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BEYOND TECH */}
        <section className="content-section beyond-section" id="beyond">
          <SectionHeading
            eyebrow="06 / OUTSIDE THE SCREEN"
            title={
              <>
                More than just <em>code.</em>
              </>
            }
            description="Because a person is never just a list of technologies."
          />

          <Reveal className="beyond-panel">
            <div className="beyond-art">
              <span className="beyond-orbit" />
              <span className="beyond-star">✦</span>
              <span className="beyond-big">∞</span>
              <span className="beyond-small">
                STAY
                <br />
                CURIOUS
              </span>
            </div>

            <div className="beyond-copy">
              <span className="mini-label">THE HUMAN SIDE</span>
              <h3>Always up for a new side quest.</h3>

              <p>
                I enjoy stepping outside my usual routine, meeting people,
                attending events, exploring creative activities and trying
                things I'm not already good at.
              </p>

              <p>
                Sometimes the best learning happens away from a screen.
              </p>
            </div>
          </Reveal>
        </section>

        {/* FINAL CHAPTER */}
        <section className="final-chapter">
          <span className="final-chapter-kicker">
            A NOTE BEFORE YOU LEAVE
          </span>

          <h2>
            Five experiments.
            <br />
            Countless ideas.
            <br />
            <em>One universe still unfolding.</em>
          </h2>

          <p>
            This is only a snapshot of where curiosity has taken me so far.
            There are more things to learn, more ideas to explore and plenty
            of room for what comes next.
          </p>

          <span className="final-chapter-signature">
            Until the next side quest <span>✦</span>
          </span>

          <span className="final-astronaut" aria-hidden="true">
            🧑‍🚀
          </span>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="contact-decoration">✦</div>

          <span className="section-eyebrow">07 / THE NEXT CHAPTER</span>

          <h2>
            Have a good idea?
            <br />
            <em>Let's connect.</em>
          </h2>

          <p>
            Always happy to connect with curious people, learn something new
            and explore interesting opportunities.
          </p>

          <div className="contact-actions">
            <a
              className="button-primary"
              href="https://www.linkedin.com/in/madhu-harini-maanthi-484225397/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>

            <a
              className="button-text github-link"
              href="https://github.com/madhu-harini"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              className="button-text email-link"
              href="mailto:maanthimadhuharini@gmail.com"
            >
              Email me ↗
            </a>

            <a className="button-text" href="#home">
              Back to the beginning ↑
            </a>
          </div>

          <p className="contact-email">
            <a href="mailto:maanthimadhuharini@gmail.com">
              maanthimadhuharini@gmail.com
            </a>
          </p>

          <span className="contact-footnote">
            MADE WITH CURIOSITY · HARINIVERSE © 2026
          </span>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark">H</span>
          <span>
            HARINI<span className="brand-light">VERSE</span>
          </span>
        </a>

        <p>Curious by nature. Building what's next.</p>
        <span>© 2026 HARINIVERSE</span>
      </footer>

      <Passport />

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div
          className="certificate-modal"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="certificate-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate"
            >
              ×
            </button>

            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
            />

            <div>
              <h3>{selectedCertificate.title}</h3>
              <p>{selectedCertificate.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;