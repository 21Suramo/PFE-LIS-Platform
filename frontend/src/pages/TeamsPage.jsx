import React, { useState } from "react";
import Layout from "../components/common/Layout";
import SectionTitle from "../components/UI/SectionTitle";
import TeamList from "../components/Team/TeamList";
import TeamDetail from "../components/Team/TeamDetail";
import { UsersIcon } from "lucide-react";
import { mockEquipes } from "../data/mockData";
import { AnimatePresence, motion } from "framer-motion";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
            title="Nos équipes de recherche"
            subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
          />
          <TeamList
            teams={mockEquipes}
            onOpenDetails={(team) => setSelectedTeam(team)}
          />

          {/* MODAL animé pour les détails */}
          <AnimatePresence>
            {selectedTeam && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTeam(null)}>
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
                  initial={{ scale: 0.93, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.23 }}
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
      </div>
    </Layout>
  );
}
