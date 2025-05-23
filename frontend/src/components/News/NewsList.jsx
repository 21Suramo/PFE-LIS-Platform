import React from "react";
import NewsCard from "./NewsCard";

export default function NewsList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}
