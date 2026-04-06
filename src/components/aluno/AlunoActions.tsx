"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import EditAlunoModal from "@/components/aluno/EditAlunoModal";
import { useRouter } from "next/navigation";
import useAlunoStore from "@/store/alunoStore";
import toast from "react-hot-toast";

interface Props {
  aluno: any;
}

export default function AlunoActions({ aluno }: Props) {
  const [open, setOpen] = useState(false);
  const deleteAluno = useAlunoStore((s) => s.deleteAluno);
  const loading = useAlunoStore((s) => s.loading);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este aluno?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAluno(aluno.id);
      toast.success("Aluno excluído com sucesso!");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao excluir aluno");
    }
  };

  return (
    <>
      <div className="acoes">
        <button onClick={() => router.push(`/dashboard/aluno/${aluno.id}`)}>
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

      <EditAlunoModal
        alunoId={aluno.id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
