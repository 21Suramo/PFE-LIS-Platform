// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "./LoginModal";
import Sidebar from "./Sidebar";
import Button from "./Button";
import logo from "../../assets/images/logo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Accessibilité : fermeture de la sidebar avec Echap
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`
          bg-[var(--color-background)] shadow-sm
          h-[80px] sm:h-[100px]
          flex items-center justify-between
          px-4 sm:px-8 lg:px-12
          sticky top-0 z-50
        `}
        role="banner">
        {/* Menu */}
        <Button
          variant="primary"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          aria-controls="sidebar"
          onClick={() => setIsMenuOpen(true)}>
          ☰ Menu
        </Button>

        {/* Logo centré animé */}
        <Link to="/" aria-label="Accueil" className="flex items-center">
          <img
            src={logo}
            alt="Logo Université Hassan II / FSAC"
            className="
              h-[48px] sm:h-[60px]
              max-w-[140px] object-contain
              drop-shadow-md
              animate-zoom-in-out
            "
          />
        </Link>

        {/* Connexion / Déconnexion */}
        {user ? (
          <Button variant="primary" onClick={logout}>
            Se déconnecter
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setIsLoginOpen(true)}>
            Connexion
          </Button>
        )}
      </header>

      {/* Sidebar off-canvas */}
      <Sidebar
        id="sidebar"
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
