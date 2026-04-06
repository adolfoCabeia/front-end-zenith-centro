import { api } from "./api";

export const alunoService = {
  create: (data: FormData) => {
    return api.post("/alunos", data);
  },

  getAll: () => {
    return api.get("/alunos");
  },

  getById: (id: string) => {
    return api.get(`/alunos/${id}`);
  },

  update(
    id: string,
    data: {
      nome: string;
      email: string;
      telefone: string;
      status: "PENDENTE" | "ATIVO" | "INATIVO";
    },
  ) {
    return api.put(`/alunos/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete(`/alunos/${id}`);
  },
};
