"use client";

import { useEffect, useState } from "react";
import { alunoService } from "@/services/aluno.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import "@/styles/AlunoForm.css";

const editAlunoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  status: z.enum(["PENDENTE", "ATIVO", "INATIVO"]),
});

type EditAlunoFormData = z.infer<typeof editAlunoSchema>;

interface AlunoFormProps {
  alunoId: string;
  onSuccess?: () => void;
}

export default function AlunoForm({ alunoId, onSuccess }: AlunoFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAlunoFormData>({
    resolver: zodResolver(editAlunoSchema),
  });

  useEffect(() => {
    const loadAluno = async () => {
      try {
        const res = await alunoService.getById(alunoId);
        const aluno = res.data.data;

        setValue("nome", aluno.nome);
        setValue("email", aluno.email);
        setValue("telefone", aluno.telefone);
        setValue("status", aluno.status);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar aluno");
      }
    };

    if (alunoId) {
      loadAluno();
    }
  }, [alunoId, setValue]);

  const onSubmit = async (data: EditAlunoFormData) => {
    setLoading(true);

    try {
      await alunoService.update(alunoId, data);
      toast.success("Atualizado com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="aluno-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Editar Aluno</h3>
      
      <div className="form-group">
        <input placeholder="Nome" {...register("nome")} />
        {errors.nome && <span className="error">{errors.nome.message}</span>}
      </div>

      <div className="form-group">
        <input placeholder="Email" {...register("email")} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <input placeholder="Telefone" {...register("telefone")} />
        {errors.telefone && <span className="error">{errors.telefone.message}</span>}
      </div>

      <div className="form-group">
        <select {...register("status")}>
          <option value="PENDENTE">Pendente</option>
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}