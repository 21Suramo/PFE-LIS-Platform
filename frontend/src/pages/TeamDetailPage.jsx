import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { ArrowLeft } from "lucide-react";
import TeamDetail from "../components/Team/TeamDetail";
// import { mockEquipes } from "../data/mockData";
import { getTeamById } from "../services/teamService";

export default function TeamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Attention : les IDs de mockEquipes doivent être des strings, sinon adapte avec String(id)
  // const team = mockEquipes.find((t) => String(t.id) === String(id));
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeamById(id)
      .then(setTeam)
      .catch((err) => {
        console.error(err);
        setError("Équipe introuvable.");
      });
  }, [id]);

  if (error) {
    return (
      <Layout>
        <div className="py-12 text-center text-gray-500">{error}</div>
      </Layout>
    );
  }

  if (!team) {
    return (
      <Layout>
        <div className="py-12 text-center text-gray-500">Chargement...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lisBlue mb-4 underline">
          &larr; Retour
        </button>
        <TeamDetail team={team} />
      </div>
    </Layout>
  );
}
