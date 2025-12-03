import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // optional, create styles or Tailwind

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
