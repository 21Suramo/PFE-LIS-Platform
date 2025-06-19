import { getFileUrl } from "../../utils/fileUrl";
import { formatDate } from "../../utils/date";

export default function EventDetail({ event }) {
  return (
    <div>
      {(event.image || event.imageUrl) && (
        <div className="w-full mb-5 rounded-xl overflow-hidden max-h-56">
          <img
            src={getFileUrl(event.image || event.imageUrl)}
            alt={event.title || event.titre}
            className="object-cover w-full h-56"
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2 text-blue-800">{event.title || event.titre}</h2>
      <div className="flex gap-3 text-xs text-gray-500 mb-4 items-center">
      <span>{formatDate(event.date)}</span>
        <span className="px-3 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700">
        {event.eventType || event.categorie}
        </span>
      </div>
      <div className="text-base text-gray-800 mb-2">{event.description}</div>
      {(event.location || event.lieu) && (
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Lieu :</span> {event.location || event.lieu}
        </div>
      )}
      {event.streamingUrl && (
        <div className="mt-3">
          <a
            href={event.streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition font-semibold">
            🎬 Accéder au streaming en direct
          </a>
        </div>
      )}

      
{event.pdf && (
        <div className="mt-3">
          <a
            href={getFileUrl(event.pdf)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition font-semibold"
          >
            📄 Voir l'affiche
          </a>
        </div>
      )}
    </div>
  );
}
