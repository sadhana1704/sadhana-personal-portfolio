import sys
import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from database import init_db
from models import PortfolioModel

app = Flask(__name__)

# Enable CORS for React frontend (supports Vite default port 5173, etc.)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000", "*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Ensure database is initialized on startup
with app.app_context():
    init_db()

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify backend service status."""
    return jsonify({
        "status": "online",
        "service": "Portfolio REST API",
        "version": "1.0.0",
        "student": "Sadhana Saravanan",
        "database": "SQLite connected"
    }), 200

@app.route('/api/profile', methods=['GET'])
def get_profile():
    """Fetch student profile information."""
    try:
        profile = PortfolioModel.get_profile()
        if not profile:
            return jsonify({"error": "Profile information not found"}), 404
        return jsonify({"success": True, "data": profile}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Fetch all verified portfolio projects."""
    try:
        projects = PortfolioModel.get_all_projects()
        return jsonify({
            "success": True,
            "count": len(projects),
            "data": projects
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Fetch all technical skills categorized."""
    try:
        skills_data = PortfolioModel.get_all_skills()
        return jsonify({
            "success": True,
            "data": skills_data
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """Fetch work experience & internships."""
    try:
        experience = PortfolioModel.get_all_experience()
        return jsonify({
            "success": True,
            "count": len(experience),
            "data": experience
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/achievements', methods=['GET'])
def get_achievements():
    """Fetch hackathons, technical events, and extracurricular leadership."""
    try:
        achievements = PortfolioModel.get_all_achievements()
        return jsonify({
            "success": True,
            "count": len(achievements),
            "data": achievements
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact_form():
    """Submit and store contact messages in SQLite database."""
    try:
        data = request.get_json() or {}
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        # Input Validation
        errors = {}
        if not name:
            errors['name'] = 'Name is required.'
        elif len(name) < 2 or len(name) > 100:
            errors['name'] = 'Name must be between 2 and 100 characters.'

        if not email:
            errors['email'] = 'Email address is required.'
        elif not re.match(EMAIL_REGEX, email):
            errors['email'] = 'Please enter a valid email address (e.g. user@example.com).'

        if not subject:
            errors['subject'] = 'Subject is required.'
        elif len(subject) < 3 or len(subject) > 150:
            errors['subject'] = 'Subject must be between 3 and 150 characters.'

        if not message:
            errors['message'] = 'Message content is required.'
        elif len(message) < 10 or len(message) > 3000:
            errors['message'] = 'Message must be between 10 and 3000 characters.'

        if errors:
            return jsonify({
                "success": False,
                "message": "Validation failed. Please correct the highlighted fields.",
                "errors": errors
            }), 400

        saved = PortfolioModel.create_contact_message(name, email, subject, message)

        return jsonify({
            "success": True,
            "message": f"Thank you, {name}! Your message has been received successfully.",
            "data": saved
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "message": "An unexpected server error occurred while processing your message.",
            "error": str(e)
        }), 500

@app.route('/api/contact/messages', methods=['GET'])
def get_contact_messages():
    """Retrieve submitted messages for review/admin purpose."""
    try:
        messages = PortfolioModel.get_all_contact_messages()
        return jsonify({
            "success": True,
            "count": len(messages),
            "data": messages
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({"success": False, "error": "Endpoint not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"success": False, "error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Sadhana Saravanan Portfolio REST API on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=True)
