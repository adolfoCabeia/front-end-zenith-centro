"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Loader2, Save } from "lucide-react";
import "@/styles/ProfileForm.css";

const profileSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { updateProfile, loading } = useAuth();
  const { user } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("nome", user.nome);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile(data.nome, data.email);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile-form-header">
        <h3>Informações Pessoais</h3>
        <p>Atualize seus dados de perfil</p>
      </div>

      <div className="form-group">
        <label>Nome completo</label>
        <div className="input-wrapper">
          <User size={18} />
          <input
            {...register("nome")}
            placeholder="Seu nome"
            className={errors.nome ? "error" : ""}
          />
        </div>
        {errors.nome && <span className="error-message">{errors.nome.message}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <div className="input-wrapper">
          <Mail size={18} />
          <input
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={errors.email ? "error" : ""}
          />
        </div>
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={loading || !isDirty}
        className="btn-primary"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Salvando...
          </>
        ) : (
          <>
            <Save size={18} />
            Salvar Alterações
          </>
        )}
      </button>
    </form>
  );
}