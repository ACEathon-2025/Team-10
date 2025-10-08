import React from 'react';
// UPDATED: Removed FaTwitter and FaLinkedin
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  // --- CHANGES START HERE ---

  // 1. Set the target email addresses, separated by a comma
  const CONTACT_EMAILS = "nnm23ad036@nmamit.in,nnm23is049@nmamit.in";
  
  // 2. Create the specific URL for Gmail's compose window with multiple recipients
  const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAILS}`;

  // Replace this with your actual GitHub URL
  const GITHUB_URL = "https://github.com/ACEathon-2025/Team-10";

  // --- CHANGES END HERE ---

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          {/* Replace this with your project name */}
          <h3>RupeeRoute</h3>
          <p>Empowering the next generation with financial literacy.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer">
            Contact Us
          </a>
        </div>
        
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons-wrapper">
            {/* UPDATED: Removed Twitter and LinkedIn links */}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 RupeeRoute by Pratham & Dhanush. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;