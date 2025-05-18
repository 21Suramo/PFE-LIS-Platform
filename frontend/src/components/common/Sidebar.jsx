// src/components/common/Sidebar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const links = [
  { to: "/", icon: <HomeIcon />, label: "Accueil" },
  { to: "/teams", icon: <UsersIcon />, label: "Équipes" },
  { to: "/articles", icon: <FileTextIcon />, label: "Articles" },
  { to: "/news", icon: <NewspaperIcon />, label: "Actualités" },
  { to: "/events", icon: <CalendarIcon />, label: "Événements" },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            id="sidebar"
            className={`fixed top-0 left-0 h-full z-50 p-4 flex flex-col bg-white/80 backdrop-blur-md backdrop-saturate-150 border-r border-gray-200 shadow-lg transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Menu latéral">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="text-gray-600 hover:text-lisBlue focus:outline-none">
                <XIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Toggle mini sidebar"
                className="text-gray-600 hover:text-lisBlue focus:outline-none">
                {collapsed ? (
                  <ChevronsRightIcon className="w-5 h-5" />
                ) : (
                  <ChevronsLeftIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 px-2 py-3 rounded bg-accentLight text-sm font-medium mb-4">
              <UserIcon className="w-5 h-5 text-primary-dark" />
              {!collapsed &&
                (user ? (
                  <div className="leading-tight">
                    <p className="font-semibold text-primary-dark">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-600">{user.role}</p>
                  </div>
                ) : (
                  <span className="text-primary-dark">Visiteur</span>
                ))}
            </div>

            {!collapsed && (
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 pl-9 rounded-md bg-white/60 text-sm placeholder-gray-500 focus:outline-none"
                />
                <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            )}

            <nav className="flex flex-col gap-2 text-sm font-medium">
              {filteredLinks.map((link) => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  active={location.pathname.startsWith(link.to)}
                  collapsed={collapsed}
                />
              ))}

              {/* Lien conditionnel selon le rôle */}
              {user?.role === "RESPONSABLE" && (
                <SidebarLink
                  to="/leader-dashboard"
                  icon={<ShieldCheckIcon />}
                  label="Responsable"
                  active={location.pathname.startsWith("/leader-dashboard")}
                  collapsed={collapsed}
                />
              )}

              {user?.role === "DIRECTEUR" && (
                <SidebarLink
                  to="/admin-dashboard"
                  icon={<ShieldCheckIcon />}
                  label="Directeur"
                  active={location.pathname.startsWith("/admin-dashboard")}
                  collapsed={collapsed}
                />
              )}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({ to, icon, label, active, collapsed }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
        ${active ? "bg-lisBlue text-white font-semibold" : "text-primary-dark hover:bg-accentLight hover:text-lisBlue"}`}
      onClick={() => window.scrollTo(0, 0)}
      aria-current={active ? "page" : undefined}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
