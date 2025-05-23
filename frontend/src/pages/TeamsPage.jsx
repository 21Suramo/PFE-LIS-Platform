import React from "react";
import Layout from "../components/common/Layout";
import TeamList from "../components/Team/TeamList";
import SectionTitle from "../components/UI/SectionTitle";
import { UsersIcon } from "lucide-react";
import { mockEquipes } from "../data/mockData";

export default function TeamsPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            icon={<UsersIcon className="w-6 h-6 text-lisBlue" />}
            title="Nos équipes de recherche"
            subtitle="Découvrez les pôles d’expertise qui font vivre le laboratoire."
          />
          <TeamList teams={mockEquipes} />
        </div>
      </div>
    </Layout>
  );
}
