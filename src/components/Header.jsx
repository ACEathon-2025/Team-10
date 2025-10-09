import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './Button';
import './Header.css';

// Accept setCurrentPage as a prop
const Header = ({ toggleAuthPage, setCurrentPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Helper function to get user initials
  const getUserInitials = (user) => {
    if (!user) return 'U';
    
    const displayName = user.displayName || user.email || 'User';
    
    // Split name by spaces
    const nameParts = displayName.trim().split(/\s+/);
    
    if (nameParts.length >= 2) {
      // If multiple words, take first letter of first and second word
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    } else {
      // If single word or email, take first two letters
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

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <header className="header">
      <nav className="navbar">
        {/* Updated logo to be a button that navigates home */}
        <button className="nav-logo-button logo-animated" onClick={() => handleNavClick('home')}>
          <span className="logo-rupee">₹</span>
          <span className="logo-text">RupeeRoute</span>
        </button>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            {/* Updated 'Learn' to be a button that navigates to the learn page */}
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
              onClick={() => alert('Plan page coming soon!')}
              className="nav-link-button"
            >
              Plan
            </Button>
          </li>
          {!user && (
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
          )}
          {user && (
            <li className="nav-item profile-item" ref={profileMenuRef}>
              <button 
                className="profile-pill profile-trigger" 
                title={user.email}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
              >
                <div className="avatar-circle-gradient">
                  {getUserInitials(user)}
                </div>
                <span className="profile-name">{user.displayName || user.email}</span>
                <svg className={`chevron-icon ${isProfileMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isProfileMenuOpen && (
                <div className="profile-menu-wrapper">
                  <ul className="profile-menu" role="menu">
                    <li role="menuitem" className="profile-menu-item logout" onClick={() => { setIsProfileMenuOpen(false); onLogout(); }}>
                      <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
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