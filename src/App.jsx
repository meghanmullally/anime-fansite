import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DragonBall from './components/DragonBall/DragonBall';
import SailorMoon from './components/SailorMoon/SailorMoon';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dragon-ball">Dragon Ball</a></li>
          <li><a href="/sailor-moon">Sailor Moon</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to My 90s Anime Fansite</h1>} />
        <Route path="/dragon-ball" element={<DragonBall />} />
        <Route path="/sailor-moon" element={<SailorMoon />} />
      </Routes>
    </Router>
  );
};

export default App;