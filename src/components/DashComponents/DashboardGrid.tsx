"use client";

import { useEffect } from "react";
import useDashStore from "@/store/dashboardStore";
import CardMetric from "./CardMetric";
import RevenueChart from "./RevenueChart";
import TopCourses from "./TopCourses";
import OccupancyList from "./OccupancyList";
import { formatKz } from "@/utils/formatCurrency";
import "@/styles/dashboard.css";
import { OccupancyItem } from "@/types/dashboard";

const adaptTaxaOcupacao = (taxas: { turmaId: string; ocupacao: number }[]): OccupancyItem[] => {
  return taxas.map((t) => ({
    sala: `Turma ${t.turmaId.slice(-4)}`,  
    curso: "Curso ativo",               
    ocupacao: t.ocupacao,
    capacidade: Math.max(t.ocupacao, 30),
    percentual: Math.min(Math.round((t.ocupacao / 30) * 100), 100), 
  }));
};

export default function DashboardGrid() {
  const dashboard = useDashStore((s) => s.dashboard);
  const count = useDashStore((s) => s.count);
  const fetchDash = useDashStore((s) => s.fetchDash);
  const fetchDashCount = useDashStore((s) => s.fetchDashCount);

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchDash(), fetchDashCount()]);
    };
    load();
  }, []);

  if (!dashboard || !count) return <div className="loading-container">Carregando dashboard...</div>;

  return (
    <div className="dashboard-layout">
      <div className="metrics-grid">
        <CardMetric title="Usuários" value={count.usuarios} variant="primary" />
        <CardMetric title="Alunos" value={dashboard.totalAlunos} variant="default" />
        <CardMetric title="Receita Total" value={formatKz(dashboard.receitaTotal)} variant="success" />
        <CardMetric title="Receita Prevista" value={formatKz(dashboard.receitaPrevista)} variant="warning" />
      </div>
      
      <div className="chart-fullwidth">
        <RevenueChart data={dashboard.receitaMensalGrafico} />
      </div>
      
      <div className="bottom-grid">
        <TopCourses data={dashboard.topCursos} />
        <OccupancyList data={adaptTaxaOcupacao(dashboard.taxaOcupacao)} />
      </div>
    </div>
  );
}