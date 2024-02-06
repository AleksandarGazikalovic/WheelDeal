import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SkeletonTheme } from "react-loading-skeleton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <SkeletonTheme baseColor="#e1e1e1" highlightColor="#f2f2f2">
        <App />
      </SkeletonTheme>
    </Provider>
  </GoogleOAuthProvider>
);
