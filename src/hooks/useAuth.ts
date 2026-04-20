"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const { setUser, logout: storeLogout, updateUser } = useAuthStore();

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

  const register = async (nome: string, email: string, senha: string) => {
    setLoading(true);
    try {
      const { user } = await authService.register(nome, email, senha);
      setUser(user);
      toast.success("Conta criada com sucesso!");
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao criar conta";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await storeLogout(); 
      toast.success("Logout realizado!");
      router.push('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao sair";
      toast.error(message);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (nome: string, email: string) => {
    setLoading(true);
    try {
      const { user } = await authService.updateProfile(nome, email);
      updateUser(user);
      toast.success("Perfil atualizado com sucesso!");
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao atualizar perfil";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (senhaAtual: string, novaSenha: string) => {
    setLoading(true);
    try {
      await authService.updatePassword({ senhaAtual, novaSenha });
      toast.success("Senha alterada com sucesso!");
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao alterar senha";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { 
    login, 
    register, 
    logout, 
    updateProfile, 
    updatePassword, 
    loading 
  };
};