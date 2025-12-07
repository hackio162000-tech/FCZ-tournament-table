import { create } from "zustand";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (username: string, password: string) => {
    // Simple hardcoded authentication for Nithi
    if (username === "Nithi" && password.length > 0) {
      const user: User = {
        id: "nithi-001",
        username: "Nithi",
        email: "nithi@tournament.com",
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
  },

  register: (username: string, email: string, password: string) => {
    if (username && email && password.length >= 6) {
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        email,
      };
      set({ user, isLoggedIn: true });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  },
}));

// Load user from localStorage on init
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("user");
  if (stored) {
    try {
      const user = JSON.parse(stored);
      useAuthStore.setState({ user, isLoggedIn: true });
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    }
  }
}
