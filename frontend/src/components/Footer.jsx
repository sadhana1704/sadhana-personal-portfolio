import React from 'react';
import { 
  Code2, 
  Mail, 
  ArrowUp, 
  Heart, 
  GraduationCap, 
  MapPin, 
  Layers,
  Database,
  Server
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer = ({ profileData }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handlePlaceholderClick = (type) => {
    alert(`Placeholder configured: 'Add ${type}'. You can configure this in your profile settings when you publish your profile.`);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-main-grid">
          {/* Column 1: Student & College Info */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Code2 size={22} />
              </div>
              <span className="footer-brand-name">Sadhana Saravanan</span>
            </div>
            
            <p className="footer-tagline">
              Computer Science Engineering Undergraduate at SNS College of Technology, Coimbatore.
            </p>

            <div className="footer-academic-meta">
              <div className="meta-line">
                <GraduationCap size={15} className="meta-icon" />
                <span>B.E. Computer Science Engineering (2nd Year)</span>
              </div>
              <div className="meta-line">
                <MapPin size={15} className="meta-icon" />
                <span>SNS College of Technology • Coimbatore, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Repository Placeholders */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect & Profiles</h4>
            <p className="footer-social-note">
              Profiles are configured with standard placeholders without fictitious URLs:
            </p>

            <div className="social-placeholder-list">
              <button 
                onClick={() => handlePlaceholderClick('GitHub URL')}
                className="social-pill-btn"
                title="GitHub URL Placeholder"
              >
                <GithubIcon size={16} />
                <span>Add GitHub URL</span>
              </button>

              <button 
                onClick={() => handlePlaceholderClick('LinkedIn URL')}
                className="social-pill-btn"
                title="LinkedIn URL Placeholder"
              >
                <LinkedinIcon size={16} />
                <span>Add LinkedIn URL</span>
              </button>

              <button 
                onClick={() => handlePlaceholderClick('Email Address')}
                className="social-pill-btn"
                title="Email Address Placeholder"
              >
                <Mail size={16} />
                <span>Add Email Address</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Sadhana Saravanan. Built with React.js, Vite, Flask REST API & SQLite.
          </div>

          <button 
            onClick={scrollToTop} 
            className="back-to-top-btn"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          padding: 64px 0 32px 0;
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .footer-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .footer-brand-name {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
          max-width: 400px;
        }

        .footer-academic-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          color: var(--text-muted);
        }

        .meta-icon {
          color: var(--accent-primary);
        }

        .footer-col-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .footer-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast), transform var(--transition-fast);
          display: inline-block;
        }

        .footer-link:hover {
          color: var(--accent-primary);
          transform: translateX(3px);
        }

        .footer-social-note {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .social-placeholder-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-pill-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px dashed var(--border-strong);
          color: var(--text-secondary);
          font-size: 0.86rem;
          font-family: var(--font-mono);
          transition: all var(--transition-fast);
        }

        .social-pill-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.08);
        }

        .footer-bottom-bar {
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copyright {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .back-to-top-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
