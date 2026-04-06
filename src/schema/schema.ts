import { z } from "zod";

export const alunoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  turmaId: z.string().min(1, "Selecione uma turma"),
  status: z.enum(["PENDENTE", "ATIVO", "INATIVO"]),
  biUrl: z.instanceof(FileList).refine((files) => files.length > 0, "BI é obrigatório"),
  comprovativoUrl: z.instanceof(FileList).refine((files) => files.length > 0, "Comprovativo é obrigatório"),
});

export type AlunoFormData = z.infer<typeof alunoSchema>;