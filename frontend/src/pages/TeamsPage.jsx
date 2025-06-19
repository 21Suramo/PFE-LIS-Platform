// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import SectionTitle from "../components/UI/SectionTitle";
import TeamList from "../components/Team/TeamList";
import { UsersIcon } from "lucide-react";
// import { mockEquipes } from "../data/mockData";
import { getAllTeams } from "../services/teamService";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getAllTeams()
      .then(setTeams)
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="h-full overflow-hidden w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <SectionTitle
          icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
          title="Nos équipes de recherche"
          subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
        />
        <div className="flex-1 overflow-y-auto mt-4 pb-2">
          <TeamList teams={teams} />
        </div>

        
      </div>
      </Layout>
  );
}

