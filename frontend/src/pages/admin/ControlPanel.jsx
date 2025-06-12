import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import UserFormModal from "../../components/Admin/UserFormModal";
import NewsFormModal from "../../components/Admin/NewsFormModal";
import {
  mockUtilisateurs,
  mockArticles,
  mockActualites,
} from "../../data/mockData";

export default function ControlPanel() {
  // Users
  const [users, setUsers] = useState(mockUtilisateurs);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Articles
  const [articles, setArticles] = useState(mockArticles);

  // News
  const [newsList, setNewsList] = useState(mockActualites);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // CRUD mock
  const handleAddUser = (user) =>
    setUsers([...users, { ...user, id: Date.now() }]);
  const handleEditUser = (id, userData) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, ...userData } : u)));
  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const handleApproveArticle = (id) =>
    setArticles(
      articles.map((a) => (a.id === id ? { ...a, statut: "APPROVED" } : a))
    );
  const handleRefuseArticle = (id) =>
    setArticles(
      articles.map((a) => (a.id === id ? { ...a, statut: "REFUSED" } : a))
    );

  const handleAddNews = (news) =>
    setNewsList([
      ...newsList,
      {
        ...news,
        id: Date.now(),
        datePublication: new Date().toISOString().slice(0, 10),
      },
    ]);
  const handleDeleteNews = (id) =>
    setNewsList(newsList.filter((n) => n.id !== id));

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-lisBlue mb-8">
            Panneau de contrôle admin
          </h1>
          {/* UTILISATEURS */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-lisBlue">Utilisateurs</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setEditUser(null);
                  setShowUserModal(true);
                }}>
                ➕ Ajouter utilisateur
              </button>
            </div>
            <UserFormModal
              isOpen={showUserModal}
              onClose={() => setShowUserModal(false)}
              onSave={(user) => {
                if (editUser) handleEditUser(editUser.id, user);
                else handleAddUser(user);
                setShowUserModal(false);
              }}
              initialUser={editUser}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white/90 rounded-2xl shadow">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Spécialité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-b-0 hover:bg-blue-50">
                      <td>{user.nom}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.speciality || ""}</td>
                      <td>
                        <button
                          className="px-2 py-1 bg-yellow-400 text-white rounded text-xs mr-2 hover:bg-yellow-500"
                          onClick={() => {
                            setEditUser(user);
                            setShowUserModal(true);
                          }}>
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          onClick={() => handleDeleteUser(user.id)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-gray-400 py-6">
                        Aucun utilisateur.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ARTICLES EN ATTENTE */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-lisBlue mb-4">
              Articles en attente
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white/90 rounded-2xl shadow">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles
                    .filter((a) => a.statut === "PENDING")
                    .map((a) => (
                      <tr
                        key={a.id}
                        className="border-b last:border-b-0 hover:bg-yellow-50">
                        <td>{a.titre}</td>
                        <td>{a.auteur}</td>
                        <td>{a.statut}</td>
                        <td>
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs mr-2 hover:bg-green-600"
                            onClick={() => handleApproveArticle(a.id)}>
                            Approuver
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            onClick={() => handleRefuseArticle(a.id)}>
                            Refuser
                          </button>
                        </td>
                      </tr>
                    ))}
                  {articles.filter((a) => a.statut === "PENDING").length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-gray-400 py-6">
                        Aucun article en attente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ACTUALITÉS */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-lisBlue">Actualités</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowNewsModal(true)}>
                ➕ Ajouter actualité
              </button>
            </div>
            <NewsFormModal
              isOpen={showNewsModal}
              onClose={() => setShowNewsModal(false)}
              onSave={(news) => {
                handleAddNews(news);
                setShowNewsModal(false);
              }}
            />
            <ul>
              {newsList.map((news) => (
                <li
                  key={news.id}
                  className="py-1 border-b last:border-b-0 flex justify-between items-center">
                  <span className="font-semibold">{news.titre}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {news.datePublication}
                  </span>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 ml-2"
                    onClick={() => handleDeleteNews(news.id)}>
                    Supprimer
                  </button>
                </li>
              ))}
              {newsList.length === 0 && (
                <li className="text-center text-gray-400 py-6">
                  Aucune actualité.
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
