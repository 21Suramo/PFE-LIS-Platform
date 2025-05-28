import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import ArticleList from "../components/Article/ArticleList";
import ArticleDetail from "../components/Article/ArticleDetail";
import { mockArticles } from "../data/mockData";
import { AnimatePresence, motion } from "framer-motion";

const ARTICLES_PER_PAGE = 6;

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterEquipe, setFilterEquipe] = useState("");
  const [filterMembre, setFilterMembre] = useState("");
  const [page, setPage] = useState(1);

  // Uniques pour filtres
  const uniqueEquipes = Array.from(
    new Set(mockArticles.map((a) => a.equipe).filter(Boolean))
  );
  const uniqueMembres = Array.from(
    new Set(mockArticles.map((a) => a.auteur).filter(Boolean))
  );

  // 1. Filtrage
  const filtered = mockArticles
    .filter((a) => !filterEquipe || a.equipe === filterEquipe)
    .filter((a) => !filterMembre || a.auteur === filterMembre)
    .filter(
      (article) =>
        article.titre.toLowerCase().includes(search.toLowerCase()) ||
        article.resume?.toLowerCase().includes(search.toLowerCase())
    );

  // 2. Tri (date uniquement)
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.dateSoumission) - new Date(a.dateSoumission)
  );

  // 3. Pagination
  const maxPage = Math.ceil(sorted.length / ARTICLES_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  // Reset page si search/tri/filtre change
  useEffect(() => {
    setPage(1);
  }, [search, sortBy, filterEquipe, filterMembre]);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl font-bold text-lisBlue mb-8">Articles</h1>
        {/* Barre de filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Rechercher un article…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-200 shadow-sm w-full md:max-w-xs"
          />
          <select
            className="border rounded px-2 py-1"
            value={filterEquipe}
            onChange={(e) => setFilterEquipe(e.target.value)}>
            <option value="">Toutes les équipes</option>
            {uniqueEquipes.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={filterMembre}
            onChange={(e) => setFilterMembre(e.target.value)}>
            <option value="">Tous les membres</option>
            {uniqueMembres.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="flex gap-2 items-center">
            <label className="font-semibold text-gray-700 text-sm">
              Trier :
            </label>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        {/* Liste paginée */}
        <AnimatePresence>
          {paginated.length > 0 ? (
            <ArticleList
              articles={paginated}
              onOpenDetails={setSelectedArticle}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center text-gray-400 italic my-16">
              Aucun article ne correspond à votre recherche.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {maxPage > 1 && (
          <div className="flex gap-3 justify-center mt-8">
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

        {/* Modal animé pour détails */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative"
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-lisBlue text-2xl font-bold"
                  aria-label="Fermer">
                  &times;
                </button>
                <ArticleDetail article={selectedArticle} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
