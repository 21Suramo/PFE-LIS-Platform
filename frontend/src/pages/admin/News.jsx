import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import NewsFormModal from "../../components/Admin/NewsFormModal";
import { mockActualites } from "../../data/mockData";

export default function News() {
  const [newsList, setNewsList] = useState(mockActualites);
  const [search, setSearch] = useState("");
  const [showNewsModal, setShowNewsModal] = useState(false);

  const handleAddNews = (news) =>
    setNewsList([
      ...newsList,
      {
        ...news,
        id: Date.now(),
        datePublication: new Date().toISOString().slice(0, 10),
      },
    ]);

  const handleDeleteNews = (id) =>
    setNewsList(newsList.filter((n) => n.id !== id));

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
              onClick={() => setShowNewsModal(true)}>
              ➕ Ajouter actualité
            </button>
          </div>
          <NewsFormModal
            isOpen={showNewsModal}
            onClose={() => setShowNewsModal(false)}
            onSave={(news) => {
              handleAddNews(news);
              setShowNewsModal(false);
            }}
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
                    key={news.id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="py-2">{news.titre}</td>
                    <td>{news.datePublication}</td>
                    <td>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        onClick={() => handleDeleteNews(news.id)}>
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
