// src/pages/LeaderDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import ArticleList from '../components/Article/ArticleList';
import { useAuth } from '../contexts/AuthContext';

export default function LeaderDashboardPage() {
  const { user } = useAuth();
  const [teamArticles, setTeamArticles] = useState([]);

  useEffect(() => {
    // Mock temporaire : articles de l'équipe du responsable
    setTeamArticles([
      { id: 'a1', title: 'Flux temps réel', status: 'PENDING', author: 'Alice' },
      { id: 'a3', title: 'Système embarqué avancé', status: 'PENDING', author: 'Charlie' },
    ]);
  }, [user]);

  const handleApprove = (id) => {
    setTeamArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'APPROVED' } : a))
    );
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Tableau de bord Responsable
        </h1>

        <h2 className="text-2xl font-semibold text-primaryDark mb-4">
          Articles en attente de validation
        </h2>
        <div className="space-y-4">
          {teamArticles.map(article => (
            <div key={article.id} className="flex items-center justify-between border rounded-lg p-4 shadow-sm">
              <div>
                <h3 className="text-xl font-medium">{article.title}</h3>
                <p className="text-sm text-gray-600">Auteur : {article.author}</p>
                <p className="text-sm text-yellow-600">Statut : {article.status}</p>
              </div>
              <button
                onClick={() => handleApprove(article.id)}
                className="bg-primaryDark text-white py-2 px-4 rounded"
              >
                Valider
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
);
}
