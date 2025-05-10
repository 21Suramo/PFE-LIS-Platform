// src/pages/ArticlesPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import ArticleList from '../components/Article/ArticleList';
import ArticleForm from '../components/Article/ArticleForm';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Mock temporaire ; plus tard remplacer par articleService.getAll()
    setArticles([
      {
        id: 'a1',
        title: 'Optimisation des flux temps réel',
        status: 'PENDING',
        author: 'Alice'
      },
      {
        id: 'a2',
        title: 'Apprentissage profond pour l’IRM',
        status: 'APPROVED',
        author: 'Bob'
      }
    ]);
  }, []);

  const handleSubmit = (newArticle) => {
    setArticles([newArticle, ...articles]);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark">
            Articles
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 sm:mt-0 bg-lisBlue text-white py-2 px-4 rounded"
          >
            {showForm ? 'Annuler' : 'Nouvel article'}
          </button>
        </div>

        {showForm && <ArticleForm onSubmit={handleSubmit} />}

        <ArticleList articles={articles} />
      </div>
    </Layout>
  );
}
