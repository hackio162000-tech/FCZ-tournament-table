"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";

export default function AddTeamForm() {
  const { addTeam } = useTournamentStore();
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-cyberpunk mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter team name..."
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="flex-1 text-sm"
        />
        <button type="submit" className="btn-neon-primary whitespace-nowrap">
          + Add Team
        </button>
      </div>
    </form>
  );
}
