// src/components/common/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-base dark:bg-base-dark text-[var(--color-primary-dark)]">
      {/* Header (fixe) */}
      <header className="shrink-0">
        <Header />
      </header>

      {/* Main (zone scrollable uniquement si besoin) */}
      <main className="overflow-hidden h-full relative">
        <div className="h-full w-full overflow-auto">{children}</div>
        </main>
        {/* Footer (fixe) */}
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
    