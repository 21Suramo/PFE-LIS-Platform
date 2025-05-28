import React, { useState } from "react";
import Layout from "../components/common/Layout";
import { useAuth } from "../contexts/AuthContext";
import { mockArticles, mockEquipes, mockUtilisateurs } from "../data/mockData";

export default function LeaderDashboardPage() {
  const { user } = useAuth();
  const team = mockEquipes.find((eq) => eq.responsableId === user?.id);
  const [equipe, setEquipe] = useState(team);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const articles = mockArticles.filter(
    (a) => a.statut === "PENDING" && equipe?.membres?.includes(a.auteurId)
  );
  const [localArticles, setLocalArticles] = useState(articles);

  const handleApprove = (articleId) => {
    setLocalArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, statut: "APPROVED" } : a))
    );
  };

  const handleRemoveMember = (memberId) => {
    setEquipe((prev) => ({
      ...prev,
      membres: prev.membres.filter((id) => id !== memberId),
    }));
  };

  const handleAddMember = () => {
    const allMembers = mockUtilisateurs.filter(
      (u) => u.role === "MEMBRE" && !equipe.membres.includes(u.id)
    );
    const random = allMembers[Math.floor(Math.random() * allMembers.length)];
    if (random) {
      setEquipe((prev) => ({
        ...prev,
        membres: [...prev.membres, random.id],
      }));
    } else {
      alert("Aucun membre disponible à ajouter.");
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">
          Tableau de bord Responsable
        </h1>

        {/* Articles à valider */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-primaryDark mb-4">
            Articles à valider
          </h2>

          {localArticles.length === 0 ? (
            <p className="text-gray-500">Aucun article en attente.</p>
          ) : (
            <table className="w-full text-sm bg-white/90 rounded-xl shadow overflow-hidden">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 px-4">Titre</th>
                  <th>Auteur</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {localArticles.map((article) => {
                  const auteur = mockUtilisateurs.find(
                    (u) => u.id === article.auteurId
                  );
                  return (
                    <tr key={article.id} className="border-b last:border-none">
                      <td className="py-2 px-4">{article.titre}</td>
                      <td>{auteur?.fullName}</td>
                      <td>
                        <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs">
                          {article.statut}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleApprove(article.id)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                          Valider
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Membres de l'équipe */}
        <section>
          <h2 className="text-xl font-semibold text-primaryDark mb-4">
            Gestion des membres de l’équipe
          </h2>

          {equipe?.membres?.length > 0 ? (
            <ul className="space-y-3">
              {equipe.membres.map((memberId) => {
                const membre = mockUtilisateurs.find((u) => u.id === memberId);
                return (
                  <li
                    key={memberId}
                    className="flex justify-between items-center border p-3 rounded bg-white shadow">
                    <div>
                      <p className="font-semibold">{membre?.fullName}</p>
                      <p className="text-sm text-gray-500">{membre?.email}</p>
                    </div>
                    <button
                      onClick={() => setMemberToDelete(memberId)}
                      className="text-red-600 hover:underline text-sm">
                      🗑 Supprimer
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              Aucun membre actuellement dans l’équipe.
            </p>
          )}

          <button
            onClick={handleAddMember}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            ➕ Ajouter un membre
          </button>
        </section>

        {/* Modal de confirmation suppression */}
        {memberToDelete && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
              <h3 className="text-lg font-semibold mb-4">
                Confirmer la suppression
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                Êtes-vous sûr de vouloir retirer ce membre de votre équipe ?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setMemberToDelete(null)}>
                  Annuler
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => {
                    handleRemoveMember(memberToDelete);
                    setMemberToDelete(null);
                  }}>
                  Supprimer
                </button>
              </div>
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setMemberToDelete(null)}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
