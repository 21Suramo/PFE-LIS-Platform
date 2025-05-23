import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import ArticleForm from "../components/Article/ArticleForm";
import ArticleList from "../components/Article/ArticleList";
import { useAuth } from "../contexts/AuthContext";
import { mockArticles, mockUtilisateurs } from "../data/mockData";

export default function MemberPanelPage() {
  const { user } = useAuth();
  // On récupère l'utilisateur réel depuis le mock (si besoin)
  const currentUser = mockUtilisateurs.find((u) => u.email === user?.email);
  // Filtrer les articles par auteur
  const [articles, setArticles] = useState(
    mockArticles.filter(
      (a) => currentUser && currentUser.articles?.includes(a.id)
    )
  );
  const [showForm, setShowForm] = useState(false);

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
            className="mt-4 sm:mt-0 bg-lisBlue text-white py-2 px-4 rounded">
            {showForm ? "Annuler" : "Nouvel article"}
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
