import React, { useState } from "react";
// import { mockUtilisateurs, mockArticles } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { getFileUrl } from "../../utils/fileUrl";

export default function TeamDetail({ team }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  // const leader = mockUtilisateurs.find((u) => u.id === team.leaderId);
  // const membres = team.membres
  //   .map((id) => mockUtilisateurs.find((u) => u.id === id))
  //   .filter(Boolean);
  // const articles = (team.articles || [])
  //   .map((id) => mockArticles.find((a) => a.id === id))
  //   .filter(Boolean);
  const leader = team.leader;
  const membres = Array.isArray(team.membres) ? team.membres : [];
  const articles = Array.isArray(team.articles)
    ? team.articles
    : team.article
    ? [team.article]
    : [];

  return (
    <div className="space-y-8">
      {/* En-tête et leader */}
      <div className="text-center">
        <img
          src={getFileUrl(team.imageUrl)}
          alt={team.name}
          className="w-full max-h-56 object-cover rounded-xl shadow"
        />
        <h1 className="text-2xl font-bold text-lisBlue mt-4">{team.name}</h1>
        {leader && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <img
              src={getFileUrl(leader.avatar)}
              alt={leader.nom}
              className="w-10 h-10 rounded-full border object-cover"
            />
            <span className="text-gray-700 font-medium">{leader.nom}</span>
            <span className="text-xs text-gray-500">({leader.speciality})</span>
          </div>
        )}
        <div className="mt-2 text-sm text-gray-500">{team.specialite}</div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          🧾 Description
        </h2>
        <p className="text-gray-700">{team.objectifs || team.description}</p>
      </div>

      {/* Membres : carrousel horizontal */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">👥 Membres</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {membres.length ? (
            membres.map((member) => (
              <div
              key={member._id || member.id}
                className="min-w-[180px] bg-gray-100 p-3 rounded shadow-sm flex items-center gap-3">
                <img
                  src={getFileUrl(member.avatar)}
                  alt={member.nom}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <div>
                  <span className="font-medium">{member.nom}</span>
                  <div className="text-xs text-gray-500">
                    {member.speciality}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="italic text-gray-500">Aucun membre enregistré.</div>
          )}
        </div>
      </div>

      {/* Articles : clic = mini-modal */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          📄 Articles publiés
        </h2>
        {articles.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {articles.map((article) => (
              <li
              key={article._id || article.id}
                className="bg-white p-3 border rounded shadow-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setSelectedArticle(article)}>
                <p className="font-medium">{article.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <span
                  className={`inline-block text-xs px-2 py-1 rounded ml-2 ${article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                  {article.statut}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">
            Aucun article pour le moment.
          </p>
        )}
      </div>

      {/* Mini-modal détail article */}
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

      {/* Bouton/Modal Projets */}
      {team.projects && team.projects.length > 0 && (
        <div>
          <button
            className="bg-lisBlue text-white px-4 py-2 rounded-full mt-6 hover:bg-blue-900 transition"
            onClick={() => setShowProjects(true)}>
            Voir tous les projets
          </button>
          <AnimatePresence>
            {showProjects && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowProjects(false)}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 relative"
                  initial={{ scale: 0.93, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setShowProjects(false)}
                    className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
                    aria-label="Fermer">
                    &times;
                  </button>
                  <h3 className="text-2xl font-bold mb-4 text-lisBlue">
                    Projets de l'équipe
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {team.projects.map((project, i) => (
                      <li key={i} className="text-gray-800">
                        {project}
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
