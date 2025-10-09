import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import LearnPage from './components/LearnPage'; // Import the new page
import NewsUpdates from './components/NewsUpdates'; // Import NewsUpdates component
import EducationLoans from './components/modules/EducationLoans';
import CIBILScore from './components/modules/CIBILScore';
import StartSIP from './components/modules/StartSIP';
import StockBasics from './components/modules/StockBasics';
import RetirementPlanning from './components/modules/RetirementPlanning';
import PageTransition from './components/PageTransition';

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'learn' or module pages
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageTransitioning, setPageTransitioning] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleAuthPage = () => {
    setShowAuthPage(!showAuthPage);
  };

  const handleLogout = async () => {
    try {
      setPageTransitioning(true);
      // Add a small delay for smooth transition
      setTimeout(async () => {
        await auth.signOut();
        setCurrentPage('home');
        setPageTransitioning(false);
      }, 300);
    } catch (error) {
      console.error('Logout error:', error);
      setPageTransitioning(false);
    }
  };

  // Protected navigation function with transition effect
  const handleNavigation = (page) => {
    if (page === 'learn' && !user) {
      // If trying to access learn page without being logged in, show auth page
      setShowAuthPage(true);
      return;
    }

    setPageTransitioning(true);
    // Add a small delay for smooth page transition
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransitioning(false);
    }, 200);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return <LearnPage setCurrentPage={setCurrentPage} />;
      case 'news':
        return <NewsUpdates />;
      case 'education-loans':
        return <EducationLoans setCurrentPage={setCurrentPage} />;
      case 'cibil-score':
        return <CIBILScore setCurrentPage={setCurrentPage} />;
      case 'start-sip':
        return <StartSIP setCurrentPage={setCurrentPage} />;
      case 'stock-basics':
        return <StockBasics setCurrentPage={setCurrentPage} />;
      case 'retirement-planning':
        return <RetirementPlanning setCurrentPage={setCurrentPage} />;
      default:
        return <Hero 
          toggleAuthPage={toggleAuthPage} 
          user={user}
          onNavigateToLearn={handleNavigation}
        />;
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : showAuthPage ? (
        <AuthPage toggleAuthPage={toggleAuthPage} />
      ) : (
        <>
          <Header 
            toggleAuthPage={toggleAuthPage} 
            setCurrentPage={handleNavigation} 
            user={user}
            onLogout={handleLogout}
          />
          <main>
            <PageTransition pageKey={currentPage}>
              {renderPage()}
            </PageTransition>
          </main>
          <Footer />

          {/* Page Transition Overlay */}
          {pageTransitioning && (
            <div className="page-transition-overlay">
              <div className="transition-spinner"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;