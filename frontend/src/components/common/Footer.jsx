import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 right-0 h-[var(--footer-height)]
        bg-[var(--color-primary-dark)] text-white
        flex items-center justify-center
        z-50
      "
      role="contentinfo">
      <nav aria-label="Liens secondaires" className="flex space-x-6">
        <Link to="/legal" className="hover:underline">
          Mentions légales
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/unihv2c" className="hover:underline">
          UNIHV2C
        </Link>
      </nav>
    </footer>
  );
}
