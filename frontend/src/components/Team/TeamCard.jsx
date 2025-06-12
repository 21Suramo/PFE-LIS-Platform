import { mockUtilisateurs } from "../../data/mockData";
import { motion } from "framer-motion";

export default function TeamCard({ team, onOpenDetails, ...rest }) {
  const leader = mockUtilisateurs.find((u) => u.id === team.leaderId);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md border border-gray-100 group transition cursor-pointer"
      whileHover={{ scale: 1.04, boxShadow: "0 8px 40px #003e7433" }}
      onClick={() => onOpenDetails && onOpenDetails(team)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenDetails && onOpenDetails(team);
      }}
      role="button"
      aria-label={`Voir le détail de l'équipe ${team.nom}`}>
      <img
        src={team.imageUrl}
        alt={team.nom}
        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold text-lisBlue text-center">
          {team.nom}
        </h3>
        {leader && (
          <div className="flex items-center gap-3 mb-1">
            <img
              src={leader.avatar}
              alt={leader.nom}
              className="w-9 h-9 rounded-full object-cover border-2 border-lisBlue shadow"
            />
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-800">
                {leader.nom}
              </span>
              <span className="text-xs text-gray-500">{leader.speciality}</span>
            </div>
          </div>
        )}
      </div>
      {/* Overlay pour accessibilité, si besoin */}
      <span className="absolute left-4 top-4 bg-lisBlue/80 text-white text-xs rounded-full px-3 py-1 shadow">
        {team.specialite}
      </span>
      {/* Focus ring accessibilité */}
      <span className="absolute inset-0 pointer-events-none rounded-2xl ring-2 ring-lisBlue opacity-0 group-focus:opacity-100 transition" />
    </motion.div>
  );
}
