import { create } from "zustand";
import { alunoService } from "@/services/aluno.service";
import { Aluno } from "@/components/table/columns/alunoColumns";

interface AlunoState {
  alunos: Aluno[];
  aluno: Aluno | null;
  loading: boolean;

  fetchAlunos: () => Promise<void>;
  fetchAlunoById: (id: string) => Promise<void>;
  deleteAluno: (id: string) => Promise<void>;
}

const useAlunoStore = create<AlunoState>((set) => ({
  alunos: [],
  aluno: null,
  loading: false,

  fetchAlunos: async () => {
    set({ loading: true });

    const res = await alunoService.getAll();

    set({
      alunos: res.data.data,
      loading: false,
    });
  },

  fetchAlunoById: async (id: string) => {
    set({ loading: true });

    try {
      const res = await alunoService.getById(id);

      set({
        aluno: res.data.data, 
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      throw new Error("ERRO AO BUSCAR ALUNO");
    }
  },

  deleteAluno: async (id: string) => {
  set({ loading: true });

  try {
    await alunoService.delete(id);

    set((state) => ({
      alunos: state.alunos.filter((a) => a.id !== id),
      loading: false,
    }));
  } catch (error) {
    set({ loading: false });
    console.log(error);
    throw new Error("ERRO AO EXCLUIR ALUNO");
  }
},
}));

export default useAlunoStore;