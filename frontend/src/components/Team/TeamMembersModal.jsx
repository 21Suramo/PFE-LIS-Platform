import React, { useState } from "react";
// import { mockUtilisateurs, mockArticles } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { getFileUrl } from "../../utils/fileUrl";

export default function TeamMembersModal({ team, onClose }) {
  const [selectedMember, setSelectedMember] = useState(null);

  // Récupère les membres comme objets depuis leur id
  // const membres = team.membres
  //   .map((id) => mockUtilisateurs.find((u) => u.id === id))
  //   .filter(Boolean);
  const membres = Array.isArray(team.membres) ? team.membres : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div
          className="bg-white w-full max-w-3xl mx-4 p-6 rounded-2xl shadow-2xl relative"
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold text-lisBlue mb-6">
            👥 Membres de {team.name}
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-3">
            {membres.map((member) => (
              <div
              key={member._id || member.id}
                className="min-w-[220px] bg-gray-50 rounded-xl p-4 shadow flex flex-col items-center relative group">
                <img
                  src={getFileUrl(member.avatar)}
                  alt={member.nom}
                  className="w-16 h-16 rounded-full object-cover border-2 border-lisBlue shadow"
                />
                <p className="text-sm font-semibold text-gray-800 mt-3">
                  {member.nom}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  {member.speciality}
                </p>
                {/* Bouton voir articles */}
                {member.articles && member.articles.length > 0 && (
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-lisBlue underline text-xs font-medium mt-2 group-hover:scale-105 transition">
                    📄 Voir articles ({member.articles.length})
                  </button>
                )}
              </div>
            ))}
            {membres.length === 0 && (
              <div className="italic text-gray-500">
                Aucun membre enregistré.
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Fermer">
            &times;
          </button>

          {/* Mini-modal articles du membre */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6 relative"
                  initial={{ scale: 0.93, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
                    aria-label="Fermer">
                    &times;
                  </button>
                  <h3 className="text-xl font-bold mb-4">
                    Articles de {selectedMember.nom}
                  </h3>
                  {selectedMember.articles?.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedMember.articles.map((art) => (
                        <li
                          key={art._id || art.id}
                          className="bg-gray-100 px-4 py-2 rounded shadow-sm"
                        >
                          <p className="font-medium">{art.title}</p>
                          {art.createdAt && (
                            <p className="text-xs text-gray-500">
                              {new Date(art.createdAt).toLocaleDateString()}
                            </p>
                            )}
                          {art.statut && (
                            <span
                            className={`inline-block text-xs px-2 py-1 rounded ml-2 ${art.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                            >
                              {art.statut}
                            </span>
                          )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <div className="italic text-gray-500">
                      Aucun article pour ce membre.
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
