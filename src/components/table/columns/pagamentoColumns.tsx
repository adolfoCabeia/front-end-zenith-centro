import { ColumnDef } from "@tanstack/react-table";
import PagamentoActions from "@/components/pagamentos/PagamentoActions";

export interface Pagamento {
  id: string;
  alunoId: string;
  valor: number;
  status: "pendente" | "pago" | "atrasado" | "cancelado";
  data: string;
  
  aluno?: {
    id: string;
    nome: string;
    email: string;
  };
}

export const pagamentoColumns: ColumnDef<Pagamento>[] = [
  {
    accessorKey: "aluno.nome",
    header: "Aluno",
    cell: ({ row }) => {
      return row.original.aluno?.nome || "—";
    },
  },
  {
    accessorKey: "aluno.email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.aluno?.email || "—";
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const valor = row.original.valor;
      return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA'
      }).format(valor);
    },
  },
  {
    accessorKey: "data",
    header: "Data de Vencimento",
    cell: ({ row }) => {
      return new Date(row.original.data).toLocaleDateString('pt-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        pendente: { bg: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", label: "Pendente" },
        pago: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80", label: "Pago" },
        atrasado: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", label: "Atrasado" },
        cancelado: { bg: "rgba(100, 116, 139, 0.15)", color: "#64748b", label: "Cancelado" },
      };

      const config = statusConfig[status] || statusConfig.pendente;

      return (
        <span
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            background: config.bg,
            color: config.color,
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            border: `1px solid ${config.color}33`,
          }}
        >
          {config.label}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <PagamentoActions pagamento={row.original} />;
    },
  },
];