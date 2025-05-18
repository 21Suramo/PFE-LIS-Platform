// src/components/common/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  NewspaperIcon,
  CalendarIcon,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay flouté */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Menu latéral */}
          <motion.aside
            id="sidebar"
            className="fixed top-0 left-0 w-64 h-full bg-background shadow-xl z-50 p-5 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Menu latéral">
            {/* Bouton fermer */}
            <button
              aria-label="Fermer le menu"
              onClick={onClose}
              className="text-primary-dark hover:text-lisBlue mb-6 flex items-center justify-end">
              <XIcon className="w-6 h-6" />
            </button>

            {/* Liens de navigation */}
            <nav className="flex flex-col gap-4 text-sm font-medium text-primary-dark">
              <SidebarLink to="/" icon={<HomeIcon />} label="Accueil" />
              <SidebarLink to="/teams" icon={<UsersIcon />} label="Équipes" />
              <SidebarLink
                to="/articles"
                icon={<FileTextIcon />}
                label="Articles"
              />
              <SidebarLink
                to="/news"
                icon={<NewspaperIcon />}
                label="Actualités"
              />
              <SidebarLink
                to="/events"
                icon={<CalendarIcon />}
                label="Événements"
              />
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-2 py-2 rounded hover:bg-accentLight hover:text-lisBlue transition"
      onClick={() => window.scrollTo(0, 0)}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
