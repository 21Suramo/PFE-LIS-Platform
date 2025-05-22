import TeamCard from "./TeamCard";

export default function TeamList({ teams, onOpenMembers, onOpenArticles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onOpenMembers={onOpenMembers}
          onOpenArticles={onOpenArticles}
        />
      ))}
    </div>
  );
}
