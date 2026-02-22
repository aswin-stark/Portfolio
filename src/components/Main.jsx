import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NeonBackground from "./components/NeonBackground";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Global Neon Background */}
      <NeonBackground />

      {/* App Content */}
      <div className="relative z-10">
        <App />
      </div>
    </div>
  </React.StrictMode>
);