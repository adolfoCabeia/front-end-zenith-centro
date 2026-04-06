export interface ReceitaMensal {
  mes: string;
  total: number;
}

export interface TaxaOcupacao {
  turmaId: string;
  ocupacao: number;
}

export interface TopCurso {
  curso: string;
  totalAlunos: number;
  receita: number;
}

export interface DashboardData {
  receitaTotal: number;
  receitaMensal: number;
  receitaPrevista: number;
  totalAlunos: number;
  alunosAprovados: number;
  taxaAprovacao: number;
  mediaAlunosPorTurma: number;
  taxaOcupacao: TaxaOcupacao[];
  totalInadimplentes: number;
  inadimplentes: any[];
  receitaMensalGrafico: ReceitaMensal[];
  topCursos: TopCurso[];
}

export interface CountData {
  usuarios: number;
  aluno: number;
  turma: number;
  curso: number;
}


export interface CardMetricProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface OccupancyItem {
  sala: string;
  curso: string;
  capacidade: number;
  ocupacao: number;
  percentual: number;
}

export interface RevenueData {
  mes: string;
  receita: number;
  meta: number;
}

export interface HeaderProps {
  nome?: string;
}