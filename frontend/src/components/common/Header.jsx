// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import Sidebar from './Sidebar'; // ← importer

export default function Header() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // ← état sidebar

  return (
    <>
      <header className="bg-bgLight h-[80px] sm:h-[100px] flex items-center justify-between px-4 sm:px-6 lg:px-12 relative">
        {/* Menu Button */}
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setIsMenuOpen(true)}        // ← ouvrir
          className="bg-primaryDark text-white w-10 h-10 sm:w-[120px] sm:h-[40px] rounded flex items-center justify-center"
        >
          <span className="text-xl sm:hidden">☰</span>
          <span className="hidden sm:inline">☰ Menu</span>
        </button>

        {/* Logo & Connexion… */}
        {/* … */}
      </header>

      {/* Sidebar off-canvas */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
