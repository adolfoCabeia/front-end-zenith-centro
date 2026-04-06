import { ColumnDef } from "@tanstack/react-table";
import AlunoActions from "@/components/aluno/AlunoActions";

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  biUrl: string;         
  comprovativoUrl: string; 
  createdAt: string;
  updatedAt: string;
  turma?: {
    horario: string;
    diaSemana?: string[];  
    dataInicio?: string; 
    dataFim?: string;      
    curso?: { nome: string; preco: number };
  };
  pagamentos: any[];         
}
export const alunoColumns: ColumnDef<Aluno>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },

  {
    header: "Curso",
    cell: ({ row }) => {
      return row.original.turma?.curso?.nome || "—";
    },
  },

  {
    header: "Horário",
    cell: ({ row }) => {
      return row.original.turma?.horario || "—";
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "8px",
            background:
              status === "PENDENTE"
                ? "#fff3cd"
                : status === "APROVADO"
                  ? "#d4edda"
                  : "#f8d7da",
            color:
              status === "PENDENTE"
                ? "#856404"
                : status === "APROVADO"
                  ? "#155724"
                  : "#721c24",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <AlunoActions aluno={row.original} />;
    },
  },
];
