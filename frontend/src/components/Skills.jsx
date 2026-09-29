import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Layout, 
  Server, 
  Database, 
  Wrench, 
  Cpu, 
  CheckCircle, 
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import PortfolioAPI from '../services/api';

const Skills = () => {
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback initial skills data matching requirements
  const defaultSkills = {
    all: [
      { id: 1, category: 'Programming', name: 'Python', proficiency: 'Advanced', icon_key: 'python' },
      { id: 2, category: 'Programming', name: 'JavaScript', proficiency: 'Intermediate', icon_key: 'javascript' },
      { id: 3, category: 'Frontend', name: 'HTML5', proficiency: 'Advanced', icon_key: 'html' },
      { id: 4, category: 'Frontend', name: 'CSS3', proficiency: 'Advanced', icon_key: 'css' },
      { id: 5, category: 'Frontend', name: 'React.js', proficiency: 'Intermediate', icon_key: 'react' },
      { id: 6, category: 'Backend', name: 'Django', proficiency: 'Intermediate', icon_key: 'django' },
      { id: 7, category: 'Backend', name: 'Flask', proficiency: 'Intermediate', icon_key: 'flask' },
      { id: 8, category: 'Database', name: 'SQLite', proficiency: 'Intermediate', icon_key: 'sqlite' },
      { id: 9, category: 'Database', name: 'MongoDB', proficiency: 'Intermediate', icon_key: 'mongodb' },
      { id: 10, category: 'Tools & Platforms', name: 'Git', proficiency: 'Intermediate', icon_key: 'git' },
      { id: 11, category: 'Tools & Platforms', name: 'GitHub', proficiency: 'Intermediate', icon_key: 'github' },
      { id: 12, category: 'Tools & Platforms', name: 'VS Code', proficiency: 'Advanced', icon_key: 'vscode' },
      { id: 13, category: 'AI & Computer Vision', name: 'Scikit-learn', proficiency: 'Intermediate', icon_key: 'scikit' },
      { id: 14, category: 'AI & Computer Vision', name: 'OpenCV', proficiency: 'Intermediate', icon_key: 'opencv' },
      { id: 15, category: 'AI & Computer Vision', name: 'MediaPipe', proficiency: 'Intermediate', icon_key: 'mediapipe' },
    ],
    by_category: {
      'Programming': [
        { id: 1, category: 'Programming', name: 'Python', proficiency: 'Advanced' },
        { id: 2, category: 'Programming', name: 'JavaScript', proficiency: 'Intermediate' }
      ],
      'Frontend': [
        { id: 3, category: 'Frontend', name: 'HTML5', proficiency: 'Advanced' },
        { id: 4, category: 'Frontend', name: 'CSS3', proficiency: 'Advanced' },
        { id: 5, category: 'Frontend', name: 'React.js', proficiency: 'Intermediate' }
      ],
      'Backend': [
        { id: 6, category: 'Backend', name: 'Django', proficiency: 'Intermediate' },
        { id: 7, category: 'Backend', name: 'Flask', proficiency: 'Intermediate' }
      ],
      'Database': [
        { id: 8, category: 'Database', name: 'SQLite', proficiency: 'Intermediate' },
        { id: 9, category: 'Database', name: 'MongoDB', proficiency: 'Intermediate' }
      ],
      'Tools & Platforms': [
        { id: 10, category: 'Tools & Platforms', name: 'Git', proficiency: 'Intermediate' },
        { id: 11, category: 'Tools & Platforms', name: 'GitHub', proficiency: 'Intermediate' },
        { id: 12, category: 'Tools & Platforms', name: 'VS Code', proficiency: 'Advanced' }
      ],
      'AI & Computer Vision': [
        { id: 13, category: 'AI & Computer Vision', name: 'Scikit-learn', proficiency: 'Intermediate' },
        { id: 14, category: 'AI & Computer Vision', name: 'OpenCV', proficiency: 'Intermediate' },
        { id: 15, category: 'AI & Computer Vision', name: 'MediaPipe', proficiency: 'Intermediate' }
      ]
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await PortfolioAPI.getSkills();
        if (response && response.data) {
          setSkillsData(response.data);
        } else {
          setSkillsData(defaultSkills);
        }
      } catch (err) {
        console.warn('Using local skills cache:', err.message);
        setSkillsData(defaultSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const data = skillsData || defaultSkills;
  const categoriesList = ['All', 'Programming', 'Frontend', 'Backend', 'Database', 'Tools & Platforms', 'AI & Computer Vision'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming': return <Terminal size={18} />;
      case 'Frontend': return <Layout size={18} />;
      case 'Backend': return <Server size={18} />;
      case 'Database': return <Database size={18} />;
      case 'Tools & Platforms': return <Wrench size={18} />;
      case 'AI & Computer Vision': return <Cpu size={18} />;
      default: return <Code2 size={18} />;
    }
  };

  // Filter skills based on selected category and search input
  const allSkillsList = data.all || [];
  const filteredSkills = allSkillsList.filter(skill => {
    const matchesCategory = activeCategory === 'All' || skill.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Layers size={14} />
            Technical Arsenal
          </span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Core Competencies</span>
          </h2>
          <p className="section-subtitle">
            Curated toolkit spanning software engineering, machine learning pipelines, full-stack frameworks, and database systems.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="skills-filter-wrapper">
          <div className="category-tabs">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="skills-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search skill (e.g. Python, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skills-search-input"
            />
          </div>
        </div>

        {/* Category Cards Overview (when 'All' is active and no search) */}
        {activeCategory === 'All' && !searchQuery ? (
          <div className="category-group-grid">
            {Object.entries(data.by_category || {}).map(([categoryName, items]) => (
              <div key={categoryName} className="glass-card category-block-card">
                <div className="category-block-header">
                  <div className="category-block-icon">
                    {getCategoryIcon(categoryName)}
                  </div>
                  <div>
                    <h3 className="category-block-title">{categoryName}</h3>
                    <span className="category-count">{items.length} Skills</span>
                  </div>
                </div>

                <div className="category-skills-pills">
                  {items.map((skill) => (
                    <div key={skill.id || skill.name} className="skill-pill">
                      <span className="pill-name">{skill.name}</span>
                      <span className="pill-level">{skill.proficiency || 'Core'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Filtered or Searched Skill Grid */
          <div className="skills-cards-grid">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <div key={skill.id || skill.name} className="glass-card skill-card-item">
                  <div className="skill-card-top">
                    <div className="skill-icon-box">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <span className="badge badge-primary">{skill.category}</span>
                  </div>
                  
                  <div className="skill-card-body">
                    <h4 className="skill-item-name">{skill.name}</h4>
                    <div className="skill-item-meta">
                      <span className="level-dot" />
                      <span>{skill.proficiency || 'Proficient'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-skills-found">
                <p>No technical skills found matching "{searchQuery}".</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .skills-filter-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .category-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .category-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }

        .category-tab-btn.active {
          background: var(--gradient-primary);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .skills-search-box {
          position: relative;
          max-width: 440px;
          margin: 0 auto;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .skills-search-input {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .skills-search-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        /* Category Blocks Grid */
        .category-group-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }

        .category-block-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .category-block-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .category-block-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .category-block-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .category-count {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .category-skills-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          font-size: 0.88rem;
          transition: all var(--transition-fast);
        }

        .skill-pill:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .pill-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .pill-level {
          font-size: 0.72rem;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          font-family: var(--font-mono);
        }

        /* Filtered Grid */
        .skills-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .skill-card-item {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .skill-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-item-name {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .skill-item-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .level-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-emerald);
        }

        .no-skills-found {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .category-group-grid {
            grid-template-columns: 1fr;
          }
          .skills-filter-wrapper {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
