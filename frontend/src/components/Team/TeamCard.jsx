
import React from "react";

export default function TeamCard({ team, onOpenDetails }) {
  
  const raw = team.imageUrl || team.image || "";
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fullImageUrl = raw
    ? raw.startsWith("http")
      ? raw
      : `${API_BASE}${raw}`
    : null;

  return (
    <div
      onClick={() => onOpenDetails(team)}
      className="cursor-pointer bg-white rounded-xl shadow group hover:shadow-lg transition overflow-hidden flex flex-col"
    >
      {fullImageUrl && (
        <img
          src={fullImageUrl}
          alt={team.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
        />
      )}

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-blue-800 mb-1">
          {team.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{team.specialite}</p>

        {team.leader && (
          <p className="mt-auto text-xs text-gray-500">
            Chef&nbsp;:&nbsp;
            <span className="font-medium text-gray-700">
              {team.leader.nom || team.leader.name}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
