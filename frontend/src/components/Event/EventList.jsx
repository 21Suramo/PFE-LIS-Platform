// src/components/Event/EventList.jsx
import React from 'react';
import EventCard from './EventCard';

export default function EventList({ events }) {
  return (
    <div className="space-y-6">
      {events.map(evt => (
        <EventCard key={evt.id} event={evt} />
      ))}
    </div>
  );
}
