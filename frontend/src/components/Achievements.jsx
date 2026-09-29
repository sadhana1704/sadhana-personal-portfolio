import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  Users, 
  Sparkles, 
  Cpu, 
  Globe, 
  Zap, 
  Terminal, 
  ShieldCheck, 
  BookOpen, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import PortfolioAPI from '../services/api';

const Achievements = () => {
  const [achievementsData, setAchievementsData] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const defaultAchievements = [
    {
      id: 1,
      title: 'TNWISE 2026',
      category: 'Hackathon',
      badge: 'Hackathon 2026',
      description: 'Competed in the Precision Agriculture & Farm Automation track, architecting AI-driven farm telemetry and resource management concepts.',
      type: 'hackathon',
      icon_key: 'cpu'
    },
    {
      id: 2,
      title: 'NASA Space Apps Challenge',
      category: 'Global Hackathon',
      badge: 'International Challenge',
      description: 'Participated in the world’s largest annual space & science hackathon, collaborating on solutions applying open datasets to complex global challenges.',
      type: 'hackathon',
      icon_key: 'globe'
    },
    {
      id: 3,
      title: 'HackNext\'25',
      category: 'Hackathon',
      badge: 'Hackathon 2025',
      description: 'Engaged in fast-paced collaborative product prototyping and intensive competitive software design rounds.',
      type: 'hackathon',
      icon_key: 'zap'
    },
    {
      id: 4,
      title: 'Oblivion\'25',
      category: 'Technical Challenge',
      badge: 'Technical Event',
      description: 'Participated in coding sprints, computational thinking rounds, and software design events.',
      type: 'hackathon',
      icon_key: 'terminal'
    },
    {
      id: 5,
      title: 'CyberNova 26 – Project AETHER',
      category: 'Hackathon',
      badge: 'Hackathon 2026',
      description: 'Engineered Project AETHER focusing on cybersecurity defense frameworks and intelligent systems.',
      type: 'hackathon',
      icon_key: 'shield'
    },
    {
      id: 6,
      title: 'Avanzare Hackathon',
      category: 'Hackathon',
      badge: 'Hackathon Event',
      description: 'Contributed to rapid system architecture development alongside multi-disciplinary student developer teams.',
      type: 'hackathon',
      icon_key: 'cpu'
    },
    {
      id: 7,
      title: 'Class Executive Member',
      category: 'Leadership & Extracurricular',
      badge: 'Student Leadership',
      description: 'Active departmental Executive Member coordinating class activities, academic workshops, and peer-to-peer technical forums.',
      type: 'leadership',
      icon_key: 'users'
    },
    {
      id: 8,
      title: 'Applications of ChatGPT Bootcamp',
      category: 'Workshop & Mentorship',
      badge: 'Lead Organizer',
      description: 'Led a dedicated team of executive members to design curriculum, coordinate logistics, and conduct hands-on training sessions on practical applications of ChatGPT.',
      type: 'leadership',
      icon_key: 'book-open'
    },
    {
      id: 9,
      title: 'AI Tools & Cybersecurity Technical Sessions',
      category: 'Technical Seminars',
      badge: 'Session Speaker',
      description: 'Conducted student-focused technical sessions demonstrating emerging AI productivity tools and foundational cybersecurity awareness.',
      type: 'leadership',
      icon_key: 'shield-check'
    }
  ];

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await PortfolioAPI.getAchievements();
        if (response && response.data && response.data.length > 0) {
          // Categorize as hackathon vs leadership
          const enriched = response.data.map(item => {
            const isHackathon = item.category.toLowerCase().includes('hackathon') || 
                                item.category.toLowerCase().includes('challenge') || 
                                item.category.toLowerCase().includes('event');
            return {
              ...item,
              type: isHackathon ? 'hackathon' : 'leadership'
            };
          });
          setAchievementsData(enriched);
        } else {
          setAchievementsData(defaultAchievements);
        }
      } catch (err) {
        console.warn('Using fallback achievements data:', err.message);
        setAchievementsData(defaultAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const getIcon = (iconKey) => {
    switch (iconKey) {
      case 'globe': return <Globe size={20} />;
      case 'zap': return <Zap size={20} />;
      case 'terminal': return <Terminal size={20} />;
      case 'shield': 
      case 'shield-check': return <ShieldCheck size={20} />;
      case 'users': return <Users size={20} />;
      case 'book-open': return <BookOpen size={20} />;
      case 'cpu': 
      default: return <Cpu size={20} />;
    }
  };

  const filteredItems = achievementsData.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Hackathons') return item.type === 'hackathon';
    if (activeTab === 'Leadership') return item.type === 'leadership';
    return true;
  });

  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Trophy size={14} />
            Milestones & Leadership
          </span>
          <h2 className="section-title">
            Hackathons & <span className="gradient-text">Extracurriculars</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated commitment through collaborative hackathons, student leadership, and organizing technical bootcamps.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="achievements-tabs">
          <button 
            onClick={() => setActiveTab('All')} 
            className={`tab-filter-btn ${activeTab === 'All' ? 'active' : ''}`}
          >
            All Milestones ({achievementsData.length})
          </button>
          <button 
            onClick={() => setActiveTab('Hackathons')} 
            className={`tab-filter-btn ${activeTab === 'Hackathons' ? 'active' : ''}`}
          >
            <Trophy size={16} />
            Hackathons & Competitions (6)
          </button>
          <button 
            onClick={() => setActiveTab('Leadership')} 
            className={`tab-filter-btn ${activeTab === 'Leadership' ? 'active' : ''}`}
          >
            <Users size={16} />
            Leadership & Bootcamps (3)
          </button>
        </div>

        {/* Grid of Cards */}
        <div className="achievements-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card achievement-card">
              <div className="achievement-card-top">
                <div className={`achievement-icon-box icon-${item.type}`}>
                  {getIcon(item.icon_key)}
                </div>
                <span className="badge badge-primary">{item.badge || item.category}</span>
              </div>

              <div className="achievement-card-content">
                <span className="achievement-category-tag">{item.category}</span>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-desc">{item.description}</p>
              </div>

              <div className="achievement-footer">
                <CheckCircle2 size={15} className="achievement-check" />
                <span>Active Student Contribution</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .tab-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .tab-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }

        .tab-filter-btn.active {
          background: var(--gradient-primary);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .achievement-card {
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }

        .achievement-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .achievement-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-hackathon {
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid var(--border-accent);
          color: var(--accent-primary);
        }

        .icon-leadership {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
        }

        .achievement-card-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .achievement-category-tag {
          font-size: 0.78rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .achievement-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .achievement-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .achievement-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .achievement-check {
          color: var(--accent-emerald);
        }

        @media (max-width: 640px) {
          .achievements-grid {
            grid-template-columns: 1fr;
          }
          .achievement-card {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
