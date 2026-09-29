import React from 'react';
import { 
  GraduationCap, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Terminal, 
  MapPin, 
  Layers, 
  Sparkles, 
  Compass,
  CheckCircle2
} from 'lucide-react';

const About = ({ profileData }) => {
  const interests = [
    { title: 'Artificial Intelligence', desc: 'Exploring machine learning, computer vision, and neural network foundations.', icon: Cpu },
    { title: 'Cybersecurity', desc: 'Understanding secure system architectures, ethical security, and network defenses.', icon: ShieldCheck },
    { title: 'Full Stack Development', desc: 'Building responsive frontends and robust REST API backends with clean database schemas.', icon: Code2 },
    { title: 'Web Development', desc: 'Crafting user-centric interfaces with React, modern CSS, and component systems.', icon: Layers },
    { title: 'AI Tools & Automation', desc: 'Applying modern AI productivity tools to accelerate development and solve practical problems.', icon: Sparkles },
  ];

  const highlights = [
    '2nd Year Computer Science Engineering Undergraduate at SNS College of Technology',
    'Hands-on internship experience in full-stack web applications at ADHOC SOFTWARES',
    'Active participant in regional, national, and global hackathons (TNWISE, NASA Space Apps)',
    'Organized technical bootcamps and conducted sessions on AI tools and cybersecurity',
  ];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Compass size={14} />
            About Sadhana
          </span>
          <h2 className="section-title">
            Engineering Foundations & <span className="gradient-text">Core Interests</span>
          </h2>
          <p className="section-subtitle">
            A grounded overview of my academic journey, core technical interests, and commitment to building purposeful software.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Left Column: Academic & Background Card */}
          <div className="glass-card about-main-card">
            <div className="card-top-badge">
              <GraduationCap size={18} className="badge-icon" />
              <span>Academic Profile</span>
            </div>

            <h3 className="about-name">Sadhana Saravanan</h3>
            <p className="about-role">Bachelor of Engineering – Computer Science Engineering (2nd Year)</p>
            
            <div className="about-location">
              <MapPin size={16} />
              <span>SNS College of Technology • Coimbatore, Tamil Nadu, India</span>
            </div>

            <p className="about-bio-text">
              I am a 2nd-year Computer Science Engineering undergraduate with a strong curiosity for how technology impacts everyday lives. My journey centers on developing robust full-stack applications and experimenting with practical Artificial Intelligence and Computer Vision tools.
            </p>

            <p className="about-bio-text">
              Rather than theoretical concepts alone, I believe in learning by creating: building portals, training computer vision pose estimators, testing farm automation concepts for hackathons, and organizing technical workshops for fellow students.
            </p>

            {/* Verified Highlights Checklist */}
            <div className="about-highlights-list">
              <h4 className="highlights-title">Academic & Technical Highlights</h4>
              {highlights.map((item, index) => (
                <div key={index} className="highlight-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Core Interests Cards */}
          <div className="about-interests-container">
            <h3 className="interests-header-title">
              <Sparkles size={18} className="icon-sparkle" />
              <span>Core Areas of Focus</span>
            </h3>

            <div className="interests-cards-list">
              {interests.map((interest, idx) => {
                const IconComponent = interest.icon;
                return (
                  <div key={idx} className="glass-card interest-card">
                    <div className="interest-icon-wrapper">
                      <IconComponent size={22} className="interest-svg" />
                    </div>
                    <div className="interest-text-group">
                      <h4 className="interest-title">{interest.title}</h4>
                      <p className="interest-desc">{interest.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
        }

        .about-main-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
        }

        .card-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-primary);
          align-self: flex-start;
          margin-bottom: 20px;
        }

        .about-name {
          font-size: 1.85rem;
          margin-bottom: 6px;
        }

        .about-role {
          font-size: 1.05rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 12px;
        }

        .about-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.88rem;
          margin-bottom: 24px;
        }

        .about-bio-text {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .about-highlights-list {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlights-title {
          font-size: 0.95rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .check-icon {
          color: var(--accent-emerald);
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* Right Column */
        .about-interests-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .interests-header-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .icon-sparkle {
          color: var(--accent-primary);
        }

        .interests-cards-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .interest-card {
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .interest-card:hover {
          transform: translateX(4px);
          border-color: var(--accent-primary);
        }

        .interest-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent-primary);
        }

        .interest-text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .interest-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .interest-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .about-main-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
