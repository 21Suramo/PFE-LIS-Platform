// src/components/Event/EventCard.jsx
import React from 'react';

export default function EventCard({ event }) {
  const isInternal = event.type === 'INTERNE';

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 flex flex-col sm:flex-row justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-primaryDark mb-1">
          {event.title}
        </h2>
        <p className="text-sm text-gray-500">{event.date}</p>
        <p className="text-sm text-gray-500">{event.location}</p>
      </div>
      <span
        className={`mt-4 sm:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${
          isInternal ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}
      >
        {isInternal ? 'Interne' : 'Externe'}
      </span>
    </div>
  );
}
