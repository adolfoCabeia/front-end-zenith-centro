// services/auth.service.ts
import { api } from "./api";
import { User } from "@/store/authStore";

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

interface UpdateProfileResponse {
  message: string;
  user: User;
}

interface UpdatePasswordData {
  senhaAtual: string;
  novaSenha: string;
}

export const authService = {
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const res = await api.post('/auth/login', { email, senha });
    return res.data;
  },

  register: async (nome: string, email: string, senha: string): Promise<RegisterResponse> => {
    const res = await api.post('/auth/register', { nome, email, senha });
    return res.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const res = await api.get('/auth/profile');
    return res.data;
  },

  updateProfile: async (nome: string, email: string): Promise<UpdateProfileResponse> => {
    const res = await api.put('/auth/profile', { nome, email });
    return res.data;
  },

  updatePassword: async (data: UpdatePasswordData): Promise<{ message: string }> => {
    const res = await api.put('/auth/password', data);
    return res.data;
  },
};