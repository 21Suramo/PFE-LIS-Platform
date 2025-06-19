import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import StatCards from "../components/Admin/StatCards";
import RecentArticles from "../components/Admin/RecentArticles";
import RecentEvents from "../components/Admin/RecentEvents";
import TeamTable from "../components/Admin/TeamTable";
import { getDashboardStats } from "../../src/services/dashboardService";
import { getAllArticles } from "../../src/services/articleService";
import { getAllEvents } from "../../src/services/eventService";
import { getAllTeams } from "../../src/services/teamService";

export default function AdminDashboard() {
  // Stats à afficher
  const [stats, setStats] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getDashboardStats()
      .then((data) =>
        setStats([
          { label: "Membres", value: data.users },
          { label: "Équipes", value: data.teams },
          { label: "Articles", value: data.articles },
          { label: "Événements", value: data.events },
        ])
      )
      .catch((err) => console.error(err));

    getAllArticles()
      .then(setArticles)
      .catch((err) => console.error(err));
    getAllEvents()
      .then(setEvents)
      .catch((err) => console.error(err));
    getAllTeams()
      .then(setTeams)
      .catch((err) => console.error(err));
  }, []);


  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">
          Dashboard Directeur
        </h1>
        <StatCards stats={stats} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <RecentArticles articles={articles.slice(0, 5)} />
          <RecentEvents
            events={events.filter((e) => e.origine === "LIS").slice(0, 5)}
          />
        </div>
        <div className="mt-10">
        <TeamTable equipes={teams} />
        </div>
      </div>
    </Layout>
  );
}
