/**
 * API Service Layer for Sadhana Saravanan Portfolio
 * Interacts with Flask Backend REST endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Helper to execute fetch requests with timeouts and JSON parsing
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data.error || 'Server request failed',
        errors: data.errors || null,
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    // Network or server unreachable error
    throw {
      status: 0,
      message: 'Unable to connect to Flask API server. Please make sure the backend is running.',
      originalError: error,
    };
  }
}

export const PortfolioAPI = {
  /**
   * Health Check
   */
  async checkHealth() {
    return apiRequest('/api/health');
  },

  /**
   * Get Student Profile
   */
  async getProfile() {
    return apiRequest('/api/profile');
  },

  /**
   * Get All Projects
   */
  async getProjects() {
    return apiRequest('/api/projects');
  },

  /**
   * Get Categorized Skills
   */
  async getSkills() {
    return apiRequest('/api/skills');
  },

  /**
   * Get Experience & Internships
   */
  async getExperience() {
    return apiRequest('/api/experience');
  },

  /**
   * Get Achievements & Hackathons
   */
  async getAchievements() {
    return apiRequest('/api/achievements');
  },

  /**
   * Submit Contact Form Message
   */
  async sendContactMessage(payload) {
    return apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export default PortfolioAPI;
