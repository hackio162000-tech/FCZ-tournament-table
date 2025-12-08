"use client";

import { useTournamentStore, Team } from "@/store/tournament";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

interface TeamRowProps {
  team: Team;
  rank: number;
}

export default function TeamRow({ team, rank }: TeamRowProps) {
  const { updateTeamScore, removeTeam } = useTournamentStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const [showEditRounds, setShowEditRounds] = useState(false);
  const [showEditWins, setShowEditWins] = useState(false);
  const [showEditLosses, setShowEditLosses] = useState(false);
  const [showEditPoints, setShowEditPoints] = useState(false);
  const [tempRounds, setTempRounds] = useState(team.rounds);
  const [tempWins, setTempWins] = useState(team.wins);
  const [tempLosses, setTempLosses] = useState(team.losses);
  const [tempPoints, setTempPoints] = useState(team.points);

  const handleRoundsChange = () => {
    updateTeamScore(team.id, tempRounds, undefined, undefined, undefined);
    setShowEditRounds(false);
  };

  const handleWinsChange = () => {
    updateTeamScore(team.id, undefined, tempWins, undefined, undefined);
    setShowEditWins(false);
  };

  const handleLossesChange = () => {
    updateTeamScore(team.id, undefined, undefined, tempLosses, undefined);
    setShowEditLosses(false);
  };

  const handlePointsChange = () => {
    updateTeamScore(team.id, undefined, undefined, undefined, tempPoints);
    setShowEditPoints(false);
  };

  return (
    <div className="card-cyberpunk mb-3">
      <div className="grid grid-cols-12 gap-2 md:gap-4 items-center text-xs md:text-base">
        {/* Rank */}
        <div className="col-span-1 md:col-span-1 font-bold text-cyberpunk-accent">
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`}
        </div>

        {/* Team Name */}
        <div className="col-span-3 md:col-span-3 font-bold text-cyberpunk-secondary truncate">
          {team.name}
        </div>

        {/* Rounds (RP) */}
        <div
          className="col-span-2 md:col-span-2 text-center"
          onClick={() => isAdmin && setShowEditRounds(true)}
        >
          {showEditRounds && isAdmin ? (
            <div className="flex gap-1">
              <input
                type="number"
                value={tempRounds}
                onChange={(e) => setTempRounds(Number(e.target.value))}
                className="w-full text-center text-xs bg-gray-800 text-white rounded px-1"
                min="0"
                autoFocus
              />
              <button
                onClick={handleRoundsChange}
                className="text-cyberpunk-accent hover:text-cyberpunk-tertiary"
              >
                ✓
              </button>
            </div>
          ) : (
            <span className={`font-bold text-cyberpunk-tertiary ${isAdmin ? "cursor-pointer hover:text-cyberpunk-accent transition-colors" : ""}`}>
              {team.rounds}
            </span>
          )}
        </div>

        {/* Wins */}
        <div
          className="col-span-2 md:col-span-2 text-center"
          onClick={() => isAdmin && setShowEditWins(true)}
        >
          {showEditWins && isAdmin ? (
            <div className="flex gap-1">
              <input
                type="number"
                value={tempWins}
                onChange={(e) => setTempWins(Number(e.target.value))}
                className="w-full text-center text-xs bg-gray-800 text-white rounded px-1"
                min="0"
                autoFocus
              />
              <button
                onClick={handleWinsChange}
                className="text-cyberpunk-accent hover:text-cyberpunk-tertiary"
              >
                ✓
              </button>
            </div>
          ) : (
            <span className={`font-bold text-cyberpunk-tertiary ${isAdmin ? "cursor-pointer hover:text-cyberpunk-accent transition-colors" : ""}`}>
              {team.wins}
            </span>
          )}
        </div>

        {/* Losses */}
        <div
          className="col-span-2 md:col-span-2 text-center"
          onClick={() => isAdmin && setShowEditLosses(true)}
        >
          {showEditLosses && isAdmin ? (
            <div className="flex gap-1">
              <input
                type="number"
                value={tempLosses}
                onChange={(e) => setTempLosses(Number(e.target.value))}
                className="w-full text-center text-xs bg-gray-800 text-white rounded px-1"
                min="0"
                autoFocus
              />
              <button
                onClick={handleLossesChange}
                className="text-cyberpunk-accent hover:text-cyberpunk-tertiary"
              >
                ✓
              </button>
            </div>
          ) : (
            <span className={`font-bold text-cyberpunk-primary ${isAdmin ? "cursor-pointer hover:text-cyberpunk-accent transition-colors" : ""}`}>
              {team.losses}
            </span>
          )}
        </div>

        {/* Total Points */}
        <div
          className="col-span-2 md:col-span-2 text-center"
          onClick={() => isAdmin && setShowEditPoints(true)}
        >
          {showEditPoints && isAdmin ? (
            <div className="flex gap-1">
              <input
                type="number"
                value={tempPoints}
                onChange={(e) => setTempPoints(Number(e.target.value))}
                className="w-full text-center text-xs bg-gray-800 text-white rounded px-1"
                min="0"
                autoFocus
              />
              <button
                onClick={handlePointsChange}
                className="text-cyberpunk-accent hover:text-cyberpunk-tertiary"
              >
                ✓
              </button>
            </div>
          ) : (
            <span className={`font-bold text-cyberpunk-accent text-sm md:text-lg ${isAdmin ? "cursor-pointer hover:text-cyberpunk-tertiary transition-colors" : ""}`}>
              {team.points}
            </span>
          )}
        </div>

        {/* Delete Button */}
        <div className="col-span-1 md:col-span-1 text-center">
          {isAdmin ? (
            <button
              onClick={() => removeTeam(team.id)}
              className="text-cyberpunk-primary hover:text-red-400 transition-colors text-lg"
              title="Remove team"
            >
              ✕
            </button>
          ) : (
            <span className="text-gray-600">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
