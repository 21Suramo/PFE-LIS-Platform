// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages publiques
import HomePage from '../pages/HomePage';
import TeamsPage from '../pages/TeamsPage';
import TeamDetailPage from '../pages/TeamDetailPage';
import ArticlesPage from '../pages/ArticlesPage';
import NewsPage from '../pages/NewsPage';
import EventsPage from '../pages/EventsPage';

// Pages privées
import MemberPanelPage from '../pages/MemberPanelPage';
import LeaderDashboardPage from '../pages/LeaderDashboardPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

// Guard pour les routes protégées
import PrivateRoute from './PrivateRoute';

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
        path="/member-panel"
        element={
          <PrivateRoute roles={['MEMBRE', 'DOCTORANT']}>
            <MemberPanelPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader-dashboard"
        element={
          <PrivateRoute roles={['RESPONSABLE']}>
            <LeaderDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute roles={['DIRECTEUR']}>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />

      {/* Fallback : toute autre URL revient à l’accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
