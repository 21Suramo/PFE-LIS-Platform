import { motion } from "framer-motion";

export default function NewsCard({ item, onOpenDetails }) {
  const date = item.datePublication || item.date || "";

  // Badge couleur selon le type
  const badgeStyle =
    item.type === "Événement"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  const fullImageUrl = item.imageUrl?.startsWith("http")
    ? item.imageUrl
    : `http://localhost:3000${item.imageUrl || ""}`;

  return (
    <motion.div
      className="
    relative bg-gradient-to-tl from-white via-blue-50 to-white
    rounded-xl shadow-md border border-gray-200 group
    p-0 cursor-pointer
    transition-all
    min-h-[270px]
  "
      whileHover={{ scale: 1.045 }}
      onClick={() => onOpenDetails && onOpenDetails(item)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenDetails && onOpenDetails(item);
      }}
      role="button"
      aria-label={`Voir le détail de l'actualité/événement ${item.titre}`}>
      <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
        <img
          src={item.imageUrl ? fullImageUrl : "/default-news.jpg"}
          alt={item.titre}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {item.pinned && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-0.5 rounded-full shadow text-xs font-bold z-10">
            📌 Pinned
          </span>
        )}
      </div>
      <div className="p-3">
        <h2 className="text-base font-bold text-lisBlue mb-1">{item.titre}</h2>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500">{date}</span>
          <span
            className={`ml-auto px-3 py-0.5 text-xs rounded-full font-semibold ${badgeStyle}`}>
            {item.type}
          </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3 mb-0.5">
          {item.contenu || item.description}
        </p>
        {item.lieu && (
          <div className="text-xs text-gray-500 mt-1 italic">
            Lieu : {item.lieu}
          </div>
        )}
      </div>
    </motion.div>
  );
}
