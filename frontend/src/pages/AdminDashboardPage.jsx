// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import StatsCard from '../components/Dashboard/StatsCard';
import Charts from '../components/Dashboard/Charts';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalMembers: 0,
    pendingArticles: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    // Mock temporaire ; remplacer par appels API
    setStats({
      totalTeams: 3,
      totalMembers: 12,
      pendingArticles: 5,
      upcomingEvents: 2,
    });
  }, []);

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
          <StatsCard label="Articles en attente" value={stats.pendingArticles} />
          <StatsCard label="Événements à venir" value={stats.upcomingEvents} />
        </div>

        {/* Graphiques (ex. articles par équipe) */}
        <div className="space-y-6">
          <Charts title="Articles par équipe" dataKey="articlesByTeam" />
          <Charts title="Participation aux événements" dataKey="eventParticipation" />
        </div>
      </div>
    </Layout>
  );
}
