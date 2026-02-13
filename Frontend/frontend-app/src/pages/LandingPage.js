import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <nav className="landing-navbar">
        <Link to="/" className="landing-navbar-logo">eLibrary</Link>
        <div className="landing-navbar-buttons">
          <Link to="/login" className="landing-navbar-button">Login</Link>
          <Link to="/register" className="landing-navbar-button">Register</Link>
        </div>
      </nav>

      <div className="hero-header">
        <div className="hero-content">
          <h1>Campus eLibrary – Digital Access to Academic Resources</h1>
          <p>Access books, notes, previous year papers, research documents, and course materials stored on the campus NAS system.</p>
          <div className="hero-buttons">
            <Link to="/home" className="hero-button primary-button">Browse Library</Link>
            <Link to="/login" className="hero-button secondary-button">Login / Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;