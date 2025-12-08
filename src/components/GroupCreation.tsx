"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";

export default function GroupCreation() {
  const { currentTournament, getSortedTeams } = useTournamentStore();
  const [groupSize, setGroupSize] = useState(3);
  const [groups, setGroups] = useState<string[][]>([]);

  if (!currentTournament) return null;

  const teams = getSortedTeams();
  const totalTeams = teams.length;
  const numGroups = Math.ceil(totalTeams / groupSize);

  const generateGroups = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const newGroups: string[][] = [];

    for (let i = 0; i < numGroups; i++) {
      newGroups.push([]);
    }

    shuffled.forEach((team, index) => {
      newGroups[index % numGroups].push(team.name);
    });

    setGroups(newGroups);
  };

  const letters = ["A", "B", "C", "D", "E"];

  return (
    <div className="card-cyberpunk">
      <h2 className="text-2xl font-bold text-cyberpunk-accent mb-6 flex items-center gap-2">
        🎯 Group Creation
      </h2>

      {/* Settings */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-cyan-500 border-opacity-30">
        <label className="text-sm text-cyberpunk-tertiary block mb-2">
          Teams per group:
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="1"
            max={totalTeams}
            value={groupSize}
            onChange={(e) => setGroupSize(Math.max(1, Number(e.target.value)))}
            className="w-20 bg-gray-800 border border-cyan-500 rounded px-2 py-1 text-white"
          />
          <span className="text-cyberpunk-accent text-sm">
            → {numGroups} group{numGroups !== 1 ? "s" : ""}
          </span>
        </div>

        <button
          onClick={generateGroups}
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition-all"
        >
          🔄 Auto-Generate Groups
        </button>
      </div>

      {/* Groups Display */}
      {groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500 border-opacity-50 rounded-lg"
            >
              <h3 className="text-lg font-bold text-cyberpunk-accent mb-3">
                Group {letters[index] || index + 1}
              </h3>
              <ul className="space-y-2">
                {group.map((teamName, idx) => (
                  <li key={idx} className="text-cyberpunk-secondary text-sm flex items-center gap-2">
                    <span className="text-cyberpunk-tertiary">#{idx + 1}</span>
                    {teamName}
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-cyan-500 border-opacity-20">
                <p className="text-xs text-cyberpunk-accent opacity-75">
                  {group.length} / {groupSize} slots
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {groups.length === 0 && totalTeams > 0 && (
        <div className="text-center py-8 text-cyberpunk-accent opacity-50">
          Click &quot;Auto-Generate Groups&quot; to create tournament groups
        </div>
      )}

      {totalTeams === 0 && (
        <div className="text-center py-8 text-red-400 opacity-50">
          Add teams first to create groups
        </div>
      )}
    </div>
  );
}
