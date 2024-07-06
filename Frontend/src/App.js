import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateMusicPage from './components/CreateMusicPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-music" element={<CreateMusicPage />} />
      </Routes>
    </Router>
  );
};

export default App;
