import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import LearnPage from './components/LearnPage'; // Import the new page

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'learn'

  const toggleAuthPage = () => {
    setShowAuthPage(!showAuthPage);
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
          <Header toggleAuthPage={toggleAuthPage} setCurrentPage={setCurrentPage} />
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