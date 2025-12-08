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

  // 🔐 FIXED ADMIN LOGIN ONLY
  login: (username: string, password: string) => {
    const VALID_USERNAME = "Admin";
    const VALID_PASSWORD = "241703";

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const user: User = {
        id: "admin-001",
        username: "Admin",
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

// Load from localStorage on startup
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
