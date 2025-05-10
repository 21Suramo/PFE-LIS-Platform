// src/components/News/NewsCard.jsx
import React from 'react';

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-primaryDark mb-1">
        {news.title}
      </h2>
      <p className="text-sm text-gray-500 mb-3">{news.date}</p>
      <p className="text-base text-gray-700">{news.summary}</p>
    </div>
  );
}
