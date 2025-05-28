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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const publicLinks = [
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
  const [adminExpanded, setAdminExpanded] = useState(
    location.pathname.startsWith("/admin")
  );

  if (!isOpen) return null;

  const filteredLinks = publicLinks.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <>
        {onClose && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <motion.aside
          className={`fixed top-0 left-0 h-full z-50 p-4 flex flex-col bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-lg transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          {/* Header & controls */}
          <div className="flex items-center justify-between mb-4">
            {!collapsed && (
              <span className="text-xl font-bold text-lisBlue">LIS</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle"
              className="text-gray-600 hover:text-lisBlue"
            >
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
            {!collapsed && (
              <div className="leading-tight">
                <p className="font-semibold text-primary-dark">
                  {user?.fullName || user?.email || "Utilisateur"}
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  {user?.role || "visiteur"}
                </p>
              </div>
            )}
          </div>

          {/* Barre de recherche */}
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

          {/* Liens publics */}
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
          </nav>

          {/* Liens spécifiques par rôle */}
          {user?.role === "MEMBRE" && (
            <SidebarLink
              to="/MemberPanelPage"
              icon={<ShieldCheckIcon />}
              label="Membre Panel"
              active={location.pathname.startsWith("/MemberPanelPage")}
              collapsed={collapsed}
            />
          )}

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
            <>
              {/* Admin toggle button */}
              <Link
  to="/admin/dashboard"
  onClick={() => setAdminExpanded(true)}
  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
    location.pathname.startsWith("/admin")
      ? "bg-lisBlue text-white font-semibold"
      : "text-primary-dark hover:bg-accentLight hover:text-lisBlue"
  }`}
>
  <div className="flex items-center gap-3">
    <ShieldCheckIcon className="w-5 h-5" />
    {!collapsed && <span>Dashboard Admin</span>}
  </div>
  {!collapsed &&
    (adminExpanded ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    ))}
</Link>


              {/* Collapsible admin links */}
              {adminExpanded && !collapsed && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  <SidebarLink
                    to="/admin/users"
                    icon={<UsersIcon />}
                    label="Utilisateurs"
                    active={location.pathname.startsWith("/admin/users")}
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to="/admin/teams"
                    icon={<UsersIcon />}
                    label="Équipes"
                    active={location.pathname.startsWith("/admin/teams")}
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to="/admin/events"
                    icon={<CalendarIcon />}
                    label="Événements"
                    active={location.pathname.startsWith("/admin/events")}
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to="/admin/articles"
                    icon={<FileTextIcon />}
                    label="Articles"
                    active={location.pathname.startsWith("/admin/articles")}
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to="/admin/news"
                    icon={<NewspaperIcon />}
                    label="Actualités"
                    active={location.pathname.startsWith("/admin/news")}
                    collapsed={collapsed}
                  />
                </div>
              )}
            </>
          )}
        </motion.aside>
      </>
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
      aria-current={active ? "page" : undefined}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
