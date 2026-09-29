import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Terminal, 
  Award,
  Layers
} from 'lucide-react';
import PortfolioAPI from '../services/api';

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const defaultExperience = [
    {
      id: 1,
      role: 'Full Stack Development Intern',
      organization: 'ADHOC SOFTWARES',
      duration: '15 Days',
      location: 'Coimbatore, Tamil Nadu, India',
      type: 'Internship',
      project_name: 'Student Management Portal',
      description: 'Engaged in comprehensive full stack web application design and development. Gained hands-on experience in frontend styling, backend routing, relational database schema modeling, and full lifecycle implementation of the Student Management Portal.',
      technologies: 'Python, Django, HTML, CSS, SQLite, VS Code',
      technologies_list: ['Python', 'Django', 'HTML', 'CSS', 'SQLite', 'VS Code'],
      key_learnings: [
        'Engineered backend CRUD operations, models, and migrations using Django ORM and SQLite.',
        'Structured modular templates with semantic HTML5 and responsive CSS layout systems.',
        'Implemented role-based permissions and secure authentication patterns for educational institution data.',
        'Utilized Git version control and VS Code developer toolchains in an agile workflow.'
      ]
    }
  ];

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await PortfolioAPI.getExperience();
        if (response && response.data && response.data.length > 0) {
          const enriched = response.data.map(item => {
            const match = defaultExperience.find(d => d.organization.toLowerCase() === item.organization.toLowerCase());
            return {
              ...item,
              key_learnings: match?.key_learnings || [
                `Developed ${item.project_name} using ${item.technologies}`,
                item.description
              ]
            };
          });
          setExperienceData(enriched);
        } else {
          setExperienceData(defaultExperience);
        }
      } catch (err) {
        console.warn('Using fallback experience data:', err.message);
        setExperienceData(defaultExperience);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} />
            Industry Exposure
          </span>
          <h2 className="section-title">
            Internship <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Direct hands-on engineering experience in full-stack web application development and database systems.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="experience-timeline">
          {experienceData.map((exp) => {
            const techList = exp.technologies_list || exp.technologies.split(',').map(t => t.trim());

            return (
              <div key={exp.id} className="glass-card experience-main-card">
                {/* Header Row */}
                <div className="experience-card-header">
                  <div className="exp-title-group">
                    <div className="exp-org-badge">
                      <Building2 size={20} className="org-icon" />
                    </div>
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <div className="exp-org-name">{exp.organization}</div>
                    </div>
                  </div>

                  <div className="exp-meta-badges">
                    <span className="badge badge-primary">
                      <Calendar size={13} />
                      {exp.duration}
                    </span>
                    <span className="badge">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="experience-card-body">
                  <div className="exp-project-banner">
                    <div className="project-banner-label">Capstone Deliverable:</div>
                    <div className="project-banner-value">{exp.project_name}</div>
                  </div>

                  <p className="exp-desc-text">
                    {exp.description}
                  </p>

                  {/* Core Learnings & Deliverables */}
                  <div className="exp-deliverables-box">
                    <h4 className="deliverables-title">Key Competencies & Deliverables:</h4>
                    <div className="deliverables-list">
                      {(exp.key_learnings || []).map((point, idx) => (
                        <div key={idx} className="deliverable-item">
                          <CheckCircle2 size={16} className="deliverable-check" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="exp-tech-container">
                    <span className="exp-tech-label">Applied Technologies:</span>
                    <div className="exp-tech-pills">
                      {techList.map((t, idx) => (
                        <span key={idx} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .experience-timeline {
          max-width: 960px;
          margin: 0 auto;
        }

        .experience-main-card {
          padding: 36px;
          position: relative;
        }

        .experience-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 18px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 24px;
        }

        .exp-title-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .exp-org-badge {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .exp-role {
          font-size: 1.45rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .exp-org-name {
          font-size: 1.05rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .exp-meta-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .experience-card-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .exp-project-banner {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(99, 102, 241, 0.08);
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 0.92rem;
        }

        .project-banner-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .project-banner-value {
          color: var(--text-primary);
          font-weight: 600;
        }

        .exp-desc-text {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .exp-deliverables-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .deliverables-title {
          font-size: 0.95rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .deliverable-check {
          color: var(--accent-emerald);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .exp-tech-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .exp-tech-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }

        .exp-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .experience-main-card {
            padding: 24px;
          }
          .exp-role {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
