import { turmaService } from "@/services/turma.service";
import { create } from "zustand"

interface turmaStore {
    turmas: any[],
    loading: boolean,
    diaSemana?: string[];

    fetchTurmas: ()=> Promise<void>
} 

const useTurmaStore = create<turmaStore>((set)=>({
    turmas: [],
    loading: false,

    fetchTurmas: async()=>{
        set({loading: true})
        try {
            const res = await turmaService.getAll()

            set({
                turmas:res.data,
                loading:false
            })
        } catch (error) {
            set({loading:false})
            console.error(error)
            throw new Error("Falha ao listar")
        }
    }
}));

export default useTurmaStore