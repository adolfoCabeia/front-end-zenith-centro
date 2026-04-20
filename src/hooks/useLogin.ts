// src/hooks/useLogin.ts (ou useAuth.ts)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const setUser = useAuthStore((s) => s.setUser); 

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const { user } = await authService.login(email, senha);
      setUser(user); 
      toast.success(`Bem-vindo, ${user.nome}!`);
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};