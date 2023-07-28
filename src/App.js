import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home, SearchOptions} from './pages';

const App = () => {
  return (
    <div className="App">
    <React.StrictMode>
      <div className="gradient_bg">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-options" element={<SearchOptions />} />
          </Routes>
        </Router>
      </div>
      </React.StrictMode>
    </div>
  );
};

export default App;
