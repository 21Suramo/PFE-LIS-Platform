export default function TeamArticlesModal({ team, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl mx-4 p-6 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-lisBlue mb-4">
          📄 Articles de {team.name}
        </h2>

        {team.articles.length > 0 ? (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {team.articles.map((article, index) => (
              <li
                key={index}
                className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50">
                <p className="font-medium text-gray-800">{article.title}</p>
                {article.date && (
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {article.date}
                  </p>
                )}
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
