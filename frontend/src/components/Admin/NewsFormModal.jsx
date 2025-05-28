import React, { useEffect, useState } from "react";

export default function NewsFormModal({ isOpen, onClose, onSave, actualite }) {
  const [form, setForm] = useState({
    titre: "",
    contenu: "",
    datePublication: new Date().toISOString().slice(0, 10),
    pinned: false,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (actualite) {
      setForm({
        titre: actualite.titre || "",
        contenu: actualite.contenu || "",
        datePublication: actualite.datePublication?.slice(0, 10) || new Date().toISOString().slice(0, 10),
        pinned: actualite.pinned || false,
      });
    }
  }, [actualite]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (actualite?._id) {
      formData.append("_id", actualite._id);
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-lisBlue">
          {actualite ? "Modifier l'actualité" : "Ajouter une actualité"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              name="titre"
              value={form.titre}
              onChange={handleChange}
              placeholder="Entrez le titre de l’actualité"
              className="w-full border px-3 py-2 rounded shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contenu</label>
            <textarea
              name="contenu"
              value={form.contenu}
              onChange={handleChange}
              placeholder="Saisissez le contenu de l’actualité"
              className="w-full border px-3 py-2 rounded shadow-sm"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image <span role="img" aria-label="camera">📷</span></label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pinned"
              checked={form.pinned}
              onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
            />
            <label className="text-sm">Épingler cette actualité</label>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {actualite ? "Mettre à jour" : "Publier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
