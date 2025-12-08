"use client";

import { useAuthStore } from "@/store/auth";
import { useTournamentStore } from "@/store/tournament";
import Login from "@/components/Login";
import PageAccess from "@/components/PageAccess";
import Navbar from "@/components/Navbar";
import TournamentHeader from "@/components/TournamentHeader";
import AddTeamForm from "@/components/AddTeamForm";
import PointsTable from "@/components/PointsTable";
import ShareModal from "@/components/ShareModal";
import TournamentList from "@/components/TournamentList";
import AuthKeysManager from "@/components/AuthKeysManager";
import GroupCreation from "@/components/GroupCreation";
import Settings from "@/components/Settings";
import AuditLog from "@/components/AuditLog";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoggedIn } = useAuthStore();
  const { currentTournament, tournaments, loadTournament } =
    useTournamentStore();
  const [mounted, setMounted] = useState(false);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [pageAccessGranted, setPageAccessGranted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check for shared tournament in URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get("tournament");

    if (code) {
      setShareCode(code);
      const tournament = tournaments.find((t) => t.shareCode === code);
      if (tournament) {
        loadTournament(tournament.id);
        // Check if access was already granted in this session
        const hasAccess = sessionStorage.getItem(`access_${tournament.id}`);
        setPageAccessGranted(!!hasAccess);
      }
    }
  }, [tournaments, loadTournament]);

  if (!mounted) return null;

  // If shared link AND no page access yet, show page access screen
  if (shareCode && !pageAccessGranted) {
    return (
      <PageAccess
        tournamentId={currentTournament?.id || ""}
        onGrantAccess={() => setPageAccessGranted(true)}
      />
    );
  }

  if (!isLoggedIn && !shareCode) {
    return <Login />;
  }

  if (!currentTournament) {
    return (
      <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col">
        <div className="flex-1">
          <Navbar />
          <TournamentList />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col">
      <div className="flex-1">
        {!shareCode && <Navbar />}
        {/* Header with Tournament Info */}
        <div className="mb-8">
          <h1 className="neon-text text-4xl md:text-5xl mb-4 flicker">
            ⚡ SNG Tournament Maker
          </h1>
        </div>

        {/* Navigation */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => {
              if (shareCode) {
                window.location.href = "/";
              } else {
                loadTournament("");
              }
            }}
            className="btn-neon text-sm"
          >
            ← Back to Tournaments
          </button>
        </div>

        {/* Main Content */}
        <TournamentHeader />
        {!shareCode && <AddTeamForm />}
        {!shareCode && <AuthKeysManager />}
        <PointsTable />

        {/* Audit Log - shows all changes */}
        {!shareCode && <AuditLog />}

        {/* Group Management */}
        {!shareCode && <GroupCreation />}

        {/* Settings */}
        {!shareCode && <Settings />}

        {/* Share Modal - only show in full access */}
        {!shareCode && <ShareModal />}
      </div>

      <Footer />
    </main>
  );
}
