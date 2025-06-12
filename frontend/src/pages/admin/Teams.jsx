import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { mockEquipes } from "../../data/mockData";

export default function Teams() {
  const [teams, setTeams] = useState(mockEquipes);
  const [search, setSearch] = useState("");

  const filtered = teams.filter((team) =>
    team.nom.toLowerCase().includes(search.toLowerCase())
  );

  // Tu peux ajouter un TeamFormModal ici pour le CRUD

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-lisBlue mb-8">
            Gérer les équipes
          </h1>
          <input
            type="text"
            placeholder="Recherche équipe…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full max-w-md mb-6"
          />
          <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th>Nom</th>
                  <th>Spécialité</th>
                  <th>Leader</th>
                  <th>Membres</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((team) => (
                  <tr
                    key={team.id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td>{team.nom}</td>
                    <td>{team.specialite}</td>
                    <td>{team.leaderId}</td>
                    <td>{team.membres?.length || 0}</td>
                    <td>
                      <button className="px-2 py-1 bg-yellow-400 text-white rounded text-xs mr-2 hover:bg-yellow-500">
                        Edit
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
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
      </div>
    </Layout>
  );
}
