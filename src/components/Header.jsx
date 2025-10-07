import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

// Accept setCurrentPage as a prop
const Header = ({ toggleAuthPage, setCurrentPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

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

  // Scroll effect for compact header and subtle background
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={isScrolled ? 'header scrolled' : 'header'}>
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
          {user ? (
            <li className="nav-item" ref={profileRef}>
              <button className="user-chip as-button" onClick={() => setIsProfileOpen(!isProfileOpen)} title={user.email}>
                <span className="user-avatar">{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.displayName || user.email}</span>
              </button>
              {isProfileOpen && (
                <div className="profile-menu">
                  <div className="profile-meta">
                    <div className="meta-name">{user.displayName || 'User'}</div>
                    <div className="meta-email">{user.email}</div>
                  </div>
                  <button className="profile-item" onClick={() => { setIsProfileOpen(false); handleNavClick('learn'); }}>Learn</button>
                  <button className="profile-item danger" onClick={() => { setIsProfileOpen(false); onLogout && onLogout(); }}>Log out</button>
                </div>
              )}
            </li>
          ) : (
            <li className="nav-item-cta">
              <button className="cta-button" onClick={toggleAuthPage}>
                Get Started
              </button>
            </li>
          )}
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