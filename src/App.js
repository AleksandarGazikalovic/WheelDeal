import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home, SearchOptions} from './pages';

const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-options" element={<SearchOptions />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
