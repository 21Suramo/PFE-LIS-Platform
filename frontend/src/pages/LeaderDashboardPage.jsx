import React, { useState } from "react";
import Layout from "../components/common/Layout";
import { useAuth } from "../contexts/AuthContext";
import { mockEquipes, mockArticles, mockUtilisateurs } from "../data/mockData";

export default function LeaderDashboardPage() {
  const { user } = useAuth();

  // On récupère le responsable dans le mock, puis son équipe
  const leader = mockUtilisateurs.find((u) => u.email === user?.email);
  const team = mockEquipes.find((eq) => eq.leaderId === leader?.id);

  // On filtre les articles de l'équipe qui sont en attente
  const initialTeamArticles =
    team && team.articles
      ? team.articles
          .map((id) => mockArticles.find((a) => a.id === id))
          .filter((a) => a && a.statut === "PENDING")
      : [];

  // Si tu veux permettre la validation dynamique :
  const [teamArticles, setTeamArticles] = useState(initialTeamArticles);

  const handleApprove = (id) => {
    setTeamArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statut: "APPROVED" } : a))
    );
    // Ici tu pourrais aussi modifier le statut dans le mockArticles global si besoin
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Tableau de bord Responsable
        </h1>
        <h2 className="text-2xl font-semibold text-primaryDark mb-4">
          Articles en attente de validation
        </h2>
        <div className="space-y-4">
          {teamArticles.length > 0 ? (
            teamArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm">
                <div>
                  <h3 className="text-xl font-medium">{article.titre}</h3>
                  <p className="text-sm text-gray-600">
                    Auteur : {article.auteur || "—"}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Statut : {article.statut}
                  </p>
                </div>
                <button
                  onClick={() => handleApprove(article.id)}
                  className="bg-primaryDark text-white py-2 px-4 rounded">
                  Valider
                </button>
              </div>
            ))
          ) : (
            <p className="italic text-gray-500">Aucun article en attente.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
