import { api } from "./api";

interface User {
  id: string;
  nome: string;
  email: string;
}
interface AuthResponse {
  message: string;
  user: User;
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
  login: async (email: string, senha: string): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', { email, senha });
    return res.data; 
  },

  register: async (nome: string, email: string, senha: string): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', { nome, email, senha });
    return res.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const res = await api.post('/auth/logout');
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