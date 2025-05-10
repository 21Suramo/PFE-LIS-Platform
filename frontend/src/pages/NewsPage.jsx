// src/pages/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import NewsList from '../components/News/NewsList';

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Mock temporaire ; remplacer par newsService.getAll()
    setNews([
      {
        id: 'n1',
        title: 'Colloque IA au LIS',
        date: '2025-06-15',
        summary: 'Un colloque dédié aux dernières avancées en IA appliquée.'
      },
      {
        id: 'n2',
        title: 'Publication du Journal de Recherche',
        date: '2025-05-30',
        summary: 'Le dernier numéro du Journal du LIS est disponible en ligne.'
      }
    ]);
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-6">
          Actualités
        </h1>
        <NewsList items={news} />
      </div>
    </Layout>
  );
}
