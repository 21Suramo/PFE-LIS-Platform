// src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        bg-[var(--color-primary-dark)] text-white
        h-[100px] flex flex-col sm:flex-row
        items-center justify-between
        px-4 sm:px-6 lg:px-12
        border-t border-[var(--color-accent-light)]
      "
      role="contentinfo">
      {/* Liens légaux */}
      <nav
        aria-label="Liens secondaires"
        className="flex space-x-4 mb-2 sm:mb-0">
        <Link
          to="/legal"
          className="hover:underline underline-offset-4 transition">
          Mentions légales
        </Link>
        <Link
          to="/contact"
          className="hover:underline underline-offset-4 transition">
          Contact
        </Link>
        <Link
          to="/unihv2c"
          className="hover:underline underline-offset-4 transition">
          UNIHV2C
        </Link>
      </nav>

      {/* Copyright */}
      <div className="text-sm opacity-80 select-none">
        © 2025 LIS – Université Hassan II
      </div>
    </footer>
  );
}
