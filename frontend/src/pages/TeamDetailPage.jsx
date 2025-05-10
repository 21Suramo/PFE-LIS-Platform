// src/pages/TeamDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/common/Layout';
import TeamDetail from '../components/Team/TeamDetail';

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    // Mock temporaire : remplacer par teamService.getById(id)
    const allTeams = [
      {
        id: '1',
        name: 'Équipe Systèmes Embarqués',
        description: 'Recherche sur l’IoT et les systèmes temps réel.',
        leader: 'Dr. Anas Ouizzane',
        members: ['Alice', 'Bob', 'Charlie'],
        projects: ['Capteur X', 'Protocole Y']
      },
      {
        id: '2',
        name: 'Équipe Data Science',
        description: 'IA, apprentissage automatique et Big Data.',
        leader: 'Pr. Fatiha Doula',
        members: ['David', 'Emma', 'Farah'],
        projects: ['Modèle Z', 'Analyse W']
      },
      {
        id: '3',
        name: 'Équipe Réseaux & Sécurité',
        description: 'Protocoles réseau et cybersécurité.',
        leader: 'Dr. Abdelouahid Aitsi',
        members: ['Lina', 'Mohamed', 'Sofia'],
        projects: ['Firewall A', 'VPN B']
      }
    ];
    const found = allTeams.find(t => t.id === id);
    setTeam(found || null);
  }, [id]);

  if (!team) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-12 py-12">
          <p className="text-center text-gray-500">Équipe introuvable.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <TeamDetail team={team} />
      </div>
    </Layout>
  );
}
