// src/pages/TeamsPage.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import SectionTitle from "../components/UI/SectionTitle";
import TeamList from "../components/Team/TeamList";
import TeamMembersModal from "../components/Team/TeamMembersModal";
import TeamArticlesModal from "../components/Team/TeamArticlesModal";
import { UsersIcon } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showArticlesModal, setShowArticlesModal] = useState(false);

  useEffect(() => {
    // MOCK : à remplacer par API réelle
    setTeams([
      {
        id: "1",
        name: "Équipe Systèmes Embarqués",
        description: "Recherche sur l’IoT et les systèmes temps réel.",
        leader: "Dr. Anas Ouizzane",
        imageUrl: "/images/embarqués.jpg",
        members: ["Sara", "Khalid"],
        articles: [{ title: "IoT dans la santé", date: "2023-12" }],
      },
      {
        id: "2",
        name: "Équipe Data Science",
        description: "IA, apprentissage automatique et Big Data.",
        leader: "Pr. Fatiha Doula",
        imageUrl: "/images/data.jpg",
        members: ["Alice", "Bob", "Charlie"],
        articles: [{ title: "Apprentissage profond", date: "2024-09" }],
      },
      {
        id: "3",
        name: "Équipe Réseaux & Sécurité",
        description: "Protocoles réseau et cybersécurité.",
        leader: "Dr. Abdelouahid Aitsi",
        imageUrl: "/images/reseau.jpg",
        members: ["Youssef", "Lina"],
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
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
            title="Nos équipes de recherche"
            subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
          />

          <TeamList
            teams={teams}
            onOpenMembers={openMembersModal}
            onOpenArticles={openArticlesModal}
          />

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
      </div>
    </Layout>
  );
}
