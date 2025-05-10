// src/pages/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import EventList from '../components/Event/EventList';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Mock temporaire ; remplacer par eventService.getAll()
    setEvents([
      {
        id: 'e1',
        title: 'Séminaire interne : Systèmes Embarqués',
        date: '2025-06-10',
        location: 'Amphithéâtre A',
        type: 'INTERNE'
      },
      {
        id: 'e2',
        title: 'Conférence externe : Cybersécurité',
        date: '2025-07-05',
        location: 'Université Partenaire',
        type: 'EXTERNE'
      }
    ]);
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Événements
        </h1>
        <EventList events={events} />
      </div>
    </Layout>
  );
}
