import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Code2, Server, Terminal, Sparkles } from 'lucide-react';
import PortfolioAPI from '../services/api';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [apiStatus, setApiStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  // Scroll detection for navbar background & active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check backend health periodically
  useEffect(() => {
    const checkApi = async () => {
      try {
        await PortfolioAPI.checkHealth();
        setApiStatus('online');
      } catch (err) {
        setApiStatus('offline');
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#home" className="nav-brand" aria-label="Sadhana Saravanan Home">
          <div className="brand-icon">
            <Code2 size={22} className="brand-svg" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Sadhana</span>
            <span className="brand-tag">.dev</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.name}
                    {isActive && <span className="active-dot" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls: API Status, Theme Toggle, Mobile Menu Button */}
        <div className="nav-actions">
          {/* Live API Status indicator badge */}
          <div 
            className={`api-status-badge status-${apiStatus}`} 
            title={`Backend API is ${apiStatus === 'online' ? 'Connected (Flask + SQLite)' : apiStatus === 'offline' ? 'Offline (Run backend)' : 'Checking'}`}
          >
            <span className="status-indicator-dot" />
            <span className="status-label">API {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : '...'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="theme-icon sun-icon" />
            ) : (
              <Moon size={20} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          
          <div className="mobile-nav-footer">
            <div className="mobile-status">
              <span className={`status-indicator-dot dot-${apiStatus}`} />
              <span>Flask REST API: <strong>{apiStatus.toUpperCase()}</strong></span>
            </div>
            <p className="mobile-footer-text">SNS College of Technology • 2nd Year CSE</p>
          </div>
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          z-index: 1000;
          transition: background-color var(--transition-smooth), border-color var(--transition-smooth), backdrop-filter var(--transition-smooth), box-shadow var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .navbar-scrolled {
          background-color: var(--bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: transform var(--transition-fast);
        }

        .nav-brand:hover .brand-icon {
          transform: scale(1.05) rotate(-3deg);
        }

        .brand-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .brand-name {
          letter-spacing: -0.01em;
        }

        .brand-tag {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
        }

        .nav-link {
          position: relative;
          padding: 8px 14px;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: color var(--transition-fast), background-color var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background-color: rgba(99, 102, 241, 0.08);
        }

        .nav-link.active {
          color: var(--accent-primary);
          font-weight: 600;
          background-color: rgba(99, 102, 241, 0.12);
        }

        .active-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-primary);
          display: inline-block;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .api-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          font-weight: 500;
          border: 1px solid var(--border-subtle);
          background: var(--bg-tertiary);
        }

        .status-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-online .status-indicator-dot,
        .dot-online {
          background-color: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
        }

        .status-offline .status-indicator-dot,
        .dot-offline {
          background-color: var(--accent-rose);
          box-shadow: 0 0 8px var(--accent-rose);
        }

        .status-checking .status-indicator-dot,
        .dot-checking {
          background-color: var(--accent-amber);
          animation: pulseGlow 1.5s infinite;
        }

        .theme-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-strong);
          color: var(--accent-primary);
          transform: rotate(15deg);
        }

        .sun-icon {
          color: #fbbf24;
        }

        .moon-icon {
          color: #818cf8;
        }

        .mobile-menu-btn {
          display: none;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          align-items: center;
          justify-content: center;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
          box-shadow: var(--shadow-lg);
        }

        .mobile-nav-drawer.open {
          max-height: 420px;
          padding: 20px 0;
        }

        .mobile-nav-content {
          padding: 0 24px;
        }

        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-nav-link {
          display: block;
          padding: 10px 14px;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .mobile-nav-link.active,
        .mobile-nav-link:hover {
          color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .mobile-nav-footer {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .mobile-footer-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .api-status-badge .status-label {
            display: none;
          }
          .api-status-badge {
            padding: 8px;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
