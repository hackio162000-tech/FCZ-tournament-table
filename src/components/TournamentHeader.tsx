"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";

export default function TournamentHeader() {
  const { currentTournament, generateShareCode } = useTournamentStore();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (!currentTournament) return;

    const shareUrl = `${window.location.origin}?tournament=${currentTournament.shareCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentTournament) return null;

  return (
    <div className="card-cyberpunk mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="neon-text text-3xl md:text-4xl mb-2">
            {currentTournament.name}
          </h1>
          <p className="text-cyberpunk-accent text-sm opacity-75">
            Teams: {currentTournament.teams.length}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleShare}
            className="btn-neon text-sm md:text-base"
          >
            {copied ? "✓ Copied!" : "📤 Share"}
          </button>
          <button
            onClick={() => generateShareCode()}
            className="btn-neon-primary text-sm md:text-base"
          >
            🔄 New Share Code
          </button>
        </div>
      </div>

      {currentTournament.shareCode && (
        <div className="mt-4 pt-4 border-t border-cyberpunk-accent border-opacity-30">
          <p className="text-xs opacity-75 mb-2">Share Code:</p>
          <code className="bg-cyberpunk-dark px-3 py-2 rounded text-cyberpunk-accent font-mono text-sm">
            {currentTournament.shareCode}
          </code>
        </div>
      )}
    </div>
  );
}
