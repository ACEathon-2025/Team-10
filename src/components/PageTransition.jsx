import React, { useEffect, useState } from 'react';
import './PageTransition.css';

const PageTransition = ({ children, pageKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset visibility when page changes
    setIsVisible(false);

    // Small delay before showing content for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [pageKey]);

  return (
    <div className={`page-transition-wrapper ${isVisible ? 'visible' : ''}`}>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;