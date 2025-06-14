import React, { useState } from "react";
// import { mockArticles } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const ARTICLES_PER_PAGE = 6;

export default function TeamArticlesModal({ team, onClose }) {
  // Récupérer les objets articles à partir de team.articles (IDs)
  // const articles = (team.articles || [])
  //   .map((id) => mockArticles.find((a) => a.id === id))
  //   .filter(Boolean);
  const articles = Array.isArray(team.articles)
    ? team.articles
    : team.article
    ? [team.article]
    : [];

  // Tri
  const [sortBy, setSortBy] = useState("date");
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "date") {
      // return new Date(b.dateSoumission) - new Date(a.dateSoumission);
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "statut") {
      return a.statut.localeCompare(b.statut);
    }
    return 0;
  });

  // Pagination
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
  const paginated = sortedArticles.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  // Mini-modal article
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div
          className="bg-white w-full max-w-xl mx-4 p-6 rounded-2xl shadow-2xl relative"
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.23 }}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-4 mb-4 items-center">
            <h2 className="text-2xl font-bold text-lisBlue flex-1">
              📄 Articles de {team.name}
            </h2>
            <label className="font-semibold text-gray-700">
              Trier par&nbsp;:
            </label>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="statut">Statut</option>
            </select>
          </div>

          {paginated.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {paginated.map((article) => (
                <li
                key={article._id || article.id}
                  className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                  <p className="font-medium text-gray-800">{article.title}</p>
                  <div className="flex gap-4 items-center text-xs text-gray-500 mt-1">
                      📅 {new Date(article.createdAt).toLocaleDateString()}
                      <span
                        className={`inline-block px-2 py-1 rounded-full ${article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {article.statut}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {article.resume}
                    </p>
                  </div>
                  <button
                    className="mt-2 sm:mt-0 sm:ml-4 text-lisBlue underline text-xs font-semibold"
                    onClick={() => setSelectedArticle(article)}>
                    Voir détails
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              Aucun article publié pour le moment.
            </p>
          )}

          {/* Pagination */}
          {maxPage > 1 && (
            <div className="flex gap-3 justify-center mt-6">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-60"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}>
                Précédent
              </button>
              <span className="font-semibold text-gray-600">
                Page {page} / {maxPage}
              </span>
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-60"
                onClick={() => setPage(page + 1)}
                disabled={page === maxPage}>
                Suivant
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Fermer">
            &times;
          </button>

          {/* Mini-modal détails article */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
                  initial={{ scale: 0.93, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
                    aria-label="Fermer">
                    &times;
                  </button>
                  <h3 className="text-xl font-bold">{selectedArticle.title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                  {new Date(selectedArticle.createdAt).toLocaleDateString()}
                  </div>
                  <div className="mt-2">
                    {selectedArticle.content || selectedArticle.resume}
                  </div>
                  <div className="mt-3 text-sm">
                    Statut :{" "}
                    <span
                      className={`px-2 py-1 rounded ${selectedArticle.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {selectedArticle.statut}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
