"use client";

import { useState } from "react";
import EditCursoModal from "@/components/curso/EditCursoModal";
import { useRouter } from "next/navigation";
import { useCursoStore } from "@/store/cursoStore";
import toast from "react-hot-toast";

interface Props {
  curso: any;
}

export default function CursoActions({ curso }: Props) {
  const [open, setOpen] = useState(false);
  const deleteCurso = useCursoStore((s) => s.deleteCurso);
  const loading = useCursoStore((s) => s.loading);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este curso?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCurso(curso.id);
      toast.success("Curso excluído com sucesso!");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao excluir curso");
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "8px" }} className="acoes">
        <button onClick={() => router.push(`/dashboard/curso/${curso.id}`)}>
          Ver
        </button>

        <button onClick={() => setOpen(true)}>Editar</button>

        <button onClick={handleDelete} disabled={loading}>
          {loading ? "Excluindo..." : "Excluir"}
        </button>
      </div>

      {open && (
        <EditCursoModal
          cursoId={curso.id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}