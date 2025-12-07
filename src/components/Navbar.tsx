"use client";

import { useAuthStore } from "@/store/auth";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <nav className="card-cyberpunk mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="neon-text text-xl">⚡ SNG Tournament Maker</h2>
        <div className="text-sm text-cyberpunk-secondary">
          Welcome, <span className="text-cyberpunk-accent font-bold">{user.username}</span>
        </div>
      </div>
      <button onClick={logout} className="btn-neon text-sm">
        Logout
      </button>
    </nav>
  );
}
