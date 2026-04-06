"use client";

import { cursoColumn, Curso } from "@/components/table/columns/cursosColumns";  
import DataTable from "@/components/table/DataTable";
import { useCursoStore } from "@/store/cursoStore";
import React, { useEffect } from "react";

const page = () => {
  const cursos = useCursoStore((c) => c.cursos);
  const fetchCursos = useCursoStore((c) => c.fetchCursos);
  const loading = useCursoStore((c) => c.loading);

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <>
      <DataTable 
        data={cursos} 
        columns={cursoColumn}  
      />
    </>
  );
};

export default page;