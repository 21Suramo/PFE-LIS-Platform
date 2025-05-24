import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import UserFormModal from "../../components/Admin/UserFormModal";
import { mockUtilisateurs } from "../../data/mockData";

export default function Users() {
  const [users, setUsers] = useState(mockUtilisateurs);
  const [search, setSearch] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = (user) =>
    setUsers([...users, { ...user, id: Date.now() }]);
  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const handleEditUser = (id, userData) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, ...userData } : u)));

  const filtered = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-2xl font-bold text-lisBlue mb-8">
          Gérer les utilisateurs
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche utilisateur…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full max-w-md"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
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
        <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Spécialité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-b-0 hover:bg-blue-50">
                  <td className="py-2">{user.nom}</td>
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-6">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
