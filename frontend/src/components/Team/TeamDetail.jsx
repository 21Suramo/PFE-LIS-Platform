import { mockUtilisateurs, mockArticles } from "../../data/mockData";

export default function TeamDetail({ team }) {
  // Récupérer leader (responsable)
  const leader = mockUtilisateurs.find((u) => u.id === team.leaderId);

  // Récupérer les membres (objets)
  const membres = team.membres
    .map((id) => mockUtilisateurs.find((u) => u.id === id))
    .filter(Boolean);

  // Récupérer les articles (objets)
  const articles = (team.articles || [])
    .map((id) => mockArticles.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <img
          src={team.imageUrl}
          alt={team.nom}
          className="w-full max-h-64 object-cover rounded-xl shadow"
        />
        <h1 className="text-3xl font-bold text-lisBlue mt-6">{team.nom}</h1>
        {leader && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <img
              src={leader.avatar}
              alt={leader.nom}
              className="w-9 h-9 rounded-full border object-cover"
            />
            <span className="text-gray-700 font-medium">{leader.nom}</span>
            <span className="text-xs text-gray-500">({leader.speciality})</span>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">🧾 Description</h2>
        <p className="text-gray-700 mt-2">
          {team.objectif || team.description}
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">👥 Membres</h2>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {membres.length ? (
            membres.map((member) => (
              <li
                key={member.id}
                className="bg-gray-100 p-3 rounded shadow-sm flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.nom}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="font-medium">{member.nom}</span>
                <span className="text-xs text-gray-500">
                  {member.speciality}
                </span>
              </li>
            ))
          ) : (
            <li className="italic text-gray-500">Aucun membre enregistré.</li>
          )}
        </ul>
      </div>
      {team.projects && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800">🚀 Projets</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {team.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          📄 Articles publiés
        </h2>
        {articles.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {articles.map((article) => (
              <li
                key={article.id}
                className="bg-white p-3 border rounded shadow-sm text-gray-700">
                <p className="font-medium">{article.titre}</p>
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
          <p className="text-gray-500 italic mt-2">
            Aucun article pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
