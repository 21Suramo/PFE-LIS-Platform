import { useParams } from "react-router-dom";
import TeamDetail from "../components/Team/TeamDetail";
import { mockEquipes } from "../data/mockData";

export default function TeamDetailPage() {
  const { id } = useParams();
  // Attention : les IDs de mockEquipes doivent être des strings, sinon adapte avec String(id)
  const team = mockEquipes.find((t) => String(t.id) === String(id));

  if (!team) {
    return (
      <div className="py-12 text-center text-gray-500">Équipe introuvable.</div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12 max-w-5xl mx-auto">
      <TeamDetail team={team} />
    </div>
  );
}
