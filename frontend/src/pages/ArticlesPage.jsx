import React, { useState } from "react";
import Layout from "../components/common/Layout";
import ArticleList from "../components/Article/ArticleList";
import ArticleForm from "../components/Article/ArticleForm";
import { mockArticles } from "../data/mockData";

export default function ArticlesPage() {
  // Permettre d'ajouter dynamiquement (optionnel) :
  const [articles, setArticles] = useState(mockArticles);
  const [showForm, setShowForm] = useState(false);

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
            className="mt-4 sm:mt-0 bg-lisBlue text-white py-2 px-4 rounded">
            {showForm ? "Annuler" : "Nouvel article"}
          </button>
        </div>
        {showForm && <ArticleForm onSubmit={handleSubmit} />}
        <ArticleList articles={articles} />
      </div>
    </Layout>
  );
}
