import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  GraduationCap, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import PortfolioAPI from '../services/api';

const Contact = ({ profileData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const response = await PortfolioAPI.sendContactMessage(formData);
      
      setStatus('success');
      setFeedbackMsg(response.message || 'Message submitted successfully to Flask API and saved to SQLite database.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (err) {
      setStatus('error');
      if (err.errors) {
        setErrors(err.errors);
      }
      setFeedbackMsg(err.message || 'Failed to submit message to backend. Please ensure the Flask server is running.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Mail size={14} />
            Get In Touch
          </span>
          <h2 className="section-title">
            Connect & <span className="gradient-text">Collaborate</span>
          </h2>
          <p className="section-subtitle">
            Interested in discussing internship opportunities, AI / full-stack projects, or student initiatives? Send a direct message below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Student Contact Info */}
          <div className="glass-card contact-info-card">
            <h3 className="contact-card-title">Student Profile</h3>
            <p className="contact-card-sub">
              2nd Year CSE student open to summer/fall software engineering internships, technical collaborations, and hackathons.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="detail-label">Institution & Degree</div>
                  <div className="detail-value">SNS College of Technology</div>
                  <div className="detail-sub">B.E. Computer Science Engineering (2nd Year)</div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="detail-label">Location</div>
                  <div className="detail-value">Coimbatore, Tamil Nadu, India</div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="detail-label">Direct Contact</div>
                  <div className="detail-value text-placeholder">Add Email Address</div>
                  <div className="detail-sub">Use form to send message to database</div>
                </div>
              </div>
            </div>

            {/* Architecture note */}
            <div className="backend-db-note">
              <div className="db-note-header">
                <ShieldCheck size={16} className="note-icon" />
                <span>Full-Stack REST Architecture</span>
              </div>
              <p className="db-note-text">
                Submissions trigger <code className="code-pill">POST /api/contact</code> and are safely validated and persisted directly to the backend <code className="code-pill">SQLite</code> database.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="glass-card contact-form-card">
            <h3 className="form-title">Send a Message</h3>
            <p className="form-sub">Fill out the fields below to submit directly to the backend API.</p>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="alert-banner alert-success animate-fade-in">
                <CheckCircle size={20} className="alert-icon" />
                <div>
                  <strong>Message Dispatched Successfully!</strong>
                  <p>{feedbackMsg}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="alert-banner alert-error animate-fade-in">
                <AlertCircle size={20} className="alert-icon" />
                <div>
                  <strong>Submission Failed</strong>
                  <p>{feedbackMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="contact-form">
              {/* Name & Email Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe / Hiring Lead"
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@company.com"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Summer Internship Opportunity / Project Collaboration"
                  className={`form-input ${errors.subject ? 'input-error' : ''}`}
                  disabled={status === 'submitting'}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message Content <span className="required-star">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message, internship details, or inquiry here..."
                  className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                  disabled={status === 'submitting'}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary submit-btn"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting to Database...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 32px;
        }

        .contact-info-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
        }

        .contact-card-title {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }

        .contact-card-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .detail-icon-box {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .detail-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
          margin-bottom: 2px;
        }

        .detail-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .text-placeholder {
          font-style: italic;
          color: var(--text-muted);
        }

        .backend-db-note {
          margin-top: auto;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid var(--border-accent);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .db-note-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .db-note-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .code-pill {
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.2);
          font-family: var(--font-mono);
          color: var(--accent-secondary);
          font-size: 0.8em;
        }

        /* Contact Form Card */
        .contact-form-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
        }

        .form-title {
          font-size: 1.6rem;
          margin-bottom: 4px;
        }

        .form-sub {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .required-star {
          color: var(--accent-rose);
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
        }

        .input-error {
          border-color: var(--accent-rose);
        }

        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.18);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-text {
          font-size: 0.8rem;
          color: var(--accent-rose);
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          margin-top: 6px;
        }

        .alert-banner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--text-primary);
        }

        .alert-success .alert-icon {
          color: var(--accent-emerald);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-error {
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: var(--text-primary);
        }

        .alert-error .alert-icon {
          color: var(--accent-rose);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .contact-info-card, .contact-form-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
