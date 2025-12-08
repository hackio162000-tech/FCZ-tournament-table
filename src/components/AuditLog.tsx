"use client";

import { useTournamentStore, ChangeLog } from "@/store/tournament";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function AuditLog() {
  const { currentTournament, getChangeLog, exportChangeLog, clearChangeLog } = useTournamentStore();
  const { user } = useAuthStore();
  const [expanded, setExpanded] = useState(false);
  const [filterAdmin, setFilterAdmin] = useState<string>("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!currentTournament || user?.role !== "admin") {
    return null;
  }

  const allChanges = getChangeLog();
  const filteredChanges =
    filterAdmin === "all"
      ? allChanges
      : allChanges.filter((log) => log.adminName === filterAdmin);

  const adminNames = Array.from(new Set(allChanges.map((log) => log.adminName)));

  const handleExport = () => {
    const data = exportChangeLog();
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(data);
    const exportFileDefaultName = `audit-log-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleShare = () => {
    const data = exportChangeLog();
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(data);

    // Try to share
    if (navigator.share) {
      navigator.share({
        title: `Audit Log - ${currentTournament.name}`,
        text: `Complete audit log with ${filteredChanges.length} changes`,
        url: dataUri,
      }).catch((err) => console.log("Share failed:", err));
    } else {
      // Fallback to copy JSON to clipboard
      navigator.clipboard.writeText(data);
      alert("Audit log copied to clipboard!");
    }
  };

  const getActionBadgeColor = (action: ChangeLog["action"]) => {
    switch (action) {
      case "score_update":
        return "bg-blue-500 text-white";
      case "team_added":
        return "bg-green-500 text-white";
      case "team_removed":
        return "bg-red-500 text-white";
      case "tournament_created":
        return "bg-purple-500 text-white";
      case "tournament_deleted":
        return "bg-red-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getActionIcon = (action: ChangeLog["action"]) => {
    switch (action) {
      case "score_update":
        return "📊";
      case "team_added":
        return "➕";
      case "team_removed":
        return "➖";
      case "tournament_created":
        return "🎯";
      case "tournament_deleted":
        return "🗑️";
      default:
        return "📝";
    }
  };

  return (
    <div className="card-cyberpunk mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="neon-text text-lg flex items-center gap-2">
          📋 Audit Log ({filteredChanges.length})
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded"
        >
          {expanded ? "▼ Hide" : "▶ Show"}
        </button>
      </div>

      {expanded && (
        <>
          {/* Controls */}
          <div className="mb-4 pb-4 border-b border-cyan-500 border-opacity-30 space-y-3">
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterAdmin}
                onChange={(e) => setFilterAdmin(e.target.value)}
                className="px-3 py-2 bg-gray-800 text-white text-sm rounded border border-cyan-500 border-opacity-50"
              >
                <option value="all">👥 All Admins</option>
                {adminNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleExport}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-all"
              >
                💾 Export JSON
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-all"
              >
                🔗 Share
              </button>

              {allChanges.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-all"
                >
                  🗑️ Clear Log
                </button>
              )}
            </div>

            {showClearConfirm && (
              <div className="p-3 bg-red-900 bg-opacity-30 rounded border border-red-500">
                <p className="text-xs text-red-300 mb-2">Clear all audit log history?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      clearChangeLog();
                      setShowClearConfirm(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 rounded"
                  >
                    ✓ Clear
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold py-1 rounded"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Changes List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredChanges.length === 0 ? (
              <p className="text-xs text-gray-400">No changes recorded</p>
            ) : (
              filteredChanges.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-gray-800 rounded border border-cyan-500 border-opacity-20 text-xs"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getActionIcon(log.action)}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getActionBadgeColor(log.action)}`}>
                        {log.action.toUpperCase().replace(/_/g, " ")}
                      </span>
                    </div>
                    <span className="text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-cyan-400 font-semibold mb-1">{log.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-gray-300">
                    <p>
                      <span className="text-purple-400">Admin:</span> {log.adminName}
                    </p>
                    <p>
                      <span className="text-purple-400">Tournament:</span> {log.tournamentName}
                    </p>
                    {log.teamName && (
                      <p>
                        <span className="text-purple-400">Team:</span> {log.teamName}
                      </p>
                    )}
                    {log.fieldChanged && (
                      <p>
                        <span className="text-purple-400">Field:</span> {log.fieldChanged}
                      </p>
                    )}
                  </div>

                  {log.oldValue !== undefined && log.newValue !== undefined && (
                    <div className="mt-2 p-2 bg-gray-900 rounded border border-yellow-500 border-opacity-30">
                      <p className="text-yellow-400 text-xs font-mono">
                        {log.oldValue} <span className="text-green-400">→</span> {log.newValue}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
