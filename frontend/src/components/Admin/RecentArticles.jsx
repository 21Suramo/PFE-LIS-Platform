export default function RecentArticles({ articles }) {
  return (
    <div className="bg-white/80 rounded-2xl shadow p-5">
      <h2 className="font-bold text-lg text-lisBlue mb-3">Articles récents</h2>
      <ul>
        {articles.map((article) => (
          <li
            key={article.id}
            className="flex justify-between py-1 border-b last:border-b-0">
            <span>{article.titre}</span>
            <span
              className={`text-xs px-2 rounded ${article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {article.statut}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
