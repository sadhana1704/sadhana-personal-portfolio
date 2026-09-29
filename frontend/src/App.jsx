import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioAPI from './services/api';

function AppContent() {
  const [profileData, setProfileData] = useState({
    name: 'Sadhana Saravanan',
    headline: 'Computer Science Engineering Student',
    tagline: 'Passionate about building practical solutions using AI, full-stack development and emerging technologies.',
    course: 'Bachelor of Engineering – Computer Science Engineering',
    year: '2nd Year CSE',
    college: 'SNS College of Technology',
    location: 'Coimbatore, Tamil Nadu, India',
    github_placeholder: 'Add GitHub URL',
    linkedin_placeholder: 'Add LinkedIn URL',
    email_placeholder: 'Add Email Address'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await PortfolioAPI.getProfile();
        if (response && response.data) {
          setProfileData(response.data);
        }
      } catch (err) {
        console.warn('API profile fetch notice:', err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="app-layout">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero profileData={profileData} />
        <About profileData={profileData} />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact profileData={profileData} />
      </main>

      {/* Footer */}
      <Footer profileData={profileData} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
