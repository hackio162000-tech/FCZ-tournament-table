"use client";

import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function LoginPage() {
  const { login, register, isLoggedIn } = useAuthStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // REAL fixed credentials
  const VALID_USERNAME = "Nithi";           // change if needed
  const VALID_PASSWORD = "mynewpassword123";   // put your real password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    // CHECK REAL USERNAME + PASSWORD
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      login(username, password);
      setUsername("");
      setPassword("");
      return;
    }

    setError("Invalid username or password");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (register(username, email, password)) {
      setUsername("");
      setEmail("");
      setPassword("");
      setIsRegistering(false);
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-cyberpunk w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="neon-text text-4xl mb-2 flicker">⚡ SNG Tournament Maker</h1>
          <p className="text-cyberpunk-accent opacity-75">Login to get started</p>
        </div>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {/* Username */}
          <div>
            <label className="block text-sm text-cyberpunk-accent mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full"
            />
          </div>

          {/* Email (Only when Registering) */}
          {isRegistering && (
            <div>
              <label className="block text-sm text-cyberpunk-accent mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm text-cyberpunk-accent mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full"
            />
            {isRegistering && (
              <p className="text-xs text-cyberpunk-tertiary mt-1 opacity-75">
                At least 6 characters
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-neon-primary w-full">
            {isRegistering ? "Create Account" : "Login"}
          </button>

          {/* Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setUsername("");
              setEmail("");
              setPassword("");
            }}
            className="w-full text-sm text-cyberpunk-accent hover:text-cyberpunk-accentDim transition-colors"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </form>

        {/* 🔥 Demo removed completely */}
      </div>
    </div>
  );
}
