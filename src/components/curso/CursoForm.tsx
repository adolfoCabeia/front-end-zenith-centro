// components/CursoForm.tsx
"use client";

import { useEffect, useState } from "react";
import { cursoService } from "@/services/curso.service";
import { useForm } from "react-hook-form";
import "@/styles/CursoForm.css";
import toast from "react-hot-toast";
import { BookOpen, DollarSign, Loader2 } from "lucide-react";

interface FormData {
  nome: string;
  preco: number;
}

interface CursoFormProps {
  cursoId?: string;
  onSuccess?: () => void;
}

export default function CursoForm({ cursoId, onSuccess }: CursoFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!cursoId) return;

    const loadCurso = async () => {
      try {
        const res = await cursoService.getById(cursoId);
        const curso = res.data;

        setValue("nome", curso.nome);
        setValue("preco", curso.preco);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar curso");
      }
    };

    loadCurso();
  }, [cursoId, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("preco", String(data.preco));

      if (cursoId) {
        await cursoService.update(cursoId, formData);
        toast.success("Curso atualizado com sucesso!");
      } else {
        await cursoService.create(formData);
        toast.success("Curso criado com sucesso!");
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="curso-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{cursoId ? "Editar Curso" : "Novo Curso"}</h3>
      
      <p className="curso-form-subtitle">
        {cursoId 
          ? "Atualize as informações do curso abaixo" 
          : "Preencha os dados para criar um novo curso"}
      </p>

      <div className="form-group">
        <div>
          <BookOpen size={18} />
          <input 
            placeholder="Nome do curso"
            className={errors.nome ? 'error-input' : ''}
            {...register("nome", { required: "Nome é obrigatório" })} 
          />
        </div>
        {errors.nome && <span className="error">{errors.nome.message}</span>}
      </div>

      <div className="form-group">
        <div>
          <DollarSign size={18} />
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Preço (AOA)"
            className={errors.preco ? 'error-input' : ''}
            {...register("preco", { 
              required: "Preço é obrigatório",
              valueAsNumber: true,
              min: { value: 0, message: "Preço deve ser maior que zero" }
            })}
          />
        </div>
        {errors.preco && <span className="error">{errors.preco.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Salvando...
          </>
        ) : (
          cursoId ? "Atualizar Curso" : "Criar Curso"
        )}
      </button>
    </form>
  );
}