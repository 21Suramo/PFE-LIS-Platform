import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    location.pathname.startsWith("/admin") // ⬅️ open by default on admin
  );

  // Optional: close sidebar on route change (except admin)
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
