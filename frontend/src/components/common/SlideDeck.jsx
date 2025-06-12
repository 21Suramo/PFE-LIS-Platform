import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 bg-[var(--color-primary-dark)] text-white shadow-lg flex flex-col py-6 px-4 z-40"
      style={{ minWidth: 200 }}>
      {/* Logo ou titre */}
      <div className="mb-8 flex items-center gap-2">
        <span className="text-lg font-bold tracking-wide">LIS Platform</span>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className="hover:bg-[var(--color-lis-blue)] px-3 py-2 rounded transition">
          Accueil
        </Link>
        <Link
          to="/teams"
          className="hover:bg-[var(--color-lis-blue)] px-3 py-2 rounded transition">
          Équipes
        </Link>
        <Link
          to="/articles"
          className="hover:bg-[var(--color-lis-blue)] px-3 py-2 rounded transition">
          Articles
        </Link>
        <Link
          to="/news"
          className="hover:bg-[var(--color-lis-blue)] px-3 py-2 rounded transition">
          Actualités
        </Link>
        <Link
          to="/events"
          className="hover:bg-[var(--color-lis-blue)] px-3 py-2 rounded transition">
          Événements
        </Link>
        {/* Ajoute d’autres liens au besoin */}
      </nav>
      <div className="mt-auto text-xs opacity-70 pt-10">
        &copy; 2025 LIS – Université Hassan II
      </div>
    </aside>
  );
}
