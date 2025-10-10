import React, { useState } from 'react';
import './Button.css';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e) => {
    if (disabled || loading) return;

    setIsClicked(true);

    // Add a small delay for visual feedback
    setTimeout(() => setIsClicked(false), 150);

    if (onClick) {
      // If onClick returns a promise, handle loading state
      const result = onClick(e);
      if (result && typeof result.then === 'function') {
        // Handle async operations
        try {
          await result;
        } catch (error) {
          console.error('Button click error:', error);
        }
      }
    }
  };

  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    isClicked && 'btn-clicked',
    loading && 'btn-loading',
    disabled && 'btn-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;