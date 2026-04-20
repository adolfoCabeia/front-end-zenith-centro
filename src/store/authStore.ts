import { create } from "zustand";
import { persist } from "zustand/middleware"; 
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
  hasChecked: boolean; 

  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasChecked: false,

      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),

      updateUser: (user) => set((state) => ({
        user: state.user ? { ...state.user, ...user } : null,
        isAuthenticated: true,
        isLoading: false,
      })),

      clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false, hasChecked: true }),

      login: async (email, senha) => {
        set({ isLoading: true });
        try {
          const { user } = await authService.login(email, senha);
          set({ user, isAuthenticated: true, isLoading: false, hasChecked: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false, hasChecked: true });
          throw error;
        }
      },

      register: async (nome, email, senha) => {
        set({ isLoading: true });
        try {
          const { user } = await authService.register(nome, email, senha);
          set({ user, isAuthenticated: true, isLoading: false, hasChecked: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false, hasChecked: true });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } finally {
          set({ user: null, isAuthenticated: false, isLoading: false, hasChecked: true });
        }
      },

      fetchProfile: async () => {

        if (get().hasChecked && get().isAuthenticated) return;

        set({ isLoading: true });
        try {
          const { user } = await authService.getProfile();
          set({ user, isAuthenticated: true, isLoading: false, hasChecked: true });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false, hasChecked: true });
        }
      },
    }),
    {
      name: 'auth-storage', 
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        hasChecked: state.hasChecked 
      }),
    }
  )
);