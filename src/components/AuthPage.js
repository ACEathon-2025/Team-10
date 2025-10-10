import React, { useState } from 'react';
import './AuthPage.css'; // We will update this CSS file next
import Login from './Login'; // Import the new Login component
import Register from './Register'; // Import the new Register component

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  // This function will be passed to both Login and Register components
  // to allow them to switch the view.
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-page-overlay modal-overlay">
      <div className="auth-container page-content">
        {/* Left Side: The attractive image and promo text */}
        <div className="auth-promo-panel">
          <img 
            src="/assets/finance_illustration.svg" 
            alt="Financial Planning" 
            className="promo-image"
          />
          <h2 className="promo-title">Your Journey to Financial Freedom Starts Here.</h2>
          <p className="promo-subtitle">Manage debt, invest wisely, and build a secure future with RupeeRoute.</p>
        </div>

        {/* Right Side: The form area */}
        <div className="auth-form-panel">
          {isLoginView ? (
            <Login toggleView={toggleView} />
          ) : (
            <Register toggleView={toggleView} />
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;