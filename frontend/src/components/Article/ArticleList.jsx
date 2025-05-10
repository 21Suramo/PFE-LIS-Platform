// src/components/Article/ArticleList.jsx
import React from 'react';
import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }) {
  return (
    <div className="space-y-4">
      {articles.map((art) => (
        <ArticleCard key={art.id} article={art} />
      ))}
    </div>
  );
}
