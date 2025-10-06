import React from 'react';

const Register = ({ toggleView }) => {

  const handleRegister = (event) => {
    event.preventDefault();
    // --- YOUR FIREBASE REGISTER LOGIC GOES HERE ---
    // Example: createUserWithEmailAndPassword(auth, email, password)
    alert('Register form submitted!');
  };

  return (
    <>
      <h2 className="auth-title">Create Your Account</h2>
      <p className="auth-subtitle">Start managing your finances like a pro.</p>
      <form className="auth-form" onSubmit={handleRegister}>
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="password" name="password" placeholder="Create Password" required />
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <span onClick={toggleView}>Log In</span>
      </p>
    </>
  );
};

export default Register;