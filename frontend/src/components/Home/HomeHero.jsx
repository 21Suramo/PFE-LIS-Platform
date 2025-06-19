// src/components/Home/HomeHero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-lis.webp";
import LisIntroAccordion from "../UI/LisIntroAccordion";
import Button from "../common/Button";

export default function HomeHero() {
  const handleScroll = () => {
    const target = document.getElementById("presentation");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
    className="relative h-full w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Overlay sombre + flou */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-sm z-0" />

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-screen-lg px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bienvenue au{" "}
          <span className="text-[var(--color-primary)]">Laboratoire LIS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-[var(--color-accent)] italic text-lg sm:text-xl md:text-2xl mb-6">
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
          <Button variant="primary" onClick={handleScroll}>
            Découvrir nos services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
