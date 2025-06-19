// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
// import { mockEvenements } from "../../data/mockData";
import EventFormModal from "../../components/Admin/EventFormModal";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent as deleteEventApi,
} from "../../services/eventService";
import { formatDate } from "../../utils/date";

export default function Events() {
  
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  
  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  
  async function handleSave(formData) {
    try {
      if (editEvent) {
        const updated = await updateEvent(editEvent._id, formData);
        setEvents((prev) =>
          prev.map((e) => (e._id === editEvent._id ? updated : e))
        );
      } else {
        const { event } = await createEvent(formData);
        setEvents((prev) => [...prev, event]);
      }
      setModalOpen(false);
      setEditEvent(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await deleteEventApi(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = events.filter((event) => {
    const s = search.toLowerCase();
    return (
      event.title?.toLowerCase().includes(s) ||
      event.location?.toLowerCase().includes(s) ||
      event.eventType?.toLowerCase().includes(s)
    );
  });

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-lisBlue mb-6">
          Gérer les événements internes
        </h1>
        <div className="flex items-center gap-3 w-full md:w-auto mb-4">
          <input
            type="text"
            placeholder="Recherche événement…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setEditEvent(null);
              setModalOpen(true);
            }}
            className="bg-lisBlue hover:bg-blue-800 text-black px-4 py-2 rounded shadow transition !opacity-100 !visible">
            ➕ Ajouter événement
          </button>
        </div>

        <EventFormModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditEvent(null);
          }}
          onSave={handleSave}
          initialEvent={editEvent}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-xl shadow">
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
                    key={event._id}
                    className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="py-2">{event.title}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>{event.location}</td>
                    <td>{event.eventType}</td>
                    <td>
                      {/* Edit : tu peux faire un bouton modal ici */}
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        onClick={() => handleDeleteEvent(event._id)}>
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