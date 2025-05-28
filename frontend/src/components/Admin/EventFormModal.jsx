import React, { useEffect, useState } from "react";
import { EVENT_CATEGORIES } from "../../utils/constants";

export default function EventFormModal({ isOpen, onClose, onSave, event }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    eventType: "",
    description: "",
    streamingUrl: "",
    origine: "LIS",
    format: "Présentiel",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        date: event.date?.slice(0, 10) || "",
        location: event.location || "",
        eventType: event.eventType || "",
        description: event.description || "",
        streamingUrl: event.streamingUrl || "",
        origine: event.origine || "LIS",
        format: event.format || "Présentiel",
      });
    }
  }, [event]);

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
    if (event?._id) {
      formData.append("_id", event._id);
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
          {event ? "Modifier l'événement" : "Ajouter un événement"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-sm"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-sm"
          />

          <input
            type="text"
            name="location"
            placeholder="Lieu"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-sm"
          />

          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-sm"
            required
          >
            <option value="">-- Sélectionner un type --</option>
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {form.eventType === "Conférence" && (
            <input
              type="url"
              name="streamingUrl"
              placeholder="Lien streaming"
              value={form.streamingUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded shadow-sm"
            />
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-sm"
            rows={3}
          />

          {/* File upload input */}
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Image <span role="img" aria-label="camera">📷</span>
  </label>
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleFileChange}
    className="w-full border px-3 py-2 rounded shadow-sm"
  />
</div>


          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {event ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
