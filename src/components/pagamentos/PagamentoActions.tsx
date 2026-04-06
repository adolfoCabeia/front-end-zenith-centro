"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, Loader2, CreditCard } from "lucide-react";
import EditPagamentoModal from "@/components/pagamentos/EditPagamentoModal";
import { useRouter } from "next/navigation";
import usePagamentoStore from "@/store/pagamentoStore";
import toast from "react-hot-toast";

interface Props {
  pagamento: any;
}

export default function PagamentoActions({ pagamento }: Props) {
  const [open, setOpen] = useState(false);
  const deletePagamento = usePagamentoStore((s) => s.deletePagamento);
  const loading = usePagamentoStore((s) => s.loading);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este pagamento?",
    );

    if (!confirmDelete) return;

    try {
      await deletePagamento(pagamento.id);
      toast.success("Pagamento excluído com sucesso!");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao excluir pagamento");
    }
  };

  return (
    <>
      <div className="acoes">
        <button onClick={() => router.push(`/dashboard/pagamento/${pagamento.id}`)}>
          <Eye size={14} />
          Ver
        </button>

        <button onClick={() => setOpen(true)}>
          <Pencil size={14} />
          Editar
        </button>

        <button onClick={handleDelete} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={14} className="spin" />
              Excluindo...
            </>
          ) : (
            <>
              <Trash2 size={14} />
              Excluir
            </>
          )}
        </button>
      </div>

      {open && (
        <EditPagamentoModal pagamentoId={pagamento.id} onClose={() => setOpen(false)} />
      )}
    </>
  );
}