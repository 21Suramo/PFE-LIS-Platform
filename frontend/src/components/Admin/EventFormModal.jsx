import React, { useState, useEffect } from "react";

export default function EventFormModal({
  isOpen,
  onClose,
  onSave,
  initialEvent,
}) {
  const [form, setForm] = useState({
    titre: "",
    date: "",
    lieu: "",
    categorie: "",
  });

  useEffect(() => {
    setForm(initialEvent || { titre: "", date: "", lieu: "", categorie: "" });
  }, [initialEvent, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-lisBlue"
          onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">
          {initialEvent ? "Modifier" : "Ajouter"} un événement
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Titre"
            value={form.titre}
            onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Catégorie"
            value={form.categorie}
            onChange={(e) =>
              setForm((f) => ({ ...f, categorie: e.target.value }))
            }
            required
          />
          <button
            className="bg-lisBlue text-white px-4 py-2 rounded hover:bg-blue-900"
            type="submit">
            {initialEvent ? "Sauvegarder" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}
