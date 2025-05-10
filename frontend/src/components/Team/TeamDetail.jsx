// src/components/Team/TeamDetail.jsx
import React from 'react';

export default function TeamDetail({ team }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-2">
          {team.name}
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          {team.description}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Responsable : <strong>{team.leader}</strong>
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-primaryDark mb-2">
          Membres
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {team.members.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-primaryDark mb-2">
          Projets
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {team.projects.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
