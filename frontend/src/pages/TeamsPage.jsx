// src/pages/TeamsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/common/Layout";
import SectionTitle from "../components/UI/SectionTitle";
import TeamList from "../components/Team/TeamList";
import TeamDetail from "../components/Team/TeamDetail";
import { UsersIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAllTeams } from "../services/teamService";

const ITEMS_PER_PAGE = 4;          // ← identical to NewsPage

export default function TeamsPage() {
  /* ───────── data ───────── */
  const [teams, setTeams]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  /* ───────── ui state ───────── */
  const [search, setSearch]             = useState("");
  const [filterSpec, setFilterSpec]     = useState("");
  const [sortBy, setSortBy]             = useState("name");
  const [page, setPage]                 = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);

  /* ───────── fetch once ───────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTeams();
        setTeams(data || []);
      } catch (e) {
        console.error(e);
        setError("Impossible de charger les équipes.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ───────── filtering / sorting ───────── */
  const processed = useMemo(() => {
    let list = [...teams];

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name?.toLowerCase().includes(s) ||
          t.description?.toLowerCase().includes(s)
      );
    }

    if (filterSpec) list = list.filter((t) => t.specialite === filterSpec);

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "leader") {
      list.sort((a, b) =>
        (a.leader?.nom || "").localeCompare(b.leader?.nom || "")
      );
    }

    return list;
  }, [teams, search, filterSpec, sortBy]);

  /* ───────── pagination ───────── */
  useEffect(() => setPage(1), [search, filterSpec, sortBy]);
  const maxPage   = Math.ceil(processed.length / ITEMS_PER_PAGE);
  const paginated = processed.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const specs = useMemo(
    () => Array.from(new Set(teams.map((t) => t.specialite).filter(Boolean))),
    [teams]
  );

  /* ───────── loading / error ───────── */
  if (loading)
    return (
      <Layout>
        <div className="py-12 text-center">Chargement des équipes…</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="py-12 text-center text-red-500">{error}</div>
      </Layout>
    );

  /* ───────── ui ───────── */
  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <SectionTitle
          icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
          title="Nos équipes de recherche"
          subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
        />

        {/* filter-bar (same order as News) */}
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
            value={filterSpec}
            onChange={(e) => setFilterSpec(e.target.value)}
          >
            <option value="">Toutes spécialités</option>
            {specs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Trier par nom</option>
            <option value="leader">Trier par chef d’équipe</option>
          </select>
        </div>

        {/* grid + empty state wrapped so pagination hugs bottom */}
        <div className="mb-8">
          <AnimatePresence>
            {paginated.length ? (
              <TeamList
                teams={paginated}
                onOpenDetails={setSelectedTeam}
              />
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
        </div>

        {/* pagination block identical to News */}
        {maxPage > 1 && (
          <div className="flex gap-3 justify-center">
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

        {/* modal */}
        <AnimatePresence>
          {selectedTeam && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 relative"
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-blue-800 text-2xl font-bold"
                  aria-label="Fermer"
                >
                  &times;
                </button>
                <TeamDetail team={selectedTeam} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
