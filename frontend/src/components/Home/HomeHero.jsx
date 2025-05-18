// src/Home/HomeHero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-lis.webp";

export default function HomeHero() {
  const handleScrollToMenu = () => {
    const target = document.getElementById("presentation");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full h-[calc(100vh-180px)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Overlay avec flou */}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-bgLight text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Explorez les projets, publications et événements du Laboratoire
          d’Informatique et Systèmes. Une plateforme académique pensée pour les
          chercheurs, doctorants et étudiants.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={handleScrollToMenu}
          className="bg-lisBlue text-white py-3 px-6 rounded text-base sm:text-lg hover:bg-primaryDark transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryDark"
          aria-label="Accéder au menu principal">
          Découvrir nos services
        </motion.button>
      </div>
    </section>
  );
}
