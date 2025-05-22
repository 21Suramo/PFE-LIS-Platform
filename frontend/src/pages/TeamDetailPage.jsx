import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TeamDetail from "../components/Team/TeamDetail";

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    // MOCK temporaire – à remplacer par appel API réel
    const mockTeams = [
      {
        id: "1",
        name: "Équipe Data Science",
        description: "Recherche sur l’IA, Big Data et Machine Learning.",
        leader: "Pr. Fatiha Doula",
        imageUrl: "/images/data.jpg",
        members: ["Alice", "Bob", "Charlie"],
        projects: ["Prédiction COVID", "Clusterisation intelligente"],
        articles: [{ title: "Apprentissage profond", date: "2024-09" }],
      },
      {
        id: "2",
        name: "Équipe Réseaux & Sécurité",
        description: "Protocoles sécurisés, pare-feu, VPN, cyberdéfense.",
        leader: "Dr. Aitsi",
        imageUrl: "/images/reseau.jpg",
        members: ["Youssef", "Lina"],
        projects: ["Sécurisation IoT", "Détection d'intrusion"],
        articles: [],
      },
      {
        id: "3",
        name: "Équipe Systèmes Embarqués",
        description: "IoT, systèmes temps réel, capteurs intelligents.",
        leader: "Dr. Anas Ouizzane",
        imageUrl: "/images/embarqués.jpg",
        members: ["Sara", "Khalid"],
        projects: ["Capteur de santé", "Contrôle de drones"],
        articles: [{ title: "IoT dans la santé", date: "2023-12" }],
      },
    ];

    const found = mockTeams.find((t) => t.id === id);
    setTeam(found || null);
  }, [id]);

  if (!team) {
    return (
      <div className="py-12 text-center text-gray-500">Équipe introuvable.</div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12 max-w-5xl mx-auto">
      <TeamDetail team={team} />
    </div>
  );
}
