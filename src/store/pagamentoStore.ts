import { create } from "zustand";
import { pagamentoService } from "@/services/pagamento.service";

export interface Pagamento {
  id: string;
  alunoId: string;
  valor: number;
  status: "pendente" | "pago" | "atrasado" | "cancelado";
  data: string;
  createdAt?: string;
  updatedAt?: string;
  
  aluno?: {
    id: string;
    nome: string;
    email: string;
  };
}

interface PagamentoState {
  pagamentos: Pagamento[];
  pagamento: Pagamento | null;
  loading: boolean;

  fetchPagamentos: () => Promise<void>;
  fetchPagamentoById: (id: string) => Promise<void>;
  createPagamento: (data: FormData) => Promise<void>;
  updatePagamento: (id: string, data: FormData) => Promise<void>;
  deletePagamento: (id: string) => Promise<void>;
}

const usePagamentoStore = create<PagamentoState>((set, get) => ({
  pagamentos: [],
  pagamento: null,
  loading: false,

  fetchPagamentos: async () => {
    set({ loading: true });

    try {
      const res = await pagamentoService.getAll();
      set({
        pagamentos: res.data.data || res.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
      throw new Error("ERRO AO BUSCAR PAGAMENTOS");
    }
  },

  fetchPagamentoById: async (id: string) => {
    set({ loading: true });

    try {
      const res = await pagamentoService.getById(id);
      set({
        pagamento: res.data.data || res.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
      throw new Error("ERRO AO BUSCAR PAGAMENTO");
    }
  },

  createPagamento: async (data: FormData) => {
    set({ loading: true });

    try {
      const res = await pagamentoService.create(data);
      const novoPagamento = res.data.data || res.data;
      
      set((state) => ({
        pagamentos: [novoPagamento, ...state.pagamentos],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
      throw new Error("ERRO AO CRIAR PAGAMENTO");
    }
  },

  updatePagamento: async (id: string, data: FormData) => {
    set({ loading: true });

    try {
      const res = await pagamentoService.update(id, data);
      const pagamentoAtualizado = res.data.data || res.data;
      
      set((state) => ({
        pagamentos: state.pagamentos.map((p) => 
          p.id === id ? pagamentoAtualizado : p
        ),
        pagamento: pagamentoAtualizado,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
      throw new Error("ERRO AO ATUALIZAR PAGAMENTO");
    }
  },

  deletePagamento: async (id: string) => {
    set({ loading: true });

    try {
      await pagamentoService.delete(id);
      
      set((state) => ({
        pagamentos: state.pagamentos.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
      throw new Error("ERRO AO EXCLUIR PAGAMENTO");
    }
  },
}));

export default usePagamentoStore;