import { motion } from "framer-motion";
import { getFileUrl } from "../../utils/fileUrl";
import { formatDate } from "../../utils/date";

export default function EventCard({ event, onOpenDetails }) {
  const date = formatDate(event.date);

  return (
    <motion.div
      className="relative bg-gradient-to-tl from-white via-blue-50 to-white rounded-xl shadow-md border border-gray-200 group p-0 cursor-pointer transition-all min-h-[270px]"
      whileHover={{ scale: 1.045 }}
      onClick={() => onOpenDetails && onOpenDetails(event)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenDetails && onOpenDetails(event);
      }}
      role="button"
      aria-label={`Voir le détail de l'événement ${event.title || event.titre}`}>
      <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
        <img
          src={getFileUrl(event.image || event.imageUrl) || "/default-event.jpg"}
          alt={event.title || event.titre}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
      <h2 className="text-base font-bold text-lisBlue mb-1">{event.title || event.titre}</h2>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500">{date}</span>
          <span className="ml-auto px-3 py-0.5 text-xs rounded-full font-semibold bg-blue-100 text-blue-700">
          {event.eventType || event.categorie}
          </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3 mb-0.5">
          {event.description}
        </p>
        {(event.location || event.lieu) && (
          <div className="text-xs text-gray-500 mt-1 italic">
            Lieu : {event.location || event.lieu}
          </div>
        )}
        {event.streamingUrl && (
          <div className="mt-2">
            <a
              href={event.streamingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition">
              🎬 Streaming en direct
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
