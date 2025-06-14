import React, { useState, useMemo, useEffect } from "react";
import Layout from "../components/common/Layout";
import NewsList from "../components/News/NewsList";
import NewsDetail from "../components/News/NewsDetail";
// import { mockActualites, mockEvenements } from "../data/mockData";
import { getAllNews } from "../services/newsService";
import { getAllEvents } from "../services/eventService";
import { AnimatePresence, motion } from "framer-motion";

// Fonction utilitaire distance (km, Haversine)
function distance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const villeCoords = {
  Casablanca: { lat: 33.5731, lng: -7.5898 },
  Rabat: { lat: 34.0209, lng: -6.8417 },
  Marrakech: { lat: 31.63, lng: -8.008 },
  // Ajoute d'autres villes si besoin
};

const ITEMS_PER_PAGE = 4;

export default function NewsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(""); // "Actualité" ou "Événement"
  const [filterLieu, setFilterLieu] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [userVille, setUserVille] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllNews()
      .then(setNews)
      .catch((err) => console.error(err));
    getAllEvents()
      .then(setEvents)
      .catch((err) => console.error(err));
  }, []);

  // ---------------------------------------------------------------Fusion (actualités + événements externes)
  const data = useMemo(
    () => [
      // ...mockActualites.map((a) => ({ ...a, type: "Actualité" })),
      // ...mockEvenements
      ...news.map((a) => ({ ...a, type: "Actualité" })),
      ...events
        .filter((e) => e.origine === "EXTERNE")
        .map((e) => ({ ...e, type: "Événement" })),
    ],
    // []
    [news, events]
  );

  // Recherche, filtrage
  let filtered = data
    .filter((item) => !filterType || item.type === filterType)
    .filter((item) => !filterLieu || item.lieu === filterLieu)
    .filter(
      (item) =>
        item.titre.toLowerCase().includes(search.toLowerCase()) ||
        (item.contenu?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.description?.toLowerCase() || "").includes(search.toLowerCase())
    );

  // Tri
  let sorted = [...filtered];
  if (sortBy === "date") {
    sorted.sort(
      (a, b) =>
        new Date(b.datePublication || b.date) -
        new Date(a.datePublication || a.date)
    );
  } else if (sortBy === "lieu") {
    sorted.sort((a, b) => (a.lieu || "").localeCompare(b.lieu || ""));
  } else if (sortBy === "localisation" && userVille) {
    const ref = villeCoords[userVille];
    if (ref) {
      sorted.sort((a, b) => {
        const distA = a.localisation
          ? distance(ref.lat, ref.lng, a.localisation.lat, a.localisation.lng)
          : 1e9;
        const distB = b.localisation
          ? distance(ref.lat, ref.lng, b.localisation.lat, b.localisation.lng)
          : 1e9;
        return distA - distB;
      });
    }
  }

  // Pinned d'abord
  sorted = [
    ...sorted.filter((item) => item.pinned),
    ...sorted.filter((item) => !item.pinned),
  ];

  // Pagination
  const maxPage = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  // Lieux uniques pour filtre
  const lieux = Array.from(
    new Set(data.map((item) => item.lieu).filter(Boolean))
  );

  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterLieu, sortBy, userVille]);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          Actualités & Événements Externes
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Tout</option>
            <option value="Actualité">Actualités</option>
            <option value="Événement">Événements</option>
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
            <option value="localisation">Le plus proche (par ville)</option>
          </select>
          {sortBy === "localisation" && (
            <select
              className="border rounded px-2 py-1"
              value={userVille}
              onChange={(e) => setUserVille(e.target.value)}>
              <option value="">Choisir ma ville…</option>
              {Object.keys(villeCoords).map((ville) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
            </select>
          )}
        </div>

        <AnimatePresence>
          {paginated.length > 0 ? (
            <NewsList items={paginated} onOpenDetails={setSelectedItem} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center text-gray-400 italic my-16">
              Aucun résultat.
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
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative"
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-blue-800 text-2xl font-bold"
                  aria-label="Fermer">
                  &times;
                </button>
                <NewsDetail item={selectedItem} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
