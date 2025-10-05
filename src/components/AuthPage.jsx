import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AuthPage.css';

const AuthPage = ({ toggleAuthPage }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const switchToRegister = () => {
    setIsLoginView(false);
  };

  const switchToLogin = () => {
    setIsLoginView(true);
  };

  return (
    <div className="auth-page-overlay">
      <div className="auth-container">
        <button className="close-button" onClick={toggleAuthPage}>
          <FaTimes />
        </button>

        {isLoginView ? (
          <>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Log in to continue your financial journey.</p>
            <form className="auth-form">
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="auth-button">Log In</button>
            </form>
            <p className="auth-switch">
              Don't have an account?{' '}
              <span onClick={switchToRegister}>Register Now</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create Your Account</h2>
            <p className="auth-subtitle">Start managing your finances like a pro.</p>
            <form className="auth-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Create Password" required />
              <button type="submit" className="auth-button">Register</button>
            </form>
            <p className="auth-switch">
              Already have an account?{' '}
              <span onClick={switchToLogin}>Log In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;