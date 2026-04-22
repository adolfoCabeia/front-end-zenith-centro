"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Upload,
  FileCheck,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Save,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { alunoService } from "@/services/aluno.service";
import useTurmaStore from "@/store/turmaStore";
import "@/styles/InscrincaoForm.css";
import { useRouter } from "next/navigation";

const alunoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  turmaId: z.string().min(1, "Selecione uma turma"),
  status: z.enum(["PENDENTE", "ATIVO", "INATIVO"]),
  biUrl: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "BI é obrigatório",
    })
    .refine((files) => files.length > 0, "Selecione o arquivo do BI"),
  comprovativoUrl: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Comprovativo é obrigatório",
    })
    .refine((files) => files.length > 0, "Selecione o comprovativo"),
});

type AlunoFormData = z.infer<typeof alunoSchema>;

export function CreateAlunoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [biFileName, setBiFileName] = useState<string | null>(null);
  const [comprovativoFileName, setComprovativoFileName] = useState<string | null>(null);

  const { turmas, fetchTurmas, loading } = useTurmaStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      status: "PENDENTE",
    },
  });

  const biFiles = watch("biUrl");
  const comprovativoFiles = watch("comprovativoUrl");

  useEffect(() => {
    if (biFiles?.length > 0) {
      setBiFileName(biFiles[0].name);
    } else {
      setBiFileName(null);
    }
  }, [biFiles]);

  useEffect(() => {
    if (comprovativoFiles?.length > 0) {
      setComprovativoFileName(comprovativoFiles[0].name);
    } else {
      setComprovativoFileName(null);
    }
  }, [comprovativoFiles]);

  const formatDias = (dias: string[]) => {
    const mapDias: Record<string, string> = {
      segunda: "Segunda",
      terca: "Terça",
      quarta: "Quarta",
      quinta: "Quinta",
      sexta: "Sexta",
      sabado: "Sábado",
      domingo: "Domingo",
    };
    return dias.map((d) => mapDias[d] || d).join(", ");
  };

  const onSubmit = async (data: AlunoFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (!data.biUrl?.[0] || !data.comprovativoUrl?.[0]) {
        throw new Error("Arquivos não selecionados corretamente");
      }

      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("email", data.email);
      formData.append("telefone", data.telefone);
      formData.append("turmaId", data.turmaId);
      formData.append("status", data.status);
      formData.append("biUrl", data.biUrl[0]);
      formData.append("comprovativoUrl", data.comprovativoUrl[0]);

      await alunoService.create(formData);

      const params = new URLSearchParams({
        nome: data.nome,
        email: data.email,
      });
      router.push(`/inscricao/sucesso?${params.toString()}`);
    } catch (error: any) {
      console.error("Erro completo:", error);
      const backendError = error.response?.data?.error || error.response?.data?.message;
      const errorMessage = backendError || error.message || "Erro ao cadastrar aluno";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, [fetchTurmas]);

  return (
    <div className="inscricao-container">
      <div className="inscricao-card">
        <div className="inscricao-glow" />

        <div className="inscricao-content">
          <div className="inscricao-badge">
            <GraduationCap size={14} />
            Inscrever-se
          </div>

          <h1 className="inscricao-title">Cadastro de Aluno</h1>

          <p className="inscricao-subtitle">
            Preencha todos os campos para realizar a matrícula no centro de formação.
          </p>

          {submitSuccess && (
            <div className="inscricao-alert-success">
              <CheckCircle size={20} />
              Aluno cadastrado com sucesso!
            </div>
          )}

          {submitError && (
            <div className="inscricao-alert-error">
              <AlertCircle size={20} />
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="inscricao-form">
            <div className="inscricao-form-group">
              <label className="inscricao-label">Nome Completo</label>
              <input
                {...register("nome")}
                type="text"
                placeholder="João Silva"
                className={errors.nome ? "inscricao-input-error" : "inscricao-input"}
              />
              {errors.nome && (
                <p className="inscricao-error">{errors.nome.message}</p>
              )}
            </div>

            <div className="inscricao-form-row">
              <div className="inscricao-form-group">
                <label className="inscricao-label">E-mail</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="joao@email.com"
                  className={errors.email ? "inscricao-input-error" : "inscricao-input"}
                />
                {errors.email && (
                  <p className="inscricao-error">{errors.email.message}</p>
                )}
              </div>

              <div className="inscricao-form-group">
                <label className="inscricao-label">Telefone</label>
                <input
                  {...register("telefone")}
                  type="tel"
                  placeholder="923456789"
                  className={errors.telefone ? "inscricao-input-error" : "inscricao-input"}
                />
                {errors.telefone && (
                  <p className="inscricao-error">{errors.telefone.message}</p>
                )}
              </div>
            </div>

            <div className="inscricao-form-group">
              <label className="inscricao-label">Turma</label>
              <div className="inscricao-select-wrapper">
                <select
                  {...register("turmaId")}
                  className={errors.turmaId ? "inscricao-input-error" : "inscricao-select"}
                >
                  <option value="">Selecione a turma</option>
                  {loading ? (
                    <option disabled>Carregando turmas...</option>
                  ) : (
                    turmas?.map((turma: any) => (
                      <option key={turma.id} value={turma.id}>
                        {formatDias(turma.diaSemana)} | {turma.horario} | {turma.curso?.nome || "Curso"}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="inscricao-select-icon" size={20} />
              </div>
              {errors.turmaId && (
                <p className="inscricao-error">{errors.turmaId.message}</p>
              )}
            </div>

            <div className="info">
              <h3>Coordenadas bancárias para o pagamento: </h3>
              <p>IBAN: 0006 0000 5426 8125 3017 7 (BFA)</p>
              <p>IBAN: 0040 0000 7682 1391 1019 1 (BAI)</p>
              <p>Express: 932 949 521</p>
              <p>Nome: Samuel Rafael Pinheiro Tanduyan</p>
            </div>

            <div className="inscricao-upload-grid">
              <div className="inscricao-form-group">
                <label className="inscricao-label">BI (PDF, JPG, PNG)</label>
                <div
                  className={errors.biUrl ? "inscricao-upload-area-error" : "inscricao-upload-area"}
                  data-has-file={!!biFileName}
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    {...register("biUrl")}
                    className="inscricao-upload-input"
                  />

                  {biFileName ? (
                    <>
                      <FileCheck size={32} className="inscricao-upload-icon-success" />
                      <p className="inscricao-upload-text-success">{biFileName}</p>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="inscricao-upload-icon" />
                      <p className="inscricao-upload-text">Clique para upload</p>
                    </>
                  )}
                </div>
                {errors.biUrl && (
                  <p className="inscricao-error">{errors.biUrl.message}</p>
                )}
              </div>

              <div className="inscricao-form-group">
                <label className="inscricao-label">Comprovativo</label>
                <div
                  className={errors.comprovativoUrl ? "inscricao-upload-area-error" : "inscricao-upload-area"}
                  data-has-file={!!comprovativoFileName}
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    {...register("comprovativoUrl")}
                    className="inscricao-upload-input"
                  />

                  {comprovativoFileName ? (
                    <>
                      <FileCheck size={32} className="inscricao-upload-icon-success" />
                      <p className="inscricao-upload-text-success">{comprovativoFileName}</p>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="inscricao-upload-icon" />
                      <p className="inscricao-upload-text">Clique para upload</p>
                    </>
                  )}
                </div>
                {errors.comprovativoUrl && (
                  <p className="inscricao-error">{errors.comprovativoUrl.message}</p>
                )}
              </div>
            </div>

            <input type="hidden" {...register("status")} />

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="inscricao-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="inscricao-spinner" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Cadastrar Aluno
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}