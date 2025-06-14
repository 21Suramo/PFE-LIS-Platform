// import React, { useState, useMemo } from "react";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFileUrl } from "../../utils/fileUrl";
import Layout from "../../components/common/Layout";
import UserFormModal from "../../components/Admin/UserFormModal";
// import { mockUtilisateurs, mockEquipes } from "../../data/mockData";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../services/userService";
import { getAllTeams, addMemberToTeam } from "../../services/teamService";

const USERS_PER_PAGE = 8;
function paginate(array, pageSize, pageNumber) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export default function Users() {
  // const [users, setUsers] = useState(mockUtilisateurs);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
    getAllTeams().then(setTeams).catch(console.error);
  }, []);


  // Liste unique des rôles pour le filtre
  const roles = useMemo(
    // () => Array.from(new Set(mockUtilisateurs.map((u) => u.role))),
    // []
    () =>
      Array.from(
        new Set(
          users.map((u) => (u.role === "RESPONSABLE" ? "MEMBRE" : u.role))
        )
      ),
  );

  // Filtrer + rechercher
  const filtered = users
    .filter(
      (u) =>
        u.nom.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) =>
      !filterRole ||
      (filterRole === "MEMBRE"
        ? u.role === "MEMBRE" || u.role === "RESPONSABLE"
        : u.role === filterRole)
    );

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  const usersToShow = paginate(filtered, USERS_PER_PAGE, page);

  // Actions CRUD mock
  // const handleAddUser = (userData) => {
  //   setUsers((prev) => [
  //     ...prev,
  //     { ...userData, id: Date.now(), avatar: "/avatars/default.jpg" },
  //   ]);
  // };
  // const handleEditUser = (id, userData) => {
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === id ? { ...u, ...userData } : u))
  //   );
  // };
  // const handleDeleteUser = (id) => {
  //   setUsers((prev) => prev.filter((u) => u.id !== id));
  // };
  // Actions CRUD via API
  async function handleAddUser(userData) {
    try {
      const payload = {
        name: userData.nom,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        speciality: userData.speciality,
      };
      const { user } = await createUser(payload);
      setUsers((prev) => [...prev, user]);
      if (userData.teamId && userData.role !== "RESPONSABLE") {
        try {
          const updatedTeam = await addMemberToTeam(userData.teamId, user._id);
          setTeams((prev) =>
            prev.map((t) => (t._id === updatedTeam._id ? updatedTeam : t))
          );
        } catch (err) {
          console.error('Failed to add member to team:', err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditUser(id, userData) {
    try {
      const payload = {
        nom: userData.nom,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        speciality: userData.speciality,
      };
      const { user } = await updateUser(id, payload);
      setUsers((prev) => prev.map((u) => (u._id === id ? user : u)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Variants 3D pour chaque ligne
  const row3d = {
    whileHover: { scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 200, damping: 20 },
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl font-bold text-lisBlue mb-6">
          Gérer les utilisateurs
        </h1>

        {/* Barre de filtres et bouton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Recherche nom ou email…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Tous rôles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setEditUser(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            ➕ Ajouter utilisateur
          </button>
        </div>

        {/* Tableau responsive */}
        <div className="overflow-x-auto bg-white/90 rounded-2xl shadow p-2">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Avatar</th>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Rôle</th>
                <th className="p-3 text-left">Spécialité</th>
                <th className="p-3 text-left">Équipes</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersToShow.map((u) => {
                // Récupère les équipes où l'utilisateur est membre ou leader
                const userTeams =
                  // mockEquipes
                  teams
                    .filter(
                      // (eq) => eq.membres.includes(u.id) || eq.leaderId === u.id
                      (eq) =>
                        eq.membres?.includes(u._id) || eq.leader?._id === u._id
                    )
                    .map((eq) => eq.name)
                    .join(", ") || "—";

                return (
                  <motion.tr
                    // key={u.id}
                    key={u._id || u.id}
                    {...row3d}
                    className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={getFileUrl(u.avatar)}
                        alt={u.nom}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-3">{u.nom}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{u.speciality || "—"}</td>
                    <td className="p-3">{userTeams}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          // setEditUser(u);
                          const t = teams.find(
                            (team) =>
                              team.membres?.includes(u._id) || team.leader?._id === u._id
                          );
                          setEditUser({ ...u, teamId: t?._id || "" });
                          setShowModal(true);
                        }}
                        className="px-2 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 text-xs transition">
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id || u.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition">
                        Supprimer
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border bg-white shadow disabled:opacity-50">
              ← Précédent
            </button>
            <span>
              Page {page} / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-3 py-1 rounded border bg-white shadow disabled:opacity-50">
              Suivant →
            </button>
          </div>
        )}

        {/* Modal création / édition */}
        <UserFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            // if (editUser) handleEditUser(editUser.id, data);
            if (editUser) handleEditUser(editUser._id || editUser.id, data);
            else handleAddUser(data);
            setShowModal(false);
          }}
          initialUser={editUser}
          teams={teams}
        />
      </div>
    </Layout>
  );
}
