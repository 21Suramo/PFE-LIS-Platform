import React, { useState, useMemo, useEffect } from "react";
import Layout from "../components/common/Layout";
import EventList from "../components/Event/EventList";
import EventDetail from "../components/Event/EventDetail";
import { mockEvenements } from "../data/mockData";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS_PER_PAGE = 4;

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategorie, setFilterCategorie] = useState(""); // ex. "Conférence en ligne"
  const [filterLieu, setFilterLieu] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);

  // 1. Filtre sur les événements internes uniquement
  const data = useMemo(
    () => mockEvenements.filter((e) => e.origine === "INTERNE"),
    []
  );

  // Catégories et lieux uniques pour filtres
  const categories = Array.from(
    new Set(data.map((e) => e.categorie).filter(Boolean))
  );
  const lieux = Array.from(new Set(data.map((e) => e.lieu).filter(Boolean)));

  // 2. Recherche, filtre
  let filtered = data
    .filter((event) => !filterCategorie || event.categorie === filterCategorie)
    .filter((event) => !filterLieu || event.lieu === filterLieu)
    .filter(
      (event) =>
        event.titre.toLowerCase().includes(search.toLowerCase()) ||
        (event.description?.toLowerCase() || "").includes(search.toLowerCase())
    );

  // 3. Tri
  let sorted = [...filtered];
  if (sortBy === "date") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "lieu") {
    sorted.sort((a, b) => (a.lieu || "").localeCompare(b.lieu || ""));
  }

  // 4. Pagination
  const maxPage = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, filterCategorie, filterLieu, sortBy]);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-8 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          Événements Internes
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-200 shadow-sm w-full md:max-w-xs"
          />
          <select
            className="border rounded px-2 py-1"
            value={filterCategorie}
            onChange={(e) => setFilterCategorie(e.target.value)}>
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={filterLieu}
            onChange={(e) => setFilterLieu(e.target.value)}>
            <option value="">Tous les lieux</option>
            {lieux.map((lieu) => (
              <option key={lieu} value={lieu}>
                {lieu}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Trier par date</option>
            <option value="lieu">Trier par lieu</option>
          </select>
        </div>

        <AnimatePresence>
          {paginated.length > 0 ? (
            <EventList items={paginated} onOpenDetails={setSelectedEvent} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center text-gray-400 italic my-16">
              Aucun événement interne trouvé.
            </motion.div>
          )}
        </AnimatePresence>

        {maxPage > 1 && (
          <div className="flex gap-3 justify-center mt-8">
            <button
              className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-60"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}>
              Précédent
            </button>
            <span className="font-semibold text-blue-800">
              Page {page} / {maxPage}
            </span>
            <button
              className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-60"
              onClick={() => setPage(page + 1)}
              disabled={page === maxPage}>
              Suivant
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative"
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-blue-800 text-2xl font-bold"
                  aria-label="Fermer">
                  &times;
                </button>
                <EventDetail event={selectedEvent} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
