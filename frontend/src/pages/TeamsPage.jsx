// src/pages/TeamsPage.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import TeamList from '../components/Team/TeamList';

export default function TeamsPage() {
  // Exemple de données mock ; tu remplaceras par un fetch API plus tard
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Mock : remplacer par teamService.getAll()
    setTeams([
      {
        id: 1,
        name: 'Équipe Systèmes Embarqués',
        description: 'Recherche sur l’IoT et les systèmes temps réel.',
        leader: 'Dr. Anas Ouizzane',
      },
      {
        id: 2,
        name: 'Équipe Data Science',
        description: 'IA, apprentissage automatique et Big Data.',
        leader: 'Pr. Fatiha Doula',
      },
      {
        id: 3,
        name: 'Équipe Réseaux & Sécurité',
        description: 'Protocoles réseau et cybersécurité.',
        leader: 'Dr. Abdelouahid Aitsi',
      },
    ]);
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Nos équipes de recherche
        </h1>
        <TeamList teams={teams} />
      </div>
    </Layout>
  );
}
