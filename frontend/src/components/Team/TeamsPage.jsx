import { useEffect, useState } from "react";
import TeamList from "../components/Team/TeamList";
import TeamMembersModal from "../components/Team/TeamMembersModal";
import TeamArticlesModal from "../components/Team/TeamArticlesModal";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showArticlesModal, setShowArticlesModal] = useState(false);

  useEffect(() => {
    // MOCK : à remplacer plus tard par une API
    setTeams([
      {
        id: 1,
        name: "Équipe Data Science",
        leader: "Pr. Fatiha Doula",
        imageUrl: "/images/data.jpg",
        members: ["Alice", "Bob", "Charlie"],
        articles: [{ title: "Apprentissage profond", date: "2024-09" }],
      },
      {
        id: 2,
        name: "Équipe Réseaux & Sécurité",
        leader: "Dr. Aitsi",
        imageUrl: "/images/reseau.jpg",
        members: ["Lina", "Youssef"],
        articles: [],
      },
      {
        id: 3,
        name: "Équipe Systèmes Embarqués",
        leader: "Dr. Anas Ouizzane",
        imageUrl: "/images/embarqués.jpg",
        members: ["Sara", "Khalid"],
        articles: [],
      },
    ]);
  }, []);

  const openMembersModal = (team) => {
    setSelectedTeam(team);
    setShowMembersModal(true);
  };

  const openArticlesModal = (team) => {
    setSelectedTeam(team);
    setShowArticlesModal(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-lisBlue">
          🔬 Nos équipes de recherche
        </h1>
        <p className="text-gray-600 mt-2">
          Découvrez les pôles d’expertise du laboratoire LIS.
        </p>
      </div>

      <TeamList
        teams={teams}
        onOpenMembers={openMembersModal}
        onOpenArticles={openArticlesModal}
      />

      {/* MODALS */}
      {showMembersModal && selectedTeam && (
        <TeamMembersModal
          team={selectedTeam}
          onClose={() => setShowMembersModal(false)}
        />
      )}

      {showArticlesModal && selectedTeam && (
        <TeamArticlesModal
          team={selectedTeam}
          onClose={() => setShowArticlesModal(false)}
        />
      )}
    </div>
  );
}
