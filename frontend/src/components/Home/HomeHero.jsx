//src/components/Home/HomeHero.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-lis.webp";
import LisIntroAccordion from "../UI/LisIntroAccordion";
import Sidebar from "../common/Sidebar";
import Button from "../common/Button";

export default function HomeHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToMenu = () => {
    const target = document.getElementById("presentation");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full h-[calc(100vh-180px)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-sm"></div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bienvenue au{" "}
          <span style={{ color: "var(--color-lis-blue)" }}>
            Laboratoire LIS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-accentLight italic text-lg sm:text-xl md:text-2xl mb-6">
          <span className="animate-pulse">
            Recherche • Innovation • Collaboration
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8 w-full flex justify-center">
          <LisIntroAccordion />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}>
          <Button
            variant="primary"
            aria-label="Ouvrir le menu latéral"
            aria-expanded={isMenuOpen}
            aria-controls="sidebar"
            onClick={() => setIsMenuOpen(true)}>
            Découvrir nos services
          </Button>
        </motion.div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}
