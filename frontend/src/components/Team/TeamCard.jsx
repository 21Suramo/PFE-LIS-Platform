// src/components/Team/TeamCard.jsx
import React from 'react';

export default function TeamCard({ team }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="p-6 flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-primaryDark mb-2">
          {team.name}
        </h2>
        <p className="text-base text-gray-700 mb-4">
          {team.description}
        </p>
      </div>
      <div className="bg-bgLight px-6 py-4">
        <span className="text-sm text-gray-600">
          Responsable&nbsp;: <strong>{team.leader}</strong>
        </span>
      </div>
    </div>
  );
}
