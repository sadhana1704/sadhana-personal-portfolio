import React from 'react';
import { X, Download, Printer, GraduationCap, Briefcase, Code, Award, ExternalLink, MapPin } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Action Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 className="modal-title">Student Resume Preview</h3>
            <span className="badge badge-primary">Sadhana Saravanan • 2nd Year CSE</span>
          </div>
          <div className="modal-actions">
            <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print or Save as PDF">
              <Printer size={16} />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="resume-paper" id="printable-resume">
          {/* Header */}
          <div className="resume-header-section">
            <h1 className="resume-name">Sadhana Saravanan</h1>
            <p className="resume-headline">Computer Science Engineering Undergraduate</p>
            <div className="resume-contact-bar">
              <span><MapPin size={13} /> SNS College of Technology, Coimbatore, Tamil Nadu, India</span>
              <span>•</span>
              <span>2nd Year B.E. Computer Science</span>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <GraduationCap size={16} /> Education
            </h2>
            <div className="resume-item">
              <div className="resume-item-header">
                <strong>Bachelor of Engineering – Computer Science Engineering</strong>
                <span className="resume-date">2024 – Present (2nd Year)</span>
              </div>
              <div className="resume-sub">SNS College of Technology, Coimbatore, Tamil Nadu, India</div>
              <p className="resume-text">
                Focus Areas: Data Structures, Algorithms, Artificial Intelligence, Cybersecurity, Full-Stack Web Technologies.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Code size={16} /> Technical Skills
            </h2>
            <div className="resume-grid">
              <div><strong>Programming:</strong> Python, JavaScript</div>
              <div><strong>Frontend:</strong> HTML, CSS, React.js</div>
              <div><strong>Backend:</strong> Django, Flask</div>
              <div><strong>Databases:</strong> SQLite, MongoDB</div>
              <div><strong>Tools:</strong> Git, GitHub, VS Code</div>
              <div><strong>AI / Computer Vision:</strong> Scikit-learn, OpenCV, MediaPipe</div>
            </div>
          </div>

          {/* Experience */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Briefcase size={16} /> Internship Experience
            </h2>
            <div className="resume-item">
              <div className="resume-item-header">
                <strong>Full Stack Development Intern</strong>
                <span className="resume-date">15 Days</span>
              </div>
              <div className="resume-sub">ADHOC SOFTWARES • Coimbatore, India</div>
              <ul className="resume-bullets">
                <li>Acquired practical expertise in full-stack architecture using Python, Django, HTML, CSS, SQLite, and VS Code.</li>
                <li>Developed and deployed the <strong>Student Management Portal</strong>, implementing secure database schemas and dynamic routing.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Code size={16} /> Key Technical Projects
            </h2>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <strong>EduTrack – Student Attendance Management Portal</strong>
                <span className="resume-tech">Python, Django, HTML, CSS, SQLite</span>
              </div>
              <p className="resume-text">
                Web-based portal featuring multi-role authentication (Principal, Teacher, Student) for streamlined attendance logging, records tracking, and administrative analytics.
              </p>
            </div>

            <div className="resume-item">
              <div className="resume-item-header">
                <strong>AgriSense AI – Precision Agriculture & Farm Automation</strong>
                <span className="resume-tech">Python, ML, IoT, Computer Vision</span>
              </div>
              <p className="resume-text">
                AI-driven solution built for hackathons to optimize farm resource monitoring, automate agricultural tasks, and enhance yield efficiency.
              </p>
            </div>

            <div className="resume-item">
              <div className="resume-item-header">
                <strong>Burn-Ex – AI Based Calorie Estimation System</strong>
                <span className="resume-tech">React.js, Flask, OpenCV, MediaPipe Pose, Scikit-learn</span>
              </div>
              <p className="resume-text">
                Computer vision application utilizing MediaPipe pose estimation to track workout repetitions and estimate real-time calorie expenditure.
              </p>
            </div>
          </div>

          {/* Hackathons & Extracurricular */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Award size={16} /> Hackathons & Leadership
            </h2>
            <ul className="resume-bullets">
              <li><strong>TNWISE 2026:</strong> Hackathon competitor in Precision Agriculture & Farm Automation track.</li>
              <li><strong>NASA Space Apps Challenge:</strong> International hackathon participant addressing real-world aerospace and Earth data problems.</li>
              <li><strong>Hackathons:</strong> HackNext'25, Oblivion'25, CyberNova 26 (Project AETHER), Avanzare Hackathon.</li>
              <li><strong>Leadership:</strong> Class Executive Member; organized technical bootcamps; led team for Applications of ChatGPT bootcamp; delivered student sessions on AI tools and cybersecurity.</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-container {
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-secondary);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          background: var(--bg-secondary);
          z-index: 10;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .modal-title {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .modal-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-sm {
          padding: 8px 14px;
          font-size: 0.85rem;
        }

        .modal-close-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .resume-paper {
          padding: 32px 40px;
          color: var(--text-primary);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .resume-header-section {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--border-subtle);
          margin-bottom: 24px;
        }

        .resume-name {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .resume-headline {
          font-size: 1.1rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .resume-contact-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .resume-contact-bar span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .resume-section {
          margin-bottom: 22px;
        }

        .resume-section-title {
          font-size: 1.1rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 6px;
        }

        .resume-item {
          margin-bottom: 12px;
        }

        .resume-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
        }

        .resume-date, .resume-tech {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .resume-tech {
          color: var(--accent-secondary);
        }

        .resume-sub {
          font-size: 0.86rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 4px;
        }

        .resume-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .resume-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .resume-bullets {
          padding-left: 18px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        @media (max-width: 640px) {
          .resume-paper {
            padding: 20px;
          }
          .resume-name {
            font-size: 1.6rem;
          }
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          .resume-section-title {
            color: #333 !important;
            border-bottom: 1px solid #ddd !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeModal;
