import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ toggleAuthPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="nav-logo">
          FinNovate
        </a>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="#learn" className="nav-link" onClick={toggleMenu}>
              Learn
            </a>
          </li>
          <li className="nav-item">
            <a href="#practice" className="nav-link" onClick={toggleMenu}>
              Practice
            </a>
          </li>
          <li className="nav-item">
            <a href="#plan" className="nav-link" onClick={toggleMenu}>
              Plan
            </a>
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