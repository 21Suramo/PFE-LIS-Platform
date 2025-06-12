import React, { useState, useEffect } from "react";

export default function UserFormModal({
  isOpen,
  onClose,
  onSave,
  initialUser,
}) {
  const [form, setForm] = useState({ nom: "", email: "", role: "MEMBRE" });

  useEffect(() => {
    setForm(initialUser || { nom: "", email: "", role: "MEMBRE" });
  }, [initialUser, isOpen]);

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
          {initialUser ? "Modifier" : "Ajouter"} un utilisateur
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Nom"
            value={form.nom}
            onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <select
            className="border rounded px-3 py-2"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            <option value="MEMBRE">Membre</option>
            <option value="DOCTORANT">Doctorant</option>
            <option value="RESPONSABLE">Responsable</option>
            <option value="DIRECTEUR">Directeur</option>
          </select>
          <button
            className="bg-lisBlue text-white px-4 py-2 rounded hover:bg-blue-900"
            type="submit">
            {initialUser ? "Sauvegarder" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}
