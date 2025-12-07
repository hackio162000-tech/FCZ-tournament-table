"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";

export default function TournamentList() {
  const { tournaments, loadTournament, deleteTournament, createTournament } =
    useTournamentStore();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      createTournament(newName);
      setNewName("");
      setShowNew(false);
    }
  };

  if (tournaments.length === 0 && !showNew) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="neon-text text-4xl md:text-5xl mb-4">SNG Tournament Maker</h1>
          <p className="text-cyberpunk-accent mb-8">Create your first tournament</p>
          <button
            onClick={() => setShowNew(true)}
            className="btn-neon-primary text-xl px-8 py-4"
          >
            + Create Tournament
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-cyberpunk mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="neon-text text-2xl">Your Tournaments</h2>
        <button
          onClick={() => setShowNew(!showNew)}
          className="btn-neon-primary"
        >
          {showNew ? "Cancel" : "+ New Tournament"}
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleCreate} className="mb-6 pb-6 border-b border-cyberpunk-accent border-opacity-30">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Tournament name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <button type="submit" className="btn-neon whitespace-nowrap">
              Create
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="card-cyberpunk cursor-pointer hover:shadow-neon transition-all"
            onClick={() => loadTournament(tournament.id)}
          >
            <h3 className="neon-text text-lg mb-2">{tournament.name}</h3>
            <p className="text-sm text-cyberpunk-accent opacity-75 mb-4">
              Teams: {tournament.teams.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadTournament(tournament.id);
                }}
                className="btn-neon flex-1 text-sm"
              >
                Open
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTournament(tournament.id);
                }}
                className="btn-neon-primary text-sm px-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
