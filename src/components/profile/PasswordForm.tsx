"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Lock, Eye, EyeOff, Loader2, KeyRound } from "lucide-react";
import "@/styles/ProfileForm.css";

const passwordSchema = z.object({
  senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
  novaSenha: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.novaSenha === data.confirmarSenha, {
  message: "Senhas não coincidem",
  path: ["confirmarSenha"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordForm() {
  const { updatePassword, loading } = useAuth();
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    const result = await updatePassword(data.senhaAtual, data.novaSenha);
    if (result.success) {
      reset();
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile-form-header">
        <h3>Segurança</h3>
        <p>Altere sua senha de acesso</p>
      </div>

      <div className="form-group">
        <label>Senha atual</label>
        <div className="input-wrapper">
          <Lock size={18} />
          <input
            type={showSenhaAtual ? "text" : "password"}
            {...register("senhaAtual")}
            placeholder="••••••••"
            className={errors.senhaAtual ? "error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowSenhaAtual(!showSenhaAtual)}
          >
            {showSenhaAtual ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.senhaAtual && <span className="error-message">{errors.senhaAtual.message}</span>}
      </div>

      <div className="form-group">
        <label>Nova senha</label>
        <div className="input-wrapper">
          <KeyRound size={18} />
          <input
            type={showNovaSenha ? "text" : "password"}
            {...register("novaSenha")}
            placeholder="••••••••"
            className={errors.novaSenha ? "error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowNovaSenha(!showNovaSenha)}
          >
            {showNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.novaSenha && <span className="error-message">{errors.novaSenha.message}</span>}
      </div>

      <div className="form-group">
        <label>Confirmar nova senha</label>
        <div className="input-wrapper">
          <KeyRound size={18} />
          <input
            type={showNovaSenha ? "text" : "password"}
            {...register("confirmarSenha")}
            placeholder="••••••••"
            className={errors.confirmarSenha ? "error" : ""}
          />
        </div>
        {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Alterando...
          </>
        ) : (
          "Alterar Senha"
        )}
      </button>
    </form>
  );
}