import React, { useState, useEffect } from "react";

export default function EventFormModal({
  isOpen,
  onClose,
  onSave,
  initialEvent,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    eventType: "Interne",
    format: "Présentiel",
    streamingUrl: "",
    origine: "LIS",
  });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    setForm(
      initialEvent || {
        title: "",
        description: "",
        date: "",
        location: "",
        eventType: "Interne",
        format: "Présentiel",
        streamingUrl: "",
        origine: "LIS",
      }
    );
    setImageFile(null);
    setPdfFile(null);
  }, [initialEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);
    if (initialEvent?.id || initialEvent?._id)
      formData.append("id", initialEvent.id || initialEvent._id);
    onSave(formData);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl mt-20 mb-10 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto p-6 relative">
          <button
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
            onClick={onClose}
            aria-label="Fermer le formulaire">
            &times;
          </button>
        
          <h2 className="text-xl font-bold mb-4 text-lisBlue">
            {initialEvent ? "Modifier l’événement" : "Ajouter un événement"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Description is required by the backend but was missing from the form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu
              </label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.eventType}
                onChange={(e) =>
                  setForm({ ...form, eventType: e.target.value })
                }
                required
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d’événement
              </label>
              <select
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.eventType}
                onChange={(e) =>
                  setForm({ ...form, eventType: e.target.value })
                }
                required>
                <option value="Interne">Interne</option>
                <option value="Externe">Externe</option>
                <option value="Séminaire">Séminaire</option>
                <option value="Atelier">Atelier</option>
                <option value="Conférence">Conférence</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                required>
                <option value="Présentiel">Présentiel</option>
                <option value="En Ligne">En Ligne</option>
                <option value="Hybride">Hybride</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lien streaming
              </label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.streamingUrl}
                onChange={(e) =>
                  setForm({ ...form, streamingUrl: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origine
              </label>
              <select
                className="w-full border px-4 py-2 rounded shadow-sm"
                value={form.origine}
                onChange={(e) => setForm({ ...form, origine: e.target.value })}
                required>
                <option value="LIS">LIS</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border px-3 py-2 rounded shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affiche (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="w-full border px-3 py-2 rounded shadow-sm"
              />
            </div>


            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                {initialEvent ? "Sauvegarder" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
