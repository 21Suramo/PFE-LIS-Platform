// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="h-screen overflow-hidden">
      {" "}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
