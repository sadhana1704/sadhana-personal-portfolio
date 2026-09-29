import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Sparkles, 
  Code, 
  Info,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from './Icons';
import PortfolioAPI from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fallback data
  const defaultProjects = [
    {
      id: 1,
      title: 'EduTrack',
      subtitle: 'Student Attendance Management Portal',
      description: 'A web-based student attendance management system with separate login access for Principal, Teacher, and Student users. The system allows attendance tracking, records management, and administrative control.',
      technologies: 'Python, Django, HTML, CSS, SQLite',
      technologies_list: ['Python', 'Django', 'HTML', 'CSS', 'SQLite'],
      category: 'Web & Backend',
      github_url: '',
      live_url: '',
      badge: 'Featured System',
      highlights: [
        'Multi-role authentication: Separate portals for Principal, Teachers, and Students.',
        'Real-time student attendance logging and automated monthly percentage calculations.',
        'Relational SQLite database design with Django ORM for secure data integrity.',
        'Clean, responsive dashboard UI built with HTML5 and semantic CSS styling.'
      ]
    },
    {
      id: 2,
      title: 'AgriSense AI',
      subtitle: 'Precision Agriculture & Farm Automation',
      description: 'An AI-based precision agriculture and farm automation project developed for a hackathon to optimize resource monitoring, intelligent crop management, and automated agricultural processes.',
      technologies: 'Python, Machine Learning, IoT Concepts, Computer Vision',
      technologies_list: ['Python', 'Machine Learning', 'IoT Concepts', 'Computer Vision'],
      category: 'AI & Automation',
      github_url: '',
      live_url: '',
      badge: 'Hackathon Project',
      highlights: [
        'Hackathon concept for automated farm surveillance and crop health anomaly detection.',
        'Machine learning algorithms to predict optimal watering and pesticide schedules.',
        'Integration concepts with IoT sensor nodes for humidity and soil data.',
        'Computer vision image classification prototypes for pest identification.'
      ]
    },
    {
      id: 3,
      title: 'Burn-Ex',
      subtitle: 'AI Based Calorie Estimation System',
      description: 'An intelligent calorie estimation system leveraging computer vision and human pose detection algorithms to analyze physical activity and provide automated energy expenditure metrics.',
      technologies: 'React.js, Vite, Tailwind CSS, Chart.js, Flask REST API, Python, Pandas, NumPy, Scikit-learn, OpenCV, MediaPipe Pose, SQLite/MySQL',
      technologies_list: ['React.js', 'Vite', 'Tailwind CSS', 'Chart.js', 'Flask REST API', 'Python', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV', 'MediaPipe Pose', 'SQLite/MySQL'],
      category: 'AI & Computer Vision',
      github_url: '',
      live_url: '',
      badge: 'AI / Full Stack',
      highlights: [
        'Real-time pose estimation tracking using MediaPipe and OpenCV vision models.',
        'Flask REST API backend delivering calculated calorie burn metrics and rep counts.',
        'Interactive analytics dashboard with Chart.js visualization for workout routines.',
        'Modular architecture connecting Python computer vision pipelines to a React frontend.'
      ]
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await PortfolioAPI.getProjects();
        if (response && response.data && response.data.length > 0) {
          // Merge with detailed highlights if not in DB
          const enriched = response.data.map(item => {
            const fallbackMatch = defaultProjects.find(d => d.title.toLowerCase() === item.title.toLowerCase());
            return {
              ...item,
              highlights: fallbackMatch?.highlights || [
                `Developed using ${item.technologies}`,
                item.description
              ]
            };
          });
          setProjects(enriched);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err) {
        console.warn('Using fallback project data:', err.message);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'AI & Computer Vision', 'Web & Backend', 'AI & Automation'];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FolderGit2 size={14} />
            Featured Work
          </span>
          <h2 className="section-title">
            Engineering <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Authentic academic and hackathon projects demonstrating practical implementation of full-stack engineering and AI models.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="project-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`project-filter-btn ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const techList = project.technologies_list || project.technologies.split(',').map(t => t.strip ? t.strip() : t.trim());
            const hasGithub = Boolean(project.github_url && project.github_url.trim());
            const hasLive = Boolean(project.live_url && project.live_url.trim());

            return (
              <div key={project.id} className="glass-card project-card">
                {/* Top Card Badge & Category */}
                <div className="project-card-header">
                  <span className="badge badge-primary">{project.badge || 'Project'}</span>
                  <span className="project-category">{project.category}</span>
                </div>

                {/* Project Title & Subtitle */}
                <div className="project-title-box">
                  <h3 className="project-name">{project.title}</h3>
                  <h4 className="project-sub">{project.subtitle}</h4>
                </div>

                {/* Description */}
                <p className="project-desc">{project.description}</p>

                {/* Technologies Pills */}
                <div className="project-tech-stack">
                  <div className="tech-stack-title">Tech Stack:</div>
                  <div className="tech-pills-wrap">
                    {techList.map((tech, idx) => (
                      <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="project-card-actions">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-secondary btn-card"
                  >
                    <Info size={16} />
                    <span>View Details</span>
                  </button>

                  {hasGithub ? (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-card"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <button 
                      className="btn btn-outline btn-card btn-placeholder" 
                      title="GitHub URL will be linked upon repository publication"
                      onClick={() => alert("GitHub repository will be made public upon publication. Placeholder: 'Add GitHub URL'")}
                    >
                      <GithubIcon size={16} />
                      <span>Add GitHub URL</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <span className="badge badge-primary">{selectedProject.badge}</span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-sub-header">
                <h4>{selectedProject.subtitle}</h4>
                <span className="modal-category">{selectedProject.category}</span>
              </div>

              <div className="modal-section">
                <h5>Overview</h5>
                <p>{selectedProject.description}</p>
              </div>

              <div className="modal-section">
                <h5>Architectural Highlights & Features</h5>
                <div className="highlights-list">
                  {(selectedProject.highlights || []).map((h, i) => (
                    <div key={i} className="highlight-item">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h5>Implemented Technologies</h5>
                <div className="tech-pills-wrap">
                  {(selectedProject.technologies_list || selectedProject.technologies.split(',').map(t => t.trim())).map((t, i) => (
                    <span key={i} className="tech-pill-large">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-footer-notice">
                <AlertCircle size={16} className="notice-icon" />
                <span>Source code repositories and live deployments are maintained as academic project portfolios.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .project-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .project-filter-btn {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .project-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }

        .project-filter-btn.active {
          background: var(--gradient-primary);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 28px;
        }

        .project-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .project-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .project-category {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-title-box {
          margin-bottom: 14px;
        }

        .project-name {
          font-size: 1.6rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .project-sub {
          font-size: 0.96rem;
          color: var(--accent-primary);
          font-weight: 500;
        }

        .project-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .project-tech-stack {
          margin-bottom: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .tech-stack-title {
          font-size: 0.76rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          font-family: var(--font-mono);
        }

        .tech-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-pill {
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: var(--text-primary);
          font-size: 0.78rem;
          font-family: var(--font-mono);
        }

        .tech-pill-large {
          padding: 6px 14px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid var(--border-accent);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-family: var(--font-mono);
        }

        .project-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: auto;
        }

        .btn-card {
          padding: 10px 14px;
          font-size: 0.85rem;
          width: 100%;
        }

        .btn-placeholder {
          font-style: italic;
          color: var(--text-muted);
          border-style: dashed;
        }

        .btn-placeholder:hover {
          color: var(--text-primary);
          background: rgba(99, 102, 241, 0.08);
        }

        /* Modal Styles */
        .modal-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-sub-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-sub-header h4 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .modal-category {
          font-size: 0.82rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
        }

        .modal-section h5 {
          font-size: 0.95rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .modal-section p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-footer-notice {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .notice-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card {
            padding: 22px;
          }
          .project-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
