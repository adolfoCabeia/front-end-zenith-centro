"use client";


import { pagamentoColumns } from "@/components/table/columns/pagamentoColumns";
import DataTable from "@/components/table/DataTable";
import usePagamentoStore from "@/store/pagamentoStore";
import React, { useEffect } from "react";

const page = () => {
  const pagamentos = usePagamentoStore((p) => p.pagamentos);
  const fetchPagamentos = usePagamentoStore((p) => p.fetchPagamentos);
  const loading = usePagamentoStore((p) => p.loading);

  useEffect(() => {
    fetchPagamentos();
  }, []);

  return (
    <>
      <DataTable data={pagamentos} columns={pagamentoColumns} />
    </>
  );
};

export default page;
