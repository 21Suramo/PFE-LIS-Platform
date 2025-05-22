export default function TeamDetail({ team }) {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="text-center">
        <img
          src={team.imageUrl}
          alt={team.name}
          className="w-full max-h-64 object-cover rounded-xl shadow"
        />
        <h1 className="text-3xl font-bold text-lisBlue mt-6">{team.name}</h1>
        <p className="text-gray-600 mt-1">👤 Responsable : {team.leader}</p>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">🧾 Description</h2>
        <p className="text-gray-700 mt-2">{team.description}</p>
      </div>

      {/* Membres */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">👥 Membres</h2>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.members.map((member, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded shadow-sm text-gray-800">
              {member}
            </li>
          ))}
        </ul>
      </div>

      {/* Projets */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">🚀 Projets</h2>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          {team.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          📄 Articles publiés
        </h2>
        {team.articles.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {team.articles.map((article, index) => (
              <li
                key={index}
                className="bg-white p-3 border rounded shadow-sm text-gray-700">
                <p className="font-medium">{article.title}</p>
                {article.date && (
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {article.date}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">
            Aucun article pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
