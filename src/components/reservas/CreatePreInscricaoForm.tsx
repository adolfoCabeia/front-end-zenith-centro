"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { z } from "zod";

import "@/styles/InscrincaoForm.css";

import { useCursoStore } from "@/store/cursoStore";
import { preInscricaoService } from "@/services/preInscricaoService";

const preInscricaoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  cursoId: z.string().min(1, "Selecione um curso"),
});

type PreInscricaoFormData = z.infer<typeof preInscricaoSchema>;

export function CreatePreInscricaoForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { cursos, fetchCursos, loading } = useCursoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PreInscricaoFormData>({
    resolver: zodResolver(preInscricaoSchema),
  });

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  const onSubmit = async (data: PreInscricaoFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await preInscricaoService.criar(data);

      const cursoSelecionado = cursos.find(
        (curso) => curso.id === data.cursoId
      );

      const params = new URLSearchParams({
        nome: data.nome,
        email: data.email,
        curso: cursoSelecionado?.nome || "",
      });

      reset();

      router.push(
        `/reservas/sucesso?${params.toString()}`
      );
    } catch (error: any) {
      setSubmitError(
        error?.response?.data?.message ||
          "Erro ao realizar a pré-inscrição"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inscricao-container">
      <div className="inscricao-card">
        <div className="inscricao-glow" />

        <div className="inscricao-content">
          <div className="inscricao-badge">
            <GraduationCap size={14} />
            Garantir Vaga
          </div>

          <h1 className="inscricao-title">
            Pré-Inscrição
          </h1>

          <p className="inscricao-subtitle">
            Garanta já a sua vaga e seja contactado assim que
            abrirmos novas turmas.
          </p>

          {submitError && (
            <div className="inscricao-alert-error">
              <AlertCircle size={20} />
              {submitError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="inscricao-form"
          >
            <div className="inscricao-form-group">
              <label className="inscricao-label">
                Nome Completo
              </label>

              <input
                {...register("nome")}
                type="text"
                placeholder="João Silva"
                className={
                  errors.nome
                    ? "inscricao-input-error"
                    : "inscricao-input"
                }
              />

              {errors.nome && (
                <p className="inscricao-error">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div className="inscricao-form-row">
              <div className="inscricao-form-group">
                <label className="inscricao-label">
                  E-mail
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="joao@email.com"
                  className={
                    errors.email
                      ? "inscricao-input-error"
                      : "inscricao-input"
                  }
                />

                {errors.email && (
                  <p className="inscricao-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="inscricao-form-group">
                <label className="inscricao-label">
                  Telefone
                </label>

                <input
                  {...register("telefone")}
                  type="tel"
                  placeholder="923456789"
                  className={
                    errors.telefone
                      ? "inscricao-input-error"
                      : "inscricao-input"
                  }
                />

                {errors.telefone && (
                  <p className="inscricao-error">
                    {errors.telefone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="inscricao-form-group">
              <label className="inscricao-label">
                Curso de Interesse
              </label>

              <div className="inscricao-select-wrapper">
                <select
                  {...register("cursoId")}
                  className={
                    errors.cursoId
                      ? "inscricao-input-error"
                      : "inscricao-select"
                  }
                >
                  <option value="">
                    Selecione um curso
                  </option>

                  {loading ? (
                    <option disabled>
                      Carregando cursos...
                    </option>
                  ) : (
                    cursos.map((curso) => (
                      <option
                        key={curso.id}
                        value={curso.id}
                      >
                        {curso.nome}
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="inscricao-select-icon"
                />
              </div>

              {errors.cursoId && (
                <p className="inscricao-error">
                  {errors.cursoId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="inscricao-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={20}
                    className="inscricao-spinner"
                  />
                  Processando...
                </>
              ) : (
                <>
                  <GraduationCap size={20} />
                  Garantir Minha Vaga
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}