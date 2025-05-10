// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primaryDark text-white h-[100px] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-12">
      
      {/* Liens légaux */}
      <div className="flex space-x-4 mb-2 sm:mb-0">
        <Link to="/legal" className="hover:underline">
          Mentions légales
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/unihv2c" className="hover:underline">
          UNIHV2C
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-sm">
        © 2025 LIS – Université Hassan II
      </div>
    </footer>
  );
}
