import { mockArticles } from "../../data/mockData";

export default function TeamArticlesModal({ team, onClose }) {
  // Récupérer les objets articles à partir de team.articles (qui sont des IDs)
  const articles = (team.articles || [])
    .map((id) => mockArticles.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl mx-4 p-6 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-lisBlue mb-4">
          📄 Articles de {team.nom}
        </h2>
        {articles.length > 0 ? (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {articles.map((article, index) => (
              <li
                key={article.id}
                className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50">
                <p className="font-medium text-gray-800">{article.titre}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {article.dateSoumission}
                </p>
                <p className="text-xs text-gray-600 mt-1">{article.resume}</p>
                <span
                  className={`inline-block text-xs px-2 py-1 rounded ml-2 ${article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {article.statut}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">
            Aucun article publié pour le moment.
          </p>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
}
