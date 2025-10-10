import React, { useEffect, useState, useRef } from 'react';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = ({ setCurrentPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

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

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavClick = (page) => {
    setCurrentPage(page);
    if (isOpen) toggleMenu();
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : false;
    setIsDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const nextIsDark = !prevMode;
      if (nextIsDark) {
        document.body.classList.add('dark-mode');
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        window.localStorage.setItem('theme', 'light');
      }
      return nextIsDark;
    });
  };

  // Close profile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          {/* Standard Nav Links */}
          <li><button onClick={() => handleNavClick('learn')} className="nav-link-button">Learn</button></li>
          <li><button onClick={() => handleNavClick('news')} className="nav-link-button">News</button></li>
          <li><button onClick={() => handleNavClick('plan')} className="nav-link-button">Plan</button></li>

          {/* User Profile Section */}
          <li className="nav-item profile-item" ref={profileMenuRef}>
            <button className="profile-trigger" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <div className="avatar-circle-gradient">{getUserInitials(user)}</div>
              <span className="profile-name">{user.displayName || user.email.split('@')[0]}</span>
              <svg className={`chevron-icon ${isProfileMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
              
            {isProfileMenuOpen && (
              <div className="profile-menu-wrapper">
                <ul className="profile-menu">
                  <li className="profile-menu-item" onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}>
                    <FaSignOutAlt className="menu-icon" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Theme Toggle */}
          <li className="nav-item nav-item-theme">
            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
