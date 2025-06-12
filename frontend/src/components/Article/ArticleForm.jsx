import React, { useState } from "react";

export default function ArticleForm({ onSubmit }) {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre || !auteur) return;
    onSubmit({
      id: Date.now().toString(),
      titre,
      auteur,
      statut: "PENDING",
    });
    setTitre("");
    setAuteur("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Auteur
        </label>
        <input
          type="text"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-primaryDark text-white py-2 px-4 rounded">
        Soumettre
      </button>
    </form>
  );
}
