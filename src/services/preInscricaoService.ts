import { api } from "./api";

export interface PreInscricao {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cursoId: string;
  status: "AGUARDANDO" | "CONFIRMADA" | "EXPIRADA" | "CANCELADA";
  createdAt: string;
  updatedAt: string;
}

export interface CriarPreInscricaoData {
  nome: string;
  email: string;
  telefone?: string;
  cursoId: string;
}

export interface AtualizarPreInscricaoData {
  nome?: string;
  email?: string;
  telefone?: string;
  status?: "AGUARDANDO" | "CONFIRMADA" | "EXPIRADA" | "CANCELADA";
}

export const preInscricaoService = {
  criar: async (
    data: CriarPreInscricaoData
  ): Promise<{
    mensagem: string;
    dados: PreInscricao;
  }> => {
    const res = await api.post("/pre-inscricoes", data);
    return res.data;
  },

  listar: async (): Promise<PreInscricao[]> => {
    const res = await api.get("/pre-inscricoes");
    return res.data;
  },

  buscarPorId: async (id: string): Promise<PreInscricao> => {
    const res = await api.get(`/pre-inscricoes/${id}`);
    return res.data;
  },

  atualizar: async (
    id: string,
    data: AtualizarPreInscricaoData
  ): Promise<{
    mensagem: string;
    dados: PreInscricao;
  }> => {
    const res = await api.put(`/pre-inscricoes/${id}`, data);
    return res.data;
  },

  remover: async (
    id: string
  ): Promise<{
    mensagem: string;
  }> => {
    const res = await api.delete(`/pre-inscricoes/${id}`);
    return res.data;
  },
};