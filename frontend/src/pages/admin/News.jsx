// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import NewsFormModal from "../../components/Admin/NewsFormModal";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews as deleteNewsApi,
} from "../../services/newsService";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editNews, setEditNews] = useState(null);

  useEffect(() => {
    getAllNews()
      .then(setNewsList)
      .catch(console.error);
  }, []);

  async function handleSaveNews(formData) {
    try {
      if (editNews) {
        const updated = await updateNews(editNews._id, formData);
        setNewsList((prev) =>
          prev.map((n) => (n._id === editNews._id ? updated : n))
        );
      } else {
        const { actualite } = await createNews(formData);
        setNewsList((prev) => [...prev, actualite]);
      }
      setShowNewsModal(false);
      setEditNews(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteNews(id) {
    try {
      await deleteNewsApi(id);
      setNewsList((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = newsList.filter((news) =>
    news.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex">
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
              onClick={() => {
                setEditNews(null);
                setShowNewsModal(true);
              }}>
              ➕ Ajouter actualité
            </button>
          </div>
          <NewsFormModal
            isOpen={showNewsModal}
            onClose={() => {
              setShowNewsModal(false);
              setEditNews(null);
            }}
            onSave={handleSaveNews}
            initialNews={editNews}
          />
          <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Titre</th>
                  <th>Date publication</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((news) => (
                  <tr
                  key={news._id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="py-2">{news.titre}</td>
                    <td>{new Date(news.datePublication).toLocaleDateString()}</td>
                    <td className="flex gap-1">
                      <button
                        className="px-2 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500"
                        onClick={() => {
                          setEditNews(news);
                          setShowNewsModal(true);
                        }}>
                        Modifier
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        onClick={() => handleDeleteNews(news._id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-400 py-6">
                      Aucune actualité trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
