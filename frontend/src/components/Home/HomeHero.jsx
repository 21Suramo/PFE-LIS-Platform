// src/components/Home/HomeHero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-lis.webp";

export default function HomeHero() {
  // Fonction de scroll fluide
  const handleScrollToMenu = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full h-[calc(100vh-180px)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Section d'accueil du laboratoire LIS">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Contenu central */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Titre animé */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
          Bienvenue au Laboratoire LIS
        </motion.h1>

        {/* Sous-titre animé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-accentLight italic text-lg sm:text-xl md:text-2xl mb-6">
          Recherche • Innovation • Collaboration
        </motion.p>

        {/* Description animée */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-bgLight text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Explorez les projets, publications et événements du Laboratoire
          d’Informatique et Systèmes. Une plateforme académique pensée pour les
          chercheurs, doctorants et étudiants.
        </motion.p>

        {/* CTA avec animation + scroll */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={handleScrollToMenu}
          className="bg-lisBlue text-white py-3 px-6 rounded text-base sm:text-lg hover:bg-lisBlueDark transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lisBlueDark"
          aria-label="Accéder au menu principal">
          Accéder au menu
        </motion.button>
      </div>
    </section>
  );
}
