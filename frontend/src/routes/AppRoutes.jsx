import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/common/PageTransition";
import FullPageSpinner from "../components/common/FullPageSpinner";
import PrivateRoute from "./PrivateRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const TeamsPage = lazy(() => import("../pages/TeamsPage"));
const TeamDetailPage = lazy(() => import("../pages/TeamDetailPage"));
const ArticlesPage = lazy(() => import("../pages/ArticlesPage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const EventsPage = lazy(() => import("../pages/EventsPage"));
const MemberPanelPage = lazy(() => import("../pages/MemberPanelPage"));
const LeaderDashboard = lazy(() => import("../pages/LeaderDashboardPage"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminTeams = lazy(() => import("../pages/admin/Teams"));
const AdminEvents = lazy(() => import("../pages/admin/Events"));
const AdminArticles = lazy(() => import("../pages/admin/Articles"));
const AdminNews = lazy(() => import("../pages/admin/News"));
const AdminControlPanel = lazy(() => import("../pages/admin/ControlPanel"));

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route
          path="/"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <HomePage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/teams"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <TeamsPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/teams/:id"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <TeamDetailPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/articles"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <ArticlesPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/news"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <NewsPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PageTransition>
                <EventsPage />
              </PageTransition>
            </Suspense>
          }
        />

        {/* Protected */}
        <Route
          path="/MemberPanelPage"
          element={
            <PrivateRoute roles={["MEMBRE", "RESPONSABLE", "DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <MemberPanelPage />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/leader-dashboard"
          element={
            <PrivateRoute roles={["RESPONSABLE"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <LeaderDashboard />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminDashboard />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminUsers />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminTeams />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminEvents />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminArticles />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminNews />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/panel"
          element={
            <PrivateRoute roles={["DIRECTEUR"]}>
              <Suspense fallback={<FullPageSpinner />}>
                <PageTransition>
                  <AdminControlPanel />
                </PageTransition>
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
