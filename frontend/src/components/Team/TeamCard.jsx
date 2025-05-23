import { Link } from "react-router-dom";
import { mockUtilisateurs } from "../../data/mockData";

export default function TeamCard({ team, onOpenMembers, onOpenArticles }) {
  // Chercher l'objet leader (responsable) à partir de leaderId
  const leader = mockUtilisateurs.find((u) => u.id === team.leaderId);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white group">
      <img
        src={team.imageUrl}
        alt={team.nom}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-lisBlue">{team.nom}</h3>
        {leader && (
          <div className="flex items-center gap-2 mt-1">
            <img
              src={leader.avatar}
              alt={leader.nom}
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div>
              <div className="text-sm font-medium text-gray-700">
                {leader.nom}
              </div>
              <div className="text-xs text-gray-500">{leader.speciality}</div>
            </div>
          </div>
        )}
      </div>
      {/* Overlay bouton actions au hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-4">
        <Link
          to={`/teams/${team.id}`}
          className="bg-white text-lisBlue border px-4 py-1 rounded font-semibold text-sm shadow hover:bg-gray-100">
          Voir détails
        </Link>
        {onOpenMembers && (
          <button
            onClick={() => onOpenMembers(team)}
            className="bg-white text-sm px-4 py-1 rounded shadow hover:bg-gray-100">
            👥 Membres
          </button>
        )}
        {onOpenArticles && (
          <button
            onClick={() => onOpenArticles(team)}
            className="bg-white text-sm px-4 py-1 rounded shadow hover:bg-gray-100">
            📄 Articles
          </button>
        )}
      </div>
    </div>
  );
}
