import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import LearnPage from './components/LearnPage'; // Import the new page
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import './components/PageTransition.css';

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [isAuthPageVisible, setIsAuthPageVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'learn'
  const [currentUser, setCurrentUser] = useState(null);

  const toggleAuthPage = () => {
    if (!showAuthPage) {
      // Opening auth page
      setShowAuthPage(true);
      // Small delay to allow mount, then trigger animation
      setTimeout(() => setIsAuthPageVisible(true), 10);
    } else {
      // Closing auth page
      setIsAuthPageVisible(false);
      // Wait for animation to complete before unmounting
      setTimeout(() => setShowAuthPage(false), 300);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const renderPage = () => {
    if (currentPage === 'learn') {
      return (
        <div className="page-transition-wrapper">
          <LearnPage setCurrentPage={setCurrentPage} />
        </div>
      );
    }
    // Default to home page
    return (
      <div className="page-transition-wrapper">
        <Hero toggleAuthPage={toggleAuthPage} />
      </div>
    );
  };

  return (
    <div className="App">
      {showAuthPage && (
        <div className={`auth-page-transition ${isAuthPageVisible ? 'visible' : ''}`}>
          <AuthPage toggleAuthPage={toggleAuthPage} />
        </div>
      )}
      {!showAuthPage && (
        <>
          <Header 
            toggleAuthPage={toggleAuthPage} 
            setCurrentPage={setCurrentPage}
            user={currentUser}
            onLogout={handleLogout}
          />
          <main>
            {renderPage()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;