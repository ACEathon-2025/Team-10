import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

// Accept setCurrentPage as a prop
const Header = ({ toggleAuthPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        </ul>
      </nav>
    </header>
  );
};

export default Header;