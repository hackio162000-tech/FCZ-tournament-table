"use client";

import { useAuthStore } from "@/store/auth";
import { useTournamentStore } from "@/store/tournament";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import TournamentHeader from "@/components/TournamentHeader";
import AddTeamForm from "@/components/AddTeamForm";
import PointsTable from "@/components/PointsTable";
import ShareModal from "@/components/ShareModal";
import TournamentList from "@/components/TournamentList";
import AuthKeysManager from "@/components/AuthKeysManager";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoggedIn } = useAuthStore();
  const { currentTournament, tournaments, loadTournament } =
    useTournamentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check for shared tournament in URL
    const params = new URLSearchParams(window.location.search);
    const shareCode = params.get("tournament");

    if (shareCode) {
      const tournament = tournaments.find((t) => t.shareCode === shareCode);
      if (tournament) {
        loadTournament(tournament.id);
      }
    }
  }, []);

  if (!mounted) return null;

  if (!isLoggedIn) {
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
        <Navbar />
        {/* Header with Tournament Info */}
        <div className="mb-8">
          <h1 className="neon-text text-4xl md:text-5xl mb-4 flicker">
            ⚡ SNG Tournament Maker
          </h1>
        </div>

        {/* Navigation */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => loadTournament("")}
            className="btn-neon text-sm"
          >
            ← Back to Tournaments
          </button>
        </div>

        {/* Main Content */}
        <TournamentHeader />
        <AddTeamForm />
        <AuthKeysManager />
        <PointsTable />

        {/* Share Modal */}
        <ShareModal />
      </div>

      <Footer />
    </main>
  );
}
