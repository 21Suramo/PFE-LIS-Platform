import React, { useState } from "react";
import Layout from "../../components/common/Layout";

import { mockArticles } from "../../data/mockData";

export default function Articles() {
  const [articles, setArticles] = useState(mockArticles);
  const [search, setSearch] = useState("");

  // Actions mock (valider, refuser, supprimer)
  const handleApprove = (id) =>
    setArticles(
      articles.map((a) => (a.id === id ? { ...a, statut: "APPROVED" } : a))
    );
  const handleRefuse = (id) =>
    setArticles(
      articles.map((a) => (a.id === id ? { ...a, statut: "REFUSED" } : a))
    );
  const handleDelete = (id) => setArticles(articles.filter((a) => a.id !== id));

  const filtered = articles.filter(
    (article) =>
      article.titre.toLowerCase().includes(search.toLowerCase()) ||
      (article.auteur &&
        article.auteur.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-lisBlue mb-8">
            Gérer les articles
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Recherche article/auteur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded w-full max-w-md"
            />
          </div>
          <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Titre</th>
                  <th>Auteur</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="py-2">{article.titre}</td>
                    <td>{article.auteur}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs
                        ${
                          article.statut === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : article.statut === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                        {article.statut}
                      </span>
                    </td>
                    <td className="flex gap-1">
                      {article.statut === "PENDING" && (
                        <>
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                            onClick={() => handleApprove(article.id)}>
                            Approuver
                          </button>
                          <button
                            className="px-2 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500"
                            onClick={() => handleRefuse(article.id)}>
                            Refuser
                          </button>
                        </>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        onClick={() => handleDelete(article.id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-6">
                      Aucun article trouvé.
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
