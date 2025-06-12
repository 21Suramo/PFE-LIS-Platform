export default function NewsDetail({ item }) {
  const date = item.datePublication || item.date || "";
  return (
    <div>
      {/* Image principale (en haut du modal) */}
      {item.imageUrl && (
        <div className="w-full mb-5 rounded-xl overflow-hidden max-h-56">
          <img
            src={item.imageUrl}
            alt={item.titre}
            className="object-cover w-full h-56"
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2 text-blue-800">{item.titre}</h2>
      <div className="flex gap-3 text-xs text-gray-500 mb-4 items-center">
        <span>{date}</span>
        <span
          className={`px-3 py-0.5 rounded-full font-semibold ${
            item.type === "Événement"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
          {item.type}
        </span>
        {item.pinned && (
          <span className="ml-auto bg-yellow-400 text-white px-2 py-0.5 rounded-full shadow text-xs font-bold">
            📌 Pinned
          </span>
        )}
      </div>
      <div className="text-base text-gray-800 mb-2">
        {item.contenu || item.description}
      </div>
      {item.lieu && (
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Lieu :</span> {item.lieu}
        </div>
      )}
      {item.localisation && (
        <div className="text-xs text-blue-700 mt-2">
          <span className="font-semibold">Localisation :</span>{" "}
          {item.localisation.ville}
        </div>
      )}
    </div>
  );
}
