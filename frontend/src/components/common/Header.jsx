// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "./LoginModal";
import ChangePasswordModal from "./ChangePasswordModal";
import Sidebar from "./Sidebar";
import logo from "../../assets/images/logo.png";
import Button from "./Button";

export default function Header() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isChangePwOpen, setIsChangePwOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer modal ou sidebar au ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsLoginOpen(false);
        setIsChangePwOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-base dark:bg-base-dark shadow-sm z-50"
        role="banner">
        <div className="flex items-center justify-between h-full container mx-auto px-md">
          {/* Bouton menu */}
          <button
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="sidebar"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-md hover:bg-[var(--color-primary)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]">
            <svg
              className="h-6 w-6 text-[var(--color-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" aria-label="Accueil" className="flex items-center">
            <img
              src={logo}
              alt="Logo LIS"
              className="h-12 sm:h-14 object-contain drop-shadow-md transition-transform hover:scale-105"
            />
          </Link>

          {/* Auth */}
          {user ? (
            <Button
              variant="primary"
              onClick={logout}
              className="whitespace-nowrap">
              Se déconnecter
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setIsLoginOpen(true)}
              className="whitespace-nowrap">
              Connexion
            </Button>
          )}
        </div>
      </header>

      {/* Sidebar off-canvas (avec son overlay interne) */}
      <Sidebar
        id="sidebar"
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Modal de connexion */}
      {/* <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onChangePassword={() => setIsChangePwOpen(true)}
      />
      {/* Modal changement mot de passe */}
      <ChangePasswordModal
        isOpen={isChangePwOpen}
        onClose={() => setIsChangePwOpen(false)}
      />

      {/* Overlay uniquement pour la modal de login
      {isLoginOpen && ( */}
      {/* Overlay uniquement pour les modales */}
      {(isLoginOpen || isChangePwOpen) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          // onClick={() => setIsLoginOpen(false)}
          onClick={() => {
            setIsLoginOpen(false);
            setIsChangePwOpen(false);
          }}
        />
      )}
    </>
  );
}
