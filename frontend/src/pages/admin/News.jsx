// src/pages/admin/News.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import NewsFormModal from "../../components/Admin/NewsFormModal";
import {
  getAllActualites,
  createActualite,
  updateActualite,
  deleteActualite,
} from "../../services/newsService";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingActualite, setEditingActualite] = useState(null);

  const fetchAdminNews = async () => {
    setLoading(true);
    try {
      const data = await getAllActualites();
      setNewsList(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch admin news.");
      setNewsList([]);
      console.error("Admin fetch news error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminNews();
  }, []);

  const handleDeleteNews = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      try {
        await deleteActualite(id);
        fetchAdminNews();
      } catch (err) {
        console.error("Failed to delete actualité:", err);
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingActualite(null);
    setShowNewsModal(true);
  };

  const handleOpenEditModal = (actualite) => {
    setEditingActualite(actualite);
    setShowNewsModal(true);
  };

  const handleSaveNews = async (formData) => {
    try {
      if (editingActualite?._id) {
        await updateActualite(editingActualite._id, formData);
      } else {
        await createActualite(formData);
      }
      setShowNewsModal(false);
      fetchAdminNews();
    } catch (err) {
      console.error("Échec de l'enregistrement:", err);
      alert("Erreur lors de l'enregistrement de l’actualité.");
    }
  };

  const filtered = newsList.filter((news) =>
    news.titre && news.titre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Layout><div className="p-10">Loading admin news...</div></Layout>;
  if (error) return <Layout><div className="p-10 text-red-500">Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-lisBlue mb-8">
          Gérer les actualités
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche actualité…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full max-w-md"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            onClick={handleOpenAddModal}
          >
            ➕ Ajouter actualité
          </button>
        </div>

        <NewsFormModal
          isOpen={showNewsModal}
          onClose={() => setShowNewsModal(false)}
          onSave={handleSaveNews}
          actualite={editingActualite}
        />

        <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 px-3">Titre</th>
                <th className="px-3">Date publication</th>
                <th className="px-3">Épinglée</th>
                <th className="px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((news) => (
                <tr
                  key={news._id}
                  className="border-b last:border-b-0 hover:bg-blue-50"
                >
                  <td className="py-2 px-3">{news.titre}</td>
                  <td className="px-3">
                    {new Date(news.datePublication).toLocaleDateString()}
                  </td>
                  <td className="px-3">{news.pinned ? "Oui" : "Non"}</td>
                  <td className="px-3 py-2 flex gap-1">
                    <button
                      className="px-2 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500"
                      onClick={() => handleOpenEditModal(news)}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      onClick={() => handleDeleteNews(news._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-6 px-3">
                    Aucune actualité trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
