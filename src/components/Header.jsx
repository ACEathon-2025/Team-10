import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './Button';
import './Header.css';

// Accept togglePlanPage prop
const Header = ({ toggleAuthPage, togglePlanPage, setCurrentPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Helper function to get user initials
  const getUserInitials = (user) => {
    if (!user) return 'U';
    const displayName = user.displayName || user.email || 'User';
    const nameParts = displayName.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    } else {
      return displayName.substring(0, 2).toUpperCase();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to handle navigation clicks
  const handleNavClick = (page) => {
    setCurrentPage(page);
    if (isOpen) {
      toggleMenu(); // Close mobile menu on click
    }
  };

  // Initialize theme from localStorage and apply body class
  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : false;
    setIsDarkMode(shouldUseDark);
    const bodyEl = document.body;
    if (shouldUseDark) {
      bodyEl.classList.add('dark-mode');
    } else {
      bodyEl.classList.remove('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDarkMode;
    setIsDarkMode(nextIsDark);
    const bodyEl = document.body;
    if (nextIsDark) {
      bodyEl.classList.add('dark-mode');
      window.localStorage.setItem('theme', 'dark');
    } else {
      bodyEl.classList.remove('dark-mode');
      window.localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <button className="nav-logo-button" onClick={() => handleNavClick('home')}>
          <span className="logo-rupee">₹</span>
          <span className="logo-text">RupeeRoute</span>
        </button>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Button
              variant="ghost"
              size="small"
              onClick={() => handleNavClick('learn')}
              className="nav-link-button"
            >
              Learn
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant="ghost"
              size="small"
              onClick={() => handleNavClick('news')}
              className="nav-link-button"
            >
              News
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant="ghost"
              size="small"
              onClick={() => alert('Practice page coming soon!')}
              className="nav-link-button"
            >
              Practice
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant="ghost"
              size="small"
              onClick={togglePlanPage}
              className="nav-link-button"
            >
              Plan
            </Button>
          </li>
          
          {/* Simplified Auth Section */}
          {!user ? (
            <li className="nav-item-cta">
              <Button
                variant="primary"
                size="small"
                onClick={toggleAuthPage}
                className="cta-button"
              >
                Get Started
              </Button>
            </li>
          ) : (
            <>
              <li className="nav-item profile-item">
                <div className="avatar-circle-gradient">
                  {getUserInitials(user)}
                </div>
                <span className="profile-name">{user.displayName || user.email.split('@')[0]}</span>
              </li>
              <li className="nav-item">
                <Button variant="ghost" size="small" onClick={onLogout} className="nav-link-button">
                  Logout
                </Button>
              </li>
            </>
          )}

          <li className="nav-item nav-item-theme">
            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

