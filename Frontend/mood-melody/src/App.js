import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicSection from './components/MusicSection';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <MusicSection />
    </div>
  );
};

export default App;
