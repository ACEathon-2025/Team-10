import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { FaGoogle } from 'react-icons/fa';

const Register = ({ toggleView }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: fullName
      });
      
      console.log('User registered:', user.email);
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration Error:', error.code, error.message);
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
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please log in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/popup-blocked':
        return 'Popup was blocked. Please allow popups for this site.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <>
      <h2 className="auth-title">Create Your Account</h2>
      <p className="auth-subtitle">Start managing your finances like a pro.</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form className="auth-form" onSubmit={handleRegister}>
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required 
          disabled={loading}
        />
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
          placeholder="Create Password (min. 6 characters)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          minLength={6}
          disabled={loading}
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
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
        Sign Up with Google
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <span onClick={toggleView}>Log In</span>
      </p>
    </>
  );
};

export default Register;