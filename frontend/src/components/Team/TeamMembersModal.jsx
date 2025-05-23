import { useState } from "react";
import { mockUtilisateurs, mockArticles } from "../../data/mockData";

export default function TeamMembersModal({ team, onClose }) {
  const [selectedMember, setSelectedMember] = useState(null);

  // Récupérer les objets membres (user) à partir des IDs stockés dans team.membres
  const membres = team.membres.map((id) =>
    mockUtilisateurs.find((u) => u.id === id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-3xl mx-4 p-6 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-lisBlue mb-6">
          👥 Membres de {team.nom}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
          {membres.map(
            (member, index) =>
              member && (
                <div
                  key={member.id}
                  className="relative group bg-gray-50 rounded-xl p-4 shadow hover:shadow-xl transition">
                  <img
                    src={member.avatar}
                    alt={member.nom}
                    className="w-16 h-16 rounded-full object-cover mx-auto"
                  />
                  <div className="text-center mt-3">
                    <p className="text-sm font-semibold text-gray-800">
                      {member.nom}
                    </p>
                    <p className="text-xs text-gray-500">{member.speciality}</p>
                  </div>
                  {/* Overlay bouton voir articles */}
                  {member.articles && member.articles.length > 0 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="text-white text-sm bg-lisBlue px-4 py-2 rounded hover:bg-blue-900">
                        📄 Voir articles
                      </button>
                    </div>
                  )}
                </div>
              )
          )}
        </div>
        {/* Modal imbriqué : articles du membre */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white max-w-md w-full mx-4 p-6 rounded-xl shadow-xl relative">
              <h3 className="text-xl font-semibold text-lisBlue mb-4">
                📚 Articles de {selectedMember.nom}
              </h3>
              {selectedMember.articles?.length > 0 ? (
                <ul className="space-y-2">
                  {selectedMember.articles.map((artId, idx) => {
                    const art = mockArticles.find((a) => a.id === artId);
                    return (
                      <li
                        key={idx}
                        className="bg-gray-100 px-4 py-2 rounded shadow-sm">
                        <p className="font-medium">{art?.titre}</p>
                        <p className="text-xs text-gray-500">
                          {art?.dateSoumission}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="italic text-gray-500">Aucun article trouvé.</p>
              )}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-4 text-xl text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-600 hover:text-gray-900">
          &times;
        </button>
      </div>
    </div>
  );
}
