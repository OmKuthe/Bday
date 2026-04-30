import { useState, useEffect } from 'react';
import StartingPage from './pages/StartingPage';
import PasswordPage from './pages/PasswordPage';
import Emotions from './pages/Emotions';
import Journey from './pages/Journey';
import Reasons from './pages/Reasons';
import MemoryJar from './pages/MemoryJar';
import ThenVsNow from './pages/ThenVsNow';
import Letter from './pages/Letter';

function App() {
  const [currentPage, setCurrentPage] = useState('starting');

  const handleNavigate = (page) => {
    // Force scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Change page
    setCurrentPage(page);
    
    // Double-check scroll after page renders
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);
  };

  // Also reset scroll when currentPage changes (as a backup)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [currentPage]);

  const handleSuccess = () => {
    handleNavigate('emotions');
  };

  const handleJourney = () => {
    handleNavigate('journey');
  };

  const handleGames = () => {
    handleNavigate('games');
  };

  const handleReasons = () => {
    handleNavigate('reasons');
  };

  const handleMemoryJar = () => {
    handleNavigate('memoryjar');
  };

  const handleThenVsNow = () => {
    handleNavigate('thenvsnow');
  };

  const handleLetter = () => {
    handleNavigate('letter');
  };


  return (
    <div className="App">
      {currentPage === 'starting' && (
        <StartingPage onNavigate={handleNavigate} />
      )}
      {currentPage === 'password' && (
        <PasswordPage onNavigate={handleNavigate} onSuccess={handleSuccess} />
      )}
      {currentPage === 'emotions' && (
        <Emotions 
          onNavigate={handleNavigate} 
          onJourney={handleJourney} 
        />
      )}
      {currentPage === 'journey' && (
        <Journey 
          onNavigate={handleNavigate} 
          onGames={handleReasons}
        />
      )}

      {currentPage === 'reasons' && (
        <Reasons 
          onNavigate={handleNavigate} 
          onMemoryJar={handleMemoryJar}
        />
      )}
      {currentPage === 'memoryjar' && (
        <MemoryJar 
          onNavigate={handleNavigate} 
          onThenVsNow={handleThenVsNow}
        />
      )}
      {currentPage === 'thenvsnow' && (
        <ThenVsNow 
          onNavigate={handleNavigate} 
          onLetter={handleLetter}
        />
      )}
      {currentPage === 'letter' && (
        <Letter 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}

export default App;