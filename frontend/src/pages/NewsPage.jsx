import React, { useState, useMemo, useEffect } from "react";
import Layout from "../components/common/Layout";
import NewsList from "../components/News/NewsList";
import NewsDetail from "../components/News/NewsDetail";
// Remove mock data imports:
// import { mockActualites, mockEvenements } from "../data/mockData";
import { getAllActualites } from "../services/newsService"; // Import your service
import { AnimatePresence, motion } from "framer-motion";

// The distance function and villeCoords might not be usable if 'localisation' data isn't in your backend Actualite model.
// Keep them if you plan to add such features later or for other types of items if you merge them.
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
};

const ITEMS_PER_PAGE = 4;

export default function NewsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newsItems, setNewsItems] = useState([]); // State for fetched actualités
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states (some might become less relevant or need adjustment)
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(""); // Will mostly filter for "Actualité" if that's the only data source
  const [filterLieu, setFilterLieu] = useState(""); // Backend Actualite model doesn't have 'lieu'
  const [sortBy, setSortBy] = useState("date"); // 'date' will map to 'datePublication'
  const [userVille, setUserVille] = useState(""); // Geolocation sorting won't work with current Actualite model
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const fetchedActualites = await getAllActualites(); // API Call
        // Assign a 'type' property if NewsCard/NewsDetail expect it,
        // or modify those components to not require it for 'Actualite' items.
        const itemsWithType = (fetchedActualites || []).map(act => ({
             ...act, 
             type: "Actualité" // Manually adding type for frontend components if needed
        }));
        setNewsItems(itemsWithType);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch news items:", err);
        setError(err.message || "Could not load news.");
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const processedAndSortedItems = useMemo(() => {
    let itemsToProcess = [...newsItems];

    // Search filter (works on titre and contenu from backend)
    if (search) {
      itemsToProcess = itemsToProcess.filter(
        (item) =>
          (item.titre && item.titre.toLowerCase().includes(search.toLowerCase())) ||
          (item.contenu && item.contenu.toLowerCase().includes(search.toLowerCase()))
          // item.description is not in Actualite model, remove or adapt if added
      );
    }

    // Type filter
    // If this page ONLY shows 'Actualité' from the backend, this filter might be simplified.
    // If you merge with 'Événements Externes' (fetched from /api/events), then it's useful.
    if (filterType) {
      itemsToProcess = itemsToProcess.filter((item) => item.type === filterType);
    }

    // Lieu filter - This won't be effective as 'lieu' is not in the backend 'Actualite' model.
    // If 'lieu' were added to the Actualite model, this would work:
    // if (filterLieu) {
    //   itemsToProcess = itemsToProcess.filter((item) => item.lieu === filterLieu);
    // }

    // Sorting
    if (sortBy === "date") {
      // Backend 'Actualite' model has 'datePublication'
      itemsToProcess.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
    }
    // Sorting by 'lieu' and 'localisation' is removed as these fields are not in the backend 'Actualite' model.
    // else if (sortBy === "lieu") {
    //   itemsToProcess.sort((a, b) => (a.lieu || "").localeCompare(b.lieu || ""));
    // } else if (sortBy === "localisation" && userVille) { ... }


    // Pinned items first (backend 'Actualite' model has 'pinned' field)
    itemsToProcess = [
      ...itemsToProcess.filter((item) => item.pinned),
      ...itemsToProcess.filter((item) => !item.pinned),
    ];

    return itemsToProcess;
  }, [newsItems, search, filterType, /* filterLieu (won't work), */ sortBy /*, userVille (won't work) */]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterLieu, sortBy, userVille]);

  // Pagination
  const maxPage = Math.ceil(processedAndSortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = processedAndSortedItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Lieux uniques for filtre - This will be an empty array if 'lieu' is not in fetched items.
  const lieux = useMemo(() => Array.from(
    new Set(newsItems.map((item) => item.lieu).filter(Boolean))
  ), [newsItems]);


  if (loading) return <Layout><div className="text-center py-10">Chargement des actualités...</div></Layout>;
  if (error) return <Layout><div className="text-center py-10 text-red-500">Erreur: {error}</div></Layout>;

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          Actualités
          {/* Title changed to reflect only 'Actualités' if not merging external events */}
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
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Tout afficher</option>
            <option value="Actualité">Actualités</option>
            {/* <option value="Événement">Événements</option>  Remove if not merging events */}
          </select>
          
          {/* Lieu filter - may be non-functional or removed */}
          <select
            className="border rounded px-2 py-1"
            value={filterLieu}
            onChange={(e) => setFilterLieu(e.target.value)}
            disabled={lieux.length === 0} // Disable if no lieux are available
          >
            <option value="">Tous les lieux</option>
            {lieux.map((lieu) => (
              <option key={lieu} value={lieu}>{lieu}</option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Trier par date</option>
            {/* Remove sort options that are no longer supported by backend data */}
            {/* <option value="lieu">Trier par lieu</option> */}
            {/* <option value="localisation">Le plus proche (par ville)</option> */}
          </select>
          {/* Geolocation city selector removed as it's not supported by current backend data */}
          {/* {sortBy === "localisation" && ( ... )} */}
        </div>

        <AnimatePresence>
          {paginatedItems.length > 0 ? (
            <NewsList items={paginatedItems} onOpenDetails={setSelectedItem} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center text-gray-400 italic my-16"
            >
              Aucun résultat.
            </motion.div>
          )}
        </AnimatePresence>

        {maxPage > 1 && (
          <div className="flex gap-3 justify-center mt-8">
            <button
              className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-60"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </button>
            <span className="font-semibold text-blue-800">
              Page {page} / {maxPage}
            </span>
            <button
              className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-60"
              onClick={() => setPage(page + 1)}
              disabled={page === maxPage}
            >
              Suivant
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" // Added padding for modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 relative" // Adjusted padding
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-blue-800 text-2xl font-bold"
                  aria-label="Fermer"
                >
                  &times;
                </button>
                {/* Ensure NewsDetail component is compatible with the structure of 'selectedItem' 
                  (which comes from your backend Actualite model now).
                  It expects fields like: titre, datePublication/date, contenu/description, imageUrl, type, pinned, lieu, localisation.
                  Some of these (lieu, localisation, original 'type' for event vs actualite) are not in the backend Actualite model.
                */}
                <NewsDetail item={selectedItem} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}