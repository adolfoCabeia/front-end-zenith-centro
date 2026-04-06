import CursoActions from "@/components/curso/CursoActions";
import { ColumnDef } from "@tanstack/react-table";

export interface Curso {
  id: string;
  nome: string;
  preco: number;
  criadoEm: Date; 
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  }).format(value);
};
export const cursoColumn: ColumnDef<Curso, any>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "preco",
    header: "Preçário",
    cell: ({ row }) => {
      return formatCurrency(row.original.preco);
    },
  },
  {
    accessorKey: "criadoEm",
    header: "Criado em",
    cell: ({ row }) => {
      const date = new Date(row.original.criadoEm);
      return date.toLocaleDateString("pt-AO");
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <CursoActions curso={row.original} />;
    },
  },
];