import React, { useState } from 'react';
import { ArrowRight, FileDown, Mail, Terminal, Sparkles, MapPin, GraduationCap, Code2, Database, ShieldCheck, Cpu } from 'lucide-react';
import ResumeModal from './ResumeModal';

const Hero = ({ profileData }) => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const name = profileData?.name || "Sadhana Saravanan";
  const headline = profileData?.headline || "Computer Science Engineering Student";
  const tagline = profileData?.tagline || "Passionate about building practical solutions using AI, full-stack development and emerging technologies.";
  const college = profileData?.college || "SNS College of Technology";
  const location = profileData?.location || "Coimbatore, Tamil Nadu, India";

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Introductions & CTAs */}
        <div className="hero-content animate-fade-in">
          {/* Status Badge */}
          <div className="hero-badge">
            <span className="hero-badge-pulse" />
            <span className="hero-badge-text">2nd Year CSE Undergrad • Open for Internships</span>
          </div>

          {/* Main Title & Subtitles */}
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{name}</span>
          </h1>

          <h2 className="hero-subtitle">
            {headline}
          </h2>

          <p className="hero-intro">
            {tagline}
          </p>

          <div className="hero-meta-items">
            <div className="meta-item">
              <GraduationCap size={16} className="meta-icon" />
              <span>{college}</span>
            </div>
            <div className="meta-item">
              <MapPin size={16} className="meta-icon" />
              <span>{location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View My Projects</span>
              <ArrowRight size={18} />
            </a>

            <button 
              onClick={() => setResumeModalOpen(true)} 
              className="btn btn-secondary"
              aria-label="Download or View Resume"
            >
              <FileDown size={18} />
              <span>Download Resume</span>
            </button>

            <a href="#contact" className="btn btn-outline">
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">03</div>
              <div className="stat-label">Featured Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Core Tech Skills</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">06+</div>
              <div className="stat-label">Hackathons / Events</div>
            </div>
          </div>
        </div>

        {/* Right Column: Developer Themed Interactive Code Window */}
        <div className="hero-visual animate-float">
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="code-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  developer.json
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'interests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('interests')}
                >
                  interests.py
                </button>
              </div>
              <div className="code-lang-tag">python3</div>
            </div>

            <div className="code-body">
              {activeTab === 'profile' ? (
                <pre className="code-pre">
                  <code>
{`{
  "developer": "Sadhana Saravanan",
  "status": "2nd Year CSE Student",
  "institution": "SNS College of Technology",
  "location": "Coimbatore, India",
  "primary_stack": [
    "Python", "React.js", "Flask",
    "Django", "SQLite", "OpenCV"
  ],
  "interests": [
    "Artificial Intelligence",
    "Cybersecurity",
    "Full Stack Development",
    "AI Tools"
  ],
  "open_for_internships": true
}`}
                  </code>
                </pre>
              ) : (
                <pre className="code-pre">
                  <code>
{`# Sadhana's Core Engineering Pillars
class DeveloperProfile:
    def __init__(self):
        self.focus = "Practical AI & Full Stack"
        self.passion = [
            "Building scalable web systems",
            "AI-based computer vision solutions",
            "Ethical cybersecurity practices"
        ]
        
    def get_goal(self):
        return "Applying CS fundamentals to solve impactful challenges."`}
                  </code>
                </pre>
              )}
            </div>

            <div className="code-footer">
              <div className="code-footer-left">
                <span className="pulse-circle" />
                <span>Ready to collaborate</span>
              </div>
              <div className="code-footer-right">UTF-8 • 100% Student Verified</div>
            </div>
          </div>

          {/* Floating Technology Feature Badges */}
          <div className="floating-badge badge-ai">
            <Cpu size={16} />
            <span>AI & Computer Vision</span>
          </div>

          <div className="floating-badge badge-fullstack">
            <Code2 size={16} />
            <span>Full Stack Web</span>
          </div>

          <div className="floating-badge badge-security">
            <ShieldCheck size={16} />
            <span>Cybersecurity</span>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={resumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
      />

      <style>{`
        .hero-section {
          padding-top: calc(var(--nav-height) + 48px);
          padding-bottom: 96px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--border-accent);
          color: var(--accent-primary);
          font-size: 0.82rem;
          font-weight: 600;
          font-family: var(--font-mono);
          margin-bottom: 20px;
        }

        .hero-badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
          animation: pulseGlow 2s infinite;
        }

        .hero-title {
          font-size: 3.25rem;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        .hero-subtitle {
          font-size: 1.45rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 18px;
        }

        .hero-intro {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 22px;
          max-width: 580px;
        }

        .hero-meta-items {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 32px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          color: var(--accent-primary);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 40px;
        }

        .hero-stats {
          display: flex;
          gap: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          width: 100%;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Hero Visual Right Column */
        .hero-visual {
          position: relative;
        }

        .code-tabs {
          display: flex;
          gap: 4px;
        }

        .tab-btn {
          padding: 4px 10px;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: #94a3b8;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .tab-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .code-lang-tag {
          font-size: 0.72rem;
          color: #64748b;
        }

        .code-pre {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 0.84rem;
          line-height: 1.6;
          color: #38bdf8;
        }

        .code-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 18px;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .code-footer-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-circle {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }

        /* Floating badges */
        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg-card);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          box-shadow: var(--shadow-md);
          pointer-events: none;
        }

        .badge-ai {
          top: -14px;
          right: -10px;
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .badge-fullstack {
          bottom: 24px;
          left: -20px;
          color: #818cf8;
          border-color: rgba(129, 140, 248, 0.4);
        }

        .badge-security {
          bottom: -18px;
          right: 30px;
          color: #34d399;
          border-color: rgba(52, 211, 153, 0.4);
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-title {
            font-size: 2.75rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-subtitle {
            font-size: 1.2rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
          }
          .hero-stats {
            justify-content: space-between;
            gap: 12px;
          }
          .floating-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
