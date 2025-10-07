import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

// Accept setCurrentPage as a prop
const Header = ({ toggleAuthPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        {/* Updated logo to be a button that navigates home */}
        <button className="nav-logo-button" onClick={() => handleNavClick('home')}>
          RupeeRoute
        </button>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            {/* Updated 'Learn' to be a button that navigates to the learn page */}
            <button className="nav-link-button" onClick={() => handleNavClick('learn')}>
              Learn
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link-button" onClick={() => alert('Practice page coming soon!')}>
              Practice
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link-button" onClick={() => alert('Plan page coming soon!')}>
              Plan
            </button>
          </li>
          <li className="nav-item-cta">
            <button className="cta-button" onClick={toggleAuthPage}>
              Get Started
            </button>
          </li>
          <li className="nav-item nav-item-theme">
            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                // Sun icon (light mode)
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                // Crescent moon with two stars (dark mode)
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
                  <path d="M5.5 6.5l1.2.4-.4-1.2" />
                  <path d="M18.2 6.8l.8.3-.3-.8" />
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