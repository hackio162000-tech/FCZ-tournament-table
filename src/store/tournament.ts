import { create } from "zustand";

export interface Team {
  id: string;
  name: string;
  rounds: number;
  wins: number;
  losses: number;
  points: number;
}

export interface AuthKey {
  id: string;
  key: string;
  username: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  createdAt: Date;
  shareCode?: string;
  authKeys: AuthKey[];
}

interface TournamentStore {
  tournaments: Tournament[];
  currentTournament: Tournament | null;

  createTournament: (name: string) => void;
  loadTournament: (id: string) => void;
  deleteTournament: (id: string) => void;
  addTeam: (name: string) => void;
  removeTeam: (teamId: string) => void;
  updateTeamScore: (
    teamId: string,
    rounds?: number,
    wins?: number,
    losses?: number,
    points?: number
  ) => void;
  generateShareCode: () => string;
  generateAuthKey: (username: string) => string | null;
  removeAuthKey: (keyId: string) => void;
  getSortedTeams: () => Team[];
  exportData: () => string;
  importData: (data: string) => void;
}

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  tournaments: [],
  currentTournament: null,

  createTournament: (name: string) => {
    const newTournament: Tournament = {
      id: Date.now().toString(),
      name,
      teams: [],
      createdAt: new Date(),
      shareCode: Math.random().toString(36).substring(2, 9).toUpperCase(),
      authKeys: [],
    };
    set((state) => ({
      tournaments: [...state.tournaments, newTournament],
      currentTournament: newTournament,
    }));
    // Save to localStorage
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  loadTournament: (id: string) => {
    const state = get();
    const tournament = state.tournaments.find((t) => t.id === id);
    if (tournament) {
      set({ currentTournament: tournament });
    }
  },

  deleteTournament: (id: string) => {
    set((state) => ({
      tournaments: state.tournaments.filter((t) => t.id !== id),
      currentTournament:
        state.currentTournament?.id === id ? null : state.currentTournament,
    }));
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  addTeam: (name: string) => {
    set((state) => {
      if (!state.currentTournament) return state;
      const newTeam: Team = {
        id: Date.now().toString(),
        name,
        rounds: 0,
        wins: 0,
        losses: 0,
        points: 0,
      };
      const updatedTournament = {
        ...state.currentTournament,
        teams: [...state.currentTournament.teams, newTeam],
      };
      const updatedTournaments = state.tournaments.map((t) =>
        t.id === state.currentTournament!.id ? updatedTournament : t
      );
      return {
        tournaments: updatedTournaments,
        currentTournament: updatedTournament,
      };
    });
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  removeTeam: (teamId: string) => {
    set((state) => {
      if (!state.currentTournament) return state;
      const updatedTournament = {
        ...state.currentTournament,
        teams: state.currentTournament.teams.filter((t) => t.id !== teamId),
      };
      const updatedTournaments = state.tournaments.map((t) =>
        t.id === state.currentTournament!.id ? updatedTournament : t
      );
      return {
        tournaments: updatedTournaments,
        currentTournament: updatedTournament,
      };
    });
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  updateTeamScore: (
    teamId: string,
    rounds?: number,
    wins?: number,
    losses?: number,
    points?: number
  ) => {
    set((state) => {
      if (!state.currentTournament) return state;
      const updatedTournament = {
        ...state.currentTournament,
        teams: state.currentTournament.teams.map((t) => {
          if (t.id === teamId) {
            const r = rounds !== undefined ? rounds : t.rounds;
            const w = wins !== undefined ? wins : t.wins;
            const l = losses !== undefined ? losses : t.losses;
            const p = points !== undefined ? points : t.points;
            return {
              ...t,
              rounds: r,
              wins: w,
              losses: l,
              points: p,
            };
          }
          return t;
        }),
      };
      const updatedTournaments = state.tournaments.map((t) =>
        t.id === state.currentTournament!.id ? updatedTournament : t
      );
      return {
        tournaments: updatedTournaments,
        currentTournament: updatedTournament,
      };
    });
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  generateShareCode: () => {
    const code = Math.random().toString(36).substring(2, 9).toUpperCase();
    set((state) => ({
      currentTournament: state.currentTournament
        ? { ...state.currentTournament, shareCode: code }
        : null,
    }));
    return code;
  },

  generateAuthKey: (username: string) => {
    const state = get();
    if (!state.currentTournament) return null;
    
    // Check if max 10 auth keys already exist
    if (state.currentTournament.authKeys.length >= 10) {
      return null;
    }

    const newKey: AuthKey = {
      id: Date.now().toString(),
      key: Math.random().toString(36).substring(2, 15).toUpperCase() + 
            Math.random().toString(36).substring(2, 15).toUpperCase(),
      username,
      createdAt: new Date(),
      isActive: true,
    };

    set((state) => {
      if (!state.currentTournament) return state;
      const updatedTournament = {
        ...state.currentTournament,
        authKeys: [...state.currentTournament.authKeys, newKey],
      };
      const updatedTournaments = state.tournaments.map((t) =>
        t.id === state.currentTournament!.id ? updatedTournament : t
      );
      return {
        tournaments: updatedTournaments,
        currentTournament: updatedTournament,
      };
    });

    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );

    return newKey.key;
  },

  removeAuthKey: (keyId: string) => {
    set((state) => {
      if (!state.currentTournament) return state;
      const updatedTournament = {
        ...state.currentTournament,
        authKeys: state.currentTournament.authKeys.filter((k) => k.id !== keyId),
      };
      const updatedTournaments = state.tournaments.map((t) =>
        t.id === state.currentTournament!.id ? updatedTournament : t
      );
      return {
        tournaments: updatedTournaments,
        currentTournament: updatedTournament,
      };
    });
    const store = get();
    localStorage.setItem(
      "tournaments",
      JSON.stringify(store.tournaments.map((t) => ({ ...t, createdAt: t.createdAt.toISOString(), authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() })) })))
    );
  },

  getSortedTeams: () => {
    const state = get();
    if (!state.currentTournament) return [];
    return [...state.currentTournament.teams].sort((a, b) => {
      // Sort by points first (descending), then by team name
      return b.points - a.points || a.name.localeCompare(b.name);
    });
  },

  exportData: () => {
    const state = get();
    return JSON.stringify({
      tournaments: state.tournaments.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        authKeys: t.authKeys.map(k => ({ ...k, createdAt: k.createdAt.toISOString() }))
      })),
    });
  },

  importData: (data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.tournaments && Array.isArray(parsed.tournaments)) {
        set({
          tournaments: parsed.tournaments.map((t: any) => ({
            ...t,
            createdAt: new Date(t.createdAt),
            authKeys: (t.authKeys || []).map((k: any) => ({
              ...k,
              createdAt: new Date(k.createdAt),
            }))
          })),
        });
        localStorage.setItem("tournaments", data);
      }
    } catch (error) {
      console.error("Failed to import data:", error);
    }
  },
}));

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("tournaments");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const tournaments = parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        authKeys: (t.authKeys || []).map((k: any) => ({
          ...k,
          createdAt: new Date(k.createdAt),
        })),
      }));
      useTournamentStore.setState({ tournaments });
    } catch (error) {
      console.error("Failed to load tournaments from localStorage:", error);
    }
  }
}
