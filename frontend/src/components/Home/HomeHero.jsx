// src/components/Home/HomeHero.jsx
import React from 'react';

export default function HomeHero() {
  return (
    <section
      className="relative w-full h-[calc(100vh-180px)] bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center">
        {/* Titre principal */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bienvenue au Laboratoire LIS
        </h1>
        {/* Sous-titre */}
        <p className="text-accentLight italic text-lg sm:text-xl md:text-2xl mb-6">
          Recherche • Innovation • Collaboration
        </p>
        {/* Description */}
        <p className="text-bgLight text-base sm:text-lg max-w-lg mb-8">
          Explorez les projets, publications et événements du Laboratoire 
          d’Informatique et Systèmes. Une plateforme académique pensée pour 
          les chercheurs, doctorants et étudiants.
        </p>
        {/* Bouton d’action */}
        <button className="bg-lisBlue text-white py-3 px-6 rounded text-base sm:text-lg">
          Accéder au menu
        </button>
      </div>
    </section>
  );
}
