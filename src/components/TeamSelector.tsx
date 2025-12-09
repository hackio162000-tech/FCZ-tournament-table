"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";

export default function TeamSelector() {
  const { currentTournament, getSortedTeams } = useTournamentStore();
  const [selectedTeamIds, setSelectedTeamIds] = useState<Set<string>>(new Set());
  const [showSelector, setShowSelector] = useState(false);

  if (!currentTournament) return null;

  const teams = getSortedTeams();
  const selectedTeams = teams.filter((t) => selectedTeamIds.has(t.id));
  const unselectedTeams = teams.filter((t) => !selectedTeamIds.has(t.id));

  const toggleTeam = (teamId: string) => {
    const newSelected = new Set(selectedTeamIds);
    if (newSelected.has(teamId)) {
      newSelected.delete(teamId);
    } else {
      newSelected.add(teamId);
    }
    setSelectedTeamIds(newSelected);
  };

  const selectAll = () => {
    setSelectedTeamIds(new Set(teams.map((t) => t.id)));
  };

  const clearAll = () => {
    setSelectedTeamIds(new Set());
  };

  return (
    <div className="card-cyberpunk mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="neon-text text-lg flex items-center gap-2">
          🎯 Team Filter ({selectedTeams.length}/{teams.length})
        </h3>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          {showSelector ? "▼ Hide" : "▶ Show"}
        </button>
      </div>

      {showSelector && (
        <>
          <div className="flex gap-2 mb-4">
            <button
              onClick={selectAll}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
            >
              ✓ Select All
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
            >
              ✕ Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {teams.map((team) => (
              <label
                key={team.id}
                className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-cyan-500 border-opacity-20 cursor-pointer hover:border-opacity-50 transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedTeamIds.has(team.id)}
                  onChange={() => toggleTeam(team.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-cyan-300 truncate">{team.name}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {/* Display selected and unselected teams separately */}
      {selectedTeamIds.size > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selected Teams */}
          <div>
            <h4 className="text-sm font-bold text-green-400 mb-2">✓ Selected ({selectedTeams.length})</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {selectedTeams.map((team) => (
                <div
                  key={team.id}
                  className="p-2 bg-green-900 bg-opacity-30 rounded border border-green-500 border-opacity-50 text-xs"
                >
                  <p className="font-bold text-green-400">{team.name}</p>
                  <p className="text-gray-300">
                    Points: {team.points} | W: {team.wins} | L: {team.losses}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Unselected Teams */}
          {unselectedTeams.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-2">○ Not Selected ({unselectedTeams.length})</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {unselectedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="p-2 bg-gray-800 bg-opacity-50 rounded border border-gray-600 border-opacity-50 text-xs"
                  >
                    <p className="font-bold text-gray-400">{team.name}</p>
                    <p className="text-gray-500">
                      Points: {team.points} | W: {team.wins} | L: {team.losses}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
