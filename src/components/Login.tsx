"use client";

import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuthStore();

  // 🔐 FIXED CREDENTIALS (Only Admin can log in)
  const VALID_USERNAME = "Admin";
  const VALID_PASSWORD = "241703";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    // CHECK CORRECT USERNAME AND PASSWORD
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      login(username, password);
      setUsername("");
      setPassword("");
      return;
    }

    setError("Invalid username or password");
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-cyberpunk w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="neon-text text-4xl mb-2 flicker">⚡ SNG Tournament Maker</h1>
          <p className="text-cyberpunk-accent opacity-75">Login to get started</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-sm text-cyberpunk-accent mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full"
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
              className="w-full"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button type="submit" className="btn-neon-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
