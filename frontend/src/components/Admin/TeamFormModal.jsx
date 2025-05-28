// path: src/components/Admin/TeamFormModal.jsx
import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/userService";
import { getAllArticles } from "../../services/articleService";

export default function TeamFormModal({ isOpen, onClose, onSave, team }) {
  /* ------------ state ------------ */
  const [form, setForm] = useState({
    name: "",
    specialite: "",
    description: "",
    objectifs: "",
    article: "",
    leader: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  /* ------------ load lists once ------------ */
  useEffect(() => {
    getAllUsers().then((list) => {
      setUsers(list);
      setForm((f) => ({ ...f, leader: f.leader || list[0]?._id || "" }));
    });
    getAllArticles().then(setArticles);
  }, []);

  /* ------------ populate on edit / reset ------------ */
  useEffect(() => {
    if (team) {
      setForm({
        name: team.name || "",
        specialite: team.specialite || "",
        description: team.description || "",
        objectifs: team.objectifs || "",
        article: team.article?._id || "",
        leader: team.leader?._id || "",
      });
    } else {
      setForm((f) => ({
        name: "",
        specialite: "",
        description: "",
        objectifs: "",
        article: "",
        leader: f.leader,          // conserve leader par défaut
      }));
    }
    setImageFile(null);
  }, [team, isOpen]);

  /* ------------ handlers ------------ */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    if (team?._id) fd.append("_id", team._id); // pour update
    onSave(fd);
  };

  if (!isOpen) return null;

  /* ------------ modal ------------ */
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-lisBlue">
          {team ? "Modifier l'équipe" : "Ajouter une équipe"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ---- Champs de base ---- */}
          <input
            type="text"
            name="name"
            placeholder="Nom de l'équipe"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="specialite"
            placeholder="Spécialité"
            value={form.specialite}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="objectifs"
            placeholder="Objectifs"
            value={form.objectifs}
            onChange={handleChange}
            rows={2}
            className="w-full border px-3 py-2 rounded"
          />

          {/* ---- Leader ---- */}
          <div>
            <label className="text-sm font-medium">Chef d’équipe *</label>
            <select
              name="leader"
              value={form.leader}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.nom} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* ---- Article ---- */}
          <div>
            <label className="text-sm font-medium">Article associé</label>
            <select
              name="article"
              value={form.article}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Aucun --</option>
              {articles.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          {/* ---- Image ---- */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image d’équipe{" "}
              <span role="img" aria-label="Appareil photo">
                📷
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border px-3 py-2 rounded cursor-pointer
                         file:mr-4 file:py-1 file:px-3 file:border-0
                         file:text-sm file:bg-lisBlue/90 file:text-white
                         hover:file:bg-lisBlue"
            />
          </div>

          {/* ---- Bouton sticky ---- */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2">
            <button
              type="submit"
              className="bg-lisBlue text-white px-5 py-2 w-full md:w-auto rounded hover:bg-blue-800"
            >
              {team ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
