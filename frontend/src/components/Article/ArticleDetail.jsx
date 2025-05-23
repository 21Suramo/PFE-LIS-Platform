export default function ArticleDetail({ article }) {
  if (!article) return null;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-lisBlue">{article.titre}</h2>
      <p className="text-xs text-gray-500 mb-2">{article.dateSoumission}</p>
      <div className="mb-2">{article.contenu || article.resume}</div>
      <div className="mt-2 text-sm text-gray-600">
        {article.equipe && (
          <>
            Équipe : <span className="font-semibold">{article.equipe}</span>
          </>
        )}
        {article.auteur && (
          <>
            {" "}
            — Membre : <span className="font-semibold">{article.auteur}</span>
          </>
        )}
      </div>
      <span
        className={`inline-block text-xs px-2 py-1 rounded ml-2 ${article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {article.statut}
      </span>
    </div>
  );
}
