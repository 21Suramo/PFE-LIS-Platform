// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} aria-label="Fermer le menu">
            ✕
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <Link to="/" onClick={onClose} className="block hover:underline">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/teams" onClick={onClose} className="block hover:underline">
              Équipes
            </Link>
          </li>
          <li>
            <Link to="/articles" onClick={onClose} className="block hover:underline">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/news" onClick={onClose} className="block hover:underline">
              Actualités
            </Link>
          </li>
          <li>
            <Link to="/events" onClick={onClose} className="block hover:underline">
              Événements
            </Link>
          </li>
          {/* Routes privées, si besoin */}
          <li>
            <Link to="/member-panel" onClick={onClose} className="block hover:underline">
              Espace Membre
            </Link>
          </li>
          <li>
            <Link to="/leader-dashboard" onClick={onClose} className="block hover:underline">
              Dashboard Responsable
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard" onClick={onClose} className="block hover:underline">
              Dashboard Admin
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
