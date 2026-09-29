# Sadhana Saravanan – Full-Stack Personal Portfolio

A modern, responsive, full-stack personal portfolio website engineered for **Sadhana Saravanan**, a 2nd-year Computer Science Engineering student at SNS College of Technology, Coimbatore. 

The website is a real working full-stack application: the frontend dynamically retrieves all portfolio information (projects, skills, internships, milestones) through a **Flask REST API**, and stores interactive contact inquiries in an **SQLite** relational database.

---

## 🚀 Key Features

- **Full-Stack REST Architecture:** React dynamically fetches portfolio datasets from the Python Flask backend with live health status monitoring.
- **SQLite Database Persistence:** Inquiries submitted through the contact form are validated and written to SQLite `contact_messages`.
- **Theme Switching:** Dark and Light mode toggle with state persistence in `localStorage`.
- **Developer-Themed Aesthetic:** Glassmorphism cards, glowing status badges, interactive mock IDE code snippets, and subtle micro-animations.
- **Categorized Skills Arsenal:** Interactive category filter tabs and instant live search across programming languages, web stacks, database engines, and AI/CV toolkits.
- **Projects Showcase & Architecture Modals:** In-depth technical cards for *EduTrack*, *AgriSense AI*, and *Burn-Ex* with full tech pill badges, highlights, and modal previews.
- **Internship & Hackathon Timeline:** Chronological timeline showcasing the ADHOC SOFTWARES full-stack internship and 6+ competitive hackathons (TNWISE 2026, NASA Space Apps, etc.).
- **Printable Resume Preview:** Embedded resume preview modal ready for immediate browser print-to-PDF export.
- **100% Responsive:** Optimized across mobile smartphones, tablets, laptops, and ultra-wide desktop monitors.
- **Input Validation & Safety:** Secure backend and client-side sanitization and regex validation.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS Design System, Lucide React |
| **Backend** | Python 3, Flask 3.0, Flask-CORS |
| **Database** | SQLite 3 |
| **Tooling** | Git, GitHub, VS Code |

---

## 📂 Project Structure

```text
portfolio/
├── backend/
│   ├── app.py              # Flask REST API application & route definitions
│   ├── database.py         # SQLite connection setup, schema & seed data
│   ├── models.py           # Database query methods & data access objects
│   ├── requirements.txt    # Python backend dependencies
│   └── portfolio.db        # SQLite database file (auto-generated on run)
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg     # Modern brand developer SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Sticky glassmorphic navbar with API health indicator
│   │   │   ├── Hero.jsx          # Hero section with interactive developer IDE card
│   │   │   ├── About.jsx         # Academic background and core engineering pillars
│   │   │   ├── Skills.jsx        # Categorized skills grid with search and tabs
│   │   │   ├── Projects.jsx      # Dynamic project cards and detail modal
│   │   │   ├── Experience.jsx    # ADHOC SOFTWARES internship showcase
│   │   │   ├── Achievements.jsx  # Hackathons, competitions, and leadership
│   │   │   ├── Contact.jsx       # Contact form with backend persistence
│   │   │   ├── Footer.jsx        # Footer with profile links and college details
│   │   │   ├── Icons.jsx         # Brand SVG icon components
│   │   │   └── ResumeModal.jsx   # Printable student resume modal
│   │   ├── context/
│   │   │   └── ThemeContext.jsx  # Dark/Light theme state provider
│   │   ├── services/
│   │   │   └── api.js            # Frontend REST API client
│   │   ├── styles/
│   │   │   └── index.css         # Complete CSS custom property design system
│   │   ├── App.jsx               # Root React component
│   │   └── main.jsx              # React DOM entry point
│   ├── index.html                # Semantic HTML5 template with Google fonts
│   ├── package.json              # Node.js dependencies and build scripts
│   └── vite.config.js            # Vite bundler & API proxy configuration
│
├── .gitignore                    # Git ignore configuration
└── README.md                     # Comprehensive documentation
```

---

## ⚡ Quickstart Guide

### Prerequisites
- **Python 3.9+**
- **Node.js 18+** & **npm**

---

### Step 1: Start the Flask Backend Server

Open a terminal in the project root directory:

```bash
# Navigate to the backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Run the Flask API server
python app.py
```

*The Flask REST API will start on **`http://127.0.0.1:5000`** and will automatically initialize and seed `portfolio.db`.*

---

### Step 2: Start the React Frontend

Open a second terminal:

```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```

*The React frontend will be accessible at **`http://localhost:5173`**.*

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and database connectivity check |
| `GET` | `/api/profile` | Student biographical, college, and headline details |
| `GET` | `/api/projects` | List of all engineering projects and tech stacks |
| `GET` | `/api/skills` | Flat list and categorized technical skills dataset |
| `GET` | `/api/experience` | Internship details and project deliverables |
| `GET` | `/api/achievements`| Hackathons, technical competitions, and leadership |
| `POST` | `/api/contact` | Submits and stores a new message in the SQLite database |
| `GET` | `/api/contact/messages` | Lists submitted contact inquiries for admin review |

#### Example Contact Payload:
```json
{
  "name": "Sarah Connor",
  "email": "sarah@example.com",
  "subject": "Summer Internship Opportunity",
  "message": "Hi Sadhana, we came across your portfolio and would like to invite you for an interview."
}
```

---

## 🖼 Screenshots & UI Demo

> *Add screenshots of the live dark mode and light mode interfaces below:*

| Dark Mode (Hero & Skills) | Light Mode (Projects & Contact) |
| :---: | :---: |
| `[Screenshot Placeholder: Dark Theme Hero & IDE]` | `[Screenshot Placeholder: Light Theme Projects & Form]` |

---

## ⚙️ Customization & Personal Information

To update personal links when ready:
1. **Database & API Defaults:** Update records in `backend/database.py` (e.g. GitHub URL, LinkedIn URL).
2. **Re-initialize Database:** Run `python backend/database.py` to re-seed tables.
3. **Environment API URL (Production):** Set `VITE_API_URL` in `frontend/.env.production` pointing to your deployed backend.

---

## 🌟 Future Improvements

- Add OAuth/JWT authentication for an admin dashboard to view submitted contact messages.
- Add live video / interactive demonstration widgets for the computer vision pose detection project.
- Integrate automated email alerts (via SendGrid/Flask-Mail) whenever a contact message is submitted.

---

## 📄 License & Attribution

Designed and engineered for **Sadhana Saravanan**, SNS College of Technology, Coimbatore.
