import React, { useState, useEffect } from "react";
import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../services/teamService";
import Layout from "../../components/common/Layout";
import TeamFormModal from "../../components/Admin/TeamFormModal";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      const data = await getAllTeams();
      setTeams(data);
    } catch (err) {
      console.error("Erreur lors du chargement des équipes:", err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSaveTeam = async (teamData) => {
    try {
      if (teamData._id) {
        await updateTeam(teamData);
      } else {
        await createTeam(teamData);
      }
      fetchTeams();
      setModalOpen(false);
      setSelectedTeam(null);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de l'équipe:", err);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm("Supprimer cette équipe ?")) {
      try {
        await deleteTeam(id);
        setTeams((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error("Erreur suppression équipe:", err);
      }
    }
  };

  const filtered = teams.filter((team) =>
    team.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">Gérer les équipes</h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche équipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 w-full max-w-md"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setSelectedTeam(null);
              setModalOpen(true);
            }}
          >
            ➕ Ajouter équipe
          </button>
        </div>

        <TeamFormModal
          isOpen={modalOpen}
          onClose={() => {
            setSelectedTeam(null);
            setModalOpen(false);
          }}
          onSave={handleSaveTeam}
          team={selectedTeam}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/90 rounded-2xl shadow">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Spécialité</th>
                <th className="px-4 py-2">Membres</th>
                <th className="px-4 py-2">Article</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((team) => (
                <tr key={team._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{team.name}</td>
                  <td className="px-4 py-2">{team.specialite}</td>
                  <td className="px-4 py-2">{team.membres?.length || 0}</td>
                  <td className="px-4 py-2">{team.article?.title || "—"}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded text-xs mr-2 hover:bg-yellow-500"
                      onClick={() => {
                        setSelectedTeam(team);
                        setModalOpen(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      onClick={() => handleDeleteTeam(team._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-6">
                    Aucune équipe trouvée.
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
