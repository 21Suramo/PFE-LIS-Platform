//src/components/Team/TeamCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function TeamCard({ team, onOpenMembers, onOpenArticles }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg bg-white transition-transform duration-300 group hover:scale-[1.02]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img
        src={team.imageUrl}
        alt={team.name}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-lisBlue">{team.name}</h3>
        <p className="text-sm text-gray-600">👤 {team.leader}</p>
      </div>

      {/* Hover Overlay avec boutons */}
      {hovered && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4 transition-opacity">
          <Link
            to={`/teams/${team.id}`}
            className="bg-white text-sm px-4 py-1 rounded shadow hover:bg-gray-100">
            🔍 Voir détails
          </Link>
          <button
            onClick={() => onOpenMembers(team)}
            className="bg-white text-sm px-4 py-1 rounded shadow hover:bg-gray-100">
            👥 Membres
          </button>
          <button
            onClick={() => onOpenArticles(team)}
            className="bg-white text-sm px-4 py-1 rounded shadow hover:bg-gray-100">
            📄 Articles
          </button>
        </div>
      )}
    </div>
  );
}
