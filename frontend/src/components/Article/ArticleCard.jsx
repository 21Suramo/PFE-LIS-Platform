export default function ArticleCard({ article }) {
  const statusColor = {
    DRAFT: "text-gray-500",
    PENDING: "text-yellow-600",
    APPROVED: "text-green-600",
  }[article.statut];

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-primaryDark">
        {article.titre}
      </h2>
      <p className={`mt-1 ${statusColor} font-medium`}>
        Statut : {article.statut}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        Auteur : {article.auteur || "—"}
      </p>
    </div>
  );
}
