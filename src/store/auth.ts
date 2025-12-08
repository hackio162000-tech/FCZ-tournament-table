import { create } from "zustand";

interface User {
  id: string;
  username: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,

  // MULTIPLE ADMINS HERE 🔥
  login: (username: string, password: string) => {
    const ADMINS = [
      { username: "Admin", password: "admin@123" },
      { username: "Nithi", password: "nithi@123" },
      { username: "SuperAdmin", password: "SuperAdmin@2025" },
    ];

    const match = ADMINS.find(
      (user) => user.username === username && user.password === password
    );

    if (match) {
      const user: User = {
        id: match.username.toLowerCase(),
        username: match.username,
      };

      set({ user, isLoggedIn: true });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }

    return false;
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem("user");
  }
}));

// Load saved user on page refresh
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("user");
  if (stored) {
    try {
      const user = JSON.parse(stored);
      useAuthStore.setState({ user, isLoggedIn: true });
    } catch (err) {
      console.error("Failed to load saved user", err);
    }
  }
}
