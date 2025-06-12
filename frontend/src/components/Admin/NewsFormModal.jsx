import React, { useState, useEffect } from "react";

export default function NewsFormModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({ titre: "", contenu: "" });

  useEffect(() => {
    if (isOpen) setForm({ titre: "", contenu: "" });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-lisBlue"
          onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Ajouter une actualité</h2>
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
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Contenu"
            value={form.contenu}
            onChange={(e) =>
              setForm((f) => ({ ...f, contenu: e.target.value }))
            }
            required
            rows={5}
          />
          <button
            className="bg-lisBlue text-white px-4 py-2 rounded hover:bg-blue-900"
            type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
