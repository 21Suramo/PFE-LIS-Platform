import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { mockEvenements } from "../../data/mockData";

export default function Events() {
  // On gère les événements internes (exemple) :
  const [events, setEvents] = useState(
    mockEvenements.filter((e) => e.origine === "INTERNE")
  );
  const [search, setSearch] = useState("");

  // CRUD mock (tu peux ajouter modals comme pour users si tu veux)
  const handleDeleteEvent = (id) =>
    setEvents(events.filter((e) => e.id !== id));

  const filtered = events.filter(
    (event) =>
      event.titre.toLowerCase().includes(search.toLowerCase()) ||
      (event.lieu && event.lieu.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-lisBlue mb-8">
            Gérer les événements internes
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Recherche événement…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded w-full max-w-md"
            />
            {/* Ajout d’événement : tu peux ajouter un bouton + modal ici */}
          </div>
          <div className="bg-white/90 rounded-2xl shadow p-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Titre</th>
                  <th>Date</th>
                  <th>Lieu</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="py-2">{event.titre}</td>
                    <td>{event.date}</td>
                    <td>{event.lieu}</td>
                    <td>{event.categorie}</td>
                    <td>
                      {/* Edit : tu peux faire un bouton modal ici */}
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        onClick={() => handleDeleteEvent(event.id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-6">
                      Aucun événement trouvé.
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
