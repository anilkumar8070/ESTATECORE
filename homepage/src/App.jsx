import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <HomePage key="home" />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
