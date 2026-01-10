import { create } from "zustand";

export interface User {
  id: number;
  // name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    set({
      token,
      user: user ? JSON.parse(user) : null,
      isHydrated: true,
    });
  },
}));
