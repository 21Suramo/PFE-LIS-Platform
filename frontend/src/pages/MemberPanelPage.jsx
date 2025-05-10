// src/pages/MemberPanelPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import ArticleForm from '../components/Article/ArticleForm';
import ArticleList from '../components/Article/ArticleList';
import { useAuth } from '../contexts/AuthContext';

export default function MemberPanelPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Mock temporaire : charger uniquement les articles de l'utilisateur
    setArticles([
      { id: 'a1', title: 'Mon premier article', status: 'DRAFT', author: user.name },
      { id: 'a2', title: 'Recherche sur X', status: 'PENDING', author: user.name },
    ]);
  }, [user]);

  const handleNew = (newArticle) => {
    setArticles([newArticle, ...articles]);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark">
            Espace Membre
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 sm:mt-0 bg-lisBlue text-white py-2 px-4 rounded"
          >
            {showForm ? 'Annuler' : 'Nouvel article'}
          </button>
        </div>

        {showForm && <ArticleForm onSubmit={handleNew} />}

        <h2 className="text-2xl font-semibold text-primaryDark mb-4">
          Mes articles
        </h2>
        <ArticleList articles={articles} />
      </div>
    </Layout>
  );
}
