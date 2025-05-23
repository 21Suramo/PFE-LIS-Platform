import React from "react";
import Layout from "../components/common/Layout";
import StatsCard from "../components/Dashboard/StatsCard";
import Charts from "../components/Dashboard/Charts";
import { useAuth } from "../contexts/AuthContext";
import {
  mockEquipes,
  mockUtilisateurs,
  mockArticles,
  mockEvenements,
} from "../data/mockData";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  // Calculs dynamiques à partir du mock
  const stats = {
    totalTeams: mockEquipes.length,
    totalMembers: mockUtilisateurs.length,
    pendingArticles: mockArticles.filter((a) => a.statut === "PENDING").length,
    upcomingEvents: mockEvenements.length,
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark">
          Tableau de bord Administrateur
        </h1>
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard label="Équipes" value={stats.totalTeams} />
          <StatsCard label="Membres" value={stats.totalMembers} />
          <StatsCard
            label="Articles en attente"
            value={stats.pendingArticles}
          />
          <StatsCard label="Événements à venir" value={stats.upcomingEvents} />
        </div>
        {/* Graphiques (ex. articles par équipe) */}
        <div className="space-y-6">
          <Charts title="Articles par équipe" dataKey="articlesByTeam" />
          <Charts
            title="Participation aux événements"
            dataKey="eventParticipation"
          />
        </div>
      </div>
    </Layout>
  );
}
