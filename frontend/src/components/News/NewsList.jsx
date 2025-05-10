// src/components/News/NewsList.jsx
import React from 'react';
import NewsCard from './NewsCard';

export default function NewsList({ items }) {
  return (
    <div className="space-y-6">
      {items.map(item => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
