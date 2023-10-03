import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SearchOptions, NewPosts, Profile, CarPost } from "./pages";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search-options"
            element={<SearchOptions filter={1} />}
          />
          <Route path="/add-post" element={<NewPosts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:postId" element={<CarPost />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
