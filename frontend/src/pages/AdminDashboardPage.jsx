import React from "react";
import Layout from "../components/common/Layout";
import StatCards from "../components/Admin/StatCards";
import RecentArticles from "../components/Admin/RecentArticles";
import RecentEvents from "../components/Admin/RecentEvents";
import TeamTable from "../components/Admin/TeamTable";
import {
  mockEquipes,
  mockUtilisateurs,
  mockArticles,
  mockEvenements,
} from "../data/mockData";

export default function AdminDashboard() {
  // Stats à afficher
  const stats = [
    { label: "Membres", value: mockUtilisateurs.length },
    { label: "Équipes", value: mockEquipes.length },
    { label: "Articles", value: mockArticles.length },
    {
      label: "Événements",
      value: mockEvenements.filter((e) => e.origine === "INTERNE").length,
    },
  ];

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">
          Dashboard Directeur
        </h1>
        <StatCards stats={stats} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <RecentArticles articles={mockArticles.slice(0, 5)} />
          <RecentEvents
            events={mockEvenements
              .filter((e) => e.origine === "INTERNE")
              .slice(0, 5)}
          />
        </div>
        <div className="mt-10">
          <TeamTable equipes={mockEquipes} />
        </div>
      </div>
    </Layout>
  );
}
