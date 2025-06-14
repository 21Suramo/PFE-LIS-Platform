import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles, onOpenDetails }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article._id || article.id}
          article={article}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
