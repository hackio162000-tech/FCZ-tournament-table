"use client";

import { useTournamentStore } from "@/store/tournament";
import TeamRow from "./TeamRow";

export default function PointsTable() {
  const { getSortedTeams } = useTournamentStore();
  const sortedTeams = getSortedTeams();

  if (sortedTeams.length === 0) {
    return (
      <div className="card-cyberpunk text-center py-8">
        <p className="text-cyberpunk-accent opacity-75">
          No teams added yet. Create your first team to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="card-cyberpunk">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 md:gap-4 items-center mb-4 pb-4 border-b border-cyberpunk-accent border-opacity-30">
        <div className="col-span-1 md:col-span-1 text-cyberpunk-accent font-bold text-xs">
          Rank
        </div>
        <div className="col-span-3 md:col-span-3 text-cyberpunk-accent font-bold text-xs">
          Team
        </div>
        <div className="col-span-2 md:col-span-2 text-center text-cyberpunk-accent font-bold text-xs">
          Rounds (RP)
        </div>
        <div className="col-span-2 md:col-span-2 text-center text-cyberpunk-accent font-bold text-xs">
          Wins
        </div>
        <div className="col-span-2 md:col-span-2 text-center text-cyberpunk-accent font-bold text-xs">
          Losses
        </div>
        <div className="col-span-2 md:col-span-2 text-center text-cyberpunk-accent font-bold text-xs">
          Total Points
        </div>
      </div>

      {/* Team Rows */}
      <div>
        {sortedTeams.map((team, index) => (
          <TeamRow key={team.id} team={team} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
