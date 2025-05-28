// src/components/Team/TeamDetail.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamDetail({ team }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  /* pulled directly from populated team object */
  const leader   = team.leader   || null;
  const members  = team.membres  || team.members || [];
  const articles = team.articles || [];

  /* robust image URL */
  const API_BASE  = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const bannerSrc = team.imageUrl?.startsWith("http")
    ? team.imageUrl
    : `${API_BASE}${team.imageUrl || ""}`;

  return (
    <div className="space-y-8">
      {/* ========== Header & Leader ========== */}
      <div className="text-center">
        {team.imageUrl && (
          <img
            src={bannerSrc}
            alt={team.name || team.nom}
            className="w-full max-h-56 object-cover rounded-xl shadow"
          />
        )}

        {/* Title now shows the actual team name */}
        <h1 className="text-[1.75rem] sm:text-3xl font-extrabold text-blue-900 text-center mt-4">
          &nbsp;{team.name || team.nom}
        </h1>

        {/* Leader badge */}
        {leader && (
          <div className="mt-2 flex items-center justify-center gap-2">
            {leader.avatar && (
              <img
                src={leader.avatar}
                alt={leader.name || leader.nom}
                className="w-10 h-10 rounded-full border object-cover"
              />
            )}
            <span className="text-gray-700 font-medium">
              {leader.name || leader.nom}
            </span>
            {leader.speciality && (
              <span className="text-xs text-gray-500">
                ({leader.speciality})
              </span>
            )}
          </div>
        )}

        {team.specialite && (
          <div className="mt-2 text-sm text-gray-500">{team.specialite}</div>
        )}
      </div>

      {/* ========== Description / Objectif ========== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">🧾 Description</h2>
        <p className="text-gray-700">
          {team.objectif || team.description || "—"}
        </p>
      </div>

      {/* ========== Members (horizontal carousel) ========== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">👥 Membres</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {members.length ? (
            members.map((m) => (
              <div
                key={m._id}
                className="min-w-[180px] bg-gray-100 p-3 rounded shadow-sm flex items-center gap-3"
              >
                {m.avatar && (
                  <img
                    src={m.avatar}
                    alt={m.name || m.nom}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                )}
                <div>
                  <span className="font-medium">{m.name || m.nom}</span>
                  {m.speciality && (
                    <div className="text-xs text-gray-500">{m.speciality}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="italic text-gray-500">Aucun membre enregistré.</div>
          )}
        </div>
      </div>

      {/* ========== Articles ========== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          📄 Articles publiés
        </h2>
        {articles.length ? (
          <ul className="mt-2 space-y-2">
            {articles.map((a) => (
              <li
                key={a._id}
                className="bg-white p-3 border rounded shadow-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setSelectedArticle(a)}
              >
                <p className="font-medium">{a.titre}</p>
                {a.dateSoumission && (
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {a.dateSoumission.slice(0, 10)}
                  </p>
                )}
                {a.statut && (
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded ml-2 ${
                      a.statut === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.statut}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">
            Aucun article pour le moment.
          </p>
        )}
      </div>

      {/* ========== Article Mini-modal ========== */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
                aria-label="Fermer"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold">{selectedArticle.titre}</h3>
              {selectedArticle.dateSoumission && (
                <div className="text-xs text-gray-500 mb-2">
                  {selectedArticle.dateSoumission.slice(0, 10)}
                </div>
              )}
              <div className="mt-2">
                {selectedArticle.contenu || selectedArticle.resume}
              </div>
              {selectedArticle.statut && (
                <div className="mt-3 text-sm">
                  Statut :{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      selectedArticle.statut === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedArticle.statut}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== Projects Modal ========== */}
      {team.projects && team.projects.length > 0 && (
        <div>
          <button
            className="bg-lisBlue text-white px-4 py-2 rounded-full mt-6 hover:bg-blue-900 transition"
            onClick={() => setShowProjects(true)}
          >
            Voir tous les projets
          </button>

          <AnimatePresence>
            {showProjects && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowProjects(false)}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 relative"
                  initial={{ scale: 0.93, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowProjects(false)}
                    className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
                    aria-label="Fermer"
                  >
                    &times;
                  </button>
                  <h3 className="text-2xl font-bold mb-4 text-lisBlue">
                    Projets de l'équipe
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {team.projects.map((p, i) => (
                      <li key={i} className="text-gray-800">
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
