import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import { Home, SearchOptions } from "./pages";

const App = () => {
  return (
    <div className="App">
      <React.StrictMode>
        <div className="gradient_bg">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/search-options"
                element={<SearchOptions filter={1} />}
              />
              <Route path="/profile/:username" />
            </Routes>
          </Router>
        </div>
      </React.StrictMode>
    </div>
  );
};

export default App;
