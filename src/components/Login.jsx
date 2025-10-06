import React from 'react';

const Login = ({ toggleView }) => {

  const handleLogin = (event) => {
    event.preventDefault();
    // --- YOUR FIREBASE LOGIN LOGIC GOES HERE ---
    // Example: signInWithEmailAndPassword(auth, email, password)
    alert('Login form submitted!');
  };

  return (
    <>
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Log in to continue your financial journey.</p>
      <form className="auth-form" onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" className="auth-button">Log In</button>
      </form>
      <p className="auth-switch">
        Don't have an account?{' '}
        <span onClick={toggleView}>Register Now</span>
      </p>
    </>
  );
};

export default Login;