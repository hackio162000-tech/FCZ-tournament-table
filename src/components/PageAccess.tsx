"use client";

import { useState } from "react";

interface PageAccessProps {
  tournamentId: string;
  onGrantAccess: () => void;
}

export default function PageAccess({ tournamentId, onGrantAccess }: PageAccessProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check credentials (Role: 2323)
    if (id === "Role" && password === "2323") {
      // Store access token in sessionStorage (only for this session/page)
      sessionStorage.setItem(`access_${tournamentId}`, "true");
      onGrantAccess();
      return;
    }

    setError("Invalid ID or Password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-cyberpunk w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="neon-text text-3xl mb-2">🔐 Page Access</h1>
          <p className="text-cyberpunk-accent opacity-75">
            Enter credentials to view this tournament
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm text-cyberpunk-accent mb-2">
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter ID"
              className="w-full bg-gray-900 border border-cyan-500 rounded px-3 py-2 text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-cyberpunk-accent mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-gray-900 border border-cyan-500 rounded px-3 py-2 text-white"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Access Tournament
          </button>
        </form>

        <p className="text-center text-xs text-cyberpunk-tertiary mt-6 opacity-50">
          This access is temporary for this session only
        </p>
      </div>
    </div>
  );
}
