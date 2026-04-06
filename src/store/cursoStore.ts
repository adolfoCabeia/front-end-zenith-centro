import { cursoService } from "@/services/curso.service";
import { create } from "zustand";

interface Curso {
  id: string;
  [key: string]: any;
}

interface UseCurso {
  cursos: Curso[];
  curso: Curso | null;
  loading: boolean;

  fetchCursos: () => Promise<void>;
  fetchCursoId: (id: string) => Promise<void>;
  createCurso: (data: FormData) => Promise<void>;
  updateCurso: (id: string, data: FormData) => Promise<void>;
  deleteCurso: (id: string) => Promise<void>;
}

export const useCursoStore = create<UseCurso>((set) => ({
  cursos: [],
  curso: null,
  loading: false,

  fetchCursos: async () => {
    set({ loading: true });

    try {
      const res = await cursoService.getAll();

      set({
        cursos: res.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchCursoId: async (id: string) => {
    set({ loading: true });

    try {
      const res = await cursoService.getById(id);

      set({
        curso: res.data.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  createCurso: async (data: FormData) => {
    set({ loading: true });

    try {
      const res = await cursoService.create(data);

      set((state) => ({
        cursos: [...state.cursos, res.data.data],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  updateCurso: async (id: string, data: FormData) => {
    set({ loading: true });

    try {
      const res = await cursoService.update(id, data);

      set((state) => ({
        cursos: state.cursos.map((c) =>
          c.id === id ? res.data.data : c
        ),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  deleteCurso: async (id: string) => {
    set({ loading: true });

    try {
      await cursoService.delete(id);

      set((state) => ({
        cursos: state.cursos.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));