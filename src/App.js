import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);

  const toggleAuthPage = () => {
    setShowAuthPage(!showAuthPage);
  };

  return (
    <div className="App">
      {showAuthPage ? (
        <AuthPage toggleAuthPage={toggleAuthPage} />
      ) : (
        <>
          <Header toggleAuthPage={toggleAuthPage} />
          <main>
            <Hero toggleAuthPage={toggleAuthPage} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;