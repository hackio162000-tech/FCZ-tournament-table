"use client";

import { useTournamentStore } from "@/store/tournament";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function AuthKeysManager() {
  const { currentTournament, generateAuthKey, removeAuthKey } =
    useTournamentStore();
  const { user } = useAuthStore();
  const [username, setUsername] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (!currentTournament) return null;

  // Only show for admins
  if (user?.role !== "admin") {
    return null;
  }

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const newKey = generateAuthKey(username);
      if (newKey) {
        setUsername("");
        setCopiedKey(newKey);
        setTimeout(() => setCopiedKey(null), 3000);
      } else {
        alert("Maximum 10 auth keys allowed per tournament");
      }
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="card-cyberpunk mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="neon-text text-lg">🔐 Auth Keys ({currentTournament.authKeys.length}/10)</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-neon text-sm"
        >
          {showForm ? "Cancel" : "+ Add Auth Key"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleGenerateKey} className="mb-4 pb-4 border-b border-cyberpunk-accent border-opacity-30">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Friend's name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <button type="submit" className="btn-neon-primary whitespace-nowrap">
              Generate
            </button>
          </div>
        </form>
      )}

      {currentTournament.authKeys.length === 0 ? (
        <p className="text-cyberpunk-accent opacity-75 text-sm">
          No auth keys yet. Generate keys to share with your friends!
        </p>
      ) : (
        <div className="space-y-3">
          {currentTournament.authKeys.map((authKey) => (
            <div key={authKey.id} className="bg-cyberpunk-dark rounded-lg p-3 flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-cyberpunk-secondary">
                  {authKey.username}
                </p>
                <code className="text-xs text-cyberpunk-accent truncate block">
                  {authKey.key}
                </code>
                <p className="text-xs text-cyberpunk-accent opacity-50 mt-1">
                  {new Date(authKey.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopyKey(authKey.key)}
                  className="btn-neon text-xs px-3 py-2"
                  title="Copy key"
                >
                  {copiedKey === authKey.key ? "✓" : "Copy"}
                </button>
                <button
                  onClick={() => removeAuthKey(authKey.id)}
                  className="text-cyberpunk-primary hover:text-red-400 transition-colors text-lg"
                  title="Delete key"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-cyberpunk-accent opacity-50 mt-4 pt-4 border-t border-cyberpunk-accent border-opacity-30">
        ℹ️ Max 10 auth keys per tournament. Share the generated key with your friends so they can access this tournament!
      </p>
    </div>
  );
}
