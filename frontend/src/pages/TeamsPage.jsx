// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import SectionTitle from "../components/UI/SectionTitle";
import TeamList from "../components/Team/TeamList";
import TeamDetail from "../components/Team/TeamDetail";
import { UsersIcon } from "lucide-react";
// import { mockEquipes } from "../data/mockData";
import { getAllTeams } from "../services/teamService";
import { AnimatePresence, motion } from "framer-motion";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getAllTeams()
      .then(setTeams)
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="h-full overflow-hidden w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <SectionTitle
          icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
          title="Nos équipes de recherche"
          subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
        />
        <div className="flex-1 overflow-y-auto mt-4 pb-2">
          <TeamList teams={teams} onOpenDetails={setSelectedTeam} />
        </div>

        {/* MODAL animé pour les détails */}
        <AnimatePresence>
          {selectedTeam && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-lisBlue text-2xl font-bold"
                  aria-label="Fermer">
                  &times;
                </button>
                <TeamDetail team={selectedTeam} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </Layout>
  );
}

