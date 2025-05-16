// src/components/common/Sidebar.jsx
import React from "react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`
      fixed inset-0 z-50 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300
    `}>
      <div className="w-64 h-full bg-background shadow-lg p-4">
        <button
          aria-label="Fermer le menu"
          onClick={onClose}
          className="mb-4 text-primary-dark hover:text-lis-blue">
          ✕ Fermer
        </button>
        <nav className="space-y-2">
          <a href="/" className="block py-2 hover:text-lis-blue">
            Accueil
          </a>
          <a href="/teams" className="block py-2 hover:text-lis-blue">
            Équipes
          </a>
          <a href="/articles" className="block py-2 hover:text-lis-blue">
            Articles
          </a>
          <a href="/news" className="block py-2 hover:text-lis-blue">
            Actualités
          </a>
          <a href="/events" className="block py-2 hover:text-lis-blue">
            Événements
          </a>
        </nav>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
    </div>
  );
}
