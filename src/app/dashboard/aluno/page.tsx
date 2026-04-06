"use client";

import { useEffect } from "react";
import useAlunoStore from "@/store/alunoStore";
import DataTable from "@/components/table/DataTable";
import { alunoColumns } from "@/components/table/columns/alunoColumns";

export default function AlunoListPage() {
  const alunos = useAlunoStore((s) => s.alunos);
  const fetchAlunos = useAlunoStore((s) => s.fetchAlunos);
  const loading = useAlunoStore((s) => s.loading);

  useEffect(() => {
    fetchAlunos();
  }, []);

  if (loading) return <div className="loading-container">Carregando dashboard alunos...</div>;

  return (
    <div>
      <DataTable data={alunos} columns={alunoColumns} enableSorting
      enablePagination
      enableFiltering
      enableRowSelection
      pageSize={10}/>
    </div>
  );
}