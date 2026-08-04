import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { migrateLegacyHash } from "./lib/router.js";
import "./index.css";

// anything shared or bookmarked as #about / #case-study/x keeps working
migrateLegacyHash();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* reducedMotion="user" makes every framer-motion transform animation
        respect the visitor's OS "reduce motion" setting, while still allowing
        opacity fades — so nothing ends up stuck invisible. */}
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MotionConfig>
  </React.StrictMode>
);
