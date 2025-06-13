// src/pages/admin/Teams.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/common/Layout";
import TeamFormModal from "../../components/Admin/TeamFormModal";
import { mockEquipes, mockUtilisateurs } from "../../data/mockData";

const PER_PAGE = 6;
function paginate(arr, size, page) {
  return arr.slice((page - 1) * size, page * size);
}

export default function Teams() {
  const [teams, setTeams] = useState(mockEquipes);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Récupère les responsables pour la select du modal
  const leaders = useMemo(
    () => mockUtilisateurs.filter((u) => u.role === "RESPONSABLE"),
    []
  );

  // Filtre + pagination
  const filtered = teams.filter(
    (t) =>
      t.nom.toLowerCase().includes(search.toLowerCase()) ||
      t.specialite.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageTeams = paginate(filtered, PER_PAGE, page);

  // Save (add ou edit)
  const saveTeam = (data) => {
    if (editing) {
      setTeams((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t))
      );
    } else {
      setTeams((prev) => [
        ...prev,
        { ...data, id: Date.now(), membres: [], axeRechercheId: null },
      ]);
    }
    setModalOpen(false);
    setEditing(null);
  };
  // Delete
  const deleteTeam = (id) => {
    console.log("Deleting team", id);
    setTeams((p) => p.filter((t) => t.id !== id));
  };

  // Effet 3D au survol (allégé)
  const row3d = {
    whileHover: { scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
    transition: { type: "spring", stiffness: 200, damping: 20 },
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl font-bold text-lisBlue mb-6">
          Gérer les équipes
        </h1>

        {/* Barre de recherche + ajout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher nom ou spécialité…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => {
              console.log("Opening add modal");
              setEditing(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
            ➕ Ajouter équipe
          </button>
        </div>

        {/* Tableau */}
        <div className="bg-white/90 rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Spécialité</th>
                <th className="px-4 py-3 text-left">Leader</th>
                <th className="px-4 py-3 text-left"># Membres</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageTeams.map((t) => {
                const leaderName =
                  mockUtilisateurs.find((u) => u.id === t.leaderId)?.nom || "—";
                return (
                  <motion.tr
                    key={t.id}
                    {...row3d}
                    className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{t.nom}</td>
                    <td className="px-4 py-3">{t.specialite}</td>
                    <td className="px-4 py-3">{leaderName}</td>
                    <td className="px-4 py-3">{t.membres.length}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Editing team", t.id);
                          setEditing(t);
                          setModalOpen(true);
                        }}
                        className="px-2 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 text-xs transition cursor-pointer">
                        ✏️ Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTeam(t.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition cursor-pointer">
                        🗑 Supprimer
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Aucune équipe trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border bg-white shadow disabled:opacity-50 cursor-pointer">
              ← Précédent
            </button>
            <span>
              Page {page} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-3 py-1 rounded border bg-white shadow disabled:opacity-50 cursor-pointer">
              Suivant →
            </button>
          </div>
        )}

        {/* Modal d’ajout/édition */}
        <TeamFormModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={saveTeam}
          initialTeam={editing}
          leaders={leaders}
        />
      </div>
    </Layout>
  );
}
