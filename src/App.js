import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import LearnPage from './components/LearnPage'; // Import the new page
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'learn'
  const [currentUser, setCurrentUser] = useState(null);

  const toggleAuthPage = () => {
    setShowAuthPage(!showAuthPage);
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
      return <LearnPage setCurrentPage={setCurrentPage} />;
    }
    // Default to home page
    return <Hero toggleAuthPage={toggleAuthPage} />;
  };

  return (
    <div className="App">
      {showAuthPage ? (
        <AuthPage toggleAuthPage={toggleAuthPage} />
      ) : (
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