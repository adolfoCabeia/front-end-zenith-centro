"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@/styles/PagamentoForm.css";
import toast from "react-hot-toast";
import usePagamentoStore from "@/store/pagamentoStore";
import useAlunoStore from "@/store/alunoStore";
import { DollarSign, Calendar, User, Loader2, CreditCard } from "lucide-react";

const pagamentoSchema = z.object({
  alunoId: z.string().min(1, "Aluno é obrigatório"),
  valor: z.number().min(0.01, "Valor deve ser maior que zero"),
  status: z.enum(["pendente", "pago", "atrasado", "cancelado"]),
  data: z.string().min(1, "Data é obrigatória"),
});

type FormDataType = z.infer<typeof pagamentoSchema>;

interface Props {
  pagamentoId?: string;
  onSuccess?: () => void;
}

export default function PagamentoForm({ pagamentoId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  
  const pagamento = usePagamentoStore((s) => s.pagamento);
  const fetchPagamentoById = usePagamentoStore((s) => s.fetchPagamentoById);
  const createPagamento = usePagamentoStore((s) => s.createPagamento);
  const updatePagamento = usePagamentoStore((s) => s.updatePagamento);
  
  const alunos = useAlunoStore((s) => s.alunos);
  const fetchAlunos = useAlunoStore((s) => s.fetchAlunos);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(pagamentoSchema),
  });

  useEffect(() => {
    fetchAlunos();
  }, [fetchAlunos]);

  useEffect(() => {
    if (!pagamentoId) return;

    const loadPagamento = async () => {
      try {
        await fetchPagamentoById(pagamentoId);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar pagamento");
      }
    };

    loadPagamento();
  }, [pagamentoId, fetchPagamentoById]);

  useEffect(() => {
    if (pagamento && pagamentoId) {
      setValue("alunoId", pagamento.alunoId);
      setValue("valor", pagamento.valor);
      setValue("status", pagamento.status);
      setValue("data", pagamento.data.split('T')[0]);
    }
  }, [pagamento, pagamentoId, setValue]);

  const onSubmit = async (data: FormDataType) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("alunoId", data.alunoId);
      formData.append("valor", String(data.valor));
      formData.append("status", data.status);
      formData.append("data", new Date(data.data).toISOString());

      if (pagamentoId) {
        await updatePagamento(pagamentoId, formData);
        toast.success("Pagamento atualizado com sucesso!");
      } else {
        await createPagamento(formData);
        toast.success("Pagamento criado com sucesso!");
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="pagamento-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{pagamentoId ? "Editar Pagamento" : "Novo Pagamento"}</h3>
      
      <p className="pagamento-form-subtitle">
        {pagamentoId 
          ? "Atualize as informações do pagamento" 
          : "Registe um novo pagamento"}
      </p>

      <div className="form-group">
        <div>
          <User size={18} />
          <select 
            className={errors.alunoId ? 'error-input' : ''}
            {...register("alunoId")}
          >
            <option value="">Selecione o aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>
        {errors.alunoId && <span className="error">{errors.alunoId.message}</span>}
      </div>

      <div className="form-group">
        <div>
          <DollarSign size={18} />
          <input 
            type="number"
            step="0.01"
            min="0"
            placeholder="Valor (AOA)"
            className={errors.valor ? 'error-input' : ''}
            {...register("valor", { valueAsNumber: true })}
          />
        </div>
        {errors.valor && <span className="error">{errors.valor.message}</span>}
      </div>

      <div className="form-group">
        <div>
          <Calendar size={18} />
          <input 
            type="date"
            className={errors.data ? 'error-input' : ''}
            {...register("data")}
          />
        </div>
        {errors.data && <span className="error">{errors.data.message}</span>}
      </div>

      <div className="form-group">
        <div>
          <CreditCard size={18} />
          <select 
            className={errors.status ? 'error-input' : ''}
            {...register("status")}
          >
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
            <option value="atrasado">Atrasado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        {errors.status && <span className="error">{errors.status.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Salvando...
          </>
        ) : (
          pagamentoId ? "Atualizar Pagamento" : "Criar Pagamento"
        )}
      </button>
    </form>
  );
}