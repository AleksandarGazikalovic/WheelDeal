import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#e1e1e1" highlightColor="#f2f2f2">
      <App />
    </SkeletonTheme>
  </Provider>
);
