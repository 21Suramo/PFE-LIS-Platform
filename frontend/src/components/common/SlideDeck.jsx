// src/components/common/SlideDeck.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

// Définition des slides plein écran
const slides = [
  function Slide1() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white px-6">
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bienvenue au LIS
        </motion.h1>
        <motion.p
          className="italic text-lg sm:text-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Recherche • Innovation • Collaboration
        </motion.p>
      </div>
    );
  },
  function Slide2() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 to-teal-700 text-white px-6">
        <motion.h2
          className="text-3xl sm:text-5xl font-bold mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Nos Équipes
        </motion.h2>
        <motion.p
          className="text-base sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Découvrez les 3 équipes qui façonnent l'avenir.
        </motion.p>
      </div>
    );
  },
  // Ajoute d'autres slides selon tes besoins
];

export default function SlideDeck() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const SlideComponent = slides[current];

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Flèches de navigation */}
      <button
        onClick={prevSlide}
        aria-label="Précédent"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 backdrop-blur hover:bg-opacity-40"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Suivant"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 backdrop-blur hover:bg-opacity-40"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
