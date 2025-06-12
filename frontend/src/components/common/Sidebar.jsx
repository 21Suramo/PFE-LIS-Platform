// src/components/common/Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  NewspaperIcon,
  CalendarIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
  UserIcon,
  ShieldCheckIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useDarkMode } from "../../hooks/useDarkMode";

const publicLinks = [
  { to: "/", icon: <HomeIcon />, label: "Accueil" },
  { to: "/teams", icon: <UsersIcon />, label: "Équipes" },
  { to: "/articles", icon: <FileTextIcon />, label: "Articles" },
  { to: "/news", icon: <NewspaperIcon />, label: "Actualités" },
  { to: "/events", icon: <CalendarIcon />, label: "Événements" },
];

const actionBtn =
  "p-1 rounded hover:bg-[var(--color-primary)]/10 focus:outline-none focus:ring-2 focus:ring-focus";

export default function Sidebar({ id, isOpen, onClose }) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useDarkMode();
  const sidebarRef = useRef(null);

  // Fermer au ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredLinks = publicLinks.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <FocusTrap active={isOpen}>
          <motion.aside
            id={id}
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidebar-title"
            className={`fixed top-0 left-0 h-full z-[999] flex flex-col
              bg-base-alt dark:bg-base-alt-dark backdrop-blur-md
              border-r border-gray-200 dark:border-gray-700 shadow-lg
              overflow-y-auto transition-[width] duration-300
              ${collapsed ? "w-20" : "w-72"}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}>
            <h2 id="sidebar-title" className="sr-only">
              Navigation
            </h2>

            {/* Header : titre + icons dark / close / collapse */}
            <div
              className={`flex items-center px-2 py-4 ${
                collapsed ? "justify-center" : "justify-between"
              }`}>
              {!collapsed && (
                <span className="text-xl font-bold text-primary dark:text-accent">
                  LIS
                </span>
              )}
              <div className="flex items-center gap-2">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  aria-label={
                    isDark ? "Activer mode clair" : "Activer mode sombre"
                  }
                  className={actionBtn}>
                  {isDark ? (
                    <SunIcon className="w-5 h-5 text-primary dark:text-white" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-primary dark:text-white" />
                  )}
                </button>

                {/* Close sidebar */}
                <button
                  onClick={onClose}
                  aria-label="Fermer le menu"
                  className={actionBtn}>
                  <XIcon className="w-5 h-5 text-primary dark:text-white" />
                </button>

                {/* Collapse / Expand */}
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={collapsed ? "Ouvrir le menu" : "Réduire le menu"}
                  className={actionBtn}>
                  {collapsed ? (
                    <ChevronsRightIcon className="w-5 h-5 text-primary dark:text-white" />
                  ) : (
                    <ChevronsLeftIcon className="w-5 h-5 text-primary dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Profil utilisateur */}
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-md bg-[var(--color-primary-light)] mb-4 ${
                collapsed ? "justify-center" : ""
              }`}>
              <UserIcon className="w-5 h-5 text-base dark:text-white" />
              {!collapsed && (
                <div className="leading-tight text-base dark:text-white">
                  <p className="font-semibold">
                    {user?.fullName || user?.email || "Utilisateur"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {user?.role || "Visiteur"}
                  </p>
                </div>
              )}
            </div>

            {/* Search */}
            {!collapsed && (
              <div className="relative px-4 mb-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-10 py-2 rounded-md bg-white/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-focus text-base dark:text-white"
                />
                <SearchIcon className="absolute left-6 top-2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            )}

            {/* Navigation links */}
            <nav className="flex-1 px-2 space-y-2">
              {filteredLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white font-semibold"
                        : "text-base dark:text-white hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]"
                    }`
                  }
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onClose();
                  }}>
                  {link.icon}
                  {!collapsed && <span>{link.label}</span>}
                </NavLink>
              ))}

              {/* Liens selon rôle */}
              {user?.role === "RESPONSABLE" && (
                <NavLink
                  to="/leader-dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-all text-base dark:text-white hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onClose();
                  }}>
                  <ShieldCheckIcon className="w-5 h-5 text-base dark:text-white" />
                  {!collapsed && <span>Responsable</span>}
                </NavLink>
              )}
              {(user?.role === "MEMBRE" || user?.role === "RESPONSABLE") && (
                <NavLink
                  to="/MemberPanelPage"
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-all text-base dark:text-white hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onClose();
                  }}>
                  <ShieldCheckIcon className="w-5 h-5 text-base dark:text-white" />
                  {!collapsed && <span>Espace Membre</span>}
                </NavLink>
              )}
              {user?.role === "DIRECTEUR" && (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-all text-base dark:text-white hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onClose();
                    }}>
                    <ShieldCheckIcon className="w-5 h-5 text-base dark:text-white" />
                    {!collapsed && <span>Dashboard Admin</span>}
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-all text-base dark:text-white hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onClose();
                    }}>
                    <UsersIcon className="w-5 h-5 text-base dark:text-white" />
                    {!collapsed && <span>Utilisateurs</span>}
                  </NavLink>
                </>
              )}
            </nav>
          </motion.aside>
        </FocusTrap>
      </>
    </AnimatePresence>
  );
}
