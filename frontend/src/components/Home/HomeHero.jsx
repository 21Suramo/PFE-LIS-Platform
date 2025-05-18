import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-lis.webp";
console.log("heroImage path:", heroImage);
export default function HomeHero() {
  // Scroll vers le menu
  const handleScrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  //
  return (
    <section
      className="relative w-full h-[calc(100vh-180px)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center">
        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bienvenue au Laboratoire LIS
        </motion.h1>
        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-[var(--color-accent-light)] italic text-lg sm:text-xl md:text-2xl mb-6">
          <span className="animate-pulse">
            Recherche • Innovation • Collaboration
          </span>
        </motion.p>
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[var(--color-background)] text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Explorez les projets, publications et événements du Laboratoire
          d’Informatique et Systèmes. Une plateforme académique pensée pour les
          chercheurs, doctorants et étudiants.
        </motion.p>
        {/* Bouton d’action */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={handleScrollToMenu}
          className="bg-[var(--color-lis-blue)] text-white py-3 px-6 rounded text-base sm:text-lg 
            hover:bg-[var(--color-primary-dark)] transition duration-300 shadow-md hover:shadow-lg">
          Découvrir nos services
        </motion.button>
      </div>
    </section>
  );
}
