import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import EventFormModal from "../../components/Admin/EventFormModal";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../services/eventService";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => console.error("Erreur chargement événements:", err));
  }, []);

  const handleAddOrUpdateEvent = async (data) => {
  try {
    const id = data.get("_id"); 

    if (id) {
      const response = await updateEvent(id, data); // PUT with FormData
      setEvents((prev) =>
        prev.map((ev) => (ev._id === response._id ? response : ev))
      );
    } else {
      const response = await createEvent(data); // POST with FormData
      setEvents((prev) => [...prev, response]);
    }
  } catch (err) {
    console.error("Erreur création/mise à jour:", err);
  } finally {
    setEditEvent(null);
  }
};


  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const filtered = events
    .filter((e) => e && e.title)
    .filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">Gérer les événements</h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche événement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 w-full max-w-md"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setEditEvent(null);
              setShowEventModal(true);
            }}
          >
            ➕ Ajouter événement
          </button>
        </div>

        <EventFormModal
          isOpen={showEventModal}
          onClose={() => {
            setEditEvent(null);
            setShowEventModal(false);
          }}
          onSave={(data) => {
            handleAddOrUpdateEvent(data);
            setShowEventModal(false);
          }}
          event={editEvent}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/90 rounded-2xl shadow">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Lieu</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{e.title}</td>
                  <td className="px-4 py-2">
                    {e.date ? new Date(e.date).toLocaleDateString("fr-FR") : "—"}
                  </td>
                  <td className="px-4 py-2">{e.location}</td>
                  <td className="px-4 py-2">{e.eventType}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded text-xs mr-2 hover:bg-yellow-500"
                      onClick={() => {
                        setEditEvent(e);
                        setShowEventModal(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      onClick={() => handleDeleteEvent(e._id)}
                    >
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
    </Layout>
  );
}
