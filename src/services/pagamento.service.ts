import { api } from "./api"


export const pagamentoService = {
    create: async(data: FormData)=>{
        return api.post('/pagamentos', data)
    },
    getAll: async()=>{
        return api.get('/pagamentos')
    },
    getById: async(id:string)=>{
        return api.get(`/pagamentos/${id}`)
    },
    update: async(id:string, data:FormData)=>{
        return api.put(`/pagamentos/${id}`, data)
    },
    delete: async(id:string)=>{
        return api.delete(`/pagamentos/${id}`)
    }
}