// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages publiques
import HomePage from "../pages/HomePage";
import TeamsPage from "../pages/TeamsPage";
import TeamDetailPage from "../pages/TeamDetailPage";
import ArticlesPage from "../pages/ArticlesPage";
import NewsPage from "../pages/NewsPage";
import EventsPage from "../pages/EventsPage";

// Pages privées
//Mmembre
import MemberPanelPage from "../pages/MemberPanelPage";
//Resp
import LeaderDashboardPage from "../pages/LeaderDashboardPage";
//admin
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminTeams from "../pages/admin/Teams";
import AdminEvents from "../pages/admin/Events";
import AdminArticles from "../pages/admin/Articles";
import AdminNews from "../pages/admin/News";
import AdminControlPanel from "../pages/admin/ControlPanel";

// Guard pour les routes protégées
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<HomePage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:id" element={<TeamDetailPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/events" element={<EventsPage />} />

      {/* Routes protégées */}
      <Route
        path="/MemberPanelPage"
        element={
          <PrivateRoute roles={["MEMBRE"]}>
            <MemberPanelPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader-dashboard"
        element={
          <PrivateRoute roles={["RESPONSABLE"]}>
            <LeaderDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminUsers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/teams"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminTeams />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminEvents />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminArticles />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/news"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminNews />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/panel"
        element={
          <PrivateRoute roles={["DIRECTEUR"]}>
            <AdminControlPanel />
          </PrivateRoute>
        }
      />
      {/* Fallback : toute autre URL revient à l’accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
