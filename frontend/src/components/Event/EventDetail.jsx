// frontend/src/components/EventDetail.jsx
import React from "react";

export default function EventDetail({ event }) {
  /* -----------------------------------------------------------
     Build the image URL exactly like EventCard
     ----------------------------------------------------------- */
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fullImageUrl = (() => {
    const raw = event.image || event.imageUrl || "";
    if (!raw) return null;
    return raw.startsWith("http") ? raw : `${API_BASE}${raw}`;
  })();

  /* -----------------------------------------------------------
     Format date as dd/mm/yyyy  (e.g. 28/05/2025)
     ----------------------------------------------------------- */
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div>
      {fullImageUrl && (
        <div className="w-full mb-5 rounded-xl overflow-hidden max-h-56">
          <img
            src={fullImageUrl}
            alt={event.title}
            className="object-cover w-full h-56"
          />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2 text-blue-800">{event.title}</h2>

      <div className="flex gap-3 text-xs text-gray-500 mb-4 items-center">
        <span>{formattedDate}</span>

        {event.eventType && (
          <span className="px-3 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700">
            {event.eventType}
          </span>
        )}
      </div>

      <div className="text-base text-gray-800 mb-2">{event.description}</div>

      {event.location && (
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Lieu :</span> {event.location}
        </div>
      )}

      {event.streamingUrl && event.streamingUrl.trim() !== "" && (
        <div className="mt-3">
          <a
            href={event.streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition font-semibold"
          >
            🎬 Accéder&nbsp;au&nbsp;streaming&nbsp;en&nbsp;direct
          </a>
        </div>
      )}
    </div>
  );
}
