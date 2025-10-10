import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { FaGoogle } from 'react-icons/fa';

const Login = ({ toggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user.email);
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login Error:', error.code, error.message);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed in with Google:', user.displayName, user.email);
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google Sign-In Error:', error.code, error.message);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else {
        setError(getErrorMessage(error.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/popup-blocked':
        return 'Popup was blocked. Please allow popups for this site.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <>
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Log in to continue your financial journey.</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form className="auth-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={loading}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          disabled={loading}
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button 
        type="button" 
        className="google-signin-button" 
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <FaGoogle className="google-icon" />
        Sign In with Google
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <span onClick={toggleView}>Register Now</span>
      </p>
    </>
  );
};

export default Login;