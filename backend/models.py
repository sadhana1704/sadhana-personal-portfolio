import sqlite3
from datetime import datetime
from database import get_db_connection

class PortfolioModel:
    @staticmethod
    def get_profile():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM profile LIMIT 1')
        row = cursor.fetchone()
        conn.close()
        if row:
            return dict(row)
        return None

    @staticmethod
    def get_all_projects():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM projects ORDER BY id ASC')
        rows = cursor.fetchall()
        conn.close()
        projects = []
        for r in rows:
            p = dict(r)
            # Parse technologies into list
            p['technologies_list'] = [t.strip() for t in p['technologies'].split(',') if t.strip()]
            projects.append(p)
        return projects

    @staticmethod
    def get_all_skills():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM skills ORDER BY id ASC')
        rows = cursor.fetchall()
        conn.close()
        
        # Format as flat list and grouped by category
        skills = [dict(r) for r in rows]
        categories = {}
        for s in skills:
            cat = s['category']
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(s)
            
        return {
            "all": skills,
            "by_category": categories
        }

    @staticmethod
    def get_all_experience():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM experience ORDER BY id ASC')
        rows = cursor.fetchall()
        conn.close()
        experiences = []
        for r in rows:
            exp = dict(r)
            exp['technologies_list'] = [t.strip() for t in exp['technologies'].split(',') if t.strip()]
            experiences.append(exp)
        return experiences

    @staticmethod
    def get_all_achievements():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM achievements ORDER BY id ASC')
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]

    @staticmethod
    def create_contact_message(name, email, subject, message):
        conn = get_db_connection()
        cursor = conn.cursor()
        created_at = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('''
            INSERT INTO contact_messages (name, email, subject, message, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (name.strip(), email.strip(), subject.strip(), message.strip(), created_at))
        message_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return {
            "id": message_id,
            "name": name.strip(),
            "email": email.strip(),
            "subject": subject.strip(),
            "created_at": created_at
        }

    @staticmethod
    def get_all_contact_messages():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM contact_messages ORDER BY id DESC')
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]
