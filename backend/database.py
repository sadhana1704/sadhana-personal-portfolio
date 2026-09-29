import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.db')

def get_db_connection():
    """Create and return a database connection with dict-like row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database tables and seed default portfolio data."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create Projects Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT,
            description TEXT NOT NULL,
            technologies TEXT NOT NULL,
            category TEXT DEFAULT 'Full Stack',
            github_url TEXT DEFAULT '',
            live_url TEXT DEFAULT '',
            featured INTEGER DEFAULT 1,
            badge TEXT DEFAULT 'Active Project'
        )
    ''')

    # Create Skills Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            name TEXT NOT NULL,
            proficiency TEXT DEFAULT 'Intermediate',
            icon_key TEXT DEFAULT 'code'
        )
    ''')

    # Create Experience Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS experience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            organization TEXT NOT NULL,
            duration TEXT NOT NULL,
            location TEXT DEFAULT 'Coimbatore, India',
            description TEXT NOT NULL,
            technologies TEXT NOT NULL,
            project_name TEXT NOT NULL,
            type TEXT DEFAULT 'Internship'
        )
    ''')

    # Create Achievements / Events / Extracurricular Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            badge TEXT,
            icon_key TEXT DEFAULT 'award'
        )
    ''')

    # Create Contact Messages Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL,
            is_read INTEGER DEFAULT 0
        )
    ''')

    # Create Profile Info Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            headline TEXT NOT NULL,
            tagline TEXT NOT NULL,
            bio TEXT NOT NULL,
            course TEXT NOT NULL,
            year TEXT NOT NULL,
            college TEXT NOT NULL,
            location TEXT NOT NULL,
            github_placeholder TEXT DEFAULT 'Add GitHub URL',
            linkedin_placeholder TEXT DEFAULT 'Add LinkedIn URL',
            email_placeholder TEXT DEFAULT 'Add Email Address'
        )
    ''')

    conn.commit()
    conn.close()

    # Seed data if empty
    seed_data()

def seed_data():
    """Seed the database with student profile data."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if profile exists
    cursor.execute('SELECT COUNT(*) FROM profile')
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
            INSERT INTO profile (name, headline, tagline, bio, course, year, college, location, github_placeholder, linkedin_placeholder, email_placeholder)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            'Sadhana Saravanan',
            'Computer Science Engineering Student',
            'Passionate about building practical solutions using AI, full-stack development and emerging technologies.',
            'Motivated 2nd-year Computer Science Engineering undergraduate at SNS College of Technology with strong foundational skills in Artificial Intelligence, Cybersecurity, and Full-Stack Web Development. Keen on solving real-world challenges through clean code and modern software engineering practices.',
            'Bachelor of Engineering - Computer Science Engineering',
            '2nd Year CSE',
            'SNS College of Technology',
            'Coimbatore, Tamil Nadu, India',
            'Add GitHub URL',
            'Add LinkedIn URL',
            'Add Email Address'
        ))

    # Check if projects exist
    cursor.execute('SELECT COUNT(*) FROM projects')
    if cursor.fetchone()[0] == 0:
        projects_data = [
            (
                'EduTrack',
                'Student Attendance Management Portal',
                'A web-based student attendance management system with separate login access for Principal, Teacher, and Student users. The system allows attendance tracking, records management, and administrative control.',
                'Python, Django, HTML, CSS, SQLite',
                'Web & Backend',
                '',
                '',
                1,
                'Featured System'
            ),
            (
                'AgriSense AI',
                'Precision Agriculture & Farm Automation',
                'An AI-based precision agriculture and farm automation project developed for a hackathon to optimize resource monitoring, intelligent crop management, and automated agricultural processes.',
                'Python, Machine Learning, IoT Concepts, Computer Vision',
                'AI & Automation',
                '',
                '',
                1,
                'Hackathon Project'
            ),
            (
                'Burn-Ex',
                'AI Based Calorie Estimation System',
                'An intelligent calorie estimation system leveraging computer vision and human pose detection algorithms to analyze physical activity and provide automated energy expenditure metrics.',
                'React.js, Vite, Tailwind CSS, Chart.js, Flask REST API, Python, Pandas, NumPy, Scikit-learn, OpenCV, MediaPipe Pose, SQLite/MySQL',
                'AI & Computer Vision',
                '',
                '',
                1,
                'AI / Full Stack'
            )
        ]
        cursor.executemany('''
            INSERT INTO projects (title, subtitle, description, technologies, category, github_url, live_url, featured, badge)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', projects_data)

    # Check if skills exist
    cursor.execute('SELECT COUNT(*) FROM skills')
    if cursor.fetchone()[0] == 0:
        skills_data = [
            # Programming
            ('Programming', 'Python', 'Advanced', 'python'),
            ('Programming', 'JavaScript', 'Intermediate', 'javascript'),
            # Frontend
            ('Frontend', 'HTML5', 'Advanced', 'html'),
            ('Frontend', 'CSS3', 'Advanced', 'css'),
            ('Frontend', 'React.js', 'Intermediate', 'react'),
            # Backend
            ('Backend', 'Django', 'Intermediate', 'django'),
            ('Backend', 'Flask', 'Intermediate', 'flask'),
            # Database
            ('Database', 'SQLite', 'Intermediate', 'sqlite'),
            ('Database', 'MongoDB', 'Beginner / Intermediate', 'mongodb'),
            # Tools
            ('Tools & Platforms', 'Git', 'Intermediate', 'git'),
            ('Tools & Platforms', 'GitHub', 'Intermediate', 'github'),
            ('Tools & Platforms', 'VS Code', 'Advanced', 'vscode'),
            # AI / Computer Vision
            ('AI & Computer Vision', 'Scikit-learn', 'Intermediate', 'scikit'),
            ('AI & Computer Vision', 'OpenCV', 'Intermediate', 'opencv'),
            ('AI & Computer Vision', 'MediaPipe', 'Intermediate', 'mediapipe')
        ]
        cursor.executemany('''
            INSERT INTO skills (category, name, proficiency, icon_key)
            VALUES (?, ?, ?, ?)
        ''', skills_data)

    # Check if experience exists
    cursor.execute('SELECT COUNT(*) FROM experience')
    if cursor.fetchone()[0] == 0:
        experience_data = [
            (
                'Full Stack Development Intern',
                'ADHOC SOFTWARES',
                '15 Days',
                'Coimbatore, Tamil Nadu, India',
                'Engaged in full stack web application design and development. Gained hands-on experience in frontend styling, backend routing, database schema modeling, and full lifecycle implementation of the Student Management Portal.',
                'Python, Django, HTML, CSS, SQLite, VS Code',
                'Student Management Portal',
                'Internship'
            )
        ]
        cursor.executemany('''
            INSERT INTO experience (role, organization, duration, location, description, technologies, project_name, type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', experience_data)

    # Check if achievements exist
    cursor.execute('SELECT COUNT(*) FROM achievements')
    if cursor.fetchone()[0] == 0:
        achievements_data = [
            (
                'TNWISE 2026',
                'Hackathon',
                'Competed in Precision Agriculture & Farm Automation track, designing innovative AI-driven monitoring concepts.',
                'Hackathon 2026',
                'cpu'
            ),
            (
                'NASA Space Apps Challenge',
                'Global Hackathon',
                'Participated in the prestigious international space and science hackathon solving complex real-world data challenges.',
                'International Event',
                'globe'
            ),
            (
                'HackNext\'25',
                'Hackathon',
                'Collaborative project development and prototyping in a high-paced competitive coding hackathon environment.',
                'Hackathon 2025',
                'zap'
            ),
            (
                'Oblivion\'25',
                'Technical Event',
                'Engaged in technical challenges and software problem-solving sessions at Oblivion\'25.',
                'Technical Challenge',
                'terminal'
            ),
            (
                'CyberNova 26 – Project AETHER',
                'Hackathon',
                'Worked on Project AETHER addressing modern computational and cybersecurity challenges.',
                'Hackathon 2026',
                'shield'
            ),
            (
                'Avanzare Hackathon',
                'Hackathon',
                'Participated in building rapid prototype applications and competing with multidisciplinary student developer teams.',
                'Hackathon Event',
                'code'
            ),
            (
                'Class Executive Member',
                'Leadership & Extracurricular',
                'Active Executive Member contributing to department initiatives, class coordination, and student community management.',
                'Leadership Role',
                'users'
            ),
            (
                'Applications of ChatGPT Bootcamp',
                'Workshop & Mentorship',
                'Led a team of executive members to organize and conduct technical bootcamp sessions focusing on practical applications of ChatGPT and generative AI.',
                'Lead Organizer',
                'book-open'
            ),
            (
                'AI Tools & Cybersecurity Technical Sessions',
                'Technical Seminars',
                'Conducted interactive technical workshops for students regarding ethical cybersecurity principles and modern AI productivity tools.',
                'Session Speaker',
                'shield-check'
            )
        ]
        cursor.executemany('''
            INSERT INTO achievements (title, category, description, badge, icon_key)
            VALUES (?, ?, ?, ?, ?)
        ''', achievements_data)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized and seeded successfully.")
