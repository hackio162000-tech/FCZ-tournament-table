"use client";

import { useTournamentStore } from "@/store/tournament";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function Settings() {
  const { currentTournament, tournaments, getBackupHistory, restoreFromBackup } = useTournamentStore();
  const { logout, user } = useAuthStore();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showBackupConfirm, setShowBackupConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAutoBackupHistory, setShowAutoBackupHistory] = useState(false);
  const backupRecords = getBackupHistory();

  if (!currentTournament) return null;

  // Only show for admins
  if (user?.role !== "admin") {
    return null;
  }

  const handleBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      tournaments: tournaments.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        authKeys: t.authKeys.map((k) => ({
          ...k,
          createdAt: k.createdAt.toISOString(),
        })),
      })),
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `tournament-backup-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    setShowBackupConfirm(false);
  };

  const handleRestore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.tournaments) {
            localStorage.setItem("tournaments", JSON.stringify(data.tournaments));
            window.location.reload();
          }
        } catch (error) {
          alert("Invalid backup file");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  };

  return (
    <div className="card-cyberpunk">
      <h2 className="text-2xl font-bold text-cyberpunk-accent mb-6 flex items-center gap-2">
        ⚙️ Settings
      </h2>

      {/* Theme */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-cyan-500 border-opacity-30">
        <h3 className="text-sm font-bold text-cyberpunk-tertiary mb-3">Theme</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark"
                ? "bg-cyan-500 text-black font-bold"
                : "bg-gray-700 text-white"
            }`}
          >
            🌙 Dark
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded transition-all ${
              theme === "light"
                ? "bg-cyan-500 text-black font-bold"
                : "bg-gray-700 text-white"
            }`}
          >
            ☀️ Light
          </button>
        </div>
        <p className="text-xs text-cyberpunk-tertiary opacity-50 mt-2">
          Light theme coming soon
        </p>
      </div>

      {/* Backup & Restore */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-cyan-500 border-opacity-30 space-y-3">
        <h3 className="text-sm font-bold text-cyberpunk-tertiary">Backup & Restore</h3>

        <button
          onClick={() => setShowBackupConfirm(true)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
        >
          💾 Backup Data
        </button>

        <button
          onClick={handleRestore}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
        >
          📂 Restore from Backup
        </button>

        {showBackupConfirm && (
          <div className="p-3 bg-gray-800 rounded border border-yellow-500 border-opacity-50">
            <p className="text-xs text-yellow-400 mb-2">Confirm backup download?</p>
            <div className="flex gap-2">
              <button
                onClick={handleBackup}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => setShowBackupConfirm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                ✕ No
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Tournament */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-red-500 border-opacity-30">
        <h3 className="text-sm font-bold text-red-400 mb-3">⚠️ Danger Zone</h3>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
        >
          🔄 Reset Tournament
        </button>

        {showResetConfirm && (
          <div className="mt-3 p-3 bg-red-900 bg-opacity-30 rounded border border-red-500">
            <p className="text-xs text-red-300 mb-2">
              This will delete all teams and data. This cannot be undone!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem("tournaments");
                  window.location.reload();
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                🗑️ Delete All
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Auto Backup History */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-green-500 border-opacity-30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-cyberpunk-accent">
            🔄 Backup History (Unlimited)
          </h3>
          <button
            onClick={() => setShowAutoBackupHistory(!showAutoBackupHistory)}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
          >
            {showAutoBackupHistory ? "▼ Hide" : "▶ Show"}
          </button>
        </div>

        {showAutoBackupHistory && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {backupRecords.length === 0 ? (
              <p className="text-xs text-gray-400">No backups yet. They will be created automatically when you edit scores.</p>
            ) : (
              backupRecords.map((backup, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-800 rounded border border-green-500 border-opacity-20 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="text-green-400 font-bold">{backup.tournamentName}</p>
                    <p className="text-gray-400">
                      {new Date(backup.timestamp).toLocaleString()} · {backup.teamsCount} teams
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      restoreFromBackup(index);
                      alert("Backup restored successfully!");
                      setShowAutoBackupHistory(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    ⟲ Restore
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-2">
          ✓ Automatic backups created on every score update
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded transition-all"
      >
        🚪 Logout
      </button>
    </div>
  );
}
