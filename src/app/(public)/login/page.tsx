"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "@/styles/login.css";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await authService.login(data.email, data.senha);

      setUser(res.user);

      toast.success("Login feito com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro no login");
    }
  };

  return (
    <div className="login-container dark">
      <div className="login-left">
        <h1>
          Bem-vindo ao <span>Sistema</span>
        </h1>
        <p>
          Gerencie alunos, turmas e usuários com uma experiência moderna,
          rápida e segura.
        </p>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <h2>Entrar</h2>

          <div className="form-group">
            <input {...register("email")} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <input
              {...register("senha")}
              type="password"
              placeholder="Senha"
            />
            {errors.senha && <span>{errors.senha.message}</span>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}