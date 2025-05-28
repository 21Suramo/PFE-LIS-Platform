import React from "react";
import TeamCard from "./TeamCard";

/* 4 cards per row on desktop, same break-points as News */
export default function TeamList({ teams, onOpenDetails }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team._id} team={team} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}
