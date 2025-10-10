import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import LearnPage from './components/LearnPage';
import NewsUpdates from './components/NewsUpdates';
import PageTransition from './components/PageTransition';
import PlanPage from './components/PlanPage';

// Import Plan Detail Pages
import FiftyThirtyTwentyRule from './components/modules/FiftyThirtyTwentyRule';
import DebtSnowball from './components/modules/DebtSnowball';
import ZeroBasedBudgeting from './components/modules/ZeroBasedBudgeting';

// Import All 8 Learn Module Pages
import WhatIsBudgeting from './components/modules/WhatIsBudgeting';
import SavingsAccounts from './components/modules/SavingsAccounts';
import EmergencyFunds from './components/modules/EmergencyFunds';
import CIBILScore from './components/modules/CIBILScore';
import StartSIP from './components/modules/StartSIP';
import StockBasics from './components/modules/StockBasics';
import RetirementPlanning from './components/modules/RetirementPlanning';
import EducationLoans from './components/modules/EducationLoans';

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageTransitioning, setPageTransitioning] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Scroll to top when showing auth page
  useEffect(() => {
    if (showAuthPage) {
      window.scrollTo(0, 0);
    }
  }, [showAuthPage]);

  const toggleAuthPage = () => setShowAuthPage(!showAuthPage);

  const handleLogout = async () => {
    try {
      setPageTransitioning(true);
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

  const handleNavigation = (page) => {
    setPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransitioning(false);
    }, 200);
  };

  const handleReturnToPlanPage = () => {
    setPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage('plan');
      setPageTransitioning(false);
    }, 200);
  };

  const renderPage = () => {
    const backToLearn = () => handleNavigation('learn');

    switch (currentPage) {
      // Main Pages
      case 'learn':
        return <LearnPage setCurrentPage={handleNavigation} />;
      case 'news':
        return <NewsUpdates />;
      case 'plan':
        return <PlanPage setCurrentPage={handleNavigation} />;

      // Plan Detail Pages
      case 'plan-503020':
        return <FiftyThirtyTwentyRule onBack={handleReturnToPlanPage} />;
      case 'plan-debt-snowball':
        return <DebtSnowball onBack={handleReturnToPlanPage} />;
      case 'plan-zero-based-budgeting':
        return <ZeroBasedBudgeting onBack={handleReturnToPlanPage} />;
        
      // Learn Module Pages
      case 'what-is-budgeting':
        return <WhatIsBudgeting onBack={backToLearn} />;
      case 'savings-accounts':
        return <SavingsAccounts onBack={backToLearn} />;
      case 'emergency-funds':
        return <EmergencyFunds onBack={backToLearn} />;
      case 'cibil-score':
        return <CIBILScore onBack={backToLearn} />;
      case 'start-sip':
        return <StartSIP onBack={backToLearn} />;
      case 'stock-basics':
        return <StockBasics onBack={backToLearn} />;
      case 'retirement-planning':
        return <RetirementPlanning onBack={backToLearn} />;
      case 'education-loans':
        return <EducationLoans onBack={backToLearn} />;

      // Default Page (Home)
      default:
        return <Hero
          user={user}
          onNavigateToLearn={handleNavigation}
          toggleAuthPage={toggleAuthPage}
          setCurrentPage={handleNavigation}
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
