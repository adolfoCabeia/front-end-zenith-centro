// store/authStore.ts
import { create } from "zustand";
import { authService } from "@/services/auth.service";

export interface User {
  id: string;
  nome: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // Define usuário e marca como autenticado
  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),

  // Atualiza dados do usuário (mantém autenticação)
  updateUser: (user) => set((state) => ({
    user: state.user ? { ...state.user, ...user } : user,
    isAuthenticated: true,
    isLoading: false,
  })),

  clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),

  login: async (email, senha) => {
    set({ isLoading: true });
    try {
      const { user } = await authService.login(email, senha);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      throw error;
    }
  },

  register: async (nome, email, senha) => {
    set({ isLoading: true });
    try {
      const { user } = await authService.register(nome, email, senha);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const { user } = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));