import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TeamDetail from "../components/Team/TeamDetail";
// import { mockEquipes } from "../data/mockData";
import { getTeamById } from "../services/teamService";
import { AnimatePresence, motion } from "framer-motion";

export default function TeamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Attention : les IDs de mockEquipes doivent être des strings, sinon adapte avec String(id)
  // const team = mockEquipes.find((t) => String(t.id) === String(id));
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeamById(id)
      .then(setTeam)
      .catch((err) => {
        console.error(err);
        setError("Équipe introuvable.");
      });
  }, [id]);

  if (error) {
    return <div className="py-12 text-center text-gray-500">{error}</div>;
  }

  if (!team) {
    // return (
    //   <div className="py-12 text-center text-gray-500">Équipe introuvable.</div>
    // );
    return <div className="py-12 text-center text-gray-500">Chargement...</div>;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => navigate('/teams')}>
        <motion.div
          className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate('/teams')}
            className="absolute top-4 right-4 text-gray-500 hover:text-lisBlue text-2xl font-bold"
            aria-label="Fermer">
            &times;
          </button>
          <TeamDetail team={team} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
